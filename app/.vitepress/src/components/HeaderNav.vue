<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useData } from 'vitepress';

defineProps({
  navItems: {
    type: Object,
    default() {
      return {};
    },
  },
});

interface NavItem {
  id: string;
  label: string;
  path: string;
}

const router = useRouter();
const data = useData();
const activeItem = ref(router.route.path.split('/')[2]);
watch(
  () => router.route.path,
  (val: string) => {
    const p = val.split('/')[2];
    activeItem.value = p;
  }
);

const emits = defineEmits(['nav-click']);
// 点击大导航事件
const handleClick = (item: NavItem) => {
  emits('nav-click', item);
};

// 点击子导航事件
const handleChildClick = (item: NavItem) => {
  if (item.path.includes('https')) {
    window.open(item.path, '_blank');
  } else {
    emits('nav-click', item);
    router.go(`/${data.lang.value}/${item.path}/`);
  }
  isShow.value = false;
};

const isShow = ref(true);
const navActive = ref('');

//鼠标移入大导航事件
const showSub = (item: NavItem) => {
  navActive.value = item.id;
  isShow.value = true;
};

// 鼠标移出大导航事件
const hideSub = () => {
  navActive.value = '';
};
</script>

<template>
  <nav class="o-nav">
    <ul class="o-nav-list">
      <li
        v-for="item in navItems"
        :key="item.id"
        :class="{
          active: activeItem === item.id,
          hover: navActive === item.id,
        }"
        @mouseenter="showSub(item)"
        @mouseleave="hideSub()"
      >
        <span @click="handleClick(item)">{{ item.label }} </span>
        <template v-if="isShow">
          <div class="sub-menu">
            <ul class="sub-menu-content">
              <li
                v-for="children in item.children"
                :key="children.id"
                class="sub-menu-item"
                @click="handleChildClick(children)"
              >
                {{ children.label }}
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.o-nav {
  height: 100%;
  .o-nav-list {
    height: 100%;
    padding: 0;
    margin: 0;
    > li {
      position: relative;
      display: inline-flex;
      align-items: center;
      height: 100%;
      margin: 0 var(--o-spacing-s3);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text2);
      cursor: pointer;

      &.active {
        color: var(--o-color-brand);
        &::after {
          background: var(--o-color-brand);
        }
      }
      &.hover {
        color: var(--o-color-brand);
        .sub-menu {
          transform: translate(-50%) scaleY(1);
        }
        &::after {
          background: var(--o-color-brand);
        }
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 2px;
        border-radius: 1px;
        transition: all 0.3s ease-in-out;
      }

      .sub-menu {
        position: absolute;
        top: 80px;
        left: 50%;
        right: 0;
        background-color: var(--o-color-bg);
        transform: translate(-50%) scaleY(0);
        transform-origin: top;
        transition: all 0.3s ease-in-out;
        display: table;
        z-index: 99;
        &-content {
          margin: 0;
          padding: 0;
        }
        &-item {
          line-height: var(--o-line-height-h3);
          text-align: center;
          font-size: var(--o-font-size-text);
          color: var(--o-color-text2);
          display: block;
          white-space: nowrap;
          padding: 0 var(--o-spacing-s1);
          min-width: 106px;
          &.active {
            background-color: var(--o-color-brand);
            color: var(--theme-card-bg);
          }
          &:hover {
            background-color: var(--o-color-brand);
            color: var(--o-color-text);
          }
        }
      }
    }
  }
}
</style>
