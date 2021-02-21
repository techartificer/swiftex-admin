<template>
<div>
 {{merchants}}
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['merchants']),
  },
  created() {
    this.fetch();
  },
  methods: {
    ...mapActions(['MERCHANTS']),
    async fetch(lastId = '') {
      try {
        await this.MERCHANTS({ lastId });
      } catch (err) {
        // err
      }
    },
  },

};
</script>
