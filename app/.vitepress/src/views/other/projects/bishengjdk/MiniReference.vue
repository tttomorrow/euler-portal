<script lang="ts" setup>
import { useRouter, useData } from 'vitepress';

import MiniTitle from '../components/MiniTitle.vue';

import IconArrowRight from '~icons/app/arrow-right';

const router = useRouter();
const { lang } = useData();

defineProps({
  referenceObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
  device: {
    type: Boolean,
    default: true,
  },
});
const goLink = (path: string) => {
  if (path.startsWith('https:')) {
    window.open(path, '_blank');
  } else {
    router.go(`/${lang.value}` + path);
  }
};
</script>

<template>
  <div class="reference">
    <MiniTitle
      :device="device"
      :title-inside="referenceObj.TITLE_INSIDE"
      :title-outside="referenceObj.TITLE_OUTSIDE"
    />
    <div class="reference-list">
      <div
        v-for="(item, index) in referenceObj.LINK_LIST"
        :key="index"
        class="item"
      >
        <div class="link">
          <OButton
            animation
            type="text"
            size="small"
            class="link-button"
            @click="goLink(item.LINK)"
          >
            {{ item.TEXT }}
            <template #suffixIcon>
              <OIcon><IconArrowRight /></OIcon>
            </template>
          </OButton>
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
  &-list {
    margin: 0 auto;
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
        &-button {
          padding: 0 !important;
          margin-right: 10px;
          svg {
            color: var(--o-color-brand);
          }
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
      .item {
        height: 58px;
        padding: 0 0 0 var(--o-spacing-h8);
        background-size: 160px 150%;
      }
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
