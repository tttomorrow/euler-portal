<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter, useData } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerImg1 from '@/assets/banner-secondary.png';
import BannerImg2 from '@/assets/illustrations/search.png';

const router = useRouter();

const currentPage1 = ref(5);
const pageSize4 = ref(10);
const total = ref(200);

const { theme: i18n } = useData();
const userCaseData = computed(() => i18n.value.interaction);

const newsData = computed(() => {
  return [
    {
      title: 'HDC.Cloud | openEuler黑客马拉松',
      time: '2019-12-10',
      content: 'HDC.Cloud | openEuler黑客马拉松',
      path: '2020hdc',
    },
    {
      title: '开源软件供应链点亮计划 - 暑期2020 openEuler 社区任务发布',
      time: '2020-05-07',
      content:
        '“开源软件供应链点亮计划-暑期2020” 是由中科院软件所与 openEuler 社区共同举办的一项面向高校学生的暑期活动，旨在鼓励在校学生积极参与开源软件的开发维护，促进国内优秀开源软件社区的蓬勃发展。openEuler 社区 Maintainer 总共发布了 16 个类别 102 个任务供参与活动的高校学生申请。',
      path: '20200607',
    },
    {
      title: '【手把手带你玩转openEuler】系列直播进行中',
      time: '2020-07-07',
      content: '【手把手带你玩转openEuler】系列直播进行中',
      path: '20200707-openeluer-live',
    },
    {
      title: 'openEuler 20.09 如约而至',
      time: '2020-09-30',
      content: 'openEuler 20.09 如约而至',
      path: '20200930',
    },
    {
      title: '打造最具活力的操作系统开源社区，全产业链共享多样性算力创新价值',
      time: '2020-12-25',
      content:
        '欢迎更多企业、组织、开发者加入openEuler，共同打造最具活力的操作系统开源社区，共享多样性算力创新价值',
      path: '20201225',
    },
    {
      title: 'openEuler 20.03 LTS SP1 现已发布',
      time: '2020-12-28',
      content:
        'openEuler 20.03 LTS SP1是openEuler 20.03 LTS 的补丁版本,欢迎体验。',
      path: '20201228',
    },
  ];
});

const toNewsContent = (path: string) => {
  const path1 = router.route.path.substring(0, 15);
  const path2 = 'news-content';
  router.go(`${path1}/${path2}/${path}/`);
};
</script>

<template>
  <div class="news">
    <BannerLevel2
      :background-image="BannerImg1"
      background-text="CONNECT"
      :title="userCaseData.news"
      :illustration="BannerImg2"
    />
    <div class="news-list">
      <OCard v-for="item in newsData" :key="item" class="news-list-item">
        <div class="news-img">
          <img src="./2206banner.png" alt="banner" />
        </div>
        <div class="news-info">
          <div class="news-title" @click="toNewsContent(item.path)">
            <p>{{ item.title }}</p>
          </div>
          <div class="news-time">
            <p>{{ item.time }}</p>
          </div>
          <div class="news-content">
            <p>
              {{ item.content }}
            </p>
          </div>
        </div>
      </OCard>
    </div>
    <div class="news-pagination">
      <OPagination
        v-model:currentPage="currentPage1"
        v-model:page-size="pageSize4"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="sizes, prev, pager, next, slot, jumper"
        :total="total"
      >
        <span>5/50</span>
      </OPagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: 0;
}
::-webkit-scrollbar {
  display: none;
}
.news {
  &-list {
    max-width: 1448px;
    margin: var(--o-spacing-h1) auto var(--o-spacing-h2) auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h4);
    padding: 0 var(--o-spacing-h5);
    &-item {
      max-height: 400px;
    }
    &-item:hover {
      box-shadow: var(--o-shadow-base_hover);
    }
  }
  &-img {
    width: 100%;
    height: 188px;
    background-color: #000;
    img {
      width: 100%;
      height: 188px;
    }
  }
  &-info {
    padding: var(--o-spacing-h4);
    color: var(--o-color-text2);
  }
  &-title {
    line-height: var(--o-line-height-h7);
    font-size: var(--o-font-size-h7);
    margin-bottom: var(--o-spacing-h10);
    cursor: pointer;
  }
  &-time {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  &-content {
    margin-top: var(--o-spacing-h5);
    margin-bottom: var(--o-spacing-h4);
    max-height: 80px;
    overflow-y: scroll;
  }
  &-pagination {
    margin-bottom: var(--o-spacing-h1);
  }
}

@media (max-width: 1080px) {
  .news-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .news-list {
    grid-template-columns: repeat(1, 1fr);
  }
  .news-list-item {
    max-width: 100%;
  }
  .news-img {
    max-width: 50%;
    min-width: 50%;
  }
  :deep(.el-card__body) {
    display: flex;
    flex-direction: row;
  }
}
@media (max-width: 415px) {
  .news-list {
    grid-template-columns: repeat(1, 1fr);
  }
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
  }
  .news-img {
    max-width: 100%;
  }
  .news-title {
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
  }
  .news-time {
    line-height: var(--o-line-height-tip);
    font-size: var(--o-font-size-tip);
  }
  .news-content {
    line-height: var(--o-line-height-tip);
    font-size: var(--o-font-size-tip);
  }
}
</style>
