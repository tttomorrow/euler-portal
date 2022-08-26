<script lang="ts" setup>
import OCard from 'opendesign/card/OCard.vue';
const downloadInfo = [
  {
    name: 'oec-hardware',
    description: 'openEuler硬件兼容性验证测试框架',
    summary:
      'oec-hardware是保证 openEuler 与硬件平台的兼容性，验证仅限于基本功能验证，不包括性能测试等其它测试',
    version: '1.0.0',
    source: {
      name: '获取源码',
      link: 'https://gitee.com/openeuler/oec-hardware',
    },
    doc: {
      name: 'oec-hardware使用指南',
      link: 'https://gitee.com/openeuler/oec-hardware/blob/master/README.md',
    },
  },
  {
    name: 'Compass-CI',
    description: '一个可持续集成的开源开放式测试服务平台',
    summary:
      '集构建&测试系统、登录调测、测试分析比较、辅助定位于一体，旨在给社区开发者提供友好的开发体验，与社区开发者一起繁荣开源软件生态及提升开源软件质量。',
    version: '1.0.0',
    source: {
      name: '获取源码',
      link: 'https://gitee.com/openeuler/compass-ci',
    },
    doc: {
      name: 'Compass-CI使用指南',
      link: 'https://gitee.com/openeuler/compass-ci/blob/master/README.zh.md',
    },
  },
  {
    name: 'x2openEuler',
    description: '从其他系统迁移到openEuler硬件和软件、配置兼容性评估',
    summary:
      '软件评估，支持扫描并分析软件包、源码包，评估软件的兼容性及可移植性。配置评估，支持扫描并收集环境的操作系统配置信息，评估用户操作系统的配置兼容性。硬件评估，支持扫描并分析用户环境硬件信息，评估硬件兼容性。',
    version: '2.0.0',
    source: {
      name: '软件获取',
      link: 'https://repo.oepkgs.net/openEuler/rpm/openEuler-20.03-LTS-SP1/contrib/x2openEuler/',
    },
    doc: {
      name: 'oec-hardware使用指南',
      link: 'https://docs.openeuler.org/zh/docs/20.03_LTS_SP1/docs/thirdparty_migration/x2openEuleruseguide.html',
    },
  },
  {
    name: 'oecp',
    description: '操作系统之间的差异比较及兼容性分析工具',
    summary:
      '1.检测2个ISO（基于RPM）的软件包，软件包内文件，库文件接口（C/C++）,内核KABI的变化差异，根据这些差异可以分析2个OS之间的兼容性，为软件移植提供了重要参考 2.OECP还可以检测同一个软件（RPM包）在不同版本下的变化以及差异，判断软件包的文件，接口等变化，可以分析得出软件不同版本之间的兼容性',
    version: '1.0.0',
    source: {
      name: '获取源码',
      link: 'https://toscode.gitee.com/openeuler/oecp/tree/master',
    },
    doc: {
      name: 'oec-hardware使用指南',
      link: 'https://toscode.gitee.com/openeuler/oecp/blob/master/README.md',
    },
  },
];
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
  @media screen {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
  }
}

.migration-download {
  color: var(--e-color-text1);
  margin-top: 64px;
  h1 {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    font-weight: 300;
  }

  .migration-download-content {
    margin-top: 40px;
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
