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
import NotFound from '@/NotFound.vue';
import IconRight from '~icons/app/arrow-right.svg';

import { getSortData, getTagsData } from '@/api/api-search';
import OIcon from 'opendesign/icon/OIcon.vue';
import AppContent from '@/components/AppContent.vue';

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

interface ParamsType {
  page: number;
  pageSize: number;
  lang: string;
  category: string;
  archives?: string;
  author?: string;
  tags?: string;
}

const router = useRouter();
const { lang } = useData();
const i18n = useI18n();
const userCaseData = computed(() => i18n.value.interaction);

const isShowData = ref(false);
// 博客列表
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
// 移动端数据
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
// pc端筛选数据
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

// 获取列表数据
const getListData = (params: ParamsType) => {
  getSortData(params)
    .then((res) => {
      if (res.obj.count === 0) {
        isShowData.value = false;
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
        isShowData.value = true;
      }
    })
    .catch((error: any) => {
      isShowData.value = false;
      throw new Error(error);
    });
};

// 筛选方法
const listFilter = (val: any) => {
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
  getListData(params);
};
// pc筛选
const selectMethod = () => {
  const params = {
    page: 1,
    pageSize: 9,
    lang: lang.value,
    category: 'blog',
    archives: selectTimeVal.value === '' ? undefined : selectTimeVal.value,
    author: selectAuthorVal.value === '' ? undefined : selectAuthorVal.value,
    tags: selectTagsVal.value === '' ? undefined : selectTagsVal.value,
  };
  getListData(params);
};
onMounted(() => {
  getListData(sortParams);

  getTagsData(tagsParams).then((res) => {
    for (let i = 0; i < 5; i++) {
      tagsDataToChild.value[0].select.push(res.obj.totalNum[i].key);
    }
    res.obj.totalNum.forEach((item: any) => {
      selectData.value[0].select.push(item.key);
    });
    tagsParams.tags = 'author';
    getTagsData(tagsParams)
      .then((res) => {
        for (let i = 0; i < 5; i++) {
          tagsDataToChild.value[1].select.push(res.obj.totalNum[i].key);
        }
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
// 页数改变
const currentChange = (val: number) => {
  const params = {
    category: 'blog',
    lang: lang.value,
    page: val,
    pageSize: paginationData.value.pagesize,
  };
  getListData(params);
};

const postBlog = () => {
  router.go(`/${lang.value}/interaction/post-blog/`);
};
</script>

<template>
  <BannerLevel2
    :background-image="BannerImg1"
    background-text="INTERACTION"
    :title="userCaseData.BLOG"
    :illustration="BannerImg2"
  >
    <template #default>
      <OButton
        class="post-btn"
        type="outline"
        animation
        size="small"
        @click="postBlog"
      >
        {{ userCaseData.STRATEGY }}
        <template #suffixIcon>
          <OIcon class="bannericon"><IconRight /></OIcon>
        </template>
      </OButton>
    </template>
  </BannerLevel2>
  <AppContent :mobile-top="16">
    <template v-if="true">
      <div class="blog-select">
        <div class="blog-select-item">
          <span class="blog-select-item-title">{{ userCaseData.TIME }}</span>
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
        <div class="blog-select-item">
          <span class="blog-select-item-title">{{ userCaseData.AUTHOR }}</span>
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
        <div class="blog-select-item">
          <span class="blog-select-item-title">{{ userCaseData.TAGS }}</span>
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
      <div class="blog-tag2">
        <MobileFilter
          :data="tagsDataToChild"
          :single="true"
          @filter="listFilter"
        />
      </div>
    </template>
    <template v-if="isShowData">
      <div class="blog-list">
        <OCard
          v-for="item in blogCardData"
          :key="item"
          class="blog-list-item"
          @click="toBlogContent(item.path)"
        >
          <div class="blog-list-item-title">
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
              <!-- <p>{{userCaseData.BROWSE}}{{ item.browsetimes }}{{userCaseData.TIMES}}</p> -->
              <p>{{ userCaseData.BROWSE }}10{{ userCaseData.TIMES }}</p>
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
              :title="tag"
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
          :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
          @current-change="currentChange"
          @size-change="currentChange"
        >
          <span class="pagination-slot"
            >{{ paginationData.currentpage }}/{{
              Math.ceil(paginationData.total / paginationData.pagesize)
            }}</span
          >
        </OPagination>
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
  padding: var(--o-spacing-h2);
}

.bannericon {
  margin-left: var(--o-spacing-h8);
  color: var(--e-color-brand2);
}

.post-btn {
  color: var(--e-color-white);
  border-color: var(--e-color-white);
  @media (max-width: 767px) {
    padding: 4px 12px;
  }
}

.pagination-slot {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  color: var(--e-color-text1);
  line-height: var(--o-spacing-h4);
}

.blog {
  &-tag2 {
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
        font-size: var(--o-font-size-text);
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
      background-image: url(@/assets/interaction/bg.png);

      background-position: right bottom;
      background-repeat: no-repeat;
      cursor: pointer;
      &-title {
        font-size: var(--o-font-size-h7);
        margin-bottom: var(--o-spacing-h3); // 32px
        color: var(--e-color-text1);

        p {
          display: inline-block;
          @include showline();
          -webkit-line-clamp: 2;
        }
      }
      &-info {
        color: var(--e-color-text4);
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
          @include showline();
          -webkit-line-clamp: 1;
        }
        .infodetail {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: var(--o-spacing-h3);
          @media (max-width: 1100px) {
            margin-right: var(--o-spacing-h5);
          }
          @media (max-width: 768px) {
            margin-right: var(--o-spacing-h6);
          }
        }
      }
      &-content {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        margin-top: var(--o-spacing-h5);
        height: 44px;
        color: var(--e-color-text1);
        @include showline();
        -webkit-line-clamp: 2;
      }
      &-tags {
        margin-top: var(--o-spacing-h7);
        .tagitem {
          margin-right: var(--o-spacing-h8);
          color: var(--e-color-text1);
        }
      }
    }
    &-item:hover {
      box-shadow: var(--e-shadow-l2_hover);
    }
  }
}
@media (max-width: 1100px) {
  .blog-list {
    grid-template-columns: repeat(2, 1fr);
    margin-top: var(--o-spacing-h5);
  }
  // .blog-tag2 {
  // display: block; // 暂时干掉移动端筛选
  // }
  .blog-select {
    display: none;
  }
  :deep(.el-card__body) {
    padding: var(--o-spacing-h4);
    height: 100%;
  }
}
@media (max-width: 768px) {
  .blog-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (max-width: 415px) {
  :deep(.el-card__body) {
    padding: var(--o-spacing-h6);
    height: auto;
  }
  .blog-list-item {
    height: auto;
  }
  .blog-list {
    margin-top: var(--o-spacing-h5);
  }

  .blog-list-item-content {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    height: auto;
    @include showline();
    -webkit-line-clamp: 1;
  }
  .blog-list-item-title {
    margin-bottom: var(--o-spacing-h5);
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    font-weight: 500;
  }
  .tagitem {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
  }
  .blog-list-item-tags {
    margin-top: var(--o-spacing-h5);
  }
}
</style>
