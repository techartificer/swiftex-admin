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
    <v-app-bar
      app
      clipped-left
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title  @click="goToHome">
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
        text
        icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn
        class="ml-0 mr-0"
        color="primary"
        rounded
        text
        fab
        small
        >
        <v-icon >mdi-account</v-icon>
        </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
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
  created() {
    this.$vuetify.theme.dark = false;
    this.initialize();
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
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
  methods: {

    async initialize() {
      return true;
    },
    goToHome() {
      this.searchItem = '';
      this.makeEmptySearchProduct();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
  margin-left: -20px;
    height: 50px;
    margin-top: 10px;
    cursor: pointer;
}
</style>
