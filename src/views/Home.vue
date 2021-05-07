<template>
  <div>
    <Login v-if="!IsLoggedIn"/>
    <Dashboard v-else/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import Dashboard from '../components/dashboard/Dashboard.vue';
import Login from '../components/Login.vue';

export default {
  name: 'Home',
  components: {
    Login,
    Dashboard,
  },
  computed: {
    ...mapGetters(['IsLoggedIn']),
  },
};
</script>
