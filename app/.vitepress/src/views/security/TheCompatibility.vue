<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import MobileFilter from '@/components/MobileFilter.vue';
import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';
import cve from '@/assets/illustrations/cve.png';

import useWindowResize from '@/components/hooks/useWindowResize';
import { useI18n } from '@/i18n';
import { useData, useRouter } from 'vitepress';

import type {
  CveQuery,
  FilterList,
  // CompatibilityList,
  // BoardCardList,
  // BusinessSoftWareList,
} from '@/shared/@types/type-support';

import {
  getCompatibilityList,
  getDriverList,
  driverArchitectureOptions,
  driverOSOptions,
  getSoftwareList,
  getBusinessSoftwareList,
  getTestOrganizations,
  getCpu,
} from '@/api/api-security';

const windowWidth = ref(useWindowResize());

const screenWidth = ref(1080);
const i18n = useI18n();
const router = useRouter();
const { lang } = useData();

const searchContent = ref('');
const activeIndex = ref(0);
const activeIndex1 = ref(0);
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const architectureSelect = ref<string[]>(['全部']);
const osOptions = ref<string[]>(['全部']);
const activeName = ref('1');
const testOrganizationsLists = ref<string[]>(['全部']);
const lastActiveName = ref('1');
const currentPage = ref(1);
const totalPage = ref(1);

const filterData = ref<FilterList[]>([
  {
    select: [],
    title: '操作系统',
  },
  {
    select: [],
    title: '架构',
  },
  {
    select: [],
    title: 'CPU',
  },
]);
const filterDataTwo = ref<FilterList[]>([
  {
    select: [],
    title: '操作系统',
  },
  {
    select: [],
    title: '架构',
  },
]);

const queryData: CveQuery = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  architecture: '',
  keyword: '',
  cpu: '',
  os: '',
  testOrganization: '',
  lang: `${lang.value}`,
});

// const tableData = ref<
//   CompatibilityList[] | BoardCardList[] | BusinessSoftWareList[]
// >([]);
// TODO:约束多个数据
const tableData = ref<any>([]);

// 整机
const getCompatibilityData = (data: CveQuery) => {
  try {
    getCompatibilityList(data).then((res: any) => {
      total.value = res.result.totalCount;
      totalPage.value = Math.ceil(total.value / queryData.pages.size);
      tableData.value = res.result.hardwareCompList;
    });
  } catch (e: any) {
    throw new Error(e);
  }
};

// 板卡
const getDriverData = (data: CveQuery) => {
  try {
    getDriverList(data).then((res: any) => {
      total.value = res.result.totalCount;
      totalPage.value = Math.ceil(total.value / queryData.pages.size);
      tableData.value = res.result.driverCompList;
    });
  } catch (e: any) {
    throw new Error(e);
  }
};

// 开源软件
const getSoftwareData = (data: CveQuery) => {
  try {
    getSoftwareList(data).then((res: any) => {
      total.value = res.total;
      totalPage.value = Math.ceil(total.value / queryData.pages.size);
      tableData.value = res.info;
    });
  } catch (e: any) {
    throw new Error(e);
  }
};

// 商业软件
const getBusinessSoftwareData = (data: CveQuery) => {
  try {
    getBusinessSoftwareList(data).then((res: any) => {
      tableData.value = res.result;
    });
  } catch (e: any) {
    throw new Error(e);
  }
};

function turnPage(option: string) {
  if (option === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
    queryData.pages.page = currentPage.value;
    initMobileData(queryData);
  } else if (option === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
    queryData.pages.page = currentPage.value;
    initMobileData(queryData);
  }
}

const jumpPage = (page: number) => {
  currentPage.value = page;
  queryData.pages.page = currentPage.value;
  initMobileData(queryData);
};

const handleChange = () => {
  currentPage.value = 1;
  if (activeName.value) {
    lastActiveName.value = activeName.value;
  } else {
    activeName.value = lastActiveName.value;
  }
  initMobileData(queryData);
};

const initQueryData = () => {
  queryData.pages.page = 1;
  queryData.pages.size = 10;
  queryData.architecture = '';
  queryData.keyword = '';
  queryData.cpu = '';
  queryData.os = '';
  searchContent.value = '';
  activeIndex1.value = 0;
  activeIndex.value = 0;
};

const handleClick = () => {
  initQueryData();
  nextTick(() => {
    initData(queryData);
  });
};

const initMobileData = (params: CveQuery) => {
  if (activeName.value === '1') {
    getCompatibilityData(params);
  } else if (activeName.value === '2') {
    getDriverData(params);
  } else if (activeName.value === '3') {
    getSoftwareData(params);
  } else {
    getBusinessSoftwareData(params);
  }
};

const initData = (params: CveQuery) => {
  if (activeName.value === '1') {
    getCompatibilityData(params);
  } else if (activeName.value === '2') {
    getDriverData(params);
  } else if (activeName.value === '3') {
    getSoftwareData(params);
  } else {
    getBusinessSoftwareData(params);
  }
};

const tagClick = (i: number, item: string) => {
  activeIndex.value = i;
  queryData.os = item === '全部' ? '' : item;
  initData(queryData);
};

const optionTagClick = (i: number, item: string) => {
  activeIndex1.value = i;
  if (activeName.value === 'fourth') {
    queryData.testOrganization = item === '全部' ? '' : item;
  } else {
    queryData.architecture = item === '全部' ? '' : item;
  }
  initData(queryData);
};

const handleSizeChange = (val: number) => {
  queryData.pages.size = val;
  initData(queryData);
};

const handleCurrentChange = (val: number) => {
  queryData.pages.page = val;
  initData(queryData);
};

function searchValchange() {
  queryData.keyword = searchContent.value;
  initData(queryData);
}

const listfilter = (val: any) => {
  if (activeName.value === '1') {
    val.forEach((item: any) => {
      if (item.title === '操作系统') {
        queryData.os = item.sele[0];
      } else if (item.title === '架构') {
        queryData.architecture = item.sele[0];
      } else if (item.title === 'CPU') {
        queryData.cpu = item.sele[0];
      } else {
        return;
      }
    });
    initData(queryData);
  } else if (activeName.value === '2') {
    val.forEach((item: any) => {
      if (item.title === '操作系统') {
        queryData.os = item.sele[0];
      } else if (item.title === '架构') {
        queryData.architecture = item.sele[0];
      } else {
        return;
      }
    });
    initData(queryData);
  } else if (activeName.value === '3') {
    val.forEach((item: any) => {
      if (item.title === '操作系统') {
        queryData.os = item.sele[0];
      } else if (item.title === '架构') {
        queryData.architecture = item.sele[0];
      } else {
        return;
      }
    });
    initData(queryData);
  }
};

const goBackPage = () => {
  if (activeName.value === '1' || activeName.value === '2') {
    router.go(`/${lang.value}/security/compatibility/hardware/`);
  } else if (activeName.value === '3') {
    router.go(`/${lang.value}/security/compatibility/software/`);
  } else {
    window.open(
      'https://gitee.com/openeuler/technical-certification',
      '_blank'
    );
  }
};

watch(windowWidth, () => {
  screenWidth.value = windowWidth.value;
});

onMounted(() => {
  getCompatibilityData(queryData);
  try {
    driverArchitectureOptions({ lang: 'zh' }).then((res: any) => {
      res.result.forEach((item: string) => {
        architectureSelect.value.push(item);
        filterData.value.forEach((it) => {
          if (it.title === '架构') {
            it.select.push(item);
          }
        });
        filterDataTwo.value.forEach((it) => {
          if (it.title === '架构') {
            it.select.push(item);
          }
        });
      });
    });
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    driverOSOptions({ lang: 'zh' }).then((res: any) => {
      res.result.forEach((item: string) => {
        osOptions.value.push(item);
        filterData.value.forEach((it) => {
          if (it.title === '操作系统') {
            it.select.push(item);
          }
        });
        filterDataTwo.value.forEach((it) => {
          if (it.title === '操作系统') {
            it.select.push(item);
          }
        });
      });
    });
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    getTestOrganizations().then((res: any) => {
      res.result.testOrganizations.forEach((item: string) => {
        testOrganizationsLists.value.push(item);
      });
    });
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    getCpu({ lang: 'zh' }).then((res: any) => {
      res.result.forEach((item: string) => {
        filterData.value.forEach((it) => {
          if (it.title === 'CPU') {
            it.select.push(item);
          }
        });
      });
    });
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="CONTENT"
    title="兼容性列表"
    subtitle=""
    :illustration="screenWidth > 1080 ? search : cve"
  />

  <OTabs v-model="activeName" class="tabs-pc" @tab-click="handleClick">
    <OTabPane label="整机" name="1">
      <div class="wrapper">
        <OSearch
          v-model="searchContent"
          class="o-search"
          :placeholder="i18n.compatibility.HARDWARE_SEARCH_PLACEHOLDER"
          @change="searchValchange"
        ></OSearch>
        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.ADAPTIVE" :show="false">
                <OTag
                  v-for="(item, index) in osOptions"
                  :key="'tag' + index"
                  checkable
                  :type="activeIndex === index ? 'primary' : 'text'"
                  @click="tagClick(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter :show="false" :label="i18n.compatibility.ARCHITECTURE">
              <OTag
                v-for="(item, index) in architectureSelect"
                :key="'tag' + index"
                checkable
                :type="activeIndex1 === index ? 'primary' : 'text'"
                @click="optionTagClick(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>

        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE"
            prop="architecture"
            width="160"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.VENDOR"
            prop="hardwareFactory"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.MODEL"
            prop="hardwareModel"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.HARDWARE_DETAIL.LABELS.CPU"
            prop="cpu"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS"
            prop="osVersion"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.DATE"
            prop="certificationTime"
          ></OTableColumn>
          <el-table-column
            :label="
              i18n.compatibility.HARDWARE_TABLE_COLUMN
                .COMPATIBILITY_CONFIGURATION
            "
          >
            <template #default>
              <span>{{
                i18n.compatibility.HARDWARE_TABLE_COLUMN
                  .COMPATIBILITY_CONFIGURATION2
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.REFERRENCE"
          >
            <template #default="scope">
              <a
                class="friendly-link"
                :href="scope.row.friendlyLink"
                target="_blank"
                >link</a
              >
            </template>
          </el-table-column>
        </OTable>
      </div>
    </OTabPane>

    <OTabPane label="板卡" name="2">
      <div class="wrapper">
        <OSearch
          v-model="searchContent"
          class="o-search"
          :placeholder="i18n.compatibility.DRIVE_SEARCH_PLACEHOLDER"
          @change="searchValchange"
        ></OSearch>
        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.ADAPTIVE" :show="false">
                <OTag
                  v-for="(item, index) in osOptions"
                  :key="'tag' + index"
                  :type="activeIndex === index ? 'primary' : 'text'"
                  @click="tagClick(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter :show="false" :label="i18n.compatibility.ARCHITECTURE">
              <OTag
                v-for="(item, index) in architectureSelect"
                :key="'tag' + index"
                :type="activeIndex1 === index ? 'primary' : 'text'"
                @click="optionTagClick(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>
        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE"
            prop="architecture"
            width="130"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME"
            prop="driverName"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS"
            prop="os"
            width="200"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION"
            prop="version"
            width="160"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE"
            prop="type"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVER_DATE"
            prop="driverDate"
            width="200"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR"
            prop="chipVendor"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL"
            prop="boardModel"
            width="200"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL"
            prop="chipModel"
          ></OTableColumn>
        </OTable>

        <ul class="mobile-list">
          <li v-for="item in tableData" :key="item.id" class="item">
            <ul>
              <li>
                <span
                  >{{
                    i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE
                  }}:</span
                >{{ item.architecture }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME }}:</span
                >
                {{ item.driverName }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS }}:</span
                >
                {{ item.os }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION }}:</span
                >
                {{ item.version }}
              </li>
              <li>
                <span>{{ i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE }}:</span>
                {{ item.type }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVER_DATE
                  }}:</span
                >
                {{ item.driverDate }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR
                  }}:</span
                >
                {{ item.chipVendor }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL
                  }}:</span
                >
                {{ item.boardModel }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL }}:</span
                >
                {{ item.chipModel }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </OTabPane>

    <OTabPane label="开源软件" name="3">
      <div class="wrapper">
        <OSearch
          v-model="searchContent"
          class="o-search"
          :placeholder="i18n.compatibility.SOFTWARE_SEARCH_PLACEHOLDER"
          @change="searchValchange"
        ></OSearch>
        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.ADAPTIVE" :show="false">
                <OTag
                  v-for="(item, index) in osOptions"
                  :key="'tag' + index"
                  :type="activeIndex === index ? 'primary' : 'text'"
                  @click="tagClick(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter :show="false" :label="i18n.compatibility.ARCHITECTURE">
              <OTag
                v-for="(item, index) in architectureSelect"
                :key="'tag' + index"
                :type="activeIndex1 === index ? 'primary' : 'text'"
                @click="optionTagClick(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>
        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.ARCHITECTURE"
            prop="arch"
            width="130"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARETYPE"
            prop="group"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARENAME"
            prop="softwareName"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.VERSION"
            prop="version"
            width="140"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.PROPERTIES"
            prop="property"
            width="160"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SYSTEM"
            prop="os"
          ></OTableColumn>
          <el-table-column
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.DOWNLOADLINK"
            width="130"
          >
            <template #default="scope">
              <a
                class="friendly-link"
                :href="scope.row.downloadLink"
                target="_blank"
                >link</a
              >
            </template>
          </el-table-column>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.PUBLICKLICENSE"
            prop="license"
          ></OTableColumn>
        </OTable>
      </div>
    </OTabPane>

    <OTabPane label="商业软件" name="4">
      <div class="wrapper">
        <OSearch
          v-model="searchContent"
          class="o-search"
          @change="searchValchange"
        ></OSearch>
        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.ADAPTIVE" :show="false">
                <OTag
                  v-for="(item, index) in osOptions"
                  :key="'tag' + index"
                  :type="activeIndex === index ? 'primary' : 'text'"
                  @click="tagClick(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter
              :show="false"
              :label="i18n.compatibility.BUSINESS_TESTING_ORGANIZATION"
            >
              <OTag
                v-for="(item, index) in testOrganizationsLists"
                :key="'tag' + index"
                :type="activeIndex1 === index ? 'primary' : 'text'"
                @click="optionTagClick(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>
        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="
              i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SOFTWARENAME
            "
            prop="productName"
            width="220"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VERSION"
            prop="productVersion"
            width="120"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VENDOR"
            prop="companyName"
          ></OTableColumn>
          <el-table-column
            :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SYSTEM"
          >
            <template #default="scope">
              <p>{{ scope.row.osName }} {{ scope.row.osVersion }}</p>
            </template>
          </el-table-column>
          <el-table-column
            :label="
              i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SERVER_NAME
            "
          >
            <template #default="scope">
              <div
                v-for="item in scope.row.platformTypeAndServerModel"
                :key="item"
              >
                <p>{{ item.serverTypes[0] }}</p>
                <p>{{ item.serverTypes[1] }}</p>
              </div>
            </template>
          </el-table-column>
          <OTableColumn
            :label="
              i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN
                .TESTING_ORGANIZATION
            "
            prop="testOrganization"
          ></OTableColumn>
        </OTable>
      </div>
    </OTabPane>
    <div class="bottom-wrapper">
      <OPagination
        v-model:page-size="queryData.pages.size"
        v-model:currentPage="queryData.pages.page"
        class="pagination"
        :page-sizes="[10, 20, 40, 80]"
        :layout="layout"
        :total="total"
        :background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </OPagination>
      <p class="about">
        {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}

        <a href="#" @click="goBackPage">{{
          i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE
        }}</a>
      </p>
    </div>
  </OTabs>

  <div class="tabs-mobile">
    <el-collapse v-model="activeName" accordion @change="handleChange">
      <el-collapse-item title="整机" name="1">
        <div class="blog-tag">
          <MobileFilter
            class="filter"
            :data="filterData"
            :single="true"
            @filter="listfilter"
          />
        </div>
        <ul class="mobile-list">
          <li v-for="item in tableData" :key="item.id" class="item">
            <ul>
              <li>
                <span
                  >{{
                    i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE
                  }}:</span
                >{{ item.architecture }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.HARDWARE_TABLE_COLUMN.VENDOR }}:</span
                >{{ item.hardwareFactory }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.HARDWARE_TABLE_COLUMN.MODEL }}:</span
                >{{ item.hardwareModel }}
              </li>
              <li>
                <span>{{ i18n.compatibility.HARDWARE_DETAIL.LABELS.CPU }}:</span
                >{{ item.cpu }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS }}:</span
                >{{ item.osVersion }}
              </li>
              <li>
                <span>{{ i18n.compatibility.HARDWARE_TABLE_COLUMN.DATE }}:</span
                >{{ item.certificationTime }}
              </li>
            </ul>
          </li>
        </ul>
        <AppPaginationMo
          :current-page="currentPage"
          :total-page="totalPage"
          @turn-page="turnPage"
          @jump-page="jumpPage"
        />
        <p class="mobile-about">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}
          <a href="#">{{ i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE }}</a>
        </p>
      </el-collapse-item>

      <el-collapse-item title="板卡" name="2">
        <div class="blog-tag">
          <MobileFilter
            class="filter"
            :data="filterDataTwo"
            :single="true"
            @filter="listfilter"
          />
        </div>
        <ul class="mobile-list">
          <li v-for="item in tableData" :key="item.id" class="item">
            <ul>
              <li>
                <span
                  >{{
                    i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE
                  }}:</span
                >{{ item.architecture }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME }}:</span
                >
                {{ item.driverName }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS }}:</span
                >
                {{ item.os }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION }}:</span
                >
                {{ item.version }}
              </li>
              <li>
                <span>{{ i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE }}:</span>
                {{ item.type }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVER_DATE
                  }}:</span
                >
                {{ item.driverDate }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR
                  }}:</span
                >
                {{ item.chipVendor }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL
                  }}:</span
                >
                {{ item.boardModel }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL }}:</span
                >
                {{ item.chipModel }}
              </li>
            </ul>
          </li>
        </ul>
        <AppPaginationMo
          :current-page="currentPage"
          :total-page="totalPage"
          @turn-page="turnPage"
          @jump-page="jumpPage"
        />
        <p class="mobile-about">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}
          <a href="#">{{ i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE }}</a>
        </p>
      </el-collapse-item>

      <el-collapse-item title="开源软件" name="3">
        <div class="blog-tag">
          <MobileFilter
            class="filter"
            :data="filterDataTwo"
            :single="true"
            @filter="listfilter"
          />
        </div>
        <ul class="mobile-list">
          <li v-for="item in tableData" :key="item.id" class="item">
            <ul>
              <li>
                <span
                  >{{
                    i18n.compatibility.SOFTWARE_TABLE_COLUMN.ARCHITECTURE
                  }}:</span
                >{{ item.arch }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARETYPE
                  }}:</span
                >
                {{ item.group }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARENAME
                  }}:</span
                >
                {{ item.softwareName }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.SOFTWARE_TABLE_COLUMN.VERSION }}:</span
                >
                {{ item.version }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.SOFTWARE_TABLE_COLUMN.PROPERTIES
                  }}:</span
                >
                {{ item.property }}
              </li>
              <li>
                <span
                  >{{ i18n.compatibility.SOFTWARE_TABLE_COLUMN.SYSTEM }}:</span
                >
                {{ item.os }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.SOFTWARE_TABLE_COLUMN.DOWNLOADLINK
                  }}:</span
                >
                <a
                  :href="item.downloadLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  >link</a
                >
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.SOFTWARE_TABLE_COLUMN.PUBLICKLICENSE
                  }}:</span
                >
                {{ item.license }}
              </li>
            </ul>
          </li>
        </ul>
        <AppPaginationMo
          :current-page="currentPage"
          :total-page="totalPage"
          @turn-page="turnPage"
          @jump-page="jumpPage"
        />
        <p class="mobile-about">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}
          <a href="#">{{ i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE }}</a>
        </p>
      </el-collapse-item>

      <el-collapse-item title="商业软件" name="4">
        <!-- <div class="blog-tag">
          <MobileFilter
            class="filter"
            :data="filterData"
            :single="true"
            @filter="listfilter"
          />
        </div> -->
        <ul class="mobile-list">
          <li v-for="item in tableData" :key="item.id" class="item">
            <ul>
              <li>
                <span
                  >{{
                    i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN
                      .SOFTWARENAME
                  }}:</span
                >{{ item.productName }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VERSION
                  }}:</span
                >
                {{ item.productVersion }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VENDOR
                  }}:</span
                >
                {{ item.companyName }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SYSTEM
                  }}:</span
                >
                {{ item.osName }} {{ item.osVersion }}
              </li>
              <li>
                <span
                  >{{
                    i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN
                      .SERVER_NAME
                  }}:</span
                >
                <span v-for="it in item.platformTypeAndServerModel" :key="it">
                  {{ it.serverTypes[0] }} {{ it.serverTypes[1] }}
                </span>
              </li>
            </ul>
          </li>
        </ul>
        <AppPaginationMo
          :current-page="currentPage"
          :total-page="totalPage"
          @turn-page="turnPage"
        />
        <p class="mobile-about">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}
          <a href="#">{{ i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE }}</a>
        </p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin: 0;
}
:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
  background-color: var(--e-color-bg2);
  height: 48px;
}
.tabs-pc {
  @media screen and (max-width: 1080px) {
    display: none;
  }
}
.tabs-mobile {
  padding: var(--o-spacing-h5);
  display: none;
  @media screen and (max-width: 1080px) {
    display: block;
  }
  :deep(.el-collapse) {
    --el-collapse-border-color: none;
    .el-collapse-item__header {
      padding-left: 8px;
      background-color: var(--e-color-bg2);
      color: var(--e-color-text1);
      border-bottom: none;
      box-shadow: var(--e-shadow1);
      height: 34px;
    }
    .el-collapse-item__content {
      background-color: var(--e-color-bg1);
    }
  }
  .filter {
    background-color: var(--e-color-bg1);
  }
}
.bottom-wrapper {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0 var(--o-spacing-h2);
}
.wrapper {
  max-width: 1504px;
  padding: var(--o-spacing-h1) var(--o-spacing-h2) 0px;
  margin: 0 auto;
  .o-search {
    height: 48px;
  }
  @media screen and (max-width: 1080px) {
    padding: var(--o-spacing-h5);
  }
}
.blog-tag {
  display: none;
  @media screen and (max-width: 1080px) {
    display: block;
  }
}
.filter-card {
  margin: var(--o-spacing-h4) 0;
  @media screen and (max-width: 1080px) {
    display: none;
  }
  :deep(.el-card__body) {
    padding: var(--o-spacing-h8) var(--o-spacing-h2);
  }
  .category {
    display: inline-block;
    width: 56px;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--o-line-height-text);
    margin-right: var(--o-spacing-h4);
  }
  .category-item {
    display: inline-block;
    height: 28px;
    border: none;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--e-color-text4);
    line-height: var(--o-line-height-text);
    cursor: pointer;
  }
  .active {
    display: inline-block;
    border: 1px solid #002fa7;
    color: #002fa7;
    padding: 0px 12px;
  }
  .card-header {
    padding-bottom: var(--o-spacing-h8);
    border-bottom: 1px solid #ccc;
  }
  .card-body {
    padding-top: var(--o-spacing-h8);
  }
}
.pc-list {
  @media screen and (max-width: 1080px) {
    display: none;
  }
  .friendly-link {
    color: var(--e-color-kleinblue5);
  }
}
.mobile-list {
  display: none;
  margin-bottom: var(--o-spacing-h5);
  box-shadow: var(--e-shadow1);
  @media screen and (max-width: 1080px) {
    display: block;
  }

  .item {
    padding: var(--o-spacing-h5);
    font-size: var(--o-font-size-tip);
    font-weight: 400;
    color: #999999;
    line-height: var(--o-line-height-tip);
    background-color: var(--e-color-bg2);
    &:nth-child(odd) {
      background: var(--e-color-bg4);
    }
    & li {
      margin-bottom: 8px;
    }
    li:last-child {
      margin-bottom: 0;
    }
    li:nth-child(2) {
      display: flex;
      span {
        min-width: 30px;
      }
    }
    span {
      color: var(--e-color-text1);
      margin-right: var(--o-spacing-h8);
    }
  }
}

.pagination {
  margin: var(--o-spacing-h2) 0 var(--o-spacing-h4);
}
.about {
  // margin-bottom: var(--o-spacing-h4);
  font-size: var(--o-font-size-h8);
  font-weight: 400;
  color: var(--e-color-text1);
  line-height: var(--o-line-height-h8);
  a {
    color: var(--e-color-kleinblue5);
  }
}
.mobile-about {
  padding: var(--o-spacing-h5) var(--o-spacing-h5) 0;
  font-size: var(--o-font-size-tip);
  font-weight: 400;
  color: var(--e-color-text4);
  line-height: var(--o-line-height-tip);
  a {
    color: var(--e-color-kleinblue5);
  }
}
</style>
