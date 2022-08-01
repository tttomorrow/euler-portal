<script setup lang="ts">
import UserCase from './UserCase.vue';
import CommunityActivity from './CommunityActivity.vue';
import HomeBanner from './HomeBanner.vue';
import HomeCarousel from './HomeCarousel.vue';
import HomePlayground from './HomePlayground.vue';
import HomeNav from './HomeNav.vue';
import PublishLink from './PublishLink.vue';
import SourceLink from './SourceLink.vue';
import HomeNews from './HomeNews.vue';
</script>

<template>
  <HomeBanner />
  <HomeNav />
  <HomeCarousel />
  <UserCase />
  <CommunityActivity />
  <HomeNews />
  <!-- <div class="home-calendar">
    <h3>{{i18n.home.HOME_CALENDAR}}</h3>
    <calender></calender>
  </div> -->
  <HomePlayground />
  <PublishLink />
  <SourceLink />
</template>

<style lang="scss" scoped>
.home-calendar {
  width: 100%;
}
h3 {
  margin-top: var(--o-spacing-h1);
  margin-bottom: var(--o-spacing-h2);
  font-size: var(--o-font-size-h3);
  font-weight: 300;
  color: var(--o-color-text2);
  line-height: var(--o-line-height-h3);
  width: 100%;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin-top: var(--o-spacing-h2);
    margin-bottom: 16px;
  }
}
</style>
