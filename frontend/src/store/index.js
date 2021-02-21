import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logs: [],
    phoneLogs: [],
    agentLogs: [],
    agentDetails: null,
    error: false,
  },
  mutations: {
    SET_ALL_LOGS(state, logs) {
      state.logs = logs;
    },

    SET_LOGS_OF_PHONE_NUMBERS(state, phoneLogs) {
      state.phoneLogs = phoneLogs;
    },

    SET_LOGS_OF_AGENTS(state, agentLogs) {
      state.agentLogs = agentLogs;
    },

    SET_AGENTS_DETAILS(state, agentDetails) {
      state.agentDetails = agentDetails;
    },

    SET_ERROR_STATE(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getLogData({ commit }) {
      try {
        commit("SET_ERROR_STATE", false);

        const { data } = await axios.get("/logs");

        commit("SET_ALL_LOGS", data);
      } catch (ex) {
        commit("SET_ERROR_STATE", true);
      }
    },

    async getLogsByPhoneNumber({ commit }, phoneNumber) {
      try {
        commit("SET_ERROR_STATE", false);

        const { data } = await axios.get(`/call/${phoneNumber}`);

        commit("SET_LOGS_OF_PHONE_NUMBERS", data.logData);
      } catch (ex) {
        commit("SET_ERROR_STATE", true);
      }
    },

    async getCallsWithAgentDetails({ commit }, agentId) {
      try {
        commit("SET_ERROR_STATE", false);

        const { data } = await axios.get(`/agent/${agentId}`);

        commit("SET_LOGS_OF_AGENTS", data.matchedLogsByAgent);
        commit("SET_AGENTS_DETAILS", data.details);

      } catch (ex) {
        commit("SET_ERROR_STATE", true);
      }
    },
  },
  modules: {},
});
