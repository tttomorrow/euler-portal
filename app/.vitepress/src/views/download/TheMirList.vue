<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { getAllMirror } from '@/api/api-mirror';
import IconCpoy from '~icons/app/icon-copy.svg';
import { ElMessage } from 'element-plus';
import BannerLevel3 from '@/components/BannerLevel3.vue';
import banner from '@/assets/banner-secondary.png';
import { useData } from 'vitepress';
import useWindowResize from '@/components/hooks/useWindowResize';

const { theme: i18n } = useData();

interface MirrorMsg {
  name: string;
  location?: string;
  sponsor?: string;
  sponsorLogo?: string;
  http?: string;
  rsnc?: string;
  ftp?: string;
  continentCode?: string;
  netband?: string;
  area?: boolean;
}

const screenWidth = useWindowResize();

const tableData: Ref<MirrorMsg[]> = ref([]);

const inputDom: Ref<HTMLElement | null> = ref(null);

const initTable = (data: any[]) => {
  let result: MirrorMsg[] = [];
  data.forEach((item) => {
    const itemObj = {
      name: '',
      location: '',
      sponsor: '',
      sponsorLogo: '',
      http: '',
      rsnc: '',
      ftp: '',
      continentCode: '',
      netband: '',
    };
    itemObj.continentCode = item.ContinentCode;
    itemObj.name = item.Name;
    itemObj.location = item.Country ? item.Country : '-';
    itemObj.sponsor = item.SponsorURL ? item.SponsorURL : '-';
    itemObj.sponsorLogo = item.SponsorLogoURL ? item.SponsorLogoURL : '-';
    itemObj.http = item.HttpURL ? item.HttpURL : '-';
    itemObj.rsnc = item.RsyncURL ? item.RsyncURL : '-';
    itemObj.ftp = item.FtpURL ? item.FtpURL : '-';
    itemObj.netband = item.NetworkBandwidth ? item.NetworkBandwidth : '-';
    result.push(itemObj);
  });
  result.sort((a, b) => {
    return (a.name + '').localeCompare(b.name + '');
  });

  const asData = result.filter((item) => {
    return item.continentCode === 'AS';
  });
  asData.unshift({ name: 'Asia:', area: true });
  const euData = result.filter((item) => {
    return item.continentCode === 'EU';
  });
  euData.unshift({ name: 'Europe:', area: true });
  result = [...asData, ...euData];
  return result;
};
const tableRowClassName = ({ row }: any) => {
  if (row.area) {
    return 'mirror-list-area';
  }
  return '';
};
const copyText = (value: string | undefined) => {
  if (!value) return;
  if (inputDom.value) {
    (inputDom.value as HTMLInputElement).value = value;
    (inputDom.value as HTMLInputElement).select();
  }
  const text = '复制成功';
  ElMessage({
    message: text,
    type: 'success',
  });
};

const listData = computed(() => {
  return tableData.value.filter((item) => typeof item.area === 'undefined');
});
onMounted(async () => {
  inputDom.value = document.getElementById('useCopy');
  try {
    const responeData = await getAllMirror();
    tableData.value = initTable(responeData);
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>

<template>
  <BannerLevel3
    :background-image="banner"
    background-text="DOWNLOAD"
    :title="i18n.download.MIRROR_ALL.TITLE"
  />
  <div class="mirror-list">
    <p>
      {{ i18n.download.MIRROR_ALL.CONTENT[0] }}
      <a href="mailto:admin@openeuler.io">
        {{ i18n.download.MIRROR_ALL.CONTENT[1] }}</a
      >.
    </p>
    <el-table
      v-if="screenWidth > 768"
      :data="tableData"
      header-cell-class-name="mirror-list-header"
      cell-class-name="mirror-list-row"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="name"
        :label="i18n.download.MIRROR_ALL.NAME"
        width="350"
        class-name="mirror-name"
      >
        <template #default="scope">
          <div>
            <a :href="scope.row.http" target="_blank">{{ scope.row.name }}</a>
          </div>
        </template>
      </el-table-column>
      <OTableColumn
        prop="location"
        :label="i18n.download.MIRROR_ALL.LOCATION"
        min-width="100"
      />
      <el-table-column :label="i18n.download.MIRROR_ALL.SPONSOR" min-width="90">
        <template #default="scope">
          <a :href="scope.row.sponsor" target="_blank"
            ><img :src="scope.row.sponsorLogo" class="mirror-list-img"
          /></a>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.download.MIRROR_ALL.RSNC" min-width="90">
        <template #default="scope">
          <span v-if="scope.row.rsnc === '-'">{{ scope.row.rsnc }}</span>
          <IconCpoy
            v-else-if="scope.row.rsnc && scope.row.rsnc != ''"
            class="mirror-list-rsnc"
            @click="copyText(scope.row.rsnc)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="i18n.download.MIRROR_ALL.FTP" min-width="80">
        <template #default="scope">
          <span v-if="scope.row.ftp === '-'">{{ scope.row.ftp }}</span>
          <IconCpoy
            v-else-if="scope.row.rsnc && scope.row.rsnc != ''"
            class="mirror-list-ftp"
            @click="copyText(scope.row.ftp)"
          />
        </template>
      </el-table-column>
      <OTableColumn
        :label="i18n.download.MIRROR_ALL.Mbs"
        prop="netband"
        width="260"
      >
      </OTableColumn>
    </el-table>
    <div v-else class="mirror-mobile">
      <OCard v-for="(item, index) in listData" :key="index" class="mirror-card">
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.NAME }}
          </div>
          <div class="mirror-card-word">{{ item.name }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.LOCATION }}
          </div>
          <div class="mirror-card-word">{{ item.location }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.HTTPS }}
          </div>
          <div class="mirror-card-word">{{ item.sponsor }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.SPONSOR }}
          </div>
          <div class="mirror-card-word">
            <a :href="item.http" target="_blank">{{ item.http }}</a>
          </div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.RSNC }}
          </div>
          <div v-if="item.rsnc === '-'" class="mirror-card-word">
            {{ item.rsnc }}
          </div>
          <IconCpoy
            v-else-if="item.rsnc && item.rsnc != ''"
            class="mirror-card-rsnc"
            @click="copyText(item.rsnc)"
          />
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.FTP }}
          </div>
          <div v-if="item.ftp === '-'" class="mirror-card-word">
            {{ item.ftp }}
          </div>
          <IconCpoy
            v-else-if="item.ftp && item.ftp != ''"
            class="mirror-card-rsnc"
            @click="copyText(item.ftp)"
          />
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.Mbs }}
          </div>
          <div class="mirror-card-word">{{ item.netband }}</div>
        </div>
      </OCard>
    </div>
    <div class="input-box">
      <!-- 用于复制RSNC的值 -->
      <input id="useCopy" type="text" />
    </div>
  </div>
</template>

<style lang="scss">
.mirror-list {
  &-header {
    background: var(--o-color-bg3) !important;
    font-size: var(--o-font-size-h8);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: 54px;
    padding: 0 !important;
    .cell {
      padding-left: 0px;
    }
  }
  &-header:first-child {
    .cell {
      padding-left: var(--o-spacing-h2);
    }
  }
  &-header:last-child {
    .cell {
      padding-right: var(--o-spacing-h2);
    }
  }

  &-area {
    .mirror-list-row {
      font-size: var(--o-font-size-h7) !important;
      font-weight: 800 !important;
      height: 72px !important;
      border: none !important;
    }
  }

  &-row {
    font-size: var(--o-font-size-h8);
    font-weight: 400;
    color: var(--o-color-text2);
    height: 54px;
    .cell {
      padding-left: 0px;
    }
  }
  &-row:first-child {
    .cell {
      padding-left: var(--o-spacing-h2);
    }
  }
  &-row:last-child {
    .cell {
      padding-right: var(--o-spacing-h2);
    }
  }
}
</style>

<style lang="scss" scoped>
.mirror {
  &-mobile {
    > :nth-child(odd) {
      background-color: var(--o-color-bg3);
    }
  }
  &-card {
    :deep(.el-card__body) {
      padding: var(--o-spacing-h5);
      :first-child .mirror-card-title,
      :first-child .mirror-card-word {
        margin-top: 0px;
      }
    }

    &-content {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }

    &-title {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      color: var(--o-color-text3);
      margin-right: var(--o-spacing-h10);
      margin-top: var(--o-spacing-h8);
    }

    &-word {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      color: var(--o-color-secondary_active);
      margin-top: var(--o-spacing-h8);
      a {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        margin-top: var(--o-spacing-h8);
        color: var(--o-color-brand);
      }
    }

    &-rsnc {
      margin-top: var(--o-spacing-h8);
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
      color: var(--o-color-brand);
    }
  }
}
.mirror-list {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0 var(--o-spacing-h2);
  @media (max-width: 1100px) {
    padding: 0 var(--o-spacing-h5);
  }
  > p {
    font-size: var(--o-font-size-h7);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h7);
    margin: var(--o-spacing-h1) 0 var(--o-spacing-h2) 0;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin: var(--o-spacing-h2) 0 var(--o-spacing-h5) 0;
    }

    > a {
      text-decoration: none;
      color: var(--o-color-brand);
    }
  }

  &-img {
    height: 34px;
  }
  &-rsnc {
    cursor: pointer;
    color: var(--o-color-brand);
    display: block;
    width: 24px;
    height: 24px;
  }
  &-ftp {
    cursor: pointer;
    color: var(--o-color-brand);
    display: block;
    width: 24px;
    height: 24px;
  }
}

.input-box #useCopy {
  position: absolute;
  opacity: 0;
}
</style>
