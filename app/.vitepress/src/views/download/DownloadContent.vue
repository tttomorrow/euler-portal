<script lang="ts" setup>
import { ref, computed, Ref, toRefs, onMounted, watch } from 'vue';

import { useI18n } from '@/i18n';
import lodash from 'lodash';
import { useData } from 'vitepress';

import useWindowResize from '@/components/hooks/useWindowResize';
import { ElMessage } from 'element-plus';
import { selectMirror } from '@/api/api-mirror';
import { getUrlParam } from '@/shared/utils';
import { useCommon } from '@/stores/common';

import TagFilter from '@/components/TagFilter.vue';

import IconCopy from '~icons/app/icon-copy.svg';
import IconDownload from '~icons/app/icon-download.svg';
import IconTips from '~icons/app/icon-tips.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const commonStore = useCommon();
const props = defineProps({
  version: {
    required: true,
    type: String,
    default: () => {
      return '';
    },
  },
});
const { version } = toRefs(props);
const i18n = useI18n();
const downloadList = lodash.cloneDeep(i18n.value.download.COMMUNITY_LIST);
const { lang } = useData();
const shaText = 'SHA256';
const contentData: any = computed(() => {
  return downloadList.filter((item: any) => item.NAME === version.value);
});

const screenWidth = useWindowResize();
// 复制
const inputDom: Ref<HTMLElement | null> = ref(null);
async function handleUrlCopy(value: string | undefined) {
  if (!value) return;
  if (inputDom.value) {
    (inputDom.value as HTMLInputElement).value = value;
    (inputDom.value as HTMLInputElement).select();
    document.execCommand('copy');
  }
  ElMessage({
    message: i18n.value.download.COPY_SUCCESSFULLY,
    type: 'success',
  });
}
onMounted(() => {
  inputDom.value = document.getElementById('useCopy');
});

// tag筛选
const activeArch = ref('');
const activeScenario = ref('');
const architectureList: any = ref([]);
const scenarioList: any = ref([]);
function setTagList() {
  const temp: any = [];
  architectureList.value = [];
  scenarioList.value = [];
  contentData.value[0].DETAILED_LINK.forEach((item: any) => {
    if (!architectureList.value.includes(item.ARCH)) {
      architectureList.value.push(item.ARCH);
    }
    if (!temp.includes(item.SCENARIO)) {
      temp.push(item.SCENARIO);
    }
  });
  temp.forEach((item: any) => {
    i18n.value.download.SCENARIO_LIST.forEach((itemList: any) => {
      if (item === itemList.KEY && !scenarioList.value.includes(itemList)) {
        scenarioList.value.push(itemList);
      }
    });
  });
  // 查看是否有携带筛选参数
  const scenario = getUrlParam('scenario');
  if (scenario) {
    activeScenario.value = scenario;
    let flag = true;
    contentData.value[0].DETAILED_LINK.forEach((item: any) => {
      if (item.SCENARIO === activeScenario.value && flag) {
        activeArch.value = item.ARCH;
        flag = false;
      }
    });
  } else {
    activeScenario.value = scenarioList.value[0].KEY;
    activeArch.value = architectureList.value[0];
  }
}

const onArchTagClick = (i: number, select: string) => {
  activeArch.value = select;
};
const onScenarioTagClick = (select: string) => {
  activeScenario.value = select;
};
//TODO: 控制不能组合的tag的禁用
let tempTag = '';
function isDisable(tag: string) {
  let flag = false;
  contentData.value[0].DETAILED_LINK.forEach((item: any) => {
    if (item.ARCH === activeArch.value && item.SCENARIO === tag) {
      flag = true;
      tempTag = tag;
    }
  });
  if (!flag) {
    if (activeScenario.value === tag) {
      activeScenario.value = tempTag;
    }
  }
  return !flag;
}
// 获取镜像仓及表格显示数据
const tableData: any = ref([]);
const activeMirror: any = ref([]);
const activeMirrorLink: any = ref([]);
const mirrorList: any = ref([]);
const moreMirrorList: any = ref([]);
function setActiveMirror() {
  tableData.value.forEach(() => {
    const temp = lodash.cloneDeep(mirrorList.value);
    temp[0].NameSpend = temp[0].Name + '(' + temp[0].NetworkBandwidth + 'Mb/s)';
    activeMirror.value.push(temp[0].NameSpend);
    activeMirrorLink.value.push(temp[0].HttpURL);
  });
}
function getTableData() {
  tableData.value = [];
  contentData.value[0].DETAILED_LINK.forEach((item: any) => {
    if (
      item.ARCH === activeArch.value &&
      item.SCENARIO === activeScenario.value
    ) {
      tableData.value = item.LINK_LIST;
    }
  });
  if (
    mirrorList.value[0] &&
    !activeMirror.value[0] &&
    !activeMirrorLink.value[0] &&
    tableData.value[0]
  ) {
    setActiveMirror();
  }
}
async function getMirrorList() {
  try {
    const mirrorData = await selectMirror(contentData.value[0].VERSION);
    for (let i = 0; i < mirrorData.MirrorList.length; i++) {
      for (let j = i; j < mirrorData.MirrorList.length; j++) {
        if (
          mirrorData.MirrorList[i].NetworkBandwidth <
          mirrorData.MirrorList[j].NetworkBandwidth
        ) {
          [mirrorData.MirrorList[i], mirrorData.MirrorList[j]] = [
            mirrorData.MirrorList[j],
            mirrorData.MirrorList[i],
          ];
        }
      }
    }
    mirrorData.MirrorList.forEach((item: any) => {
      item.NameSpend = item.Name + '(' + item.NetworkBandwidth + 'Mb/s)';
    });
    mirrorList.value = lodash.cloneDeep(mirrorData.MirrorList.splice(0, 3));
    moreMirrorList.value = lodash.cloneDeep(mirrorData.MirrorList);
  } catch (e: any) {
    throw new Error(e);
  }
}
onMounted(async () => {
  await getMirrorList();
  setTagList();
  getTableData();
  watch(activeArch, function () {
    getTableData();
  });
  watch(activeScenario, function () {
    getTableData();
  });
  watch(version, function () {
    setTagList();
    getTableData();
  });
  watch(tableData, function () {
    setActiveMirror();
  });
});

function setMirrorLink(index: number) {
  mirrorList.value.forEach((item: any) => {
    if (item.NameSpend === activeMirror.value[index]) {
      activeMirrorLink.value[index] = item.HttpURL;
    }
  });
  return '';
}
// 移动端提示语
const showIndex = ref(-1);
function setShowIndex(index: number) {
  showIndex.value = index;
}
</script>

<template>
  <div class="content-wrap">
    <h2 class="title">{{ (contentData[0] as any).NAME }}</h2>
    <p class="subtitle">{{ (contentData[0] as any).DESC }}</p>
    <p class="subtitle">
      Planned EOL:{{ (contentData[0] as any).PLANNED_EOL }}
    </p>
    <div class="other-link">
      <a
        v-if="(contentData[0] as any).RELEASE_DESC_URL"
        :href="(contentData[0] as any).RELEASE_DESC_URL"
        target="_blank"
        >{{ i18n.download.RELEASE_DESC }}</a
      ><a
        v-if="(contentData[0] as any).INSTALL_GUIDENCE_URL"
        :href="(contentData[0] as any).INSTALL_GUIDENCE_URL"
        target="_blank"
        >{{ i18n.download.INSTALL_GUIDENCE }}</a
      >
      <a
        v-if="(contentData[0] as any).WHITE_PAPER"
        :href="(contentData[0] as any).WHITE_PAPER"
        target="_blank"
        >{{ i18n.download.WHITE_PAPER }}</a
      >
      <a
        v-if="(contentData[0] as any).LIFE_CYCLE_URL"
        :href="(contentData[0] as any).LIFE_CYCLE_URL"
        target="_blank"
        >{{ i18n.download.LIFE_CYCLE }}</a
      >
    </div>
    <div class="filter-card">
      <TagFilter
        class="architecture-box"
        :label="i18n.download.ARCHITECTURE2"
        :show="false"
      >
        <OTag
          v-for="(item, index) in architectureList"
          :key="'tag' + index"
          checkable
          :type="activeArch === item ? 'primary' : 'text'"
          @click="onArchTagClick(index, item)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
      <TagFilter class="os-box" :label="i18n.download.SCENARIO2" :show="false">
        <OTag
          v-for="(item, index) in scenarioList"
          :key="item.VALUE + index"
          checkable
          :type="activeScenario === item.KEY ? 'primary' : 'text'"
          :class="{ disable: isDisable(item.KEY) }"
          @click="isDisable(item.KEY) ? '' : onScenarioTagClick(item.KEY)"
        >
          {{ item.VALUE }}
        </OTag>
      </TagFilter>
    </div>
    <div class="content-item">
      <!-- pc  -->
      <OTable
        v-if="screenWidth > 1100"
        :data="tableData"
        class="download-pc"
        style="width: 100%"
      >
        <el-table-column
          width="280"
          :label="i18n.download.TABLE_HEAD[0]"
          prop="name"
        >
          <template #default="scope">
            <div class="name-info">
              {{ scope.row.TYPE }}
              <template v-if="scope.row.TIPS">
                <el-tooltip placement="right-start" :effect="commonStore.theme">
                  <template #content>
                    <p class="server-name">
                      {{ scope.row.TIPS }}
                    </p>
                  </template>
                  <IconTips class="server-tips" />
                </el-tooltip>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          :label="i18n.download.TABLE_HEAD[1]"
          prop="size"
        >
          <template #default="scope">
            {{ scope.row.SIZE }}
          </template>
        </el-table-column>
        <el-table-column :label="i18n.download.TABLE_HEAD[2]" prop="down_url">
          <template #default="scope">
            <ClientOnly>
              <el-select
                v-model="activeMirror[scope.$index]"
                placeholder="Select"
                placement="bottom-end"
                class="mirror-select"
                @change="setMirrorLink(scope.$index)"
              >
                <li>
                  <p class="select-text">{{ i18n.download.APPROVE_MIRROR }}</p>
                </li>
                <el-option
                  v-for="item in mirrorList"
                  :key="item.Name"
                  :label="item.Name + '(' + item.NetworkBandwidth + 'Mb/s)'"
                  :value="item.Name + '(' + item.NetworkBandwidth + 'Mb/s)'"
                >
                </el-option>
                <li>
                  <p class="select-text">{{ i18n.download.MORE_MIRROR }}</p>
                </li>

                <el-option
                  v-for="item in moreMirrorList"
                  :key="item.Name"
                  :label="item.Name + '(' + item.NetworkBandwidth + 'Mb/s)'"
                  :value="item.Name + '(' + item.NetworkBandwidth + 'Mb/s)'"
                >
                </el-option>
                <li>
                  <div class="all-mirror">
                    <a :href="'/' + lang + '/mirror/list/'">
                      <OButton size="mini" type="text" animation>
                        {{ i18n.download.ALL_MIRROR }}
                        <template #suffixIcon>
                          <OIcon
                            ><IconArrowRight class="download-button-icon"
                          /></OIcon>
                        </template>
                      </OButton>
                    </a>
                  </div>
                </li>
              </el-select>
            </ClientOnly>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          :label="i18n.download.TABLE_HEAD[3]"
          prop="sha_code"
        >
          <template #default="scope">
            <div v-if="scope.row.SHACODE" class="down-action">
              <OButton
                class="down-copy"
                size="mini"
                type="text"
                @click="handleUrlCopy(scope.row.SHACODE)"
              >
                {{ shaText }}
                <template #suffixIcon>
                  <IconCopy />
                </template>
              </OButton>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          :label="i18n.download.TABLE_HEAD[4]"
          prop="docsName"
        >
          <template #default="scope">
            <a
              class="down-link"
              :href="activeMirrorLink[scope.$index] + scope.row.DOWNLOAD_LINK"
            >
              <OButton size="mini" type="primary">
                {{ i18n.download.DOWNLOAD_BTN_NAME }}
                <template #suffixIcon>
                  <IconDownload />
                </template>
              </OButton>
            </a>
          </template>
        </el-table-column>
      </OTable>
      <!-- mobild -->
      <ul v-else class="download-mobile">
        <li
          v-for="(item, index) in tableData"
          :key="item.TYPE"
          class="download-item"
        >
          <div class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[0] + ':' }}</span
            ><span class="tips-box"
              >{{ item.TYPE }}
              <template v-if="item.TIPS">
                <p v-show="showIndex === index" class="server-name">
                  {{ item.TIPS }}
                </p>
                <IconTips class="server-tips" @click="setShowIndex(index)" />
                <div
                  v-show="showIndex !== -1"
                  class="mask-mobile"
                  @click="setShowIndex(-1)"
                ></div>
              </template>
            </span>
          </div>
          <div class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[1] + ':' }}</span
            ><span class="text-size">{{ item.SIZE }}</span>
          </div>
          <div class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[2] + ':' }}</span>
            <ClientOnly>
              <el-select
                v-model="activeMirror[index]"
                placeholder="Select"
                fit-input-width
                placement="bottom-end"
                @change="setMirrorLink(index)"
              >
                <li>
                  <p class="select-text">{{ i18n.download.APPROVE_MIRROR }}</p>
                </li>
                <el-option
                  v-for="item in mirrorList"
                  :key="item.Name"
                  :label="item.Name + '(' + item.NetworkBandwidth + 'Mb/s)'"
                  :value="item.Name + '(' + item.NetworkBandwidth + 'Mb/s)'"
                >
                </el-option>
                <li>
                  <p class="select-text">{{ i18n.download.MORE_MIRROR }}</p>
                </li>
                <el-option
                  v-for="item in moreMirrorList"
                  :key="item.Name"
                  :label="item.Name + '(' + item.NetworkBandwidth + 'Mb/s)'"
                  :value="item.Name + '(' + item.NetworkBandwidth + 'Mb/s)'"
                >
                </el-option>
                <li>
                  <div class="all-mirror">
                    <a :href="'/' + lang + '/mirror/list/'">
                      <OButton size="mini" type="text" animation>
                        {{ i18n.download.ALL_MIRROR }}
                        <template #suffixIcon>
                          <OIcon
                            ><IconArrowRight class="download-button-icon"
                          /></OIcon>
                        </template>
                      </OButton>
                    </a>
                  </div>
                </li>
              </el-select>
            </ClientOnly>
          </div>
          <div v-if="item.SHACODE" class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[3] + ':' }}</span>
            <div class="copy-box">
              <OButton
                class="down-copy"
                size="mini"
                type="text"
                @click="handleUrlCopy(item.SHACODE)"
              >
                {{ shaText }}
                <template #suffixIcon>
                  <IconCopy />
                </template>
              </OButton>
            </div>
          </div>
          <div class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[4] + ':' }}</span>
            <a
              class="down-link"
              :href="activeMirrorLink[index] + item.DOWNLOAD_LINK"
            >
              {{ i18n.download.CLICK_DOWNLOAD }}
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="input-box">
      <!-- 用于复制RSNC的值 -->
      <input id="useCopy" type="text" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrap {
  margin-top: var(--o-spacing-h4);
  background-color: var(--o-color-bg2);
  padding: var(--o-spacing-h2) var(--o-spacing-h1);
  @media (max-width: 1100px) {
    margin-top: var(--o-spacing-h5);
    padding: var(--o-spacing-h4) var(--o-spacing-h8);
  }
  .title {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .subtitle {
    margin-top: var(--o-spacing-h5);
    text-align: center;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text3);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .other-link {
    margin-top: var(--o-spacing-h5);
    text-align: center;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
    a {
      display: inline-block;
      padding: 0 var(--o-spacing-h5);
      @media (max-width: 1100px) {
        padding: 0 var(--o-spacing-h8);
      }
      & ~ a {
        border-left: 1px solid var(--o-color-border2);
      }
    }
  }
  .filter-card {
    margin: var(--o-spacing-h4) 0;
    background-color: var(--o-color-bg2);
    padding: var(--o-spacing-h5) var(--o-spacing-h2);
    @media screen and (max-width: 768px) {
      padding: 0;
      font-size: var(--o-font-size-tip);
    }
    :deep(.tag-filter) {
      padding: 0;
      @media screen and (max-width: 768px) {
        display: flex;
        gap: 32px;
      }
      .label {
        color: var(--o-color-text1);
        @media screen and (max-width: 768px) {
          width: auto;
          font-size: var(--o-font-size-tip);
        }
      }
      .tag-filter-box {
        flex-grow: 1;
      }
      :deep(.o-tag) {
        padding: 3px 12px;
        font-size: var(--o-font-text-tip);
        line-height: var(--o-line-height-tip);
      }
      &.os-box {
        margin-top: var(--o-spacing-h5);
      }
    }
    .disable {
      color: var(--o-color-text5);
    }
  }
  .content-item {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h4);
    }
    h3 {
      text-align: center;
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      color: var(--o-color-text1);
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .download-pc {
      margin-top: var(--o-spacing-h4);
      .name-info {
        display: flex;
        align-items: center;
        gap: var(--o-spacing-h8);
        color: var(--o-color-text1);
        .server-name {
          background-color: red;
        }
        .server-tips {
          width: var(--o-font-size-h6);
          height: var(--o-font-size-h6);
          color: var(--o-color-text4);
        }
      }
      .down-copy {
        font-size: var(--o-font-size-text);
        padding-left: 0;
        color: var(--o-color-brand1);
        :deep(.suffix-icon) {
          width: 14px;
          @media (max-width: 1100px) {
            width: 12px;
          }
        }
      }
      .down-link {
        display: inline-block;
        :deep(.o-button) {
          color: #fff;
        }
        :deep(.suffix-icon) {
          width: 14px;
          height: 18px;
          color: #fff;
        }
      }
      :deep(.cell) {
        line-height: 46px;
        overflow: visible;
        padding: 0 var(--o-spacing-h2);
        a {
          word-break: normal;
        }
        .o-select:hover {
          background-color: red;
        }
      }
      :deep(.el-input__wrapper) {
        box-shadow: none;
        background-color: transparent;
        input,
        i {
          color: var(--o-color-brand1);
        }
      }
      :deep(.el-select) {
        width: 260px;
        .el-input .el-input__wrapper {
          box-shadow: none !important;
        }
        .is-focus {
          box-shadow: none !important;
        }
      }
      :deep(.el-table__cell) {
        padding: 8px 0;
      }
    }
    .download-mobile {
      margin-top: var(--o-spacing-h5);
      .download-item {
        padding: var(--o-spacing-h5);
        &:nth-of-type(2n + 1) {
          background-color: var(--o-color-bg4);
        }
        .item-text {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-font-height-tip);
          color: var(--o-color-text1);
          display: flex;
          & ~ .item-text {
            margin-top: var(--o-spacing-h8);
          }
          span {
            display: inline-block;
            &:nth-of-type(1) {
              width: 72px;
            }
          }
          .text-size {
            color: var(--o-color-text4);
          }
          .down-copy {
            color: var(--o-color-brand1);
            padding: 0;
            line-height: 0;
          }
          .tips-box {
            display: flex;
            align-items: center;
            position: relative;
            .server-name {
              position: absolute;
              left: 0;
              top: -46px;
              background-color: var(--o-color-bg2);
              padding: var(--o-spacing-h9);
            }
            .server-tips {
              width: var(--o-font-size-tip);
              height: var(--o-font-size-tip);
              color: var(--o-color-text4);
              margin-left: var(--o-spacing-h9);
            }
            .mask-mobile {
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              z-index: 99;
            }
          }
          :deep(.el-select) {
            .el-input__wrapper {
              background-color: transparent;
              border: none;
              outline: none;
              box-shadow: none;
              padding: 0;
              input {
                font-size: var(--o-font-size-tip);
                vertical-align: top;
                line-height: auto;
                height: 14px;
              }
            }
          }
          .copy-box {
            :deep(.o-button) {
              font-size: 12px;
            }
            :deep(.suffix-icon) {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
  }
  .input-box #useCopy {
    position: absolute;
    opacity: 0;
  }
}
</style>
