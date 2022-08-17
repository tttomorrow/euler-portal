<script lang="ts" setup>
import dayjs from 'dayjs';
defineProps({
  frontmatter: {
    type: Object || String,
    default() {
      return {};
    },
  },
});
// 格式化日期
const resolveDate = (date: any) => {
  return dayjs(date).format('YYYY-MM-DD');
};
</script>

<template>
  <div class="markdown-body-title">
    <h2 class="page-title">{{ frontmatter.title }}</h2>
    <div v-if="frontmatter.author" class="info">
      <template v-if="Array.isArray(frontmatter.author)">
        <span class="author" v-for="item in frontmatter.author" :key="item"
          >{{ item }}
        </span>
      </template>
      <span class="author" v-else>{{ frontmatter.author }} </span>
      <span v-if="frontmatter.date" class="date"
        >{{ resolveDate(frontmatter.date) }}
      </span>
      <OTag v-for="item in frontmatter.tags" :key="item" size="small">{{
        item
      }}</OTag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.markdown-body-title {
  margin-bottom: 40px;
  border-bottom: 1px solid var(--o-color-secondary);
  padding-bottom: 24px;
  .page-title {
    font-size: 36px;
    line-height: 48px;
    margin: 0;
    font-weight: 500;
  }
  .info {
    color: var(--e-color-text4);
    font-size: 12px;
    margin-top: 20px;
    .line {
      margin: 0 16px;
    }
    .author {
      margin-left: 0;
      &:not(:first-child)::before {
        content: ',';
        padding-left: 4px;
      }
    }
    .date {
      margin: 0 12px;
      padding: 0 12px;
      border-left: 1px solid var(--e-color-border1);
      border-right: 1px solid var(--e-color-border1);
    }
    .o-tag {
      margin-right: 4px;
    }
  }
}
@media (max-width: 1100px) {
  .markdown-body-title {
    margin-bottom: 24px;
    .page-title {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
