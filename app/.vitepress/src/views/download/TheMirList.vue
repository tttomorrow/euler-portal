<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { useI18n } from '@/i18n';
import { getAllMirror } from '@/api/api-mirror';
import IconCpoy from '~icons/app/icon-copy.svg';
import { ElMessage } from 'element-plus';
import BannerLevel3 from '@/components/BannerLevel3.vue';
import banner from '@/assets/banner-secondary.png';
import useWindowResize from '@/components/hooks/useWindowResize';
import MapContainer from './MapContainer.vue';

interface MapMsg {
  name: string;
  latitude: number;
  longitude: number;
  location: string;
}
const i18n = computed(() => useI18n());

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

const mapData: Ref<MapMsg[]> = ref([]);

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

const initMap = (data: any[]) => {
  const result: MapMsg[] = [];
  data.forEach((item) => {
    const itemObj: MapMsg = {
      name: '',
      latitude: 0,
      longitude: 0,
      location: '',
    };
    itemObj.name = item.Name;
    itemObj.longitude = item.Longitude;
    itemObj.latitude = item.Latitude;
    itemObj.location = item.Country;

    result.push(itemObj);
  });

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
    mapData.value = initMap(responeData);
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
    <OTable
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
    </OTable>
    <div v-else class="mirror-mobile">
      <OCard v-for="item in listData" :key="item.name" class="mirror-card">
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
    <div class="mirror-map">
      <MapContainer :map-data="mapData"></MapContainer>
    </div>

    <div class="input-box">
      <!-- 用于复制RSNC的值 -->
      <input id="useCopy" type="text" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mirror {
  &-map {
    margin-top: var(--o-spacing-h2);
    width: 100%;
    height: 996px;
  }
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
  :deep(.mirror-list-area) {
    .mirror-list-row {
      line-height: 72px;
      border: none;
      a {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        font-weight: 800;
        color: var(--o-color-text2);
      }
    }
  }
  :deep(.mirror-list-header) {
    background: var(--o-color-bg3);
    font-size: var(--o-font-size-h8);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: 54px;
    padding: 0 !important;
    .cell {
      padding: 0 var(--o-spacing-h6) 0 0;
    }

    &:first-child {
      .cell {
        padding-left: var(--o-spacing-h2);
      }
    }

    &:last-child {
      .cell {
        padding-right: var(--o-spacing-h2);
      }
    }
  }

  :deep(.mirror-list-row) {
    font-size: var(--o-font-size-h8);
    font-weight: 400;
    color: var(--o-color-text2);
    height: 54px;
    border-bottom: 1px var(--o-color-division) solid;
    .cell {
      padding-left: 0px;
      padding-right: var(--o-spacing-h6);
    }

    &:first-child {
      .cell {
        padding-left: var(--o-spacing-h2);
      }
    }
    &:last-child {
      .cell {
        padding-right: var(--o-spacing-h2);
      }
    }
  }

  max-width: 1504px;
  margin: 0 auto;
  padding: 0 var(--o-spacing-h2);
  @media (max-width: 1100px) {
    padding: 0 var(--o-spacing-h5);
  }
  p {
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
  }
  a {
    text-decoration: none;
    color: var(--o-color-brand);
  }

  &-img {
    height: 34px;
  }
  &-rsnc {
    cursor: pointer;
    color: var(--o-color-brand);
    display: block;
    width: var(--o-line-height-h8);
    height: var(--o-line-height-h8);
  }
  &-ftp {
    cursor: pointer;
    color: var(--o-color-brand);
    display: block;
    width: var(--o-line-height-h8);
    height: var(--o-line-height-h8);
  }
}

.input-box #useCopy {
  position: absolute;
  opacity: 0;
}
</style>
