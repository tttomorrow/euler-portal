<script setup lang="ts">
import { computed, useAttrs } from 'vue';

const attrs = useAttrs();

const drawerClassNames = computed(() => {
  return `${attrs['custom-class']} o-drawer`;
});

const modalClassNames = computed(() => {
  return attrs['modal-class']
    ? `${attrs['modal-class']} o-drawer-modal`
    : 'o-drawer-modal';
});
</script>

<template>
  <ElDrawer
    v-bind="attrs"
    :custom-class="drawerClassNames"
    append-to-body
    :modal-class="modalClassNames"
  >
    <template #header>
      <slot name="header"></slot>
    </template>

    <slot></slot>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </ElDrawer>
</template>

<style lang="scss">
.o-drawer {
  --o-drawer-bg: var(--e-color-bg2);
  &.el-drawer {
    background-color: var(--o-drawer-bg);
  }
}

.o-drawer-modal {
  --o-drawer-modal-bg: var(--e-color-bg6);
  &.el-overlay {
    background-color: var(--o-drawer-modal-bg);
  }
}
</style>
