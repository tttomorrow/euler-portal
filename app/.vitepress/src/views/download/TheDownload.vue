<script setup lang="ts">
import { computed, ref } from 'vue';
import IconDownload from '~icons/app/icon-download.svg';
import banner from '@/assets/banner-secondary.png';

import BannerLevel3 from '@/components/BannerLevel3.vue';
import { useData } from 'vitepress';

const { lang, theme: i18n } = useData();
const downloadUrl = (url: string) => {
  window.open(url);
};

const currentPage = ref(1);
const pageSize = ref(9);
const total = ref(i18n.value.download.DOWNLOAD_LIST.length);

const dataList = computed(() => {
  return i18n.value.download.DOWNLOAD_LIST.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
});

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
        class="download-list-item"
      >
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
  </div>
  <div class="page-box">
    <OPagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[9, 12, 18, 36]"
      :background="true"
      layout="sizes, prev, pager, next, slot, jumper"
      :total="total"
    >
      <span>5/50</span>
    </OPagination>
  </div>
</template>

<style lang="scss" scoped>
.page-box {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--o-spacing-l);
}
.download {
  margin: var(--o-spacing-m) 0;
  &-list {
    display: grid;
    max-width: 1504px;
    margin: 0 auto;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-s3);
    &-item {
      width: 100%;
      max-width: 456px;
      padding: 20px;
      height: 100%;
    }
  }
  &-name {
    font-size: var(--o-font-size-h5);
    font-family: 'PingFangSC-Medium, PingFang SC';
    line-height: var(--o-line-height-h5);
  }

  &-desc {
    margin-top: var(--o-spacing-s2);
    font-size: var(--o-font-size-text);
    font-family: 'PingFangSC-Regular, PingFang SC';
    color: var(--o-color-text3);
    line-height: var(--o-line-height-h8);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: var(--o-line-height-h3);
  }

  &-button {
    margin-top: var(--o-spacing-s3);
    padding: 4px 16px;
    line-height: var(--o-line-height-h8);
    font-size: var(--o-font-size-text);

    &-icon {
      margin-left: var(--o-spacing-s1);
      width: var(--o-font-size-tip);
      height: var(--o-font-size-tip);
      color: var(--o-color-text);
    }
  }
}

.url-list-zh {
  margin-top: var(--o-spacing-s3);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--o-spacing-s2) var(--o-spacing-s1);

  a {
    font-size: var(--o-font-size-text);
    font-family: 'PingFangSC-Regular, PingFang SC';
    color: var(--o-color-brand);
  }
}

.url-list-en {
  margin-top: var(--o-spacing-s3);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--o-spacing-s2) var(--o-spacing-s1);

  a {
    font-size: var(--o-font-size-text);
    font-family: 'PingFangSC-Regular, PingFang SC';
    color: var(--o-color-brand);
  }
}

.url-list-ru {
  margin-top: var(--o-spacing-s3);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-s2) var(--o-spacing-s1);

  a {
    font-size: var(--o-font-size-text);
    font-family: 'PingFangSC-Regular, PingFang SC';
    color: var(--o-color-brand);
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
