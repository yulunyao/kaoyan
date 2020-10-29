<template>
  <div class="content">
    <a-row>
      <div v-for="(item, index) in formMock" :key="index" style="margin-bottom: 50px">
        <a-divider>{{item.type}}</a-divider>
          <a-form :form='formParser(item.type)'>
            <a-col :span='12' v-for="(item1, index1) in item.children" :key="index1">
              <a-form-item :label='item1.subject' :label-col="{span:8}" :wrapper-col="{span:16}">
                <a-input-number :placeholder='`共` + item1.totalPage + `页`'></a-input-number>
              </a-form-item>
            </a-col>
          </a-form>
        <a-divider>
          <a-button type='default' @click="showModal(item.type)">提交{{item.type}}进度</a-button>
        </a-divider>
        <a-modal :visible='confirmVisible' title='提交' @ok='handleOk(submitQueue)' @cancel='confirmVisible = !confirmVisible'>
          此次提交的是【{{submitQueue}}】, 确认此次提交吗?
        </a-modal>
      </div>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singleForm: '',
      confirmVisible: false,
      submitQueue: '',
      formMock: [
        {
          type: '中文',
          engName: 'Chinese',
          children: [
            {
              subject: '文艺理论',
              engName: 'wyll',
              pageCount: '233',
              totalPage: '499'
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
    formParser(type) {
      this.singleForm = type
      return this.$form.createForm(this)
    },
    showModal(type) {
      console.log(type)
      this.submitQueue = type
      // this.singleForm.validateFields((err) => {
      //   if(err) {
      //     console.log('err');
      //   }
      // })
      this.confirmVisible = !this.confirmVisible
    },
    handleOk(submitQueue) {
      if(!!submitQueue) {
        this.confirmVisible = !this.confirmVisible
      } else {
        this.$message.error('无submitQueue值')
      }
    }
  },
}
</script>

<style scoped>
  .content {
    width: 80%;
    margin: 0 auto;
  }
</style>