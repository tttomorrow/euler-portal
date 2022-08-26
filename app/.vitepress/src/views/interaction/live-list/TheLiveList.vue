<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerBG from '@/assets/banner-secondary.png';
import BannerIllustration from '@/assets/illustrations/search.png';

import cardBg_light from '@/assets/category/interaction/live/light-crad-bg.png';
import cardBg_light_mo from '@/assets/category/interaction/live/light-crad-bg-mobile.png';
import cardBg_dark from '@/assets/category/interaction/live/dark-crad-bg.png';
import cardBg_dark_mo from '@/assets/category/interaction/live/dark-crad-bg-mobile.png';
import cardBg_light_mo_extension from '@/assets/category/interaction/live/bg-extension-light.png';
import cardBg_dark_mo_extension from '@/assets/category/interaction/live/bg-extension-dark.png';
import { ElMessage } from 'element-plus';

import IconRight from '~icons/app/icon-arrow-right1.svg';
import IconUser from '~icons/app/icon-user.svg';
import IconTime from '~icons/app/icon-time.svg';
import IconPre from '~icons/app/icon-chevron-left.svg';
import IconNext from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const data = computed(() => i18n.value.live.LIVE_LIST);
const commonStore = useCommon();

const currentPage1 = ref(1);
const pageSize4 = ref(6);
const total = ref(data.value.length);
const screenWidth = useWindowResize();

const changePage = (val: number, pagesize: number) => {
  const curVal = (val - 1) * pagesize;
  showLiveList.value = data.value.slice(curVal, curVal + pagesize);
};

const showLiveList = ref(data.value.slice(0, 6));
const totoBLink = (url: string) => {
  url === ''
    ? ElMessage({
        message: i18n.value.live.LINKTIPS,
      })
    : window.open(url);
};

const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const headGround = computed(() =>
  commonStore.theme === 'dark' ? cardBg_dark : cardBg_light
);

// css变量 v-bind
const liveStyleMo = ref({
  light: `url(${cardBg_light_mo})`,
  dark: `url(${cardBg_dark_mo})`,
  lightExtension: `url(${cardBg_light_mo_extension})`,
  darkExtension: `url(${cardBg_dark_mo_extension})`,
});

const goPrevious = () => {
  currentPage1.value < 2 ? '' : (currentPage1.value -= 1);
  changePage(currentPage1.value, pageSize4.value);
};
const goNext = () => {
  currentPage1.value > Math.ceil(total.value / pageSize4.value) - 1
    ? ''
    : (currentPage1.value += 1);
  changePage(currentPage1.value, pageSize4.value);
};
</script>

<template>
  <BannerLevel2
    :background-image="BannerBG"
    background-text="INTERACTION"
    :title="i18n.live.LIVETITLE"
    :illustration="BannerIllustration"
  />
  <AppContent>
    <div class="live">
      <div class="live-top-title">{{ i18n.live.REPLAYER }}</div>
      <div class="live-list">
        <OContainer
          v-for="live in showLiveList"
          :key="live.PHOTOPATH"
          :level-index="2"
          class="live-list-item"
        >
          <OCard class="live-list-item" :body-style="{ padding: '0px' }">
            <div class="live-detail">
              <div
                class="live-background"
                :class="commonStore.theme"
                :style="{ backgroundImage: `url(${headGround})` }"
              >
                <img :src="live.PHOTOPATH" class="live-background-img" />
              </div>
              <div class="live-detail-right">
                <div>
                  <h5 class="live-detail-title">
                    {{ live.LIVETITLE }}
                  </h5>
                  <div class="live-desc">
                    <span>
                      <OIcon class="smail-icon">
                        <IconUser />
                      </OIcon>
                      <span class="live-desc-text">
                        {{ live.LIVETEACHER.trim() }}
                      </span>
                    </span>
                    <span>
                      <OIcon class="smail-icon">
                        <IconTime />
                      </OIcon>
                      <span class="live-desc-text">{{
                        live.LIVETIME.trim()
                      }}</span>
                    </span>
                  </div>
                </div>
                <p>
                  <OButton
                    animation
                    size="mini"
                    class="live-button"
                    :style="{
                      color:
                        commonStore.theme === 'dark'
                          ? 'var(--e-color-white)'
                          : '',
                    }"
                    @click="totoBLink(live.FORMERLYLINK)"
                    >{{ i18n.live.REPLAYVIEW }}
                    <template #suffixIcon>
                      <OIcon class="live-button-icon"><IconRight /></OIcon>
                    </template>
                  </OButton>
                </p>
              </div>
            </div>
          </OCard>
        </OContainer>
      </div>
      <div class="live-pagination">
        <OPagination
          v-show="!isMobile"
          v-model:currentPage="currentPage1"
          v-model:page-size="pageSize4"
          :page-sizes="[6, 12, 18, 24]"
          :background="true"
          layout="sizes, prev, pager, next, slot, jumper"
          :total="total"
          @current-change="changePage(currentPage1, pageSize4)"
          @size-change="changePage(currentPage1, pageSize4)"
        >
          <span class="pagination-slot">{{
            currentPage1 * pageSize4 + '/' + total
          }}</span>
        </OPagination>
        <div v-show="isMobile" class="pagination-mobile">
          <div class="pagination-options">
            <OIcon class="pagination-options-icon">
              <IconPre />
            </OIcon>
            <div class="pagination-options-text" @click="goPrevious">
              上一页
            </div>
            <div class="pagination-information">
              <span class="pagination-information-current">{{
                currentPage1
              }}</span
              >{{ '/' + Math.ceil(total / pageSize4) }}
            </div>
            <div class="pagination-options-text" @click="goNext">下一页</div>
            <OIcon class="pagination-options-icon">
              <IconNext />
            </OIcon>
          </div>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.live {
  // margin: var(--o-spacing-h1) 0 0 0;
  // @media screen and (max-width: 767px) {
  //   margin: var(--o-spacing-h2) 0 0 0;
  // }
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--o-spacing-h4);
  }
  &-top-title {
    width: 100%;
    margin: 0 auto;
    font-weight: 300;
    font-size: var(--o-font-size-h5);
    text-align: center;
    color: var(--e-color-text1);
    @media screen and (max-width: 767px) {
      font-size: var(--o-font-size-h8);
    }
  }
  &-list {
    display: grid;
    max-width: 1504px;
    margin: var(--o-spacing-h2) auto;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media screen and (max-width: 767px) {
      margin: var(--o-spacing-h5) auto;
    }
    &-item {
      width: 100%;
      flex: 1;
      padding: 0;
      max-height: 260px;
      // &:hover {
      //   box-shadow: var(--o-shadow-base_hover);
      // }
    }
  }
  &-detail {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin: 0;
    height: 260px;
    @media screen and (max-width: 767px) {
      flex-direction: column;
      height: 230px;
    }
    .live-background {
      @media screen and (max-width: 767px) {
        background: v-bind('liveStyleMo.light') left/contain no-repeat,
          v-bind('liveStyleMo.lightExtension') left no-repeat !important;
        // background-image:  v-bind('liveStyleMo.light'),v-bind('liveStyleMo.lightExtension') !important;
        // background-repeat: no-repeat,no-repeat;
        // background-position: left;
      }

      &.dark {
        @media screen and (max-width: 767px) {
          background: var(--e-color-kleinblue3) v-bind('liveStyleMo.dark') left
            top/contain no-repeat !important;
        }
      }
    }
    &-right {
      padding: var(--o-spacing-h4);
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @media screen and (max-width: 767px) {
        max-height: 132px;
        width: 100%;
        padding: 16px var(--o-spacing-h6);
      }
    }
    &-title {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: var(--o-font-size-h5);
      text-align: left;
      font-weight: 500;
      color: var(--e-color-text1);
      @media screen and (max-width: 767px) {
        font-size: var(--o-font-size-text);
        color: var(--e-color-text1);
      }
    }
  }
  &-background {
    width: 262px;
    height: 260px;
    @media screen and (max-width: 767px) {
      width: 100%;
      height: 98px;
      background-repeat: no-repeat;
      background-color: var(--e-color-bg4);
    }
    &-img {
      margin: 70px 71px;
      width: 120px;
      height: 120px;
      @media screen and (max-width: 767px) {
        width: 68px;
        height: 68px;
        margin-left: 74px;
        margin-top: 13px;
      }
    }
  }
  &-desc {
    margin-top: var(--o-spacing-h4);
    padding: 0;
    line-height: var(--o-line-height-tip);
    span {
      display: inline;
      font-weight: 400;
    }
    @media screen and (max-width: 767px) {
      margin-top: var(--o-spacing-h5);
    }
    &-text {
      margin-right: var(--o-spacing-h3);
      line-height: var(--o-line-height-tip);
      font-size: var(--o-font-size-text);
      color: var(--e-color-text1);
      overflow: hidden;
      text-overflow: ellipsis;
      @media screen and (max-width: 767px) {
        font-size: var(--o-font-size-tip);
        margin-right: var(--o-spacing-h5);
      }
    }
  }
  &-button {
    &-icon {
      color: var(--e-color-brand1);
    }
  }
  &-pagination {
    width: auto;
    height: auto;
    margin: auto;
  }
  .smail-icon {
    font-size: var(--o-font-size-h7);
    vertical-align: text-bottom;
    color: var(--e-color-text4);
    margin-right: var(--o-spacing-h8);
    @media screen and (max-width: 767px) {
      font-size: var(--o-font-size-h8);
      color: var(--e-color-text4);
    }
  }
  .pagination {
    &-mobile {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: var(--o-spacing-h5);
      width: 100%;
      height: 18px;
    }
    &-options {
      display: flex;
      flex-direction: row;
      margin: auto;
      &-icon {
        font-size: var(--o-font-size-tip);
        color: var(--e-color-brand1);
      }
      &-icon:hover {
        cursor: pointer;
      }
      &-text {
        font-size: var(--o-font-size-tip);
        margin-left: var(--o-spacing-h8);
        margin-right: var(--o-spacing-h8);
        color: var(--e-color-text1);
      }
      &-text:hover {
        color: var(--e-color-brand1);
        cursor: pointer;
      }
    }
    &-information {
      margin-left: 20px;
      margin-right: 20px;
      font-size: var(--o-font-size-tip);
      color: var(--e-color-text1);
      &-current {
        color: var(--e-color-brand1);
        font-size: var(--o-font-size-tip);
      }
    }
  }
}

@media (max-width: 1504px) {
  .live-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1280px) {
}

@media (max-width: 1080px) {
  .live-list {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (max-width: 880px) {
  .url-list {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
