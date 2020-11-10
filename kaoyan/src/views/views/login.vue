<template>
  <div id="login-container" :style="bgStyle">
    <!-- <a-row type='flex' align='middle' justify='center' style="height: 1000px"> -->
      <a-card title="用户登录" :bordered="true" style="width: 28%" class="login-box">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                { rules: [{ required: true, message: 'Please input your username!' }] },
              ]"
              placeholder="Username"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your Password!' }] },
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" class="login-form-button" @click="handleLogin">
              登录
            </a-button>
            或
            <a href="">
              注册
            </a>
          </a-form-item>
        </a-form>
      </a-card>
    <!-- </a-row> -->
  </div>
</template>

<script>
import bgImg from '@/assets/images/learning-3245793_1920.jpg'
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      bgStyle: {'background-image': 'url(' + bgImg +')'},
    }
  },
  methods: {
    handleLogin() {
      this.form.validateFields((err) => {
        if(!err) {
          console.log(JSON.stringify(this.form.getFieldsValue()))
          const params = {
            'username': this.form.getFieldValue('userName'),
            'password': this.form.getFieldValue('password')
          }
          console.log(params)
          // console.log(this.$api.POST_LOGIN)
          this.$ajax.post({
            url: this.$api.POST_LOGIN,
            params: params
          }).then(res => {
            if (res.code === 200) {
              this.$cookie.set('token', res.data.accessToken)
              this.$router.push({
                name: 'homepage'
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  },
}
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

#login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
}

.login-box {
  width: 280px;
  background: #ffffff;
  border-radius: 5px;
}

/* .loginCard {
  margin: 0 auto;
  position: relative;
  margin-top: 50%;
  top: 50%
} */
</style>