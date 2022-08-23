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
  specialComponent: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="title-wrapper">
    <div :class="`${specialComponent ? 'title title-special' : 'title'}`">
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
    color: var(--e-color-text1);
    line-height: var(--o-line-height-h3);
    position: relative;
    text-align: center;
    // TODO:
    margin-bottom: 56px;
    &-outside {
      position: absolute;
      left: 50%;
      top: 16px;
      transform: translateX(-50%);
      z-index: 1;
    }
    &-inside {
      color: var(--e-color-neutral10);
      // TODO:
      font-size: 40px;
      font-weight: 300;
      user-select: none;
    }
  }
  .title-special {
    // TODO:
    margin-bottom: 44px;
  }
  @media screen and (max-width: 767px) {
    margin-top: var(--o-spacing-h2);
    .title {
      margin-bottom: var(--o-spacing-h4);
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      &-outside {
        top: 8px;
      }
      &-inside {
        color: var(--e-color-bg4);
        font-size: var(--o-font-size-h8);
        user-select: none;
      }
    }
  }
}

.dark .title-inside {
  opacity: 0.1;
}
</style>
