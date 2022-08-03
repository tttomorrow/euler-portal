<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import BannerImg1 from '@/assets/banner-secondary.png';
import BannerImg2 from '@/assets/illustrations/search.png';

import IconCalendar from '~icons/app/icon-calendar.svg';
import IconUser from '~icons/app/icon-user.svg';
import IconBrowse from '~icons/app/icon-browse.svg';

const router = useRouter();
const i18n = computed(() => useI18n());
const userCaseData = computed(() => i18n.value.interaction);
// console.log(i18n.value.interaction)

const isAll = ref(false);
const tagArrLen = computed(() => {
  return [
    '全部',
    '鲲鹏开发套件Kunpeng DevKit',
    '鲲鹏开发套件Kunpeng DevKit',
    '开源项目',
    '峰会',
    '鲲鹏开发套件Kunpeng DevKit',
    '开源项目',
    '其他',
  ];
});
const toggleClick = (flag: boolean) => {
  isAll.value = flag;
};
const activeIndex = ref(0);
const tagClick = (i: number) => {
  activeIndex.value = i;
};

const currentPage1 = ref(5);
const pageSize4 = ref(10);
const total = ref(200);

const bloglist = computed(() => {
  return [
    {
      blogtitle: '如何退订openEuler的邮件列表',
      blogauthor: 'liuqi',
      date: '2021-11-23',
      browsetimes: 100,
      blogcontent: '本博客介绍了两种退订openEuler邮件列表的方式',
      author: 'liuqi',
      path: '2021-10-14-unsubscribe-mailing-list',
      tags: ['openEuler', '邮件列表', '退订'],
    },
    {
      blogtitle: '如何在Jenkins上关联Gitee的Webhook',
      blogauthor: 'liuqi',
      date: '2021-11-25',
      browsetimes: 100,
      blogcontent: '本博客介绍了如何在Jenkins上关联Gitee的Webhook',
      author: 'liuqi',
      path: '2021-11-25-jenkins-gitee-webhook',
      tags: ['Jenkins', 'Gitee', 'Webhook'],
    },
    {
      blogtitle: 'openEuler 社区门禁工程分享',
      blogauthor: 'liuqi',
      date: '2021-11-23',
      browsetimes: 100,
      blogcontent: 'openEuler 社区门禁工程分享',
      author: 'liuqi',
      path: '2021-10-14-unsubscribe-mailing-list',
      tags: ['openEuler', '邮件列表', '退订'],
    },
    {
      blogtitle: '浅谈openEuler开源社区运营度量及分析',
      blogauthor: 'Ivye',
      date: '2020-05-06',
      browsetimes: 100,
      blogcontent:
        '浅谈openEuler开源社区运营度量及分析，属于系列博客的第一篇。',
      author: 'ivye',
      path: '2020-05-06-os-metrics-1',
      tags: ['社区运营', '度量'],
    },
    {
      blogtitle: '如何退订openEuler的邮件列表',
      blogauthor: 'liuqi',
      date: '2021-11-23',
      browsetimes: 100,
      blogcontent: '本博客介绍了两种退订openEuler邮件列表的方式',
      author: 'liuqi',
      path: '2021-10-14-unsubscribe-mailing-list',
      tags: ['openEuler', '邮件列表', '退订'],
    },
    {
      blogtitle: '如何退订openEuler的邮件列表',
      blogauthor: 'liuqi',
      date: '2021-11-23',
      browsetimes: 100,
      blogcontent: '本博客介绍了两种退订openEuler邮件列表的方式',
      author: 'liuqi',
      path: '2021-10-14-unsubscribe-mailing-list',
      tags: ['openEuler', '邮件列表', '退订'],
    },
    {
      blogtitle: '如何退订openEuler的邮件列表',
      blogauthor: 'liuqi',
      date: '2021-11-23',
      browsetimes: 100,
      blogcontent: '本博客介绍了两种退订openEuler邮件列表的方式',
      author: 'liuqi',
      path: '2021-10-14-unsubscribe-mailing-list',
      tags: ['openEuler', '邮件列表', '退订'],
    },
    {
      blogtitle: '如何退订openEuler的邮件列表',
      blogauthor: 'liuqi',
      date: '2021-11-23',
      browsetimes: 100,
      blogcontent: '本博客介绍了两种退订openEuler邮件列表的方式',
      author: 'liuqi',
      path: '2021-10-14-unsubscribe-mailing-list',
      tags: ['openEuler', '邮件列表', '退订'],
    },
    {
      blogtitle: '如何退订openEuler的邮件列表',
      blogauthor: 'liuqi',
      date: '2021-11-23',
      browsetimes: 100,
      blogcontent: '本博客介绍了两种退订openEuler邮件列表的方式',
      author: 'liuqi',
      path: '2021-10-14-unsubscribe-mailing-list',
      tags: ['openEuler', '邮件列表', '退订'],
    },
  ];
});

const toNewsContent = (author: string, path: string) => {
  const path1 = router.route.path.substring(0, 15);
  const path2 = 'blog-content';
  router.go(`${path1}/${path2}/${author}/${path}`);
};
</script>

<template>
  <div class="blog">
    <BannerLevel2
      :background-image="BannerImg1"
      background-text="CONNECT"
      :title="userCaseData.blog"
      :illustration="BannerImg2"
    />
    <div class="blog-tag">
      <TagFilter :label="userCaseData.tag" @toggle-click="toggleClick">
        <OTag
          v-for="(item, index) in tagArrLen"
          :key="'tag' + index"
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="tagClick(index)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
    </div>
    <div class="blog-list">
      <OCard v-for="item in bloglist" :key="item" class="blog-list-item">
        <div
          class="blog-list-item-title"
          @click="toNewsContent(item.author, item.path)"
        >
          <p>{{ item.blogtitle }}</p>
        </div>
        <div class="blog-list-item-info">
          <div class="infodetail">
            <OIcon class="icon"><IconUser /></OIcon>
            <p>
              {{ item.blogauthor }}
            </p>
          </div>
          <div class="infodetail">
            <OIcon class="icon"><IconCalendar /></OIcon>
            <p>
              {{ item.date }}
            </p>
          </div>
          <div class="infodetail">
            <OIcon class="icon"><IconBrowse /></OIcon>
            <p>浏览{{ item.browsetimes }}次</p>
          </div>
        </div>
        <div class="blog-list-item-content">
          <p>{{ item.blogcontent }}</p>
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
  padding: var(--o-spacing-h2);
}
.blog {
  &-tag {
    max-width: 1416px;
    height: 82px;
    margin: var(--o-spacing-h1) auto var(--o-spacing-h2) auto;
    box-shadow: var(--o-shadow-base);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: var(--o-spacing-h2);
    background-color: var(--o-color-bg);
    // background-image: url();
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
          border: 1px dashed var(--o-color-text3);
        }
        p {
          font-size: var(--o-font-size-tip);
          display: inline-block;
          margin-left: var(--o-spacing-h9);
          line-height: var(--o-line-height-tip);
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

@media (max-width: 1080px) {
  .blog-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .blog-list {
    grid-template-columns: repeat(1, 1fr);
  }
  .blog-tag {
    display: none;
  }
}
@media (max-width: 415px) {
  .blog-tag {
    display: none;
  }
}
</style>
