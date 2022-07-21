<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  data: {
    type: Array,
    default: () => [],
  },
  offsetValue: {
    type: Number,
    default: 80,
  },
  top: {
    type: String,
    default: '16rem',
  },
  right: {
    type: String,
    default: '40px',
  },
});

const selectId = ref('');

const scroll = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;

  const targetArr: any = ref([]);
  targetArr.value = props.data.filter(function (item) {
    return (
      scrollTop + props.offsetValue >
      (document.getElementById(item) as HTMLAnchorElement).offsetTop
    );
  });

  if (targetArr.value.length) {
    selectId.value =
      targetArr.value.slice(targetArr.value.length - 1).join('') || '';
  }
};

selectId.value = props.data.slice(0, 1).shift() || '';

const selectAnchor = (id: string) => {
  const doc = document.getElementById(id);
  props.data.forEach((item) => {
    if (item === id) {
      const h = doc?.offsetTop;
      window.scrollTo({
        left: 0,
        top: h,
        behavior: 'smooth',
      });
    }
  });
};

// const scrollToTop = () => {
//   const body = document.getElementById(props.id) || document.documentElement;
//   body.scrollTop = 0;
// };

onMounted(() => {
  const body = props.id ? document.getElementById(props.id) : window;
  body?.addEventListener('scroll', scroll);
});

onUnmounted(() => {
  const body = props.id ? document.getElementById(props.id) : window;
  body?.removeEventListener('scroll', scroll);
});
</script>

<template>
  <div class="anchor" :style="{ top, right }">
    <div
      v-for="item in data"
      :key="item"
      class="anchor-item"
      :class="item === selectId ? 'active' : ''"
    >
      <div class="item">
        <div class="circle"></div>
        <a :title="item" class="label" @click="selectAnchor(item)">
          {{ item }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.anchor {
  position: fixed;
  width: 200px;
  z-index: 99;
  .icon {
    font-size: 34px;
    cursor: pointer;
  }
  &-item {
    border-left: 2px solid #bfbfbf;
    margin-left: 16px;
    position: relative;
    height: 48px;
    .item {
      position: absolute;
      bottom: -3px;
      left: -7px;
      display: flex;
      align-items: center;
      .circle {
        width: 12px;
        height: 12px;
        border: 2px solid #bfbfbf;
        border-radius: 50%;
        display: inline-block;
        background-color: #ffffff;
      }
      .label {
        font-size: var(--o-font-size-h8);
        color: var(--o-color-text2);
        margin-left: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 180px;
        cursor: pointer;
      }
    }
    &.active {
      .circle {
        border-color: var(--o-color-brand);
      }
      .label {
        color: var(--o-color-brand);
      }
    }
  }
  .first-line {
    height: 30px;
  }
}
</style>
