import { computed, defineComponent, toRefs } from 'vue';
import { tagProps, TagProps } from './tag-types';
import './tag.scss';

export default defineComponent({
  name: 'OTag',
  props: tagProps,
  emits: ['click'],
  setup(props: TagProps, { emit, slots }) {
    const { size, type } = toRefs(props);

    const classNames = computed(() => {
      return [
        'o-tag',
        `o-tag-size-${size.value}`,
        `o-tag-type-${type.value}`,
      ].join(' ');
    });

    const onClick = (e: MouseEvent) => {
      emit('click', e);
    };

    return () => {
      return (
        <span class={classNames.value} onClick={onClick}>
          <span>{slots.default?.()}</span>
        </span>
      );
    };
  },
});
