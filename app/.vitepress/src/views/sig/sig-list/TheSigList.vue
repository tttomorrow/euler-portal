<script setup lang="ts">
import { computed, onMounted, ref, reactive } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import { getCompleteList } from '@/api/api-sig';
import useWindowResize from '@/components/hooks/useWindowResize';

interface LIST_PARAMS {
  page: number;
  pageSize: number;
}
defineProps({
  sigList: {
    type: Array,
    default: () => [],
  },
});
const configData = useData();
const i18n = useI18n();
const router = useRouter();
const language = configData.lang;
const screenWidth = useWindowResize();
const SigList = ref('');

const initialParams = reactive({
  page: 1,
  pageSize: 10,
});

const paginationData = ref({
  total: 0,
  pageSize: 10,
  currentPage: 0,
});
const isMobile = computed(() => {
  return screenWidth.value <= 768 ? true : false;
});
const getSigList = (params: LIST_PARAMS) => {
  try {
    getCompleteList(params).then((res: any) => {
      SigList.value = res;
    });
  } catch (error) {
    throw Error;
  }
};
const currentChange = (val: number) => {
  const params = {
    page: val,
    pageSize: paginationData.value.pageSize,
  };
  getSigList(params);
};
const sizeChange = (val: number) => {
  const params = {
    page: paginationData.value.currentPage,
    pageSize: val,
  };
  getSigList(params);
};
const toSigDetail = (value: any) => {
  router.go(`/${language.value}/sig/sig-detail/?id=${value.id}`);
};
onMounted(() => {
  getSigList(initialParams);
});
</script>

<template>
  <div class="sig-table">
    <div class="sig-select">
      <div class="sig-select-item">
        <span>SIG</span>
        <OSelect :listener-scorll="true">
          <OSearch placeholder="请输入SIG名称"></OSearch>
          <OOption v-for="item in 10" :key="item" :value="item" :lable="item" />
        </OSelect>
      </div>
      <div class="sig-select-item">
        <span>仓库名称</span>
        <OSelect :listener-scorll="true">
          <OSearch placeholder="请输入仓库名称"></OSearch>
          <OOption v-for="item in 10" :key="item" :value="item" :lable="item" />
        </OSelect>
      </div>
      <div class="sig-select-item">
        <span>Maintainer</span>
        <OSelect :listener-scorll="true">
          <OSearch placeholder="请输入Maintainer"></OSearch>
          <OOption v-for="item in 10" :key="item" :value="item" :lable="item" />
        </OSelect>
      </div>
      <span>注：仓库Committer请点击SIG名称，在仓库列表查询</span>
    </div>
    <OTable v-show="!isMobile" :data="sigList">
      <el-table-column :label="i18n.sig.SIG_LIST.NAME">
        <template #default="scope">
          <a
            target="_blank"
            style="cursor: pointer"
            @click="toSigDetail(scope.row)"
          >
            {{ scope.row.group_name }}
          </a>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.sig.SIG_LIST.HOME_PAGE">
        <template #default="scope">
          <a :href="scope.row.home_page" target="_blank">
            <img src="@/assets/homePageLogo.png" />
          </a>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.sig.SIG_LIST.MAIL">
        <template #default="scope">
          <a :href="'mailto:' + scope.row.maillist" target="_blank">
            {{ scope.row.maillist }}
          </a>
        </template>
      </el-table-column>
      <OTableColumn :label="i18n.sig.SIG_LIST.IRC" prop="irc"></OTableColumn>
      <!-- <el-table-column :label="i18n.sig.SIG_LIST.STORE_NAME"></el-table-column>
      <el-table-column :label="i18n.sig.SIG_LIST.MAINTAINER"></el-table-column> -->
    </OTable>
    <div v-show="!isMobile" class="sig-pagination">
      <OPagination
        v-model:currentPage="paginationData.currentPage"
        v-model:page-size="paginationData.pageSize"
        :total="paginationData.total"
        :background="true"
        layout="sizes, prev, pager, next, slot, jumper"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
        <span>{{ 1 }}/{{ Math.ceil(10 / 1) }}</span>
      </OPagination>
    </div>
    <div v-show="isMobile" class="sig-table-mo">
      <div class="sig-table-card">
        <div
          v-for="(item, index) in (sigList as any)"
          :key="item.group_name"
          :class="['mo-item', index % 2 === 0 ? 'mo-item-odd' : '']"
        >
          <div class="mo-item-text">
            <span class="mo-item-title">SIG名称:</span>
          </div>
          <div class="mo-item-text">
            <span class="mo-item-title">主页：</span>
          </div>
          <div class="mo-item-text">
            <span class="mo-item-title">邮件:</span>
          </div>
          <div class="mo-item-text">
            <span class="mo-item-title">仓库名称:</span>
          </div>
          <div class="mo-item-text">
            <span class="mo-item-title">Maintainer:</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sig-table {
  margin-top: var(--o-spacing-h2);
}
.sig-select {
  margin-bottom: var(--o-spacing-h4);
  display: flex;
  align-items: flex-end;
  span {
    font-size: var(--o-font-size-tip);
    color: var(--o-color-text2);
  }
  &-item {
    margin-right: var(--o-spacing-h1);
    span {
      font-size: var(--o-font-size-h7);
      color: var(--o-color-text2);
      margin-right: var(--o-spacing-h5);
      @media (max-width: 780px) {
        width: 100px;
      }
    }
    @media (max-width: 780px) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: var(--o-spacing-h5);
    }
  }
  @media (max-width: 780px) {
    display: block;
  }
}
.sig-pagination {
  margin-top: var(--o-spacing-h2);
}
.sig-table-mo {
  .mo-item {
    padding: var(--o-spacing-h5);
    &-text {
      margin-bottom: var(--o-spacing-h8);
      .mo-item-title {
        color: var(--o-color-text2);
      }
    }
  }
  .mo-item-odd {
    background-color: var(--o-color-bg3);
  }
}
</style>
