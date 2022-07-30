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
  device: {
    type: Boolean,
    default: true,
  },
});
</script>
<template>
  <div class="docs">
    <MiniTitle
      :device="device"
      :title-inside="docsObj.TITLE_INSIDE"
      :title-outside="docsObj.TITLE_OUTSIDE"
    />
    <div v-if="device" class="docs-tab">
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
    <div v-else class="docs-mobile-tab">
      <template v-if="docsObj.TAB">
        <OCollapse
          v-for="item in docsObj.TAB"
          :key="item.VALUE"
          class="collapse"
        >
          <OCollapseItem :title="item.VALUE" class="collapse-item">
            <DocsList
              :data-list="docsObj[item.KEY].DATA_LIST"
              :device="false"
            />
          </OCollapseItem>
        </OCollapse>
      </template>
      <template v-else>
        <DocsList :data-list="docsObj.DATA_LIST" :device="false" />
      </template>
    </div>
  </div>
</template>
<style lang="scss" setup>
.docs {
  padding: 0 var(--o-spacing-h5);
  &-tab {
    max-width: 1440px;
    margin: 0 auto;
  }
  &-mobile-tab {
    margin-top: 16px;
    .collapse {
      border-left: none;
      padding: 0;
      &-item {
        padding: 0;
        .el-collapse-item__header {
          font-size: var(--o-font-size-tip);
          padding: var(--o-spacing-h8) 0 var(--o-spacing-h8) var(--o-spacing-h8);
        }
        .el-collapse-item__wrap {
          background-color: var(--o-color-bg2);
          .el-collapse-item__content {
            padding: 0 !important;
          }
        }
      }
    }
  }
}
</style>
