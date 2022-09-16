<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getRank } from '@/api/api-internship';

interface RankType {
  userId: number;
  integralValue: number;
  GiteeId: string;
  giteeRoom?: string;
  rank?: string;
}

const showAll = ref(false);
const isExent = ref(false);
const isRank = ref(true);

const rankInfo: any = ref();
const rankTop: any = ref();
const renderData: any = ref();

const RANK = {
  FIRST: '第一名',
  SECOND: '第二名',
  THIRD: '第三名',
  SCORE: '积分',
  VIEW_ALL: '查看全部',
  PACK_UP: '收起全部',
};

// 获取数据
async function getTokenQuery() {
  try {
    const data = {
      sort: '',
    };
    const res = await getRank(data);
    if (res.code === 200) {
      if (res.UserPoints.length < 1) {
        isRank.value = false;
      } else {
        isRank.value = true;
        const info = res.UserPoints;
        info.length > 10 ? (showAll.value = true) : '';
        info.sort((a: any, b: any) => {
          return b.integralValue - a.integralValue;
        });

        info.forEach((item: RankType, index: number | string) => {
          item['giteeRoom'] = `https://gitee.com/${item.GiteeId}`;
          index < 9
            ? (item['rank'] = `0${+index + 1}`)
            : (item['rank'] = +index + 1 + '');
        });

        rankInfo.value = info;
        renderData.value = info.slice(3, 10);
        rankTop.value = info.slice(0, 3);
      }
    } else {
      isRank.value = false;
      throw new Error(res.status + ' ' + res.message);
    }
  } catch (error: any) {
    throw Error(error);
  }
}

const extend = () => {
  if (isExent.value) {
    renderData.value = rankInfo.value && rankInfo.value.slice(3, 10);
    window.location.href = '#rank';
  } else {
    renderData.value = rankInfo.value && rankInfo.value.slice(3);
  }
  isExent.value = !isExent.value;
};

onMounted(() => {
  getTokenQuery();
});
</script>

<template>
  <div class="rank-border">
    <div ref="rankContent" class="rank-content">
      <div v-if="isRank" class="rank-box">
        <div class="rank-top">
          <div
            v-for="(item, index) in rankTop"
            :key="index"
            class="top-item"
            :class="`rank` + index"
          >
            <a class="gitee-name" target="_blank" :href="item.giteeRoom">
              {{ item.GiteeId }}
            </a>
            <div class="score">
              {{ item.integralValue }}
              <span>{{ RANK.SCORE }}</span>
            </div>
            <div
              class="rank-box"
              :class="[
                { second: +index === 1 },
                { first: +index === 0 },
                { third: +index === 2 },
              ]"
            >
              <span v-if="+index === 1">{{ RANK.SECOND }}</span>
              <span v-if="+index === 0">{{ RANK.FIRST }}</span>
              <span v-if="+index === 2">{{ RANK.THIRD }}</span>
            </div>
          </div>
        </div>
        <div class="rank-last">
          <div
            v-for="(item, index) in renderData"
            :key="index"
            class="rank-item"
          >
            <div class="rank-left">
              <div class="rank-class">{{ item.rank }}</div>
              <a :href="item.giteeRoom" target="_blank" class="gitee-name">{{
                item.GiteeId
              }}</a>
            </div>
            <div class="rank-right">
              <div class="score">{{ item.integralValue }}</div>
              <span>{{ RANK.SCORE }}</span>
            </div>
          </div>
        </div>
        <div v-if="showAll" class="view-all">
          <a v-if="!isExent" @click="extend()">
            {{ RANK.VIEW_ALL }}
            <div>
              <img src="@/assets/category/internship/right.svg" alt="" />
            </div>
          </a>
          <a v-else @click="extend()">
            {{ RANK.PACK_UP }}
            <div>
              <img
                class="arrow"
                src="@/assets/category/internship/right.svg"
                alt=""
              />
            </div>
          </a>
        </div>
      </div>
      <div v-else class="rank404">
        <div>虚位以待</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rank404 {
  min-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 72px;
  color: #eaeaea;
}
.rank-border {
  border-radius: 8px;
  border: 5px solid #ff7c56;
  border-top: 16px solid #ff7c56;
  background-color: #ff7c56;
}
.rank-content {
  border-radius: 8px;
  padding: 30px 290px 25px;
  background-color: #fff2ee;
  transition: all 0.5s;
  .rank-top {
    display: flex;
    justify-content: center;
    .top-item {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      text-align: center;
      .gitee-name {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
        line-height: 16px;
      }
      .gitee-name:hover {
        color: #002fa7;
      }
      &.rank1 {
        order: -1;
      }
      .score {
        margin: 10px 0 20px;
        font-size: 18px;
        color: #ff644e;
        line-height: 16px;
        span {
          padding-left: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
      .rank-box {
        width: 170px;
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
      }
      .second {
        height: 66px;
        line-height: 66px;
        background: #5dc8ff;
        border: 1px solid #a4e1ff;
      }
      .first {
        position: relative;
        height: 104px;
        line-height: 104px;
        background: #ff7c56;
        border: 1px solid #a4e1ff;
      }
      .third {
        height: 48px;
        line-height: 48px;
        background: #2e9afe;
        border: 1px solid #a4e1ff;
      }
    }
  }
  .rank-last {
    .rank-item:nth-of-type(1) {
      margin-top: 30px;
      border-top: 1px dashed #ff7c56;
    }
    .rank-item {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      margin-bottom: 10px;
      border-bottom: 1px dashed #ff7c56;
      .rank-left,
      .rank-right {
        display: flex;
        align-items: center;
        .rank-class {
          font-size: 24px;
          color: #ff7c56;
        }
        .gitee-name {
          padding-left: 20px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          line-height: 16px;
        }
        .gitee-name:hover {
          color: #002fa7;
        }
      }
      .rank-right {
        .score {
          font-size: 18px;
          color: #ff644e;
          line-height: 16px;
        }
        span {
          padding-left: 30px;
          font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          line-height: 16px;
        }
      }
    }
  }
  .dash {
    padding-top: 50px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #ff7c56;
  }
  .view-all {
    padding-top: 15px;
    font-size: 14px;
    @media (max-width: 1000px) {
      font-size: var(--o-font-size-tip);
    }
    a {
      cursor: pointer;
      display: flex;
      justify-content: center;
      color: var(--o-color-text1);
      div {
        display: flex;
        justify-content: center;
        padding-left: 9px;
        img {
          transform: rotate(90deg);
          transition: 0.3s;
          @media (max-width: 1000px) {
            width: 12px;
            height: 12px;
          }
        }
        .arrow {
          transform: rotate(-90deg);
        }
      }
    }
  }
}
@media (max-width: 1000px) {
  .rank-content {
    border-radius: 8px;
    padding: 26px 15px 10px;
    height: 100%;
    .dash {
      padding-top: 30px;
    }
    .rank-top {
      .top-item {
        .gitee-name {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.5);
        }
        .score {
          margin: 10px 0;
          font-size: 14px;
          span {
            font-size: 12px;
          }
        }
        .rank-box {
          width: 92px;
          font-size: 16px;
          line-height: 24px;
        }
        .second {
          height: 60px;
          line-height: 60px;
        }
        .first {
          height: 85px;
          line-height: 85px;
        }
        .first::after {
          top: -60px;
        }
        .third {
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .rank-last {
      .rank-item:nth-of-type(1) {
        margin-top: 20px;
      }
      .rank-item {
        padding: 14px 0;
        margin: 0;
        border-bottom: 1px dashed #ff7c56;
        .rank-left,
        .rank-right {
          .rank-class {
            font-size: 16px;
          }
          .gitee-name {
            padding-left: 10px;
            font-size: 12px;
          }
        }
        .rank-right {
          .score {
            font-size: 14px;
          }
          span {
            padding-left: 6px;
            font-size: 12px;
          }
        }
      }
    }
    .view-all {
      padding-top: 20px;
    }
  }
}
</style>
