<script lang="ts" setup>
import { ref } from 'vue';
defineProps({
  cardsLink: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
const isMenuIndex = ref(-1);
const showSub = (index: number) => {
  isMenuIndex.value = index;
};
const hideSub = () => {
  isMenuIndex.value = -1;
};
const goLink = (url: string) => {
  window.open(url, '_blank');
};
</script>
<template>
  <div class="cards-wraper">
    <div class="info-cards">
      <div
        v-for="(item, index) in cardsLink"
        :key="item.IMG"
        :class="
          cardsLink.length % 2 === 1 && index + 1 === cardsLink.length
            ? 'info-cards-item info-cards-last'
            : 'info-cards-item'
        "
        @mouseenter="showSub(Number(index))"
        @mouseleave="hideSub()"
      >
        <img
          v-if="item.LINK_LIST.length === 1"
          class="info-cards-imgs"
          :src="item.IMG"
          alt=""
          @click="goLink(item.LINK_LIST[0])"
        />
        <img v-else class="info-cards-imgs" :src="item.IMG" alt="" />
        <p class="info-cards-title">{{ item.TITLE }}</p>
        <div
          v-if="isMenuIndex === Number(index) && item.LINK_LIST.length > 1"
          class="menu"
        >
          <a
            v-for="i in item.LINK_LIST"
            :key="i.TEXT"
            class="menu-item"
            :href="i.LINK"
            target="_blank"
          >
            {{ i.TEXT }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cards-wraper {
  margin-top: var(--o-spacing-h2);
  padding: 0 var(--o-spacing-h5);
}
.info {
  margin: 0 auto;
  &-cards {
    margin: 0 auto;
    background-color: var(--o-color-bg);
    box-shadow: var(--o-shadow-base);
    &-item {
      position: relative;
    }
    &-imgs {
      width: 100%;
      height: 141px;
      box-sizing: border-box;
      cursor: pointer;
    }
    &-title {
      font-size: var(--o-font-size-h8);
      font-weight: 400;
      color: var(--o-color-text2);
      line-height: var(--o-line-height-h8);
      margin-top: var(--o-spacing-h5);
      text-align: center;
    }
    .menu {
      position: absolute;
      top: 45%;
      left: 57%;
      z-index: 1;
      width: 160px;
      background-color: var(--o-color-bg);
      border: 1px solid var(--o-color-brand);
      padding: var(--o-spacing-h5) 0;
      &-item {
        display: block;
        text-align: center;
        padding: var(--o-spacing-h8) 0;
        line-height: var(--o-line-height-h6);
        cursor: pointer;
        color: var(--o-color-text2);
      }
      &-item:hover {
        color: var(--o-color-brand);
      }
    }

    @media screen and (max-width: 767px) {
      width: 100%;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: var(--o-spacing-h5);
      &-item {
        margin: 0 auto;
        height: 130px;
        padding: 0;
      }
      &-last {
        grid-column: span 2;
      }
      &-imgs {
        display: block;
        width: 100px;
        height: 100px;
        cursor: pointer;
      }
      &-title {
        width: 100px;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        margin-top: var(--o-spacing-h10);
        text-align: center;
      }
      .menu {
        position: absolute;
        top: 40%;
        left: 60%;
        width: 100px;
        font-size: var(--o-font-size-tip);
        padding: var(--o-spacing-h6) 0;
        &-item {
          display: block;
          text-align: center;
          padding: 0;
          cursor: pointer;
          color: var(--o-color-text2);
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1439px) {
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding: 40px;
      &-items {
        width: 170px;
        height: 170px;
      }
      &-imgs {
        padding: var(--o-spacing-h5);
      }
    }
    @media screen and (min-width: 1440px) {
      display: flex;
      justify-content: space-around;
      max-width: 1440px;
      padding: var(--o-spacing-h2);
      &-items {
        width: 170px;
        height: 170px;
      }
      &-imgs {
        padding: var(--o-spacing-h5);
      }
    }
  }
}
</style>
