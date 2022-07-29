<script lang="ts" setup>
defineProps({
  frontmatter: {
    type: Object || String,
    default() {
      return {};
    },
  },
});
</script>

<template>
  <div class="markdown-body-title">
    <h2 class="page-title">{{ frontmatter.title }}</h2>
    <div v-if="frontmatter.author" class="info">
      <span class="author"
        >{{ frontmatter.author }} <span class="line">|</span></span
      >
      <span v-if="frontmatter.date" class="date"
        >{{ frontmatter.date }}
        <span v-if="frontmatter.tags" class="line">|</span></span
      >
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
    color: var(--o-color-text3);
    font-size: 12px;
    margin-top: 20px;
    .line {
      margin: 0 16px;
    }
    .author {
      margin-left: 0;
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
