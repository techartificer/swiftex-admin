<template>
  <div class="py-3 px-4 nm-concave-ash cursor-pointer rounded-2xl">
        <i :class='design' />
  </div>
</template>

<script>
export default {
  name: 'SquereButton',
  props: {
    design: String,
  },
};
</script>
