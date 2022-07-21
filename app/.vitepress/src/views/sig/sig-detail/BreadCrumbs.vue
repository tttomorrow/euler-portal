<script setup lang="ts">
import IconArrowRight from '~icons/app/right.svg';
</script>
<template>
  <div class="bread-crumbs">
    <span>SIG</span>
    <OIcon>
      <IconArrowRight />
    </OIcon>
    <span>A-Tune</span>
  </div>
</template>
<style lang="scss" scoped>
.bread-crumbs {
  width: 1120px;
  padding: var(--o-spacing-h2) 0;
  font-size: var(--o-font-size-tip);
  line-height: var(--o-line-height-tip);
  display: flex;
  align-items: center;
  span:nth-of-type(1) {
    color: var(--o-color-text3);
  }
  span:nth-of-type(2) {
    margin: 0 4px;
    font-size: var(--o-font-size-h8);
  }
  span:nth-of-type(2),
  span:nth-of-type(3) {
    color: var(--o-color-text2);
  }
}
</style>
