<script setup lang="ts">
import { ref } from 'vue';
import TheThirdAfter from './components/TheThirdAfter.vue';
import TheSecondDay from './components/TheSecondDay.vue';

defineProps({
  agendaData: {
    required: true,
    type: Array,
    default: () => [],
  },
});

const scheduleId = ref(0);
const tableIndex = ref(0);

const changeTaber = (index: number): void => {
  scheduleId.value = index;
  tableIndex.value = 0;
};
const changeTabItem = (event: any): void => {
  tableIndex.value = parseInt(event.index);
};
</script>

<template>
  <div class="schedule">
    <div class="schedule-time">
      <div
        v-for="(item, index) in (agendaData as any).AGENDA_DATA_TITLE"
        :key="item"
        :class="[
          'schedule-time-taber',
          scheduleId === index ? 'schedule-time-taber-active' : '',
        ]"
        @click="changeTaber(index)"
      >
        <div class="schedule-time-taber-top">
          {{ item }}
        </div>
        <div class="schedule-time-taber-bottom">APRIL</div>
      </div>
    </div>
    <div class="schedule-body">
      <div v-if="scheduleId === 0" class="schedule-body-first">
        <div
          v-for="item in (agendaData as any).AGENDA_DATA_13.SCHEDULE"
          :key="item.TIME"
          class="first-item"
        >
          <div class="first-item-time">
            {{ item.TIME }}
          </div>
          <div class="first-item-detail">
            <div
              v-for="subItem in item.SCHEDULE_LIST"
              :key="subItem"
              class="first-item-detail-subitem"
            >
              {{ subItem }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="scheduleId === 1" class="schedule-body-second">
        <TheSecondDay :second-data="(agendaData as any).AGENDA_DATA_14" />
      </div>
      <div v-if="scheduleId === 2" class="schedule-body-third">
        <div class="schedule-body-third-time">
          <OTabs @tab-click="changeTabItem">
            <OTabPane
              v-for="item in (agendaData as any).AGENDA_DATA_15.TIME_TITLE"
              :key="item.EN"
              :label="item.ZH"
            ></OTabPane>
          </OTabs>
        </div>
        <div class="schedule-body-third-body">
          <div v-show="tableIndex === 0" class="third-morning">
            <div
              v-for="(item, index) in (agendaData as any).AGENDA_DATA_15
                .SCHEDULE"
              :key="item.TIEM"
              class="third-morning-item"
            >
              <div class="third-morning-item-left">{{ item.TIME }}</div>
              <div class="third-morning-item-right">
                <div class="item-right-text">{{ item.TEXT }}</div>
                <div class="item-right-speak">
                  <div v-if="index === 10 || index === 11" class="host-guest">
                    <div
                      v-for="hotItem in (agendaData as any).AGENDA_DATA_15.HOST"
                      :key="hotItem"
                      class="host-guest-item"
                    >
                      {{ hotItem }}
                    </div>
                  </div>
                  <div class="item-box">
                    <div
                      v-for="subItem in item.SPEAKER"
                      :key="subItem.NAME"
                      class="item-box-speak"
                    >
                      <div class="item-box-speak-name">{{ subItem.NAME }}</div>
                      <div class="item-box-speak-position">
                        {{ subItem.POSITION }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="tableIndex === 1" class="third-afternoon">
            <TheThirdAfter
              :third-data="(agendaData as any).AGENDA_DATA_15.SCHEDULE_AFTERNOON"
            />
            <TheThirdAfter
              :third-data="(agendaData as any).AGENDA_DATA_15.SCHEDULE_AFTERNOON_LAST"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.schedule {
  &-time {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: var(--o-spacing-h4);
    margin-bottom: var(--o-spacing-h2);
    &-taber {
      cursor: pointer;
      margin-right: var(--o-spacing-h4);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #cbcbcb;
      border: 1px solid #cbcbcb;
      &-top {
        padding: var(--o-spacing-h6) var(--o-spacing-h4);
        font-size: var(--o-font-size-h4);
        line-height: var(--o-line-height-h4);
        font-weight: 500;
        border-bottom: 1px solid #cbcbcb;
      }
      &-bottom {
        padding: var(--o-spacing-h9) var(--o-spacing-h6);
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        font-weight: 400;
      }
    }
    &-taber-active {
      background-color: var(--o-color-brand);
      color: var(--o-color-text);
    }
  }
  &-body {
    font-size: var(--o-font-size-h7);
    &-first {
      .first-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 1080px) {
          display: block;
        }
        &-time {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background-color: var(--o-color-brand);
          color: var(--o-color-text);
          width: 252px;
          padding: var(--o-spacing-h4) 0;
          margin-bottom: var(--o-spacing-h4);
          @media (max-width: 1080px) {
            margin: 0 auto var(--o-spacing-h4) auto;
          }
        }
        &-detail {
          display: flex;
          width: 100%;
          @media (max-width: 1080px) {
            display: block;
          }
          &-subitem {
            margin-bottom: var(--o-spacing-h4);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            text-align: center;
            margin-left: var(--o-spacing-h4);
            padding: var(--o-spacing-h4) 0;
            background-color: var(--o-color-bg);
            color: var(--o-color-text2);
            box-shadow: var(--o-shadow-base);
            &:hover {
              box-shadow: var(--o-shadow-base_hover);
            }
            @media (max-width: 1080px) {
              width: 340px;
              margin: 0 auto var(--o-spacing-h4) auto;
            }
          }
        }
      }
    }
    &-third {
      &-time {
        width: 100px;
        margin: 0 auto;
      }
      &-body {
        .third-morning {
          &-item {
            display: flex;
            align-items: center;
            color: var(--o-color-text);
            background-color: var(--o-color-brand);
            box-shadow: var(--o-shadow-base);
            margin-bottom: var(--o-spacing-h4);
            padding: var(--o-spacing-h4) var(--o-spacing-h3);
            &-right {
              margin-left: 400px;
              .item-right-text {
                margin-bottom: var(--o-spacing-h4);
              }
              .item-right-speak {
                display: flex;
                font-size: var(--o-font-size-h8);
                .host-guest-item {
                  margin-bottom: var(--o-spacing-h5);
                }
                .item-box-speak {
                  display: flex;
                  margin-bottom: var(--o-spacing-h5);
                  &-name {
                    width: 55px;
                    margin-right: var(--o-spacing-h4);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
