<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerImg1 from '@/assets/banner-secondary.png';
import BannerImg2 from '@/assets/illustrations/search.png';
import MobileFilter from '@/components/MobileFilter.vue';
import IconCalendar from '~icons/app/icon-calendar.svg';
import IconUser from '~icons/app/icon-user.svg';
import IconBrowse from '~icons/app/icon-browse.svg';

import { getSortData, getTagsData } from '@/api/api-search';

interface BlogData {
  archives: string;
  articleName: string;
  author: any;
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
const i18n = useI18n();
const userCaseData = computed(() => i18n.value.interaction);
// 新闻列表
const sortParams = reactive({
  page: 1,
  pageSize: 9,
  lang: lang.value,
  category: 'blog',
});
// 标签
const tagsParams = reactive({
  lang: lang.value,
  category: 'blog',
  tags: 'archives',
});
const tagsParams1 = reactive({
  lang: lang.value,
  category: 'blog',
  tags: 'author',
});

const tagsDataToChild = ref<any>([
  {
    title: '时间',
    select: [],
  },
  {
    title: '作者',
    select: [],
  },
]);

// 博客列表数据
const blogCardData = ref<BlogData[]>([]);
// 分页数据
const paginationData = ref({
  total: 0,
  pagesize: 9,
  currentpage: 0,
});

const toBlogContent = (path: string) => {
  const path1 = router.route.path.substring(0, 3);
  router.go(`${path1}/${path}`);
};
// 筛选方法
const listfilter = (val: any) => {
  let paramsdate = '';
  let paramsauthor = '';
  for (let i = 0; i < val.length; i++) {
    if (val[i].title === '时间') {
      paramsdate = val[i].sele[0];
    }
    if (val[i].title === '作者') {
      paramsauthor = val[i].sele[0];
    }
  }
  const params = {
    page: 1,
    pageSize: 9,
    lang: lang.value,
    category: 'blog',
    archives: paramsdate,
    author: paramsauthor,
  };
  try {
    getSortData(params).then((res) => {
      if (res.obj.count === 0) {
        router.go('@/NotFound.vue');
      } else {
        paginationData.value.total = res.obj.count;
        paginationData.value.currentpage = res.obj.page;
        paginationData.value.pagesize = res.obj.pageSize;
        blogCardData.value = res.obj.records;
        for (let i = 0; i < blogCardData.value.length; i++) {
          if (typeof blogCardData.value[i].author === 'string') {
            blogCardData.value[i].author = [blogCardData.value[i].author];
          }
          blogCardData.value[i].archives = blogCardData.value[
            i
          ].archives.substring(0, 7);
        }
      }
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

onMounted(() => {
  try {
    getSortData(sortParams).then((res) => {
      paginationData.value.total = res.obj.count;
      paginationData.value.currentpage = res.obj.page;
      paginationData.value.pagesize = res.obj.pageSize;
      blogCardData.value = res.obj.records;
      for (let i = 0; i < blogCardData.value.length; i++) {
        if (typeof blogCardData.value[i].author === 'string') {
          blogCardData.value[i].author = [blogCardData.value[i].author];
        }
        blogCardData.value[i].archives = blogCardData.value[
          i
        ].archives.substring(0, 7);
      }
    });
  } catch (error: any) {
    throw new Error(error);
  }
  try {
    getTagsData(tagsParams).then((res) => {
      for (let i = 0; i < 5; i++) {
        tagsDataToChild.value[0].select.push(res.obj.totalNum[i].key);
      }
      getTagsData(tagsParams1).then((res) => {
        for (let i = 0; i < 5; i++) {
          tagsDataToChild.value[1].select.push(res.obj.totalNum[i].key);
        }
      });
    });
  } catch (error: any) {
    throw new Error(error);
  }
});
// 页数改变
const currentChange = (val: number) => {
  const params = {
    category: 'blog',
    lang: lang.value,
    page: val,
    pageSize: paginationData.value.pagesize,
  };
  try {
    getSortData(params).then((res) => {
      blogCardData.value = res.obj.records;
      for (let i = 0; i < blogCardData.value.length; i++) {
        if (typeof blogCardData.value[i].author === 'string') {
          blogCardData.value[i].author = [blogCardData.value[i].author];
        }
        blogCardData.value[i].archives = blogCardData.value[
          i
        ].archives.substring(0, 7);
      }
    });
  } catch (error: any) {
    throw new Error(error);
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
      blogCardData.value = res.obj.records;
      for (let i = 0; i < blogCardData.value.length; i++) {
        if (typeof blogCardData.value[i].author === 'string') {
          blogCardData.value[i].author = [blogCardData.value[i].author];
        }
        blogCardData.value[i].archives = blogCardData.value[
          i
        ].archives.substring(0, 7);
      }
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
</script>

<template>
  <div class="blog">
    <BannerLevel2
      :background-image="BannerImg1"
      background-text="CONNECT"
      :title="userCaseData.BLOG"
      :illustration="BannerImg2"
    />
    <div class="blog-tag2">
      <MobileFilter
        :data="tagsDataToChild"
        :single="true"
        @filter="listfilter"
      />
    </div>
    <div class="blog-list">
      <OCard v-for="item in blogCardData" :key="item" class="blog-list-item">
        <div class="blog-list-item-title" @click="toBlogContent(item.path)">
          <p>{{ item.title }}</p>
        </div>
        <div class="blog-list-item-info">
          <div class="infodetail">
            <OIcon class="icon"><IconUser /></OIcon>
            <p v-for="aut in item.author" :key="aut">
              {{ aut }}
            </p>
          </div>
          <div class="infodetail">
            <OIcon class="icon"><IconCalendar /></OIcon>
            <p>
              {{ item.archives }}
            </p>
          </div>
          <div class="infodetail">
            <OIcon class="icon"><IconBrowse /></OIcon>
            <!-- <p>浏览{{ item.browsetimes }}次</p> -->
          </div>
        </div>
        <div class="blog-list-item-content">
          <p>{{ item.summary }}</p>
        </div>
        <div class="blog-list-item-tags">
          <OTag
            v-for="tag in item.tags"
            :key="tag"
            type="secondary"
            class="tagitem"
            >{{ tag }}</OTag
          >
        </div>
      </OCard>
    </div>
    <div class="blog-pagination">
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
  padding: var(--o-spacing-h2);
}
.blog {
  &-tag {
    max-width: 1416px;
    min-height: 82px;
    margin: var(--o-spacing-h1) auto var(--o-spacing-h2) auto;
    box-shadow: var(--o-shadow-base);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: var(--o-spacing-h2);
    background-color: var(--o-color-bg);
  }
  &-tag2 {
    display: none;
  }
  &-list {
    max-width: 1448px;
    margin: var(--o-spacing-h2) auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h4);
    padding: 0 var(--o-spacing-h5);
    &-item {
      background-image: url(@/assets/interaction/bg.png);
      min-height: 248px;
      background-position: right bottom;
      background-repeat: no-repeat;
      &-title {
        font-size: var(--o-font-size-h7);
        margin-bottom: var(--o-spacing-h3); // 32px
        color: var(--o-color-text2);

        p {
          display: inline-block;
          cursor: pointer;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      &-info {
        color: var(--o-color-text3);
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon {
          font-size: var(--o-font-size-h8);
          display: inline-block;
        }
        p {
          font-size: var(--o-font-size-tip);
          display: inline-block;
          margin-left: var(--o-spacing-h9);
          line-height: var(--o-line-height-tip);
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .infodetail {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: var(--o-spacing-h3);
        }
      }
      &-content {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        margin-top: var(--o-spacing-h5);
        min-height: 44px;
        color: var(--o-color-text2);
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      &-tags {
        margin-top: var(--o-spacing-h7);
        .tagitem {
          margin-right: var(--o-spacing-h8);
          color: var(--o-color-text);
        }
      }
    }
    &-item:hover {
      box-shadow: var(--o-shadow-base_hover);
    }
  }
  &-pagination {
    margin-bottom: var(--o-spacing-h1);
  }
}

@media (max-width: 1100px) {
  .blog-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .blog-tag2 {
    display: block;
  }
}
@media (max-width: 768px) {
  .blog-list {
    grid-template-columns: repeat(1, 1fr);
  }
  .blog-tag {
    display: none;
  }
  .blog-tag2 {
    display: block;
  }
}
@media (max-width: 415px) {
  .blog-tag {
    display: none;
  }
  .blog-list {
    margin-top: var(--o-spacing-h5);
  }
}
</style>
