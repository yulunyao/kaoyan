// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import ajax from '@/server/ajax.js'
import api from '@/server/api.js'
import jscookie from 'js-cookie'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')  

import {
  Switch,
  ConfigProvider,
  Statistic,
  Timeline,
  Avatar,
  message,
  Button,
  Progress,
  Spin,
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Form,
  Input,
  InputNumber,
  Card,
  Dropdown,
  Row,
  Col,
  Checkbox,
  Select,
  Alert,
  Table,
  Divider,
  Upload,
  Modal,
  // Tree,
  Tabs,
  DatePicker,
  // skeleton,
  Pagination,
  Tag,
  Badge,
  // TreeSelect,
  Radio,
  Cascader,
  LocaleProvider,
  // Steps,
  Anchor,
  // Collapse,
  Popconfirm,
  // Progress,
  // Switch,
  Calendar,
  // BackTop,
  // Carousel,
  Tooltip
  // CollapsePanel
} from 'ant-design-vue'

Vue.prototype.$ajax = ajax
Vue.prototype.$api = api
Vue.prototype.$message = message
Vue.prototype.$cookie = jscookie
Vue.prototype.$moment = moment

Vue.use(Avatar)
Vue.use(Switch)
Vue.use(ConfigProvider)
Vue.use(Statistic)
Vue.use(Timeline)
Vue.use(Button)
Vue.use(Progress)
Vue.use(Spin)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Breadcrumb)
Vue.use(Form)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Card)
Vue.use(Dropdown)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Alert)
Vue.use(Table)
Vue.use(Divider)
Vue.use(Upload)
Vue.use(Modal)
// Vue.use(badge)
// Vue.use(skeleton)
// Vue.use(Tree)
Vue.use(Tabs)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Badge)
// Vue.use(TreeSelect)
Vue.use(Radio)
Vue.use(Cascader)
Vue.use(LocaleProvider)
// Vue.use(Steps)
Vue.use(Anchor)
// Vue.use(Collapse)
Vue.use(Popconfirm)
// Vue.use(Progress)
// Vue.use(Switch)
Vue.use(Calendar)
// Vue.use(BackTop)
// Vue.use(Carousel)
Vue.use(Tooltip)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
