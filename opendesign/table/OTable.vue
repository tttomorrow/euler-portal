<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElTable class="o-table" v-bind="attrs">
    <slot></slot>
  </ElTable>
</template>

<style lang="scss">
.o-table {
  &.el-table {
    --el-table-header-bg-color: var(--o-color-bg4);
    color: var(--e-color-text4);
    --el-table-border-color: none;
    thead {
      color: var(--e-color-text1);
    }
    th.el-table__cell.is-leaf {
      border-bottom: none;
    }
    tr {
      background: var(--e-color-bg2);
      td {
        color: var(--e-color-text4);
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
