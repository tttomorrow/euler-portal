import { onMounted, onUnmounted, ref } from 'vue';

const useWindowResize = () => {
  const screenWidth = ref(NaN);
  const onResize = () => {
    screenWidth.value =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  };
  onMounted(() => {
    screenWidth.value =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  return screenWidth;
};

export default useWindowResize;
