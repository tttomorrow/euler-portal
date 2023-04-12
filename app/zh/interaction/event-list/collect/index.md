---
title: '活动征集'
---

<script lang="ts" setup>
import BannerLevel2 from '@/components/BannerLevel2.vue'

import banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/illustrations/collect.png';

</script>

<ClientOnly>
  <BannerLevel2
  title="活动征集"
  :illustration="illustration"
  :background-image="banner"
  background-text="CONNECT"
  />
</ClientOnly>

<div class="markdown">

## 如何申请

如果您已经有了openEuler Meetup主办或组织计划，为了保证活动顺利进行，在申办社区开发者活动前，您需要在[此处申请](/zh/interaction/event-list/meetup-form/)

## 申办审核

如果您的申请符合上述申办要求，我们会在5个工作日内审核并通过电子邮件[events@openeuler.sh](mailto:events@openeuler.sh)与您联系，以便提供openEuler Meetup赋能支持；即便申请不合适，我们仍会通过电子邮件通知您，请确保申办表信息无误。

## 可获得哪些赋能支持

- 活动物料模板（易拉宝、宣传海报、主KV、横幅、拍照异形牌、直播背景框等源文件）
- 宣传资源支持（报名小程序、官网、公众号、社群等渠道宣传）
- openEuler B站直播间资源（如需直播）
- 社区纪念品（支持100人规模以下的实际人数申请）
- openEuler主打PPT

<p class='collect-img'>
  <img src='./material.png' class='img' />
  <img src='./souvenir.png' class='img' />
</p>

## 活动举办

申办单位作为主办方参与筹办Meetup，保证活动的顺利进行。

## 验收反馈

感谢Meetup主办方为openEuler社区举办精彩的开发者活动。可以更好地了解活动的情况和效果，从而不断提升openEuler Meetup活动的质量和影响力，在活动结束后3个工作日内主办方需向社区提供验收反馈资料。

在此处填写[Meetup 成绩反馈表单](https://www.openeuler.org/)

</div>

<style lang="scss" scoped>
  .collect-img {
    display:flex;
    gap:40px;
    margin:16px 0;
    @media (max-width: 1639px) {
      flex-direction: column;
      gap:16px;
    }
    .img{
        max-width:650px
    }
  }
</style>