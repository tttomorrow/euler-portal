<script setup lang="ts">
defineProps({
  floorData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<template>
  <div class="floor-box">
    <h2 :id="floorData.title" class="floor-title">
      <span class="title-bg" v-html="floorData.description"></span>
      <span class="title-text" v-html="floorData.title"></span>
    </h2>
    <div class="markdown" v-html="floorData.content"></div>
  </div>
</template>
<style lang="scss" scoped>
.floor-box {
  margin-top: 40px;
  .markdown {
    margin: 0;
    width: 100%;
    max-width: 100%;
    min-height: 0;
  }
}
</style>
