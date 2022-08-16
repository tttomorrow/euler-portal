<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerImg1 from '@/assets/banner-secondary.png';
import BannerImg2 from '@/assets/illustrations/search.png';

import { getSortData } from '@/api/api-search';

interface NewsData {
  articleName: string;
  author: any;
  banner: string;
  category: string;
  date: string;
  deleteType: string;
  lang: string;
  path: string;
  summary: string;
  tags: string[];
  textContent: string;
  title: string;
  type: string;
}

const router = useRouter();
const { lang } = useData();

const sortParams = reactive({
  page: 1,
  pageSize: 9,
  lang: lang.value,
  category: 'news',
});
// 新闻列表数据
const newsCardData = ref<NewsData[]>([]);
// 分页数据
const paginationData = ref({
  total: 0,
  pagesize: 9,
  currentpage: 0,
});

const i18n = useI18n();
const userCaseData = computed(() => i18n.value.interaction);

const toNewsContent = (path: string) => {
  const path1 = router.route.path.substring(0, 3);
  router.go(`${path1}/${path}`);
};

onMounted(() => {
  try {
    getSortData(sortParams).then((res) => {
      paginationData.value.total = res.obj.count;
      paginationData.value.currentpage = res.obj.page;
      paginationData.value.pagesize = res.obj.pageSize;
      newsCardData.value = res.obj.records;
      for (let i = 0; i < newsCardData.value.length; i++) {
        if (typeof newsCardData.value[i].author === 'string') {
          newsCardData.value[i].author = [newsCardData.value[i].author];
        }
        newsCardData.value[i].banner = '/' + newsCardData.value[i].banner;
      }
    });
  } catch (error: any) {
    throw Error(error);
  }
});

const currentChange = (val: number) => {
  const params = {
    category: 'news',
    lang: lang.value,
    page: val,
    pageSize: paginationData.value.pagesize,
  };
  try {
    getSortData(params).then((res) => {
      newsCardData.value = res.obj.records;
      for (let i = 0; i < newsCardData.value.length; i++) {
        if (typeof newsCardData.value[i].author === 'string') {
          newsCardData.value[i].author = [newsCardData.value[i].author];
        }
        newsCardData.value[i].banner = '/' + newsCardData.value[i].banner;
      }
    });
  } catch (error: any) {
    throw Error(error);
  }
};

const sizeChange = (val: number) => {
  const params = {
    category: 'blog',
    lang: lang.value,
    page: paginationData.value.currentpage,
    pageSize: val,
  };
  try {
    getSortData(params).then((res) => {
      newsCardData.value = res.obj.records;
      for (let i = 0; i < newsCardData.value.length; i++) {
        if (typeof newsCardData.value[i].author === 'string') {
          newsCardData.value[i].author = [newsCardData.value[i].author];
        }
        newsCardData.value[i].banner = '/' + newsCardData.value[i].banner;
      }
    });
  } catch (error: any) {
    throw Error(error);
  }
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
      <OCard v-for="item in newsCardData" :key="item" class="news-list-item">
        <div class="news-img" @click="toNewsContent(item.path)">
          <img :src="item.banner" :alt="item.banner" />
        </div>
        <div class="news-info">
          <div class="news-title" @click="toNewsContent(item.path)">
            <p>{{ item.title }}</p>
          </div>
          <div class="news-time">
            <p>{{ item.date }}</p>
          </div>
          <div class="news-content" @click="toNewsContent(item.path)">
            <p>
              {{ item.summary }}
            </p>
          </div>
        </div>
      </OCard>
    </div>
    <div class="news-pagination">
      <OPagination
        v-model:currentPage="paginationData.currentpage"
        v-model:page-size="paginationData.pagesize"
        :background="true"
        layout="sizes, prev, pager, next, slot, jumper"
        :total="paginationData.total"
        :page-sizes="9"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
        <span
          >{{ paginationData.currentpage }}/{{
            Math.ceil(paginationData.total / paginationData.pagesize)
          }}</span
        >
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
    // justify-content: center;
    // align-items: center;
    padding: 0 var(--o-spacing-h5);
    &-item {
      justify-self: center;
      align-self: center;
      max-height: 374px;
      min-height: 374px;
      min-width: 456px;
      max-width: 456px;
      // width:456px;
    }
    &-item:hover {
      box-shadow: var(--o-shadow-base_hover);
    }
  }
  &-img {
    width: 100%;
    height: 188px;
    cursor: pointer;
    img {
      width: 100%;
      height: 188px;
      object-fit: cover;
    }
  }
  &-info {
    padding: var(--o-spacing-h4);
    color: var(--e-color-text1);
    // cursor: pointer;
  }
  &-title {
    font-weight: 400;
    height: 52px;
    line-height: var(--o-line-height-h7);
    font-size: var(--o-font-size-h7);
    margin-bottom: var(--o-spacing-h10);
    cursor: pointer;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  &-time {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  &-content {
    margin-top: var(--o-spacing-h5);
    margin-bottom: var(--o-spacing-h4);
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}

@media (max-width: 1450px) {
  .news-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 980px) {
  .news-list {
    grid-template-columns: repeat(1, 1fr);
  }
  .news-list-item {
    max-width: 100%;
    min-width: 100%;
    max-height: 188px;
    min-height: 188px;
  }
  .news-img {
    max-width: 350px;
    min-width: 350px;
  }
  :deep(.el-card__body) {
    display: flex;
    flex-direction: row;
  }
}
@media (max-width: 620px) {
  .news-list {
  }
  .news-list-item {
    max-width: 456px;
    min-width: 456px;
    max-height: 374px;
    min-height: 374px;
  }
  .news-info {
    max-width: 420px;
    min-width: 420px;
  }
  .news-img {
    min-width: 456px;
  }
  .news-title {
    // font-weight: bold;

    // line-height: var(--o-line-height-text);
    // font-size: var(--o-font-size-text);
  }
  .news-time {
    // line-height: var(--o-line-height-tip);
    // font-size: var(--o-font-size-tip);
  }
  .news-content {
    // line-height: var(--o-line-height-tip);
    // font-size: var(--o-font-size-tip);
  }
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 500px) {
  .news-list {
    grid-template-columns: repeat(1, 1fr);
  }
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
  }
  .news-list-item {
    max-width: 328px;
    min-width: 328px;
    max-height: 312px;
    min-height: 312px;
  }
  .news-img {
    max-width: 100%;
    min-width: 100%;
    max-height: 180px;
    min-height: 180px;
    object-fit: cover;
    // display: block;
  }
  .news-info {
    max-width: 304px;
    min-width: 304px;
  }
  .news-title {
    // font-weight: bold;
    height: auto;
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
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
