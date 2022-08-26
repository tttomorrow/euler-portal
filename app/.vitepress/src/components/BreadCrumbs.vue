<script setup lang="ts">
import { toRefs } from 'vue';
import IconArrowRight from '~icons/app/right.svg';
const props = defineProps({
  bread1: {
    type: String,
    default: '',
  },
  bread2: {
    type: String,
    default: '',
  },
  link1: {
    type: String,
    default: '#',
  },
  link2: {
    type: String,
    default: '#',
  },
});
const { bread1, bread2, link1, link2 } = toRefs(props);
</script>
<template>
  <div class="bread-crumbs">
    <span>
      <a :href="link1">{{ bread1 }}</a>
    </span>
    <OIcon>
      <IconArrowRight />
    </OIcon>
    <span
      ><a :href="link2" :class="link2 === '#' ? 'no-click' : ''">{{
        bread2
      }}</a></span
    >
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.bread-crumbs {
  width: 100%;
  font-size: var(--o-font-size-tip);
  line-height: var(--o-line-height-text);
  display: flex;
  align-items: center;
  span:nth-of-type(1) {
    a {
      color: var(--e-color-text4);
    }
  }
  span:nth-of-type(2) {
    margin: 0 4px;
    font-size: var(--o-font-size-h8);
  }
  span:nth-of-type(2),
  span:nth-of-type(3) {
    color: var(--e-color-text1);
    a {
      color: var(--e-color-text1);
    }
    .no-click {
      cursor: default;
    }
  }
}
</style>
