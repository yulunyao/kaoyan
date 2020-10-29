<template>
  <div>
    <a-spin tip="加载中..." :spinning='spinning'>
      <div class="spin-content">
        我的描述文案是自定义的。。。
      </div>
    </a-spin>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinning: false
    }
  },
}
</script>

<style scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>