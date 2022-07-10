import { defineComponent } from 'vue';
import { checkboxProps } from './checkbox-types';

export default defineComponent({
  name: 'OCheckbox',
  props: checkboxProps,
  emits: ['update:modelValue', 'change'],
  setup() {
    return () => {
      return {};
    };
  },
});
