<script setup lang="ts">
import { useAttrs, nextTick, onUnmounted } from 'vue';
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
    const isBottom = this.scrollHeight - this.scrollTop <= this.clientHeight;
    if (isBottom) {
      emit('scorll-bottom');
    }
  },
  300,
  {
    trailing: true,
  }
);

let optionDom: null | HTMLElement = null;
function scrollEvent(val) {
  if (val && props.listenerScorll) {
    nextTick(() => {
      optionDom = document.querySelector(
        '.el-select-dropdown .el-select-dropdown__wrap'
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
  <ElSelect class="o-select" v-bind="attrs" @visible-change="scrollEvent">
    <slot> </slot>
  </ElSelect>
</template>

<style lang="scss">
.o-select {
  border: none;
  --el-select-border-color-hover: #fff !important;
  .el-input__wrapper {
    border-radius: 0;
    box-shadow: var(--o-shadow-base);
    &:hover {
      border: none;
    }
  }
  .el-input__suffix {
    height: 40px;
    .el-icon {
      svg {
        color: var(--e-color-text1);
      }
    }
  }
}
</style>
