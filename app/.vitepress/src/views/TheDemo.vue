<script setup lang="ts">
import { ref } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerLevel3 from '@/components/BannerLevel3.vue';

import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';

const name = ref('zhangsan');
</script>

<template>
  <div class="demo">
    <h4>BannerLevel2.vue</h4>
    <BannerLevel2
      :background-image="banner"
      background-text="CONTENT"
      title="SIG"
      subtitle="SIG 就是 Special Interest Group 的缩写，openEuler 社区按照不同的 SIG 来组织"
      :illustration="search"
    />

    <h4>BannerLevel3.vue</h4>
    <BannerLevel3
      :background-image="banner"
      background-text="CONTENT"
      title="下载"
    />

    <h4>OButton</h4>
    <OButton>OButton</OButton>

    <h4>封装elementplus OInput</h4>
    <OInput v-model="name"></OInput>

    <h4>封装elementplus OCard</h4>
    <OCard header="OCard" shadow="hover"></OCard>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  max-width: 1504px;
  padding: 20px 44px;
  min-height: 800px;
}

h4 {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
