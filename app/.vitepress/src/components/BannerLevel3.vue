<script setup lang="ts">
import { computed, CSSProperties, defineProps } from 'vue';

const props = defineProps({
  backgroundImage: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '',
  },
  backgroundText: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});

const rootStyle = computed(() => {
  const result: CSSProperties = {};
  if (props.backgroundImage) {
    result.backgroundImage = `url(${props.backgroundImage})`;
  }

  if (props.backgroundColor) {
    result.backgroundColor = props.backgroundColor;
  }
  return result;
});
</script>

<template>
  <div class="banner-level3" :style="rootStyle">
    <div class="wrap">
      <div class="banner-text">
        <p v-if="backgroundText" class="banner-text-bg">
          {{ backgroundText }}
        </p>
        <h1 v-if="title" class="banner-title">{{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-level3 {
  width: 100%;
  min-height: 160px;
  padding-top: 50px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: var(--o-color-brand);
  .wrap {
    max-width: 1504px;
    padding: 0 44px;
    display: flex;
    justify-content: space-between;
    height: 100%;
    .banner-text {
      position: relative;
      padding-bottom: 20px;

      .banner-text-bg {
        position: absolute;
        color: #2e4fb0;
        opacity: 0.8;
        font-size: var(--o-font-size-h3);
        line-height: var(--o-line-height-h3);
        font-weight: bold;
      }
      .banner-title {
        position: relative;
        z-index: 1;
        color: var(--o-color-text);
        font-size: var(--o-font-size-h3);
        line-height: var(--o-line-height-h3);
        margin-top: 16px;
      }
    }
  }
}
</style>
