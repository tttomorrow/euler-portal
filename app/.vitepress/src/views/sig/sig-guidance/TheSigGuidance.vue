<!--
 * @Author: xjc 2324881835@qq.com
 * @Date: 2022-07-12 13:31:02
 * @LastEditors: xjc 2324881835@qq.com
 * @LastEditTime: 2022-07-26 10:02:34
 * @FilePath: \openEuler-portal\app\.vitepress\src\views\sig\sig-guidance\ApplicationProcess.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { useData } from 'vitepress';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/banner-secondary.png';
import illustration from '@/assets/illustrations/search.png';
import sig1 from '@/assets/sig-application/sig1.png';
import sig2 from '@/assets/sig-application/sig2.png';
import sig3 from '@/assets/sig-application/sig3.png';
import sig4 from '@/assets/sig-application/sig4.png';
import sig5 from '@/assets/sig-application/sig5.png';
import sig6 from '@/assets/sig-application/sig6.png';
// import leftline from '@/assets/svg-icons/icon-leftline.svg'
// import rightline from '@/assets/svg-icons/icon-rightline.svg'

const LEFT_IMG = [sig1, sig2, sig3];
const RIGHT_IMG = [sig4, sig5, sig6];

const { theme: i18n } = useData();
</script>

<template>
  <div class="application">
    <header>
      <BannerLevel2
        :background-image="banner"
        background-text="SIG"
        :title="i18n.sig.GUIDANCE_LIST.GUIDE.TITLE"
        :illustration="illustration"
      />
    </header>
    <main>
      <div class="middle">
        <div class="middle-left">
          <div
            v-for="(item, index) in i18n.sig.GUIDANCE_LIST.GUIDE.LINE_CONTENT"
            :key="item.LEFT.LEFT_CIRCLE"
          >
            <div class="middle-left-item">
              <div class="middle-left-item-bgd">
                <img :src="LEFT_IMG[index]" />
              </div>
              <div class="middle-left-item-info">
                <div class="middle-left-item-info-circle">
                  <span>{{ item.LEFT.LEFT_CIRCLE }}</span>
                </div>
                <div>
                  <span v-if="item.LEFT.LEFT_DESC">
                    {{ item.LEFT.LEFT_DESC }}
                  </span>
                  <span>{{ item.LEFT.LEFT_INFO }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="middle-right">
          <div
            v-for="(item, index) in i18n.sig.GUIDANCE_LIST.GUIDE.LINE_CONTENT"
            :key="item.RIGHT.RIGHT_CIRCLE"
          >
            <div class="middle-right-item">
              <div class="middle-right-item-bgd">
                <img :src="RIGHT_IMG[index]" />
              </div>
              <div class="middle-right-item-info">
                <div class="middle-right-item-info-circle">
                  <span>{{ item.RIGHT.RIGHT_CIRCLE }}</span>
                </div>
                <div>
                  <span v-if="item.RIGHT.RIGHT_DESC">
                    {{ item.RIGHT.RIGHT_DESC }}
                  </span>
                  <!-- eslint-disable -->
                  <span v-html="item.RIGHT.RIGHT_INFO"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div style="margin-top: -700px; margin-left: 700px;">
        <div v-for="item in 3" :key="item" style="max-width: 0px;">
          <img :src="leftline" class="left-line"/>
        </div>
      </div>
      <div style="margin-top: -550px;margin-left: 350px;">
        <div v-for="item in 2" :key="item" style="max-width: 0px;">
          <img :src="rightline" class="right-line"/>
        </div>
      </div> -->
    </main>
  </div>
</template>

<style lang="scss" scoped>
.application {
  .middle {
    max-width: 1504px;
    margin: var(--o-spacing-h1) auto;
    padding: 0 44px;
    display: flex;
    @media (max-width: 780px) {
      display: block;
    }
    &-left {
      margin-right: var(--o-spacing-h4);
      @media (max-width: 780px) {
        margin-right: 0px;
      }
      &-item {
        min-height: 154px;
        display: flex;
        margin-top: var(--o-spacing-h1);
        &-bgd {
          width: 216px;
          background-color: var(--o-color-brand_hover);
          @media (max-width: 1280px) {
            width: 180px;
          }
          @media (max-width: 1080px) {
            width: 150px;
          }
          img {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 90px;
            object-fit: contain;
            @media (max-width: 1080px) {
              height: 80px;
            }
            @media (max-width: 780px) {
              width: 60px;
            }
          }
        }
        &-info {
          width: 456px;
          background-color: var(--o-color-bg);
          @media (max-width: 1280px) {
            width: 350px;
          }
          @media (max-width: 1080px) {
            width: 300px;
          }
          span {
            color: var(--o-color-text2);
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-h8);
            float: left;
            margin: 0 var(--o-spacing-h4) var(--o-spacing-h4)
              var(--o-spacing-h1);
            position: relative;
            bottom: var(--o-spacing-h4);
            @media (max-width: 780px) {
              margin: 0 var(--o-spacing-h4) var(--o-spacing-h10)
                var(--o-spacing-h1);
              line-height: var(--o-line-height-text);
            }
          }
          &-circle {
            height: 78px;
            width: 78px;
            border: 4px solid var(--o-color-base);
            border-radius: 50%;
            background-color: var(--o-color-brand);
            position: relative;
            top: 50%;
            transform: translate(-50%, -50%);
            span {
              white-space: nowrap;
              font-size: var(--o-font-size-h5);
              color: var(--o-color-text);
              line-height: var(--o-line-height-h5);
              position: relative;
              right: 53px;
              top: var(--o-spacing-h5);
            }
          }
        }
      }
    }
    &-right {
      margin-top: 80px;
      &-item {
        min-height: 154px;
        display: flex;
        margin-top: var(--o-spacing-h1);
        &-bgd {
          width: 216px;
          background-color: var(--o-color-brand_hover);
          @media (max-width: 1280px) {
            width: 180px;
          }
          @media (max-width: 1080px) {
            width: 150px;
          }
          img {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 90px;
            object-fit: contain;
            @media (max-width: 1080px) {
              height: 80px;
            }
            @media (max-width: 780px) {
              width: 60px;
            }
          }
        }
        &-info {
          width: 456px;
          background-color: var(--o-color-bg);
          @media (max-width: 1280px) {
            width: 350px;
          }
          @media (max-width: 1080px) {
            width: 300px;
          }
          span {
            color: var(--o-color-text2);
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-h8);
            float: left;
            margin: 0 var(--o-spacing-h4) var(--o-spacing-h4)
              var(--o-spacing-h1);
            position: relative;
            bottom: var(--o-spacing-h4);
            @media (max-width: 780px) {
              margin: 0 var(--o-spacing-h4) var(--o-spacing-h10)
                var(--o-spacing-h1);
              line-height: var(--o-line-height-text);
            }
          }
          &-circle {
            height: 78px;
            width: 78px;
            border: 4px solid var(--o-color-base);
            border-radius: 50%;
            background-color: var(--o-color-brand);
            position: relative;
            top: 50%;
            transform: translate(-50%, -50%);
            span {
              white-space: nowrap;
              font-size: var(--o-font-size-h5);
              color: var(--o-color-text);
              line-height: var(--o-line-height-h5);
              position: relative;
              right: 53px;
              top: var(--o-spacing-h5);
            }
          }
        }
      }
    }
  }
}
</style>
