<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElInput class="o-input" v-bind="attrs"></ElInput>
</template>

<style lang="scss" scoped></style>
