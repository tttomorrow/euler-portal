<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  alert(tab, event);
};
</script>

<template>
  <div class="wrapper">
    <OTabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </OTabs>
  </div>
</template>

<style lang="scss" scoped>
.bisheng-info {
  display: flex;
  justify-content: space-between;
}
</style>
