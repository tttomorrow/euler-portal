<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppCalendar from '@/components/AppCalendar.vue';
import MobileRepositoryList from './MobileRepositoryList.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import {
  // getSigDetail,
  getSigMember,
  getSigRepositoryList,
} from '@/api/api-sig';

import IconArrowRight from '~icons/app/right.svg';

const { lang } = useData();
const i18n = useI18n();
const screenWidth = useWindowResize();
const isIphone = computed(() => {
  return screenWidth.value <= 768 ? true : false;
});
const paginLayout = computed(() =>
  isIphone.value
    ? 'prev, slot, jumper, next'
    : 'sizes, prev, pager, next, slot, jumper'
);
const sigDetailName = ref('');
const sigDetail = computed(() => {
  return i18n.value.sig.SIG_DETAIL;
});
const sigMeetingData: any = ref('');
const sigMemberData: any = ref('');
const memberList: any = ref([]);
// function getSigDetails() {
//   try {
//     getSigDetail(sigDetailName.value).then((res: any) => {
//       sigMeetingData.value = res;
//     });
//   } catch (error) {
//     throw Error();
//   }
// }
function getSigMembers() {
  try {
    const param = {
      community: 'openeuler',
      sig: sigDetailName.value,
    };
    getSigMember(param).then((res: any) => {
      if (res?.data[0]) {
        const data = res.data[0];
        sigMemberData.value = data;
        const { maintainer_info } = data || [];
        const memberCurLen =
          maintainer_info.length > 4 ? 4 : maintainer_info.length;
        memberList.value = maintainer_info.slice(0, memberCurLen);
      }
    });
  } catch (error) {
    throw Error();
  }
}

// 仓库列表过滤参数
const repositoryNameList = ref([]);
const repositoryNameSelected = ref('');
const maintainerList = ref([]);
const maintainerSelected = ref('');
const committerList = ref([]);
const committerSelected = ref('');

const filterRepositoryList = () => {
  totalRepositoryList.value = _totalRepositoryList.value.filter((item) => {
    return (
      (!repositoryNameSelected.value ||
        item.repo === repositoryNameSelected.value) &&
      (!maintainerSelected.value ||
        item.maintainers.includes(maintainerSelected.value)) &&
      (!committerSelected.value ||
        item.gitee_id.includes(committerSelected.value))
    );
  });
  totalRepositoryList.value;
};

// 仓库列表参数
const currentPage = ref(1);
const pageSize = ref(10);
const totalPage = computed(() =>
  Math.ceil(totalRepositoryList.value.length / pageSize.value)
);
// 列表过滤后数据
const totalRepositoryList = ref([] as any[]);
// 列表原始数据
const _totalRepositoryList = ref([] as any[]);
const repositoryList = computed(() => {
  if (totalRepositoryList.value.length > pageSize.value) {
    return totalRepositoryList.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return totalRepositoryList.value;
  }
});
const getRepositoryList = () => {
  const param = {
    community: 'openeuler',
    sig: sigDetailName.value,
  };
  getSigRepositoryList(param).then((data) => {
    if (data.code === 200) {
      const {
        committerDetails = [],
        committers = [],
        maintainers = [],
      } = data.data;
      _totalRepositoryList.value = committerDetails.map((item: any) => ({
        ...item,
        maintainers,
      }));
      filterRepositoryList();
      repositoryNameList.value = committerDetails.map((item: any) => item.repo);
      maintainerList.value = maintainers;
      committerList.value = committers;
    }
  });
};

onMounted(() => {
  function GetUrlParam(paraName: any) {
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
  }
  sigDetailName.value = GetUrlParam('name');
  // getSigDetails();
  getSigMembers();
  getRepositoryList();
});
</script>
<template>
  <div class="sig-detail">
    <BreadCrumbs
      bread1="SIG"
      :bread2="sigDetailName"
      link1="/zh/sig/sig-list/"
    />
    <div class="content">
      <h3>{{ sigDetailName }}</h3>
      <div class="brief-introduction">
        <h4>{{ sigDetail.INTRODUCTION }}</h4>
        <p v-if="sigMemberData.description" class="no-meeting">
          {{ sigMemberData.description }}
        </p>
        <p v-else class="no-meeting">
          {{ i18n.sig.SIG_DETAIL.SIG_EMPTY_TEXT1
          }}<a
            target="_blank"
            :href="
              'https://gitee.com/openeuler/community/tree/master/sig/' + 'a-tm'
            "
            >{{ i18n.sig.SIG_DETAIL.SIG_EMPTY_TEXT2 }}</a
          >{{ i18n.sig.SIG_DETAIL.SIG_EMPTY_TEXT3 }}
        </p>
        <p class="email">
          <span>{{ sigDetail.MAIL_LIST }}:</span>
          <a :href="`mailto:${sigMemberData.mailing_list}`">{{
            sigMemberData.mailing_list
          }}</a>
        </p>
      </div>
      <div class="meeting">
        <h5>{{ sigDetail.ORGANIZING_MEETINGS }}</h5>
        <div v-if="sigMeetingData.tableData" class="calender-wrapper">
          <AppCalendar
            :is-home-page="false"
            :table-data="sigMeetingData.tableData"
          />
        </div>
        <p v-else class="no-meeting">
          {{ sigDetail.NO_MEETINGS }}
        </p>
      </div>
      <div class="member">
        <h5>{{ sigDetail.MAINTAINER }}</h5>
        <ul>
          <li v-for="item in memberList" :key="item.gitee_id">
            <div class="member-img">
              <img
                src="https://gitee.com/assets/no_portrait.png"
                :alt="item.name"
              />
            </div>
            <p class="name">{{ item.gitee_id }}</p>
            <p class="introduction">
              <span>Maintainer</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="repository">
        <h5>
          {{
            `${sigDetailName} ${sigDetail.REPOSITORY_LIST} (${_totalRepositoryList.length})`
          }}
        </h5>
        <div class="repository-filter">
          <div :class="isIphone ? 'select-box-phone' : 'select-box'">
            <div class="select-item">
              <span class="select-item-name">
                {{ sigDetail.REPOSITORY_NAME }}
              </span>
              <OSelect
                v-model="repositoryNameSelected"
                filterable
                clearable
                :placeholder="i18n.sig.SIG_ALL"
                @change="filterRepositoryList()"
              >
                <OOption
                  v-for="item in repositoryNameList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </OSelect>
            </div>
            <div v-if="isIphone" class="split-line"></div>
            <div class="select-item">
              <span class="select-item-name"> Maintainer </span>
              <OSelect
                v-model="maintainerSelected"
                filterable
                clearable
                :placeholder="i18n.sig.SIG_ALL"
                @change="filterRepositoryList()"
              >
                <OOption
                  v-for="item in maintainerList"
                  :key="item"
                  :value="item"
                  :lable="item"
                />
              </OSelect>
            </div>
            <div v-if="isIphone" class="split-line"></div>
            <div class="select-item">
              <span class="select-item-name"> Committer </span>
              <OSelect
                v-model="committerSelected"
                filterable
                clearable
                :placeholder="i18n.sig.SIG_ALL"
                @change="filterRepositoryList()"
              >
                <OOption
                  v-for="item in committerList"
                  :key="item"
                  :value="item"
                  :lable="item"
                />
              </OSelect>
            </div>
          </div>
        </div>
        <OTable v-if="!isIphone" :data="repositoryList">
          <el-table-column :label="sigDetail.REPOSITORY_NAME" width="550px">
            <template #default="scope">
              <a target="_blank" :href="`https://gitee.com/${scope.row.repo}`">
                {{ scope.row.repo }}
              </a>
            </template>
          </el-table-column>
          <el-table-column label="Maintainer">
            <template #default="scope">
              <span>
                {{ scope.row.maintainers.join(',') }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="Committer">
            <template #default="scope">
              <span>
                {{ scope.row.gitee_id.join(',') }}
              </span>
            </template>
          </el-table-column>
        </OTable>
        <MobileRepositoryList
          v-else
          :data="repositoryList"
        ></MobileRepositoryList>

        <OPagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          class="repository-pagin"
          :hide-on-single-page="true"
          :page-sizes="[10, 20, 30]"
          :background="true"
          :layout="paginLayout"
          :total="totalRepositoryList.length"
        >
          <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
        </OPagination>
      </div>
      <div class="recent-event">
        <h5>{{ sigDetail.LATEST_DYNAMIC }}</h5>
        <div class="dynamic">
          <div class="item">
            <div class="header">
              <span class="left">{{ sigDetail.BLOG }}</span>
              <a class="right">
                <span>{{ sigDetail.MORE }}</span>
                <OIcon class="icon-more">
                  <IconArrowRight />
                </OIcon>
              </a>
            </div>
            <ul class="body">
              <li class="empty">
                {{ sigDetail.BLOG_EMPTY1
                }}<a
                  :href="'/' + lang + '/interaction/post-blog/'"
                  target="_blank"
                  >{{ sigDetail.BLOG_EMPTY2 }}</a
                >{{ sigDetail.BLOG_EMPTY3 }}
              </li>
            </ul>
          </div>
          <div class="item">
            <div class="header">
              <span class="left">{{ sigDetail.NEWS }}</span>
              <a class="right">
                <span>{{ sigDetail.MORE }}</span>
                <OIcon class="icon-more">
                  <IconArrowRight />
                </OIcon>
              </a>
            </div>
            <ul class="body">
              <li class="empty">
                {{ sigDetail.NEWS_EMPTY
                }}<a
                  href="https://gitee.com/openeuler/website-v2/blob/master/web-ui/docs/zh/interaction/post-news/README.md"
                  target="_blank"
                  >{{ sigDetail.NEWS_EMPTY3 }}</a
                >{{ sigDetail.NEWS_EMPTY4 }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sig-detail {
  max-width: 1504px;
  padding: 0 var(--o-spacing-h2);
  margin: 0 auto var(--o-spacing-h1);
  .content {
    width: 100%;
    background-color: var(--e-color-bg2);
    .pagination-slot {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--o-spacing-h4);
    }
    h3 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--e-color-text1);
      font-weight: 500;
    }
    .brief-introduction {
      margin-top: var(--o-spacing-h2);
      h4 {
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        color: var(--e-color-text1);
      }
      p {
        margin-top: var(--o-spacing-h5);
        font-size: var(--o-font-size-text);
        line-height: 22px;
        color: var(--e-color-text3);
      }
    }
    .meeting {
      margin-top: var(--o-spacing-h2);
      color: var(--e-color-text1);
      .no-meeting {
        padding: var(--o-spacing-h5) 0;
        text-align: center;
      }
      .calender-wrapper {
        margin-top: var(--o-spacing-h5);
      }
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
      .schedule {
        margin-top: var(--o-spacing-h4);
        .calendar {
          width: 448px;
        }
      }
    }

    .member {
      margin-top: var(--o-spacing-h2);
      color: var(--e-color-text1);
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
      ul {
        // display: flex;
        // margin-top: var(--o-spacing-h4);
        padding: 0 var(--o-spacing-h7);
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        li {
          flex: 0 0 25%;
          text-align: center;
          margin-top: var(--o-spacing-h5);
          @media (max-width: 1080px) {
            flex: 0 0 50%;
          }
          .member-img {
            width: 120px;
            height: 120px;
            display: block;
            margin: 0 auto;
            img {
              width: 120px;
              height: 120px;
              border-radius: 50%;
            }
          }

          .name {
            margin-top: var(--o-spacing-h5);
            font-size: var(--o-font-size-h8);
            line-height: var(--o-line-height-h8);
          }
          .introduction {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
      }
    }
    .repository {
      margin-top: var(--o-spacing-h2);
      color: var(--e-color-text1);
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
      a {
        cursor: pointer;
        color: var(--e-color-brand1);
      }
      .repository-filter {
        margin: var(--o-spacing-h4) 0;
        .select-box {
          display: flex;
          justify-items: center;
          align-items: center;
          .select-item {
            &-name {
              margin-right: var(--o-spacing-h5);
            }
            :deep(.o-select) {
              margin-right: var(--o-spacing-h1);
            }
          }
        }
        .select-box-phone {
          .select-item {
            font-size: var(--o-font-size-text);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .split-line {
            height: 1px;
            margin: var(--o-spacing-h6) 0;
            background-color: var(--e-color-border2);
          }
        }
      }
      @media screen and (min-width: 857px) {
        .repository-pagin {
          margin-top: var(--o-spacing-h2);
        }
      }
      @media screen and (max-width: 857px) {
        .repository-pagin {
          margin-top: var(--o-spacing-h5);
        }
      }
    }
    .recent-event {
      margin-top: var(--o-spacing-h2);
      color: var(--e-color-text1);
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
      .dynamic {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 24px;
        margin-top: var(--o-spacing-h4);
        @media (max-width: 780px) {
          grid-template-columns: 1fr;
        }
        .item {
          max-width: 656px;
          padding: 40px;
          background-color: var(--e-color-bg2);
          border: 1px solid transparent;
          .header {
            display: flex;
            width: 100%;
            justify-content: space-between;
            .left {
              font-size: var(--o-font-size-h6);
              line-height: var(--o-line-height-h6);
              font-weight: 600;
              &::after {
                display: block;
                content: '';
                width: 20px;
                height: 2px;
                background-color: var(--e-color-brand1);
              }
            }
            .right {
              font-size: var(--o-font-size-text);
              line-height: 22px;
              cursor: pointer;
              .icon-more {
                font-size: var(--o-font-size-h8);
                margin-left: var(--o-spacing-h8);
                position: relative;
                top: 2px;
                color: var(--e-color-brand1);
              }
            }
          }
          .body {
            margin-top: var(--o-spacing-h4);
            font-size: var(--o-font-size-text);
            line-height: 22px;
          }
          &:hover {
            background-color: var(--e-color-bg2);
            border: 1px solid var(--e-color-kleinblue8);
            box-shadow: var(--o-shadow-overlay);
          }
        }
      }
    }
  }
  @media screen and (min-width: 857px) {
    .content {
      padding: var(--o-spacing-h2);
    }
  }
  @media screen and (max-width: 857px) {
    .content {
      padding: var(--o-spacing-h5);
    }
  }
}
@media (max-width: 1100px) {
  .sig-detail {
    padding: 0 16px;
  }
}
</style>
