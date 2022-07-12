<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElTable class="o-table" v-bind="attrs"></ElTable>
</template>

<style lang="scss"></style>
