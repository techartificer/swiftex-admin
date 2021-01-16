<template>
  <div>
    <Login v-if="!IsLoggedIn"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import Login from '../components/Login.vue';

export default {
  name: 'Home',
  components: {
    Login,
  },
  computed: {
    ...mapGetters(['IsLoggedIn']),
  },
};
</script>
