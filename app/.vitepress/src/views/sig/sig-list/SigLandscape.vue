<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { onMounted, ref } from 'vue';
import { getSigLandscape } from '@/api/api-sig';

const configData = useData();
const router = useRouter();
const language = configData.lang;

const toSigDetail = (name: string): void => {
  router.go(`/${language.value}/sig/sig-detail/?name=${name}`);
};

const landscapeInfo = ref({});

onMounted(async () => {
  try {
    const res = await getSigLandscape();
    const info: any = [];
    for (let i = 0, len = res.data?.length; i < len; i++) {
      const item = res.data[i];
      if (item.group === '' && item.feature === '') {
        continue;
      }

      if (
        !info.find((group: any) => {
          return group.groupName === item.group;
        })
      ) {
        info.push({
          groupName: item.group,
          features: [],
        });
      }

      const groupInfo = info.find((group: any) => {
        return group.groupName === item.group;
      });

      if (
        !groupInfo?.features.find((feature: any) => {
          return feature.featureName === item.feature;
        })
      ) {
        groupInfo?.features.push({
          featureName: item.feature,
          sigs: [],
        });
      }

      const featureInfo = groupInfo?.features.find((feature: any) => {
        return feature.featureName === item.feature;
      });
      featureInfo.sigs.push(item.sig_names);
    }
    info.sort((b: any, a: any) => {
      return a.features.length - b.features.length;
    });
    info.forEach((group: any) => {
      group.features.sort((b: any, a: any) => {
        return a.sigs.length - b.sigs.length;
      });
      group.features.forEach((feature: any) => {
        feature.sigs.sort((b: any, a: any) => {
          return b.localeCompare(a);
        });
      });
    });

    landscapeInfo.value = info;
  } catch (err: any) {
    throw new Error(err);
  }
});
</script>

<template>
  <div class="landscape">
    <div
      v-for="group in landscapeInfo"
      :key="group.groupName"
      class="landscape-group"
    >
      <p class="landscape-group-title">{{ group?.groupName }}</p>
      <div class="landscape-feature">
        <div
          v-for="feature in group?.features"
          :key="feature.featureName"
          class="landscape-feature-item"
        >
          <div class="feature-item-title">{{ feature.featureName }}</div>
          <ul class="feature-item-sig">
            <li
              v-for="sig in feature.sigs"
              :key="sig"
              class="sig-item"
              @click="toSigDetail(sig)"
            >
              {{ sig }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.landscape {
  margin-top: var(--o-spacing-h2);

  .landscape-group {
    & + .landscape-group {
      margin-top: var(--o-spacing-h2);
    }

    .landscape-group-title {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height7);
      margin-bottom: var(--o-spacing-h4);
      color: var(--o-color-text1);
    }

    .landscape-feature {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      column-gap: var(--o-spacing-h6);
      .landscape-feature-item {
        &:nth-child(1) {
          .feature-item-title {
            background-color: #7f6bbe;
          }
        }
        &:nth-child(2) {
          .feature-item-title {
            background-color: #4d7dff;
          }
        }
        &:nth-child(3) {
          .feature-item-title {
            background-color: #db7c61;
          }
        }
        &:nth-child(4) {
          .feature-item-title {
            background-color: #8e9aaf;
          }
        }
        &:nth-child(5) {
          .feature-item-title {
            background-color: #505d75;
          }
        }
        &:nth-child(6) {
          .feature-item-title {
            background-color: #2a9d8f;
          }
        }
        &:nth-child(7) {
          .feature-item-title {
            background-color: #fec456;
          }
        }

        .feature-item-title {
          padding: 18px;
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
          color: var(--o-color-white);
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .feature-item-sig {
          margin-top: var(--o-spacing-h5);
          .sig-item {
            & + .sig-item {
              margin-top: var(--o-spacing-h5);
            }

            text-align: center;
            padding: 0 23px;
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: #002fa7;
            border: 1px solid #002fa7;
            background-color: #ffffff;
            transition: all 0.3s;
            cursor: pointer;

            &:hover {
              background: #002fa7;
              color: #ffffff;
              transform: scale(1.05, 1.05);
            }
          }
        }
      }
    }

    &:nth-child(2) {
      .landscape-feature {
        .landscape-feature-item {
          &:nth-child(1) {
            .feature-item-title {
              background-color: #8e583d;
            }
          }
          &:nth-child(2) {
            .feature-item-title {
              background-color: #73c0de;
            }
          }
          &:nth-child(3) {
            .feature-item-title {
              background-color: #cec79a;
            }
          }
          &:nth-child(4) {
            .feature-item-title {
              background-color: #4c3e72;
            }
          }
          &:nth-child(5) {
            .feature-item-title {
              background-color: #19647e;
            }
          }
          &:nth-child(6) {
            .feature-item-title {
              background-color: #c44e4e;
            }
          }
        }
      }
    }
  }
}

.dark {
  .landscape-group {
    .landscape-feature {
      .landscape-feature-item {
        .feature-item-sig {
          .sig-item {
            color: #ffffff;
            background: #383838;
            border: 1px solid #b2b2b2;

            &:hover {
              background: #406fe7;
              color: #ffffff;
              border-color: #406fe7;
            }
          }
        }
      }
    }
  }
}
</style>
