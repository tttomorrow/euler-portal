<script setup lang="ts">
import { onMounted, ShallowRef, toRefs } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from 'vue';
interface MapMsg {
  name: string;
  latitude: number;
  longitude: number;
}
const props = defineProps({
  mapData: {
    type: Array,
    default: () => [],
  },
});
const { mapData } = toRefs(props);
const map: ShallowRef<any> = shallowRef(null);
const initMap = (lng: number, lat: number) => {
  AMapLoader.load({
    key: 'c042a36d28964bd1e1e1785849fb335f', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  })
    .then((AMap) => {
      map.value = new AMap.Map('container', {
        zoom: 4, //  初始化地图级别
        center: [lng, lat], //  初始化地图中心点位置
      });
      const point: any[] = [];

      (mapData.value as MapMsg[])?.forEach((item: MapMsg) => {
        const marker = new AMap.Marker({
          position: new AMap.LngLat(item.longitude, item.latitude),
          size: new AMap.Size(30, 35),
          title: item.name,
          anchor: 'bottom-center',
        });
        point.push(marker);
      });

      map.value.add(point);

      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.value.addControl(
          new AMap.ToolBar({
            locate: true,
            noIpLocate: true,
          })
        );
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.value.addControl(new AMap.Scale());
      });
    })
    .catch((e: any) => {
      throw new Error(e);
    });
};
onMounted(() => {
  setTimeout(function () {
    initMap(114.06063, 22.64407);
  }, 500);
});
</script>

<template>
  <div id="container"></div>
</template>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
