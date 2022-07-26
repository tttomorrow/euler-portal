<script setup lang="ts">
import { useData } from 'vitepress';

const { theme: i18n } = useData();
</script>

<template>
  <div class="landscape">
    <div
      v-for="(item, fIndex) in i18n.sig.SIG_LANDSCAPE"
      :key="fIndex"
      class="sig-category-wrapper"
    >
      <h2>{{ item.CATEGORY_NAME }}</h2>
      <ul class="sig-category-list">
        <li
          v-for="(subItem, index) in item.SUB_LIST"
          :key="index"
          class="sig-category-item"
          :style="{ borderColor: subItem.COLOR }"
        >
          <h3 :style="{ backgroundColor: subItem.COLOR }">
            {{ subItem.SUB_CATEGORY_NAME }}
          </h3>
          <ul class="sig-list">
            <li
              v-for="(followItem, followIndex) in subItem.LIST"
              :key="followIndex"
              :style="{ borderColor: subItem.COLOR }"
              :class="followItem.IS_WIDER ? 'wider' : ''"
            >
              {{ followItem.NAME }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.landscape {
  max-width: 1340px;
  margin: 0 auto;
  .sig-category-wrapper {
    margin-bottom: var(--o-spacing-h1);
    h2 {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h7);
      color: var(--o-color-text2);
      font-weight: normal;
      margin-bottom: var(--o-spacing-h4);
      text-align: center;
    }
    .sig-category-list {
      column-count: 2;
      column-gap: 20px;
      .sig-category-item {
        break-inside: avoid;
        border: 1px solid;
        border-radius: 4px;
        margin-bottom: var(--o-spacing-h4);
        h3 {
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h7);
          color: var(--o-color-text);
          font-weight: normal;
          text-align: center;
          line-height: var(--o-line-height-h3);
        }
        .sig-list {
          padding: 20px 10px 10px 20px;
          margin-bottom: unset;
          column-count: unset;
          column-gap: unset;
          display: flex;
          flex-wrap: wrap;
          @media (max-width: 768px) {
            padding: 10px 10px;
          }
          li {
            flex-shrink: 0;
            width: 162px;
            text-align: center;
            color: var(--o-color-text2);
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-h5);
            height: var(--o-line-height-h5);
            border: 1px solid;
            border-radius: 4px;
            margin: 0 10px 10px 0;
            cursor: pointer;
          }
          .wider {
            width: 248px;
          }
        }
      }
    }
  }
}
</style>
