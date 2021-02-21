<template>
  <GChart :data="chartData" :options="options" type="LineChart" />
</template>

<script>
import { GChart } from "vue-google-charts";

export default {
  name: "GoogleLineChart",

  props: {
    chartData: {
      type: Array,
      default: () => {
        [];
      },
    },
    chartTitle: { type: String, default: "" },
    vAxisTitle: { type: String, default: "" },
  },

  computed: {
    options() {
      return {
        title: this.chartTitle,
        colors: ["#f8c91c"],
        vAxis: { title: this.vAxisTitle },
        legend: "none",
        width: "100%",
        height: 400,
        chartArea: {
          width: "100%",
          left: "40",
        },
      };
    },
  },

  components: { GChart },
};
</script>
