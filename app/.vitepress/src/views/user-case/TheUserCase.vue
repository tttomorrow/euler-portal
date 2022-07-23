<script setup lang="ts">
import { ref, computed } from 'vue';

// import useWindowResize from '@/components/hooks/useWindowResize';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import useCaseZh from '@/i18n/use-case/use-case-zh.json';

import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';

const isAll = ref(false);
const userCaseData = computed(() => useCaseZh);

const activeIndex = ref(0);
const tagClick = (i: number) => {
  activeIndex.value = i;
};
const toggleClick = (flag: boolean) => {
  isAll.value = flag;
};
// 根据tag筛选需要显示的案例
function filterCase(type: string) {
  const caseList: any = [];
  userCaseData.value.caseList.forEach((item) => {
    if (item.type === type) {
      caseList.push(item);
    }
  });
  return caseList;
}
// 当前显示的案例
const currentPage1 = ref(1);
const pageSize4 = ref(12);
const currentCaseListAll = computed(() => {
  switch (activeIndex.value) {
    case 0:
      return userCaseData.value.caseList;
    case 1:
      return filterCase('finance');
    case 2:
      return filterCase('provider');
    case 3:
      return filterCase('energy');
    case 4:
      return filterCase('logistics');
    case 5:
      return filterCase('others');
    default:
      return [];
  }
});
const currentCaseList = computed(() => {
  if (currentCaseListAll.value.length > pageSize4.value) {
    return currentCaseListAll.value.slice(
      (currentPage1.value - 1) * pageSize4.value,
      currentPage1.value * pageSize4.value
    );
  } else {
    return currentCaseListAll.value;
  }
});

// 数据总条数
const total = computed(() => {
  return currentCaseListAll.value.length;
});
// 分页器总页数
const totalPage = computed(() => {
  return Math.ceil(total.value / pageSize4.value);
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMNUNITY"
    title="用户案例"
    :illustration="search"
  />
  <div class="user-case">
    <OSearch :style="{ marginBottom: '50px', marginTop: '100px' }"></OSearch>
    <div class="tag-box">
      <TagFilter
        :label="userCaseData.type"
        class="tag-pc"
        @toggle-click="toggleClick"
      >
        <OTag
          v-for="(item, index) in userCaseData.tagArr"
          :key="'tag' + index"
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="tagClick(index)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
      <TagFilter class="tag-h5" @toggle-click="toggleClick">
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
    <p class="case-number">
      {{ userCaseData.find1 }}{{ currentCaseListAll.length
      }}{{ userCaseData.find2 }}
    </p>
    <div class="case-list">
      <OCard v-for="item in currentCaseList" :key="item.path" class="case-card">
        <div class="card-content-text">
          <h4>{{ item.name }}</h4>
          <p class="detail">
            {{ item.detail }}
          </p>
          <a :href="item.path" target="_blank">
            <OButton type="primary" class="button">{{
              userCaseData.button
            }}</OButton>
          </a>
        </div>
        <div class="card-type-img">
          <img :src="item.img" alt="" />
        </div>
      </OCard>
    </div>
    <div class="page-box">
      <OPagination
        v-model:currentPage="currentPage1"
        v-model:page-size="pageSize4"
        hide-on-single-page="true"
        :page-sizes="[12]"
        :background="true"
        layout="sizes, prev, pager, next, slot, jumper"
        :total="total"
      >
        <span>{{ currentPage1 }}/{{ totalPage }}</span>
      </OPagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-case {
  max-width: 1504px;
  padding: 0 44px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 0;
    background-color: var(--o-color-bg2);
  }
  .banner {
    @media (max-width: 768px) {
      width: 100px;
      height: 156px;
    }
  }
  .tag-box {
    width: 100%;
    display: flex;
    @media (max-width: 768px) {
      padding: 0 16px;
      background-color: #ffffff;
      position: sticky;
      top: 48px;
    }
    .tag-filter {
      padding-left: 0;
    }
    .tag-pc {
      width: 100%;
      margin-top: 24px;
      padding: var(--o-spacing-h5) var(--o-spacing-h2);
      box-shadow: var(--o-shadow-base);
      @media (max-width: 768px) {
        display: none;
      }
    }
    .tag-h5 {
      display: none;
      @media (max-width: 768px) {
        display: block;
        padding: 0;
      }
      .tag-filter-box {
        span {
          padding: 6px 0;
          margin-right: 28px;
          &:nth-of-type(1) {
            margin-right: 22px;
          }
        }
        .o-tag-type-primary {
          border-left: 1px solid transparent;
          border-right: 1px solid transparent;
          border-top: 1px solid transparent;
        }
      }
    }
  }
  .case-number {
    margin-top: var(--o-spacing-h4);
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
  }
  .case-list {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media (max-width: 1280px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      padding: 0 16px;
      margin-top: 48px;
    }
    .case-card {
      height: 198px;
      padding: 40px 26px 40px 40px;
      background-image: url(@/assets/user-case/case-bg.png);
      background-size: cover;
      position: relative;
      display: flex;
      @media (max-width: 768px) {
        height: 144px;
        padding: 16px 16px 14px 12px;
      }
      .card-content-text {
        color: #ffffff;
        h4 {
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
        .detail {
          max-width: 256px;
          max-height: 46px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-top: 2px;
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          @media (max-width: 768px) {
            max-width: 190px;
            margin-top: 8px;
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
        a {
          position: absolute;
          bottom: 40px;
          @media (max-width: 768px) {
            bottom: 14px;
          }
          .button {
            width: 96px;
            height: 28px;
            padding: 0;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            @media (max-width: 768px) {
              width: 88px;
              height: 24px;
              font-size: var(--o-font-size-tip);
            }
          }
        }
      }
      :deep(.el-card__body) {
        width: 100%;
        padding: 0;
        display: flex;
        justify-content: space-between;
      }
      .card-type-img {
        img {
          @media (max-width: 768px) {
            width: 80px;
            height: 80px;
          }
        }
      }
    }
  }
  .page-box {
    margin-top: var(--o-spacing-h2);
  }
}
</style>
