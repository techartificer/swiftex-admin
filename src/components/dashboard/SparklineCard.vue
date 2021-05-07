<template>
  <v-card class="ma-3" outlined color="#f5f5f5">
    <v-sheet
      class="v-sheet--offset mx-auto"
      :color="color"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        height="90"
        class="mt-3"
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-2">
      <!-- <div class="subheading font-weight-light grey--text">
        Last Campaign Performance
      </div> -->
      <v-divider class="my-2"></v-divider>
      <div class="overline bold">
        {{text}}
      </div>
      <!-- <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="caption grey--text font-weight-light">
        last registration 26 minutes ago</span> -->
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: ['labels', 'value', 'text', 'color'],
};
</script>
<style scoped>
.overline.bold {
    font-size: 15px !important;
    color: #202020;
}

</style>
