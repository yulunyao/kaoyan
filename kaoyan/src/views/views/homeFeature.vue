<template>
  <div class="content">
    <a-row>
      <a-col :span='7'>
        <a-row style="text-align: left; height: 60px">
          <!-- <a-col :span='12'>
            <a-button type="default" icon="snippets" size="medium" @click="createSubject">
              新建学科
            </a-button>
          </a-col>
          <a-col :span='12'>
            <a-button type="default" icon="history" size="medium" @click="retrieveLearnHistory">
              学习历史
            </a-button>
          </a-col> -->
          <a-button-group size="large">
                <a-button type="default" @click="createSubject">
                  <a-icon type="snippets" />新建学科信息
                </a-button>
                <a-button type="default" @click="retrieveLearnHistory">
                  <a-icon type="history" /> 查看学习历史
                </a-button>
          </a-button-group>
        </a-row>
        <a-row style="text-align: left; height: 60px">
          <a-col :span='24'>
            <a-row>
              <a-button-group size="large">
                <a-button type="primary" @click="downloadTemplate">
                  <a-icon type="download" />下载学科模板
                </a-button>
                <a-button type="primary" @click="uploadTemplate">
                  <a-icon type="upload" /> 上传学科模板
                </a-button>
              </a-button-group>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span='16' :offset='1'>
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
            <a-statistic-countdown title="目标倒计时" :value="deadline" format="D 天 H 时 m 分 s 秒" />
          </a-card>

          <a-card class='countDownCard'>
            <a-spin tip="正在加载，请耐心等待..." :spinning='leftSpin'>
              <div class="spin-content">
                <a-statistic
                  title="总科目数"
                  :value="realForm.length + ` 门科目`"
                  :precision="2"
                  style="margin-right: 50px"
                />
              </div>
            </a-spin>
          </a-card>

          <a-card v-if="realForm.length !== 0" :style="`margin-bottom: 20px; text-align: left; width: 100%; box-shadow: 0px 0px 20px 5px ` + completePercentageColor">
            <a-spin tip="正在加载，请耐心等待..." :spinning='leftSpin'>
              <div class="spin-content">
                <a-statistic
                  title="总完成率"
                  :value="(totalReadPage/totalBookPage) * 100"
                  :precision="2"
                  suffix="%"
                  :value-style="{ color: completePercentageColor }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon :type="(totalReadPage/totalBookPage) * 100 > 50 ? `check-circle` : `close-circle`" />
                  </template>
                </a-statistic>
              </div>
            </a-spin>
          </a-card>

          <a-card v-if="realForm.length !== 0" class='countDownCard'>
            <a-spin tip="正在加载，请耐心等待..." :spinning='leftSpin'>
              <div class="spin-content">
                <a-statistic
                  title="今日目标完成率"
                  :value="purposePercentage * 100"
                  :precision="2"
                  suffix="%"
                  value-style="{ color: grey } "
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon type="clock-circle" />
                  </template>
                </a-statistic>
              </div>
            </a-spin>
          </a-card>

          <a-card v-if="realForm.length !== 0" :style="`margin-bottom: 20px; text-align: left; width: 100%; box-shadow: 0px 0px 20px 5px pink`">
            <a-spin tip="正在加载，请耐心等待..." :spinning='leftSpin'>
              <div class="spin-content">
                <a-statistic
                  title="今日已完成率"
                  :value="todayFinishPercentage * 100"
                  :precision="2"
                  suffix="%"
                  :value-style="todayFinishPercentage < purposePercentage ? { color: `red` }:{ color: `lightgreen` }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon :type="todayFinishPercentage < purposePercentage ? `close-circle` : `check-circle`" />
                  </template>
                </a-statistic>
              </div>
            </a-spin>
          </a-card>
        </a-row>
      </a-col>
      <a-col :span='17' :offset='1' class="right-content">
        <a-spin tip="正在加载，请耐心等待..." :spinning='loadPageSpin' v-if="realForm.length !== 0">
          <div class="spin-content">
            <div v-for="(item, index) in realForm" :key="index" style="margin-bottom: 50px">
              <a-form :form='form'>
                <a-divider>{{item.subject}}</a-divider>
                  <a-row type='flex'>
                    <a-col :span='24'>
                      <a-col :span='12' v-for="(item1, index1) in JSON.parse(item.lessons)" :key="index1">
                        <a-col :span='2'>
                          <a-progress type="circle" :width='48' :percent="parseFloat(((item1.pageCount / item1.totalPage)*100).toFixed(0))"/>
                        </a-col>
                        <a-col :span='20'>
                          <a-form-item :label='item1.subject' :label-col="{span:8}" :wrapper-col="{span:16}">
                            <a-input-number disabled v-decorator="[item1.engName, { initialValue: item1.pageCount, rules: [{ message: '请输入页码!' }] },]" placeholder='请输入页码'></a-input-number> / 共{{item1.totalPage}}页 <a-button type='link' @click="changePageNo(item.subject, item1.engName, item1.pageCount, item1.totalPage)">编辑</a-button>
                          </a-form-item>
                        </a-col>
                      </a-col>
                    </a-col>
                  </a-row>
              </a-form>
              <a-divider>
                <a-button type="default" icon="book" @click="createBook(item.subject)">
                  新建书籍
                </a-button>
                <a-button type="default" @click="deleteSubject(item.subject)">
                  删除此科目
                </a-button>
                <!-- <a-button type='default' @click="showModal(item.type)">提交{{item.type}}进度</a-button> -->
              </a-divider>
              <a-modal :visible='confirmVisible' title='提交' @ok='handleOk()' @cancel='handleCancel'>
                请确认上述信息，确认此次提交吗?
              </a-modal>
            </div>
          </div>
        </a-spin>
        <a-row v-if="realForm.length == 0">
          <a-result class="resultNotion" status="warning" title="还没有科目，请先新建一个！">
            <template #extra>
              <a-button key="console" type="primary" @click="createSubject">
                新建科目
              </a-button>
            </template>
          </a-result>
        </a-row>
      </a-col>
    </a-row>
      <a-modal :visible='deleteSubjectVisible' @ok='handleDeleteSubject' @cancel='handleDeleteSubjectCancel'>
        确认删除{{subjectToDelete}}吗？
      </a-modal>
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

      <a-modal :visible='uploadTemplateVisible' @ok='uploadOk' @cancel='uploadCancel' title='上传模板'>
        <a-upload
          name="file"
          :multiple="true"
          action=""
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 点击上传 </a-button>
        </a-upload>
      </a-modal>

      <a-modal :visible='pageNoVisible' @ok='handlePageNo' title='填写页码' @cancel='handlePageCancel'>
        <a-form :form='pageNoForm'>
          <a-form-item label='已看页码' :label-col="{span:4}" :wrapper-col="{span:20}">
            <a-input-number v-decorator="['seenPage', {rules: [{ required: true, message: '已经看到的页码!' }] },]" placeholder='已经看到的页码!'></a-input-number>
          </a-form-item>
          <a-form-item label='总页码' :label-col="{span:4}" :wrapper-col="{span:20}" v-show="initSet">
            <a-input-number v-decorator="['totalPage', {rules: [{ required: true, message: '请输入总页码!' }] },]" placeholder='请输入总页码!'></a-input-number>
          </a-form-item>
        </a-form>
      </a-modal>

      <a-modal title='学习历史' :visible='historyVisible' @ok='handleHistory' @cancel='handleHistoryCancel'>
        <a-table size='small' :columns="columns" :dataSource="dataSource" rowKey='today_date'></a-table>
      </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [],
      leftSpin: true,
      loadPageSpin: true,
      form: this.$form.createForm(this),
      subjectForm: this.$form.createForm(this),
      bookForm: this.$form.createForm(this),
      pageNoForm: this.$form.createForm(this),
      aList: [],
      confirmVisible: false,
      subjectVisible: false,
      bookVisible: false,
      pageNoVisible: false,
      historyVisible: false,
      deleteSubjectVisible: false,
      currentEditSubject: '',
      currentEditBook: '',
      addToWhichSubject: '',
      submitQueue: '',
      finishPercentage: [],
      completePercentageColor: '',
      purposePercentageColor: '',
      totalBookPage: 0,
      totalReadPage: 0,
      purposePercentage: 0,
      todayFinishPercentage: 0,
      initSet: true,
      isShow: false,
      subjectToDelete: '',
      uploadTemplateVisible: false,
      headers: {
        authorization: 'authorization-text',
      },
      columns: [
        {
          title: '记录日期',
          dataIndex: 'today_date',
          key: 'today_date'
        },
        {
          title: '页码',
          dataIndex: 'today_progress',
          key: 'today_progress'
        },
      ],
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
      deadline: 1608911999000, // 2020年12月26日
    }
  },
  mounted() {
    this.getSubjectList()
  },
  methods: {
    deleteSubject(subject) {
      this.subjectToDelete = subject
      this.deleteSubjectVisible = !this.deleteSubjectVisible
    },
    handleDeleteSubject() {
      this.$ajax.delete({
        url: this.$api.DELETE_SUBJECT + '/1',
        params: {
          subject: this.subjectToDelete
        }
      }).then(res => {
        if(res.code == '200') {
          this.deleteSubjectVisible = !this.deleteSubjectVisible
          this.$message.success('删除成功!')
          this.getSubjectList()
        }
      })
    },
    handleDeleteSubjectCancel() {
      this.deleteSubjectVisible = !this.deleteSubjectVisible
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    uploadTemplate() {
      this.uploadTemplateVisible = !this.uploadTemplateVisible
    },
    getSubjectList() {
      let aList = []
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
            if(!!content[i].lessons) {
              for(let j = 0; j < JSON.parse(content[i].lessons).length; j++) {
                this.totalReadPage += Number(JSON.parse(content[i].lessons)[j].pageCount)
                this.totalBookPage += Number(JSON.parse(content[i].lessons)[j].totalPage)
                // this.finishPercentage.push(content[i].lessons[j].totalPage)
              }
            }
          }

          console.log([this.totalReadPage, this.totalBookPage])
          // 计算每天的目标完成率
          let dayLeft
          let readToTotalRatio = this.totalReadPage / this.totalBookPage
          let percentageLeft = 1 - readToTotalRatio // 剩余的百分比
          // 用剩余的百分比除以剩余时间 + 每天需要的百分比
          let currentTime = Date.now()
          this.todayFinishPercentage = res.data.progress / this.totalBookPage
          if(currentTime) {
            let timestampLeft = this.deadline - currentTime
            dayLeft = this.$moment(this.deadline).diff(currentTime, 'days')
            // console.log((percentageLeft * 100 / dayLeft) + readToTotalRatio)
            // this.purposePercentage = (percentageLeft / dayLeft) + readToTotalRatio
            this.purposePercentage = percentageLeft / dayLeft
            if(readToTotalRatio > this.purposePercentage) {
              this.purposePercentageColor = 'red'
            } else {
              this.purposePercentageColor = 'light-green'
            }
            if(readToTotalRatio > 0.5) {
              this.completePercentageColor = 'lightgreen'
            } else {
              this.completePercentageColor = 'red'
            }
          }
          this.leftSpin = false
          this.loadPageSpin = false
        }
      })
    },
    formParser(name) {
      this.singleForm = name
      return this.$form.createForm(this)
    },
    uploadCancel() {
      this.uploadTemplateVisible = !this.uploadTemplateVisible
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
                  pageCount: '-',
                  totalPage: '-'
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
          this.bookForm.resetFields()
        }
      })
      this.bookVisible = !this.bookVisible
    },
    changePageNo(subjectName, bookName, pageCount, totalPage) {
      this.currentEditSubject = subjectName
      this.currentEditBook = bookName
      // '-'代表该书籍为第一次编辑，则输入框不应disable。往后需要diabled
      if(totalPage == '-') {
        this.initSet = true
      } else {
        this.initSet = false
      }

      this.pageNoForm.getFieldDecorator('seenPage', { initialValue: pageCount })
      this.pageNoForm.getFieldDecorator('totalPage', { initialValue: totalPage })
      this.pageNoVisible = !this.pageNoVisible
      console.log([subjectName, bookName])
    },
    handlePageNo() {
      this.pageNoForm.validateFields((err) => {
        if(!err) {
          const params = {
            'name': this.$cookie.get('name'),
            'today_date': this.$moment().format('L'),
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
          this.pageNoForm.resetFields()
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
    },
    compute(item, read, total) {
      let aList = {}
      console.log([item, read, total])
      // aList[item][read] += read
      // aList[item][total] += total
      console.log(aList)
    },
    retrieveLearnHistory() {
      this.$ajax.get({
        url: this.$api.GET_STUDY_HISTORY
      }).then(res => {
        console.log(JSON.stringify(res))
        this.historyVisible = !this.historyVisible
        this.dataSource = res
      })
    },
    handleHistoryCancel() {
      this.historyVisible = !this.historyVisible
    },
    handleHistory() {
      
    }
  },
}
</script>

<style scoped>
  .content {
    height: 100%;
    width: 90%;
    margin: 0 auto;
  }
  .formStyle {
    background-color: greenyellow;
  }
  .right-content {
    padding: 40px;
    border: 1px solid lightgray;
    border-radius: 10px;
    box-shadow: 0px 0px 50px 5px #cccccc;
    margin-bottom: 100px;
    height: 700px;
    overflow: scroll
  }
  .countDownCard {
    margin-bottom: 20px;
    text-align: left;
    width: 100%;
    box-shadow: 0px 0px 20px 5px #99e3e4;
  }
  .winnieSnow{
    margin: 10px 0px;
  }

  .resultNotion {
    width: 80%;
    margin: 0 auto
  }
</style>