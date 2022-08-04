<script lang="ts" setup>
import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>
<template>
  <ElOption v-bind="attrs" class="o-option">
    <slot> </slot>
  </ElOption>
</template>

<style lang="scss">
.el-popper__arrow {
  display: none;
}
.el-popper {
  border-radius: 0 !important;
}
</style>
