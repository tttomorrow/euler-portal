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
    --el-table-header-bg-color: var(--e-color-bg4);
    --el-table-row-hover-bg-color: var(--e-color-bg3);
    --el-table-border-color: var(--e-color-division1);
    box-shadow: var(--e-shadow-l1);
    color: var(--e-color-text4);
    --el-table-border: none;
    .el-table__empty-block {
      background-color: var(--e-color-bg2);
    }
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
        &::after {
          width: 100%;
          background: var(--e-color-division1);
          content: ' ';
          display: inline-block;
          height: 1px;
          position: absolute;
          bottom: 0;
          z-index: 10000;
        }
        &:first-child::after {
          width: 100%;
          background: var(--e-color-division1);
          content: ' ';
          display: inline-block;
          height: 1px;
          position: absolute;
          bottom: 0;
          left: 16px;
          z-index: 10000;
        }
        &:last-child::after {
          width: 100%;
          background: var(--e-color-division1);
          content: ' ';
          display: inline-block;
          height: 1px;
          position: absolute;
          bottom: 0;
          right: 16px;
          z-index: 10000;
        }
      }
    }

    .el-table__header-wrapper {
      background-color: var(--e-color-greyblue1);
    }
    .el-table__cell {
      padding: var(--o-spacing-h5) 0;
    }
    .cell {
      padding: 0 var(--o-spacing-h5);
    }
    .el-table__inner-wrapper::before {
      background: var(--e-color-bg1);
    }
  }
}
</style>
