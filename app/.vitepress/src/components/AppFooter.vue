<script setup lang="ts">
import { useRouter, useData } from 'vitepress';

import LogoFooter from '@/assets/footer/footer-logo2.png';
import LogoAtom from '@/assets/footer/atom-logo.svg';
import LogoBilibili from '@/assets/footer/bilibili.png';
import LogoInfoq from '@/assets/footer/infoq.png';
import LogoJuejin from '@/assets/footer/juejin.png';
import LogoOschina from '@/assets/footer/oschina.png';
import LogoCsdn from '@/assets/footer/csdn.png';
import Logo51cto from '@/assets/footer/51cto.png';

import ImgXzs from '@/assets/footer/img-xzs.png';
import ImgGzh from '@/assets/footer/img-gzh.png';
import CodeXzs from '@/assets/footer/code-xzs.png';
import CodeZgz from '@/assets/footer/code-zgz.png';

const { theme: i18n, lang } = useData();

// 友情链接
const footerLinks = [
  {
    path: '',
    logo: LogoOschina,
    id: 'oschina',
  },
  {
    path: '',
    logo: LogoCsdn,
    id: 'csdn',
  },
  {
    path: '',
    logo: LogoJuejin,
    id: 'juejin',
  },
  {
    path: '',
    logo: LogoBilibili,
    id: 'bilibili',
  },
  {
    path: '',
    logo: LogoInfoq,
    id: 'infoq',
  },
  {
    path: '',
    logo: Logo51cto,
    id: '51cto',
  },
];
const router = useRouter();
const handleNavClick = (path: string) => {
  if (path.startsWith('https:')) {
    window.open(path, '_blank');
  } else {
    router.go(`/${lang.value}` + path);
  }
};
</script>

<template>
  <div class="footer">
    <div class="atom">
      <p class="atom-text">{{ i18n.common.FOOTER.ATOM_TEXT }}}</p>
      <img :src="LogoAtom" class="atom-logo" alt="" />
    </div>
    <div class="footer-content">
      <div class="inner">
        <div class="footer-logo">
          <img :src="LogoFooter" alt="" />
          <p>
            <a
              class="email"
              :href="'mailto:' + i18n.common.FOOTER.MAIL"
              target="_blank"
            >
              {{ i18n.common.FOOTER.MAIL }}
            </a>
          </p>
        </div>
        <div class="footer-option">
          <div class="footer-option-item">
            <a
              v-for="link in i18n.common.FOOTER.RIGHT_LIST"
              :key="link.URL"
              href="javascript:;"
              class="link"
              @click="handleNavClick(link.URL)"
              >{{ link.NAME }}</a
            >
          </div>
          <p class="copyright">{{ i18n.common.FOOTER.COPY_RIGHT }}</p>
        </div>
        <div class="footer-right">
          <div class="code-box">
            <a href="javascript:;" class="code-pop">
              <img :src="ImgXzs" class="img-xzs" alt="" />
              <div class="code-layer">
                <img :src="CodeXzs" alt="" />
              </div>
            </a>
            <a href="javascript:;" class="code-pop">
              <img :src="ImgGzh" class="img-gzh" alt="" />
              <div class="code-layer">
                <img :src="CodeZgz" alt="" />
              </div>
            </a>
          </div>
          <div class="footer-links">
            <a
              v-for="item in footerLinks"
              :key="item.id"
              :href="item.path"
              class="img"
              :title="item.id"
              target="_blank"
            >
              <img :src="item.logo" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color: #fff;
.footer {
  background: #121212;
  .atom {
    text-align: center;
    max-width: 1416px;
    padding: 32px 0 24px;
    position: relative;
    margin: 0 auto;

    &-text {
      font-size: var(--o-font-size-h6);
      font-weight: 400;
      color: $color;
      line-height: var(--o-line-height-h6);
    }
    &-logo {
      height: 40px;
      margin-top: 16px;
    }
    &::after {
      background: #e5e5e5;
      opacity: 0.12;
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 1416px;
      content: '';
      height: 2px;
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
      padding: 18px 0 32px;
      position: relative;
      min-height: 118px;
    }
  }
  &-logo {
    min-width: 385px;
    img {
      height: 46px;
    }
  }

  .copyright {
    font-size: var(--o-font-size-text);
    color: $color;
    margin-top: var(--o-spacing-h5);
  }

  .footer-option {
    text-align: center;

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
    text-align: right;
    .code-box {
      display: flex;
      justify-content: right;
      gap: 16px;
      margin-bottom: 18px;
      .code-pop {
        position: relative;
        height: 20px;
        display: block;
        > img {
          height: 100%;
          object-fit: cover;
        }
        .code-layer {
          position: absolute;
          top: -105px;
          left: -32px;
          z-index: 99;
          display: none;
          background: #fff;
          padding: 6px;
          img {
            width: 78px;
            height: 78px;
          }
          &::after {
            border: 10px solid transparent;
            content: '';
            border-top-color: #fff;
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            display: block;
          }
        }
        &:hover {
          .code-layer {
            display: block;
          }
        }
      }
    }
    .footer-links {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 12px;
      .img {
        height: 14px;
        display: inline-flex;
        img {
          height: 100%;
          object-fit: cover;
        }
      }
    }

    p {
      color: $color;
      font-size: var(--o-font-size-tip);
      margin-top: var(--o-spacing-h8);
    }
  }
  .link {
    color: $color;
    font-size: 14px;
  }
  .email {
    color: $color;
    font-size: 14px;
  }
}

@media (max-width: 1100px) {
  .footer {
    padding: var(--o-spacing-h2) 0 0;
    .atom-text {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    .atom-logo {
      height: 32px;
      margin: var(--o-spacing-h5) 0 var(--o-spacing-h4);
    }
    .wrapper {
      display: grid;
      text-align: center;
      justify-content: center;
      padding: var(--o-spacing-h4) 0;
    }
    .footer-logo {
      margin: var(--o-spacing-h5) 0;
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
        margin-top: var(--o-spacing-h8);
      }
    }
  }
}
</style>
