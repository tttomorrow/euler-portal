<script setup lang="ts">
import { useData } from 'vitepress';
import { onMounted, Ref, ref,computed } from 'vue';
import { useI18n } from '@/i18n';
import dayjs from 'dayjs';
import IconArrowRight from '~icons/app/arrow-right.svg';
import useWindowResize from '@/components/hooks/useWindowResize';

const screenWidth = useWindowResize();

const { lang } = useData();
const i18n = computed(() => useI18n());

const roomName = i18n.value.home.HOME_ROOMS.ROOM_NAME;

const tabType: Ref<string> = ref('blog');

const blogList: Ref<any[]> = ref([]);

const newsList: Ref<any[]> = ref([]);

const resolvePostDate = (date: any) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const filterSiteData = (datas: any[], string: string) => {
  let newData = datas.filter((data: { path: string | any[] }) =>
    data.path.includes(string)
  );
  const englishMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Spt',
    'Oct',
    'Nov',
    'Dec',
  ];
  newData.sort(function (
    date1: { frontmatter: { date: any } },
    date2: { frontmatter: { date: any } }
  ) {
    const origin1 = date1.frontmatter.date;
    const origin2 = date2.frontmatter.date;

    const parsed1 = Date.parse(origin1);
    const parsed2 = Date.parse(origin2);

    return parsed2 - parsed1;
  });
  newData = newData.slice(0, 4);
  newData.forEach((item) => {
    let date = item.frontmatter.date;
    date = resolvePostDate(date).split('-');
    date.forEach((arrItem: string, index: string | number) => {
      if (arrItem[0] === '0') {
        date[index] = arrItem.substring(1);
      }
    });
    date[1] = englishMonth[date[1] - 1];
    item.frontmatter.date = date;
  });
  return newData;
};

const getRoomsData = () => {
  const datas = [
    {
      frontmatter: {
        archives: '2022-06',
        author: 'openEuler',
        date: '2022-06-28T00:00:00.000Z',
        summary:
          '以X86硬件兼容性为例，来聊聊怎么将操作系统迁移为openEuler（本篇案例的版本为openEuler 20.03 LTS SP1）。',
        tags: ['X86', '迁移', '安全性'],
        title: '聊聊怎么做硬件兼容性检测，快速迁移到openEuler',
      },
      key: 'v-0e72a48d',
      path: '/zh/blog/20220628-x86/20220628.html',
      regularPath: '/zh/blog/20220628-x86/20220628.html',
      relativePath: 'zh/blog/20220628-x86/20220628.md',
      title: '聊聊怎么做硬件兼容性检测，快速迁移到openEuler',
    },
    {
      frontmatter: {
        archives: '2022-06',
        author: 'openEuler',
        date: '2022-06-28T00:00:00.000Z',
        summary:
          '以X86硬件兼容性为例，来聊聊怎么将操作系统迁移为openEuler（本篇案例的版本为openEuler 20.03 LTS SP1）。',
        tags: ['X86', '迁移', '安全性'],
        title: '聊聊怎么做硬件兼容性检测，快速迁移到openEuler',
      },
      key: 'v-0e72a48d',
      path: '/zh/blog/20220628-x86/20220628.html',
      regularPath: '/zh/blog/20220628-x86/20220628.html',
      relativePath: 'zh/blog/20220628-x86/20220628.md',
      title: '聊聊怎么做硬件兼容性检测，快速迁移到openEuler',
    },
    {
      frontmatter: {
        archives: '2022-06',
        author: 'openEuler',
        date: '2022-06-28T00:00:00.000Z',
        summary:
          '以X86硬件兼容性为例，来聊聊怎么将操作系统迁移为openEuler（本篇案例的版本为openEuler 20.03 LTS SP1）。',
        tags: ['X86', '迁移', '安全性'],
        title: '聊聊怎么做硬件兼容性检测，快速迁移到openEuler',
      },
      key: 'v-0e72a48d',
      path: '/zh/blog/20220628-x86/20220628.html',
      regularPath: '/zh/blog/20220628-x86/20220628.html',
      relativePath: 'zh/blog/20220628-x86/20220628.md',
      title: '聊聊怎么做硬件兼容性检测，快速迁移到openEuler',
    },
    {
      frontmatter: {
        archives: '2022-06',
        author: 'openEuler',
        date: '2022-06-28T00:00:00.000Z',
        summary:
          '以X86硬件兼容性为例，来聊聊怎么将操作系统迁移为openEuler（本篇案例的版本为openEuler 20.03 LTS SP1）。',
        tags: ['X86', '迁移', '安全性'],
        title: '聊聊怎么做硬件兼容性检测，快速迁移到openEuler',
      },
      key: 'v-0e72a48d',
      path: '/zh/blog/20220628-x86/20220628.html',
      regularPath: '/zh/blog/20220628-x86/20220628.html',
      relativePath: 'zh/blog/20220628-x86/20220628.md',
      title: '聊聊怎么做硬件兼容性检测，快速迁移到openEuler',
    },
  ];
  let blogData = [];
  let newsData = [];
  if (lang.value === 'zh') {
    blogData = filterSiteData(datas, '/zh/blog/');
    newsData = filterSiteData(datas, '/zh/news/');
  } else {
    blogData = filterSiteData(datas, '/en/blog/');
    newsData = filterSiteData(datas, '/en/news/');
  }
  blogList.value = blogData;
  newsList.value = newsData;
};

const go = (path: string) => {
  window.open(path, '_blank');
};

onMounted(() => {
  getRoomsData();
});
</script>
<template>
  <div class="home-newsroom">
    <div class="title-list">
      <OTabs v-model="tabType">
        <OTabPane
          v-for="item in roomName"
          :key="item.ID"
          :label="item.NAME"
          :name="item.ID"
        ></OTabPane>
      </OTabs>
    </div>
    <div class="room-contain-new" :class="{ isShow: tabType === 'blog' }">
      <h4 v-if="screenWidth > 1080" class="type-title">
        {{ i18n.home.HOME_ROOMS.BLOG_NAME }}
      </h4>
      <div class="room-box">
        <div v-for="(item, index) in blogList" :key="index" class="room-item">
          <div class="room-item-pc">
            <div class="room-item-left">
              <span class="day">{{ item.frontmatter.date[2] }}</span>
              <div class="left-bottom">
                <span class="month">{{ item.frontmatter.date[1] }}</span>
                <span class="year">{{ item.frontmatter.date[0] }}</span>
              </div>
            </div>
            <div class="room-item-right">
              <div class="room-top">
                <h4 :title="item.frontmatter.title">
                  {{ item.frontmatter.title }}
                </h4>
                <p>{{ item.frontmatter.author }}</p>
              </div>
              <div v-if="screenWidth > 768" class="room-bottom">
                <a
                  class="word-hover"
                  :title="item.frontmatter.summary"
                  :href="item.path"
                >
                  {{ item.frontmatter.summary }}
                </a>
              </div>
            </div>
          </div>
          <div v-if="screenWidth <= 768" class="room-item-mo">
            <span class="author">{{ item.frontmatter.author }}</span>
            <a
              class="word-hover"
              :title="item.frontmatter.summary"
              :href="item.path"
            >
              {{ item.frontmatter.summary }}
            </a>
          </div>
        </div>
      </div>

      <div class="statistics">
        <OButton
          animation
          type="text"
          class="statistics-button"
          @click="go('interaction/blog-list/')"
        >
          {{ i18n.home.USER_CASE.VIEW_MORE }}
          <template #suffixIcon>
            <IconArrowRight class="statistics-icon"></IconArrowRight>
          </template>
        </OButton>
      </div>
    </div>
    <div class="room-contain-new" :class="{ isShow: tabType === 'news' }">
      <h4 v-if="screenWidth > 1080" class="type-title">
        {{ i18n.home.HOME_ROOMS.NEWS_NAME }}
      </h4>
      <div class="room-box">
        <div v-for="(item, index) in newsList" :key="index" class="room-item">
          <div class="room-item-pc">
            <div class="room-item-left">
              <span class="day">{{ item.frontmatter.date[2] }}</span>
              <div class="left-bottom">
                <span class="month">{{ item.frontmatter.date[1] }}</span>
                <span class="year">{{ item.frontmatter.date[0] }}</span>
              </div>
            </div>
            <div class="room-item-right">
              <div class="room-top">
                <h4 :title="item.frontmatter.title">
                  {{ item.frontmatter.title }}
                </h4>
                <p>{{ item.frontmatter.author }}</p>
              </div>
              <div v-if="screenWidth > 768" class="room-bottom">
                <a
                  class="word-hover"
                  :title="item.frontmatter.summary"
                  :href="item.path"
                >
                  {{ item.frontmatter.summary }}
                </a>
              </div>
            </div>
          </div>
          <div v-if="screenWidth <= 768" class="room-item-mo">
            <span class="author">{{ item.frontmatter.author }}</span>
            <a
              class="word-hover"
              :title="item.frontmatter.summary"
              :href="item.path"
            >
              {{ item.frontmatter.summary }}
            </a>
          </div>
        </div>
      </div>
      <div class="statistics">
        <OButton
          animation
          type="text"
          class="statistics-button"
          @click="go('interaction/news-list/')"
        >
          {{ i18n.home.USER_CASE.VIEW_MORE }}
          <template #suffixIcon>
            <IconArrowRight class="statistics-icon"></IconArrowRight>
          </template>
        </OButton>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.word-hover {
  cursor: pointer;
  color: var(--o-color-text2);
  &:hover {
    color: #002fa7;
  }
}
.statistics {
  display: flex;
  padding-top: var(--o-spacing-h2);
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1080px) {
    padding-top: var(--o-spacing-h5);
  }
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5) 0 var(--o-spacing-h10) 0;
    :deep(.o-button) {
      font-size: var(--o-font-size-tip) !important;
      line-height: var(--o-line-height-tip) !important;
    }
  }

  &-button:hover {
    color: var(--o-color-brand);
  }

  :deep(.o-button) {
    padding: 0;
  }

  &-icon {
    color: var(--o-color-brand);
    width: var(--o-font-size-h8);
    height: var(--o-font-size-h8);
  }
}
.home-newsroom {
  margin: var(--o-spacing-h2) auto;
  .room-contain-new {
    display: none;
    padding: var(--o-spacing-h2);
    background-color: var(--o-color-bg);
    box-shadow: var(--o-shadow-base);
    .type-title {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-font-size-h7);
      font-weight: 500;
      color: var(--o-color-text2);
    }
    .room-box {
      display: grid;
      margin-top: var(--o-spacing-h2);
      grid-template-columns: repeat(2, minmax(82px, 1fr));
      column-gap: var(--o-spacing-h2);
      row-gap: var(--o-spacing-h2);
      .room-item-pc {
        display: flex;
        padding-bottom: var(--o-spacing-h2);
        border-bottom: 1px solid var(--o-color-division);
        p {
          text-align: left;
        }
        .room-item-left {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          margin-right: var(--o-spacing-h4);
          width: 100px;
          height: 110px;
          background-color: var(--o-color-bg2);
          color: var(--o-color-text2);
          .day {
            margin-bottom: var(--o-spacing-h8);
            font-size: var(--o-font-size-h4);
          }
          .year {
            padding-left: var(--o-spacing-h10);
          }
          .left-bottom {
            font-size: var(--o-font-size-tip);
          }
        }
        .room-item-right {
          display: flex;
          flex: 1;
          min-width: 0;
          font-size: var(--o-font-size-text);
          justify-content: space-between;
          flex-direction: column;
          .room-top {
            h4 {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: 500;
              font-size: var(--o-font-size-h7);
              color: var(--o-color-text2);
            }
            p {
              line-height: var(--o-line-height-text);
              font-size: var(--o-font-size-text);
              margin-top: var(--o-spacing-h9);
              color: var(--o-color-text2);
            }
          }
          .room-bottom {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            color: var(--o-color-text2);
            a {
              text-decoration: none;
            }
          }
        }
      }
    }
    @media screen and (max-width: 1080px) {
      .room-item {
        padding-bottom: var(--o-spacing-h5);
      }
      .room-box {
        margin: 0;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        row-gap: var(--o-spacing-h5);
      }
    }
    @media screen and (max-width: 768px) {
      padding: var(--o-spacing-h6);
      .room-box {
        margin: 0;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        .room-item {
          border-bottom: 1px solid var(--o-color-division);

          .room-item-pc {
            border-bottom: none;
            padding-bottom: var(--o-spacing-h5);
            .room-item-left {
              margin-right: var(--o-spacing-h6);
              width: var(--o-line-height-h3);
              height: var(--o-line-height-h3);
              .day {
                margin: 0;
                font-size: var(--o-font-size-text);
              }
              .left-bottom {
                display: flex;
                transform: scale(0.5);
              }
            }
            .room-item-right {
              .room-top {
                h4 {
                  display: -webkit-box;
                  white-space: inherit;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  line-height: var(--o-line-height-text);
                  font-size: var(--o-font-size-text);
                }
              }
            }
          }
          .room-item-mo {
            display: flex;
            flex-direction: column;
            font-size: var(--o-font-size-tip);
            color: var(--o-color-text3);
            .author {
              padding-bottom: var(--o-spacing-h8);
            }
            a {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              margin-bottom: var(--o-spacing-h5);
              color: inherit;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
  .isShow {
    display: block;
  }
}

:deep(.title-list) {
  display: flex;
  padding-bottom: var(--o-spacing-h2);
  justify-content: flex-end;
  .el-tabs__header {
    margin: 0;
  }
  @media screen and (max-width: 1080px) {
    padding-bottom: var(--o-spacing-h5);
    justify-content: center;
  }
  .el-tabs__nav-scroll {
    @media screen and (max-width: 1080px) {
      display: flex;
      justify-content: center;
    }
  }
  .el-tabs__item {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .title-item {
    cursor: pointer;
    padding: var(--o-spacing-h6);
    &:hover {
      color: var(--o-color-brand);
    }
  }
  .active {
    background-color: var(--o-color-brand);
    color: var(--o-color-text) !important;
  }
}
</style>
