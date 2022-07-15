<script setup lang="ts">
import {
  onMounted,
  ref,
  getCurrentInstance,
  onUpdated,
  computed,
  onUnmounted,
} from 'vue';
import { useData } from 'vitepress';

import VideoCtrl from './controll/VideoCtrl.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import IconArrowLeft from '~icons/app/icon-arrow-left1.svg';
import IconArrowRight from '~icons/app/icon-arrow-right1.svg';
import IconChevronDown from '~icons/app/icon-chevron-down.svg';

const { theme: i18n } = useData();

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
const mobileNavIndex = ref(-1);
const navItemIndex = ref('');
let refs: any = null;
// 操作视频控制对象
const ctrlObj: any = ref();
// 确定介绍文字中的标题下标
const listTitleIndex = ref(0);
onMounted(() => {
  const { $refs } = (getCurrentInstance() as any).proxy;
  refs = $refs;
  getMenu();
  teacherList.value = menuData.value[0].teacher;
  allNode.value = getCoursePath(menuData.value);
  ctrlObj.value = {
    element: document.getElementById('pc-video'),
    isShow: true,
    barWidth: 590,
  };
  courseIndex.value =
    JSON.parse(sessionStorage.getItem('courseIndex') || '0') * 1;
  setCourseData(allNode.value[courseIndex.value]);
});
onUpdated(() => {
  setCheckedNode();
});
// 移动端导航栏二级导航点击事件
function toCourse(item: any) {
  setCourseData(item);
  showMenu('hide');
  navItemIndex.value = item.key;
}
// 移动端导航栏一级导航点击事件
function showItem(index: number, item: any) {
  if (index === 0) {
    setCourseData(item);
    showMenu('hide');
  } else {
    if (mobileNavIndex.value === index) {
      mobileNavIndex.value = -1;
    } else {
      mobileNavIndex.value = index;
    }
  }
}
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
  if (obj.key) {
    isShowMenu.value = false;
  }
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
    if (obj.ppt) {
      currentNode.value.ppt = obj.ppt;
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
</script>
<template>
  <div class="mooc-detail">
    <div class="detail-mobile">
      <div class="mobile-menu">
        <div class="prev" @click="previous">
          <i class="el-icon-arrow-left"></i>
          <span>{{ moocData.MOOC.PREV_TEXT }}</span>
        </div>
        <div class="menu" @click="showMenu('show')">
          <span>{{ moocData.MOOC.MOOC_CATALOG }}</span>
        </div>
        <div class="next" @click="next">
          <span>{{ moocData.MOOC.NEXT_TEXT }}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <el-collapse-transition>
        <div v-show="isShowMenu" class="nav-tree">
          <ul class="course-menu">
            <li v-for="(items, indexs) in menuData" :key="indexs">
              <div @click="showItem(indexs, items)">
                <span>{{ items.label }}</span>
                <i
                  v-if="indexs !== 0"
                  :class="
                    mobileNavIndex === indexs
                      ? 'el-icon-arrow-down'
                      : 'el-icon-arrow-right'
                  "
                ></i>
              </div>
              <el-collapse-transition>
                <ul
                  v-show="items.children && mobileNavIndex === indexs"
                  class="item"
                >
                  <li
                    v-for="item in items.children"
                    :key="item"
                    :class="navItemIndex === item.key ? 'active' : ''"
                    @click="toCourse(item)"
                  >
                    {{ item.label }}
                  </li>
                </ul>
              </el-collapse-transition>
            </li>
          </ul>
          <div class="course-mask" @click="showMenu('hide')"></div>
        </div>
      </el-collapse-transition>
      <div class="mobile-content">
        <p class="title">
          <span :key="currentNode.title">{{ currentNode.title }}</span>
        </p>
        <p class="desc">{{ currentNode.desc }}</p>
        <div v-show="introductionText.length" class="text">
          <p v-for="item in introductionText" :key="item">{{ item }}</p>
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
            style="width: 315px; height: 200px"
          ></video>
          <div
            v-if="!isNowPlay"
            class="play-btn"
            @click="playmoocVideo('mobileBtn')"
          ></div>
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
              style="max-width: 864px; max-height: 496px"
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
    padding-bottom: 200px;
    h1 {
      width: 100%;
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text2);
      margin: 0 auto 8px auto;
    }
    .entry-welcome {
      font-size: var(--o-font-size-text);
      line-height: 22px;
      color: var(--o-color-text2);
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
        background: var(--o-color-bg);
        box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        .nav-top {
          width: 360px;
          height: 56px;
          background: var(--o-color-bg);
          font-size: 18px;
          line-height: 60px;
          color: var(--o-color-text2);
          padding-left: var(--o-spacing-h4);
          font-weight: bold;
        }
        :deep(.el-tree) {
          width: 360px;
          overflow: hidden;
          background-color: var(--o-color-bg);
        }
        :deep(.el-tree-node__content > .el-tree-node__expand-icon) {
          order: 2;
          padding: 12px;
          font-size: var(--o-font-size-h5);
          color: var(--o-color-text2);
        }
        :deep(.el-tree-node__expand-icon.expanded) {
          transform: rotate(180deg);
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
          color: var(--o-color-brand);
        }
        :deep(.el-tree--highlight-current
            .el-tree-node.is-current
            > .el-tree-node__content) {
          background-color: var(--o-color-bg6);
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
            background-color: var(--o-color-brand);
          }
        }
        :deep(.el-tree-node__content:hover) {
          background-color: var(--o-color-bg6);
        }
        :deep(.el-tree .el-tree-node__label) {
          font-size: 16px;
          line-height: 16px;
          color: var(--o-color-text2);
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
          border-bottom: 1px solid var(--o-color-division);
          & > div {
            &:first-of-type {
              .desc {
                font-size: var(--o-font-size-text);
                color: var(--o-color-text2);
                line-height: 22px;
                margin-top: 20px;
              }
              .title {
                font-size: var(--o-font-size-h5);
                line-height: var(--o-line-height-h5);
                font-weight: 600;
                color: var(--o-color-text2);
              }
              .download {
                display: inline-block;
                width: 104px;
                height: 28px;
                background: var(--o-color-brand);
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
          position: relative;
          padding: 30px 0;
          border-bottom: 1px solid var(--o-color-division);
          .playControll {
            display: none;
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
            background-image: url('@/assets/video/play.png');
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
          color: var(--o-color-text3);
          border-bottom: 1px solid var(--o-color-division);
          .teacher {
            margin-top: 20px;
            & > p {
              font-size: 14px;
              color: var(--o-color-text3);
              margin-bottom: 10px;
              line-height: 36px;
              &:nth-of-type(1) {
                font-size: var(--o-font-size-h8);
                line-height: var(--o-line-height-h8);
                font-weight: 600;
                color: var(--o-color-text2);
              }
            }
            .techer-img {
              display: flex;
              .item {
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
                  color: var(--o-color-text2);
                  margin-top: 30px;
                }
                .position {
                  font-size: 14px;
                  line-height: 22px;
                  color: var(--o-color-text3);
                  margin-top: 3px;
                }
              }
            }
          }
          .welcome {
            color: var(--o-color-brand);
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
            color: var(--o-color-text2);
            .o-icon {
              font-size: var(--o-font-size-h8);
              color: var(--o-color-brand);
            }
            span:nth-of-type(1) {
              margin-right: 8px;
            }
            &:hover {
              color: var(--o-color-brand_hover);
              .o-icon {
                color: var(--o-color-brand_hover);
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

@media screen and (max-width: 768px) {
  .mooc-detail {
    padding: 0;
    .detail-mobile {
      display: block;
      .mobile-menu {
        width: 100%;
        height: 40px;
        padding: 10px var(--o-spacing-h2);
        position: fixed;
        top: 48px;
        left: 0;
        background: #fbfbfb;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        z-index: 100;
        .prev,
        .menu,
        .next {
          font-size: 14px;
          font-weight: 400;
          color: #002fa7;
          line-height: 20px;
        }
      }
      .nav-tree {
        position: fixed;
        width: 100%;
        top: 113px;
        z-index: 200;
        .course-menu {
          background-color: #fff;
          z-index: 100;
          padding: 10px 30px;
          height: 400px;
          overflow: scroll;
          position: fixed;
          width: 100%;
          top: 88px;
          left: 0;
          & > li {
            padding: 10px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            font-size: 16px;
            color: #000000;
            line-height: 26px;
            &:last-of-type {
              border-bottom: 0;
            }
            div {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              .el-icon-arrow-down {
                color: #002fa7;
              }
            }
            .item {
              padding-left: 15px;
              li {
                font-size: 14px;
                padding: 6px;
              }
              .active {
                color: #002fa7;
              }
            }
          }
        }
        .course-mask {
          position: fixed;
          background-color: rgba(0, 0, 0, 0.4);
          width: 100%;
          top: 88px;
          left: 0;
          height: 100%;
        }
      }
      .mobile-content {
        width: 315px;
        margin: 0 auto;
        padding: 40px 0 80px 0;
        .title {
          font-size: 18px;
          line-height: 18px;
          color: var(--o-color-text2);
          font-weight: blod;
          margin-top: 40px;
        }
        .desc {
          font-size: 12px;
          color: var(--o-color-text2);
          line-height: 20px;
          margin-top: 20px;
        }
        .text {
          p {
            font-size: 14px;
            color: var(--o-color-text2);
            line-height: 24px;
          }
          .teacher {
            margin-top: 20px;
            & > p {
              color: var(--o-color-text2);
            }
            .item {
              display: flex;
              flex-direction: row;
              margin: 20px 0;
              img {
                display: block;
                width: 50px;
                height: 50px;
                margin-right: 20px;
              }
              div {
                p {
                  font-size: 12px;
                  color: var(--o-color-text2);
                  line-height: 16px;
                  &:last-of-type {
                    color: var(--o-color-text2);
                    margin-top: 10px;
                  }
                }
              }
            }
          }
        }
        .text,
        .video {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          padding-top: 30px;
          margin-top: 30px;
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
            background-image: url('@/assets/video/play.png');
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
