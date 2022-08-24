<script setup lang="ts">
import { reactive, onMounted, ref, computed, watch } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import AppMdHead from './AppMdHead.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import { getSortData } from '@/api/api-search';

const { frontmatter, lang } = useData();
const i18n = useI18n();
const userCaseData = computed(() => i18n.value.interaction);
const newsInfo = {
  link: `/${lang.value}/interaction/news-list/`,
  name: i18n.value.common.NAV_ROUTER.NEWS,
};

const router = useRouter();

const sortParams = reactive({
  page: 1,
  pageSize: 100,
  lang: lang.value,
  category: 'news',
});
const newsTitle = ref<any>([]);
const newsLint = ref<any>([]);
const prev = ref('');
const prevLint = ref('');
const nextLint = ref('');
const next = ref('');
const goPrve = () => {
  const path = router.route.path.substring(0, 4);
  router.go(`${path}${prevLint.value}`);
  getNewsData();
};
const goNext = () => {
  const path = router.route.path.substring(0, 4);
  router.go(`${path}${nextLint.value}`);
  getNewsData();
};
const getNewsData = async () => {
  await getSortData(sortParams).then((res) => {
    res.obj.records.forEach((item: any) => {
      newsTitle.value.push(item.title);
      newsLint.value.push(item.path);
    });
    newsTitle.value.forEach((item: any, index: number) => {
      if (item === frontmatter.value.title && index !== 0) {
        prev.value = newsTitle.value[index - 1];
        prevLint.value = newsLint.value[index - 1];
      }
      if (
        item === frontmatter.value.title &&
        index !== res.obj.records.length - 1
      ) {
        next.value = newsTitle.value[index + 1];
        nextLint.value = newsLint.value[index + 1];
      }
    });
  });
};
onMounted(() => {
  getNewsData();
});
</script>

<template>
  <div class="bread">
    <BreadCrumbs
      :bread1="newsInfo.name"
      :bread2="frontmatter.title"
      :link1="newsInfo.link"
    />
  </div>
  <div class="makdown-wrap markdown">
    <div class="news-markdown-detail">
      <AppMdHead :frontmatter="frontmatter" />
      <Content />
    </div>
    <hr style="margin-bottom: 40px" />
    <div class="news-markdown-detail">
      <div v-if="prev !== ''" class="skip" @click="goPrve">
        <span>{{ userCaseData.PREV }}</span>
        <p>{{ prev }}</p>
      </div>
      <div v-if="next !== ''" class="skip" @click="goNext">
        <span>{{ userCaseData.NEXT }}</span>
        <p>{{ next }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-markdown-detail {
  max-width: 880px;
  margin: 0 auto;
}
.bread {
  margin: 0 var(--o-spacing-h5);
}
.skip {
  margin-top: var(--o-spacing-h5);
  cursor: pointer;
  span {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--e-color-text1);
  }
  p {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    color: var(--e-color-text1);
    margin: 0;
    display: inline-block;
  }
}
</style>
