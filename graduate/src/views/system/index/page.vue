<template>
  <d2-container>
    <div class="container">
      <div class="left">
        <div class="top">
          <custom-card :button-str="personal_btn_str" :button-function="personal_btn_func">
            <div slot="header">
              <span class="name">{{ this.$store.state.d2admin.user.info.name }}</span>
              <span class="job">{{ this.$store.state.d2admin.user.info.role }}</span>
            </div>
            <div slot="content">
              <div class="items" v-if="!editable">
                <div class="item">
                  <label>年龄：</label><span>{{ form.age }}</span>
                </div>
                <div class="item">
                  <label>员工编号：</label><span>{{ form.id }}</span>
                </div>
                <div class="item">
                  <label>工龄：</label>
                  <el-tooltip effect="dark" :content="'您已经在公司工作了' + form.workYear + '年,请继续加油！'" placement="right">
                    <span>{{ form.workYear }}年</span>
                  </el-tooltip>
                </div>
                <div class="item">
                  <label>绩效：</label><span>{{ form.performance }}%</span>
                </div>
                <div class="item">
                  <label>健康状态：</label><span>{{ form.health ? '欠佳' : '良好' }}</span>
                </div>
                <div class="item">
                  <label>工作状态：</label><span>{{ form.workStatus }}</span>
                </div>
              </div>
              <div class="items" v-if="editable">
                <el-form ref="form" :model="form" label-width="40%">
                  <el-form-item label="年龄：">
                    <el-input v-model="form.age" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="员工编号：">
                    <el-input v-model="form.id" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="工龄：">
                    <el-input v-model="form.workYear" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="绩效：">
                    <el-input v-model="form.performance" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="健康状态：">
                    <el-select v-model="form.health" placeholder="请选择">
                      <el-option
                        v-for="item in healthOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="工作状态：">
                    <el-input v-model="form.workStatus"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </custom-card>
        </div>
        <div class="center">
          <custom-card class="left">
            <div slot="header">
              <i class="el-icon-s-order icon_color"></i>
              <span>通知公告</span>
            </div>
            <div slot="content">
              <div class="item message" v-for="item in messages" :key="item.id">
                <router-link :to="{ name: 'messageDetail', query: { id: item.id } }" class="message_box">
                  <span class="left">{{ item.title }}</span>
                  <span class="right">{{ item.datetime }}</span>
                </router-link>
              </div>
            </div>
          </custom-card>
          <custom-card class="right">
            <div slot="header">
              <i class="el-icon-s-promotion icon_color"></i>
              <span>常用功能</span>
            </div>
            <div slot="content">
              <div class="item funcBox">
                <router-link :to="item.router" v-for="item in usualFunc" class="funcItem">
                  <el-card shadow="always">
                    <i :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                  </el-card>
                </router-link>
              </div>
            </div>
          </custom-card>
        </div>
<!--        <div class="bottom">-->
<!--          <custom-card class="left">-->
<!--            <div slot="header">-->
<!--              <i class="el-icon-s-order icon_color"></i>-->
<!--              <span>紧急警报</span>-->
<!--            </div>-->
<!--            <div slot="content">-->
<!--              <div class="item message" v-for="item in warns" :key="item.id">-->
<!--                <router-link to="MessageDetail" class="message_box">-->
<!--                  <span class="left">{{ item.message }}</span>-->
<!--                  <span class="right">{{ item.datetime }}</span>-->
<!--                </router-link>-->
<!--              </div>-->
<!--            </div>-->
<!--          </custom-card>-->
<!--          <custom-card class="left">-->
<!--            <div slot="header">-->
<!--              <i class="el-icon-s-order icon_color"></i>-->
<!--              <span>待办日程</span>-->
<!--            </div>-->
<!--            <div slot="content">-->
<!--              <div class="item message" v-for="item in tasks" :key="item.id">-->
<!--                <router-link to="MessageDetail" class="message_box">-->
<!--                  <span class="left">{{ item.duty }}</span>-->
<!--                  <span class="right">{{ item.time }}</span>-->
<!--                </router-link>-->
<!--              </div>-->
<!--            </div>-->
<!--          </custom-card>-->
<!--        </div>-->
      </div>
      <div class="right">
        <el-calendar v-model="calendar">
        </el-calendar>
<!--        <custom-card>-->
<!--          <div slot="header">-->
<!--            <span>工作日志</span>-->
<!--          </div>-->
<!--          <div slot="content">-->
<!--            <el-timeline>-->
<!--              <el-timeline-item :timestamp="item.datatime" placement="top" v-for="item in logs">-->
<!--                <el-card>-->
<!--                  <h4>{{ item.message }}</h4>-->
<!--                  <p>由<span class="name">{{ item.name }}</span>提交</p>-->
<!--                </el-card>-->
<!--              </el-timeline-item>-->
<!--            </el-timeline>-->
<!--          </div>-->
<!--        </custom-card>-->
      </div>
    </div>
    <el-divider content-position="center" class="divider">我是有底线的</el-divider>
  </d2-container>
</template>

<script>
import CustomCard from '@/components/CustomCard'
import { getMessage, getUserInfo, getWarn, getTask, getLog } from '@/api/modules/page'
import util from '@/libs/util'
export default {
  created () {
    this.getLoad()
  },
  components: { CustomCard },
  data () {
    return {
      editable: false,
      personal_btn_str: '编辑',
      form: {},
      healthOptions: [{
        value: 0,
        label: '良好'
      }, {
        value: 1,
        label: '欠佳'
      }],
      calendar: new Date(),
      messages: [],
      tasks: [],
      warns: [],
      logs: [],
      usualFunc: [
        {
          router: 'OrderManager/main',
          icon: 'el-icon-tickets',
          title: '订单管理'
        },
        {
          router: '/',
          icon: 'el-icon-truck',
          title: '物流管理'
        },
        {
          router: '/',
          icon: 'el-icon-finished',
          title: '完结报告'
        },
        {
          router: '/',
          icon: 'el-icon-place',
          title: '全球战略'
        },
        {
          router: '/FactoryManager/main',
          icon: 'el-icon-s-tools',
          title: '工厂管理'
        },
        {
          router: '/CustomerManager/main',
          icon: 'el-icon-user-solid',
          title: '客户管理'
        },
        {
          router: '/',
          icon: 'el-icon-money',
          title: '货款验收'
        },
        {
          router: '/',
          icon: 'el-icon-picture',
          title: '数据分析'
        }
      ]
    }
  },
  methods: {
    getLoad () {
      this.setUserInfo()
      this.setMessages()
      // this.setTasks()
      // this.setWarns()
      // this.setLogs()
    },
    personal_btn_func () {
      this.editable = !this.editable
      this.personal_btn_str = this.editable ? '保存' : '编辑'
    },
    async setMessages () {
      const res = await getMessage()
      this.messages = res.data
    },
    async setUserInfo () {
      const id = util.cookies.get('uuid')
      const res = await getUserInfo({ id: id })
      this.form = res.data
    },
    async setTasks () {
      const res = await getTask()
      this.tasks = res.data
    },
    async setWarns () {
      const res = await getWarn()
      this.warns = res.data
    },
    async setLogs () {
      const res = await getLog()
      this.logs = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .el-card{
    border: none;
  }
  .left {
    width: 69%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .top {
      width: 100%;
      height: 200px;
      margin-bottom: 10px;
      ::v-deep .el-card{
        width: 100%;
        height: 100%;
      }
      .el-card__body {
        label {
          display: inline-block;
          width: 40%;
          text-align: right;
        }
      }

      .name {
        font-weight: 700;
      }

      .job {
        color: #778899;
        margin-left: 20px;
        font-size: 12px;
      }

      .items {
        width: 100%;
        color: #778899;
        font-size: 14px;

        .el-form {
          .el-form-item {
            display: inline-block;
            width: 50%;
          }
        }

        .item {
          display: inline-block;
          width: 50%;
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .center,.bottom{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 280px;
      margin-bottom: 10px;
      .icon_color{
        margin-right: 20px;
      }
      .left{
        width: 49%;
        height: 100%;
        .message{
          margin-bottom: 10px;
          .message_box{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .left{
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            flex: 1;
            white-space: nowrap;
          }
          .right{
            white-space: nowrap;
            flex: 0;
            font-size: 12px;
          }
        }
      }
      .right{
        width: 49%;
        height: 100%;
        .funcBox{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
        .funcItem{
          width: 25%;
          height: 90px;
          padding: 4px;
          box-sizing: border-box;
          ::v-deep .el-card {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-card__body {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              padding: 8px;
              font-size: 12px;

              i {
                font-size: 20px;
              }

              span {
                width: 48px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
  .right {
    width: 29%;
    height: 490px;
    ::v-deep .el-calendar {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .el-calendar__header {
        .el-calendar__button-group {
          margin: auto 0;
        }
      }
      .el-calendar__body {
        flex: 1;
        table {
          height: 100%;
          .el-calendar-day {
            height: auto;
          }
        }
      }
    }
    .el-card{
      margin-top: 10px;
      margin-bottom: 10px;
      height: 280px;
      .name{
        margin: 10px;
      }
      .el-card{
        height: auto;
        ::v-deep .el-card__body{
          padding: 4px;
          h4,p{
            margin: 4px;
          }
        }
      }
    }
  }
}
</style>
