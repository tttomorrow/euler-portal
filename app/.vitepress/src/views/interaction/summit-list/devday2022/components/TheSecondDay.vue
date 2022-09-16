<script setup lang="ts">
import { ref, computed } from 'vue';
import useWindowResize from '@/components/hooks/useWindowResize';
defineProps({
  secondData: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
});

const screenWidth = useWindowResize();
const tabIndex = ref(0);
const isMobile = computed(() => {
  return screenWidth.value <= 768 ? true : false;
});

const changeTabItem = (event: any): void => {
  tabIndex.value = Number(event.index);
};
</script>

<template>
  <div class="schedule-body-second-time">
    <OTabs @tab-click="changeTabItem">
      <OTabPane
        v-for="item in (secondData as any).TIME_TITLE"
        :key="item"
        :label="item.ZH"
      ></OTabPane>
    </OTabs>
  </div>
  <div v-show="!isMobile" class="schedule-body-second-body">
    <div class="second-body-left">
      <div
        v-for="item in (secondData as any).COLUMN_TITLE[
                tabIndex
              ].TIME"
        :key="item.ZH"
        class="second-body-left-item"
      >
        <p>{{ item.ZH }}</p>
        <p class="second-body-left-item-en">{{ item.EN }}</p>
      </div>
    </div>
    <div class="second-body-right">
      <div class="second-body-right-title">
        <div
          v-for="item in tabIndex === 0 ?
          (secondData as any).TITLE : tabIndex === 1 ?
          (secondData as any).TITLE_AFTERNOON:
          (secondData as any).TITLE_NIGHT"
          :key="item"
          class="right-title-item"
        >
          {{ item }}
        </div>
      </div>
      <div class="second-body-right-box">
        <div
          v-for="item in tabIndex === 0 ?
          (secondData as any).SCHEDULE : tabIndex === 1 ?
          (secondData as any).SCHEDULE_AFTERNOON:
          (secondData as any).SCHEDULE_NIGHT"
          :key="item"
          class="right-box-column"
        >
          <div
            v-for="subItem in item.SCHEDULE_CARD"
            :key="subItem"
            class="right-box-column-card"
          >
            <div>
              {{ subItem.TEXT }}
            </div>
            <div class="right-box-column-card-right">
              <div class="dialogue">
                {{ (secondData as any).RIGHT_TEXT[0] }}
              </div>
              <div class="etherpad">
                {{ (secondData as any).RIGHT_TEXT[1] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="isMobile" class="schedule-body-second-body-mo">
    <div class="mo-title">{{ (secondData as any).MO_TITLE }}</div>
    <div class="mo-box">
      <div
        v-for="item in tabIndex === 0 ?
          (secondData as any).SCHEDULE : tabIndex === 1 ?
          (secondData as any).SCHEDULE_AFTERNOON :
          (secondData as any).SCHEDULE_NIGHT"
        :key="item.TITLE.ZH"
        class="mo-box-card"
      >
        <div class="mo-box-card-title">
          <h4>{{ item.TITLE.ZH }}</h4>
          <h4>{{ item.TITLE.EN }}</h4>
        </div>
        <div
          v-for="subItem in item.SCHEDULE_CARD"
          :key="subItem.TEXT"
          class="mo-box-card-detail"
        >
          <div class="detail-left">
            <div class="detail-left-text">
              {{ subItem.TEXT.replace('、', ' ') }}
            </div>
            <div class="detail-left-time">
              {{ subItem.TIME }}
            </div>
          </div>
          <div class="detail-right">
            <div class="dialogue">
              {{ (secondData as any).RIGHT_TEXT[0] }}
            </div>
            <div class="etherpad">
              {{ (secondData as any).RIGHT_TEXT[1] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.schedule-body-second {
  &-time {
    width: 170px;
    margin: 0 auto;
  }
  &-body {
    display: flex;
    margin-top: var(--o-spacing-h4);
    .second-body-left {
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 220px;
        height: 94px;
        background-color: var(--o-color-brand1);
        color: var(--o-color-text2);
        font-size: var(--o-font-size-h7);
        margin-bottom: var(--o-spacing-h4);
        &-en {
          font-size: var(--o-font-size-text);
          margin-top: var(--o-spacing-h7);
        }
      }
    }
    .second-body-left-item:first-child {
      height: 48px;
    }
    .second-body-right {
      margin-left: var(--o-spacing-h3);
      flex: 1;
      &-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--o-font-size-h4);
        .right-title-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          width: 100%;
          color: var(--o-color-text1);
          background-color: var(--o-color-bg2);
          margin-right: var(--o-spacing-h5);
          box-shadow: var(--o-shadow-l1);
        }
        .right-title-item:last-child {
          margin: 0;
        }
      }
      &-box {
        .right-box-column {
          display: flex;
          margin-bottom: var(--o-spacing-h4);
          &-card {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: space-between;
            padding: var(--o-spacing-h5) 0 var(--o-spacing-h5)
              var(--o-spacing-h5);
            height: 94px;
            margin-right: var(--o-spacing-h5);
            color: var(--o-color-text1);
            background-color: var(--o-color-bg2);
            box-shadow: var(--o-shadow-l1);
            &-right {
              display: flex;
              flex-direction: column;
              .dialogue,
              .etherpad {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 46px;
                font-size: var(--o-font-size-text);
                color: var(--o-color-brand1);
                background-color: rgb(229, 234, 246);
              }
              .dialogue:hover,
              .etherpad:hover {
                background-color: var(--o-color-brand1);
                color: var(--o-color-text2);
              }
              .etherpad {
                margin-top: 2px;
              }
            }
          }
          .right-box-column-card:last-child {
            margin-right: 0px;
          }
        }
      }
    }
  }
  &-body-mo {
    display: block;
    .mo-title {
      margin-bottom: var(--o-spacing-h5);
      text-align: center;
      font-weight: 700;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text1);
    }
    .mo-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &-card {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        &-title {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-bottom: var(--o-spacing-h5);
          width: 315px;
          height: 48px;
          color: var(--o-color-text2);
          background-color: var(--o-color-brand1);
        }
        &-detail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          line-height: var(--o-line-height-text);
          width: 100%;
          height: 70px;
          padding: var(--o-spacing-h6) 0 var(--o-spacing-h6) var(--o-spacing-h4);
          box-shadow: var(--o-shadow-l1);
          margin-bottom: var(--o-spacing-h4);
          .detail-left {
            color: var(--o-color-text1);
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-h8);
            text-align: left;
          }
          .detail-right {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .dialogue,
            .etherpad {
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 34px;
              font-size: var(--o-font-size-text);
              color: var(--o-color-brand1);
              background-color: rgb(229, 234, 246);
            }
            .dialogue:hover,
            .etherpad:hover {
              background-color: var(--o-color-brand1);
              color: var(--o-color-text2);
            }
            .etherpad {
              margin-top: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
