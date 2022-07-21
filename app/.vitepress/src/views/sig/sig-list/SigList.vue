<!--
 * @Author: xjc 2324881835@qq.com
 * @Date: 2022-07-18 16:18:31
 * @LastEditors: xjc 2324881835@qq.com
 * @LastEditTime: 2022-07-21 12:53:54
 * @FilePath: \openEuler-portal\app\.vitepress\src\views\sig\sig-list\SigList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { useData } from 'vitepress';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import TheList from './TheList.vue';
import TheBoard from './TheBoard.vue';
import TheLandscape from './TheLandscape.vue';
import banner from '@/assets/banner-secondary.png';
import illustration from '@/assets/illustrations/search.png';

const { theme: i18n } = useData();
</script>

<template>
  <header>
    <BannerLevel2
      :background-image="banner"
      :illustration="illustration"
      title="SIG"
      :subtitle="i18n.sig.SIG_DESCRIPTION.MEANING"
    />
  </header>
  <div class="sig-ul">
    <ul>
      <li>{{ i18n.sig.SIG_DESCRIPTION.LI1 }}</li>
      <li>{{ i18n.sig.SIG_DESCRIPTION.LI2 }}</li>
      <li>{{ i18n.sig.SIG_DESCRIPTION.LI3 }}</li>
    </ul>
  </div>
  <main>
    <div class="sig-list">
      <OTabs>
        <OTabPane label="SIG List">
          <TheList />
        </OTabPane>
        <OTabPane label="SIG Board">
          <TheBoard />
        </OTabPane>
        <OTabPane label="SIG Landscape">
          <TheLandscape />
        </OTabPane>
      </OTabs>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.sig-ul {
  font-size: var(--o-font-size-text);
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: var(--o-line-height-h8);
  color: var(--o-color-text2);
  max-width: 1380px;
  margin: var(--o-spacing-h1) auto;
  ul {
    list-style: disc;
    li {
      margin-top: var(--o-spacing-h8);
    }
  }
}
.sig-list {
  max-width: 1504px;
  margin: var(--o-spacing-h1) auto;
}
</style>
