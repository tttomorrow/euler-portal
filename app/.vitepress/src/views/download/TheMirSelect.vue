<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from '@/i18n';
import { selectMirror } from '@/api/api-mirror';

import BannerLevel3 from '@/components/BannerLevel3.vue';
import MapContainer from './MapContainer.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/banner/banner-download.png';

const i18n = useI18n();

interface MapMsg {
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  http: string;
}

interface MirrorMsg {
  icon: string;
  name: string;
  url: string;
  country: string;
  continent: string;
  distance: string;
  lng: string;
  lat: string;
}

const mapData: Ref<MapMsg[]> = ref([]);

const tableData: Ref<MirrorMsg[]> = ref([]);

const area: Ref<string> = ref('');

const ipAndAsn: Ref<string[]> = ref([]);

const versionPath: Ref<string[]> = ref([]);

const GetUrlParam = (paraName: string) => {
  const url = document.location.toString();
  const arrObj = url.split('?');
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    let arr;
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');
      if (arr !== null && arr[0] === paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
};

const compare = (temp: any[]) => {
  temp.sort(function (a, b) {
    return a.Distance > b.Distance ? 1 : -1;
  });
  return temp;
};

const initTable = (responeData: any) => {
  area.value = responeData.ClientInfo.Country;
  ipAndAsn.value.push(responeData.IP);
  if (responeData.ClientInfo.ASName) {
    const asn =
      responeData.ClientInfo.ASName +
      ' (ASN' +
      responeData.ClientInfo.ASNum +
      ')';
    ipAndAsn.value.push(asn);
  } else if (responeData.ClientInfo.ASNum) {
    const asn = 'ASN' + responeData.ClientInfo.ASNum;
    ipAndAsn.value.push(asn);
  } else {
    return;
  }
  let data = [];
  data = compare(responeData.MirrorList);
  versionPath.value = responeData.FileInfo.Path.slice(1);
  data.forEach((item) => {
    const itemObj = {
      icon: '',
      name: '',
      url: '',
      country: '',
      continent: '',
      distance: '',
      lng: '',
      lat: '',
    };
    itemObj.icon = item.SponsorLogoURL;
    itemObj.name = item.Name;
    itemObj.url = item.HttpURL + versionPath.value;
    itemObj.country = item.Country ? item.Country : '-';
    itemObj.continent = item.ContinentCode;
    itemObj.distance = item.Distance;
    itemObj.lng = item.Longitude;
    itemObj.lat = item.Latitude;
    tableData.value.push(itemObj);
  });
};

const initMap = (data: any[]) => {
  const result: MapMsg[] = [];
  data.forEach((item) => {
    const itemObj: MapMsg = {
      name: '',
      latitude: 0,
      longitude: 0,
      location: '',
      http: '',
    };

    itemObj.name = item.Name;
    itemObj.longitude = item.Longitude;
    itemObj.latitude = item.Latitude;
    itemObj.location = item.Country;
    itemObj.http = item.HttpURL;

    result.push(itemObj);
  });

  return result;
};

onMounted(async () => {
  try {
    const responeData = await selectMirror(GetUrlParam('version'));
    initTable(responeData);
    mapData.value = initMap(responeData?.MirrorList);
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>

<template>
  <BannerLevel3
    :background-image="banner"
    background-text="DOWNLOAD"
    :title="i18n.download.MIRROR_SELECT.TITLE"
  />
  <AppContent class="mirror-select">
    <p>
      {{ i18n.download.MIRROR_SELECT.CONTENT[0]
      }}<span class="ip">{{ ipAndAsn.length ? ipAndAsn[0] : '' }}</span
      >{{ i18n.download.MIRROR_SELECT.CONTENT[1] }}
      <span class="asn">{{ ipAndAsn.length ? ipAndAsn[1] : '' }}</span
      >{{ i18n.download.MIRROR_SELECT.CONTENT[2]
      }}<span class="area">{{ area }}</span
      >{{ i18n.download.MIRROR_SELECT.CONTENT[3] }}
    </p>
    <OTable
      class="mirror-pc"
      :data="tableData"
      header-cell-class-name="mirror-select-header"
      cell-class-name="mirror-select-row"
    >
      <el-table-column
        type="index"
        :label="i18n.download.MIRROR_SELECT.RANK"
        width="110"
      />
      <el-table-column
        :label="i18n.download.MIRROR_SELECT.NAME"
        min-width="300"
      >
        <template #default="scope">
          <div class="mirror-select-name">
            <img :src="scope.row.icon" class="mirror-select-img" /><span>{{
              scope.row.name
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.download.MIRROR_SELECT.URL" min-width="400">
        <template #default="scope">
          <a :href="scope.row.url" target="_blank" class="mirror-select-link">{{
            scope.row.url
          }}</a>
        </template>
      </el-table-column>
      <el-table-column
        :label="i18n.download.MIRROR_SELECT.COUNTRY"
        prop="country"
        min-width="80"
      />
      <el-table-column
        :label="i18n.download.MIRROR_SELECT.CONTINENT"
        prop="continent"
        min-width="100"
      />
      <el-table-column
        :label="i18n.download.MIRROR_SELECT.DISTANCE"
        prop="distance"
        min-width="160"
      />
    </OTable>
    <div class="mirror-mobile">
      <OCard
        v-for="(item, index) in tableData"
        :key="item.name"
        class="mirror-card"
      >
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.RANK }}
          </div>
          <div class="mirror-card-word">{{ index + 1 }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.NAME }}
          </div>
          <img :src="item.icon" alt="" />
          <div class="mirror-card-word">{{ item.name }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.URL }}
          </div>
          <div class="mirror-card-word">
            <a :href="item.url" target="_blank">{{ item.url }}</a>
          </div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.COUNTRY }}
          </div>
          <div class="mirror-card-word">{{ item.country }}</div>
        </div>

        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.CONTINENT }}
          </div>
          <div class="mirror-card-word">{{ item.continent }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.DISTANCE }}
          </div>
          <div class="mirror-card-word">{{ item.distance }}</div>
        </div>
      </OCard>
    </div>
    <div class="mirror-map">
      <MapContainer :map-data="mapData"></MapContainer>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.mirror {
  &-map {
    margin-top: var(--o-spacing-h2);
    width: 100%;
    height: 996px;
    box-shadow: var(--o-shadow-l1);
    @media (max-width: 768px) {
      height: 50vh;
    }
  }
  &-pc {
    display: block;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &-mobile {
    > :nth-child(odd) {
      background-color: var(--o-color-bg4);
    }

    display: none;
    @media (max-width: 768px) {
      display: block;
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
      img {
        margin-top: var(--o-spacing-h8);
        width: var(--o-line-height-tip);
        margin-right: var(--o-spacing-h10);
      }
    }

    &-title {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      color: var(--o-color-text4);
      margin-right: var(--o-spacing-h10);
      margin-top: var(--o-spacing-h8);
    }

    &-word {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      color: var(--o-color-neutral8);
      margin-top: var(--o-spacing-h8);
      a {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        margin-top: var(--o-spacing-h8);
        color: var(--o-color-brand1);
      }
    }
  }
}
.mirror-select {
  :deep(.el-table__row) {
    &:last-child {
      .mirror-list-row {
        &::after {
          content: '';
          height: 0px;
        }

        &:first-child {
          &::after {
            content: '';
            height: 0px;
          }
        }
        &:last-child {
          &::after {
            content: '';
            height: 0px;
          }
        }
      }
    }
  }

  :deep(.mirror-select-header) {
    background-color: var(--o-color-bg4);
    font-size: var(--o-font-size-h8);
    font-weight: 400;
    color: var(--o-color-text1);
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

  :deep(.el-table__cell) {
    padding: 0 0;
  }

  :deep(.mirror-select-row) {
    font-size: var(--o-font-size-h8);
    font-weight: 400;
    color: var(--o-color-text1);
    height: 54px;
    border: none;

    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: relative;
      background-color: var(--o-color-division1);
      margin: 0 auto;
      display: flex;
    }

    .cell {
      height: 54px;
      padding-left: 0px;
      padding-right: var(--o-spacing-h6);
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
    }

    &:first-child {
      &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: relative;
        background-color: var(--o-color-division1);
        margin: 0 auto;
        display: flex;
        left: var(--o-spacing-h2);
      }

      .cell {
        padding-left: var(--o-spacing-h2);
      }
    }
    &:last-child {
      &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: relative;
        background-color: var(--o-color-division1);
        margin: 0 auto;
        display: flex;
        right: var(--o-spacing-h2);
      }
      .cell {
        padding-right: var(--o-spacing-h2);
      }
    }
  }
  @media (max-width: 1100px) {
    padding: 0 var(--o-spacing-h5);
  }
  p {
    font-size: var(--o-font-size-h7);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h7);
    margin-bottom: var(--o-spacing-h2);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-bottom: var(--o-spacing-h5);
    }
  }
  a {
    text-decoration: none;
    color: var(--o-color-brand1);
  }

  .mirror-select-name {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    img {
      margin-right: var(--o-spacing-h10);
      width: var(--o-line-height-text);
      height: var(--o-line-height-text);
    }
  }
  .mirror-select-rsnc {
    cursor: pointer;
    color: var(--o-color-brand1);
    display: block;
    width: 24px;
    height: 24px;
  }
  .mirror-select-ftp {
    cursor: pointer;
    color: var(--o-color-brand1);
    display: block;
    width: 24px;
    height: 24px;
  }

  .mirror-select-link {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
