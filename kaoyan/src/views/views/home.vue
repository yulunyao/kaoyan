<template>
  <div>
    <div id="components-layout-demo-basic">
      <a-layout>
        <a-layout-header>
          <a-row>
            <a-col :span='20'></a-col>
            <a-col :span='1'>
              <a-avatar
                shape="square"
                size="large"
                :style="{ backgroundColor: color, verticalAlign: 'middle' }"
              >
                {{ avatarValue }}
              </a-avatar>
            </a-col>
            <a-col :span='2'>当前用户: {{avatarValue}}</a-col>
            <a-col :span='1'>
              <a-button type="link" block @click="showModal">
                注销
              </a-button>
            </a-col>
          </a-row>
        </a-layout-header>
        <a-layout>
          <a-layout-sider>
            123
          </a-layout-sider>
          <a-layout-content>
            <router-view />
          </a-layout-content>
        </a-layout>
        <!-- <a-layout-footer>Footer</a-layout-footer> -->
      </a-layout>
      <a-modal :visible='visible' @ok='handleLogOut'>
        确认注销吗?
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: 'grey',
      avatarValue: '姚雨仑',
      visible: false
    }
  },
  mounted() {
    let token = this.$cookie.get('token')
    if(!!token) {
      this.getUserInfoByToken()
    }
  },
  methods: {
    getUserInfoByToken() {
      this.$ajax.post({
        url: this.$api.POST_USER_INFO
      }).then(res => { 
        this.avatarValue = res.name
      })
    },
    showModal() {
      this.visible = !this.visible
    },
    handleLogOut() {
      this.$cookie.remove('token')
      this.$router.push({
        name: 'login'
      })
    }
  },
}
</script>

<style scoped>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  /* background: white; */
  /* color: #fff; */
  color: grey
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  /* background: white; */
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  /* background: rgba(16, 142, 233, 1); */
  background-color: white;
  /* color: rgb(253, 236, 236); */
  color: black;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>