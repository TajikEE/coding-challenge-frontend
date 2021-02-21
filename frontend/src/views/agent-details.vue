<template>
  <div v-if="agentDetails">
    <h1>
      Agent Details
    </h1>

    <img :src="agentDetails.photo" :class="$style.img" />

    <div :class="$style.name">
      {{ agentDetails.firstName + " " + agentDetails.lastName }}
    </div>

    <div :class="$style.marginBottom">{{ agentDetails.email }}</div>

    <TableHeader
      colOneHeader="Phone number"
      colTwoHeader="Call date and time"
      colThreeHeader="Resolution"
    />

    <div :class="$style.row" v-for="log in agentLogs" :key="log.identifier">
      <div :class="$style.col">
        <button @click="goToNumberDetails(log.number)" :class="$style.btn">
          <span>{{ log.number }}</span>
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
      vAxisTitle="Number of resolutions"
    />
  </div>
</template>

<script>
import TableHeader from "../components/table-header";
import { mapActions, mapState } from "vuex";
import format from "date-fns/format";
import BarChart from "../components/bar-chart";

export default {
  name: "AgentDetails",

  computed: {
    ...mapState(["agentLogs", "agentDetails"]),

    getResolutionCounts() {
      const counts = {};
      this.agentLogs.forEach((log) => {
        counts[log.resolution] = (counts[log.resolution] || 0) + 1;
      });

      return counts;
    },

    barChart() {
      const barChartData = Object.entries(this.getResolutionCounts)

      return [["Resolution", "Count"], ...barChartData];
    },
  },

  mounted() {
    this.getCallsWithAgentDetails(this.$route.params.agentId);
  },

  methods: {
    ...mapActions(["getCallsWithAgentDetails"]),

    async goToNumberDetails(number) {
      this.$router.push({
        name: "phone-number-details",
        params: { number },
      });
    },

    formatDate: (dateString) => format(new Date(dateString), "dd/LL/yyyy"),

    formatTime: (dateString) => format(new Date(dateString), "HH:MM:SS"),
  },

  components: {
    BarChart,
    TableHeader,
  },
};
</script>

<style lang="scss" module>
@import "../styles/shared.scss";

.img {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  max-width: 10rem;
}

.name {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.marginBottom {
  margin-bottom: 2rem;
}
</style>
