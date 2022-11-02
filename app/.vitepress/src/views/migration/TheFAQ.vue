<script setup lang="ts">
import faqInfo from '@/data/migration/migration-faq';
</script>

<template>
  <div class="migration-faq">
    <div class="instruction">
      <div class="content">
        <div class="title">
          <p>{{ faqInfo.instruction.title }}</p>
        </div>
        <div class="description">
          <span>{{ faqInfo.instruction.text_1 }}</span>
          <a :href="faqInfo.instruction.link" target="_blank">{{
            faqInfo.instruction.link_text
          }}</a>
          <span>{{ faqInfo.instruction.text_2 }}</span>
        </div>
      </div>
    </div>

    <div
      v-for="item in faqInfo.chats"
      :key="item.question"
      class="question-answer"
    >
      <p class="question">{{ item.question }}</p>
      <div class="answer">
        <div class="answer-text">
          <span v-for="it in item.answers" :key="it.text">
            {{ !it.isLink ? it.text : '' }}
            <a v-if="it.isLink" :href="it.link" target="_blank">{{
              it.text
            }}</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.migration-faq {
  .instruction {
    display: flex;
    background: rgba(254, 229, 184, 0.2);
    width: 85%;
    border-left: 6px solid #feb32a;
    border-radius: 8px 0px 0px 8px;

    .content {
      padding: 20px;
      .title {
        p {
          font-size: 16px;
          color: #000000;
          line-height: 26px;
        }
      }

      .description {
        font-size: 14px;
        color: #36383d;
        line-height: 24px;
      }
    }
  }

  .question-answer {
    margin-top: 20px;
    .question {
      font-size: 14px;
      font-weight: 400;
      color: #555555;
      line-height: 22px;
    }

    .answer {
      display: flex;
      align-items: center;
      background: #fff;
      border-left: 2px solid #002fa7;
      .answer-text {
        font-size: 14px;
        font-weight: 400;
        color: #555555;
        line-height: 22px;
        padding: 16px;
        display: inline;
      }
    }
  }
}
</style>
