<script lang="ts" setup>
defineProps({
  descList: {
    type: Object,
    default: function () {
      return [];
    },
  },
  darkImg: {
    type: Boolean,
    default: false,
  },
  frameworkImg: {
    type: String,
    default: '',
  },
  frameworkDarkImg: {
    type: String,
    default: '',
  },
  frameworkTitle: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <div class="framelist-wrapper">
    <div class="info">
      <div class="desc">
        <p v-for="(item, index) in descList" :key="index">
          {{ item }}
        </p>
        <p v-if="frameworkTitle" class="desc-title">{{ frameworkTitle }}</p>
      </div>
      <img v-if="darkImg" :src="frameworkDarkImg" alt="" />
      <img v-else :src="frameworkImg" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.framelist-wrapper {
  .info {
    padding: var(--o-spacing-h2) 0;
    background-color: var(--o-color-bg);
  }
  .desc {
    margin: 0 var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2);
    p {
      font-size: var(--o-font-size-text);
      color: var(--o-color-text2);
      line-height: var(--o-line-height-text);
    }
    &-title {
      margin-top: 24px;
    }
  }
  img {
    margin: 0 auto;
    display: block;
  }
  @media screen and (min-width: 1440px) {
    max-width: 1416px;
    img {
      width: 1016px;
    }
  }
  @media screen and (min-width: 1080px) and (max-width: 1439px) {
    img {
      width: 762px;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1079px) {
    img {
      width: 542px;
    }
  }
  @media screen and (max-width: 767px) {
    .info {
      padding: var(--o-spacing-h5);
    }
    .desc {
      margin: 0;
      p {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        margin-bottom: var(--o-spacing-h8);
      }
    }
    img {
      margin-top: var(--o-spacing-h5);
      width: 100%;
    }
  }
}
</style>
