---
title: 'Contribution'
---

<script lang="ts" setup>
import ContributionMap from "@/views/community/contribution/ContributionMap.vue";
import ContributionTab from "@/views/community/contribution/ContributionTab.vue";
import BannerLevel2 from '@/components/BannerLevel2.vue'

import banner from '@/assets/banner-secondary.png';
import contributionIllustration from '@/assets/illustrations/contribution.png';
</script>

<div>
  <ClientOnly>
    <BannerLevel2
      title="How to Contribute"
      :illustration="contributionIllustration"
      :background-image="banner"
      background-text="COMMUNITY"
    />
  </ClientOnly>
  <ContributionTab />
  <ContributionMap />

</div>
