<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import MobileFilter from '@/components/MobileFilter.vue';
import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';

import { useI18n } from '@/i18n';
import type {
  CveQuery,
  FilterData,
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

const i18n = useI18n();
// const userCaseData = computed(() => i18n.value.interaction);

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

const filterData = ref<FilterData>({
  author: {
    select: [],
    title: '操作系统',
  },
  tags: {
    select: [],
    title: '架构',
  },
  time: {
    select: [],
    title: 'CPU',
  },
});

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
  lang: 'zh',
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
      totalPage.value = res.result.totalCount;
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
      totalPage.value = res.result.totalCount;
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
      totalPage.value = res.total;
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

const currentPage = ref(1);
const totalPage = ref(1);
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

const handleChange = () => {
  currentPage.value = 1;
  if (activeName.value) {
    lastActiveName.value = activeName.value;
  } else {
    activeName.value = lastActiveName.value;
  }
  initMobileData(queryData);
};

const handleClick = () => {
  queryData.pages.page = 1;
  queryData.pages.size = 10;
  queryData.architecture = '';
  queryData.keyword = '';
  queryData.cpu = '';
  queryData.os = '';
  searchContent.value = '';
  activeIndex1.value = 0;
  activeIndex.value = 0;
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

const listfilter = (val: string[]) => {
  return val;
};

onMounted(() => {
  getCompatibilityData(queryData);
  try {
    driverArchitectureOptions({ lang: 'zh' }).then((res: any) => {
      res.result.forEach((item: string) => {
        architectureSelect.value.push(item);
        filterData.value.tags.select.push(item);
      });
    });
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    driverOSOptions({ lang: 'zh' }).then((res: any) => {
      res.result.forEach((item: string) => {
        osOptions.value.push(item);
        filterData.value.author.select.push(item);
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
        filterData.value.time.select.push(item);
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
    :illustration="search"
  />
  <OTabs v-model="activeName" class="tabs-pc" @tab-click="handleClick">
    <!-- 整机 -->
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
              <a :href="scope.row.friendlyLink" target="_blank">link</a>
            </template>
          </el-table-column>
        </OTable>
      </div>
    </OTabPane>
    <!-- 板卡 -->
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
    <!-- 开源软件 -->
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
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SYSTEM"
            prop="os"
          ></OTableColumn>
          <el-table-column
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.DOWNLOADLINK"
            width="100"
          >
            <template #default="scope">
              <a :href="scope.row.downloadLink" target="_blank">link</a>
            </template>
          </el-table-column>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.PUBLICKLICENSE"
            prop="license"
          ></OTableColumn>
        </OTable>
      </div>
    </OTabPane>
    <!-- 商业软件 -->
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
        <a href="#">{{ i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE }}</a>
      </p>
    </div>
  </OTabs>
  <div class="tabs-mobile">
    <el-collapse v-model="activeName" accordion @change="handleChange">
      <el-collapse-item title="整机" name="1">
        <div class="blog-tag">
          <MobileFilter class="filter" :data="filterData" @filter="listfilter" />
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
        />
        <p class="mobile-about">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}
          <a href="#">{{ i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE }}</a>
        </p>
      </el-collapse-item>
      <el-collapse-item title="板卡" name="2">
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
        />
        <p class="mobile-about">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}
          <a href="#">{{ i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE }}</a>
        </p>
      </el-collapse-item>
      <el-collapse-item title="开源软件" name="3">
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
        />
        <p class="mobile-about">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}
          <a href="#">{{ i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE }}</a>
        </p>
      </el-collapse-item>
      <el-collapse-item title="商业软件" name="4">
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
  background-color: var(--o-color-bg);
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
      background-color: var(--o-color-bg);
      color: var(--o-color-text2);
      border-bottom: none;
      box-shadow: 0px 1px 5px 0px rgba(45, 47, 51, 0.1);
    }
    .el-collapse-item__content {
      background-color: var(--o-color-bg);
    }
  }
  .filter {
    background-color: var(--o-color-bg2);
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
  .category {
    display: inline-block;
    width: 56px;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-text);
    margin-right: var(--o-spacing-h4);
  }
  .category-item {
    display: inline-block;
    height: 28px;
    border: none;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text3);
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
    padding-bottom: 14px;
    border-bottom: 1px solid #ccc;
    line-height: 54px;
  }
  .card-body {
    padding-top: 19px;
  }
}
.pc-list {
  @media screen and (max-width: 1080px) {
    display: none;
  }
}
.mobile-list {
  display: none;

  @media screen and (max-width: 1080px) {
    display: block;
  }

  .item {
    padding: var(--o-spacing-h5);
    font-size: var(--o-font-size-tip);
    font-weight: 400;
    color: #999999;
    line-height: var(--o-line-height-tip);
    background-color: var(--o-color-bg);
    &:nth-child(odd) {
      background: var(--o-color-bg6);
    }
    & li {
      margin-bottom: 8px;
    }
    li:last-child {
      margin-bottom: 0;
      a {
        color: #002fa7;
      }
    }
    li:nth-child(2) {
      display: flex;
      span {
        min-width: 30px;
      }
    }
    span {
      color: var(--o-color-text2);
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
  color: var(--o-color-text2);
  line-height: var(--o-line-height-h8);
}
.mobile-about {
  padding: var(--o-spacing-h5) var(--o-spacing-h5) 0;
  font-size: var(--o-font-size-tip);
  font-weight: 400;
  color: var(--o-color-text3);
  line-height: var(--o-line-height-tip);
}
</style>
