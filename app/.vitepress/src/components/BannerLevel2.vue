<script setup lang="ts">
import { computed, CSSProperties } from 'vue';

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
  background-size: cover;
  background-repeat: no-repeat;
  background-color: var(--o-color-brand);

  .wrap {
    max-width: 1504px;
    margin: 0 auto;
    padding: 0 44px;
    display: flex;
    justify-content: space-between;
    min-height: 280px;
    @media screen and (max-width: 768px) {
      min-height: 126px;
      padding: 0 24px;
    }
    .banner-text {
      position: relative;
      padding-top: 50px;
      padding-bottom: 32px;

      @media screen and (max-width: 768px) {
        padding-top: 32px;
        padding-bottom: 32px;
      }

      .banner-text-bg {
        position: absolute;
        top: 60px;
        color: #2e4fb0;
        opacity: 0.8;
        font-size: var(--o-font-size-h1);
        line-height: var(--o-line-height-h1);
        font-weight: bold;
        user-select: none;

        @media screen and (max-width: 1080px) {
          font-size: var(--o-font-size-h2);
          line-height: var(--o-line-height-h2);
        }

        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
          top: 32px;
        }
      }
      .banner-title {
        position: relative;
        z-index: 1;
        color: var(--o-color-text);
        font-size: var(--o-font-size-h2);
        line-height: var(--o-line-height-h2);
        margin-top: var(--o-spacing-h2);

        @media screen and (max-width: 1080px) {
          font-size: var(--o-font-size-h3);
          line-height: var(--o-line-height-h3);
        }

        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
          margin-top: var(--o-spacing-h6);
        }
      }

      .banner-subtitle {
        position: relative;
        z-index: 1;
        color: var(--o-color-text);
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        margin-top: var(--o-spacing-h9);

        @media screen and (max-width: 1080px) {
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
        }

        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
    }
    .banner-illustration {
      margin-left: var(--o-spacing-h);
      display: flex;
      flex-direction: column-reverse;
      object-fit: fill;

      @media screen and (max-width: 1080px) {
        justify-content: center;
      }

      img {
        max-height: 230px;

        @media screen and (max-width: 1080px) {
          justify-content: center;
          max-height: 160px;
        }

        @media screen and (max-width: 768px) {
          max-height: 94px;
        }
      }
    }
  }
}
</style>
