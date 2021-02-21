<template>
  <div class="root">
    <div class="head">
      Orders
    </div>
    <div class="order">
      <div class="order-add">

      </div>
      <div class="order-list">
        <list />
      </div>
    </div>
  </div>
</template>
<script>
import List from '../components/parcel/List.vue';

export default {
  components: {
    List,
  },
};
</script>
