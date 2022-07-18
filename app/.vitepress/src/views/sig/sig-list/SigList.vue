<script setup lang="ts">
import { useData } from 'vitepress';

const { theme: i18n } = useData();
</script>
<template>
  <div class="sig-list">
    <div class="list-table">
      <table>
        <thead>
          <tr>
            <th>{{ i18n.sig.SIG_LIST.HOME_PAGE }}</th>
            <th>{{ i18n.sig.SIG_LIST.MAIL }}</th>
            <th>{{ i18n.sig.SIG_LIST.IRC }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="item in t('sig.SIG_LIST.DEMO')"> -->
          <!-- <td>{{ item }}</td> -->
          <!-- <td>{{ item.gitee }}</td>
            <td>{{ item.email }}</td>
            <td>暂无</td> -->
          <!-- </tr> -->
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
