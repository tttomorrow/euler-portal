<script setup lang="ts">
import { useAttrs, nextTick, onUnmounted, computed } from 'vue';
import { debounce } from 'lodash';

const attrs = useAttrs();
const props = defineProps({
  listenerScorll: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['scorll-bottom']);

const debounceEvent = debounce(
  function () {
    const isBottom =
      this.scrollHeight - this.scrollTop - 10 <= this.clientHeight;
    if (isBottom) {
      emit('scorll-bottom');
    }
  },
  300,
  {
    trailing: true,
  }
);

const classNames = computed(() => {
  return `${attrs['custom-class']} o-select-dropdown`;
});

let optionDom: null | HTMLElement = null;
function scrollEvent(val) {
  if (val && props.listenerScorll) {
    nextTick(() => {
      optionDom = document.querySelector(
        '.el-select__popper[aria-hidden="false"] .el-select-dropdown .el-select-dropdown__wrap'
      );
      if (optionDom) {
        optionDom.addEventListener('scroll', debounceEvent);
      }
    });
  }
}
onUnmounted(() => {
  if (optionDom) {
    optionDom.removeEventListener('scroll', debounceEvent);
  }
});
</script>

<template>
  <ClientOnly>
    <ElSelect
      class="o-select"
      :popper-class="classNames"
      v-bind="attrs"
      @visible-change="scrollEvent"
    >
      <slot> </slot>
    </ElSelect>
  </ClientOnly>
</template>

<style lang="scss">
.o-select {
  --o-select-font-tip: var(--o-font-size-tip);
  --o-select-font-text2: var(--o-color-text2);
  --o-select-color-bg: var(--e-color-bg2);
  --o-select-shadow: var(--o-shadow-base);
  --o-select-shadow_hover: var(--o-shadow-base_hover);
  border: none;
  --el-select-border-color-hover: transparent !important;
  &:hover {
    box-shadow: var(--o-select-shadow_hover);
  }
  .el-input__wrapper {
    background-color: var(--o-select-color-bg);
    border-radius: 0;
    box-shadow: var(--o-select-shadow);
    &:hover {
      border: none;
    }
  }
  .el-input__suffix {
    height: 40px;
    .el-icon {
      svg {
        color: var(--o-select-font-text2);
      }
    }
  }
  @media screen and (max-width: 867px) {
    .el-input {
      height: 34px;
      .el-input__wrapper {
        padding: var(--o-spacing-h8);
        .el-input__inner {
          font-size: var(--o-select-font-tip);
        }
      }
      .el-input__suffix {
        height: 34px;
      }
    }
  }
}
</style>
