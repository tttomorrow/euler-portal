<script setup lang="ts">
import { useAttrs, ref, computed } from 'vue';
import { useI18n } from '@/i18n';

import IconFilter from '~icons/app/icon-double_caret_vertical.svg';
import IconX from '~icons/app/x.svg';

const i18n = useI18n();
const userCaseData = computed(() => i18n.value.screen);
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const emit = defineEmits(['filter']);

const attrs = useAttrs();
// 筛选抽屉
const isDrawerOpen = ref(false);
const showscreen = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const pichoption = ref<string[]>([]); // 抽屉高亮
const options = ref<string[]>([]);
const tagitems = ref<string[]>([]); // 标签数组

// 选择标签
const clickoption = (option: string) => {
  if (options.value.length > 0) {
    for (let i = 0; i <= options.value.length; i++) {
      if (options.value[i] === option) {
        options.value.splice(i, 1);
        return;
      }
    }
  }
  options.value.push(option);
  tagitems.value = options.value;
};
// 确定
const sureclick = () => {
  pichoption.value = options.value;
  isDrawerOpen.value = !isDrawerOpen.value;
  emit('filter', pichoption.value);
};
// 删除标签
const deltag = (data: string) => {
  for (let i = 0; i <= pichoption.value.length; i++) {
    if (pichoption.value[i] === data) {
      pichoption.value.splice(i, 1);
      emit('filter', pichoption.value);
      return;
    }
  }
};
// 选中按钮高亮
const btnhighlight = (data: string) => {
  for (let i = 0; i <= pichoption.value.length; i++) {
    if (pichoption.value[i] === data) {
      return true;
    }
  }
  if (pichoption.value.length === 0) {
    for (let i = 0; i <= options.value.length; i++) {
      if (options.value[i] === data) {
        return true;
      }
    }
  }
};
</script>

<template>
  <div class="o-screen" v-bind="attrs">
    <div class="o-screen-header">
      <div class="o-screen-header-button" @click="showscreen">
        {{ userCaseData.FILTER }}
        <div class="o-screen-header-button-icon">
          <OIcon class="icon"><IconFilter /></OIcon>
        </div>
      </div>
    </div>
    <div class="o-screen-tags">
      <OTag
        v-for="item in tagitems"
        :key="item"
        type="text"
        class="o-screen-tags-tag"
        >{{ item }}
        <OIcon class="o-screen-tags-tag-icon" @click="deltag(item)"
          ><IconX
        /></OIcon>
      </OTag>
    </div>
    <div class="o-screen-box">
      <ODrawer
        v-model="isDrawerOpen"
        direction="btt"
        :show-close="true"
        custom-class="o-drawer"
        class="o-screen-box-drawer"
        size="auto"
      >
        <template #header>
          <div class="o-screen-box-drawer-header">
            <p>{{ userCaseData.FILTER }}</p>
          </div>
        </template>
        <div
          v-for="item in props.data"
          :key="item"
          class="o-screen-box-drawer-content"
        >
          <p class="o-screen-box-drawer-content-title">{{ item.title }}</p>
          <div class="o-screen-box-drawer-content-options">
            <OTag
              v-for="sele in item.select"
              :key="sele"
              class="o-screen-box-drawer-content-options-option"
              type="primary"
              :multiple="btnhighlight(sele)"
              :class="{ active: btnhighlight(sele) }"
              @click="clickoption(sele)"
              >{{ sele }}</OTag
            >
          </div>
        </div>
        <template #footer>
          <div class="o-screen-box-drawer-footer">
            <OButton type="primary" @click="sureclick">{{
              userCaseData.SURE
            }}</OButton>
          </div>
        </template>
      </ODrawer>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.o-tag) {
  font-size: var(--o-font-size-tip);
  line-height: var(--o-line-height-tip);
  padding-left: var(--o-spacing-h8);
  padding-right: 0;
  color: var(--o-color-text3);
}
:deep(.o-button) {
  width: 104px;
  height: 28px;
  font-size: var(--o-font-size-text);
  line-height: var(--o-line-height-text);
  justify-content: center;
}
.o-screen {
  &-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    &-button {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin: var(--o-spacing-h5);
      color: var(--o-color-text3);
      &-icon {
        display: inline-block;
        .icon {
          position: relative;
          bottom: -2px;
        }
      }
    }
  }
  &-tags {
    padding: 0 var(--o-spacing-h5);
    &-tag {
      margin-right: var(--o-spacing-h8);
      margin-bottom: var(--o-spacing-h8);
      background-color: var(--o-color-secondary);
      &-icon {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-tip);
        position: relative;
        top: 1px;
      }
    }
  }
  &-box {
    &-drawer {
      &-header {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        text-align: center;
        p {
          display: inline-block;
        }
      }
      &-content {
        &-title {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
        &-options {
          &-option {
            display: inline-block;
            padding: 2px var(--o-spacing-h8);
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            margin: var(--o-spacing-h8);
            border: 1px solid var(--o-color-transparent);
            &.active {
              border: 1px solid var(--o-color-brand);
            }
          }
        }
      }
      &-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
