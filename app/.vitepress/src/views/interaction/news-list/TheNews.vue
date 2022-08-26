<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerImg1 from '@/assets/banner-secondary.png';
import BannerImg2 from '@/assets/illustrations/search.png';
import NotFound from '@/NotFound.vue';
import MobileFilter from '@/components/MobileFilter.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import { getSortData, getTagsData } from '@/api/api-search';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

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

interface ParamsType {
  page: number;
  pageSize: number;
  lang: string;
  category: string;
}

const router = useRouter();
const { lang } = useData();
const screenWidth = useWindowResize();

const sortParams = reactive({
  page: 1,
  pageSize: 9,
  lang: lang.value,
  category: 'news',
});
// 新闻列表数据
const newsCardData = ref<NewsData[]>([]);
const isShowData = ref(false);
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

// 分页数据
const paginationData = ref({
  total: 0,
  pagesize: 9,
  currentpage: 0,
});

// 获取标签数据
const tagsParams = reactive({
  lang: lang.value,
  category: 'news',
  tags: 'archives',
});
const i18n = useI18n();
const userCaseData = computed(() => i18n.value.interaction);

const toNewsContent = (path: string) => {
  const path1 = router.route.path.substring(0, 3);
  router.go(`${path1}/${path}`);
};

//筛选数据
const selectData = ref<any>([
  {
    title: '时间',
    select: [],
  },
  {
    title: '作者',
    select: [],
  },
  {
    title: '标签',
    select: [],
  },
]);
const selectTimeVal = ref('');
const selectAuthorVal = ref('');
const selectTagsVal = ref('');

// pc筛选
const selectMethod = () => {
  const params = {
    page: 1,
    pageSize: 9,
    lang: lang.value,
    category: 'news',
    archives: selectTimeVal.value === '' ? undefined : selectTimeVal.value,
    author: selectAuthorVal.value === '' ? undefined : selectAuthorVal.value,
    tags: selectTagsVal.value === '' ? undefined : selectTagsVal.value,
  };
  getListData(params);
};

//获取数据
const getListData = (params: ParamsType) => {
  getSortData(params)
    .then((res) => {
      if (res.obj.count === 0) {
        isShowData.value = false;
      } else {
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
        isShowData.value = true;
      }
    })
    .catch((error: any) => {
      isShowData.value = false;
      throw new Error(error);
    });
};

const listFilter = (val: any) => {
  let paramsdate = '';
  let paramsauthor = '';
  let paramstag = '';
  for (let i = 0; i < val.length; i++) {
    if (val[i].title === '时间') {
      paramsdate = val[i].sele[0];
    }
    if (val[i].title === '作者') {
      paramsauthor = val[i].sele[0];
    }
    if (val[i].title === '标签') {
      paramstag = val[i].sele[0];
    }
  }
  const params = {
    page: 1,
    pageSize: 9,
    lang: lang.value,
    category: 'news',
    archives: paramsdate,
    author: paramsauthor,
    tags: paramstag,
  };
  getListData(params);
};

onMounted(() => {
  getListData(sortParams);
  getTagsData(tagsParams).then((res) => {
    res.obj.totalNum.forEach((item: any) => {
      selectData.value[0].select.push(item.key);
    });
    tagsParams.tags = 'author';
    getTagsData(tagsParams)
      .then((res) => {
        res.obj.totalNum.forEach((item: any) => {
          selectData.value[1].select.push(item.key);
        });
        tagsParams.tags = 'tags';
        getTagsData(tagsParams).then((res) => {
          res.obj.totalNum.forEach((item: any) => {
            selectData.value[2].select.push(item.key);
          });
        });
      })
      .catch((error: any) => {
        isShowData.value = false;
        throw new Error(error);
      });
  });
});

const currentChange = (val: number) => {
  const params = {
    category: 'news',
    lang: lang.value,
    page: val,
    pageSize: paginationData.value.pagesize,
  };
  getListData(params);
};
// 计算总页数
const pageTotal = computed(() =>
  Math.ceil(paginationData.value.total / paginationData.value.pagesize)
);

const moblieCurrentChange = (val: string) => {
  if (val === 'prev' && paginationData.value.currentpage > 1) {
    paginationData.value.currentpage = paginationData.value.currentpage - 1;
    currentChange(paginationData.value.currentpage);
  } else if (
    val === 'next' &&
    paginationData.value.currentpage < pageTotal.value
  ) {
    paginationData.value.currentpage = paginationData.value.currentpage + 1;
    currentChange(paginationData.value.currentpage);
  }
};
</script>

<template>
  <BannerLevel2
    :background-image="BannerImg1"
    background-text="INTERACTION"
    :title="userCaseData.NEWS"
    :illustration="BannerImg2"
  />
  <AppContent :mobile-top="16">
    <template v-if="true">
      <div class="news-tag">
        <MobileFilter :data="selectData" :single="true" @filter="listFilter" />
      </div>
      <div class="news-select">
        <div class="news-select-item">
          <span class="news-select-item-title">{{ userCaseData.TIME }}</span>
          <OSelect
            v-model="selectTimeVal"
            filterable
            clearable
            :placeholder="userCaseData.ALL"
            @change="selectMethod"
          >
            <OOption
              v-for="item in selectData[0].select"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </div>
        <div class="news-select-item">
          <span class="news-select-item-title">{{ userCaseData.AUTHOR }}</span>
          <OSelect
            v-model="selectAuthorVal"
            filterable
            clearable
            :placeholder="userCaseData.ALL"
            @change="selectMethod"
          >
            <OOption
              v-for="item in selectData[1].select"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </div>
        <div class="news-select-item">
          <span class="news-select-item-title">{{ userCaseData.TAGS }}</span>
          <OSelect
            v-model="selectTagsVal"
            filterable
            clearable
            :placeholder="userCaseData.ALL"
            @change="selectMethod"
          >
            <OOption
              v-for="item in selectData[2].select"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </div>
      </div>
    </template>
    <template v-if="isShowData">
      <div class="news-list">
        <OCard
          v-for="item in newsCardData"
          :key="item"
          class="news-list-item"
          @click="toNewsContent(item.path)"
        >
          <div class="news-img">
            <img :src="item.banner" :alt="item.banner" />
          </div>
          <div class="news-info">
            <div class="news-title">
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
          v-model:currentPage="paginationData.currentpage"
          v-model:page-size="paginationData.pagesize"
          :background="true"
          layout="sizes, prev, pager, next, slot, jumper"
          :total="paginationData.total"
          :page-sizes="[3, 6, 9]"
          v-if="!isMobile"
          @current-change="currentChange"
          @size-change="currentChange(1)"
        >
          <span class="pagination-slot"
            >{{ paginationData.currentpage }}/{{ pageTotal }}</span
          >
        </OPagination>
        <AppPaginationMo
          :current-page="paginationData.currentpage"
          :total-page="pageTotal"
          @turn-page="moblieCurrentChange"
        >
        </AppPaginationMo>
      </div>
    </template>
    <NotFound v-else />
  </AppContent>
</template>

<style lang="scss" scoped>
@mixin showline {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
:deep(.el-card__body) {
  padding: 0;
}
::-webkit-scrollbar {
  display: none;
}
.dark img {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.news-pagination {
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--o-spacing-h4);
  }
}
.news {
  &-tag {
    display: none;
  }
  &-select {
    display: flex;
    flex-direction: row;
    width: 1416px;
    &-item {
      margin-right: var(--o-spacing-h1);
      &-title {
        margin-right: var(--o-spacing-h5);
        color: var(--e-color-text1);
        font-size: var(--o-font-size-h7);
      }
    }
  }
  &-list {
    max-width: 1448px;
    margin: var(--o-spacing-h2) auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h4);
    &-item {
      justify-self: center;
      align-self: center;
      flex: 1;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    &-item:hover {
      box-shadow: var(--e-shadow-l2_hover);
      .news-img img {
        transform: scale(1.05);
      }
    }
  }
  &-img {
    width: 100%;
    height: 188px;
    max-height: 188px;
    object-fit: cover;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }
  &-info {
    padding: var(--o-spacing-h4);
    color: var(--e-color-text1);
  }
  &-title {
    font-weight: 400;
    height: 52px;
    line-height: var(--o-line-height-h7);
    font-size: var(--o-font-size-h7);
    margin-bottom: var(--o-spacing-h10);
    @include showline();
    -webkit-line-clamp: 2;
  }
  &-time {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  &-content {
    margin-top: var(--o-spacing-h5);
    @include showline();
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
@media (max-width: 1100px) {
  // .news-tag {
  // display: block; // 暂时干掉移动筛选
  // }
  // .news-select {
  //   display: none;
  // }
  .news-list {
    margin-top: var(--o-spacing-h5);
  }
  .news-select {
    width: auto;
    display: flex;
    flex-direction: column;
    &-item {
      &-title {
        width: 50px;
      }
      margin: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--o-spacing-h5);
      :deep(.o-select) {
        width: 100%;
      }
    }
  }
}
@media (max-width: 980px) {
  .news-list {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 0;
  }

  :deep(.el-card__body) {
    display: flex;
    flex-direction: row;
  }
  .news-img,
  .news-info {
    flex: 1;
  }
}
@media (max-width: 768px) {
  .pcpagination {
    display: none;
  }
}
@media (max-width: 620px) {
  .news-list-item {
    height: auto;
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

  .news-img {
    height: 180px;
  }
  .news-info {
    width: 100%;
    padding: var(--o-spacing-h6);
  }
  .news-title {
    height: auto;
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
    font-weight: 500;
    @include showline();
    -webkit-line-clamp: 1;
    margin-bottom: var(--o-spacing-h8);
  }
  .news-time {
    line-height: var(--o-line-height-tip);
    font-size: var(--o-font-size-tip);
    color: var(--e-color-neutral5);
  }
  .news-content {
    line-height: var(--o-line-height-tip);
    font-size: var(--o-font-size-tip);
    color: var(--e-color-neutral5);
  }
}
</style>
