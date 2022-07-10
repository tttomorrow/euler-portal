import { defineComponent, provide, toRefs } from 'vue';
import {
  radioGroupKey,
  radioGroupProps,
  RadioGroupProps,
} from './radio-group-types';

export default defineComponent({
  name: 'ORadioGroup',
  props: radioGroupProps,
  emits: ['update:modelValue', 'change'],
  setup(props: RadioGroupProps, { emit, slots }) {
    const { modelValue, disabled } = toRefs(props);

    const handleChange = (val: string | number | boolean, e: Event) => {
      emit('update:modelValue', val);
      emit('change', val, e);
    };

    // 注入
    provide(radioGroupKey, { modelValue, disabled, handleChange });

    return () => {
      return <div class="o-radio-group">{slots.default?.()}</div>;
    };
  },
});
