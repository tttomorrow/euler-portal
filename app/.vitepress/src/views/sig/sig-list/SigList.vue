<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tableHeadList = computed(() => {
  return [
    t('listName[0]'),
    t('listName[1]'),
    t('listName[2]'),
    t('listName[3]'),
  ];
});
const tableBodyList = computed(() => {
  return [
    {
      name: t('listMember[0].name'),
      gitee: t('listMember[0].gitee'),
      email: t('listMember[0].email'),
      id: '232443',
    },
    {
      name: t('listMember[1].name'),
      gitee: t('listMember[1].gitee'),
      email: t('listMember[1].email'),
      id: 'wretrt',
    },
  ];
});
</script>
<template>
  <div class="sig-list">
    <div class="list-table">
      <table>
        <thead>
          <tr>
            <th v-for="item in tableHeadList" :key="item">{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableBodyList" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.gitee }}</td>
            <td>{{ item.email }}</td>
            <td>暂无</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sig-list {
  max-width: 1504px;
  margin: 0 auto;
  .list-table {
    width: 100%;
    padding: var(--o-spacing-m);
    background-color: var(--o-color-bg);
    table {
      border-collapse: collapse;
      width: 100%;
      thead {
        background-color: var(--o-color-bg3);
        th {
          height: 54px;
          border: none !important;
          text-align: left;
          &:nth-of-type(1) {
            width: 300px;
            padding-left: var(--o-spacing-m);
          }
        }
      }
      tbody {
        tr {
          td {
            height: 54px;
            &:nth-of-type(1) {
              width: 300px;
              padding-left: var(--o-spacing-m);
            }
          }
        }
      }
    }
  }
}
</style>
