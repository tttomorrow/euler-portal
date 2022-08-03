<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerImg1 from '@/assets/banner-secondary.png';
import BannerImg2 from '@/assets/illustrations/search.png';

const router = useRouter();

const currentPage1 = ref(5);
const pageSize4 = ref(10);
const total = ref(200);

const i18n = computed(() => useI18n());
const userCaseData = computed(() => i18n.value.interaction);

const toNewsContent = (path: string) => {
  const path1 = router.route.path.substring(0, 3);
  const path2 = 'news';
  router.go(`${path1}/${path2}/${path}`);
};
</script>

<template>
  <div class="news">
    <BannerLevel2
      :background-image="BannerImg1"
      background-text="CONNECT"
      :title="userCaseData.NEWS"
      :illustration="BannerImg2"
    />
    <div class="news-list">
      <OCard
        v-for="item in userCaseData.NEWSDATALIST"
        :key="item"
        class="news-list-item"
      >
        <div class="news-img">
          <img :src="item.banner" :alt="item.banner" />
        </div>
        <div class="news-info">
          <div class="news-title" @click="toNewsContent(item.path)">
            <p>{{ item.title }}</p>
          </div>
          <div class="news-time">
            <p>{{ item.date }}</p>
          </div>
          <div class="news-content">
            <p>
              {{ item.summary }}
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
