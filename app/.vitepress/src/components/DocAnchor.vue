<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';

import _ from 'lodash';

const route = useRoute();

const activeIndex = ref(0);
const anchorList = ref();

const debounceEvent = _.throttle(goAnchor, 300, {
  trailing: true,
});

function goAnchor() {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  anchorList.value = document.querySelectorAll('.migration-content h2');

  const topArr: number[] = [];

  anchorList.value.forEach((item: HTMLElement) => {
    topArr.push(item.offsetTop + item.clientHeight);
  });

  for (let i = 0; i < topArr.length; i++) {
    if (scrollTop - 100 <= topArr[i]) {
      activeIndex.value = i;
      break;
    }
  }
}

onMounted(() => {
  goAnchor();
  window.addEventListener('scroll', debounceEvent);
});
onUnmounted(() => {
  window.removeEventListener('scroll', debounceEvent);
});
watch(
  () => {
    return route.path;
  },
  () => {
    nextTick(() => {
      goAnchor();
    });
  }
);
</script>
<template>
  <div class="md-anchor">
    <a
      v-for="(item, index) in anchorList"
      :key="item.id"
      :href="`#${item.id}`"
      :class="{ 'active-link': index === activeIndex }"
      class="anchor-link"
    >
      <div class="anchor-link-inner">
        {{ item.id }}
      </div>
    </a>
  </div>
</template>

<style lang="scss">
.md-anchor {
  position: fixed;
  top: calc(10% + 80px);
  right: 0;
  width: 200px;
  @media screen and (max-width: 1830px) {
    display: none;
  }
  .anchor-link {
    display: block !important;
    cursor: pointer;
    color: var(--o-color-text4);
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
    border-left: 2px solid var(--o-color-bg4);
    &:hover {
      color: var(--o-color-text1);
    }
    &-inner {
      padding: 4px var(--o-spacing-h6);
    }
  }
  .active-link {
    color: var(--o-color-brand1);
    border-left: 2px solid var(--o-color-brand1);
  }
}
</style>
