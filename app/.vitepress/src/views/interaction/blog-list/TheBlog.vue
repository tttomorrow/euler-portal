<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import BannerImg1 from '@/assets/banner-secondary.png';
import BannerImg2 from '@/assets/illustrations/search.png';
import OScreen from '@/components/OScreen.vue';
import IconCalendar from '~icons/app/icon-calendar.svg';
import IconUser from '~icons/app/icon-user.svg';
import IconBrowse from '~icons/app/icon-browse.svg';

const router = useRouter();
const i18n = computed(() => useI18n());
const userCaseData = computed(() => i18n.value.interaction);

const isAll = ref(false);
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

const toBlogContent = (author: string, path: string) => {
  const path1 = router.route.path.substring(0, 3);
  const path2 = 'blog';
  router.go(`${path1}/${path2}/${author}/${path}`);
};
// 筛选方法
const listfilter = (val: string[]) => {
  return val;
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
    <div class="blog-tag">
      <TagFilter :label="userCaseData.TAG" @toggle-click="toggleClick">
        <OTag
          v-for="(item, index) in userCaseData.TAGSDATALIST"
          :key="'tag' + index"
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="tagClick(index)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
    </div>
    <div class="blog-tag2">
      <OScreen
        :data="userCaseData.SCREENDATALIST"
        :list="userCaseData.BLOGDATALIST"
        @filter="listfilter"
      />
    </div>
    <div class="blog-list">
      <OCard
        v-for="item in userCaseData.BLOGDATALIST"
        :key="item"
        class="blog-list-item"
      >
        <div
          class="blog-list-item-title"
          @click="toBlogContent(item.author, item.path)"
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
  .blog-tag2 {
    display: none;
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
