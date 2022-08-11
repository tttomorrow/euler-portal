<script setup lang="ts">
import { toRefs, ref, getCurrentInstance } from 'vue';
import { useI18n } from '@/i18n';

import IconChevronLeft from '~icons/app/icon-chevron-left.svg';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const { ctx } = getCurrentInstance() as any;
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
const page: any = ref(null);
const { currentPage, totalPage } = toRefs(props);
const inputNumber = ref(1);
const emit = defineEmits(['turn-page', 'jump-page']);
// 将翻页时间传递给父组件
const handleCurrentChange = (option: string) => {
  emit('turn-page', option);
};
// 写在父组件内的上下页翻页事件参考
// function turnPage(option: string) {
//   if (option === 'prev' && currentPage.value > 1) {
//     currentPage.value = currentPage.value - 1;
//   } else if (option === 'next' && currentPage.value < totalPage.value) {
//     currentPage.value = currentPage.value + 1;
//   }
// }
function jumpPage(e: any) {
  if (e.keyCode === 13) {
    emit('jump-page', inputNumber.value);
    page.value.blur();
    ctx.$forceUpdate();
  }
}
// 写在父组件内的移动端跳转翻页事件参考
// function jumpPage(page: number) {
// currentPage.value = page
// }
function inputPage(e: any) {
  if (e.data) {
    inputNumber.value = parseInt(e.data);
    if (!inputNumber.value) {
      inputNumber.value = 1;
    }
    if (inputNumber.value < 1) {
      inputNumber.value = 1;
    } else if (inputNumber.value > totalPage.value) {
      inputNumber.value = totalPage.value;
    }
  }
}
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
      <input
        ref="page"
        :value="currentPage"
        type="number"
        class="current-page"
        @keypress="jumpPage"
        @input="inputPage"
      />
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
    align-items: center;
    font-size: var(--o-font-size-tip);
    .icon-prev {
      margin-right: 8px;
      color: var(--o-color-brand);
    }
    .page-number {
      margin: 0 28px;
      text-align: center;
      .current-page {
        width: 16px;
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
        display: inline-block;
        width: 16px;
        text-align: left;
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
