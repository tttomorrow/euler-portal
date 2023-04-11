<script lang="ts" setup>
import { ref, computed, Ref, toRefs, onMounted, reactive } from 'vue';

import { useI18n } from '@/i18n';
// import { useData } from 'vitepress';

import useWindowResize from '@/components/hooks/useWindowResize';
import { ElMessage } from 'element-plus';

import TagFilter from '@/components/TagFilter.vue';

import IconCopy from '~icons/app/icon-copy.svg';
import IconTips from '~icons/app/icon-tips.svg';

const props = defineProps({
  contentData: {
    required: true,
    type: Array,
    default: () => {
      return [];
    },
  },
});
const i18n = useI18n();
// const { lang, theme } = useData();
const shaText = 'SHA256';
const { contentData } = toRefs(props);

// 移动端提示
const screenWidth = useWindowResize();
// function setShowIndex(index: number) {
//   showIndex.value = index;
// }
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
    message: i18n.value.download.COPY_SUCCESS,
    type: 'success',
  });
}
onMounted(() => {
  inputDom.value = document.getElementById('useCopy');
});
// tips
const hoverTips = computed(() => (type: string) => {
  let tips = '';
  switch (type) {
    case 'enterprise':
      tips = '提示语1';
      break;
    case 'simple':
      tips = '提示语2';
      break;
    case 'lite':
      tips = '提示语3';
      break;
    case 'distributed':
      tips = '提示语4';
      break;
  }
  return tips;
});
// 架构、场景筛选
const archList = ref<string[]>([i18n.value.download.ALL_DATA]);
const activeArch = ref(0);
const activeScenario = ref(0);
const filterCondition = reactive({
  search: '',
  scenario: '',
  arch: '',
});
const selectArchtag = (i: number, category: string) => {
  activeArch.value = i;
  if (category === i18n.value.download.ALL_DATA) {
    filterCondition.arch = '';
    return;
  }
  filterCondition.arch = category;
};
const selectScenarioTag = (i: number, category: string) => {
  activeScenario.value = i;
  filterCondition.scenario = category;
};
</script>

<template>
  <div class="content-wrap">
    <h2 class="title">{{ (contentData[0] as any).NAME }}</h2>
    <p class="subtitle">{{ (contentData[0] as any).DESC }}</p>
    <p class="subtitle">
      Planned EOL:{{ (contentData[0] as any).PLANNED_EOL }}
    </p>
    <div class="other-link">
      <a href="" target="_blank">{{ i18n.download.RELEASE_DESC }}</a
      ><a href="https://gitee.com/opengauss/community/issues" target="_blank">{{
        i18n.download.INSTALL_GUIDENCE
      }}</a>
      <a href="https://gitee.com/opengauss/community/issues" target="_blank">{{
        i18n.download.WHITE_PAPER
      }}</a>
      <a href="https://gitee.com/opengauss/community/issues" target="_blank">{{
        i18n.download.LIFE_CYCLE
      }}</a>
    </div>
    <div class="filter-card">
      <TagFilter :label="i18n.download.ARCHITECTURE" :show="false">
        <OTag
          v-for="(item, index) in archList"
          :key="item"
          checkable
          :type="activeArch === index ? 'primary' : 'text'"
          @click="selectArchtag(index, item)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
      <TagFilter :label="i18n.download.SCENARIO" :show="false">
        <OTag
          v-for="(item, index) in i18n.download.SCENARIO_LIST"
          :key="item"
          checkable
          :type="activeScenario === index ? 'primary' : 'text'"
          @click="selectScenarioTag(index, item.KEY)"
        >
          {{ item.VALUE }}
        </OTag>
      </TagFilter>
    </div>
    <div class="content-item">
      <!-- pc  -->
      <OTable
        v-if="screenWidth > 1100"
        :data="(contentData[0] as any).DOWNLOAD_LIST"
        class="download-pc"
        style="width: 100%"
      >
        <el-table-column width="320" label="软件包类型" prop="name">
          <template #default="scope">
            <div class="name-info">
              {{ scope.row.TYPE }}
              <template v-if="scope.row.table === 'server'">
                <el-tooltip placement="right-start">
                  <template #content>
                    <p class="server-name">
                      {{ hoverTips(scope.row.edition) }}
                    </p>
                  </template>
                  <IconTips class="server-tips" />
                </el-tooltip>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="软件包大小" prop="size">
          <template #default="scope">
            {{ scope.row.SIZE }}
          </template>
        </el-table-column>
        <el-table-column label="镜像仓推荐" prop="down_url">
          <template #default="scope">
            <div v-if="scope.row.SELECTION_LIST[0] !== ''" class="down-action">
              <!-- <a :href="scope.row.SELECTION">
                <OButton size="mini" type="primary" animation>
                  {{ scope.row.SELECTION }}
                  <template #suffixIcon>
                    <IconDownload />
                  </template>
                </OButton>
              </a> -->
              <ClientOnly>
                <OSelect
                  v-model="scope.row.SELECTION_VALUE"
                  class="select-version"
                >
                  <OOption
                    v-for="itemData in scope.row.SELECTION_LIST"
                    :key="itemData"
                    :label="itemData"
                    :value="itemData"
                  />
                </OSelect>
              </ClientOnly>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="完整性校验" prop="sha_code">
          <template #default="scope">
            <div class="down-action">
              <OButton
                class="down-copy"
                size="mini"
                type="text"
                animation
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
        <el-table-column label="软件包下载" prop="docsName">
          <template #default="scope">
            <a :href="scope.row.DOWNLOAD" target="_blank">{{
              i18n.download.DOWNLOAD_BTN_NAME
            }}</a>
          </template>
        </el-table-column>
      </OTable>
      <!-- mobild -->
      <!-- <ul v-else class="download-mobile">
        <li
          v-for="(item, index) in renderData.content"
          :key="item.name"
          class="download-item"
        >
          <p class="item-text">
            <span>{{ tableData.thead[0] + ':' }}</span
            ><span class="tips-box"
              >{{ item.name }}
              <template v-if="item.table === 'server'">
                <p v-show="showIndex === index" class="server-name">
                  {{ hoverTips(item.edition) }}
                </p>
                <IconTips class="server-tips" @click="setShowIndex(index)" />
                <div
                  v-show="showIndex !== -1"
                  class="mask-mobile"
                  @click="setShowIndex(-1)"
                ></div> </template
            ></span>
          </p>
          <p class="item-text">
            <span>{{ tableData.thead[1] + ':' }}</span
            ><span class="text-size">{{ item.size }}</span>
          </p>
          <p class="item-text">
            <span>{{ tableData.thead[2] + ':' }}</span>
            <a
              v-if="
                versionShownIndex === downloadVersionAuthIndex &&
                !guardAuthClient.username
              "
              @click="changeDownloadAuth"
            >
              {{ i18n.download.BTN_TEXT_MO }}</a
            >
            <a v-else :href="item.down_url">
              {{ i18n.download.BTN_TEXT_MO }}
            </a>
          </p>
          <p class="item-text">
            <span>{{ tableData.thead[3] + ':' }}</span>
            <OButton
              class="down-copy"
              size="mini"
              type="text"
              animation
              @click="handleUrlCopy(item.sha_code)"
            >
              {{ shaText }}
              <template #suffixIcon>
                <IconCopy />
              </template>
            </OButton>
          </p>
          <p v-if="tableData.thead[4]" class="item-text">
            <span>{{ tableData.thead[4] + ':' }}</span
            ><a
              :href="
                item.docs_url.includes('https')
                  ? item.docs_url
                  : theme.docsUrl + '/' + lang + item.docs_url
              "
              target="_blank"
              >{{ item.docsName }}</a
            >
          </p>
        </li>
      </ul> -->
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
      display: none;
    }
    :deep(.tag-filter) {
      .label {
        width: 80px;
      }
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
    .select-box {
      margin-top: var(--o-spacing-h4);
      text-align: center;
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      :deep(.el-input__wrapper) {
        min-width: 252px;
        padding: 0 16px;
      }
      :deep(.el-input__prefix) {
        display: none;
      }
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      .label {
        margin-right: var(--o-spacing-h5);
        color: var(--o-color-text3);
        display: inline-block;
        @media (max-width: 1100px) {
          padding-bottom: var(--o-spacing-h8);
        }
      }
      .select-version {
        color: var(--o-color-text1);
        @media (max-width: 1100px) {
          display: block;
        }
      }
    }
    .download-pc {
      margin-top: var(--o-spacing-h4);
      .name-info {
        display: flex;
        align-items: center;
        gap: var(--o-spacing-h8);
        color: var(--o-color-text1);
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
      }
      :deep(.cell) {
        a {
          word-break: normal;
        }
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
