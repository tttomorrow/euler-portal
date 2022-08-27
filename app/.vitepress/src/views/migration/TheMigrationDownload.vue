<script setup lang="ts">
import downloadInfo from '@/data/migration/migration-download';
</script>

<template>
  <p class="migration-download-desc">
    随着数字化转型深入，操作系统正在向支持多样性计算、支持全场景的方向发展，在进行操作系统升级时，企业面临以下挑战：硬件兼容性、软件兼容性、升级后系统环境如何快速恢复？升级后如何能够更好发挥系统性能？openEuler
    作为一款面向数字基础设施的开源操作系统，最优支持多样性计算，满足服务器、云、边缘和嵌入式全场景。针对企业在升级操作系统时的需求，推出这份升级指南，助力企业简单、平稳、高效进行操作系统升级。
  </p>
  <div class="migration-download">
    <h1>下载</h1>
    <div class="migration-download-content">
      <OCard v-for="item in downloadInfo" :key="item.name" shadow="hover">
        <div class="download-card">
          <div class="card-top">
            <div class="card-title">{{ item.name }}</div>
            <div class="card-text">
              <div class="migration-description">
                {{ item.description }}
              </div>
              <div class="migration-summary">
                {{ item.summary }}
              </div>
            </div>
          </div>
          <div class="card-bottom">
            <div class="migration-version">
              <span>版本信息：</span>
              <span :style="{ marginLeft: '8px' }"> {{ item.version }}</span>
            </div>
            <div class="migration-link">
              <p class="migration-link-source">
                <span>软件下载</span>
                <a
                  :style="{ marginLeft: '8px' }"
                  :href="item.source?.link"
                  target="_blank"
                  >{{ item.source?.name }}</a
                >
              </p>
              <p class="migration-link-doc">
                <span>文档：</span>
                <a
                  :style="{ marginLeft: '8px' }"
                  :href="item.doc?.link"
                  target="_blank"
                  >{{ item.doc?.name }}</a
                >
              </p>
            </div>
          </div>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.migration-download-desc {
  color: var(--e-color-text1);
  font-size: var(--o-font-size-h7);
  line-height: var(--o-line-height-h7);
  font-weight: 300;
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}

.migration-download {
  color: var(--e-color-text1);
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h4);
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: var(--o-spacing-h4);
    column-gap: var(--o-spacing-h4);

    @media screen and (max-width: 1080px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .download-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 316px;
      @media screen and (max-width: 1080px) {
        min-height: 200px;
      }

      @media screen and (max-width: 768px) {
        min-height: auto;
      }

      .card-top {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .card-title {
          font-size: var(--o-font-size-h5);
          line-height: var(--o-line-height-h5);
          font-weight: 500;
        }
        .card-text {
          margin-top: var(--o-spacing-h5);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--e-color-text4);

          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            margin-top: var(--o-spacing-h10);
          }

          .migration-summary {
            margin-top: var(--o-spacing-h8);

            @media screen and (max-width: 768px) {
              margin-top: var(--o-spacing-h10);
            }
          }
        }
      }
      .card-bottom {
        margin-top: var(--o-spacing-h6);
        @media screen and (max-width: 1080px) {
          margin-top: var(--o-spacing-h4);
        }
        .migration-version {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--e-color-text4);

          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }

        .migration-link {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--e-color-text4);
          margin-top: var(--o-spacing-h5);
          display: flex;
          justify-content: space-between;
          @media screen and (max-width: 1280px) {
            flex-direction: column;
          }
          @media screen and (max-width: 1080px) {
            flex-direction: row;
          }

          @media screen and (max-width: 768px) {
            flex-direction: column;
            margin-top: var(--o-spacing-h8);
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }

          .migration-link-source {
            display: inline-block;
          }

          .migration-link-doc {
            margin-left: var(--o-spacing-h3);
            display: inline-block;
            @media screen and (max-width: 1280px) {
              margin-left: 0;
              margin-top: var(--o-spacing-h8);
            }
            @media screen and (max-width: 1080px) {
              margin-left: var(--o-spacing-h3);
              margin-top: 0;
            }
            @media screen and (max-width: 768px) {
              margin-left: 0;
              margin-top: var(--o-spacing-h8);
            }
          }
        }
      }
    }
  }
}
</style>
