<template>
<v-app>
    <Navbar v-if="IsLoggedIn"/>
    <v-main>
      <v-container fluid class="pa-0">
        <v-dialog width="600"
        persistent
        v-model="isLoggedOut">
          <v-card>
            <v-card-text>
              <div class="loggedOut">
                You are logged out
              </div>
              <div class="btn-reload">
                <v-btn
                color="secondary"
                @click="reload"
                >Reload</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
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
    ...mapGetters(['AccessToken', 'RefreshToken', 'IsLoggedIn', 'ShowLoggedOut']),
    isLoggedOut: {
      get() {
        return this.ShowLoggedOut;
      },
      set() {
        // ignore
      },
    },
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
    reload() {
      window.location.reload();
    },
  },
};
</script>
<style scoped>
.loggedOut {
    padding: 70px;
    text-align: center;
    font-size: 2rem !important;
    font-weight: 500;
    letter-spacing: 0.05em !important;
    line-height: 2rem;
    text-transform: uppercase;
    font-family: "Roboto", sans-serif !important;
}
.btn-reload {
    text-align: center;
}
</style>
