<script setup lang="ts">
import { useAttrs, ref } from 'vue';
const attrs = useAttrs();
const tree = ref(null);
defineExpose({
  tree,
});
</script>

<template>
  <ElTree ref="tree" class="o-tree" v-bind="attrs"></ElTree>
</template>

<style lang="scss">
.o-tree {
  --o-font-color: var(--o-color-text2);
  --o-card-bg-color: var(--o-color-bg);
  --o-card-border-color: var(--o-color-border);
  &.el-tree-node {
    color: var(--o-font-color);
    border-radius: 0;
    background-color: var(--o-color-bg);
    border: none;
  }
}
</style>
