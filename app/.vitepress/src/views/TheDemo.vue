<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { theme } = useData();
const i18n = theme.value;
const { t, locale } = useI18n();
const home = computed(() => {
  return { info: t('button1') };
});

const name = ref('');

onMounted(() => {
  window.addEventListener('click', () => {
    locale.value = locale.value === 'zh' ? 'en' : 'zh';
  });
});
</script>
<template>
  <div class="demo">
    <h1>{{ i18n.a }}</h1>
    <h1>{{ home.info }}</h1>
    <OButton>sss</OButton>
    <!-- <ElInput /> -->
    <h4>封装elementplus</h4>
    <OInput v-model="name"></OInput>
    <h4>封装elementplus</h4>
    <OCard header="b" shadow="hover"></OCard>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  min-height: 800px;
}

h4 {
  margin-top: 20px;
}
</style>
