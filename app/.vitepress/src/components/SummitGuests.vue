<script setup lang="ts">
defineProps({
  lecturerList: {
    type: Object,
    default: () => null,
  },
});
</script>

<template>
  <div class="lecturer-list">
    <div
      v-for="item in lecturerList"
      :key="item.name"
      class="lecturer-list-item"
    >
      <img :src="item.img" />
      <p>{{ item.name }}</p>
      <div
        v-for="titleItem in item.position"
        :key="titleItem"
        class="lecturer-list-item-title"
      >
        <p>{{ titleItem }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lecturer-list {
  max-width: 1340px;
  margin: 0 auto;
  margin-top: var(--o-spacing-h2);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 780px) {
    width: 375px;
  }
  &-item {
    width: 180px;
    flex: 0 0 25%;
    @media (max-width: 780px) {
      flex: 0 0 50%;
    }
    img {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      display: block;
    }
    p {
      font-size: var(--o-spacing-h5);
      color: var(--o-color-brand);
      text-align: center;
      margin-top: 20px;
    }
    &-title {
      margin-bottom: var(--o-spacing-h4);
      p {
        color: var(--o-color-text2);
        font-size: var(--o-font-size-text);
        font-weight: 400;
        line-height: var(-o-line-height-text);
      }
    }
  }
}
</style>
