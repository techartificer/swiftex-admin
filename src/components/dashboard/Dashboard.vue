<template>
  <div>
    <div>
      <v-layout row wrap class="pa-6 mt-0">
        <v-flex sm6 xs12 md4 lg4
        v-for="s in sparklines" :key="s.text">
          <sparkline-card
          :labels="s.labels"
          :value="s.value"
          :color="s.color"
          :text="s.text"
          />
        </v-flex>
      </v-layout>
    </div>
    <div>
      <v-layout row wrap class="pa-6 mt-5">
        <v-flex sm6 xs12 md4 lg3
        v-for="d in dashaboardData" :key="d.text">
          <card :data="d"/>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import SparklineCard from './SparklineCard.vue';
import Card from './Card.vue';

export default {
  components: {
    SparklineCard,
    Card,
  },
  data: () => ({
    value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
    ],
  }),
  computed: {
    labels() {
      const ret = [];
      for (let day = 6; day >= 0; day -= 1) {
        ret.push(`${moment(new Date()).subtract(day, 'd').format('ddd')}~${this.value[day]}`);
      }
      return ret;
    },
    sparklines() {
      return [
        {
          text: 'Merchant Registered',
          value: this.value.map((v) => v * Math.random()),
          labels: this.labels,
          color: 'secondary',
        },
        {
          text: 'Parcel Placed',
          value: this.value.map((v) => v * Math.random()),
          labels: this.labels,
          color: 'green',
        },
        {
          text: 'Shop Created',
          value: this.value.map((v) => v * Math.random()),
          labels: this.labels,
          color: 'blue',
        },
      ];
    },
    dashaboardData() {
      const dashboard = [
        {
          text: 'Parcel placed', color: 'teal', icon: 'mdi-clipboard-list-outline', count: this.dashboard?.total || 1,
        },
        {
          text: 'Parcel pending', color: '#350d36', icon: 'mdi-progress-clock', count: this.dashboard?.pending || 3,
        },
        {
          text: 'Parcel In Transit', color: 'orange', icon: 'mdi-bike-fast', count: this.dashboard?.inTransit || 5,
        },
        {
          text: 'Parcel Cancelled', color: 'black', icon: 'mdi-playlist-remove', count: this.dashboard?.cancelled || 5,
        },
        {
          text: 'Parcel returned', color: '#1264a3', icon: 'mdi-reload', count: this.dashboard?.returned || 10,
        },
        {
          text: 'Parcel Delivered', color: 'green', icon: 'mdi-playlist-check', count: this.dashboard?.delivered || 100,
        },
        {
          text: 'Parcel rejected', color: 'red', icon: 'mdi-close-outline', count: this.dashboard?.declined || 15,
        },
        {
          text: 'SUCCESSFUL DELIVERY', color: 'blue', icon: 'mdi-brightness-percent', count: this.successfulDelivery || 57,
        },
      ];
      return dashboard;
    },
  },
};
</script>
<style scoped>
.sparklines {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
