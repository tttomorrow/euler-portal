<script lang="ts" setup>
import { useI18n } from '@/i18n';
import { useRouter } from 'vitepress';

const i18n = useI18n();
const router = useRouter();

function goBackPage() {
  const i = router.route.path.lastIndexOf('h');
  router.go(`${router.route.path.substring(0, i)}`);
}
</script>
<template>
  <div class="wrapper">
    <div class="banner">
      <div class="breadcrumb" @click="goBackPage">
        {{ i18n.compatibility.COMPATIBILITY }} \
      </div>
      <div class="banner-title">
        {{ i18n.compatibility.SOFTWARE_OEC_DETAIL.TITLE }}
      </div>
    </div>
    <div class="hardware-content">
      <div class="hardware-content-top">
        <div class="title">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.DISCRIPTION_TITLE }}
        </div>
        <div class="content">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.DISCRIPTION_CONTENT }}
        </div>
      </div>
      <div class="hardware-content-middle">
        <div class="title">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.PROCESS_TITLE }}
        </div>
        <div class="content">
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0]
                    .DESCRIPTION_1
                }}
                <a
                  :href="
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].A_TEXT
                  "
                  target="_blank"
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0]
                    .DESCRIPTION_2
                }}
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1]
                    .DESCRIPTION_1
                }}
                <a
                  :href="
                    'mailto:' +
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT
                  "
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1]
                    .DESCRIPTION_2
                }}
                <p>
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1]
                      .DESCRIPTION_3
                  }}
                  <a
                    :href="
                      i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT2
                    "
                    target="_blank"
                  >
                    {{
                      i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT2
                    }}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2]
                    .DESCRIPTION_1
                }}
                <a
                  href="/openEuler-compatibility.pdf"
                  download="openEuler兼容性策略介绍.pdf"
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].A_TEXT
                  }}
                </a>
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3]
                    .DESCRIPTION_1
                }}
                <a
                  target="_blank"
                  :href="
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].A_TEXT
                  "
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3]
                    .DESCRIPTION_2
                }}
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4]
                    .DESCRIPTION_1
                }}
                <a
                  target="_blank"
                  href="https://gitee.com/src-openeuler/oec-hardware/releases"
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4]
                    .DESCRIPTION_2
                }}
                <a
                  href="/openEuler硬件兼容性测试工具使用指南.pdf"
                  download="openEuler硬件兼容性测试工具使用指南.pdf"
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_TEXT_2
                  }}
                </a>
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5]
                    .DESCRIPTION_1
                }}
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5]
                    .DESCRIPTION_3
                }}
                <a
                  :href="
                    'mailto:' +
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].A_TEXT
                  "
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5]
                    .DESCRIPTION_2
                }}
              </div>
            </div>
          </div>
          <div
            v-if="i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6]"
            class="content-item"
          >
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6]
                    .DESCRIPTION_1
                }}
                <a @click="goBackPage">
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6]
                    .DESCRIPTION_2
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scope>
.wrapper {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0 44px;
  @media screen and (max-width: 768px) {
    padding: 0 var(--o-spacing-h5);
  }
}
.banner {
  margin: 0 auto;
  .breadcrumb {
    margin-top: 34px;
    margin-bottom: 16px;
    font-size: 20px;
    color: #002fa7;
    line-height: 30px;
    cursor: pointer;
  }
  .banner-title {
    font-size: 36px;
    line-height: 46px;
    margin-bottom: 64px;
    color: #000;
  }
}
.hardware-content {
  max-width: 1504px;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
  line-height: 26px;
  a {
    text-decoration: none;
    color: #002fa7;
    cursor: pointer;
  }
  .hardware-content-top {
    .title {
      font-size: 24px;
      color: #000;
      margin-bottom: 20px;
      line-height: 34px;
    }
    .content {
      font-size: 16px;
      line-height: 26px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .hardware-content-middle {
    margin: 40px 0;
    .title {
      font-size: 24px;
      color: #000;
      margin-bottom: 20px;
      line-height: 34px;
    }
    .content-item {
      display: flex;
      padding: 30px;
      align-items: center;
      justify-content: left;
      .left {
        font-size: 48px;
        color: #002fa7;
        padding-right: 30px;
      }
      .right {
        padding-left: 30px;
        border-left: 1px solid rgba(0, 0, 0, 0.15);
        .item-title {
          color: rgba(0, 0, 0, 1);
          font-size: 20px;
          line-height: 30px;
          margin-bottom: 10px;
        }
        .item-content {
          font-size: 16px;
          line-height: 26px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
}
</style>
