<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vitepress';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import ContributionMap from '/img/community/contribution/contribution-map.png';
import ContributionMapDark from '/img/community/contribution/contribution-map-dark.png';
import ContributionMapMobile from '/img/community/contribution/contribution-map-mobile.png';
import ContributionMapMobileDark from '/img/community/contribution/contribution-map-mobile-dark.png';

const i18n = useI18n();
const commonStore = useCommon();
const router = useRouter();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
const isPC = ref(true);
if (useWindowResize().value < 767) {
  isPC.value = false;
} else {
  isPC.value = true;
}
const goLink = function (url: string, isBlank: boolean) {
  if (isBlank) {
    window.open(url);
    return;
  }
  router.go(url);
};
</script>
<template>
  <div class="content-map">
    <div v-if="isPC" class="content-map-img">
      <img v-show="!isDark" :src="ContributionMap" />
      <img v-show="isDark" :src="ContributionMapDark" />
      <!-- 定位的空标签 -->
      <div
        v-for="(item, index) in i18n.contribution.LINK_LIST"
        :key="index"
        class="link"
        @click="goLink(item.URL, item.BLANK)"
      ></div>
    </div>
    <div v-else class="content-map-mobile-img">
      <img v-show="!isDark" :src="ContributionMapMobile" />
      <img v-show="isDark" :src="ContributionMapMobileDark" />
      <div
        v-for="(item, index) in i18n.contribution.LINK_LIST"
        :key="index"
        class="mobile-link"
        @click="goLink(item.URL, item.BLANK)"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-map {
  background-color: var(--e-color-bg1);
  width: 100%;
  &-img {
    width: 1416px;
    position: relative;
    display: block;
    margin: 0 auto;
    background-color: var(--o-color-bg6);
    img {
      width: 1034px;
      display: block;
      margin: 0 auto;
      padding: var(--o-spacing-h1) 0;
      @media screen and (min-width: 768px) and (max-width: 1079px) {
        width: 560px;
      }
      @media screen and (min-width: 1080px) and (max-width: 1279px) {
        width: 788px;
      }
      @media screen and (min-width: 1280px) and (max-width: 1439px) {
        width: 934px;
      }
    }
    .link {
      position: absolute;
      display: block;
      cursor: pointer;
    }
    @media screen and (min-width: 1440px) {
      width: 1416px;
    }
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 755px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 1058px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 1254px;
    }
  }
  .link:nth-of-type(1) {
    width: 40px;
    height: 60px;
    top: 285px;
    left: 330px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 20px;
      height: 32px;
      top: 183px;
      left: 175px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 30px;
      height: 43px;
      top: 232px;
      left: 240px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 35px;
      height: 50px;
      top: 265px;
      left: 285px;
    }
  }
  .link:nth-of-type(2) {
    width: 40px;
    height: 60px;
    top: 285px;
    left: 390px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 20px;
      height: 32px;
      top: 183px;
      left: 206px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 30px;
      height: 43px;
      top: 232px;
      left: 285px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 35px;
      height: 50px;
      top: 265px;
      left: 340px;
    }
  }
  .link:nth-of-type(3) {
    width: 40px;
    height: 60px;
    top: 285px;
    left: 450px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 20px;
      height: 32px;
      top: 183px;
      left: 238px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 30px;
      height: 43px;
      top: 232px;
      left: 330px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 35px;
      height: 50px;
      top: 265px;
      left: 395px;
    }
  }
  .link:nth-of-type(4) {
    width: 40px;
    height: 60px;
    top: 285px;
    left: 510px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 20px;
      height: 32px;
      top: 183px;
      left: 270px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 30px;
      height: 43px;
      top: 232px;
      left: 375px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 35px;
      height: 53px;
      top: 262px;
      left: 450px;
    }
  }
  .link:nth-of-type(5) {
    width: 132px;
    height: 51px;
    top: 416px;
    left: 330px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 71px;
      height: 26px;
      top: 256px;
      left: 173px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 100px;
      height: 38px;
      top: 333px;
      left: 241px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 120px;
      height: 45px;
      top: 383px;
      left: 285px;
    }
  }
  .link:nth-of-type(6) {
    width: 80px;
    height: 51px;
    top: 416px;
    left: 470px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 41px;
      height: 27px;
      top: 255px;
      left: 250px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 58px;
      height: 38px;
      top: 333px;
      left: 349px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 69px;
      height: 45px;
      top: 383px;
      left: 414px;
    }
  }
  .link:nth-of-type(7) {
    width: 101px;
    height: 51px;
    top: 476px;
    left: 331px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 55px;
      height: 27px;
      top: 288px;
      left: 173px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 76px;
      height: 37px;
      top: 380px;
      left: 242px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 91px;
      height: 45px;
      top: 437px;
      left: 286px;
    }
  }
  .link:nth-of-type(8) {
    width: 105px;
    height: 51px;
    top: 476px;
    left: 443px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 57px;
      height: 27px;
      top: 288px;
      left: 234px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 80px;
      height: 37px;
      top: 380px;
      left: 327px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 94px;
      height: 44px;
      top: 438px;
      left: 388px;
    }
  }
  .link:nth-of-type(9) {
    width: 143px;
    height: 51px;
    top: 535px;
    left: 405px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 78px;
      height: 27px;
      top: 319px;
      left: 213px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 109px;
      height: 38px;
      top: 423px;
      left: 298px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 128px;
      height: 45px;
      top: 489px;
      left: 354px;
    }
  }
  .link:nth-of-type(10) {
    width: 125px;
    height: 49px;
    top: 595px;
    left: 331px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 68px;
      height: 27px;
      top: 351px;
      left: 173px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 96px;
      height: 37px;
      top: 469px;
      left: 241px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 113px;
      height: 45px;
      top: 543px;
      left: 286px;
    }
  }
  .link:nth-of-type(11) {
    width: 217px;
    height: 49px;
    top: 655px;
    left: 331px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 118px;
      height: 27px;
      top: 384px;
      left: 173px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 165px;
      height: 38px;
      top: 514px;
      left: 242px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 197px;
      height: 44px;
      top: 598px;
      left: 286px;
    }
  }
  .link:nth-of-type(12) {
    width: 210px;
    height: 25px;
    top: 889px;
    left: 241px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 115px;
      height: 13px;
      top: 511px;
      left: 124px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 160px;
      height: 19px;
      top: 693px;
      left: 173px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 190px;
      height: 22px;
      top: 810px;
      left: 205px;
    }
  }
  .link:nth-of-type(13) {
    width: 49px;
    height: 54px;
    top: 952px;
    left: 241px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 24px;
      height: 31px;
      top: 544px;
      left: 126px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 36px;
      height: 45px;
      top: 738px;
      left: 173px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 46px;
      height: 54px;
      top: 863px;
      left: 205px;
    }
  }
  .link:nth-of-type(14) {
    width: 49px;
    height: 54px;
    top: 952px;
    left: 300px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 24px;
      height: 31px;
      top: 544px;
      left: 159px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 36px;
      height: 45px;
      top: 738px;
      left: 219px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 46px;
      height: 54px;
      top: 863px;
      left: 258px;
    }
  }
  .link:nth-of-type(15) {
    width: 49px;
    height: 54px;
    top: 952px;
    left: 360px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 24px;
      height: 31px;
      top: 544px;
      left: 191px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 36px;
      height: 45px;
      top: 738px;
      left: 265px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 46px;
      height: 54px;
      top: 863px;
      left: 311px;
    }
  }
  .link:nth-of-type(16) {
    width: 60px;
    height: 76px;
    top: 931px;
    left: 747px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 33px;
      height: 42px;
      top: 533px;
      left: 399px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 47px;
      height: 59px;
      top: 724px;
      left: 558px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 55px;
      height: 69px;
      top: 847px;
      left: 662px;
    }
  }
  .link:nth-of-type(17) {
    width: 60px;
    height: 76px;
    top: 931px;
    left: 847px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 33px;
      height: 42px;
      top: 533px;
      left: 453px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 47px;
      height: 59px;
      top: 724px;
      left: 634px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 55px;
      height: 69px;
      top: 847px;
      left: 753px;
    }
  }
  .link:nth-of-type(18) {
    width: 63px;
    height: 76px;
    top: 931px;
    left: 946px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 35px;
      height: 42px;
      top: 533px;
      left: 506px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 49px;
      height: 59px;
      top: 724px;
      left: 710px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 58px;
      height: 69px;
      top: 847px;
      left: 842px;
    }
  }
  .link:nth-of-type(19) {
    width: 63px;
    height: 76px;
    top: 931px;
    left: 1047px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 35px;
      height: 42px;
      top: 533px;
      left: 561px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 49px;
      height: 59px;
      top: 724px;
      left: 788px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 58px;
      height: 69px;
      top: 847px;
      left: 933px;
    }
  }
  .link:nth-of-type(20) {
    width: 63px;
    height: 78px;
    top: 771px;
    left: 943px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 35px;
      height: 42px;
      top: 448px;
      left: 505px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 49px;
      height: 60px;
      top: 602px;
      left: 708px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 58px;
      height: 72px;
      top: 703px;
      left: 839px;
    }
  }
  .link:nth-of-type(21) {
    width: 63px;
    height: 78px;
    top: 771px;
    left: 1040px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 35px;
      height: 42px;
      top: 448px;
      left: 557px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 49px;
      height: 60px;
      top: 602px;
      left: 780px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 58px;
      height: 72px;
      top: 703px;
      left: 926px;
    }
  }
  .link:nth-of-type(22) {
    width: 103px;
    height: 29px;
    top: 600px;
    left: 745px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 55px;
      height: 14px;
      top: 355px;
      left: 398px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 79px;
      height: 19px;
      top: 474px;
      left: 557px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 93px;
      height: 24px;
      top: 548px;
      left: 661px;
    }
  }
  .link:nth-of-type(23) {
    width: 103px;
    height: 29px;
    top: 640px;
    left: 745px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 55px;
      height: 14px;
      top: 377px;
      left: 398px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 79px;
      height: 19px;
      top: 504px;
      left: 557px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 93px;
      height: 24px;
      top: 585px;
      left: 661px;
    }
  }
  .link:nth-of-type(24) {
    width: 103px;
    height: 29px;
    top: 680px;
    left: 745px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 55px;
      height: 14px;
      top: 398px;
      left: 398px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 79px;
      height: 19px;
      top: 535px;
      left: 557px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 93px;
      height: 24px;
      top: 620px;
      left: 661px;
    }
  }
  .link:nth-of-type(25) {
    width: 114px;
    height: 29px;
    top: 600px;
    left: 881px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 61px;
      height: 14px;
      top: 355px;
      left: 471px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 85px;
      height: 19px;
      top: 474px;
      left: 662px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 101px;
      height: 24px;
      top: 548px;
      left: 785px;
    }
  }
  .link:nth-of-type(26) {
    width: 74px;
    height: 29px;
    top: 640px;
    left: 881px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 41px;
      height: 14px;
      top: 377px;
      left: 471px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 66px;
      height: 19px;
      top: 504px;
      left: 662px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 74px;
      height: 24px;
      top: 585px;
      left: 785px;
    }
  }
  .link:nth-of-type(27) {
    width: 55px;
    height: 29px;
    top: 680px;
    left: 881px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 30px;
      height: 14px;
      top: 398px;
      left: 471px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 40px;
      height: 19px;
      top: 535px;
      left: 662px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 55px;
      height: 24px;
      top: 620px;
      left: 785px;
    }
  }
  .link:nth-of-type(28) {
    width: 112px;
    height: 29px;
    top: 600px;
    left: 1030px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 62px;
      height: 14px;
      top: 355px;
      left: 551px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 85px;
      height: 19px;
      top: 474px;
      left: 774px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 101px;
      height: 24px;
      top: 548px;
      left: 917px;
    }
  }
  .link:nth-of-type(29) {
    width: 112px;
    height: 29px;
    top: 639px;
    left: 1030px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 62px;
      height: 14px;
      top: 377px;
      left: 551px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 85px;
      height: 19px;
      top: 504px;
      left: 774px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 101px;
      height: 24px;
      top: 585px;
      left: 917px;
    }
  }
  .link:nth-of-type(30) {
    width: 112px;
    height: 29px;
    top: 680px;
    left: 1030px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 62px;
      height: 14px;
      top: 398px;
      left: 551px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 85px;
      height: 19px;
      top: 535px;
      left: 774px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 101px;
      height: 24px;
      top: 620px;
      left: 917px;
    }
  }
  .link:nth-of-type(31) {
    width: 71px;
    height: 17px;
    top: 277px;
    left: 851px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 40px;
      height: 9px;
      top: 180px;
      left: 455px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 55px;
      height: 14px;
      top: 227px;
      left: 638px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 64px;
      height: 15px;
      top: 256px;
      left: 757px;
    }
  }
  .link:nth-of-type(32) {
    width: 85px;
    height: 17px;
    top: 180px;
    left: 851px;
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      width: 46px;
      height: 9px;
      top: 127px;
      left: 455px;
    }
    @media screen and (min-width: 1080px) and (max-width: 1279px) {
      width: 65px;
      height: 14px;
      top: 151px;
      left: 638px;
    }
    @media screen and (min-width: 1280px) and (max-width: 1439px) {
      width: 75px;
      height: 15px;
      top: 168px;
      left: 757px;
    }
  }

  &-mobile-img {
    width: 100%;
    height: auto;
    position: relative;
    display: block;
    margin: 0 auto;
    margin-top: var(--o-spacing-h2);
    padding: 0 var(--o-spacing-h5);
    img {
      width: 100%;
    }
  }
  .mobile-link {
    position: absolute;
    display: block;
    cursor: pointer;
  }
  .mobile-link:nth-of-type(1) {
    width: 10.5%;
    height: 3%;
    left: 28%;
    top: 9.8%;
  }
  .mobile-link:nth-of-type(2) {
    width: 10.5%;
    height: 3%;
    left: 45%;
    top: 9.8%;
  }
  .mobile-link:nth-of-type(3) {
    width: 10.5%;
    height: 3%;
    left: 61%;
    top: 9.8%;
  }
  .mobile-link:nth-of-type(4) {
    width: 10.5%;
    height: 3%;
    left: 77%;
    top: 9.8%;
  }
  .mobile-link:nth-of-type(5) {
    width: 36%;
    height: 2.5%;
    left: 26.2%;
    top: 16.2%;
  }
  .mobile-link:nth-of-type(6) {
    width: 25%;
    height: 2.5%;
    left: 65%;
    top: 16.2%;
  }
  .mobile-link:nth-of-type(7) {
    width: 27.7%;
    height: 2.3%;
    left: 26.2%;
    top: 19.2%;
  }
  .mobile-link:nth-of-type(8) {
    width: 32.5%;
    height: 2.3%;
    left: 57.2%;
    top: 19.2%;
  }
  .mobile-link:nth-of-type(9) {
    width: 43.7%;
    height: 2.3%;
    left: 46.2%;
    top: 21.9%;
  }
  .mobile-link:nth-of-type(10) {
    width: 38.7%;
    height: 2.3%;
    left: 26.2%;
    top: 24.8%;
  }
  .mobile-link:nth-of-type(11) {
    width: 64%;
    height: 2.3%;
    left: 26.2%;
    top: 27.7%;
  }
  .mobile-link:nth-of-type(12) {
    width: 62.2%;
    height: 1.4%;
    left: 26.2%;
    top: 35.3%;
  }
  .mobile-link:nth-of-type(13) {
    width: 11.5%;
    height: 3%;
    left: 29%;
    top: 38.2%;
  }
  .mobile-link:nth-of-type(14) {
    width: 11.5%;
    height: 3%;
    left: 53%;
    top: 38.2%;
  }
  .mobile-link:nth-of-type(15) {
    width: 11.5%;
    height: 3%;
    left: 76%;
    top: 38.2%;
  }
  .mobile-link:nth-of-type(16) {
    width: 14.8%;
    height: 3.6%;
    left: 35.5%;
    top: 48.2%;
  }

  .mobile-link:nth-of-type(17) {
    width: 14.8%;
    height: 3.6%;
    left: 67.5%;
    top: 48.2%;
  }
  .mobile-link:nth-of-type(18) {
    width: 14.8%;
    height: 3.6%;
    left: 35.5%;
    top: 52.8%;
  }
  .mobile-link:nth-of-type(19) {
    width: 14.8%;
    height: 3.6%;
    left: 67.5%;
    top: 52.8%;
  }
  .mobile-link:nth-of-type(20) {
    width: 14.8%;
    height: 3.6%;
    left: 34.5%;
    top: 63.5%;
  }
  .mobile-link:nth-of-type(21) {
    width: 14.8%;
    height: 3.6%;
    left: 67%;
    top: 63.5%;
  }
  .mobile-link:nth-of-type(22) {
    width: 25.8%;
    height: 1.6%;
    left: 27.5%;
    top: 73.4%;
  }
  .mobile-link:nth-of-type(23) {
    width: 18.8%;
    height: 1.6%;
    left: 63.5%;
    top: 73.4%;
  }
  .mobile-link:nth-of-type(24) {
    width: 19.2%;
    height: 1.6%;
    left: 27.5%;
    top: 75.4%;
  }
  .mobile-link:nth-of-type(25) {
    width: 19.5%;
    height: 1.6%;
    left: 63.5%;
    top: 75.4%;
  }
  .mobile-link:nth-of-type(26) {
    width: 19.2%;
    height: 1.6%;
    left: 27.5%;
    top: 77.4%;
  }
  .mobile-link:nth-of-type(27) {
    width: 19.5%;
    height: 1.6%;
    left: 63.5%;
    top: 77.4%;
  }
  .mobile-link:nth-of-type(28) {
    width: 22%;
    height: 1.6%;
    left: 27.5%;
    top: 79.4%;
  }
  .mobile-link:nth-of-type(29) {
    width: 14.5%;
    height: 1.6%;
    left: 63.5%;
    top: 79.4%;
  }
  .mobile-link:nth-of-type(30) {
    width: 19.5%;
    height: 1.6%;
    left: 27.5%;
    top: 81.4%;
  }
  .mobile-link:nth-of-type(31) {
    width: 22.4%;
    height: 1%;
    left: 26.4%;
    top: 87.2%;
  }
  .mobile-link:nth-of-type(32) {
    width: 19%;
    height: 1%;
    left: 26.4%;
    top: 92%;
  }
}
</style>
