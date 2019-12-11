<template>
  <div class="editAnswer">
    <!--      发送作业-->
    <el-container class="container">

      <el-container class="content">

        <el-header class="nav">
          <p class="text">发送作业</p>
        </el-header>

        <el-main class="middle">
          <el-row class="homeWork">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark firstTitle every">
                <span class="title">作业标题</span>
                <el-input v-model="input" placeholder="11月12日语文日常作业"></el-input>
              </div>
            </el-col>
          </el-row>
          <!--          备注-->
          <el-row class="remarks">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark above">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="您还有什么需要同学们需要注意，写点什么吧..."
                  v-model="textarea">
                </el-input>
              </div>
            </el-col>
          </el-row>
          <!--          日期-->
          <el-row class="head">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark above">
                <div>
                  <span class="title">发送时间：</span>
                  <span class="text">立即发送</span>
                  <div class="time">
                    <span class="endTime">截止时间</span>
                    <div class="block">
                      <el-date-picker
                        v-model="value1"
                        type="datetime"
                        range-separator="/"
                        format="yyyy/MM/dd HH:mm:ss"
                        placeholder="选择日期时间"
                        @change="endDate"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!--          内容-->
          <el-row class="topic_one">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <!--                第一行-->
                <el-row class="sendNav">
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                      <span class="sendOut">发送到</span>
                      <div class="sendAll">
                        <span class="allTitle">全部</span>
                        <input type="checkbox" style="zoom: 180%;margin-right: 0.29rem" class="selectAll"
                               @click="whole">
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <!--                多行-->

                <el-row v-for="(item,index) in classList" :key="index" class="sendList">
                  <el-col :span="24" style="height: 0.99rem;border-bottom: 0.01rem solid #eee">
                    <div class="grid-content bg-purple-dark">

                      <img :src="firstImg.image" alt="">
                      <h3>{{item.classname}}</h3>

                      <div style="float: right" class="lastSend">
                        <span class="classText">{{item.sum}}人</span>
                        <input type="checkbox" style="zoom: 180%" @click="single(item.classname,item.class_id)">
                      </div>

                    </div>
                  </el-col>
                </el-row>
                <router-link to="/appoint">
                  <el-row class="sendList">
                    <el-col :span="24" style="height: 0.99rem;border-bottom: 0.01rem solid #eee">
                      <div class="grid-content bg-purple-dark">
                        <img src="../../assets/img/Appoint.png" alt="">
                        <h3>指定学生</h3>
                        <div style="float: right" class="lastSend">
                          <span class="classText">0人</span>
                          <i class="el-icon-arrow-right"></i>
                        </div>

                      </div>
                    </el-col>
                  </el-row>
                </router-link>
              </div>
            </el-col>
          </el-row>
        </el-main>
        <el-footer class="last" style="height: 1.1rem">
          <div>
            <ul class="returnBtn">
              <li class="btn1">

                <div @click="back">
                  <img src="../../assets/img/goBack.png" alt="">
                  <span>返回</span>
                </div>

              </li>
              <li class="btn2">
                <div @click="getSend">
                  <router-link to='/record'>
                    <img src="../../assets/img/sendOut.png" alt="">
                    <span>发送</span>
                  </router-link>
                </div>
              </li>
            </ul>

          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import $ from 'jquery';
  import moment from "moment"

  export default {
    name: "Edit",
    data() {
      return {
        textarea: '', //备注
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }, // 日期
        value1: '', // 日期
        classList: [], // 全部班级
        firstImg: {
          image: require('../../assets/img/class.png'),
        }, // 班级图片
        input: '',
        dataTime: '', //默认时间
        endNum: '', // 截止日期
        classId: [], //班级id
        type: 3, // 2教辅* 3题库
        userId: [], // 指定学生id

        paperName: '12月11日语文题库作业', //组卷名称

        gradeId: '七年级', // 年级
        subjectId: '语文', // 学科
        is_error: 0 // 是否为错题本出题 1是   0否
        // {{this.$route.params.type}} // 2教辅* 3题库
        // {{this.$route.params.error}}// 是否为错题本出题 1是   0否
        // {{this.$route.params.subject}}
      }
    },

    created() {
      this.allClass();
      this.getNextTime();

    },
    methods: {


      endDate() {
        let startDate = moment(this.value1).format("YYYY-MM-DD HH:mm");
        this.endNum = startDate;

      },
      // 全选
      whole() {
        $("input[type='checkbox']").each(function () {
          if ($(this).prop("checked") == true) {
            $("input[type='checkbox']").prop('checked', true);
            return;
          } else {
            $("input[type='checkbox']").prop('checked', false);
            return;
          }
        })
      },
      // 单选
      single(n, m) {
        console.log(n);
        console.log(m);
        let arr = n + '_' + m
        console.log(arr);
        this.classId.push(arr)
        console.log(this.classId);

      },
      // 回退上一级'
      back() {
        this.$router.go(-1);
      },
      // 获取班级
      allClass() {
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&m=Dayly&a=class_student&uid=644&token=513be51f05f85c2e3fc708be5431216d').then(response => {
          var obj = response.data;
          for (let i in obj) {
            this.classList.push(obj[i]); //属性
          }
          console.log(this.classList);
        })
      },
      // 设置默认时间 2019年12月9日 18:00
      getNextTime() {
        var str = (new Date().getTime()) + 24 * 60 * 60 * 1000;
        var date = new Date(str);
        // console.log(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate() - 1;
        var hour = '18';
        var minute = '00';
        this.dataTime = year + "-" + ((month < 10) ? '0' + month : month) + "-" + ((day < 10) ? '0' + day : day) + ' ' + hour + ':' + minute;
      },
      getdatatime() {//默认显示今天
        this.value1 = this.dataTime;
        /* var time="9:00";var str = (new Date().getTime()) + time
         console.log(str);*/
      },

      // 发送作业http://tk.exejk12.com:8787/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Dayly&a=submit_dayly&id=18450529_0_2.0&astrict=2019-12-12 18:00&classId=测试班级_46&type=3&paperName=11月12日语文题库出题&gradeId=八年级&subjectId=1&is_error=0
      getSend() {
        this.axios.post('http://tk.exejk12.com:8787/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Dayly&a=submit_dayly',{id:'18450529_0_2.0',astrict:'2019-12-12 18:00',classId:'测试班级_46',type:3,paperName:'11月12日语文题库出题',gradeId:'八年级',subjectId:"1",is_error:0}).then(response => {
          console.log(response);
          /*var obj = response.data;
          for (let i in obj) {
              this.classList1.push(obj[i]); //属性
          }*/
        })
       /* this.axios.post('http://tk.exejk12.com:8787/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Dayly&a=submit_dayly',{id:'18450529_0_2.0',astrict:this.endNum,classId:this.classId,type:this.type,paperName:this.paperName,gradeId:this.gradeId,subjectId:this.subjectId,is_error:this.is_error}).then(response => {
          console.log(response);
          /!*var obj = response.data;
          for (let i in obj) {
              this.classList1.push(obj[i]); //属性
          }*!/
        })*/
      }
    },
    mounted() {
      let that = this;
      that.getdatatime()
    }

  }
</script>

<style scoped lang="less">
  .el-header, .el-footer {
    background-color: #f6f6f6;
    color: #333;
  }

  .el-main {
    background-color: #ffffff;
    padding: 0;
  }

  .editAnswer {
    background: #f6f6f6;
    padding: 0.3rem 0.4rem 0 0.4rem;
    box-sizing: border-box;

    .container {
      .content {
        .nav {
          .text {
            font-size: 0.3rem;
          }
        }

        .middle {
          background: #fff;
          padding: 0.3rem 0.3rem 0 0.3rem;
          border-radius: 0.06rem;
          height: 8.8rem;

          .homeWork {
            padding-bottom: 0.3rem;
            box-sizing: border-box;
            border-bottom: 0.01rem solid #e5e5e5;

            .every {
              .title {
                font-size: 0.24rem;
              }

              .el-input {
                width: 5.6rem;
                height: 0.48rem;
                margin: 0 0 0 0.2rem;
              }
            }
          }

          .remarks {
            /*height: 0.88rem;*/
            padding: 0.3rem 0 0.3rem 0;
            box-sizing: border-box;
            border-bottom: 0.01rem solid #e5e5e5;

            .el-textarea {
              /*font-family: "Microsoft";*/
              font-size: 20px;
              height: 0.88rem;
              background: #adc8ad;
            }

            .el-textarea {
              /deep/ textarea {
                height: 0.88rem;
                padding: 0.19rem 0 0 0.20rem;
              }
            }
          }

          .head {
            width: 100%;
            padding-bottom: 0.31rem;
            border-bottom: 0.01rem solid #e5e5e5;
            margin-top: 0.2rem;
            box-sizing: border-box;

            .above {
              .title {
                font-size: 0.24rem;
              }

              .text {
                font-size: 0.2rem;
                color: #999;
              }

              .time {
                float: right;

                .endTime {
                  font-size: 0.24rem;
                }

                .block {
                  display: inline-block;
                  margin-left: 0.21rem;

                  .el-date-editor {
                    font-size: 0.2rem;
                    width: 3rem;
                    height: 0.48rem;

                    /deep/ input {
                      width: 3rem;
                      height: 0.48rem;
                    }

                    /deep/ i {
                      line-height: 0.48rem;
                    }
                  }
                }

              }

            }
          }

          .topic_one {
            /*height: 4.54rem;*/
            border-radius: 0.06rem;
            border: 0.01rem solid #dcdcdc;
            margin-bottom: 0.3rem;

            /deep/ .el-checkbox__inner::after {
              height: 0.16rem;
              width: 0.11rem;
              top: 0;
              color: #222222;
            }

            /deep/ .el-checkbox__inner:hover {
            }

            .sendNav {
              /deep/ .el-checkbox__inner {
                width: 0.24rem;
                height: 0.24rem;
                margin: 0 0.3rem 0 0.31rem;
                /*background: #eeeeee;*/
              }

              .el-col {
                height: 0.68rem;
                background-color: #eeeeee;
                border-radius: 0.06rem;

                .grid-content {
                  font-size: 0.24rem;
                  line-height: 0.68rem;

                  .sendOut {
                    line-height: 0.32rem;
                    margin-left: 0.3rem;
                  }

                  .sendAll {
                    float: right;

                    .allTitle {
                      margin-right: 0.36rem;
                    }
                  }
                }
              }
            }

            .sendList {
              /deep/ .el-checkbox__inner {
                width: 0.24rem;
                height: 0.24rem;
                /*margin: 0 0 0 0.31rem;*/
                /*background: #eeeeee;*/
              }
            }

            .sendList {
              padding: 0.3rem 0.3rem 0 0.3rem;
              display: block;

              img {
                width: 0.68rem;
                height: 0.68rem;
                margin-right: 0.2rem;
                float: left
              }

              h3 {
                font-size: 0.2rem;
                line-height: 0.68rem;
                float: left
              }

              .lastSend {
                line-height: 0.68rem;
                font-size: 0.24rem;

                .classText {
                  margin-right: 0.31rem;

                  .el-icon-arrow-right {
                    width: 0.11rem !important;
                    height: 0.18rem !important;
                    background-color: #7c7c7c;
                    border: 0.01rem solid #7c7c7c;
                  }
                }
              }
            }
          }
        }

        .last {
          padding: 0.30rem 0 0 0;
          font-size: 0.18rem;
          box-sizing: border-box;

          .returnBtn {
            text-align: center;
            display: flex;

            .btn1, .btn2 {
              float: left;
              width: 1.3rem;
              height: 0.5rem;
              line-height: 0.5rem;
              border-radius: 0.06rem;
              border: solid 0.01rem #c8c8c8;
              margin-right: 0.2rem;
              /*cursor: pointer;*/
              color: #fff;
              background-color: #fff;
            }

            .btn1 {
              margin-right: 7.1rem;

              img {
                width: 0.29rem;
                height: 0.23rem;
                vertical-align: middle;
                margin-top: -0.08rem;
              }
            }

            .btn2 {
              img {
                width: 0.27rem;
                height: 0.25rem;
                vertical-align: middle;
                margin-top: -0.05rem;
              }
            }


            span {
              width: 0.34rem;
              height: 0.17rem;
              font-family: PingFang-SC-Medium;
              font-size: 0.18rem;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0;
              color: #333333;
            }

          }

        }
      }
    }
  }

  .upload_eject {
    /deep/ .el-dialog {
      width: 4.6rem;
      height: 3rem;
      margin-top: 35vh !important;
      margin-left: 82.8vh;
    }
  }

  .upload_eject {
    /deep/ .el-dialog__header, .el-dialog__body {
      padding: 0;
    }
  }

  .upload_eject {
    /deep/ .el-button--primary, .el-button {
      border: none;
      background: none;
      color: #4b96ff !important;
      font-size: 0.18rem;
    }
  }

  .upload_eject {
    /deep/ p {
      margin-top: 0.19rem;
    }
  }

  .upload_eject {
    /deep/ img {
      display: block;
      width: 1.1rem;
      height: 0.9rem;
    }
  }

  /*  编辑弹出框 位置*/
  .el-dialog__wrapper {
    /deep/ .el-dialog {
      width: 4.8rem;
      height: 4.12rem;
      margin-top: 3.66rem !important;
      margin-left: 7.2rem !important;
      text-align: center;
      border-radius: 0.06rem;
    }
  }

  .el-dialog__wrapper {
    /deep/ .el-dialog__body {
      padding: 0.4rem 0.6rem 0 0.59rem !important;

    }
  }

  .el-dialog__wrapper {
    /deep/ .el-dialog__header {
      padding: 0 !important;
    }
  }

  .el-dialog__wrapper {
    /deep/ .el-dialog__footer {
      padding: 0 !important;
      margin-top: 0.4rem;
      margin-left: 1.4rem;
    }
  }

  /*文字*/
  .el-form {
    /deep/ .el-form-item__label {
      font-size: 0.20rem;
      height: 0.2rem;
      color: #333;
      /*width: 0.89rem!important;/*/
      font-family: PingFang-SC-Medium;
      font-weight: bold;
      font-stretch: normal;
      margin-left: -0.18rem;
    }
  }

  .el-form {
    /deep/ input {
      font-size: 0.20rem;
      width: 2.63rem;
      height: 0.48rem;
      border-radius: 0.06rem;
      border: 0.02rem solid #aaa;

    }
  }

  .el-form {
    /deep/ .el-form-item__content {
      margin-left: 1.02rem !important;
    }
  }

  .dialog-footer {
    /deep/ button {
      font-size: 0.18rem;
      width: 0.9rem;
      height: 0.4rem;
      border-radius: 0.06rem;
      border: 0.01rem solid #4b96ff;
      float: left;
    }
  }

  .dialog-footer {
    /deep/ .el-button--primary {
      margin-right: 0.2rem;
    }
  }

</style>
