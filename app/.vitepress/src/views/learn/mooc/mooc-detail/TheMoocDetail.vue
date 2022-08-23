<script setup lang="ts">
import {
  onMounted,
  ref,
  getCurrentInstance,
  onUpdated,
  computed,
  onUnmounted,
} from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import VideoCtrl from '@/components/VideoCtrl.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import IconArrowLeft from '~icons/app/icon-arrow-left1.svg';
import IconArrowRight from '~icons/app/icon-arrow-right1.svg';
import IconChevronDown from '~icons/app/icon-chevron-down.svg';
import IconCancel from '~icons/app/icon-cancel.svg';
import IconCatalog from '~icons/mooc/catalog.svg';

import logo_light from '@/assets/logo.png';
import logo_dark from '@/assets/logo_dark.png';

const i18n = useI18n();
const router = useRouter();
const language = useData().lang;
const commonStore = useCommon();

const moocData = computed(() => i18n.value.mooc);

const isNowPlay = ref(false);
const defaultProps = ref({
  children: 'children',
  label: 'label',
});
// 导航栏目录数据
const menuData: any = ref([]);
// 当前选中节点内容
const currentNode = ref({
  title: '',
  ppt: '',
  desc: '',
  video: '',
  key: '',
});
const teacherList: any = ref([]);
const introductionText = ref([]);
const allNode: any = ref([]);
const courseH1 = ref('');
const welcome = ref('');
const courseIndex = ref(0);
// 控制移动端二级导航展开收起
const isShowMenu = ref(false);
let refs: any = null;
// 操作视频控制对象
const ctrlObj: any = ref();
// 确定介绍文字中的标题下标
const listTitleIndex = ref(0);
const logo = computed(() => {
  return commonStore.theme === 'light' ? logo_light : logo_dark;
});
onMounted(() => {
  const { $refs } = (getCurrentInstance() as any).proxy;
  refs = $refs;
  getMenu();
  teacherList.value = menuData.value[0].teacher;
  allNode.value = getCoursePath(menuData.value);
  if (useWindowResize().value > 1400) {
    ctrlObj.value = {
      element: document.getElementById('pc-video'),
      isShow: true,
      barWidth: 700,
    };
  } else {
    ctrlObj.value = {
      element: document.getElementById('pc-video'),
      isShow: true,
      barWidth: 432,
    };
  }

  courseIndex.value =
    JSON.parse(sessionStorage.getItem('courseIndex') || '0') * 1;
  setCourseData(allNode.value[courseIndex.value]);
});
onUpdated(() => {
  setCheckedNode();
});
// 移动端点击控制目录的显示或隐藏
function showMenu(option: string) {
  if (option === 'show') {
    isShowMenu.value = true;
  } else if (option === 'hide') {
    isShowMenu.value = false;
  } else {
    return false;
  }
}
// 设置选中节点
function setCheckedNode() {
  refs.tree.tree.setCurrentKey(currentNode.value.key);
}
// 读取要渲染的课程内容数据
function getMenu() {
  const listData = moocData.value.MOOC_DATA.COURSE_LIST;
  listData.forEach((item: any) => {
    menuData.value = item.NAV_DATA;
    courseH1.value = item.COURSE_H1;
    welcome.value = item.WELCOME;
  });
}
// 控制视频的播放和暂停
function checkStatus(status: boolean) {
  if (status === true) {
    isNowPlay.value = true;
  } else {
    isNowPlay.value = false;
  }
}
// 导航栏点击事件
function handleNodeClick(obj: any) {
  setCourseData(obj);
}
// 读取所有文档节点
function getCoursePath(menuData: any) {
  menuData.forEach((item: any) => {
    if (item.children && item.children.length) {
      getCoursePath(item.children);
    } else {
      allNode.value.push(item);
    }
  });
  return allNode.value;
}
// 点击视频播放按钮播放视频并隐藏该按钮,option:webBtn(pc端操作)、mobileBtn(移动端操作)
function playmoocVideo(option: string) {
  if (option === 'webBtn') {
    refs.playctrlEle.isPlay = true;
  } else if (option === 'mobileBtn') {
    refs.mobileVideo.play();
    isNowPlay.value = true;
  }
}
// 根据上下页操作改变激活节点及显示内容
function getTitleAndIndex(arr: any, option: string) {
  arr.forEach((item: any, index: number) => {
    if (
      item.key === currentNode.value.key &&
      index !== 0 &&
      option === 'prev'
    ) {
      currentNode.value.title = arr[index - 1].label;
      courseIndex.value = index - 1;
    } else if (item.key === currentNode.value.key && option === 'next') {
      currentNode.value.title = arr[index + 1].label;
      courseIndex.value = index + 1;
    } else {
      return false;
    }
  });
}
// 根据激活节点显示的内容obj(读取的数据)
function setCourseData(obj: any) {
  if (obj.introduction) {
    introductionText.value = obj.introduction;
    currentNode.value.title = obj.label;
    currentNode.value.key = obj.key;
    currentNode.value.desc = '';
    setCheckedNode();
    setListTitleIndex();
    if (obj.ppt_link) {
      currentNode.value.ppt = obj.ppt_link;
    } else {
      currentNode.value.ppt = '';
    }
  } else if (obj.desc) {
    introductionText.value = [];
    currentNode.value.title = obj.label;
    currentNode.value.ppt = obj.ppt_link;
    currentNode.value.desc = obj.desc;
    currentNode.value.video = obj.video_link;
    currentNode.value.key = obj.key;
    refs.playctrlEle.isPlay = false;
    refs.mobileVideo.isPlay = false;
    setCheckedNode();
    refs.playctrlEle.barPercentage = 0;
    listTitleIndex.value = 0;
  } else {
    return false;
  }
  setCourseIndex();
}
// 保存当前所在页面防止刷新从第一页渲染
function setCourseIndex() {
  allNode.value.forEach((item: any, index: number) => {
    if (item.key === currentNode.value.key) {
      courseIndex.value = index;
      sessionStorage.setItem('courseIndex', JSON.stringify(courseIndex.value));
    }
  });
}
// 设置介绍文字中的标题下标
function setListTitleIndex() {
  introductionText.value.forEach((item: string, index: number) => {
    if (item.indexOf('：') !== -1) {
      listTitleIndex.value = index;
      return;
    }
  });
}
// 上一页
function previous() {
  getTitleAndIndex(allNode.value, 'prev');
  currentNode.value.key = allNode.value[courseIndex.value].key;
  setCourseData(allNode.value[courseIndex.value]);
}
// 下一页
function next() {
  getTitleAndIndex(allNode.value, 'next');
  //最后一章则无下一篇
  if (courseIndex.value === allNode.value.length - 1) {
    return false;
  } else {
    currentNode.value.key = allNode.value[courseIndex.value].key;
  }
  setCourseData(allNode.value[courseIndex.value]);
}
// 卸载时将文档位置回归到第一个
onUnmounted(() => {
  sessionStorage.setItem('courseIndex', '0');
});
// 返回首页
const goHome = () => {
  router.go(`/${language.value}/`);
};
</script>
<template>
  <div class="mooc-detail">
    <div class="detail-mobile">
      <OIcon class="catalog" @click="showMenu('show')"><IconCatalog /></OIcon>
      <ODrawer
        v-model="isShowMenu"
        direction="ltr"
        size="268px"
        show-close="false"
      >
        <div class="nav-tree">
          <div class="nav-top">
            <img
              class="logo"
              :src="logo"
              alt="openEuler logo"
              @click="goHome"
            />
            <OIcon @click="showMenu('hide')"><IconCancel /></OIcon>
          </div>
          <OTree
            ref="tree"
            node-key="key"
            :data="menuData"
            :props="defaultProps"
            accordion
            :highlight-current="true"
            :icon="IconChevronDown"
            @node-click="handleNodeClick"
          >
          </OTree>
        </div>
      </ODrawer>
      <BreadCrumbs
        :bread1="moocData.MOOC.MOOC"
        :bread2="moocData.MOOC.MOOC_COURSE[0].TITLE"
        link1="/zh/learn/mooc/"
        class="bread"
      />
      <div class="mobile-content">
        <h1>{{ courseH1 }}</h1>
        <p class="entry-welcome">{{ welcome }}</p>
        <div class="infomation">
          <p :key="currentNode.title" class="title">
            {{ currentNode.title }}
          </p>
          <p class="desc">{{ currentNode.desc }}</p>
          <a
            v-show="currentNode.ppt"
            :href="currentNode.ppt"
            :download="currentNode.ppt"
            class="download"
          >
            <OButton type="primary" size="mini">
              {{ moocData.MOOC.COURSE_DOWNLOAD }}
              <template #suffixIcon>
                <OIcon><IconArrowRight /></OIcon>
              </template>
            </OButton>
          </a>
        </div>
        <div v-show="introductionText.length" class="text">
          <p
            v-for="(item, index) in introductionText"
            :key="item"
            :class="[
              courseIndex === 0 && index === 0 ? 'welcome' : '',
              listTitleIndex !== 0 && listTitleIndex === index ? 'list1' : '',
            ]"
          >
            {{ item }}
          </p>
          <div v-if="currentNode.key === 'introduction0'" class="teacher">
            <p>{{ moocData.MOOC.TEACHER_TEAM }}</p>
            <div v-for="item in teacherList" :key="item" class="item">
              <img :src="item.img" alt="" />
              <div>
                <p>{{ item.position }}</p>
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!introductionText.length" class="video">
          <video
            ref="mobileVideo"
            :src="currentNode.video"
            loop
            style="width: 100%"
          ></video>
          <div
            v-if="!isNowPlay"
            class="play-btn"
            @click="playmoocVideo('mobileBtn')"
          ></div>
        </div>
        <div class="mobile-menu">
          <div class="prev" @click="previous">
            <OIcon><IconArrowLeft /></OIcon>
            <span>{{ moocData.MOOC.PREV_TEXT }}</span>
          </div>
          <div class="next" @click="next">
            <span>{{ moocData.MOOC.NEXT_TEXT }}</span>
            <OIcon><IconArrowRight /></OIcon>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-pc">
      <BreadCrumbs
        :bread1="moocData.MOOC.MOOC"
        :bread2="moocData.MOOC.MOOC_COURSE[0].TITLE"
        link1="/zh/learn/mooc/"
      />
      <h1>{{ courseH1 }}</h1>
      <p class="entry-welcome">{{ welcome }}</p>
      <div class="content">
        <div class="article-nav fl">
          <div class="nav-top">{{ moocData.MOOC.MOOC_CATALOG }}</div>
          <OTree
            ref="tree"
            node-key="key"
            :data="menuData"
            :props="defaultProps"
            accordion
            :highlight-current="true"
            :icon="IconChevronDown"
            @node-click="handleNodeClick"
          >
          </OTree>
        </div>
        <div class="article-detail fl">
          <div class="infomation">
            <div>
              <p class="infomation-title">
                <span :key="currentNode.title" class="title">{{
                  currentNode.title
                }}</span>
                <a
                  v-show="currentNode.ppt"
                  :href="currentNode.ppt"
                  :download="currentNode.ppt"
                  class="download"
                  >{{ moocData.MOOC.COURSE_DOWNLOAD }}</a
                >
              </p>
              <p class="desc">{{ currentNode.desc }}</p>
            </div>
          </div>
          <div v-show="introductionText.length" class="text">
            <p
              v-for="(item, index) in introductionText"
              :key="item"
              :class="[
                courseIndex === 0 && index === 0 ? 'welcome' : '',
                listTitleIndex !== 0 && listTitleIndex === index ? 'list1' : '',
              ]"
            >
              {{ item }}
            </p>
            <div v-if="currentNode.key === 'introduction0'" class="teacher">
              <p>{{ moocData.MOOC.TEACHER_TEAM }}</p>
              <div class="techer-img">
                <div v-for="item in teacherList" :key="item.name" class="item">
                  <img :src="item.img" alt="" />
                  <div>
                    <p class="name">{{ item.name }}</p>
                    <p class="position">{{ item.position }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="!introductionText.length" class="video">
            <video
              id="pc-video"
              :src="currentNode.video"
              loop
              style="width: 100%"
            ></video>
            <VideoCtrl
              ref="playctrlEle"
              :ctrl-obj="ctrlObj"
              @play-status="checkStatus"
            ></VideoCtrl>
            <div
              v-if="!isNowPlay"
              class="play-btn"
              @click="playmoocVideo('webBtn')"
            ></div>
          </div>
          <div class="crtl-btn">
            <div class="prev" @click="previous">
              <OIcon>
                <IconArrowLeft />
              </OIcon>
              <span>{{ moocData.MOOC.PREV_TEXT }}</span>
            </div>
            <div class="next" @click="next">
              <span>{{ moocData.MOOC.NEXT_TEXT }}</span>
              <OIcon>
                <IconArrowRight />
              </OIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mooc-detail {
  max-width: 1504px;
  padding: 0 44px;
  margin: 0 auto;
  .detail-pc {
    display: block;
    overflow: hidden;
    h1 {
      width: 100%;
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--e-color-text1);
      margin: 0 auto 8px auto;
    }
    .entry-welcome {
      font-size: var(--o-font-size-text);
      line-height: 22px;
      color: var(--e-color-text1);
      margin: 0 auto var(--o-spacing-h2) auto;
    }
    .back {
      cursor: pointer;
      font-size: 20px;
      color: #002fa7;
      line-height: 20px;
      width: 100%;
      margin: 28px auto 16px auto;
    }
    .content {
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: flex-start;
      .article-nav {
        margin-right: 60px;
        background: var(--e-color-bg2);
        box-shadow: var(--e-shadow2);
        border-radius: 8px;
        .nav-top {
          width: 360px;
          height: 56px;
          background: var(--e-color-bg2);
          font-size: 18px;
          line-height: 60px;
          color: var(--e-color-text1);
          padding-left: var(--o-spacing-h4);
          font-weight: bold;
        }
        :deep(.el-tree) {
          width: 360px;
          overflow: hidden;
          background-color: var(--e-color-bg2);
        }
        :deep(.el-tree-node__content > .el-tree-node__expand-icon) {
          order: 2;
          padding: 12px;
          font-size: var(--o-font-size-h5);
          color: var(--e-color-text1);
        }
        :deep(.el-tree-node__expand-icon.expanded) {
          transform: rotate(180deg);
        }
        :deep(.el-tree-node:nth-of-type(1)
            > .el-tree-node__content
            > .el-tree-node__expand-icon) {
          display: none;
        }
        :deep(.el-tree--highlight-current
            .el-tree-node.is-current
            > .el-tree-node__content) {
          background-color: var(--e-color-bg4);
        }
        :deep(.el-tree-node__children .el-tree-node__expand-icon) {
          display: none;
        }
        :deep(.el-tree-node__children) {
          background-color: var(--e-color-bg1);
        }
        :deep(.el-tree-node__children .is-current .el-tree-node__content) {
          background-color: transparent;
          position: relative;
          &::before {
            content: '';
            display: inline-block;
            position: absolute;
            left: 0;
            width: 2px;
            height: 60px;
            background-color: var(--e-color-brand1);
          }
        }
        :deep(.el-tree-node__content:hover) {
          background-color: var(--e-color-bg4);
        }
        :deep(.el-tree .el-tree-node__label) {
          font-size: 16px;
          line-height: 16px;
          color: var(--e-color-text1);
        }
        :deep(.el-tree .el-tree-node__children .el-tree-node__label) {
          font-size: 14px;
          line-height: 20px;
          white-space: pre-wrap;
        }
        :deep(.el-tree-node .el-tree-node__content) {
          padding: 28px var(--o-spacing-h4) !important;
          justify-content: space-between;
        }
      }
      .article-detail {
        max-width: 864px;
        .infomation {
          padding-bottom: 30px;
          border-bottom: 1px solid var(--e-color-division1);
          & > div {
            &:first-of-type {
              .desc {
                font-size: var(--o-font-size-text);
                color: var(--e-color-text1);
                line-height: 22px;
                margin-top: 20px;
              }
              .title {
                font-size: var(--o-font-size-h5);
                line-height: var(--o-line-height-h5);
                font-weight: 600;
                color: var(--e-color-text1);
              }
              .download {
                display: inline-block;
                width: 104px;
                height: 28px;
                background: var(--e-color-brand1);
                border-radius: 4px;
                color: #ffffff;
                font-size: var(--o-font-size-text);
                line-height: 28px;
                text-align: center;
                text-decoration: none;
              }
            }
          }
          &-title {
            max-width: 864px;
            display: flex;
            justify-content: space-between;
          }
        }
        .video {
          width: 864px;
          height: 552px;
          min-width: 60%;
          position: relative;
          padding: 30px 0;
          border-bottom: 1px solid var(--e-color-division1);
          @media (max-width: 1400px) {
            width: 560px;
            height: 375px;
          }
          :deep(.playControll) {
            display: none;
            @media (max-width: 1400px) {
              bottom: 30px !important;
            }
          }
          .big-controll {
            bottom: 34px;
          }
          .play-btn {
            width: 50px;
            height: 50px;
            position: absolute;
            border-radius: 50%;
            bottom: 50%;
            left: 50%;
            margin: 0 0 -10px -25px;
            background-image: url('@/assets/category/mooc/video-ctrl/play.png');
            cursor: pointer;
            background-size: contain;
            opacity: 0.6;
          }
          &:hover {
            .playControll {
              display: block;
            }
          }
        }
        .text {
          font-size: var(--o-font-size-text);
          line-height: 22px;
          padding: var(--o-spacing-h2) 0;
          color: var(--e-color-text4);
          border-bottom: 1px solid var(--e-color-division1);
          .teacher {
            margin-top: 20px;
            & > p {
              font-size: 14px;
              color: var(--e-color-text4);
              margin-bottom: 10px;
              line-height: 36px;
              &:nth-of-type(1) {
                font-size: var(--o-font-size-h8);
                line-height: var(--o-line-height-h8);
                font-weight: 600;
                color: var(--e-color-text1);
              }
            }
            .techer-img {
              display: flex;
              flex-wrap: wrap;
              .item {
                min-width: 197px;
                display: flex;
                flex-direction: row;
                margin-bottom: 20px;
                margin-right: var(--o-spacing-h2);
                img {
                  display: block;
                  width: 120px;
                  height: 120px;
                  margin-right: 20px;
                  border-radius: 50%;
                }
                .name {
                  font-size: var(--o-font-size-h7);
                  line-height: var(--o-line-height-h7);
                  color: var(--e-color-text1);
                  margin-top: 30px;
                }
                .position {
                  font-size: 14px;
                  line-height: 22px;
                  color: var(--e-color-text4);
                  margin-top: 3px;
                }
              }
            }
          }
          .welcome {
            color: var(--e-color-brand1);
            margin-bottom: var(--o-spacing-h5);
          }
          .list1 {
            margin: var(--o-spacing-h5) 0;
          }
        }
        .crtl-btn {
          margin-top: 24px;
          position: relative;
          height: 30px;
          .prev,
          .next {
            cursor: pointer;
            display: flex;
            align-items: center;
            font-size: var(--o-font-size-text);
            line-height: 22px;
            font-weight: 400;
            position: absolute;
            color: var(--e-color-text1);
            .o-icon {
              font-size: var(--o-font-size-h8);
              color: var(--e-color-brand1);
            }
            span:nth-of-type(1) {
              margin-right: 8px;
            }
            &:hover {
              color: var(--e-color-brand2);
              .o-icon {
                color: var(--e-color-brand2);
              }
            }
          }
          .prev {
            left: 0;
            top: 0;
          }
          .next {
            right: 0;
            top: 0;
          }
        }
      }
    }
  }
  .detail-mobile {
    display: none;
  }
}

@media screen and (max-width: 1100px) {
  .mooc-detail {
    padding: 0;
    .detail-mobile {
      display: block;
      padding: 0 var(--o-spacing-h5);
      .catalog {
        position: fixed;
        top: 12px;
        left: 48px;
        z-index: 99;
        font-size: 24px;
        color: var(--e-color-text1);
      }
      .mobile-menu {
        width: 100%;
        padding: var(--o-spacing-h5) 0 0 0;
        display: flex;
        justify-content: space-between;
        .prev,
        .menu,
        .next {
          font-size: 14px;
          font-weight: 400;
          color: var(--e-color-brand1);
          line-height: 20px;
        }
        .prev {
          span:nth-of-type(2) {
            color: var(--e-color-text1);
            margin-left: var(--o-spacing-h8);
            position: relative;
            top: -2px;
          }
        }
        .next {
          span:nth-of-type(1) {
            color: var(--e-color-text1);
            margin-right: var(--o-spacing-h8);
            position: relative;
            top: -2px;
          }
        }
      }
      .nav-tree {
        position: fixed;
        left: 0;
        top: 0;
        width: 268px;
        height: 100vh;
        background: var(--e-color-bg2);
        box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        z-index: 999;
        .nav-top {
          width: 100%;
          background: var(--e-color-bg2);
          font-size: 14px;
          line-height: 22px;
          color: var(--e-color-text1);
          padding: var(--o-spacing-h5);
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .logo {
            height: 24px;
            cursor: pointer;
          }
          :deep(.o-icon) {
            padding: 12px;
            cursor: pointer;
            font-size: var(--o-font-size-h5);
          }
        }
        :deep(.el-tree) {
          width: 100%;
          overflow: hidden;
          background-color: var(--e-color-bg2);
        }
        :deep(.el-tree-node__content > .el-tree-node__expand-icon) {
          order: 2;
          padding: 12px;
          font-size: var(--o-font-size-h8);
          color: var(--e-color-text1);
        }
        :deep(.el-tree-node__expand-icon.expanded) {
          transform: rotate(180deg);
        }
        :deep(.el-tree--highlight-current
            .el-tree-node.is-current
            > .el-tree-node__content) {
          background-color: var(--e-color-bg4);
        }
        :deep(.el-tree-node:nth-of-type(1)
            > .el-tree-node__content
            > .el-tree-node__expand-icon) {
          display: none;
        }
        :deep(.el-tree-node__children .el-tree-node__expand-icon) {
          display: none;
        }
        :deep(.el-tree-node__children .is-current .el-tree-node__label) {
          color: var(--e-color-brand1);
        }
        :deep(.el-tree--highlight-current
            .el-tree-node.is-current
            > .el-tree-node__content) {
          background-color: transparent;
        }
        :deep(.el-tree-node__children) {
          background-color: var(--e-color-bg1);
        }
        :deep(.el-tree .el-tree-node__label) {
          font-size: 14px;
          line-height: 16px;
          color: var(--e-color-text1);
        }
        :deep(.el-tree .el-tree-node__children .el-tree-node__label) {
          font-size: 14px;
          line-height: 20px;
          white-space: pre-wrap;
        }
        :deep(.el-tree-node .el-tree-node__content) {
          padding: 19px var(--o-spacing-h5) !important;
          justify-content: space-between;
        }
      }
      .mobile-content {
        width: 100%;
        margin: 0 auto;
        padding: var(--o-spacing-h5);
        background-color: var(--e-color-bg2);
        h1 {
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
          color: var(--e-color-text1);
          font-weight: 500;
        }
        .entry-welcome {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: var(--e-color-text1);
          margin-top: var(--o-spacing-h8);
        }
        .infomation {
          margin-top: var(--o-spacing-h5);
          .title {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--e-color-text1);
            font-weight: 600;
          }
          .desc {
            font-size: 12px;
            color: var(--e-color-text1);
            line-height: 20px;
            margin-top: var(--o-spacing-h8);
          }
          .download {
            display: block;
            width: 100px;
            margin-top: var(--o-spacing-h5);
            :deep(.o-icon) {
              position: relative;
              top: -1px;
            }
            :deep(.o-button.o-button-size-mini) {
              color: #ffffff;
            }
          }
        }
        .text {
          p {
            font-size: 14px;
            color: var(--e-color-text1);
            line-height: 24px;
          }
          .teacher {
            margin-top: 16px;
            & > p {
              color: var(--e-color-text1);
            }
            .item {
              display: flex;
              flex-direction: row;
              margin: 16px 0 0 0;
              img {
                display: block;
                width: 50px;
                height: 50px;
                margin-right: 12px;
                border-radius: 50%;
              }
              div {
                p {
                  font-size: 12px;
                  color: var(--e-color-text1);
                  line-height: 16px;
                  &:last-of-type {
                    color: var(--e-color-text1);
                    margin-top: 10px;
                  }
                }
              }
            }
          }
          .welcome {
            color: var(--e-color-brand1);
            margin-bottom: var(--o-spacing-h5);
          }
        }
        .text,
        .video {
          border-top: 1px solid var(--e-color-division1);
          border-bottom: 1px solid var(--e-color-division1);
          padding: var(--o-spacing-h5) 0;
          margin-top: var(--o-spacing-h5);
        }
        .video {
          position: relative;
          .play-btn {
            width: 50px;
            height: 50px;
            position: absolute;
            border-radius: 50%;
            bottom: 50%;
            left: 50%;
            margin: 0 0 -35px -25px;
            background-image: url('@/assets/category/mooc/video-ctrl/play.png');
            cursor: pointer;
            background-size: contain;
            opacity: 0.6;
          }
        }
      }
    }
    .detail-pc {
      display: none;
    }
  }
}
</style>
