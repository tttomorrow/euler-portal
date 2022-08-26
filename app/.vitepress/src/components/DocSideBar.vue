<script lang="ts" setup></script>

<template>
  <aside class="sidebar">
    <slot></slot>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 40px 0;
  min-height: calc(100vh - 258px);
  width: 300px;
  overflow-y: auto;
  color: var(--e-color-text2);
  background-color: var(--e-color-brand1);
  border-right: 1px solid var(--o-color-division);
  font-weight: normal;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: var(--o-color-division);
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0;
    box-shadow: none;
    background: var(--o-color-bg);
    // background:transparent;
  }

  &-title + .sidebar-title {
    margin-top: 28px;
  }
}
</style>
