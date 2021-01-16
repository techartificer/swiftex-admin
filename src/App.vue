<template>
<v-app>
    <!-- <Snackbar /> -->
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
import constants from '@/constants';
import Navbar from '@/components/layouts/Navbar.vue';
import validateToken from './helpers/jwt';

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

    instance.interceptors.request.use(async (config) => {
      try {
        const authToken = config?.headers?.authorization;
        if (authToken) {
          const isExpired = validateToken(authToken);
          if (isExpired) {
            const { accessToken, refreshToken } = await this.REFRESH_TOKEN_REQUEST();
            config.headers.authorization = accessToken;
            config.headers.RefreshToken = refreshToken;
            return config;
          }
        }
        return config;
      } catch (err) {
        console.error(err);
        return Promise.reject(err);
      }
    }, undefined);

    instance.interceptors.response.use(undefined, (err) => {
      const title = err?.response?.data?.title;
      const code = err?.response?.data?.code;

      if (code === constants.errorCodes.LOGGED_OUT) {
        console.log(title); // show error title in toast
      // postLogoutTask();
      } else if (code === constants.errorCodes.EXPIRED_JWT) {
      // TODO: refresh token
      } else {
        console.log(title, err); // show error title in toast
      // toast.error(`${title}.`);
      }
      return Promise.reject(err);
    });
  },
  methods: {
    ...mapActions(['REFRESH_TOKEN_REQUEST']),
  },
};
</script>
