<script setup lang="ts">
import { ref, computed } from 'vue';

import TagFilter from '@/components/TagFilter.vue';
import useCaseZh from '@/i18n/use-case/use-case-zh.json';

const isAll = ref(false);
const userCaseData = computed(() => useCaseZh);

// const tagArr = useCaseZh.tagArr;
const activeIndex = ref(0);
const tagClick = (i: number) => {
  activeIndex.value = i;
};
// const tagArrLen = computed(() => {
//   return isAll.value ? tagArr : tagArr.slice(0, 12);
// });
const toggleClick = (flag: boolean) => {
  isAll.value = flag;
};
const currentPage1 = ref(5);
const pageSize4 = ref(100);
const total = ref(100);
</script>

<template>
  <div class="user-case">
    <div class="tag-box">
      <TagFilter :label="userCaseData.type" @toggle-click="toggleClick">
        <OTag
          v-for="(item, index) in userCaseData.tagArr"
          :key="'tag' + index"
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="tagClick(index)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
    </div>
    <div class="case-list">
      <OCard
        v-for="item in userCaseData.caseList"
        :key="item.name"
        class="case-card"
      >
        <div class="card-content-text">
          <h4>{{ item.name }}</h4>
          <p class="detail">
            {{ item.detail }}
          </p>
          <a href="">
            <OButton type="primary" class="button">{{
              userCaseData.button
            }}</OButton>
          </a>
        </div>
        <div class="card-content-icon"></div>
      </OCard>
    </div>
    <div class="page-box">
      <OPagination
        v-model:currentPage="currentPage1"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :background="true"
        layout="sizes, prev, pager, next, slot, jumper"
        :total="total"
      >
        <span>1/50</span>
      </OPagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-case {
  max-width: 1504px;
  padding: 0 44px;
  margin: 0 auto;
}
.tag-box {
  width: 100%;
  display: flex;
  .tag-filter {
    padding-left: 0;
  }
}
.case-list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h4);
  .case-card {
    max-width: 456px;
    height: 198px;
    padding: 40px 26px 40px 40px;
    background-image: url(@/assets/user-case/case-bg.png);
    background-size: cover;
    position: relative;
    .card-content-text {
      color: #ffffff;
      h4 {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
      }
      .detail {
        max-width: 256px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
      a {
        position: absolute;
        bottom: 40px;
        .button {
          width: 96px;
          height: 28px;
          padding: 0;
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
    }
    :deep(.el-card__body) {
      padding: 0;
    }
  }
}
.page-box {
  margin-top: var(--o-spacing-h2);
}
</style>
