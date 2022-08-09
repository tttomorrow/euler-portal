import { computed, defineComponent } from 'vue';
import { checkboxProps, CheckboxProps } from './checkbox-types';

export default defineComponent({
  name: 'OCheckbox',
  props: checkboxProps,
  emits: ['update:modelValue', 'change'],
  setup(props: CheckboxProps, { emit, slots }) {
    // 是否禁用
    const isDisabled = computed(() => props.disabled);
    // 是否选中
    const isChecked = computed(() => props.value === props.modelValue);

    const onClick = (e: Event) => {
      e.stopPropagation();
    };

    return () => {
      return (
        <label
          class={['o-checkbox', isChecked.value ? 'o-checkbox-checked' : '']}
        >
          <input
            type="checkbox"
            disabled={isDisabled.value}
            checked={isChecked.value}
            onClick={onClick}
          />
          <span class="o-checkbox-label">{slots.default?.()}</span>
        </label>
      );
    };
  },
});
