import { onMounted, onUnmounted, ref } from 'vue';
import { isBrowser } from '@/shared/utils';

const useWindowSroll = () => {
  let top = NaN;

  if (isBrowser()) {
    top = document.documentElement.scrollTop || document.body.scrollTop;
  }

  const screenWidth = ref(top);
  const onScroll = () => {
    screenWidth.value =
      document.documentElement.scrollTop || document.body.scrollTop;
  };

  onMounted(() => {
    screenWidth.value =
      document.documentElement.scrollTop || document.body.scrollTop;

    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onScroll);
  });

  return screenWidth;
};

export default useWindowSroll;
