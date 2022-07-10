import { computed, defineComponent, toRefs } from 'vue';
import { buttonProps, ButtonProps } from './button-types';
import './button.scss';

export default defineComponent({
  name: 'OButton',
  props: buttonProps,
  emits: ['click'],
  setup(props: ButtonProps, { emit, slots }) {
    const { size, type, status, disabled, nativeType } = toRefs(props);

    const classNames = computed(() => {
      return [
        'o-button',
        `o-button-size-${size.value}`,
        `o-button-type-${type.value}`,
        `o-button-status-${status.value}`,
        disabled.value && 'is-disabled',
      ].join(' ');
    });

    const onClick = (e: MouseEvent) => {
      emit('click', e);
    };

    return () => {
      return (
        <button
          class={classNames.value}
          onClick={onClick}
          type={nativeType.value}
        >
          {slots.prefixIcon ? <span class="prefix-icon"></span> : ''}
          <span>{slots.default?.()}</span>
          {slots.suffixIcon ? <span class="suffix-icon"></span> : ''}
        </button>
      );
    };
  },
});
