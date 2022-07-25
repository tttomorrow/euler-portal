<script setup lang="ts">
import { computed, ref } from 'vue';
import IconDownload from '~icons/app/icon-download.svg';
import banner from '@/assets/banner-secondary.png';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerLevel3 from '@/components/BannerLevel3.vue';
import { useData } from 'vitepress';

const { lang, theme: i18n } = useData();
const downloadUrl = (url: string) => {
  window.open(url);
};

const currentPage = ref(1);
const pageSize = ref(9);
const total = ref(i18n.value.download.DOWNLOAD_LIST.length);
const screenWidth = useWindowResize();

const dataList = computed(() => {
  if (screenWidth.value > 768) {
    return i18n.value.download.DOWNLOAD_LIST.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return i18n.value.download.DOWNLOAD_LIST.slice(
      0,
      currentPage.value * pageSize.value
    );
  }
});

const LoadMore = () => {
  if (currentPage.value * pageSize.value < total.value) {
    currentPage.value = currentPage.value + 1;
  }
};

const urlStyle = computed(() => {
  if (lang.value === 'zh') {
    return 'url-list-zh';
  } else if (lang.value === 'en') {
    return 'url-list-en';
  } else if (lang.value === 'ru') {
    return 'url-list-ru';
  }
  return '';
});
</script>

<template>
  <BannerLevel3
    :background-image="banner"
    background-text="DOWNLOAD"
    :title="i18n.download.OUTSIDE_TITLE"
  />
  <div class="download">
    <div class="download-list">
      <OCard
        v-for="(download, index) in dataList"
        :key="index"
        :style="{ padding: '0px' }"
        class="download-list-item"
      >
        <div>
          <h5 class="download-name">
            {{ download.NAME }}
          </h5>
          <div class="download-desc">
            {{ download.DESC }}
          </div>
          <div :class="urlStyle">
            <div v-if="download.SEEK_HELP_URL ? true : false">
              <a target="_blank" :href="download.SEEK_HELP_URL">
                {{ i18n.download.SEEK_HELP }}
              </a>
            </div>
            <div v-if="download.GET_ISO_URL ? true : false">
              <a target="_blank" :href="download.GET_ISO_URL">
                {{ i18n.download.GET_ISO }}
              </a>
            </div>
            <div v-if="download.LIFE_CYCLE_URL ? true : false">
              <a target="_blank" :href="download.LIFE_CYCLE_URL">
                {{ i18n.download.LIFE_CYCLE }}
              </a>
            </div>
            <div v-if="download.RELEASE_DESC_URL ? true : false">
              <a target="_blank" :href="download.RELEASE_DESC_URL">
                {{ i18n.download.RELEASE_DESC }}
              </a>
            </div>
            <div v-if="download.INSTALL_GUIDENCE_URL ? true : false">
              <a target="_blank" :href="download.INSTALL_GUIDENCE_URL">
                {{ i18n.download.INSTALL_GUIDENCE }}
              </a>
            </div>
            <div v-if="download.WHITE_PAPER ? true : false">
              <a target="_blank" :href="download.WHITE_PAPER">
                {{ i18n.download.WHITE_PAPER }}
              </a>
            </div>
            <div v-if="download.WEBSITE_SELECT ? true : false">
              <a target="_blank" :href="download.WEBSITE_SELECT">
                {{ i18n.download.WEBSITE_SELECT }}
              </a>
            </div>
          </div>
        </div>

        <OButton
          size="small"
          type="primary"
          class="download-button"
          @click="downloadUrl(download.DOWNLOAD_URL)"
        >
          {{ i18n.download.DOWNLOAD_BTN_NAME }}
          <IconDownload class="download-button-icon" />
        </OButton>
      </OCard>
    </div>
    <div class="page-box">
      <OPagination
        v-if="screenWidth > 768"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        class="pagination"
        :page-sizes="[9, 12, 18, 36]"
        :background="true"
        layout="sizes, prev, pager, next, slot, jumper"
        :total="total"
      >
        <span>{{ pageSize }} / {{ total }}</span>
      </OPagination>
      <div v-else class="page-box-mobile">
        <div>
          已显示{{
            pageSize * currentPage < total ? pageSize * currentPage : total
          }}条记录/共{{ total }}条
        </div>
        <div class="page-box-divide">
          <div
            class="page-box-divide-in"
            :style="{
              width:
                (pageSize * currentPage * 100) / total > 100
                  ? (pageSize * currentPage * 100) / total
                  : '100' + '%',
            }"
          ></div>
        </div>
        <OButton
          v-if="currentPage * pageSize < total"
          class="page-box-button"
          @click="LoadMore"
        >
          加载更多
        </OButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-box {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--o-spacing-h1);

  &-mobile {
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  &-divide {
    max-width: 328px;
    width: 100%;
    height: 1px;
    margin-top: var(--o-spacing-h5);
    background-color: var(--o-color-division);
    &-in {
      height: 100%;
      background-color: var(--o-color-brand);
    }
  }

  &-button {
    margin-top: var(--o-spacing-h5);
    padding: var(--o-spacing-h10) var(--o-spacing-h4);
  }
}
.download {
  margin: 0 auto;
  max-width: 1504px;
  padding: 0 var(--o-spacing-h2);
  @media (max-width: 1100px) {
    padding: 0 var(--o-spacing-h5);
  }

  &-list {
    display: grid;
    margin: var(--o-spacing-h2) auto;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h4);
    &-item {
      width: 100%;
      max-width: 456px;
      height: 100%;

      @media (max-width: 768px) {
        max-width: 328px;
      }

      :deep(.el-card__body) {
        padding: var(--o-spacing-h2);
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        @media (max-width: 768px) {
          padding: var(--o-spacing-h5) var(--o-spacing-h6);
        }
      }
    }
  }
  &-name {
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  &-desc {
    margin-top: var(--o-spacing-h5);
    font-size: var(--o-font-size-text);
    color: var(--o-color-text3);
    line-height: var(--o-line-height-text);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h10);
    }
  }

  &-button {
    margin-top: var(--o-spacing-h4);
    padding: var(--o-spacing-h10) var(--o-spacing-h5);
    line-height: var(--o-line-height-h8);
    font-size: var(--o-font-size-text);

    &-icon {
      margin-left: var(--o-spacing-h8);
      width: var(--o-font-size-tip);
      height: var(--o-font-size-tip);
      color: var(--o-color-text);
    }
  }
}

.url-list-zh {
  margin-top: var(--o-spacing-h4);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--o-spacing-h5) var(--o-spacing-h8);
  @media (max-width: 768px) {
    grid-gap: var(--o-spacing-h8);
  }

  a {
    font-size: var(--o-font-size-text);
    color: var(--o-color-brand);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}

.url-list-en {
  margin-top: var(--o-spacing-h4);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--o-spacing-h5) var(--o-spacing-h8);
  @media (max-width: 768px) {
    grid-gap: var(--o-spacing-h8);
  }

  a {
    font-size: var(--o-font-size-text);
    color: var(--o-color-brand);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}

.url-list-ru {
  margin-top: var(--o-spacing-h4);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h5) var(--o-spacing-h8);
  @media (max-width: 768px) {
    grid-gap: var(--o-spacing-h8);
  }

  a {
    font-size: var(--o-font-size-text);
    color: var(--o-color-brand);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}

@media (max-width: 1440px) {
  .url-list-zh {
    grid-template-columns: repeat(4, 1fr);
  }
  .url-list-en {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1280px) {
  .url-list-zh {
    grid-template-columns: repeat(3, 1fr);
  }
  .url-list-ru {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1080px) {
  .download-list {
    grid-template-columns: repeat(1, 1fr);
  }
  .url-list-zh {
    grid-template-columns: repeat(5, 1fr);
  }
  .url-list-en {
    grid-template-columns: repeat(4, 1fr);
  }
  .url-list-ru {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .url-list-ru {
    grid-template-columns: repeat(2, 1fr);
  }
  .url-list-en {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
