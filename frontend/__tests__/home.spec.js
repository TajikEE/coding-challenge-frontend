import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/home.vue";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("home.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      getLogData: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });
  });

  it('calls store action "getLogData"', () => {
    shallowMount(Home, { store, localVue });

    expect(actions.getLogData).toHaveBeenCalledTimes(1);
  });
});
