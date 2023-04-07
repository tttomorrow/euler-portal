<script lang="ts" setup>
import memberData from '@/data/about-us/member-data';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();
</script>
<template>
  <div class="member">
    <div v-for="line in memberData" :key="line.donorTitle" class="member-line">
      <h2 :id="line.donorTitle" class="member-title">{{ line.donorTitle }}</h2>
      <div class="logo-list">
        <span
          v-for="img in line.logoList"
          :key="img.img_light"
          class="logo"
          :class="img.noIcon ? 'no-icon' : ''"
        >
          <img
            :src="commonStore.theme === 'light' ? img.img_light : img.img_dark"
            alt=""
          />
        </span>
      </div>
    </div>
    <div class="tip">
      <p>注1：捐赠人按照汉语拼音排序</p>
      <p>注2：带*号的捐赠人，捐赠协议正在流程中</p>
      <p style="margin-top: 20px">资金捐赠，请联系开放原子开源基金会。</p>
      <p>
        联系人：李扬；电话：010-59258678转8007；邮箱：<a
          href="mailto:liyang@openatom.org"
          >liyang@openatom.org</a
        >。
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.member {
  display: grid;
  grid-row-gap: 40px;
  max-width: 1062px;

  .member-line {
    .member-title {
      margin-bottom: 16px;
      color: var(--o-color-text1);
      font-weight: 500;
      font-size: var(--o-font-size-h5);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h7);
      }
    }
    .logo-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-row-gap: 24px;
      .logo {
        position: relative;
        max-width: 354px;
        margin: 0px -1px -1px 0px;
        border: 1px solid var(--o-color-division1);
        img {
          width: 100%;
        }
        &::after {
          position: absolute;
          content: '';
          right: -1px;
          top: -1px;
          width: 31px;
          height: 21px;
          background-size: 100% 100%;
          background-image: url('@/assets/category/member/stash_light.png');
        }
      }
      .no-icon {
        &::after {
          display: none;
        }
      }
      @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  .tip {
    display: grid;
    grid-row-gap: 16px;
    color: var(--o-color-text1);
    p {
      font-size: 12px;
    }
  }
}
.dark {
  .logo-list {
    .logo {
      &::after {
        background-image: url('@/assets/category/member/stash_dark.png') !important;
      }
    }
  }
}
</style>
