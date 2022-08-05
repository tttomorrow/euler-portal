<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppCalendar from '@/components/AppCalendar.vue';

import { getSigDetail, getSigMember } from '@/api/api-sig';

import IconArrowRight from '~icons/app/right.svg';

const { lang } = useData();
const i18n = useI18n();

let sidDetailId: number;

const sigDetail = computed(() => {
  return i18n.value.sig.SIG_DETAIL;
});
const sigMeetingData: any = ref('');
const sigMemberData: any = ref('');
const memberList: any = ref([]);
const memberCurLen = ref(0);
function getSigDetails() {
  try {
    getSigDetail(sidDetailId).then((res: any) => {
      sigMeetingData.value = res;
    });
  } catch (error) {
    throw Error();
  }
}
function getSigMembers() {
  try {
    getSigMember(sidDetailId).then((res: any) => {
      sigMemberData.value = res;
      memberList.value = JSON.parse(res.owners);
      memberCurLen.value = memberList.value.length;
      if (memberList.value.length > 4) {
        memberCurLen.value = 4;
      }
      memberList.value = memberList.value.slice(0, memberCurLen.value);
    });
  } catch (error) {
    throw Error();
  }
}
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
  sidDetailId = parseInt(GetUrlParam('id'));
  getSigDetails();
  getSigMembers();
});
</script>
<template>
  <div class="sig-detail">
    <BreadCrumbs
      bread1="SIG"
      :bread2="sigMemberData.group_name"
      link1="/zh/sig/sig-list/"
    />
    <div class="content">
      <h3>{{ sigMemberData.group_name }}</h3>
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
          <a href="mailto:a-tune@openeuler.org">a-tune@openeuler.org</a>
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
        <h5>{{ sigDetail.MEMBERS }}</h5>
        <ul>
          <li v-for="item in memberList" :key="item.gitee_id">
            <div class="member-img">
              <img :src="item.avatar_url" alt="yangdi" />
            </div>
            <p class="name">{{ item.gitee_id }}</p>
            <p class="introduction">
              <span
                v-for="(itemIntroduction, itemIndex) in item.sigs"
                :key="itemIndex"
                >{{ itemIntroduction }}{{ ' ' }}</span
              >
              <span>SIG Maintainer</span>
            </p>
          </li>
        </ul>
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
  padding: 0 44px;
  margin: 0 auto var(--o-spacing-h1);
  .content {
    width: 100%;
    padding: var(--o-spacing-h2);
    background-color: var(--o-color-bg);
    h3 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text2);
      font-weight: 500;
    }
    .brief-introduction {
      margin-top: var(--o-spacing-h2);
      h4 {
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        color: var(--o-color-text2);
      }
      p {
        margin-top: var(--o-spacing-h5);
        font-size: var(--o-font-size-text);
        line-height: 22px;
        color: var(--o-color-text3);
      }
    }
    .meeting {
      margin-top: var(--o-spacing-h2);
      color: var(--o-color-text2);
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
      color: var(--o-color-text2);
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
    .recent-event {
      margin-top: var(--o-spacing-h2);
      color: var(--o-color-text2);
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
          background-color: var(--o-color-bg2);
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
                background-color: var(--o-color-brand);
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
                color: var(--o-color-brand);
              }
            }
          }
          .body {
            margin-top: var(--o-spacing-h4);
            font-size: var(--o-font-size-text);
            line-height: 22px;
          }
          &:hover {
            background-color: var(--o-color-bg);
            border: 1px solid var(--o-color-brand_hover);
            box-shadow: var(--o-shadow-overlay);
          }
        }
      }
    }
  }
}
@media (max-width: 1100px) {
  .sig-detail {
    padding: 0 16px;
  }
}
</style>
