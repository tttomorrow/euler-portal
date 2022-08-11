<script setup lang="ts">
import { toRefs } from 'vue';
import { useI18n } from '@/i18n';

import IconChevronLeft from '~icons/app/icon-chevron-left.svg';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();

const props = defineProps({
  // 当前页
  currentPage: {
    type: Number,
    default: 0,
  },
  // 总页数
  totalPage: {
    type: Number,
    default: 0,
  },
});
const { currentPage, totalPage } = toRefs(props);

const emit = defineEmits(['turn-page']);
// 将翻页时间传递给父组件
const handleCurrentChange = (option: string) => {
  emit('turn-page', option);
};
// 写在父组件内的翻页事件参考
// function turnPage(option: string) {
//   if (option === 'prev' && currentPage.value > 1) {
//     currentPage.value = currentPage.value - 1;
//   } else if (option === 'next' && currentPage.value < totalPage.value) {
//     currentPage.value = currentPage.value + 1;
//   }
// }
// function jumpPage(e: any) {
//   console.log(e);
// }
</script>

<template>
  <div class="pagination-h5">
    <OIcon class="icon-prev" :class="currentPage === 1 ? 'disable-button' : ''">
      <IconChevronLeft />
    </OIcon>
    <span
      class="prev"
      :class="currentPage === 1 ? 'disable-button' : ''"
      @click="handleCurrentChange('prev')"
      >{{ i18n.common.PREV }}</span
    >
    <span class="page-number">
      <input v-model="currentPage" type="number" class="current-page" />
      <!-- <span>{{ currentPage }}</span> -->
      <span>/{{ totalPage }}</span>
    </span>
    <span
      class="next"
      :class="currentPage === totalPage ? 'disable-button' : ''"
      @click="handleCurrentChange('next')"
      >{{ i18n.common.NEXT }}</span
    >
    <OIcon
      class="icon-next"
      :class="currentPage === totalPage ? 'disable-button' : ''"
    >
      <IconChevronRight />
    </OIcon>
  </div>
</template>

<style scoped lang="scss">
.pagination-h5 {
  display: none;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: var(--o-font-size-tip);
    .icon-prev {
      margin-right: 8px;
      color: var(--o-color-brand);
    }
    .page-number {
      margin: 0 28px;
      .current-page {
        width: 20px;
        height: 14px;
        text-align: right;
        border: none;
        background-color: transparent;
        color: var(--o-color-brand);
        &:focus {
          text-align: center;
          outline: 1px solid var(--o-color-brand);
        }
      }
      span {
        color: var(--o-color-text2);
      }
    }
    .icon-next {
      margin-left: 8px;
      color: var(--o-color-brand);
    }
    .next,
    .prev {
      color: var(--o-color-text2);
    }
    .disable-button {
      color: var(--o-color-disabled);
    }
  }
}
</style>
