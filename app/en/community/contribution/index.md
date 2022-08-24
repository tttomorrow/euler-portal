---
title: 'Contribution'
---

<script lang="ts" setup>
import ContributionMap from "@/views/community/contribution/ContributionMap.vue";
import ContributionTab from "@/views/community/contribution/ContributionTab.vue";
import BannerLevel2 from '@/components/BannerLevel2.vue'

import BannerBackground from '@/assets/banner-secondary.png';
import BannerIllustration from '/img/community/share/illustration-banner.png';

</script>

<div>
  <ClientOnly>
    <BannerLevel2
      title="How to Contribute"
      :illustration="BannerIllustration"
      :background-image="BannerBackground"
      background-text="COMMUNITY"
    />
  </ClientOnly>
  <ContributionTab />
  <ContributionMap />

</div>
