<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '@/i18n';

defineProps({
  data: {
    type: Array as () => any[],
    default: () => [],
  },
});

const i18n = useI18n();

const sigDetail = computed(() => {
  return i18n.value.sig.SIG_DETAIL;
});
</script>
<template>
  <div
    v-for="(item, index) in data"
    :key="item.repo"
    class="block-content"
    :class="index % 2 ? '' : 'bg-color'"
  >
    <div class="block-detail">
      <p>{{ sigDetail.REPOSITORY_NAME }}:</p>
      <a :href="`https://gitee.com/${item.repo}`">
        {{ item.repo }}
      </a>
      <p>Maintainer:</p>
      <p>{{ item.maintainers.join('、') }}</p>
      <p>Committer:</p>
      <p>{{ item.gitee_id.join('、') }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.block-content {
  padding: var(--o-spacing-h5);
  font-size: var(--o-font-size-tip);
  line-height: var(--o-line-height-tip);
  .block-detail {
    display: grid;
    grid-template-columns: 70px auto;
    grid-row-gap: var(--o-spacing-h8);
  }
}
.bg-color {
  background-color: var(--e-color-bg4);
}
</style>
