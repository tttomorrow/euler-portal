<script lang="ts" setup>
defineProps({
  featuresObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
</script>

<template>
  <div class="features-box">
    <!-- 标题 -->
    <div class="title">
      <div class="title-outside">{{ featuresObj.TITLE_OUTSIDE }}</div>
      <div class="title-inside">{{ featuresObj.TITLE_INSIDE }}</div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div
        v-for="(item, index) in featuresObj.CHARACTER_LIST"
        :key="item.TITLE"
        class="content-item"
        :class="
          index == featuresObj.CHARACTER_LIST.length - 1 ||
          index == featuresObj.CHARACTER_LIST.length - 2
            ? 'content-item'
            : 'content-item content-item-bottom'
        "
      >
        <img :src="item.IMG" alt="" />
        <div class="item-info">
          <div class="content-item-title">{{ item.TITLE }}</div>
          <div class="content-item-desc">{{ item.DESC }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.features-box {
  width: 100%;
  padding: 0 var(--o-spacing-h5);
  margin-bottom: var(--o-spacing-h2);
  .title {
    margin: 0 auto var(--o-spacing-s4);
    margin-bottom: var(--o-spacing-h1);
    font-size: var(--o-font-size-h3);
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    position: relative;
    text-align: center;
    &-outside {
      position: absolute;
      left: 50%;
      top: 24px;
      transform: translateX(-50%);
      z-index: 1;
    }
    &-inside {
      color: var(--o-color-text3);
    }
    @media screen and (max-width: 767px) {
      margin-bottom: 0;
      font-size: var(--o-font-size-h8);
      &-outside {
        top: 20%;
      }
    }
  }
  .content {
    margin: 0 auto;
    background-color: var(--o-color-bg);
    padding: 0 150px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;
    &-item {
      max-width: 482px;
      display: flex;
      padding: var(--o-spacing-h2) 0;
      color: var(--o-color-text2);
      img {
        display: block;
        width: 80px;
        height: 80px;
        // 往下调整
        margin-right: var(--o-spacing-h8);
      }
      &-title {
        margin: var(--o-spacing-h5) 0 var(--o-spacing-h8) 0;
      }
      &-desc {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text3);
      }
      &-bottom {
        border-bottom: 1px solid var(--o-color-division);
      }
    }
    @media screen and (min-width: 1440px) {
      max-width: 1440px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1439px) {
      padding: 0 auto;
    }
    @media screen and (max-width: 1079px) {
      padding: 0 var(--o-spacing-h2);
    }
    @media screen and (max-width: 767px) {
      margin-top: var(--o-spacing-h5);
      display: grid;
      grid-template-columns: 1fr;
      padding: 0 var(--o-spacing-h5);
      &-item {
        margin: 0 auto;
        padding: var(--o-spacing-h5) 0;
        max-width: 296px;
        &-title {
          font-size: var(--o-font-size-text);
        }
        &-desc {
          font-size: var(--o-font-size-tip);
        }
        img {
          margin: auto;
          margin-right: var(--o-spacing-h8);
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .content :nth-child(5) {
    border-bottom: 1px solid var(--o-color-division);
  }
}
</style>
