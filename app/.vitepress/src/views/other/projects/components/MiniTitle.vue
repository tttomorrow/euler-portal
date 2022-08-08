<script lang="ts" setup>
defineProps({
  insideTitle: {
    type: String,
    default: '',
  },
  outsideTitle: {
    type: String,
    default: '',
  },
  device: {
    type: Boolean,
    default: true,
  },
});
</script>
<template>
  <div v-if="device" class="title-wrapper">
    <div class="title">
      <div class="title-outside">{{ outsideTitle }}</div>
      <div class="title-inside">{{ insideTitle }}</div>
    </div>
  </div>
  <div v-else class="mobile-title-wrapper">
    <div class="title">
      <div class="title-outside">{{ outsideTitle }}</div>
      <div class="title-inside">{{ insideTitle }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-wrapper {
  width: 100%;
  margin: 0 auto;
  position: relative;
  margin-top: var(--o-spacing-h1);
  .title {
    margin: 0 auto;
    font-size: var(--o-font-size-h3);
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    position: relative;
    text-align: center;
    margin-bottom: var(--o-spacing-h2);
    &-outside {
      position: absolute;
      left: 50%;
      top: 24px;
      transform: translateX(-50%);
      z-index: 1;
    }
    &-inside {
      color: var(--o-color-bg4);
    }
  }
}
.mobile-title-wrapper {
  width: 100%;
  margin: 0 auto;
  position: relative;
  margin-top: var(--o-spacing-h2);
  .title {
    margin: 0 auto var(--o-spacing-h3);
    margin-bottom: var(--o-spacing-h4);
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h8);
    position: relative;
    text-align: center;
    &-outside {
      position: absolute;
      left: 50%;
      top: 8px;
      transform: translateX(-50%);
      z-index: 1;
    }
    &-inside {
      color: var(--o-color-bg4);
    }
  }
}
</style>
