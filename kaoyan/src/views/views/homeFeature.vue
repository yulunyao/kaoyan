<template>
  <div class="content">
    <a-row>
      <div v-for="(item, index) in formMock" :key="index" style="margin-bottom: 50px">
        <a-form :form='form'>
          <a-divider>{{item.type}}</a-divider>
            <a-row>
              <a-col :span='2'>
                <a-progress type="circle" :percent="item.finishPercentage"/>
              </a-col>
              <a-col :span='21' :offset='1'>
                <a-col :span='12' v-for="(item1, index1) in item.children" :key="index1">
                  <a-form-item :label='item1.subject' :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-input-number v-decorator="[item1.engName, { initialValue: item1.pageCount, rules: [{ required: true, message: '请输入页码!' }] },]" placeholder='请输入页码'></a-input-number> / 共{{item1.totalPage}}页
                  </a-form-item>
                </a-col>
              </a-col>
            </a-row>
        </a-form>
        <a-divider>
          <!-- <a-button type='default' @click="showModal(item.type)">提交{{item.type}}进度</a-button> -->
        </a-divider>
        <a-modal :visible='confirmVisible' title='提交' @ok='handleOk()' @cancel='confirmVisible = !confirmVisible'>
          请确认上述信息，确认此次提交吗?
        </a-modal>
      </div>
      <a-button type='default' @click='showModal()'>提交进度</a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      confirmVisible: false,
      submitQueue: '',
      formMock: [
        {
          type: '中文',
          engName: 'Chinese',
          finishPercentage: 23,
          children: [
            {
              subject: '文艺理论',
              engName: 'wyll',
              pageCount: '233',
              totalPage: '499',
            },
            {
              subject: '中国现当代文学',
              engName: 'zgxddwx',
              pageCount: '233',
              totalPage: '499'
            },
            {
              subject: '中国古代文学',
              engName: 'zggdwx',
              pageCount: '233',
              totalPage: '499'
            },
            {
              subject: '外国文学',
              engName: 'wgwx',
              pageCount: '233',
              totalPage: '499'
            }
          ]
        },
        {
          type: '教育',
          engName: 'Education',
          finishPercentage: 100,
          children: [
            {
              subject: '333中外教育史',
              engName: 'zwjys',
              pageCount: '233',
              totalPage: '499'
            },
            {
              subject: '333教育原理',
              engName: 'jyyl',
              pageCount: '233',
              totalPage: '499'
            },
            {
              subject: '333教育心理学',
              engName: 'jyxlx',
              pageCount: '233',
              totalPage: '499'
            },
          ]
        }
      ]
    }
  },
  methods: {
    formParser(name) {
      this.singleForm = name
      return this.$form.createForm(this)
    },
    showModal(type) {
      console.log(type)
      this.submitQueue = type
      this.form.validateFields((err) => {
        if(err) {
          // console.log('err')
          this.confirmVisible = !this.confirmVisible
        } else {
          this.confirmVisible = !this.confirmVisible
        }
      })
    },
    handleOk() {
      alert(JSON.stringify(this.form.getFieldsValue()))
    }
  },
}
</script>

<style scoped>
  .content {
    width: 80%;
    margin: 0 auto;
  }

  .formStyle {
    background-color: greenyellow;
  }
</style>