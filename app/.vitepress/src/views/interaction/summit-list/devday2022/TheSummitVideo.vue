<script setup lang="ts">
import { ref } from 'vue';
interface RENDERDATA {
  ID: number;
  THEME: string;
  OPTION: string;
  LIVEURL: string;
  TIME?: string;
}

const props = defineProps({
  liveData: {
    required: true,
    type: Array,
    default: () => [],
  },
});
const renderData: Array<RENDERDATA> = (props.liveData as any).RENDERDATA;
const nowLiveSrc = ref(renderData[0].LIVEURL);
const roomId = ref(0);
const tabLiveRoom = (src: string, index: number): void => {
  roomId.value = index;
  nowLiveSrc.value = src;
};
</script>

<template>
  <div class="live-room">
    <iframe
      height="550"
      allow="camera *;microphone *;"
      border="0"
      scolling="no"
      :src="nowLiveSrc"
      allowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      class="live-room-video"
    ></iframe>
    <div class="live-room-web">
      <div class="live-room-web-itembox">
        <div
          v-for="(item, index) in renderData"
          :key="item.ID"
          :class="[
            'live-room-web-itembox-live',
            roomId === index ? 'live-room-web-itembox-live-active' : '',
            index === 0
              ? 'live-room-web-itembox-live-main'
              : 'live-room-web-itembox-live-second',
          ]"
          @click="tabLiveRoom(item.LIVEURL, index)"
        >
          <p>{{ item.THEME }}</p>
          <p>{{ item.TIME }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.live-room {
  &-video {
    margin-bottom: var(--o-spacing-h2);
    width: 100%;
    display: block;
    border: none;
    @media (max-width: 780px) {
      margin-top: var(--o-spacing-h3);
    }
  }
  &-web {
    &-itembox {
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      &-live {
        width: 163px;
        padding: var(--o-spacing-h6) 0;
        cursor: pointer;
        background-color: var(--o-color-bg);
        box-shadow: var(--o-shadow-base);
        p {
          color: var(--o-color-brand);
          font-size: var(--o-font-size-h7);
          padding: var(--o-spacing-h8);
        }
        @media (max-width: 780px) {
          margin-top: var(--o-spacing-h4);
        }
      }
      &-live-main {
        width: 100%;
        margin-bottom: var(--o-spacing-h2);
        padding-top: var(--o-spacing-h4);
      }
      &-live-active {
        background-color: var(--o-color-brand);
        p {
          color: var(--o-color-text);
        }
      }
    }
  }
}
</style>
