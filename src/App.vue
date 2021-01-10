<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import instance from '@/helpers/axios';

export default {
  computed: {
    ...mapGetters(['AccessToken', 'RefreshToken']),
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
    // this.AUTH_LOGIN_REQUEST({
    //   phone: '8801521105226',
    //   password: '@sadat642',
    // });
  },
  methods: {
    ...mapActions(['AUTH_LOGIN_REQUEST']),
  },
};
// eslint-disable-next-line no-unused-expressions
<style src="./assets/tailwind.css" />;
