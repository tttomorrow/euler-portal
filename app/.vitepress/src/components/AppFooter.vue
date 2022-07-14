<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useData } from 'vitepress';
// import { useI18n } from 'vue-i18n';

import footerLogo from '@/assets/footer-logo2.svg';
import atomLogo from '@/assets/atom-pc.png';
import wechatImg from '@/assets/qrcode.png';

interface NavItem {
  id: string;
  label: string;
  path: string;
}
// const { t } = useI18n();
const data = useData();

// footer
const footer = computed(() => {
  return {
    copyright: '版权所有 © 2022 openEuler 保留一切权利',
    codeDesc: '扫码关注公众号',
    email: 'contact@openlookeng.io',
    footerOptions: [
      {
        id: 'brand',
        label: '品牌',
        path: '/other/brand/',
      },
      {
        id: 'privacypolicy',
        label: '隐私政策',
        path: '/other/privacy/',
      },
      {
        id: 'legalnotice',
        label: '法律声明',
        path: '/other/legal/',
      },
      {
        id: 'serviceStatus',
        label: '服务状态',
        path: '',
      },
      {
        id: 'serviceStatus',
        label: '2021 年报',
        path: '',
      },
    ],
    atom: 'openEuler 是由开放原子开源基金会（OpenAtom Foundation）孵化及运营的开源项目',
    atomLogo: atomLogo,
  };
});
const router = useRouter();
const handleNavClick = (link: NavItem) => {
  if (link.path.startsWith('https:')) {
    window.open(link.path, '_blank');
  } else {
    router.go(`/${data.lang.value}` + link.path);
  }
};
</script>

<template>
  <div class="footer">
    <div class="atom">
      <p class="atom-text">{{ footer.atom }}}</p>
      <img :src="footer.atomLogo" class="atom-logo" alt="" />
    </div>
    <div class="footer-content">
      <div class="inner">
        <div class="footer-logo">
          <img :src="footerLogo" alt="" />
          <p>
            <a class="email" :href="'mailto:' + footer.email" target="_blank">
              {{ footer.email }}
            </a>
          </p>
        </div>
        <div class="footer-option">
          <div class="footer-option-item">
            <a
              v-for="link in footer.footerOptions"
              :key="link.id"
              href="javascript:;"
              class="link"
              @click="handleNavClick(link)"
              >{{ link.label }}</a
            >
          </div>
          <p class="copyright">{{ footer.copyright }}</p>
        </div>
        <div class="footer-right">
          <img :src="wechatImg" class="img" alt="" />
          <p class="text">{{ footer.codeDesc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color: #fff;
.footer {
  padding: var(--o-spacing-l) 0 0;
  background: #121212;
  .atom {
    text-align: center;

    &-text {
      font-size: var(--o-font-size-h5);
      font-weight: 400;
      color: $color;
      line-height: var(--o-line-height-h5);
    }
    &-logo {
      height: 48px;
      margin: var(--o-spacing-m) 0;
    }
  }

  &-content {
    background: url('/img/footer-bg.png') no-repeat bottom center;

    .inner {
      max-width: 1416px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--o-spacing-m) 0;
      position: relative;
      &::after {
        background: #e5e5e5;
        opacity: 0.12;
        position: absolute;
        top: 0px;
        left: 0;
        width: 1416px;
        content: '';
        height: 2px;
      }
    }
  }
  &-logo img {
    height: 28px;
    margin-bottom: var(--o-spacing-s2);
  }

  .copyright {
    font-size: var(--o-font-size-text);
    color: $color;
    margin-top: var(--o-spacing-s2);
  }

  .footer-option {
    text-align: center;
    &-item {
      margin-bottom: 12px;
    }
    .link {
      color: $color;
      font-size: var(--o-font-size-text);
      display: inline-block;
      padding: 0 12px;
      border-right: 1px solid $color;
      &:last-child {
        border-right: 0;
      }
    }
  }

  .footer-right {
    text-align: center;
    .img {
      width: 78px;
      width: 78px;
      vertical-align: top;
    }
    p {
      color: $color;
      font-size: var(--o-font-size-tip);
      margin-top: var(--o-spacing-s1);
    }
  }
  .link {
    color: $color;
    font-size: 14px;
  }
  .email {
    color: $color;
    font-size: 16px;
  }
}

@media (max-width: 1100px) {
  .footer {
    padding: var(--o-spacing-m) 0 0;
    .atom-text {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    .atom-logo {
      height: 32px;
      margin: var(--o-spacing-s2) 0 var(--o-spacing-s3);
    }
    .wrapper {
      display: grid;
      text-align: center;
      justify-content: center;
      padding: var(--o-spacing-s3) 0;
    }
    .footer-logo {
      margin: var(--o-spacing-s2) 0;
      img {
        margin-bottom: 4px;
      }
    }
    .footer-option {
      order: -1;
      .link {
        font-size: var(--o-font-size-tip);
      }
      .copyright {
        font-size: var(--o-font-size-tip);
        margin-top: var(--o-spacing-s1);
      }
    }
  }
}
</style>
