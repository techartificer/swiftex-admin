<template>
  <div id="inspire">
    <v-navigation-drawer
    v-if="true"
      v-model="drawer"
      app
      clipped
    >
     <v-list
        dense
        rounded
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push(item.to)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-bottom-navigation
      fixed
      v-if="isMobile"
    >
      <v-btn
        @click="showCart"
        text
        large
        color="primary"
      >
        <v-icon class="pr-1">mdi-cart</v-icon>
      </v-btn>
      <v-badge
        v-if="isMobile && cartItemCount"
        overlap
        :content="cartItemCount"
        class="my-3 badge-fix mr-5"
      >
      </v-badge>
        <div class="place-order">
        <span class="text-fix">Place Order</span>
        </div>
    </v-bottom-navigation>
    <v-app-bar
      app
      clipped-left
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!isMobile" @click="goToHome">
          <img src="../../assets/logo.png" alt="Logo"
          class="logo">
      </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-btn
        small
        fab
        class="ml-0 mr-1"
        color="primary"
        rounded
        text="true"
        icon="true">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn
        class="ml-0 mr-0"
        color="primary"
        rounded
        fab
        small
        >
        <v-icon >mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
// import Login from '../auth/Login.vue';
// import { eventBus } from '../../lib/helper';
// import event from '../../constant/event';
// import CartDrawer from '../cart/Drawer.vue';
// import ProductCard from '../home/PorductCard.vue';

export default {
  components: {
    // Login,
    // CartDrawer,
    // ProductCard,
  },
  data: () => ({
    isSearching: false,
    searchItem: '',
    timeoutId: null,
    drawer: true,
    bottomNav: true,
    items: [
      { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },
      { icon: 'mdi-format-list-checks', title: 'Order', to: '/orders' },
      { icon: 'mdi-account-group', title: 'Admin', to: '/admin' },
      { icon: 'mdi-moped', title: 'Rider', to: '/rider' },
      { icon: 'mdi-bike', title: 'Bike', to: '/bike' },
    ],
  }),
  watch: {
    searchItem(val) {
      if (!val) {
        this.isSearching = false;
        this.makeEmptySearchProduct();
      }
    },
  },
  created() {
    this.$vuetify.theme.dark = false;
    this.initialize();
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'profile', 'cartProducts', 'searchedProducts']),
    // cartItemCount() {
    //   return this.cartProducts.length;
    // },
    totalPrice() {
      return this.cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
    },
    isMobile() {
      // eslint-disable-next-line default-case
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true;
        case 'sm': return true;
      }
      return false;
    },
    user() {
      if (!this.profile || !this.profile.name) return '';
      if (this.profile.name.length > 10) {
        const [fn] = this.profile.name.split(' ');
        return fn.substr(0, 10);
      }
      return this.profile.name.substr(0, 10);
    },
  },
  beforeDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  },
  methods: {
    ...mapActions(['PRODUCTS', 'SEARCH_PRODUCT']),
    ...mapMutations(['makeEmptySearchProduct']),
    searchProduct() {
      this.isSearching = true;
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      if (this.searchItem.length > 2) {
        this.timeoutId = setTimeout(async () => {
          try {
            await this.SEARCH_PRODUCT(this.searchItem);
            this.isSearching = false;
          } catch (err) {
            this.isSearching = false;
          }
        }, 1000);
      }
    },
    async initialize() {
      await Promise.all([this.PRODUCTS()]);
    },
    goToHome() {
      this.searchItem = '';
      this.makeEmptySearchProduct();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    goToProfile() {
      this.searchItem = '';
      this.makeEmptySearchProduct();
      if (this.$route.path !== '/profile') {
        this.$router.push('/profile');
      }
    },
    showCart() {
      this.searchItem = '';
      this.makeEmptySearchProduct();
      // eventBus.$emit(event.cartDrawerInit);
    },
    loginInit() {
      this.searchItem = '';
      this.makeEmptySearchProduct();
      // eventBus.$emit(event.loginInit);
    },
  },
};
</script>
<style lang="scss" scoped>
.search-items {
    position: absolute;
    margin-top: 440px;
    background: #fff;
    width: 100%;
    margin-left: -16px;
}
.v-bottom-navigation.v-item-group.theme--light.v-bottom-navigation--fixed {
    display: flex;
    justify-content: flex-end;
}
.badge-fix {
  margin-left: -22px;
}
i.v-icon.notranslate.cart-down.mdi.mdi-chevron-down.theme--light {
    position: relative;
    margin-top: 10px;
}
.bounce-enter-active {
  animation: bounce-in .4s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(0.90);
  }
  50% {
    transform: scale(1.15);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
span.light {
    color: #fff;
}
.place-order {
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    background: #56b342;
    color: #ffff;
    width: 400px;
    align-self: auto;
    padding: 14px;
}
img.logo {
    height: 35px;
    margin-top: 10px;
    cursor: pointer;
}
</style>
