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
    --el-table-header-bg-color: var(--o-color-bg3);
    color: var(--o-color-text3);
    --el-table-border-color: none;
    thead {
      color: var(--o-color-text2);
    }
    th.el-table__cell.is-leaf {
      border-bottom: none;
    }
    tr {
      background: var(--o-color-bg);
      td {
        color: var(--o-color-text3);
      }
    }
    .el-table__header-wrapper {
      background-color: #e5e8f0;
    }
    .el-table__cell {
      padding: var(--o-spacing-h5) 0;
    }
    .cell {
      padding: 0 var(--o-spacing-h4);
    }
  }
}
</style>
