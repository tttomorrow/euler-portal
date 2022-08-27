<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import { getSearchData, getSearchCount, getSearchRpm } from '@/api/api-search';

import NotFound from '@/NotFound.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import IconX from '~icons/app/x.svg';

import useWindowResize from '@/components/hooks/useWindowResize';

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const { lang, site } = useData();

const i18n = useI18n();
// 当前选择类型
const currentIndex = ref(0);
// 当前显示的页码
const currentPage = ref(1);
// 每页数据
const pageSize = ref(12);
// 控制分页器显示的时机
const pageShow = ref(false);
// 搜索内容
const searchInput = ref<string>('');
const searchValue = computed(() => {
  return i18n.value.common.SEARCH;
});
// 接收搜索数量的数据
const searchNumber: any = ref([]);
// 显示的数据类型
const searchType = ref('');
const searchData = computed(() => {
  return {
    keyword: searchInput.value,
    page: currentPage.value,
    pageSize: pageSize.value,
    lang: lang.value,
    type: searchType.value,
  };
});
const searchCount = computed(() => {
  return {
    keyword: searchInput.value,
    lang: lang.value,
  };
});
// 接收获取的搜索数据
const searchResultList: any = ref([]);
// 接收软件包数据
const searchRpmList: any = ref([]);
const isShow = ref(false);
// 总数据数量
const total = computed(() => {
  return searchNumber.value[currentIndex.value]
    ? searchNumber.value[currentIndex.value].doc_count
    : 0;
});
// 分页器总页数
const totalPage = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});

// 点击搜索框的删除图标
function donShowSearchBox() {
  searchInput.value = '';
}
// 点击数据的类型导航
function setCurrentType(index: number, type: string) {
  currentIndex.value = index;
  if (type === 'all') {
    searchType.value = '';
  } else {
    searchType.value = type;
  }
  currentPage.value = 1;
  searchDataAll();
}
function searRpm() {
  try {
    getSearchRpm({ keyword: searchInput.value }).then((res) => {
      if (res.status === 200) {
        searchRpmList.value = res.data.records;
      } else {
        searchRpmList.value = [];
      }
    });
  } catch (error: any) {
    throw Error(error);
  }
}
// 获取搜索结果各类型的数量
function searchCountAll() {
  try {
    getSearchCount(searchCount.value).then((res) => {
      if (res.status === 200 && res.obj.total[0]) {
        searchNumber.value = res.obj.total;
      } else {
        searchNumber.value = [];
      }
    });
  } catch (error: any) {
    throw Error(error);
  }
}
// 获取搜索结果的数据
function searchDataAll() {
  try {
    getSearchData(searchData.value).then((res) => {
      if (res.status === 200 && res.obj.records[0]) {
        searchResultList.value = res.obj.records;
        pageShow.value = true;
        isShow.value = false;
      } else {
        searchResultList.value = [];
        pageShow.value = false;
        isShow.value = true;
      }
    });
  } catch (error: any) {
    throw Error(error);
  }
}
// 获取搜索结果的所有内容
function searchAll() {
  if (searchInput.value) {
    currentIndex.value = 0;
    searchType.value = '';
    currentPage.value = 1;
    searchCountAll();
    searchDataAll();
    searRpm();
  }
}
// 设置搜索结果的跳转路径
function setLink(type: string, link: string) {
  if (type === 'docs') {
    return (
      site.value.themeConfig.docsUrl + '/' + lang.value + '/' + link + '.html'
    );
  } else {
    return '/' + lang.value + '/' + link;
  }
}
// 移动端上下翻页事件
function turnPage(option: string) {
  if (option === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
    searchDataAll();
  } else if (option === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
    searchDataAll();
  }
}
// 移动端跳转翻页事件
function jumpPage(page: number) {
  currentPage.value = page;
  searchDataAll();
}
onMounted(() => {
  if (decodeURI(location.href.split('=')[1]) !== 'undefined') {
    searchInput.value = decodeURI(window.location.href.split('=')[1]) + '';
  }
  searchAll();
});
</script>
<template>
  <div class="search">
    <div class="search-left">
      <OSearch
        v-model="searchInput"
        :placeholder="searchValue.PLEACHOLDER"
        @change="searchAll"
      >
        <template #suffix>
          <OIcon class="close" @click="donShowSearchBox"><IconX /></OIcon>
        </template>
      </OSearch>
      <div class="search-content">
        <ul class="type">
          <li
            v-for="(item, index) in searchNumber"
            :key="item"
            :class="currentIndex === index ? 'active' : ''"
            @click="setCurrentType(index, item.key)"
          >
            {{ i18n.search.tagList[item.key] }}
            <span>({{ item.doc_count }})</span>
          </li>
        </ul>
        <ul v-show="!isShow" class="content-list">
          <li v-for="item in searchResultList" :key="item.id">
            <a :href="setLink(item.type, item.path)" target="_blank">
              <!-- eslint-disable-next-line -->
              <h3 v-html="item.title"></h3>
            </a>
            <!-- eslint-disable-next-line -->
            <p class="detail" v-html="item.textContent"></p>
            <p class="from">
              <span>{{ i18n.search.form }}</span>
              <span>{{ i18n.search.tagList[item.type] }}</span>
            </p>
          </li>
        </ul>
        <div v-if="totalPage > 1 && pageShow" class="page-box">
          <OPagination
            v-if="!isMobile"
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            class="pagination-pc"
            :hide-on-single-page="true"
            :page-sizes="[pageSize]"
            :background="true"
            layout="sizes, prev, pager, next, slot, jumper"
            :total="total"
            @current-change="searchDataAll"
          >
            <span class="pagination-slot"
              >{{ currentPage }}/{{ totalPage }}</span
            >
          </OPagination>
          <AppPaginationMo
            :current-page="currentPage"
            :total-page="totalPage"
            @turn-page="turnPage"
            @jump-page="jumpPage"
          />
        </div>
        <NotFound v-if="isShow" />
      </div>
    </div>
    <div class="search-right">
      <h3>{{ i18n.search.relative }}</h3>
      <el-scrollbar height="1915px">
        <ul>
          <li v-for="item in searchRpmList" :key="item.filename">
            <a :href="item.path" target="_blank">{{ item.filename }}</a>
            <p>{{ item.version }}</p>
          </li>
          <li v-show="!searchRpmList[0]">
            {{ i18n.search.no }}{{ i18n.search.relative }}
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search {
  max-width: 1504px;
  padding: var(--o-spacing-h2) 44px var(--o-spacing-h1);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr minmax(150px, 320px);
  grid-gap: 32px;
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--o-spacing-h4);
  }
  @media (max-width: 1100px) {
    padding: 0 16px var(--o-spacing-h2);
    padding-top: var(--o-spacing-h2);
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    padding: 0 0 var(--o-spacing-h2) 0;
    padding-top: var(--o-spacing-h5);
  }
  .search-left {
    max-width: 1072px;
    .o-search {
      @media (max-width: 768px) {
        height: 24px;
        font-size: 14px;
        padding: 0 16px;

        :deep(.el-input__inner) {
          font-size: 14px;
          height: 100%;
        }
        :deep(.el-input__prefix-inner) {
          font-size: 16px;
        }
        :deep(.el-input__wrapper) {
          background-color: var(--e-color-bg4);
        }
      }
    }
    .close {
      cursor: pointer;
    }
    .search-content {
      width: 100%;
      margin-top: var(--o-spacing-h2);
      @media (max-width: 768px) {
        margin-top: var(--o-spacing-h5);
      }
      .type {
        width: 100%;
        display: flex;
        padding-left: var(--o-spacing-h2);
        background-color: var(--e-color-bg2);
        border-bottom: 1px solid var(--e-color-division1);
        @media (max-width: 768px) {
          padding-left: var(--o-spacing-h4);
        }
        li {
          height: 55px;
          margin-right: var(--o-spacing-h2);
          color: var(--e-color-text1);
          font-size: var(--o-font-size-h8);
          line-height: 55px;
          cursor: pointer;
          @media (max-width: 768px) {
            height: 34px;
            line-height: 34px;
            font-size: var(--o-font-size-text);
            margin-right: 30px;
            span {
              display: none;
            }
          }
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 2px;
            background-color: transparent;
            @media (max-width: 768px) {
              position: relative;
              top: -1px;
            }
          }
        }
        .active {
          color: var(--e-color-kleinblue8);
          &::after {
            background-color: var(--e-color-kleinblue8);
          }
        }
      }
      .content-list {
        padding: 0 var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2);
        background-color: var(--e-color-bg2);
        min-height: 1948px;
        @media (max-width: 768px) {
          padding: 0 var(--o-spacing-h5) var(--o-spacing-h5) var(--o-spacing-h5);
          margin: var(--o-spacing-h5) var(--o-spacing-h5) 0 var(--o-spacing-h5);
          min-height: 0;
        }
        li {
          padding-top: var(--o-spacing-h2);
          @media (max-width: 768px) {
            padding-top: var(--o-spacing-h5);
          }
          h3 {
            font-size: var(--o-font-size-h5);
            color: var(--e-color-text1);
            line-height: var(--o-line-height-h5);
            font-weight: 500;
            :deep(span) {
              color: var(--e-color-brand1);
            }
            @media (max-width: 768px) {
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
            }
          }
          .detail {
            margin-top: 17px;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--e-color-text1);
            :deep(span) {
              color: var(--e-color-brand1);
            }
            @media (max-width: 768px) {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
            }
          }
          .from {
            margin-top: 15px;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--e-color-text1);
            @media (max-width: 768px) {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
            }
          }
        }
      }
      .page-box {
        margin-top: var(--o-spacing-h4);
        .pagination-pc {
          @media (max-width: 768px) {
            display: none;
          }
        }
      }
    }
  }
  .search-right {
    width: 320px;
    height: 2005px;
    margin-top: 78px;
    background-color: var(--e-color-bg2);
    @media (max-width: 1100px) {
      display: none;
    }
    h3 {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      padding: var(--o-spacing-h2);
      padding-bottom: 0;
      color: var(--e-color-text1);
    }
    ul {
      padding: 0 var(--o-spacing-h2);
      li {
        padding-top: var(--o-spacing-h4);
        color: var(--e-color-text1);
        a {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--e-color-brand1);
        }
        p {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          margin-top: var(--o-spacing-h8);
          color: var(--e-color-text1);
        }
      }
    }
    :deep(.is-horizontal) {
      display: none;
    }
  }
}
</style>
