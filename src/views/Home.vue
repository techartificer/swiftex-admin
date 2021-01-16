<template>
  <div>
    <Login v-if="!IsLoggedIn"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';
import { mapGetters } from 'vuex';

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
