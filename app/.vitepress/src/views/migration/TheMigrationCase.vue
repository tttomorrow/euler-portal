<script setup lang="ts">
import { useData } from 'vitepress';

const info = [
  {
    label: 'MySQL 5.7.21 移植案例',
    link: '/zh/blog/randy1568/MySQL 5-7-21-migrate-guide.html',
  },
  {
    label: 'Apache 2.4.39 移植指南',
    link: '/zh/blog/randy1568/Apache 2-4-39-porting-guide.html',
  },
  {
    label: 'Dubbo 2.6.8 移植指南',
    link: '/zh/blog/randy1568/Dubbo 2-6-8-porting-guide.html',
  },
  {
    label: 'Dubbo 2.7.5 移植指南',
    link: '/zh/blog/randy1568/Dubbo 2-7-5-porting-guide.html',
  },
  {
    label: 'HAProxy 1.9.0 移植指南',
    link: '/zh/blog/randy1568/HAProxy 1-9-0-porting-guide.html',
  },
  {
    label: 'Lighttpd 1.4.53 移植指南',
    link: '/zh/blog/randy1568/Lighttpd 1-4-53-porting-guide.html',
  },
  {
    label: 'Iok 2.1.3 移植指南',
    link: '/zh/blog/randy1568/Iok 2.1.3-porting-guide.html',
  },
  {
    label: 'Memcached 1.5.12 移植指南',
    link: '/zh/blog/randy1568/Memcached 1-5-12-porting-guide.html',
  },
  {
    label: 'Nginx 1.14.2 移植指南',
    link: '/zh/blog/randy1568/Nginx 1-14-2-porting-guide.html',
  },
  {
    label: 'Tengine 2.2.2 移植指南',
    link: '/zh/blog/randy1568/Tengine 2.2.2-porting-guide.html',
  },
  {
    label: 'Squid 4.8 移植指南',
    link: '/zh/blog/randy1568/Squid 4.8-porting-guide.html',
  },
  {
    label: 'Varnish 6.2.0 移植指南',
    link: '/zh/blog/randy1568/Varnish 6-2-0-porting-guide.html',
  },
  {
    label: 'X86硬件兼容性移迁指南',
    link: '/zh/blog/randy1568/x86-Hardware-Compatibility-Assessment-and-Porting-Guide.html',
  },
  {
    label: 'flask 1.1.2 移植指南',
    link: '/zh/blog/randy1568/flask 1-1-2-porting-guide.html',
  },
  {
    label: 'enca 1.19 移植指南 ',
    link: '/zh/blog/randy1568/enca1-19-porting-guide.html',
  },
  {
    label: 'tornado 4.2.1 移植指南',
    link: '/zh/blog/randy1568/MySQL 5-7-21-migrate-guide.html',
  },
  {
    label: 'pkgship 2.1.0 移植指南',
    link: '/zh/blog/randy1568/MySQL 5-7-21-migrate-guide.html',
  },
];

const { frontmatter } = useData();
</script>

<template>
  <div class="migration-transplantation">
    <h1>{{ frontmatter.title }}</h1>
    <p class="migration-transplantation-desc">
      随着数字化转型深入，操作系统正在向支持多样性计算、支持全场景的方向发展，在进行操作系统升级时，企业面临以下挑战：硬件兼容性、软件兼容性、升级后系统环境如何快速恢复？升级后如何能够更好发挥系统性能？openEuler
      作为一款面向数字基础设施的开源操作系统，最优支持多样性计算，满足服务器、云、边缘和嵌入式全场景。针对企业在升级操作系统时的需求，推出这份升级指南，助力企业简单、平稳、高效进行操作系统升级。
    </p>
    <div class="migration-transplantation-content">
      <a v-for="item in info" :href="item.link" target="_blank">
        <div class="migration-transplantation-card">{{ item.label }}</div>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.migration-transplantation {
  color: var(--e-color-text1);

  .migration-transplantation-desc {
    color: var(--e-color-text1);
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    font-weight: 300;
    margin-top: 0;
    margin-bottom: var(--o-spacing-h1);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-bottom: var(--o-spacing-h4);
    }
  }

  h1 {
    font-weight: 300;
    text-align: center;
    margin-bottom: var(--o-spacing-h2);
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    @media screen and (max-width: 768px) {
      margin: 0 0 var(--o-spacing-h4);
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
    }
  }

  .migration-transplantation-content {
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

    .migration-transplantation-card {
      position: relative;
      background-color: var(--e-color-bg2);
      border: 1px solid var(--e-color-brand1);
      padding: 16px 18px;
      font-size: var(--o-font-size-h7);
      line-height: var(--o-font-size-h7);
      font-weight: 500;
      color: var(--e-color-text1);
      cursor: pointer;

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

      &:hover {
        box-shadow: var(--e-shadow-l2_hover);
      }
    }
  }
}
</style>
