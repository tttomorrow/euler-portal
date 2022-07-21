<script setup lang="ts">
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { ref } from 'vue';

const { theme: i18n } = useData();

const commonStore = useCommon();

const active = ref(0);

const changeActive = (index: number) => {
  active.value = index;
};
</script>

<template>
  <h3>{{ i18n.home.USER_CASE.TITLE }}</h3>
  <div class="case-mobile">
    <div
      v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST"
      :key="index"
      class="case-mobile-list"
    >
      <OCard
        :style="{ padding: '0px' }"
        class="case-mobile-card"
        @click="changeActive(index)"
      >
        <div class="case-mobile-card-content">
          <div class="case-mobile-title">
            <img
              class="case-mobile-img"
              :src="commonStore.theme === 'dark' ? item.URL_DARK : item.URL"
            />

            <div class="case-mobile-word">{{ item.TYPE }}</div>
          </div>
          <IconDown class="case-mobile-icon"></IconDown>
        </div>
      </OCard>
      <div v-if="active === index" class="user-mobile">
        <div
          v-for="(user, index2) in i18n.home.USER_CASE.CASE_LIST[active]
            .CONTENT"
          :key="index2"
          class="user-card"
        >
          <div class="user-title">{{ user.NAME }}</div>
          <div class="user-word">{{ user.WORD }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="case">
    <OCard class="case-card">
      <div class="case-tab">
        <div
          v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST"
          :key="index"
          class="case-tab-item"
        >
          <img
            class="case-img"
            :src="commonStore.theme === 'dark' ? item.URL_DARK : item.URL"
          />
          <div
            :class="['case-word', active === index ? 'active' : '']"
            @click="changeActive(index)"
          >
            {{ item.TYPE }}
          </div>
        </div>
      </div>
      <div class="case-user">
        <div
          v-for="(item, index) in i18n.home.USER_CASE.CASE_LIST[active].CONTENT"
          :key="index"
          class="user-card"
        >
          <div class="user-title">{{ item.NAME }}</div>
          <div class="user-word">{{ item.WORD }}</div>
        </div>
      </div>
      <div class="case-more">
        {{ i18n.home.USER_CASE.VIEW_MORE }}
        <IconArrowRight class="case-more-icon"></IconArrowRight>
      </div>
    </OCard>
  </div>
</template>

<style lang="scss" scoped>
h3 {
  font-size: var(--o-font-size-h3);
  font-family: 'PingFangSC-Light, PingFang SC';
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
  @media (max-width: 1080px) {
    display: block;
  }

  &-list {
    margin-top: var(--o-spacing-h4);
    @media (max-width: 768px) {
      margin-top: 0;
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

    :deep(.el-card__body) {
      padding: var(--o-spacing-h5);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h8);
      }
    }
  }

  &-icon {
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text3);
  }
}
.user {
  &-mobile {
    padding: var(--o-spacing-h8);
    background-color: var(--o-color-bg3);
    > :nth-child(1) {
      margin-top: 0px;
    }
  }
  &-card {
    padding: var(--o-spacing-h5);
    width: 100%;
    background: var(--o-color-bg2);
    border: 1px solid rgba(0, 0, 0, 0);
    border-left: 2px solid var(--o-color-brand);
    @media (max-width: 1080px) {
      background: var(--o-color-bg);
      margin-top: var(--o-spacing-h8);
    }

    @media (max-width: 768px) {
      padding: var(--o-spacing-h8);
    }
  }

  &-card:hover {
    @media (min-width: 1080px) {
      background-color: var(--o-color-bg);
      border: 1px solid var(--o-color-brand);
      box-shadow: var(--o-shadow-secondary);
      border-left: 2px solid var(--o-color-brand);
      transition: 0.3s all;
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
    font-family: 'PingFangSC-Medium, PingFang SC';
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
    font-family: 'PingFangSC-Regular, PingFang SC';
    font-weight: 400;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-text);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
.case {
  display: block;
  @media (max-width: 1080px) {
    display: none;
  }
  &-more {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    margin-top: var(--o-spacing-h2);
    &-icon {
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
      color: var(--o-color-brand);
      margin-left: var(--o-spacing-h8);
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
    font-family: 'PingFangSC-Regular, PingFang SC';
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
