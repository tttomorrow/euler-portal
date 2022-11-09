<script setup lang="ts">
import downloadInfo from '@/data/migration/migration-download';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

function handleGetSoftWare() {
  window.open(
    'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/'
  );
}

function handleUserGuide() {
  window.open(
    'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/thirdparty_migration/x2openEuler-Userguide.html'
  );
}

function handleGetVideo() {
  window.open(
    'https://www.bilibili.com/video/BV1TR4y1o7cX/?is_story_h5=false&p=1&share_from=ugc&share_medium=android&share_plat=android&share_session_id=2d0cb5be-8f2d-4271-b749-5f37452ec983&share_source=COPY&share_tag=s_i&timestamp=1665209080&unique_k=622RHPA'
  );
}
</script>

<template>
  <div class="migration-download">
    <div class="migration-download-content">
      <div v-for="item in downloadInfo" :key="item.name">
        <h2 :id="item.name" style="margin-top: 0">{{ item.name }}</h2>

        <p class="download-desc">{{ item.description }}</p>

        <OCard shadow="hover">
          <div class="card-box">
            <div class="card-box-left">
              <img
                src="@/assets/illustrations/migration/download-card-left.png"
                alt=""
              />
              <div class="card-info">
                <span class="name">{{ item.name }}</span>
                <span class="version">{{ item.version }}</span>
              </div>
            </div>

            <div class="card-box-right">
              <div class="card-btn">
                <OButton
                  animation
                  size="mini"
                  class="home-banner-btn"
                  @click="handleGetSoftWare"
                >
                  {{ item.source.name }}
                  <template #suffixIcon
                    ><OIcon><IconArrowRight /></OIcon
                  ></template>
                </OButton>

                <OButton
                  animation
                  size="mini"
                  class="home-banner-btn"
                  @click="handleUserGuide"
                >
                  {{ item.doc.name }}
                  <template #suffixIcon
                    ><OIcon><IconArrowRight /></OIcon
                  ></template>
                </OButton>

                <OButton
                  animation
                  size="mini"
                  class="home-banner-btn"
                  @click="handleGetVideo"
                >
                  {{ item.video.name }}
                  <template #suffixIcon
                    ><OIcon><IconArrowRight /></OIcon
                  ></template>
                </OButton>
              </div>
              <img
                src="@/assets/illustrations/migration/download-card-right.png"
                alt=""
              />
            </div>
          </div>
        </OCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  margin-top: var(--o-spacing-h3);
  .el-card__body {
    padding: 0;
  }
}
.migration-download {
  color: var(--o-color-text1);

  .migration-download-desc {
    color: var(--o-color-text1);
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

  .migration-download-content {
    .download-desc {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text4);
      line-height: var(--o-line-height-text);
    }

    .card-box {
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 1410px) {
        flex-direction: column;
      }
      &-left {
        display: flex;
        align-items: center;
        padding: 23px 0 15px 25px;
        @media screen and (max-width: 440px) {
          padding: 23px 0 15px 20px;
        }
        img {
          width: 109px;
          height: 74px;
          margin-right: var(--o-spacing-h4);
        }

        .card-info {
          font-size: var(--o-font-size-h5);
          font-weight: 500;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-h5);
          @media screen and (max-width: 1410px) {
            font-size: var(--o-font-size-h7);
            line-height: var(--o-line-height-h7);
          }
          .name {
            margin-right: var(--o-spacing-h6);
          }
        }
      }

      &-right {
        display: flex;
        position: relative;
        // @media screen and (max-width: 1410px) {
        //   align-self: end;
        // }
        img {
          width: 123px;
          height: 95px;
          // align-self: flex-end;
          position: absolute;
          right: 2px;
          bottom: 0;
        }
        .card-btn {
          align-self: center;
          z-index: 10;
          margin-right: 120px;
          @media screen and (max-width: 1410px) {
            padding: 15px 0 23px 20px;
            margin-right: 0;
          }

          .o-button {
            margin-right: var(--o-spacing-h4);
            @media screen and (max-width: 440px) {
              margin-right: 5px;
            }
            &:last-child {
              margin-right: var(--o-spacing-h3);
              @media screen and (max-width: 440px) {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
