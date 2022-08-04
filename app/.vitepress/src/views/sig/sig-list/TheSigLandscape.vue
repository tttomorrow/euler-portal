<script setup lang="ts">
import { computed } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

const configData = useData();
const router = useRouter();
const language = configData.lang;

const props = defineProps({
  sigList: {
    type: Array,
    default: () => [],
  },
});

const i18n = computed(() => useI18n());
const toSigDetail = (name: string): void => {
  props.sigList.map((item: any) => {
    if (item.group_name === name) {
      router.go(`/${language.value}/sig/sig-detail/?id=${item.id}`);
    }
  });
};
</script>

<template>
  <div class="landscape">
    <div
      v-for="item in i18n.sig.SIG_LANDSCAPE"
      :key="item.CATEGORY_NAME"
      class="sig-category-wrapper"
    >
      <h2>{{ item.CATEGORY_NAME }}</h2>
      <ul class="sig-category-list">
        <li
          v-for="subItem in item.SUB_LIST"
          :key="subItem.SUB_CATEGORY_NAME"
          class="sig-category-item"
          :style="{ borderColor: subItem.COLOR }"
        >
          <h3 :style="{ backgroundColor: subItem.COLOR }">
            {{ subItem.SUB_CATEGORY_NAME }}
          </h3>
          <ul class="sig-list">
            <li
              v-for="followItem in subItem.LIST"
              :key="followItem.NAME"
              :style="{ borderColor: subItem.COLOR }"
              :class="followItem.IS_WIDER ? 'wider' : ''"
              @click="toSigDetail(followItem.NAME)"
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
      @media (max-width: 780px) {
        column-count: 1;
        margin: 0 var(--o-spacing-h3);
      }
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
          justify-content: center;
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
