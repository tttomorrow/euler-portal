<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerBG from '@/assets/banner-secondary.png';
import BannerIllustration from '@/assets/illustrations/search.png';

import LightCradBg from '@/assets/category/interaction/live/light-crad-bg.png';
import LightCradBgMo from '@/assets/category/interaction/live/light-crad-bg-mobile.png';
import DarkCradBg from '@/assets/category/interaction/live/dark-crad-bg.png';
import DarkCradBgMo from '@/assets/category/interaction/live/dark-crad-bg-mobile.png';
import { ElMessage } from 'element-plus';

import IconRight from '~icons/app/icon-arrow-right1.svg';
import IconUser from '~icons/app/icon-user.svg';
import IconTime from '~icons/app/icon-time.svg';
import IconPre from '~icons/app/icon-chevron-left.svg';
import IconNext from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const data = computed(() => i18n.value.live.LIVE_LIST);

const currentPage1 = ref(1);
const pageSize4 = ref(6);
const total = ref(data.value.length);
const screenWidth = useWindowResize();

const changePage = (val: number, pagesize: number) => {
  const curVal = (val - 1) * pagesize;
  showLiveList.value = data.value.slice(curVal, curVal + pagesize);
};
const changeSize = (val: number, pagesize: number) => {
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

const commonStore = useCommon();
const headGround = computed(() => {
  if (commonStore.theme === 'light') {
    return screenWidth.value > 768 ? LightCradBg : LightCradBgMo;
  } else {
    return screenWidth.value > 768 ? DarkCradBg : DarkCradBgMo;
  }
});
const isMobile = computed(() => {
  if (screenWidth.value <= 768) {
    return true;
  }
  return false;
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
    background-text="CONNECT"
    :title="i18n.live.LIVETITLE"
    :illustration="BannerIllustration"
  />
  <div class="live">
    <div class="live-top-title">{{ i18n.live.REPLAYER }}</div>
    <div class="live-list">
      <OCard
        v-for="(live, index) in showLiveList"
        :key="index"
        class="live-list-item"
        :body-style="{ padding: '0px' }"
      >
        <div class="live-detail">
          <div
            class="live-background"
            :style="{ backgroundImage: 'url(' + headGround + ')' }"
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
                  <span class="live-desc-text">{{ live.LIVETIME.trim() }}</span>
                </span>
              </div>
            </div>
            <p>
              <OButton
                animation
                size="mini"
                class="live-button"
                @click="totoBLink(live.FORMERLYLINK)"
                >{{ i18n.live.REPLAYVIEW }}

                <template #suffixIcon>
                  <OIcon><IconRight /></OIcon>
                </template>
              </OButton>
            </p>
          </div>
        </div>
      </OCard>
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
        @size-change="changeSize(currentPage1, pageSize4)"
      >
        <span>{{ currentPage1 * pageSize4 + '/' + total }}</span>
      </OPagination>
      <div v-show="isMobile" class="pagination-mobile">
        <div class="pagination-options">
          <OIcon class="pagination-options-icon">
            <IconPre />
          </OIcon>
          <div class="pagination-options-text" @click="goPrevious">上一页</div>
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
</template>

<style lang="scss" scoped>
.live {
  margin: var(--o-spacing-h1) 0 0 0;
  @media screen and (max-width: 767px) {
    margin: var(--o-spacing-h2) 0 0 0;
  }
  &-top-title {
    width: 100%;
    margin: 0 auto;
    font-size: var(--o-font-size-h3);
    text-align: center;
    color: var(--e-color-text1);
    @media screen and (max-width: 767px) {
      font-size: var(--o-font-size-h8);
    }
  }
  &-list {
    display: grid;
    max-width: 1504px;
    padding: 0 44px;
    margin: var(--o-spacing-h2) auto;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media screen and (max-width: 767px) {
      padding: 0 var(--o-spacing-h5);
      margin: var(--o-spacing-h5);
    }
    &-item {
      width: 100%;
      flex: 1;
      padding: 0;
      max-height: 260px;
      &:hover {
        box-shadow: var(--o-shadow-base_hover);
      }
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
    @media screen and (max-width: 767px) {
      margin-top: var(--o-spacing-h5);
    }
    &-text {
      margin-right: var(--o-spacing-h3);
      line-height: var(--o-line-height-tip);
      font-size: var(--o-font-size-text);
      color: var(--e-color-text4);
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
      margin-left: var(--o-spacing-h8);
      width: var(--o-font-size-tip);
      height: var(--o-font-size-tip);
      @media screen and (max-width: 767px) {
        width: var(--o-font-size-tip);
        height: var(--o-font-size-tip);
      }
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
