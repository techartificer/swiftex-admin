<template>
<v-app>
    <Navbar v-if="IsLoggedIn"/>
    <v-main>
      <v-container fluid class="pa-0">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable no-param-reassign */
import { mapGetters, mapActions } from 'vuex';
import instance from '@/helpers/axios';
import Navbar from '@/components/layouts/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(['AccessToken', 'RefreshToken', 'IsLoggedIn']),
  },
  watch: {
    AccessToken(val) {
      instance.defaults.headers.authorization = val;
    },
    RefreshToken(val) {
      instance.defaults.headers.RefreshToken = val;
    },
  },
  created() {
    instance.defaults.headers.authorization = this.AccessToken;
    instance.defaults.headers.RefreshToken = this.RefreshToken;
  },
  methods: {
    ...mapActions(['REFRESH_TOKEN_REQUEST']),
  },
};
</script>
