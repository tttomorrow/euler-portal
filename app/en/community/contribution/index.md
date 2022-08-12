<script lang="ts" setup>
import ContributionMap from "@/views/community/contribution/ContributionMap.vue";
import ContributionTab from "@/views/community/contribution/ContributionTab.vue";
import BannerLevel2 from '@/components/BannerLevel2.vue'

import BannerBackground from '@/assets/banner-secondary.png';
import BannerIllustration from '/img/community/share/illustration-banner.png';

</script>

<div>
  <BannerLevel2
    title="贡献攻略"
    :illustration="BannerIllustration"
    :background-image="BannerBackground"
    background-text="COMMUNITY"
  />
  <ContributionTab />
  <ContributionMap />

</div>
