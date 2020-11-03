<template>
  <div id="app">
    <!-- <Loader /> -->
    <a-config-provider :locale="zh_CN">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import Loader from '@/views/Layout/loader.vue'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  data() {
    return {
      zh_CN
    }
  },
  components: {
    Loader
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
