<script lang="ts" setup>
import arrowRightIcon from '@/assets/svg-icons/arrow-right.svg';

defineProps({
  referenceObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
</script>

<template>
  <div class="reference">
    <div class="title">
      <div class="title-outside">{{ referenceObj.TITLE_OUTSIDE }}</div>
      <div class="title-inside">{{ referenceObj.TITLE_INSIDE }}</div>
    </div>
    <div class="reference-list">
      <div
        v-for="(item, index) in referenceObj.LINK_LIST"
        :key="index"
        class="item"
      >
        <div class="link">
          <a :href="item.LINK" target="_blank"
            >{{ item.TEXT }}
            <img :src="arrowRightIcon" alt="" />
          </a>
        </div>
        <img :src="item.IMG" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reference {
  width: 100%;
  padding-top: var(--o-spacing-h1);
  padding: 0 var(--o-spacing-h5);
  .title {
    margin: 0 auto;
    margin-bottom: 16px;
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
      font-size: 16px;
      &-outside {
        top: 10px;
      }
    }
  }
  &-list {
    margin: var(--o-spacing-h3) auto var(--o-spacing-h2) auto;
    .item {
      width: 100%;
      background-color: var(--o-color-bg);
      background-image: url(/img/projects/bisheng/illustration-grain.png);
      background-repeat: no-repeat;
      background-position: right;
      background-size: 230px 150%;
      padding: var(--o-spacing-h2) 0 var(--o-spacing-h2) var(--o-spacing-h2);
      box-shadow: var(--o-shadow-base);
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;
      font-size: var(--o-font-size-h7);
      color: var(--o-color-text2);
      line-height: var(--o-height-h6);
      .link {
        a {
          display: block;
          height: var(--o-height-h8);
          font-size: var(--o-font-size-text);
          font-weight: 400;
          color: var(--o-color-text2);
          line-height: var(--o-height-h8);
          margin-right: var(--o-spacing-h4);
          padding-right: var(--o-spacing-h4);
          position: relative;
          overflow: hidden;
        }
        img {
          margin-left: var(--o-spacing-h8);
          position: absolute;
          top: -2.5px;
          right: -20px;
          width: 22px;
          height: 22px;
          filter: drop-shadow(var(--o-color-brand) -20px 0);
        }
      }
    }
    .item:hover {
      box-shadow: var(--o-shadow-base_hover);
    }
    @media screen and (max-width: 767px) {
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: var(--o-spacing-h4);
    }
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: var(--o-spacing-h4);
      grid-column-gap: var(--o-spacing-h4);
    }
    @media screen and (min-width: 1080px) {
      max-width: 1416px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-row-gap: var(--o-spacing-h4);
      grid-column-gap: var(--o-spacing-h4);
    }
  }
}
</style>
