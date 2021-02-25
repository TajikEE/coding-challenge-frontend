<template>
  <div>
    <div v-if="error === true">
      Oops! Something went wrong, please try again later.
    </div>

    <TableHeader
      colOneHeader="Phone number"
      colTwoHeader="Number of calls"
      colThreeHeader="Latest call details"
    />

    <div
      :class="$style.row"
      v-for="log in uniqueNumberLogs"
      :key="log.identifier"
    >
      <div :class="$style.col">
        <button @click="goToNumberDetails(log.number)" :class="$style.btn">
          <span>{{ log.number }}</span>
        </button>
      </div>

      <div :class="$style.col">
        <div v-for="(phone, index) in Object.entries(callCount)" :key="index">
          <div v-if="phone[0] === log.number">
            {{ phone[1] > 1 ? phone[1] + " calls" : phone[1] + " call" }}
          </div>
        </div>
      </div>

      <div :class="$style.col">
        <button
          @click="goToAgentDetails(log.agentIdentifier)"
          :class="$style.btn"
        >
          <span>{{ log.name }}</span></button
        ><span>| {{ formatTime(log.dateTime) }}</span>
      </div>
    </div>

    <LineChart
      :class="$style.marginTop"
      :chartData="lineChart"
      chartTitle="Call duration by date"
      vAxisTitle="Duration (seconds)"
    />
  </div>
</template>

<script>
import TableHeader from "../components/table-header";
import format from "date-fns/format";
import LineChart from "../components/line-chart";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",

  computed: {
    ...mapState(["logs", "error"]),

    uniqueNumberLogs() {
      return [
        ...new Map(
          this.logs?.allLogs?.map((log) => [log["number"], log])
        ).values(),
      ];
    },

    callCount() {
      return this.logs?.numberCounter;
    },

    lineChart() {
      const barChartData =
        this.logs?.allLogs?.map(({ dateTime, duration }) => [
          this.formatDate(dateTime),
          parseInt(duration),
        ]) || [];

      return [["Date", "Duration"], ...barChartData];
    },
  },

  mounted() {
    this.getLogData();
  },

  methods: {
    ...mapActions(["getLogData"]),

    formatTime: (dateString) => format(new Date(dateString), "HH:MM"),
    formatDate: (dateString) => format(new Date(dateString), "dd/LL/yy"),

    goToNumberDetails(number) {
      this.$router.push({
        name: "phone-number-details",
        params: { number },
      });
    },

    goToAgentDetails(agentId) {
      this.$router.push({
        name: "agent-details",
        params: { agentId },
      });
    },
  },

  components: {
    LineChart,
    TableHeader,
  },
};
</script>

<style module lang="scss">
@import "../styles/shared.scss";
</style>
