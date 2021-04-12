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
          @click="goToRoute(item.to)"
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
        <v-menu
        bottom
        transition="slide-y-transition"
        offset-y
        rounded
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
            class="ml-0 mr-0"
            color="primary"
            rounded
            text
            fab
            small
            v-bind="attrs"
            v-on="on"
            >
              <v-icon >mdi-account</v-icon>
            </v-btn>
          </template>

          <v-list
          dense
          rounded>
            <v-list-item
              v-for="(item, index) in accountItems"
              :key="index"
              link
              @click="goToRoute(item.to)"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import constants from '../../constants';
import permission from '../../constants/permission';

export default {
  components: {
  },
  data: () => ({
    isSearching: false,
    searchItem: '',
    timeoutId: null,
    drawer: true,
    bottomNav: true,
    accountItems: [
      { icon: 'mdi-account', title: 'Profile', to: '/profile' },
      { icon: 'mdi-logout', title: 'Logout', to: '/logout' },
    ],
  }),
  created() {
    this.$vuetify.theme.dark = false;
    this.initialize();
  },
  computed: {
    ...mapGetters(['IsLoggedIn', 'Permission']),
    items() {
      switch (this.Permission) {
        case constants.adminRoles.SUPER_ADMIN:
          return permission.superAdmin;
        case constants.adminRoles.ADMIN:
          return permission.admin;
        case constants.adminRoles.MODERATOR:
          return permission.moderator;
        default:
          break;
      }
      return permission.common;
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
  methods: {
    ...mapActions(['ADMIN_PROFILE_REQUEST']),
    async initialize() {
      try {
        await this.ADMIN_PROFILE_REQUEST();
      } catch (err) {
        // err
      }
      return true;
    },
    goToRoute(r) {
      if (this.$route.path !== r) {
        this.$router.push(r);
      }
    },
    goToHome() {
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
