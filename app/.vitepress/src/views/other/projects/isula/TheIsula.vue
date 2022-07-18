<script lang="ts" setup></script>
<template>
  <div>
    <div class="isula-banner">banner</div>
    <div class="isula-body">
      <div class="isula-body-content">
        <div class="isula-intro">
          <div class="isula-intro-img">img</div>
          <div class="isula-intro-text">text</div>
        </div>
        <div class="title">
          <p class="title-text">架构</p>
        </div>
        <div class="tab">tab</div>
        <div class="isula-feats">
          <div class="isula-feats-text">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div class="isula-feats-img">图片</div>
        </div>
        <div class="title">
          <p class="title-text">文档</p>
        </div>
        <div class="tab">tab</div>
        <div class="document-box">
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.isula-banner {
  width: 100%;
  height: 382px;
  background-color: cornflowerblue;
}
.isula-body {
  margin: var(--o-spacing-l) 0;
  width: 100%;
  &-content {
    max-width: 1504px;
    padding: 0 44px;
    margin: 0 auto;
    .isula-intro {
      height: 454px;
      &-img {
        width: 100%;
        height: 290px;
        background-color: #fff;
        margin-bottom: var(--o-spacing-m);
      }
      &-text {
        padding: var(--o-spacing-m);
        background-color: #fff;
      }
    }
    .title {
      height: 48px;
      width: 100%;
      position: relative;
      background-color: aquamarine;
      &-text {
        font-size: var(--o-font-size-h3);
        font-weight: 300;
        color: #000000;
        line-height: var(--o-line-height-h3);
        position: absolute;
        left: 50%;
        bottom: -40%;
      }
    }
    .tab {
      height: 104px;
      width: 100%;
      background-color: #ccc;
    }
    .isula-feats {
      width: 100%;
      height: 958px;
      padding: var(--o-spacing-m);
      background-color: #fff;
      display: flex;
      flex-direction: column;
      &-text {
        height: 176px;
        font-size: var(--o-font-size-text);
        font-weight: 400;
        color: #000000;
        line-height: var(--o-line-height-text);
      }
      &-img {
        flex: 1;
        align-self: center;
      }
    }
    .document-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .card {
        width: 456px;
        height: 192px;
        background: #ffffff;
        margin-bottom: var(--o-spacing-s3);
      }
    }
  }
}
</style>
