<script setup lang="ts">
import { computed } from 'vue';
import useWindowResize from '@/components/hooks/useWindowResize';
defineProps({
  thirdData: {
    required: true,
    type: Array,
    default: () => [],
  },
});
const screenWidth = useWindowResize();
const isMobile = computed(() => {
  return screenWidth.value <= 768 ? true : false;
});
</script>

<template>
  <div class="agenda">
    <div class="agenda-time">
      <div
        v-for="item in (thirdData as any).TIME_LIST"
        :key="item"
        class="agenda-time-item"
      >
        {{ item }}
      </div>
    </div>
    <div class="agenda-card">
      <div class="agenda-card-detail"></div>
      <div class="agenda-card-box">
        <div class="transform-box">
          <ul class="card-list">
            <li v-for="item in (thirdData as any).CARD_LIST" :key="item">
              <p v-for="subItem in item.TITLE" :key="subItem" class="section">
                {{ subItem }}
              </p>
              <a
                v-for="textItem in item.ITEM_LIST"
                :key="textItem"
                :class="[textItem.THEME ? 'card-list-item' : 'card-list-none']"
              >
                <p>{{ textItem.THEME }}</p>
                <p
                  class="card-list-item-time"
                  :style="{display: (isMobile! === false) ? 'none' : ''}"
                >
                  {{ textItem.TIME }}
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.agenda {
  display: flex;
  justify-content: center;
  &-time {
    &-item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: var(--o-color-bg);
      width: 170px;
      height: 92px;
      font-size: var(--o-font-size-h6);
      color: var(--o-color-text2);
      margin-bottom: var(--o-spacing-h4);
      box-shadow: var(--o-shadow-base);
    }
    &-item:first-child {
      height: 48px;
      color: var(--o-color-text);
      background-color: var(--o-color-brand);
    }
    @media (max-width: 780px) {
      display: none;
    }
  }
  &-card {
    &-box {
      width: 100%;
      padding-left: var(--o-spacing-h3);
      @media (max-width: 780px) {
        padding: 0;
      }
      .transform-box {
        @media (max-width: 780px) {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }
        .card-list {
          display: flex;
          margin: 0 var(--o-spacing-h7);
          flex-direction: row;
          width: 100%;
          @media (max-width: 780px) {
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .section {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: var(--o-spacing-h4);
            font-size: var(--o-font-size-h6);
            color: var(--o-color-text);
            background-color: var(--o-color-brand);
            height: 48px;
            box-shadow: var(--o-shadow-base);
            @media (max-width: 780px) {
              font-size: var(--o-font-size-tip);
              margin-bottom: var(--o-spacing-h5);
            }
          }
          li {
            margin-right: var(--o-spacing-h5);
            @media (max-width: 780px) {
              margin: 0;
              width: 315px;
            }
          }
          &-item {
            width: 218px;
            height: 92px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            padding: var(--o-spacing-h5);
            width: 218px;
            height: 92px;
            margin-bottom: var(--o-spacing-h4);
            background-color: var(--o-color-bg);
            box-shadow: var(--o-shadow-base);
            @media (max-width: 780px) {
              width: 100%;
              height: fit-content;
              padding: var(--o-spacing-h6);
              flex-direction: column;
            }
            p {
              font-size: var(--o-font-size-h7);
              color: var(--o-color-text2);
              line-height: var(--o-line-height-h5);
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
              @media (max-width: 780px) {
                display: block;
                text-align: left;
                font-size: var(--o-font-size-tip);
                line-height: var(--o-line-height-h8);
              }
            }
            &-time {
              @media (max-width: 780px) {
                display: block;
                text-align: left;
              }
            }
          }
          &-none {
            display: block;
            width: 218px;
            height: 92px;
            margin-bottom: var(--o-spacing-h4);
            @media (max-width: 780px) {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
