<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
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
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
