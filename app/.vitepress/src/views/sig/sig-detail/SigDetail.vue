<script setup lang="ts">
import BreadCrumbs from './BreadCrumbs.vue';
import IconArrowRight from '~icons/app/right.svg';
</script>
<template>
  <div class="sig-detail">
    <BreadCrumbs />
    <div class="content">
      <h3>A-Tune</h3>
      <div class="brief-introduction">
        <h4>SIG简介</h4>
        <p>
          The A-Tune team is responsible for exploration of optimization
          technologies and AI-assisted performance analysis
        </p>
        <p class="email">
          <span>邮件列表:</span>
          <a href="mailto:a-tune@openeuler.org">a-tune@openeuler.org</a>
        </p>
      </div>
      <div class="meeting">
        <h5>组织会议</h5>
        <div class="schedule"></div>
      </div>
      <div class="member">
        <h5>项目成员</h5>
        <ul>
          <li>
            <img src="../../../assets/sig-detail/yangdi.png" alt="yangdi" />
            <p class="name">杨迪</p>
            <p class="introduction">Maintainer</p>
          </li>
          <li>
            <img src="../../../assets/sig-detail/yangdi.png" alt="yangdi" />
            <p class="name">杨迪</p>
            <p class="introduction">Maintainer</p>
          </li>
          <li>
            <img src="../../../assets/sig-detail/yangdi.png" alt="yangdi" />
            <p class="name">杨迪</p>
            <p class="introduction">Maintainer</p>
          </li>
          <li>
            <img src="../../../assets/sig-detail/yangdi.png" alt="yangdi" />
            <p class="name">杨迪</p>
            <p class="introduction">Maintainer</p>
          </li>
        </ul>
      </div>
      <div class="recent-event">
        <h5>最新动态</h5>
        <div class="dynamic">
          <div class="item">
            <div class="header">
              <span class="left">博客</span>
              <a class="right">
                <span>更多</span>
                <OIcon class="icon-more">
                  <IconArrowRight />
                </OIcon>
              </a>
            </div>
            <ul class="body">
              <li class="empty">
                我看你骨骼惊奇，必是写文好手。这里有一本发<a href="">博客攻略</a
                >，赶紧拿回去看看吧。
              </li>
            </ul>
          </div>
          <div class="item">
            <div class="header">
              <span class="left">博客</span>
              <a class="right">
                <span>更多</span>
                <OIcon class="icon-more">
                  <IconArrowRight />
                </OIcon>
              </a>
            </div>
            <ul class="body">
              <li class="empty">
                我看你骨骼惊奇，必是写文好手。这里有一本发<a href="">博客攻略</a
                >，赶紧拿回去看看吧。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sig-detail {
  max-width: 1504px;
  padding: 0 44px;
  margin: 0 auto;
  .content {
    width: 100%;
    padding: var(--o-spacing-m);
    background-color: var(--o-color-bg);
    h3 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text2);
      font-weight: 500;
    }
    .brief-introduction {
      margin-top: var(--o-spacing-m);
      h4 {
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        color: var(--o-color-text2);
      }
      p {
        margin-top: var(--o-spacing-s2);
        font-size: var(--o-font-size-text);
        line-height: 22px;
        color: var(--o-color-text3);
      }
    }
    .meeting {
      margin-top: var(--o-spacing-m);
      color: var(--o-color-text2);
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
      .schedule {
        margin-top: var(--o-spacing-s3);
        .calendar {
          width: 448px;
        }
      }
    }
    .member {
      margin-top: var(--o-spacing-m);
      color: var(--o-color-text2);
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
      ul {
        display: flex;
        margin-top: var(--o-spacing-s3);
        li {
          text-align: center;
          margin-right: 72px;
          .name {
            margin-top: var(--o-spacing-s2);
            font-size: var(--o-font-size-h8);
            line-height: var(--o-line-height-h8);
          }
          .introduction {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
      }
    }
    .recent-event {
      margin-top: var(--o-spacing-m);
      color: var(--o-color-text2);
      h5 {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
      .dynamic {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 24px;
        margin-top: var(--o-spacing-s3);
        .item {
          max-width: 656px;
          padding: 40px;
          background-color: var(--o-color-bg2);
          border: 1px solid transparent;
          .header {
            display: flex;
            width: 100%;
            justify-content: space-between;
            .left {
              font-size: var(--o-font-size-h6);
              line-height: var(--o-line-height-h6);
              font-weight: 600;
              &::after {
                display: block;
                content: '';
                width: 20px;
                height: 2px;
                background-color: var(--o-color-brand);
              }
            }
            .right {
              font-size: var(--o-font-size-text);
              line-height: 22px;
              cursor: pointer;
              .icon-more {
                font-size: var(--o-font-size-h8);
                margin-left: var(--o-spacing-s1);
                position: relative;
                top: 2px;
                color: var(--o-color-brand);
              }
            }
          }
          .body {
            margin-top: var(--o-spacing-s3);
            font-size: var(--o-font-size-text);
            line-height: 22px;
          }
          &:hover {
            background-color: var(--o-color-bg);
            border: 1px solid var(--o-color-brand_hover);
          }
        }
      }
    }
  }
}
@media (max-width: 1100px) {
  .sig-detail {
    padding: 0 16px;
  }
}
</style>
