<template>
  <v-card class="ma-3" outlined color="#f5f5f5">
    <v-list-item>
      <v-list-item-avatar rounded class="mt-n9">
        <v-sheet :color="data.color" width="80" height="80" elevation="10">
          <v-icon dark large>{{data.icon}}</v-icon>
        </v-sheet>
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline text-right">
          {{data.text}}
        </div>
        <div><v-divider></v-divider></div>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-list-item-title class="headline mb-1 text-right">
          {{data.count || 0}}
      </v-list-item-title>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ['data'],
};
</script>
