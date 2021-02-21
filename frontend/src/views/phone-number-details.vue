<template>
  <div>
    <TableHeader
      colOneHeader="Agent Name"
      colTwoHeader="Call date and time"
      colThreeHeader="Resolution"
    />

    <div :class="$style.row" v-for="log in phoneLogs" :key="log.identifier">
      <div :class="$style.col">
        <button
          @click="goToAgentDetails(log.agentIdentifier)"
          :class="$style.btn"
        >
          <span>{{ log.name }}</span>
        </button>
      </div>

      <div :class="$style.col">
        {{ formatDate(log.dateTime) }} {{ formatTime(log.dateTime) }}
      </div>

      <div :class="$style.col">
        {{ log.resolution }}
      </div>
    </div>

    <BarChart
      :class="$style.marginTop"
      :chartData="barChart"
      chartTitle="Resolution status"
      vAxisTitle="Number of resolution"
    />
  </div>
</template>

<script>
import TableHeader from "../components/table-header";
import { mapActions, mapState } from "vuex";
import format from "date-fns/format";
import BarChart from "../components/bar-chart";

export default {
  name: "PhoneNumberDetails",

  computed: {
    ...mapState(["phoneLogs"]),

    resolutionCount() {
      const numberCounter = this.phoneLogs.reduce((acc, log) => {
        if (acc[log.resolution]) {
          acc[log.resolution] += 1;
        } else {
          acc[log.resolution] = 1;
        }
        return acc;
      }, {});

      return numberCounter;
    },

    barChart() {
      const barChartData = Object.entries(this.resolutionCount);

      return [["Resolution", "Number of resolution"], ...barChartData];
    },
  },

  mounted() {
    this.getLogsByPhoneNumber(this.$route.params.number);
  },

  methods: {
    ...mapActions(["getLogsByPhoneNumber"]),

    async goToAgentDetails(agentId) {
      this.$router.push({
        name: "agent-details",
        params: { agentId },
      });
    },

    formatDate: (dateString) => format(new Date(dateString), "dd/LL/yyyy"),

    formatTime: (dateString) => format(new Date(dateString), "HH:MM:SS"),
  },

  components: {
    TableHeader,
    BarChart,
  },
};
</script>

<style lang="scss" module>
@import "../styles/shared.scss";
</style>
