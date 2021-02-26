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
                { rules: [{ required: true, message: '请输入用户名!' }] },
              ]"
              placeholder="用户名"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码!' }] },
              ]"
              type="password"
              placeholder="密码"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" class="login-form-button" @click="handleLogin">
              登录
            </a-button>
            或
            <a-button type='link' @click="showRegister">
              注册
            </a-button>
            /
            <a-button type='link' @click="gotoToolsColletion">
              访问小工具大全
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <a-modal :visible='registerVisible' @ok='handleRegister' title='注册用户' @cancel='handleRegisterCancel'>
        <a-form :form='registerForm'>
          <a-form-item>
            <a-form-item label='用户名' :label-col="{span:4}" :wrapper-col="{span:20}">
              <a-input v-decorator="['name', {rules: [{ required: true, message: '请输入用户名!' }] },]" placeholder='用户名'></a-input>
            </a-form-item>
            <a-form-item label='密码' :label-col="{span:4}" :wrapper-col="{span:20}">
              <a-input v-decorator="['pass', {rules: [{ required: true, message: '请输入密码!' }] },]" placeholder='密码'></a-input>
            </a-form-item>
          </a-form-item>
        </a-form>
      </a-modal>
    <!-- </a-row> -->
  </div>
</template>

<script>
import bgImg from '@/assets/images/learning-3245793_1920.jpg'
export default {
  data() {
    return {
      registerVisible: false,
      registerForm: this.$form.createForm(this),
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
    },
    showRegister() {
      this.registerVisible = !this.registerVisible
    },
    gotoToolsColletion() {
      this.$router.push({name: 'toolCollection'})
    },
    handleRegister() {
      this.registerForm.validateFields((err) => {
        if(!err) {
          const params = {
            name: this.registerForm.getFieldValue('name'),
            pass: this.registerForm.getFieldValue('pass'),
            age: '1',
            role_id: '1'
          }
          this.$ajax.post({
            url: this.$api.POST_USER,
            params: params
          }).then(res => {
            if(!!res) {
              this.registerVisible = !this.registerVisible
              this.$message.info('用户创建成功，请登录')
            }
          })
        }
      })
    },
    handleRegisterCancel() {
      this.registerVisible = !this.registerVisible
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