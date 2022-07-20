<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElTable class="o-table" v-bind="attrs">
    <slot></slot>
  </ElTable>
</template>

<style lang="scss" scoped>
.o-table {
  :deep.el-table {
    --el-table-header-bg-color: #e5e8f0;
    thead {
      color: #000;
    }
    .el-table__header-wrapper {
      background-color: #e5e8f0;
    }
    .el-table__cell {
      padding: 16px 0;
    }
    .cell {
      padding: 0 40px;
    }
  }
}
</style>
