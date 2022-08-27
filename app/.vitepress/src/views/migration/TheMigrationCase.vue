<script setup lang="ts"></script>
<template>
  <p class="migration-transplantation-desc">
    随着数字化转型深入，操作系统正在向支持多样性计算、支持全场景的方向发展，在进行操作系统升级时，企业面临以下挑战：硬件兼容性、软件兼容性、升级后系统环境如何快速恢复？升级后如何能够更好发挥系统性能？openEuler
    作为一款面向数字基础设施的开源操作系统，最优支持多样性计算，满足服务器、云、边缘和嵌入式全场景。针对企业在升级操作系统时的需求，推出这份升级指南，助力企业简单、平稳、高效进行操作系统升级。
  </p>
  <div class="migration-transplantation">
    <div class="migration-transplantation-card">Apache 2.4.39 移植指南</div>
    <div class="migration-transplantation-card">Dubbo 2.6.8 移植指南</div>
    <div class="migration-transplantation-card">Dubbo 2.6.8 移植指南</div>
  </div>
</template>

<style lang="scss" scoped>
.migration-transplantation-desc {
  color: var(--e-color-text1);
  font-size: var(--o-font-size-h7);
  line-height: var(--o-line-height-h7);
  font-weight: 300;
  @media screen {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
  }
}
.migration-transplantation {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: var(--o-spacing-h4);
  column-gap: var(--o-spacing-h4);
  margin-top: 64px;
  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  &-card {
    position: relative;
    background-color: var(--e-color-bg2);
    border: 1px solid var(--e-color-brand1);
    padding: 16px 18px;
    font-size: var(--o-font-size-h7);
    line-height: var(--o-font-size-h7);
    font-weight: 500;
    color: var(--e-color-text1);

    @media screen and (max-width: 768px) {
      background-color: var(--e-color-brand1);
      color: var(--e-color-text2);
      text-align: center;
      padding: 3px 0;
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: #ffffff;
      line-height: var(--o-line-height-text);
    }
    &::before {
      position: absolute;
      content: '';
      left: -1px;
      top: -1px;
      bottom: 0;
      width: 2px;
      background-color: var(--e-color-brand1);
    }
  }
}
</style>
