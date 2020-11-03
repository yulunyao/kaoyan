<template>
  <div class="content">
    <a-row>
      <a-col :span='4' style="text-align: left">
        <a-button type="default" icon="snippets" size="large" @click="createSubject">
          新建学科
        </a-button>
      </a-col>
      <a-col :span='17' :offset='3'>
        <a-row type='flex' align='middle' justify='space-between' class="winnieSnow">
          <!-- <img src="@/assets/images/snowwhite.png" height='150' style="text-align='left'"/>
          <img src="@/assets/images/winnie.png" height='150'/> -->
          <a-col :span='10'>
            <img v-if="isShow" src="@/assets/images/snowwhite.png" height='150'/>
          </a-col>
          <a-col :span='4'>
            <a-switch checked-children="让维尼休息片刻" un-checked-children="开启维尼守护" default-unchecked @change="handleWinnieSnow" />
          </a-col>
          <a-col :span='10'>
            <img v-if="isShow" src="@/assets/images/winnie.png" height='150'/>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row type='flex'>
      <a-col :span='6'>
        <a-row type='flex' justify='space-between'>
          <!-- <a-progress type="circle" :percent="((totalReadPage/totalBookPage) * 100).toFixed(1)"/> -->
          <a-card class="countDownCard">
            <a-statistic-countdown title="考研倒计时" :value="deadline" format="D 天 H 时 m 分 s 秒" />
          </a-card>

          <a-card class='countDownCard'>
            <a-statistic
              title="总科目数"
              :value="realForm.length + ` 门科目`"
              :precision="2"
              style="margin-right: 50px"
            >
            </a-statistic>
          </a-card>

          <a-card class='countDownCard'>
            <a-statistic
              title="总完成率"
              :value="(totalReadPage/totalBookPage) * 100"
              :precision="2"
              suffix="%"
              :value-style="(totalReadPage/totalBookPage) * 100 > 50 ? { color: 'red' } : { color: 'green' } "
              style="margin-right: 50px"
            >
              <template #prefix>
                <a-icon :type="(totalReadPage/totalBookPage) * 100 > 50 ? `rise` : `fall`" />
              </template>
            </a-statistic>
          </a-card>

          <a-card class='countDownCard'>
            <a-statistic
              title="今日目标完成率"
              :value="purposePercentage"
              :precision="2"
              suffix="%"
              :value-style="(totalReadPage/totalBookPage) * 100 > 50 ? { color: 'red' } : { color: 'green' } "
              style="margin-right: 50px"
            >
              <template #prefix>
                <a-icon :type="(totalReadPage/totalBookPage) * 100 > 50 ? `rise` : `fall`" />
              </template>
            </a-statistic>
          </a-card>
        </a-row>
      </a-col>
      <a-col :span='17' :offset='1' class="right-content">
        <div v-for="(item, index) in realForm" :key="index" style="margin-bottom: 50px">
          <a-form :form='form'>
            <a-divider>{{item.subject}}</a-divider>
              <a-row>
                <a-col :span='2'>
                  <a-progress type="circle" :percent="item.finishPercentage"/>
                </a-col>
                <a-col :span='21' :offset='1'>
                  <a-col :span='12' v-for="(item1, index1) in JSON.parse(item.lessons)" :key="index1">
                    <a-form-item :label='item1.subject' :label-col="{span:8}" :wrapper-col="{span:16}">
                      <a-input-number v-decorator="[item1.engName, { initialValue: item1.pageCount, rules: [{ required: true, message: '请输入页码!' }] },]" placeholder='请输入页码'></a-input-number> / 共{{item1.totalPage}}页 <a-button type='link' @click="changePageNo(item.subject, item1.engName)">编辑</a-button>
                    </a-form-item>
                  </a-col>
                </a-col>
              </a-row>
          </a-form>
          <a-divider>
            <a-button type="default" icon="book" size="large" @click="createBook(item.subject)">
              新建书籍
            </a-button>
            <!-- <a-button type='default' @click="showModal(item.type)">提交{{item.type}}进度</a-button> -->
          </a-divider>
          <a-modal :visible='confirmVisible' title='提交' @ok='handleOk()' @cancel='handleCancel'>
            请确认上述信息，确认此次提交吗?
          </a-modal>
        </div>
      </a-col>
    </a-row>
      <a-modal title='新建科目' :visible='subjectVisible' @ok='handleSubject' @cancel='handleSubjectCancel'>
        <a-form :form='subjectForm'>
          <a-form-item :label='`选项` + index' :label-col="{span:4}" :wrapper-col="{span:20}" v-for="(item, index) in items" :key="index">
            <a-input v-decorator="[item.name, {rules: [{ message: '请输入学科名!' }] },]" placeholder='请输入学科名'></a-input>
          </a-form-item>
        </a-form>
      </a-modal>

      <a-modal :visible='bookVisible' @ok='handleBook' :title='`添加书籍到【` + addToWhichSubject + `】`' @cancel='handleBookCancel'>
        <a-form :form='bookForm'>
          <a-form-item :label='`选项` + index' :label-col="{span:4}" :wrapper-col="{span:20}" v-for="(item, index) in items" :key="index">
            <a-input v-decorator="[item.name, {rules: [{ message: '请输入书籍名!' }] },]" placeholder='请输入书籍名'></a-input>
          </a-form-item>
        </a-form>
      </a-modal>

      <a-modal :visible='pageNoVisible' @ok='handlePageNo' title='填写页码' @cancel='handlePageCancel'>
        <a-form :form='pageNoForm'>
          <a-form-item label='已看页码' :label-col="{span:4}" :wrapper-col="{span:20}">
            <a-input-number v-decorator="['seenPage', {rules: [{ required: true, message: '已经看到的页码!' }] },]" placeholder='已经看到的页码!'></a-input-number>
          </a-form-item>
          <a-form-item label='总页码' :label-col="{span:4}" :wrapper-col="{span:20}">
            <a-input-number v-decorator="['totalPage', {rules: [{ required: true, message: '请输入总页码!' }] },]" placeholder='请输入总页码!'></a-input-number>
          </a-form-item>
        </a-form>
      </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      subjectForm: this.$form.createForm(this),
      bookForm: this.$form.createForm(this),
      pageNoForm: this.$form.createForm(this),
      confirmVisible: false,
      subjectVisible: false,
      bookVisible: false,
      pageNoVisible: false,
      currentEditSubject: '',
      currentEditBook: '',
      addToWhichSubject: '',
      submitQueue: '',
      finishPercentage: [],
      totalBookPage: 0,
      totalReadPage: 0,
      purposePercentage: 0,
      isShow: false,
      items: [
        {
          name: 'op1',
        },
        {
          name: 'op2',
        },
        {
          name: 'op3',
        },
        {
          name: 'op4',
        },
        {
          name: 'op5',
        }
      ],
      realForm: [],
      deadline: 1608911999000,
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
  mounted() {
    this.getSubjectList(),
    this.getPurposePercentage()
  },
  methods: {
    getPurposePercentage() {
      // 12月26日的时间戳 - 当前时间的时间戳得到剩余时间的时间戳
      // 将该时间戳转为天数，用100 / 天数 得到每天需要增加的百分比
    },
    getSubjectList() {
      this.finishPercentage = []
      this.totalReadPage = 0
      this.totalBookPage = 0
      this.$ajax.get({
        url: this.$api.GET_SUBJECTS_LIST,
      }).then(res => {
        if(res.code == '200') {
          this.realForm = res.data.content
          // 计算完成度百分比
          let content = res.data.content
          for(let i = 0; i < content.length; i++) {
            console.log(JSON.parse(content[i].lessons))
            this.finishPercentage.push(JSON.parse(content[i].lessons))
            for(let j = 0; j < JSON.parse(content[i].lessons).length; j++) {
              this.totalReadPage += Number(JSON.parse(content[i].lessons)[j].pageCount)
              this.totalBookPage += Number(JSON.parse(content[i].lessons)[j].totalPage)
              // this.finishPercentage.push(content[i].lessons[j].totalPage)
            }
          }
          console.log(JSON.stringify(this.finishPercentage))
          console.log([this.totalReadPage, this.totalBookPage])
        }
      })
    },
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
    },
    createSubject() {
      this.subjectVisible = !this.subjectVisible
    },
    handleSubject() {
      this.subjectForm.validateFields((err) => {
        if(!err) {
          const params = this.subjectForm.getFieldsValue()
          console.log(params)
          this.$ajax.post({
            url: this.$api.POST_SUBJECTS,
            params: params
          }).then(res => {
            if(res.code == '200') {
              this.$message.success(res.msg)
              this.getSubjectList()
            }
          })
          this.subjectForm.resetFields()
        }
      })
      this.subjectVisible = !this.subjectVisible
    },
    createBook(subject) {
      this.addToWhichSubject = subject
      this.bookVisible = !this.bookVisible
    },
    handleBook() {
      let parseList = []
      // 先知道需要添加书籍到哪个学科
      this.bookForm.validateFields((err) => {
        if(!err) {
          const params = this.bookForm.getFieldsValue()
          for(let i = 0; i < Object.values(params).length; i++) {
            if(Object.values(params)[i] !== undefined) {
              console.log(Object.values(params)[i])
              parseList.push(
                {
                  subject: Object.values(params)[i],
                  engName: Object.values(params)[i],
                  pageCount: '0',
                  totalPage: '399'
                }
              )
            }
          }
          this.$ajax.post({
            url: this.$api.POST_BOOKS_LIST,
            params: {
              subject: this.addToWhichSubject,
              lessons: parseList
            }
          }).then(res => {
            if(res.code == '200') {
              this.$message.success(res.msg)
              this.getSubjectList()
            }
          })
        }
      })
      this.bookVisible = !this.bookVisible
    },
    changePageNo(subjectName, bookName) {
      this.currentEditSubject = subjectName
      this.currentEditBook = bookName
      this.pageNoVisible = !this.pageNoVisible
      console.log([subjectName, bookName])
    },
    handlePageNo() {
      this.pageNoForm.validateFields((err) => {
        if(!err) {
          const params = {
            'subject': this.currentEditSubject,
            'book': this.currentEditBook,
            'pageCount': this.pageNoForm.getFieldValue('seenPage'),
            'totalPage': this.pageNoForm.getFieldValue('totalPage')
          }

          if(params) {
            this.$ajax.post({
              url: this.$api.POST_BOOKS_PAGE,
              params
            }).then(res => {
              if(res.code == '200') {
                this.pageNoVisible = !this.pageNoVisible
                this.$message.success(res.msg)
                this.getSubjectList()
              }
            })
          }
        }
      })
    },
    handleCancel() {
      this.confirmVisible = !this.confirmVisible
    },
    handlePageCancel() {
      this.pageNoVisible = !this.pageNoVisible
    },
    handleBookCancel() {
      this.bookVisible = !this.bookVisible
    },
    handleSubjectCancel() {
      this.subjectVisible = !this.subjectVisible
    },
    handleWinnieSnow(check) {
      this.isShow = check
    }
  },
}
</script>

<style scoped>
  .content {
    width: 90%;
    margin: 0 auto;
  }

  .formStyle {
    background-color: greenyellow;
  }

  .right-content {
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 10px;
    box-shadow: 0px 0px 50px 5px #cccccc;
    margin-bottom: 100px;
    height: 700px;
    overflow: scroll
  }

  .countDownCard {
    margin-bottom: 10px;
    text-align: left;
    width: 100%;
    box-shadow: 0px 0px 50px 5px #99e3e4;
  }

  .winnieSnow{
    margin: 10px 0px;
  }
</style>