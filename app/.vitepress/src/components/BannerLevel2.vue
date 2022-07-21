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
  subtitle: {
    type: String,
    default: '',
  },
  illustration: {
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
  <div class="banner-level2" :style="rootStyle">
    <div class="wrap">
      <div class="banner-text">
        <p v-if="backgroundText" class="banner-text-bg">
          {{ backgroundText }}
        </p>
        <h1 v-if="title" class="banner-title">{{ title }}</h1>
        <p v-if="subtitle" class="banner-subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="illustration" class="banner-illustration">
        <img :src="illustration" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-level2 {
  width: 100%;
  min-height: 280px;
  padding-top: 50px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: var(--o-color-brand);
  .wrap {
    max-width: 1504px;
    margin: 0 auto;
    padding: 0 44px;
    display: flex;
    justify-content: space-between;
    height: 100%;
    .banner-text {
      position: relative;
      padding-bottom: 20px;

      .banner-text-bg {
        position: absolute;
        top: 10px;
        color: #2e4fb0;
        opacity: 0.8;
        font-size: var(--o-font-size-h1);
        line-height: var(--o-line-height-h1);
        font-weight: bold;
      }
      .banner-title {
        position: relative;
        z-index: 1;
        color: var(--o-color-text);
        font-size: var(--o-font-size-h2);
        line-height: var(--o-line-height-h2);
        margin-top: var(--o-spacing-h2);
      }

      .banner-subtitle {
        position: relative;
        z-index: 1;
        color: var(--o-color-text);
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        margin-top: 6px;
      }
    }
    .banner-illustration {
    }
  }
}
</style>
