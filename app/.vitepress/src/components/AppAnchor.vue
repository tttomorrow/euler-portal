<script lang="ts" setup>
import { ref, onMounted, onUnmounted, CSSProperties, computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => null,
  },
  offsetValue: {
    type: Number,
    default: 80,
  },
  top: {
    type: String,
    default: '15rem',
  },
  right: {
    type: String,
    default: '24px',
  },
  left: {
    type: String,
    default: 'inherit',
  },
});

// 当前选中项
const selectId = ref('');

const scroll = () => {
  // 为了保证兼容性，这里取两个值，哪个有值取哪一个
  // scrollTop就是触发滚轮事件时滚轮的高度
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;

  //自定义滚动容器滚轮高度
  const targetScrollTop = props.id
    ? (document.querySelector(`#${props.id}`) as HTMLElement).scrollTop
    : 0;

  const targetArr: any = ref([]);
  targetArr.value = props.data.filter((item: string) => {
    const div = document.querySelector(`#${item}`) as HTMLElement;
    return (
      (props.id ? targetScrollTop : scrollTop) + props.offsetValue >
      div.offsetTop
    );
  });

  if (targetArr.value.length) {
    selectId.value =
      targetArr.value.slice(targetArr.value.length - 1).shift() || '';
  }
};

selectId.value = props.data.slice(0, 1).join('') || '';

// 点击滚动事件
const selectAnchor = (id: string) => {
  const doc = document.getElementById(id);
  props.data.forEach((item: string) => {
    if (item === id) {
      const h = doc?.offsetTop;

      const container = props.id
        ? (document.querySelector(`#${props.id}`) as HTMLElement)
        : window;
      container.scrollTo({
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

//自定义样式
const rootStyle = computed(() => {
  const result: CSSProperties = {};
  if (props.top) {
    result.top = props.top;
  }
  if (props.left) {
    result.left = props.left;
  }
  if (props.right) {
    result.right = props.right;
  }
  return result;
});
</script>

<template>
  <div class="anchor" :class="id ? 'scroll-target' : ''" :style="rootStyle">
    <ul>
      <li
        v-for="item in data"
        :key="item"
        class="anchor-item"
        :class="item === selectId ? 'active' : ''"
        @click="selectAnchor(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.anchor {
  position: fixed;
  width: 200px;
  z-index: 99;
  &.scroll-target {
    position: absolute;
  }
  .icon {
    font-size: 34px;
    cursor: pointer;
  }
  &-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 30px;
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text2);
    cursor: pointer;
    &:not(:first-of-type) {
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: -32px;
        left: 5px;
        width: 1px;
        height: 32px;
        border-left: 2px solid var(--o-color-bg4);
      }
    }
    &::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      text-align: center;
      line-height: 26px;
      border-radius: 50%;
      background: var(--o-color-bg);
      margin-right: 20px;
      border: 2px solid var(--o-color-bg4);
    }

    &.active {
      &::before {
        border-color: var(--o-color-brand);
      }
    }
    &:not(:first-of-type) {
      margin-top: 32px;
    }
  }
}
</style>
