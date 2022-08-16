<script setup lang="ts">
import AOS from 'aos';
import { onMounted } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

const configData = useData();
const i18n = useI18n();
const router = useRouter();
const language = configData.lang;

defineProps({
  sigList: {
    type: Array,
    default: () => [],
  },
});

const toSigDetail = (value: any) => {
  router.go(`/${language.value}/sig/sig-detail/?id=${value.id}`);
};
onMounted(() => {
  AOS.init({
    offset: 200,
    duration: 800,
    delay: 100,
  });
});
</script>

<template>
  <div class="middle">
    <ul class="sig-board">
      <li
        v-for="(item,index) in (sigList as any)"
        :key="index"
        data-aos="fade-zoom-in"
        class="sig-board-item"
      >
        <h2 @click="toSigDetail(item)">{{ item.group_name }}</h2>
        <ul class="sig-board-item-info">
          <li class="sig-board-item-info-page">
            <img src="@/assets/svg-icons/icon-home.svg" />
            <span>
              <a target="_black" :href="item.home_page">
                {{ i18n.sig.SIG_LIST.HOME_PAGE }}
              </a>
            </span>
          </li>
          <li class="sig-board-item-info-mail">
            <img src="@/assets/svg-icons/icon-mail.svg" />
            <span
              >{{ i18n.sig.SIG_LIST.MAIL }} :
              <a :href="'mailto:' + item.maillist">
                {{ item.maillist }}
              </a>
            </span>
          </li>
          <li class="sig-board-item-info-video">
            <img src="@/assets/svg-icons/icon-video.svg" />
            <span> {{ i18n.sig.SIG_LIST.IRC }} : {{ item.irc }} </span>
          </li>
          <li class="sig-board-item-info-user">
            <img src="@/assets/svg-icons/icon-user.svg" />
            <span>{{ i18n.sig.SIG_LIST.MANAGER }} :</span>
          </li>
        </ul>
        <ul class="sig-board-item-admin">
          <li
            v-for="subItem in JSON.parse(item.owners).slice(0, 4)"
            :key="subItem.gitee_id"
          >
            <img :src="subItem.avatar_url" />
            <span>{{ subItem.gitee_id }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.middle {
  margin-top: var(--o-spacing-h2);
}
.sig-board {
  column-count: 2;
  column-gap: var(--o-spacing-h1);
  max-width: 1340px;
  margin: 0 auto;
  @media (max-width: 780px) {
    column-count: 1;
    column-gap: 0;
    padding: 0 var(--o-spacing-h5);
  }
  &-item {
    max-width: 530px;
    box-shadow: var(--o-shadow-base);
    margin-bottom: var(--o-spacing-h1);
    break-inside: avoid;
    padding: var(--o-spacing-h2);
    background-color: var(--e-color-bg2);
    @media (max-width: 1080px) {
      width: 100%;
      padding: var(--o-spacing-h3) var(--o-spacing-h3) 0 var(--o-spacing-h3);
    }
    h2 {
      padding-bottom: var(--o-spacing-h7);
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      color: var(--e-color-text1);
      &:hover {
        color: var(--e-color-brand2);
      }
    }
    &-info {
      color: var(--e-color-text1);
      @media (max-width: 1080px) {
        margin-top: var(--o-spacing-h7);
      }
      &-mail {
        word-break: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      li {
        margin-top: var(--o-spacing-h7);
        img {
          width: var(--o-line-height-h8);
          height: var(--o-line-height-h8);
          margin-right: var(--o-spacing-h8);
          vertical-align: middle;
        }
      }
    }
    &-admin {
      padding: 0 var(--o-spacing-h7);
      display: flex;
      justify-content: start;
      @media (max-width: 780px) {
        flex-wrap: wrap;
      }
      li {
        flex: 0 0 25%;
        text-align: center;
        margin-top: var(--o-spacing-h5);
        @media (max-width: 780px) {
          flex: 0 0 50%;
        }
        img {
          width: 70px;
          height: 70px;
          display: block;
          margin: 0 auto;
          border-radius: 50%;
          @media (max-width: 1080px) {
            margin-bottom: var(--o-spacing-h4);
          }
        }
        span {
          display: inline-block;
          margin-top: var(--o-spacing-h6);
          color: var(--e-color-text1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
