import { computed, defineComponent, inject } from 'vue';
import { radioGroupKey } from './radio-group-types';
import { radioProps, RadioProps } from './radio-types';
import './radio.scss';

export default defineComponent({
  name: 'ORadio',
  props: radioProps,
  emits: ['update:modelValue', 'change'],
  setup(props: RadioProps, { emit, slots }) {
    const radioGroupInjection = inject(radioGroupKey);

    // 是否禁用
    const isDisabled = computed(
      () => radioGroupInjection?.disabled.value || props.disabled
    );

    // 是否选中
    const isChecked = computed(
      () =>
        props.value ===
        (radioGroupInjection
          ? radioGroupInjection.modelValue.value
          : props.modelValue)
    );

    const onClick = (e: Event) => {
      e.stopPropagation();
    };

    const onChange = (e: Event) => {
      const val = props.value;
      radioGroupInjection?.handleChange(val, e);
      emit('update:modelValue', val);
      emit('change', val, e);
    };

    return () => {
      return (
        <label class="o-radio">
          <input
            type="radio"
            name={props.name}
            disabled={isDisabled.value}
            checked={isChecked.value}
            onClick={onClick}
            onChange={onChange}
          />
          <span class="o-radio-label">{slots.default?.()}</span>
        </label>
      );
    };
  },
});
