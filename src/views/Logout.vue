<template>
  <div></div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  async created() {
    await this.LOGOUT_REQUEST();
  },
  methods: {
    ...mapActions(['LOGOUT_REQUEST']),
  },
};
</script>
