<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import IconArrowRight from '~icons/app/arrow-right.svg';

import { useI18n } from '@/i18n';
import { getSortData } from '@/api/api-search';

const { lang } = useData();
const i18n = useI18n();

const commonStore = useCommon();

const caseData: any = ref({});

const active = ref(0);
const activeMobile = ref(0);

const handleGo = (path: string) => {
  window.open(path, '_blank');
};

const handleChangeActive = (index: number) => {
  active.value = index;
  activeMobile.value = index;
};

const handleChangeActiveMobile = (activeNames: any) => {
  if (activeNames !== '') {
    active.value = activeNames;
  }
};

onMounted(() => {
  const params = {
    category: 'showcase',
    lang: lang.value,
    page: 1,
    pageSize: 100,
  };
  getSortData(params).then((res: any) => {
    console.log(res);
    const result = {
      zh: {},
      en: {},
      ru: {},
    };
    res.obj.records.forEach((item: { lang: string; industry: string }) => {
      if (item.lang === 'zh') {
        if (typeof (result['zh'] as any)[item.industry] === 'undefined') {
          (result['zh'] as any)[item.industry] = [];
        }
        (result['zh'] as any)[item.industry].push(item);
      } else if (item.lang === 'en') {
        if (typeof (result['en'] as any)[item.industry] === 'undefined') {
          (result['en'] as any)[item.industry] = [];
        }
        (result['en'] as any)[item.industry].push(item);
      } else {
        if (typeof (result['ru'] as any)[item.industry] === 'undefined') {
          (result['ru'] as any)[item.industry] = [];
        }
        (result['ru'] as any)[item.industry].push(item);
      }
    });

    caseData.value = result;
  });
});
</script>

<template>
  <div class="case-main">
    <h3>{{ i18n.home.USER_CASE.TITLE }}</h3>
    <OCollapse
      v-model="activeMobile"
      accordion
      class="case-mobile"
      @change="handleChangeActiveMobile"
    >
      <OCollapseItem
        v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST"
        :key="item.TYPE"
        class="case-mobile-list"
        :name="index"
      >
        <template #title>
          <div class="case-mobile-card-content">
            <div class="case-mobile-title">
              <img
                class="case-mobile-img"
                :src="
                  commonStore.theme === 'dark'
                    ? index === activeMobile
                      ? item.ACTIVE_DARK_URL
                      : item.URL_DARK
                    : index === activeMobile
                    ? item.ACTIVE_URL
                    : item.URL
                "
              />
              <div class="case-mobile-word">
                {{ item.TYPE }}
              </div>
            </div>
          </div>
        </template>
        <div class="user-mobile">
          <div
            v-for="user in caseData[lang] && caseData[lang][item.TYPE]"
            :key="user.company"
            class="user-card"
          >
            <div class="user-title">{{ user.company }}</div>
            <div class="user-word">{{ user.summary }}</div>
          </div>
        </div>
      </OCollapseItem>
    </OCollapse>
    <div class="case">
      <OCard class="case-card">
        <div class="case-tab">
          <div
            v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST"
            :key="item.TYPE"
            class="case-tab-item"
            @click="handleChangeActive(index)"
          >
            <img
              class="case-img"
              :src="
                commonStore.theme === 'dark'
                  ? index === activeMobile
                    ? item.ACTIVE_DARK_URL
                    : item.URL_DARK
                  : index === activeMobile
                  ? item.ACTIVE_URL
                  : item.URL
              "
            />
            <div :class="['case-word', active === index ? 'active' : '']">
              {{ item.TYPE }}
            </div>
          </div>
        </div>
        <div class="case-user">
          <a
            v-for="item2 in caseData[lang] &&
            caseData[lang][i18n.home.USER_CASE.CASE_LIST[active].TYPE]"
            :key="item2.company"
            class="user-card"
            @click="handleGo(item2.path)"
          >
            <div class="user-title">{{ item2.company }}</div>
            <div class="user-word">{{ item2.summary }}</div>
          </a>
        </div>
        <div class="case-more">
          <OButton
            animation
            type="text"
            class="case-more-item"
            @click="handleGo(i18n.home.USER_CASE.VIEW_MORE_LINK)"
          >
            {{ i18n.home.IMG_CAROUSE.BUTTON }}
            <template #suffixIcon>
              <IconArrowRight class="case-more-icon"></IconArrowRight>
            </template>
          </OButton>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  font-size: var(--o-font-size-h3);
  font-weight: 300;
  color: var(--o-color-text2);
  line-height: var(--o-line-height-h3);
  width: 100%;
  text-align: center;
  margin-top: var(--o-spacing-h1);
  @media (max-width: 768px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin-top: var(--o-spacing-h2);
  }
}
.case-mobile {
  display: none;
  @media (max-width: 1100px) {
    border-top: none;
    display: block;
  }
  &-list {
    margin-top: var(--o-spacing-h4);
    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
    }
    :deep(.el-collapse-item__content) {
      padding-bottom: 0px;
    }

    :deep(.el-collapse-item__header) {
      height: 100%;
      padding: var(--o-spacing-h5);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h8);
      }
    }
  }

  &-title {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  &-word {
    margin-left: var(--o-spacing-h8);
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    font-weight: 400;
    color: var(--o-color-text2);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      font-weight: 300;
      line-height: var(--o-line-height-text);
    }
  }

  &-img {
    width: 40px;
    height: 40px;
    color: var(--o-color-text2);
  }

  &-card {
    margin-top: var(--o-spacing-h5);
    width: 100%;
    border-left: 2px solid var(--o-color-brand);
    &-content {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &-icon {
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text3);
  }
}
.user {
  &-mobile {
    background-color: var(--o-color-bg3);
    > :nth-child(1) {
      margin-top: 0px;
    }
  }
  &-card {
    cursor: pointer;
    padding: var(--o-spacing-h5);
    width: 100%;
    height: 100%;
    background: var(--o-color-bg2);
    border: 1px solid rgba(0, 0, 0, 0);
    border-left: 2px solid var(--o-color-brand);

    @media (max-width: 1100px) {
      background: var(--o-color-bg);
      margin-top: var(--o-spacing-h8);
    }

    @media (max-width: 768px) {
      padding: var(--o-spacing-h8);
    }
  }

  &-card:hover {
    @media (min-width: 1100px) {
      background-color: var(--o-color-bg);
      border: 1px solid var(--o-color-brand);
      box-shadow: var(--o-shadow-secondary);
      border-left: 2px solid var(--o-color-brand);
      transition: 0.3s all;
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
    font-weight: 500;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h7);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  &-word {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-text);
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2; // 设置两行文字溢出
    -webkit-box-orient: vertical;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
.case {
  display: block;
  @media (max-width: 1100px) {
    display: none;
  }

  &-more {
    display: flex;
    padding-top: var(--o-spacing-h2);
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1000px) {
      padding: 20px 0;
      font-size: 12px;
    }

    &-item:hover {
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

  &-user {
    margin-top: var(--o-spacing-h2);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: var(--o-spacing-h2);
    grid-gap: var(--o-spacing-h4) var(--o-spacing-h2);
    border-bottom: 1px solid var(--o-color-division);
  }

  &-card {
    margin-top: var(--o-spacing-h2);
    width: 100%;
    padding: 20px;
  }

  &-img {
    margin-top: var(--o-spacing-h5);
    width: 80px;
    height: 80px;
    color: white;
  }

  &-word {
    font-size: var(--o-font-size-h5);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h5);
    margin-top: 2px;
  }

  &-tab {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    &-item {
      cursor: pointer;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      margin: 0px 28px;
    }
  }
}

.active {
  color: var(--o-color-brand);
}
</style>
