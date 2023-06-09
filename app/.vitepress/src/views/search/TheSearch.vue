<script setup lang="ts">
import { computed, watch, ref, onMounted, reactive } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import {
  getSearchData,
  getSearchCount,
  getSearchRpm,
  getRelevant,
  getTagsData,
} from '@/api/api-search';

import IconSearch from '~icons/app/icon-search.svg';
import NotFound from '@/NotFound.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import IconCancel from '~icons/app/icon-cancel.svg';

import useWindowResize from '@/components/hooks/useWindowResize';
import { addSearchBuriedData } from '@/shared/utils';

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
    docsVersion:
      activeVersion.value === i18n.value.search.tagList.all
        ? ''
        : activeVersion.value,
  };
});
const searchCount = computed(() => {
  return {
    keyword: searchInput.value,
    lang: lang.value,
    docsVersion:
      activeVersion.value === i18n.value.search.tagList.all
        ? ''
        : activeVersion.value,
  };
});

const tagsParams = reactive({
  lang: lang.value,
  category: 'docs',
  want: 'version',
});
const versionList = ref([
  {
    count: 0,
    key: i18n.value.search.tagList.all,
  },
]);
// 接收获取的搜索数据
const searchResultList: any = ref([]);
// 接收软件包数据
const searchRpmList: any = ref([]);
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
// 关联词
const suggestList = ref([]);
//
const activeVersion = ref('');

async function getVersionTag() {
  await getTagsData(tagsParams).then((res) => {
    if (res.obj?.totalNum.length) {
      activeVersion.value = res.obj?.totalNum[0].key;
    }
    versionList.value.push(...res.obj?.totalNum);
  });
}

// 点击搜索框的删除图标
function clearSearchInput() {
  searchResultList.value = '';
  searchInput.value = '';
  searchRpmList.value = '';
  searchNumber.value.map((item: any) => {
    item.doc_count = 0;
  });
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
function searchRpm() {
  try {
    getSearchRpm({ keyword: searchInput.value }).then((res) => {
      if (res.status === 200) {
        searchRpmList.value = res.data.records;
      } else {
        searchRpmList.value = [];
      }
    });
  } catch (error: any) {
    console.error(error);
  }
}
// 获取搜索结果各类型的数量
async function searchCountAll(key?: string) {
  try {
    await getSearchCount(searchCount.value).then((res) => {
      if (res.status === 200 && res.obj.total[0]) {
        res.obj.total.some((item: { key: string }, index: number) => {
          if (item.key === key) {
            currentIndex.value = index;
            return true;
          }
        });
        searchNumber.value = res.obj.total;
        getSussageData();
      } else {
        searchNumber.value = [];
      }
    });
  } catch (error: any) {
    console.error(error);
  }
}
// 联想搜索
function getSussageData() {
  getRelevant(searchData.value).then((res) => {
    suggestList.value = res?.obj?.suggestList;
  });
}
// 获取搜索结果的数据
function searchDataAll() {
  try {
    getSearchData(searchData.value).then((res) => {
      if (res.status === 200 && res.obj.records[0]) {
        searchResultList.value = res.obj.records;
        pageShow.value = true;
      } else {
        if (searchType.value === 'docs') {
          searchType.value = '';
          searchAll();
        }
        searchResultList.value = [];
        pageShow.value = false;
      }
    });
  } catch (error: any) {
    console.error(error);
  }
}
// 获取搜索结果的所有内容
function searchAll(current?: string) {
  if (searchInput.value) {
    if (!current) {
      currentIndex.value = 0;
    }
    currentPage.value = 1;
    addSearchBuriedData(searchInput.value);
    searchType.value = current || '';
    searchCountAll(current);
    searchDataAll();
    searchRpm();
    handleSelectChange(searchInput.value);
  } else {
    clearSearchInput();
  }
}
function handleSelectChange(val: string) {
  history.pushState(null, '', `?search=${val}`);
}
function handleSelect(val: string) {
  searchInput.value = val.replace(/<[^>]+>/g, '');
  searchAll();
}
// 设置搜索结果的跳转路径
function goLink(data: any, index: number) {
  let { path } = data;
  let search_result_url = '/' + path;
  const searchKeyObj = {
    search_tag: data.type,
    search_rank_num: pageSize.value * (currentPage.value - 1) + (index + 1),
    search_result_total_num: total.value,
    search_result_url: '',
  };
  const sensors = (window as any)['sensorsDataAnalytic201505'];
  const sensorObj = {
    profileType: 'selectSearchResult',
    ...(data || {}),
    ...((window as any)['sensorsCustomBuriedData'] || {}),
    ...((window as any)['addSearchBuriedData'] || {}),
    ...searchKeyObj,
  };
  if (data.type === 'docs') {
    // hugo 编译 路由空格会被替换为 -
    path = path.replaceAll(' ', '-');
    search_result_url = site.value.themeConfig.docsUrl + '/' + path + '.html';
    sensorObj.search_result_url = search_result_url;
  } else if (data.type === 'forum') {
    search_result_url = `${site.value.themeConfig.forumUrl}${path}`;
    sensorObj.search_result_url = search_result_url;
  } else {
    data.type === 'news' || data.type === 'blog'
      ? (search_result_url = `${search_result_url}.html`)
      : '';
    search_result_url = location.origin + search_result_url;
  }
  window.open(encodeURI(search_result_url));
  sensors.setProfile(sensorObj);
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
onMounted(async () => {
  await getVersionTag();
  if (decodeURI(location.href.split('=')[1]) !== 'undefined') {
    searchInput.value = decodeURI(window.location.href.split('=')[1]) + '';
  }
  searchAll();
});

watch(
  () => activeVersion.value,
  () => {
    searchAll('docs');
  }
);
</script>
<template>
  <div class="search">
    <div class="search-left">
      <OSearch
        v-model="searchInput"
        :placeholder="searchValue.PLEACHOLDER"
        @change="() => searchAll()"
      >
        <template #suffix>
          <OIcon class="close" @click="clearSearchInput"><IconCancel /></OIcon>
        </template>
      </OSearch>
      <div v-show="suggestList.length" class="suggest-list-box">
        <span>{{ i18n.search.suggest }}</span>
        <ul class="suggest-list">
          <li
            v-for="suggest in suggestList"
            :key="suggest"
            class="suggest"
            @click="handleSelect(suggest)"
            v-html="suggest"
          ></li>
        </ul>
      </div>
      <div
        class="search-content"
        :class="suggestList.length ? 'exist-suggest' : ''"
      >
        <div class="select-options">
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

          <ClientOnly>
            <OSelect v-model="activeVersion" :placeholder="i18n.sig.SIG_ALL">
              <template #prefix>
                <OIcon>
                  <IconSearch />
                </OIcon>
              </template>
              <OOption
                v-for="item in versionList"
                :key="item.key"
                :label="item.key"
                :value="item.key"
              />
            </OSelect>
          </ClientOnly>
        </div>

        <div class="content-box">
          <ul v-if="searchResultList.length" class="content-list">
            <li v-for="(item, index) in searchResultList" :key="item.id">
              <h3 @click="goLink(item, index)" v-html="item.title"></h3>
              <p
                class="detail"
                @click="goLink(item, index)"
                v-html="item.textContent"
              ></p>
              <p class="from">
                <span>{{ i18n.search.form }}</span>
                <span>{{ i18n.search.tagList[item.type] }}</span>
              </p>
              <p v-if="item.version" class="from version">
                <span>{{ i18n.search.version }}</span>
                <span>{{ item.version }}</span>
              </p>
            </li>
          </ul>
          <NotFound v-else />
        </div>
        <div v-if="totalPage > 1 && pageShow" class="page-box">
          <ClientOnly>
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
          </ClientOnly>
          <AppPaginationMo
            :current-page="currentPage"
            :total-page="totalPage"
            @turn-page="turnPage"
            @jump-page="jumpPage"
          />
        </div>
      </div>
    </div>
    <div
      class="search-right"
      :class="suggestList.length ? 'exist-suggest-1' : ''"
    >
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
  .suggest-list-box {
    display: flex;
    margin: 16px 0 32px;
    font-size: var(--o-font-size-text);
    @media (max-width: 768px) {
      padding: 0 16px;
      margin: 12px 0 24px;
    }
    .suggest-list {
      display: flex;
      .suggest {
        margin-right: 8px;
        cursor: pointer;
        :deep(em) {
          color: var(--o-color-brand1);
          font-style: normal;
        }
      }
    }
  }
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
  @media (max-width: 1439px) {
    padding-left: 24px;
  }
  @media (max-width: 1160px) {
    grid-gap: 12px;
  }
  @media (max-width: 1200px) {
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

    @media (max-width: 768px) {
      :deep(.o-search) {
        height: 28px;
        font-size: 14px;
        width: 100vw;
        padding: 0 16px;
      }

      :deep(.el-input__inner) {
        font-size: 14px;
        height: 100%;
      }
      :deep(.el-input__prefix-inner) {
        font-size: 16px;
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
      .select-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        background-color: var(--o-color-bg2);
        border-bottom: 1px solid var(--o-color-division1);
        @media screen and (max-width: 1620px) {
          padding: 0 24px;
        }
        @media screen and (max-width: 768px) {
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          padding: 0;
          margin: 0 16px;
          background-color: var(--o-color-bg1);
          border: none;
        }
        .type {
          display: flex;
          flex-shrink: 0;
          background-color: var(--o-color-bg2);
          @media (max-width: 768px) {
            // min-width: 400px;
            width: 100%;
            padding: 0 16px;
            margin-bottom: 16px;
            box-shadow: var(--o-shadow-l1);
          }
          li {
            position: relative;
            display: flex;
            align-items: center;
            height: 63px;
            min-width: 56px;
            margin-right: var(--o-spacing-h3);
            color: var(--o-color-text1);
            font-size: var(--o-font-size-h8);
            cursor: pointer;
            @media screen and (max-width: 1620px) {
              margin-right: 24px;
            }
            @media (max-width: 768px) {
              height: 34px;
              line-height: 34px;
              min-width: auto;
              font-size: var(--o-font-size-text);
              margin-right: 0;
              text-align: center;
              & + li {
                margin-left: 12px;
              }
              span {
                display: none;
              }
            }
            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 2px;
              background-color: transparent;
              @media (max-width: 768px) {
                bottom: -1px;
              }
            }
          }
          .active {
            color: var(--o-color-brand1);
            &::after {
              background-color: var(--o-color-brand1);
            }
          }
        }
        :deep(.el-select) {
          @media screen and (max-width: 768px) {
            width: 100%;
            padding-bottom: 8px;
          }
          &:hover {
            box-shadow: none;
          }
          .el-input__wrapper {
            padding: 0 8px;
            box-shadow: 0 0 1px var(--o-color-border1);
          }
        }
      }

      .content-box {
        min-height: 1948px;
        box-shadow: var(--o-shadow-l1);
        background-color: var(--o-color-bg2);
        @media (max-width: 768px) {
          width: 100vw;
          padding: var(--o-spacing-h5) var(--o-spacing-h5) 0 var(--o-spacing-h5);
          min-height: 0;
          background-color: var(--o-color-bg1);
          box-shadow: none;
        }
        .content-list {
          padding: 0 var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2);
          @media (max-width: 768px) {
            padding: 0;
            background-color: var(--o-color-bg2);
          }
          li {
            padding-top: var(--o-spacing-h2);
            @media (max-width: 768px) {
              padding-top: var(--o-spacing-h5);
              margin: 0 var(--o-spacing-h5);
              &::after {
                display: block;
                content: '';
                width: 100%;
                height: 1px;
                background-color: var(--o-color-division1);
                margin-top: 16px;
              }
              &:nth-last-of-type(1)::after {
                background-color: transparent;
              }
            }
            h3 {
              font-size: var(--o-font-size-h5);
              color: var(--o-color-text1);
              line-height: var(--o-line-height-h5);
              font-weight: 500;
              cursor: pointer;
              :deep(span) {
                color: var(--o-color-brand1);
              }
              @media (max-width: 768px) {
                font-size: var(--o-font-size-text);
                line-height: var(--o-line-height-text);
              }
            }
            .detail {
              cursor: pointer;
              margin-top: 16px;
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              color: var(--o-color-text1);
              max-height: 110px;
              overflow: hidden;
              text-overflow: ellipsis;
              text-overflow: -webkit-ellipsis-lastline;
              display: -webkit-box;
              -webkit-line-clamp: 5;
              line-clamp: 5;
              -webkit-box-orient: vertical;

              :deep(span) {
                color: var(--o-color-brand1);
              }
              @media (max-width: 768px) {
                margin-top: 4px;
                -webkit-line-clamp: 6;
                line-clamp: 6;
                font-size: var(--o-font-size-tip);
                line-height: var(--o-line-height-tip);
                color: var(--o-color-text4);
              }
            }
            .from {
              margin-top: 15px;
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              color: var(--o-color-text1);
              @media (max-width: 768px) {
                margin-top: 8px;
                font-size: var(--o-font-size-tip);
                line-height: var(--o-line-height-tip);
                color: var(--o-color-text4);
              }
            }
            .version {
              margin-top: var(--o-spacing-h8);
            }
          }
        }
      }

      .page-box {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: var(--o-spacing-h4);
        @media (max-width: 768px) {
          width: 100vw;
        }

        .pagination-pc {
          @media (max-width: 768px) {
            display: none;
          }
        }
      }
    }
    .exist-suggest {
      margin-top: 0;
    }
  }
  .search-right {
    width: 320px;
    height: 2005px;
    margin-top: 78px;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
    @media (max-width: 1200px) {
      display: none;
    }
    h3 {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      padding: var(--o-spacing-h2);
      padding-bottom: 0;
      color: var(--o-color-text1);
    }
    ul {
      padding: 0 var(--o-spacing-h2);
      li {
        padding-top: var(--o-spacing-h4);
        color: var(--o-color-text1);
        a {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--o-color-brand1);
        }
        p {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          margin-top: var(--o-spacing-h8);
          color: var(--o-color-text4);
        }
      }
    }
    :deep(.is-horizontal) {
      display: none;
    }
  }
  .exist-suggest-1 {
    margin-top: 103px;
  }
}
</style>
