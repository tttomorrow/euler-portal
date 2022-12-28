<script setup lang="ts">
import AOS from 'aos';
import { computed, onMounted } from 'vue';

const props = defineProps({
  lecturerList: {
    type: Object,
    required: true,
    default: () => null,
  },
  shape: {
    type: String,
    default: 'circle',
  },
  webColumnsNum: {
    type: Number,
    default: 4,
  },
  mobileColumnsNum: {
    type: Number,
    default: 2,
  },
});

const summitStyle = computed(() => {
  return {
    '--shape': props.shape,
    '--webColumnsNum':
      props.webColumnsNum < 1
        ? 4
        : props.webColumnsNum > 8
        ? 8
        : props.webColumnsNum,
    '--mobileColumnsNum':
      props.mobileColumnsNum < 1
        ? 1
        : props.mobileColumnsNum > 2
        ? 2
        : props.mobileColumnsNum,
  };
});
onMounted(() => {
  AOS.init({
    offset: 200,
    duration: 800,
    delay: 100,
  });
});
</script>

<template>
  <div class="lecturer-list" :style="(summitStyle as any)">
    <div
      v-for="item in lecturerList"
      :key="item.NAME"
      data-aos="fade-zoom-in"
      class="lecturer-list-item"
    >
      <slot name="img">
        <div
          :class="
            summitStyle['--shape'] === 'square'
              ? 'lecturer-list-item-square'
              : 'lecturer-list-item-circle'
          "
        >
          <img :src="item.img" />
        </div>
      </slot>
      <slot name="name">
        <p>{{ item.name }}</p>
      </slot>
      <slot name="title">
        <div
          v-for="titleItem in item.position"
          :key="titleItem"
          class="lecturer-list-item-title"
        >
          <p>{{ titleItem }}</p>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dark img {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.lecturer-list {
  margin: var(--o-spacing-h2) auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 76px;
  @media (max-width: 1796px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1645px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1465px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1175px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1068px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 780px) {
    display: grid;
    gap: 16px;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }
  &-item {
    width: 100%;
    @media (max-width: 780px) {
      width: 100%;
      margin: 0 auto;
    }
    &-square {
      display: block;
      height: 130px;
      width: 130px;
      overflow: hidden;
      position: relative;
      left: 10%;
      img {
        width: 190px;
        height: 190px;
        position: relative;
        bottom: 20%;
        right: 25%;
      }
    }
    &-circle {
      img {
        width: 100px;
        margin: 0 auto;
        display: block;
        // @media (max-width: 780px) {
        //   width: 95px;
        //   height: 95px;
        // }
      }
    }
    p {
      font-size: var(--o-spacing-h5);
      color: var(--o-color-text1);
      text-align: center;
      margin-top: 8px;
      @media (max-width: 780px) {
        margin-top: 10px;
      }
    }
    &-title {
      p {
        color: var(--o-color-text4);
        font-size: var(--o-font-size-tip);
        font-weight: 400;
        @media (max-width: 780px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      @media (max-width: 780px) {
        margin-bottom: var(--o-spacing-h7);
      }
    }
  }
}
</style>
