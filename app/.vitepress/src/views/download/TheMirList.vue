<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { getAllMirror } from '@/api/api-mirror';
import IconCpoy from '~icons/app/icon-copy.svg';
import { ElMessage } from 'element-plus';
import BannerLevel3 from '@/components/BannerLevel3.vue';
import banner from '@/assets/banner-secondary.png';
import { useData } from 'vitepress';

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
const copyText = (value: string) => {
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
onMounted(async () => {
  inputDom.value = document.getElementById('useCopy');
  try {
    const responeData = await getAllMirror();
    tableData.value = initTable(responeData);
  } catch (e) {
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
      <el-table-column
        prop="location"
        :label="i18n.download.MIRROR_ALL.LOCATION"
        min-width="100"
      />
      <el-table-column :label="i18n.download.MIRROR_ALL.SPONSOR" min-width="80">
        <template #default="scope">
          <a :href="scope.row.sponsor" target="_blank"
            ><img :src="scope.row.sponsorLogo" class="mirror-list-img"
          /></a>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.download.MIRROR_ALL.RSNC" min-width="80">
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
      <el-table-column
        :label="i18n.download.MIRROR_ALL.Mbs"
        prop="netband"
        width="260"
      >
      </el-table-column>
    </el-table>
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
    font-family: 'PingFangSC-Regular, PingFang SC';
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
      font-family: 'PingFangSC-Regular, PingFang SC';
      font-weight: 800 !important;
      height: 72px !important;
      border: none !important;
    }
  }

  &-row {
    font-size: var(--o-font-size-h8);
    font-family: 'PingFangSC-Regular, PingFang SC';
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
.mirror-list {
  max-width: 1504px;
  margin: var(--o-spacing-h2) auto;
  margin-top: var(--o-spacing-h1);
  > p {
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    line-height: 34px;
    margin: 60px 0 30px 0;
    > a {
      text-decoration: none;
      color: #002fa7;
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
