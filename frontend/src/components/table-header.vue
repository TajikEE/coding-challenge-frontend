<template>
  <header :class="$style.tableHeader">
    <div :class="$style.col">{{ colOneHeader }}</div>
    <div :class="$style.col">{{ colTwoHeader }}</div>
    <div :class="$style.col">{{ colThreeHeader }}</div>
  </header>
</template>

<script>
export default {
  props: {
    colOneHeader: { type: String, default: "" },
    colTwoHeader: { type: String, default: "" },
    colThreeHeader: { type: String, default: "" },
  },
};
</script>

<style lang="scss" module>
@import "../styles/shared.scss";
</style>
