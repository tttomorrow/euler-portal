<script lang="ts" setup></script>

<template>
  <aside class="sidebar">
    <div class="m">
      <slot></slot>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.m {
  position: sticky;
}
.sidebar {
  position: fixed;
  left: 0;
  top: 80px;
  bottom: 0;
  padding: 40px 0;
  min-height: calc(100vh - 258px);
  width: 300px;
  overflow-y: auto;
  color: var(--e-color-text2);
  background-color: var(--e-color-brand1);
  border-right: 1px solid var(--o-color-division);
  font-weight: normal;

  @media screen and (max-width: 1100px) {
    top: 48px;
  }

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
