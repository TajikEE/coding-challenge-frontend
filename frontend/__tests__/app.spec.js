import { mount } from "@vue/test-utils";
import App from "../src/App.vue";

import { mount } from "@vue/test-utils";


describe("Mounted App", () => {
  const wrapper = mount(App);

  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
