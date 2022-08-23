<script lang="ts" setup>
import MiniTitle from './MiniTitle.vue';
import DocsList from './DocsList.vue';
import OCollapseItem from 'opendesign/collapse/OCollapseItem.vue';
defineProps({
  docsObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
});
</script>
<template>
  <div class="docs">
    <MiniTitle
      :inside-title="docsObj.TITLE_INSIDE"
      :outside-title="docsObj.TITLE_OUTSIDE"
      :special-component="!!docsObj.TAB"
    />
    <div class="docs-tab">
      <template v-if="docsObj.TAB">
        <OTabs v-if="docsObj.TAB">
          <OTabPane
            v-for="item in docsObj.TAB"
            :key="item.VALUE"
            :label="item.VALUE"
          >
            <DocsList :data-list="docsObj[item.KEY].DATA_LIST" />
          </OTabPane>
        </OTabs>
      </template>
      <template v-else>
        <DocsList :data-list="docsObj.DATA_LIST" />
      </template>
    </div>
    <div class="docs-mobile-tab">
      <template v-if="docsObj.TAB">
        <OCollapse
          v-for="item in docsObj.TAB"
          :key="item.VALUE"
          class="collapse"
        >
          <OCollapseItem :title="item.VALUE" class="collapse-item">
            <DocsList :data-list="docsObj[item.KEY].DATA_LIST" />
          </OCollapseItem>
        </OCollapse>
      </template>
      <template v-else>
        <DocsList :data-list="docsObj.DATA_LIST" />
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.docs {
  padding: 0 var(--o-spacing-h5);
  &-tab {
    max-width: 1416px;
    margin: 0 auto;
    @media screen and (min-width: 768px) {
      display: block;
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
    .el-tabs {
      :deep(.el-tabs__header) {
        margin-bottom: var(--o-spacing-h4);
      }
      :deep(.el-tabs__nav) {
        .is-active {
          color: var(--e-color-brand1);
        }
      }
    }
  }
  &-mobile-tab {
    margin-top: 16px;
    @media screen and (min-width: 768px) {
      display: none;
    }
    @media screen and (max-width: 768px) {
      display: block;
    }
    .collapse {
      border-left: none;
      padding: 0;
      &-item {
        --o-collapse-color-border: none;
        padding: 0;
        :deep(.el-collapse-item__header) {
          height: 34px;
          font-size: var(--o-font-size-tip);
          padding: var(--o-spacing-h8) 0 var(--o-spacing-h8) var(--o-spacing-h8);
        }
        :deep(.el-collapse-item__wrap) {
          background-color: var(--e-color-bg1);
          .el-collapse-item__content {
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
