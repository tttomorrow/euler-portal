<script setup lang="ts">
import { onMounted, Ref, ref, computed } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import { getAllMailing } from '@/api/api-mailing';

import banner from '@/assets/banner/banner-interaction.png';
import illustration from '@/assets/illustrations/mailing.png';
import sig1 from '@/assets/category/sig/guidance/sig1.png';
import sig2 from '@/assets/category/sig/guidance/sig5.png';
import sig4 from '@/assets/category/sig/guidance/sig2.png';
import sig5 from '@/assets/category/sig/guidance/sig3.png';

const LEFT_IMG = [sig1, sig2];
const RIGHT_IMG = [sig4, sig5];

const i18n = useI18n();
const router = useRouter();
const screenWidth = useWindowResize();
const commonStore = useCommon();
const { lang } = useData();

interface MailingMsg {
  description?: string;
  display_name?: string;
  fqdn_listname?: string;
  http_etag?: string;
  list_id?: string;
  list_name?: string;
  mail_host?: string;
  member_count?: number;
  self_link?: string;
  volume?: number;
}

const tableData: Ref<MailingMsg[]> = ref([]);

const initTable = (data: any[]) => {
  const result: MailingMsg[] = [];
  data.entries.forEach((item) => {
    const itemObj = {
      description: '',
      display_name: '',
      fqdn_listname: '',
      http_etag: '',
      list_id: '',
      list_name: '',
      mail_host: '',
      member_count: null,
      self_link: '',
      volume: null,
    };
    itemObj.description = item.description;
    itemObj.display_name = item.display_name;
    itemObj.fqdn_listname = item.fqdn_listname;
    itemObj.http_etag = item.http_etag;
    itemObj.list_id = item.list_id;
    itemObj.list_name = item.list_name;
    itemObj.mail_host = item.mail_host;
    itemObj.member_count = item.member_count;
    itemObj.self_link = item.self_link;
    itemObj.volume = item.volume;
    result.push(itemObj);
  });
  result.sort((a, b) => {
    return (a.display_name + '').localeCompare(b.display_name + '');
  });
  return result;
};
onMounted(async () => {
  try {
    const responeData = await getAllMailing();
    tableData.value = initTable(responeData);
  } catch (e: any) {
    throw new Error(e);
  }
});

const goUnsubscribeBlog = () => {
  const path1 = router.route.path.substring(0, 3);
  const path2 = i18n.value.mailing.MAILING_LIST.GUIDE_CONTENT[1].RIGHT.LINK;
  router.go(`${path1}/${path2}`);
};

const userSubscribe = (userID: string) => {
  window.open('https://mailweb.openeuler.org/postorius/lists/' + userID + '/');
};

const isMobile = computed(() => {
  if (screenWidth.value <= 768) {
    return true;
  }
  return false;
});
</script>

<template>
  <div class="application">
    <BannerLevel2
      :background-image="banner"
      background-text="COMMUNITY"
      :title="i18n.mailing.MAILING_LIST.TITLE"
      :illustration="illustration"
    />
    <AppContent>
      <div class="middle">
        <div class="middle-process-box">
          <div
            v-show="!isMobile"
            class="lower-box"
            :style="{ top: lang === 'zh' ? '50px' : '61px' }"
          >
            <div
              class="big-bg"
              :style="{
                height: lang === 'zh' ? '120px' : '',
                'border-color':
                  commonStore.theme === 'dark' ? 'var(--e-color-neutral5)' : '',
              }"
            ></div>
            <div
              class="small-bg"
              :style="{
                'border-color':
                  commonStore.theme === 'dark' ? 'var(--e-color-neutral5)' : '',
              }"
            ></div>
            <div
              class="big-bg"
              :style="{
                height: lang === 'zh' ? '120px' : '',
                'border-color':
                  commonStore.theme === 'dark' ? 'var(--e-color-neutral5)' : '',
              }"
            ></div>
          </div>
          <div class="upper-box">
            <div
              v-for="(item, index) in i18n.mailing.MAILING_LIST.GUIDE_CONTENT"
              :key="item.LEFT.LEFT_CIRCLE"
              class="middle-item"
            >
              <div class="middle-item-left">
                <div class="middle-item-bgdconfig">
                  <img :src="LEFT_IMG[index]" />
                </div>
                <div class="middle-item-infoconfig">
                  <div
                    class="middle-item-infoconfig-circle"
                    :style="{
                      color:
                        commonStore.theme === 'dark'
                          ? 'var(--e-color-white)'
                          : '',
                    }"
                  >
                    <span>{{ item.LEFT.INDEX }}</span>
                  </div>
                  <div>
                    <span
                      v-if="item.LEFT.LEFT_CIRCLE"
                      style="font-size: 22px"
                      :style="{
                        color:
                          commonStore.theme === 'dark'
                            ? 'var(--e-color-white)'
                            : '',
                      }"
                    >
                      {{ item.LEFT.LEFT_CIRCLE }}
                    </span>
                    <span
                      :style="{
                        color:
                          commonStore.theme === 'dark'
                            ? 'var(--e-color-white)'
                            : '',
                      }"
                      >{{ item.LEFT.LEFT_INFO }}</span
                    >
                    <span
                      v-if="item.LEFT.DO_THIS"
                      :style="{
                        color:
                          commonStore.theme === 'dark'
                            ? 'var(--e-color-white)'
                            : '',
                      }"
                      >{{ item.LEFT.DO_THIS }}</span
                    >
                  </div>
                </div>
              </div>
              <div
                class="middle-item-right"
                :class="index === 0 ? 'middle-item-right-1' : 'other'"
              >
                <div class="middle-item-bgdconfig">
                  <img :src="RIGHT_IMG[index]" />
                </div>
                <div class="middle-item-infoconfig">
                  <div
                    class="middle-item-infoconfig-circle"
                    :style="{
                      color:
                        commonStore.theme === 'dark'
                          ? 'var(--e-color-white)'
                          : '',
                    }"
                  >
                    <span>{{ item.RIGHT.INDEX }}</span>
                  </div>
                  <div>
                    <span
                      v-if="item.RIGHT.RIGHT_CIRCLE"
                      style="font-size: 22px"
                      :style="{
                        color:
                          commonStore.theme === 'dark'
                            ? 'var(--e-color-white)'
                            : '',
                      }"
                    >
                      {{ item.RIGHT.RIGHT_CIRCLE }}
                    </span>
                    <span
                      :style="{
                        color:
                          commonStore.theme === 'dark'
                            ? 'var(--e-color-white)'
                            : '',
                      }"
                      >{{ item.RIGHT.RIGHT_INFO }}
                      <p
                        v-if="item.RIGHT.DO_THIS"
                        :style="{
                          color:
                            commonStore.theme === 'dark'
                              ? 'var(--e-color-link2)'
                              : '',
                        }"
                        @click="goUnsubscribeBlog()"
                      >
                        {{ item.RIGHT.DO_THIS }}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mail-table">
          <OTable
            :data="tableData"
            header-cell-class-name="mirror-list-header"
            cell-class-name="mirror-list-row"
            style="width: 100%"
          >
            <el-table-column
              :width="isMobile ? '' : '180'"
              :label="
                isMobile
                  ? i18n.mailing.MAILING_LIST.TABLE.NAME_H5_MO
                  : i18n.mailing.MAILING_LIST.TABLE.NAME_H5
              "
            >
              <template #default="scope">
                <a
                  ref="listName"
                  class="imformation-color"
                  target="_blank"
                  :style="{
                    color:
                      commonStore.theme === 'dark'
                        ? 'var(--e-color-link2)'
                        : '',
                  }"
                  @click="userSubscribe(scope.row.list_id)"
                >
                  {{ scope.row.display_name }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              :width="isMobile ? '' : '230'"
              :label="
                isMobile
                  ? i18n.mailing.MAILING_LIST.TABLE.EMAIL_ADDRESS_MO
                  : i18n.mailing.MAILING_LIST.TABLE.EMAIL_ADDRESS
              "
              prop="fqdn_listname"
            >
              <template #default="scope">
                <div>
                  <span
                    class="ellipsis"
                    :style="{
                      color:
                        commonStore.theme === 'dark'
                          ? 'var(--e-color-white)'
                          : '',
                    }"
                    >{{ scope.row.fqdn_listname }}</span
                  >
                </div>
                <!-- <el-popover trigger="hover" placement="top"  width="300">
                <p>{{ scope.row.fqdn_listname }}</p>
                <div>
                  <span class="ellipsis">{{ scope.row.fqdn_listname }}</span>
                </div>
              </el-popover> -->
              </template>
            </el-table-column>
            <el-table-column
              :width="isMobile ? '' : '130'"
              :label="
                isMobile
                  ? i18n.mailing.MAILING_LIST.TABLE.ARCHIVE_H5_MO
                  : i18n.mailing.MAILING_LIST.TABLE.ARCHIVE_H5
              "
            >
              <template #default="scope">
                <a
                  :href="
                    'https://mailweb.openeuler.org/hyperkitty/list/' +
                    scope.row.display_name.toLowerCase() +
                    '@openeuler.org/'
                  "
                  class="imformation-color"
                  target="_blank"
                  :style="{
                    color:
                      commonStore.theme === 'dark'
                        ? 'var(--e-color-link2)'
                        : '',
                  }"
                >
                  archive
                </a>
              </template>
            </el-table-column>
            <el-table-column
              :label="
                isMobile
                  ? i18n.mailing.MAILING_LIST.TABLE.DESCRIPTION_MO
                  : i18n.mailing.MAILING_LIST.TABLE.DESCRIPTION
              "
              prop="description"
            >
              <template #default="scope">
                <div>
                  <span
                    class="ellipsis"
                    :style="{
                      color:
                        commonStore.theme === 'dark'
                          ? 'var(--e-color-white)'
                          : '',
                    }"
                    >{{ scope.row.description }}</span
                  >
                </div>
              </template>
            </el-table-column>
          </OTable>
        </div>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
.application {
  .middle {
    margin-top: 22px;
    &-process-box {
      position: relative;
    }
    .lower-box {
      max-width: 1504px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      left: 25%;
      z-index: 3;
      .big-bg {
        margin: auto;
        width: 730px;
        height: 170px;
        border-width: 2px;
        border-style: dashed;
        border-color: var(--e-color-brand1);
        border-bottom: none;
        border-left: none;
      }
      .small-bg {
        margin: auto;
        width: 730px;
        min-height: 102px;
        border-width: 2px;
        border-style: dashed;
        border-color: var(--e-color-brand1);
        border-bottom: none;
        border-right: none;
      }
    }
    .upper-box {
      background-color: rgba(255, 255, 255, 0);
      @media (max-width: 780px) {
        margin-top: -22px;
      }
    }
    &-item {
      min-height: 204px;
      display: flex;
      align-items: flex-start;
      margin-top: -22px;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 0);
      @media (max-width: 780px) {
        min-height: 0px;
        display: block;
        margin-top: var(--o-spacing-h5);
      }
      &-left {
        display: flex;
        margin-right: 0px;
        z-index: 4;
        @media (max-width: 780px) {
          margin-right: 0px;
          margin-bottom: var(--o-spacing-h5);
        }
      }
      &-right {
        margin-top: 100px;
        display: flex;
        margin-right: 0px;
        z-index: 4;
        @media (max-width: 780px) {
          margin-right: 0px;
          margin-top: var(--o-spacing-h5);
        }
      }
      &-right-1 {
        margin-top: 102px;
        z-index: 4;
        @media (max-width: 780px) {
          margin-top: 0px;
        }
      }
      &-bgdconfig {
        width: 216px;
        background-color: var(--e-color-brand2);
        @media (max-width: 1280px) {
          width: 180px;
        }
        @media (max-width: 1080px) {
          width: 150px;
        }
        img {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 90px;
          object-fit: contain;
          @media (max-width: 1080px) {
            height: 80px;
          }
          @media (max-width: 780px) {
            width: 60px;
          }
        }
      }
      &-infoconfig {
        width: 456px;
        background-color: var(--e-color-bg2);
        @media (max-width: 1440px) {
          width: 430px;
        }
        @media (max-width: 1366px) {
          width: 370px;
        }
        @media (max-width: 1280px) {
          width: 350px;
        }
        @media (max-width: 1080px) {
          width: 300px;
        }
        span {
          color: var(--e-color-black);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-h8);
          float: left;
          margin: 0 var(--o-spacing-h4) var(--o-spacing-h4) 59px;
          position: relative;
          bottom: var(--o-spacing-h4);
          @media (max-width: 780px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            margin: 0 var(--o-spacing-h6) var(--o-spacing-h10) 30px;
            bottom: var(--o-spacing-h5);
          }
        }
        p {
          color: var(--e-color-link3);
          cursor: pointer;
          display: inline;
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-h8);
          bottom: var(--o-spacing-h4);
          float: center;
          @media (max-width: 780px) {
            line-height: var(--o-line-height-text);
          }
        }
        &-circle {
          height: 78px;
          width: 78px;
          border: 4px solid var(--e-color-white);
          border-radius: 50%;
          background-color: var(--e-color-kleinblue5);
          position: relative;
          top: 50%;
          transform: translate(-50%, -50%);
          @media (max-width: 780px) {
            height: 38px;
            width: 38px;
            border: 2px solid var(--e-color-white);
            justify-content: center;
          }
          span {
            white-space: nowrap;
            font-size: var(--o-font-size-h5);
            color: var(--e-color-white);
            line-height: var(--o-line-height-h5);
            position: relative;
            top: 50%;
            right: 36%;
            transform: translate(-50%, -50%);
            font-weight: 500;
            @media (max-width: 780px) {
              font-size: var(--o-font-size-text);
              margin: auto;
              left: 50%;
              line-height: var(--o-line-height-text);
            }
          }
        }
      }
    }
  }
  .mail-table {
    margin-top: var(--o-spacing-h1);
    @media (max-width: 780px) {
      margin-top: var(--o-spacing-h2);
    }
    :deep(.mirror-list-header) {
      font-size: var(--o-font-size-h8);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: 54px;
      padding: 0 !important;
      @media (max-width: 780px) {
        font-size: var(--o-font-size-text);
      }
      .cell {
        padding: 0 var(--o-spacing-h6) 0 0;
      }

      &:first-child {
        .cell {
          padding-left: var(--o-spacing-h2);
          @media (max-width: 780px) {
            padding-left: var(--o-spacing-h6);
          }
        }
      }

      &:last-child {
        .cell {
          padding-right: var(--o-spacing-h2);
          @media (max-width: 780px) {
            padding-right: var(--o-spacing-h6);
          }
        }
      }
    }
    :deep(.mirror-list-row) {
      padding: 0 !important;
      line-height: 22px;
      @media (max-width: 780px) {
        font-size: var(--o-font-size-tip);
      }
      .cell {
        padding: var(--o-spacing-h5) var(--o-spacing-h6) var(--o-spacing-h5) 0;
      }

      &:first-child {
        .cell {
          padding-left: var(--o-spacing-h2);
          @media (max-width: 780px) {
            padding-left: var(--o-spacing-h6);
          }
        }
      }

      &:last-child {
        .cell {
          padding-right: var(--o-spacing-h2);
          @media (max-width: 780px) {
            padding-right: var(--o-spacing-h6);
          }
        }
      }
    }
    .ellipsis {
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .el-popover {
      height: 150px;
      overflow: auto;
    }
  }
}
.imformation-color {
  color: var(--e-color-brand1);
  cursor: pointer;
}
</style>
