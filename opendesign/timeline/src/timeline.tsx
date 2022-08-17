import { defineComponent, onMounted, ref, Ref, toRefs } from 'vue';
import { timelineProps, TimelineProps } from './timeline-types';
import IconLeft from '~icons/app/icon-left.svg';
import IconRight from '~icons/app/icon-right.svg';
import IconChecked from '~icons/app/icon-checked.svg';
import IconUnchecked from '~icons/app/icon-unchecked.svg';
import './timeline.scss';

export default defineComponent({
  name: 'OTimeline',
  props: timelineProps,
  emits: ['update:modelValue'],
  setup(props: TimelineProps, { emit }) {
    const { leftArrow, rightArrow, modelValue } = toRefs(props);

    const SPLITEMONTH = 6;

    const onClick = (index: number) => {
      activeTab.value = index;
      emit('update:modelValue', timeList.value[activeTab.value]);
    };

    const initDate = (year: number, month: number) => {
      const result = [];
      if (month > SPLITEMONTH) {
        for (let i = SPLITEMONTH + 1; i <= 12; i++) {
          result?.push(year + '-' + (i < 10 ? '0' + i : i));
          if (month === i) {
            activeTab.value = i - SPLITEMONTH - 1;
          }
        }
      } else {
        for (let i = 1; i <= SPLITEMONTH; i++) {
          result?.push(year + '-' + (i < 10 ? '0' + i : i));
          if (month === i) {
            activeTab.value = i - 1;
          }
        }
      }

      return result;
    };

    const onClickLeft = () => {
      if (activeTab.value === 0) {
        const date = new Date(timeList.value[activeTab.value]);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        if (month > SPLITEMONTH) {
          timeList.value = initDate(year, SPLITEMONTH);
        } else {
          timeList.value = initDate(year - 1, 12);
        }
      } else {
        activeTab.value = activeTab.value - 1;
      }
      emit('update:modelValue', timeList.value[activeTab.value]);
    };

    const onClickRight = () => {
      if (activeTab.value === SPLITEMONTH - 1) {
        const date = new Date(timeList.value[activeTab.value]);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        if (month > SPLITEMONTH) {
          timeList.value = initDate(year + 1, 1);
        } else {
          timeList.value = initDate(year, SPLITEMONTH + 1);
        }
      } else {
        activeTab.value = activeTab.value + 1;
      }
      emit('update:modelValue', timeList.value[activeTab.value]);
    };

    const activeTab = ref(0);

    const timeList: Ref<string[]> = ref([]);

    onMounted(() => {
      const date = !isNaN(new Date(modelValue.value).getTime())
        ? new Date(modelValue.value)
        : new Date();

      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      timeList.value = initDate(year, month);
    });

    return () => {
      return (
        <div class="o-timeline">
          {leftArrow && leftArrow.value ? (
            <IconLeft
              class="o-timeline-left-arrow"
              onClick={onClickLeft}
            ></IconLeft>
          ) : (
            ''
          )}
          <ul class="o-timeline-list">
            {timeList.value.map((item, index) => {
              return (
                <li
                  class={[
                    'o-timeline-item',
                    index === activeTab.value ? 'active' : '',
                  ]}
                  onClick={() => onClick(index)}
                >
                  <p class="o-timeline-day">{item}</p>
                  {index === activeTab.value ? (
                    <IconChecked class="o-timeline-icon"></IconChecked>
                  ) : (
                    <IconUnchecked class="o-timeline-icon"></IconUnchecked>
                  )}
                </li>
              );
            })}
          </ul>
          {rightArrow && rightArrow.value && (
            <IconRight
              class="o-timeline-right-arrow"
              onClick={onClickRight}
            ></IconRight>
          )}
        </div>
      );
    };
  },
});
