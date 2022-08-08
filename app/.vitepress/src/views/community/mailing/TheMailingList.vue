<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from '@/i18n';
import { useRouter } from 'vitepress';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import { getAllMailing } from '@/api/api-mailing';
import banner from '@/assets/banner-secondary.png';
import illustration from '@/assets/illustrations/mailing.png';
import sig1 from '@/assets/sig-application/sig1.png';
import sig2 from '@/assets/sig-application/sig4.png';
import sig4 from '@/assets/sig-application/sig3.png';
import sig5 from '@/assets/sig-application/sig5.png';

const LEFT_IMG = [sig1, sig2];
const RIGHT_IMG = [sig4, sig5];

const i18n = useI18n();
const router = useRouter();

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
</script>

<template>
  <div class="application">
    <header>
      <BannerLevel2
        :background-image="banner"
        background-text="COMMUNITY"
        :title="i18n.mailing.MAILING_LIST.TITLE"
        :illustration="illustration"
      />
    </header>
    <main>
      <div class="middle">
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
              <div class="middle-item-infoconfig-circle">
                <span>{{ item.LEFT.LEFT_CIRCLE }}</span>
              </div>
              <div>
                <span>{{ item.LEFT.LEFT_INFO }}</span>
                <span v-if="item.LEFT.DO_THIS">{{ item.LEFT.DO_THIS }}</span>
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
              <div class="middle-item-infoconfig-circle">
                <span>{{ item.RIGHT.RIGHT_CIRCLE }}</span>
              </div>
              <div>
                <span
                  >{{ item.RIGHT.RIGHT_INFO }}
                  <p v-if="item.RIGHT.DO_THIS" @click="goUnsubscribeBlog()">
                    {{ item.RIGHT.DO_THIS }}
                  </p></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <main>
      <div class="mail-table">
        <OTable :data="tableData" style="width: 100%">
          <el-table-column label="Mirror Name" width="230">
            <template #default="scope">
              <a
                ref="listName"
                class="imformation-color"
                target="_blank"
                @click="userSubscribe(scope.row.list_id)"
              >
                {{ scope.row.display_name }}
              </a>
            </template>
          </el-table-column>
          <el-table-column label="Location" prop="fqdn_listname" width="360">
          </el-table-column>
          <el-table-column label="Sponsor" width="150">
            <template #default="scope">
              <a
                :href="
                  'https://mailweb.openeuler.org/hyperkitty/list/' +
                  scope.row.display_name.toLowerCase() +
                  '@openeuler.org/'
                "
                class="imformation-color"
                target="_blank"
              >
                archive
              </a>
            </template>
          </el-table-column>
          <OTableColumn
            label="RSNC"
            prop="description"
            :show-overflow-tooltip="true"
            width="620"
          ></OTableColumn>
        </OTable>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.application {
  .middle {
    max-width: 1504px;
    margin: var(--o-spacing-h1) auto;
    padding: 0 44px;
    @media (max-width: 1080px) {
      margin: var(--o-spacing-h2) auto;
      padding: 0 16px;
    }
    &-item {
      min-height: 204px;
      display: flex;
      align-items: flex-start;
      margin-top: var(--o-spacing-h4);
      @media (max-width: 780px) {
        display: block;
      }
      &-left {
        display: flex;
        margin-right: var(--o-spacing-h4);
        @media (max-width: 780px) {
          margin-right: 0px;
          margin-bottom: var(--o-spacing-h4);
        }
      }
      &-right {
        margin-top: 80px;
        display: flex;
        margin-right: var(--o-spacing-h4);
        @media (max-width: 780px) {
          margin-right: 0px;
          margin-top: var(--o-spacing-h5);
        }
      }
      &-right-1 {
        margin-top: 102px;
        @media (max-width: 780px) {
          margin-top: 0px;
        }
      }
      &-bgdconfig {
        width: 216px;
        background-color: var(--o-color-brand_hover);
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
        background-color: var(--o-color-bg);
        @media (max-width: 1280px) {
          width: 350px;
        }
        @media (max-width: 1080px) {
          width: 300px;
        }
        span {
          color: var(--o-color-text2);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-h8);
          float: left;
          margin: 0 var(--o-spacing-h4) var(--o-spacing-h4) var(--o-spacing-h1);
          position: relative;
          bottom: var(--o-spacing-h4);
          @media (max-width: 780px) {
            margin: 0 var(--o-spacing-h10) 0 var(--o-spacing-h3);
            line-height: var(--o-line-height-text);
          }
        }
        p {
          color: var(--o-color-brand);
          cursor: pointer;
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
          border: 4px solid var(--o-color-base);
          border-radius: 50%;
          background-color: var(--o-color-brand);
          position: relative;
          top: 50%;
          transform: translate(-50%, -50%);
          @media (max-width: 780px) {
            height: 60px;
            width: 60px;
          }
          span {
            white-space: nowrap;
            font-size: var(--o-font-size-h5);
            color: var(--o-color-text);
            line-height: var(--o-line-height-h5);
            position: relative;
            right: 53px;
            top: var(--o-spacing-h5);
            @media (max-width: 780px) {
              font-size: var(--o-font-size-h7);
              right: var(--o-spacing-h4);
              top: var(--o-spacing-h6);
            }
          }
        }
      }
    }
  }
  .mail-table {
    max-width: 1416px;
    margin: auto;
    padding-right: 40px;
    @media screen and (max-width: 1508px) {
      padding: 0 40px;
    }
    @media (max-width: 1080px) {
      padding: 0 16px;
    }
  }
}
.imformation-color {
  color: var(--o-color-brand);
  cursor: pointer;
}
</style>
