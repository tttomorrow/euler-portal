<script lang="ts" setup>
import { ref } from 'vue';
import IconTime from '~icons/app/icon-time.svg';
defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
});
const indexShow: any = ref(-1);
function changeIndexShow(index: number) {
  indexShow.value = index;
}
</script>

<template>
  <div class="dateList">
    <div
      v-for="(subitem, index) in options"
      :key="subitem.time"
      class="dataItem"
      :class="{
        'show-detail': indexShow === index,
      }"
    >
      <span class="time"><IconTime />{{ subitem.time }}</span>
      <span
        class="desc"
        :class="indexShow === index ? 'show-more' : ''"
        @click="changeIndexShow(index as any)"
        >{{ subitem.desc }}</span
      >
      <div v-if="subitem.name" class="box">
        <span class="name">{{ subitem.name }} </span>
        <span v-if="subitem.post" class="post">{{ subitem.post }} </span>
      </div>
      <div v-else class="db">
        <div v-for="option in subitem.option" :key="option.name" class="inline">
          <span class="name">{{ option.name }} </span>
          <div class="post-more">
            <span class="post">{{ option.post[0] }} </span>
            <span class="post">{{ option.post[1] }} </span>
          </div>
        </div>
      </div>
      <div class="detail">
        <p>
          <span>议题名称：</span><span>{{ subitem.desc }}</span>
        </p>
        <p v-if="subitem.detail">
          <span>议题简介：</span><span>{{ subitem.detail }}</span>
        </p>
        <p>
          <span>姓名：</span><span>{{ subitem.name }}</span>
        </p>
        <p v-if="subitem.post">
          <span>职位：</span><span>{{ subitem.post }}</span>
        </p>
      </div>
    </div>
  </div>
  <div
    v-show="indexShow !== -1 && options[0].detail"
    class="mask"
    @click="changeIndexShow(-1)"
  ></div>
</template>

<style lang="scss" scoped>
.dataItem {
  display: grid;
  grid-template-columns: 192px 500px 445px;
  border-bottom: 1px solid var(--o-color-border2);
  padding: 20px 0;
  transition: all 0.25s ease;
  align-items: center;
  min-height: 64px;
  position: relative;
  @media screen and (max-width: 1328px) {
    grid-template-columns: 500px auto;
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: 80px auto;
    padding: 6px 0;
    min-height: 36px;
  }

  &:hover {
    background-color: var(--o-color-bg4);
  }
  .box {
    display: flex;
    align-items: center;
    @media screen and (max-width: 1100px) {
      grid-column-start: 2;
      grid-column-end: 3;
      display: block;
    }
  }
  .db {
    grid-column-start: 3;
    grid-column-end: 5;
    @media screen and (max-width: 1100px) {
      margin-top: 0;
      grid-column-start: 2;
      grid-column-end: 3;
    }
    .inline {
      display: flex;
      align-items: center;
      &:nth-child(2) {
        margin-top: 12px;
        @media screen and (max-width: 1100px) {
          margin-top: 4px;
        }
      }
      @media screen and (max-width: 1100px) {
        display: block;
      }
    }
  }
  .desc {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    display: inline-block;
    margin-right: 36px;
    cursor: pointer;
    @media (max-width: 1100px) {
      margin-right: 0;
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }

  .name {
    width: 100px;
    display: inline-block;
    color: var(--o-color-text4);
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .post {
    width: 100%;
    display: inline-block;
    color: var(--o-color-text4);
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    word-break: keep-all;
    flex: 1;
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .post-more {
    width: 345px;
    @media screen and (max-width: 1100px) {
      width: 100%;
    }
  }
  .time {
    width: 192px;
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text4);
    display: flex;
    align-items: center;
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      width: 80px;
    }
    svg {
      width: 18px;
      height: 18px;
      color: var(--o-color-text4);
      margin-right: 6px;
      @media screen and (max-width: 1100px) {
        display: none;
      }
    }
  }
  .info .desc {
    width: 460px;
    margin-right: 40px;
    display: inline-block;
  }
  .detail {
    width: 75%;
    padding: var(--o-spacing-h2);
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l4);
    max-height: 170px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    // display: none;
    p {
      & + p {
        margin-top: var(--o-spacing-h8);
      }
      span {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        color: var(--o-color-text1);
      }
    }
  }
  &:nth-last-of-type(1) {
    .detail {
      top: -208px;
    }
  }
  &:nth-last-of-type(2) {
    .detail {
      top: -168px;
    }
  }
  &:nth-last-of-type(3) {
    .detail {
      top: -188px;
    }
  }
  &:nth-last-of-type(4) {
    .detail {
      top: 80px;
    }
  }
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
// .show-detail {
//   .detail {
//     display: block;
//   }
// }

.dateList .sub-container .dataItem {
  grid-template-columns: 192px auto 96px 410px;
}
</style>
