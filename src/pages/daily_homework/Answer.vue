<template>
  <!--设置答题卡-->
  <div class="all">

    <el-container class="container">

      <el-container class="content">
        <el-header class="nav">
          <p class="text">设置答题卡</p>
        </el-header>

        <el-main class="middle">
          <el-row class="head">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark above">
                <span class="title">作业标题</span>
                <el-input v-model="input" placeholder="初中语文日常作业"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-row class="upload">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark above">
                <span class="title" @click="test">题目</span>
                <div class="upload_box" style="margin-top: 0.3rem">
                  <div class="first" style="text-align: center" @click="outerVisible = true">
                    <img src="../../assets/img/上传题目.png" alt="" style="width: 0.46rem;
	height: 0.49rem;margin-top: 0.25rem">
                    <p style="font-size: 0.2rem">上传题目</p>
                  </div>

                  <div class="upload_list">
                    <ul>
                      <li>
                        <img src="" alt="">
                      </li>
                      <li>
                        <img src="" alt="">
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="remarks">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark above ">
                <span>答题卡</span>
                <router-link to='/edit'>
                  <el-button type="primary">编辑

                  </el-button>
                </router-link>
              </div>
            </el-col>
          </el-row>

          <div class="answerCard" v-for="(item,n) in answers">
            <div class="itemAnswer">
              <el-row class="firstTopic">
                <el-col :span="6">
                  <h3>第 {{item.no}} 题 {{item.title}}</h3>
                </el-col>
                <el-col :span="1" :offset="17">
                  <img src="../../assets/img/edit2.png" alt="" @click="editTopic(item)">
                </el-col>
              </el-row>

              <div class="itemTopic" v-for="(i,ndex) in item.children">
                <el-row class="lastTopic">
                  <el-col :span="4">{{ndex + 1}}.</el-col>
                  <el-col :span="18">
                    <div style="float: left;" v-for="(item,idx) in i.answer" :key="idx">
                      <el-button type="primary" circle style="margin-left: 20px;" class="answerBtn"
                                 :class="idx==index?'hover':''"
                                 @click="selection(idx)">
                        {{item}}
                      </el-button>
                    </div>
                  </el-col>
                  <el-col :span="2" style="float: right" class="">
                    <div class="score">
                      <input type="text" :value="i.value">
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

        </el-main>
        <!--        上传题目弹窗-->
        <div class="upload_eject">
          <el-dialog :visible.sync="outerVisible">
            <el-dialog
              width="30%"
              :visible.sync="innerVisible"
              append-to-body>
            </el-dialog>

            <div slot="footer" class="dialog-footer" style=" display: flex;
  justify-content: center;
  align-items: center;  ">

              <el-button type="primary" @click="innerVisible = true">
                <img src="../../assets/img/camera.png" alt="">
                <p>拍照</p>
              </el-button>
              <el-button type="primary" @click="innerVisible = true">
                <img src="../../assets/img/camera.png" alt="">
                <p>
                  相册
                </p>
              </el-button>
            </div>
          </el-dialog>
        </div>
        <!--        // 编辑题弹框-->
        <el-dialog title="" :visible.sync="editFormVisible">
          <el-form :model="form" ref="questionForm">
            <el-form-item label="题目名称 :" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="题目数量 :" :label-width="formLabelWidth">
              <el-input v-model="form.num" autocomplete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="题目分值 :" :label-width="formLabelWidth">
              <el-input v-model="form.value" autocomplete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="选项个数 :" :label-width="formLabelWidth">
              <el-input v-model="form.selectNum" autocomplete="off" type="number"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitModal">确 定</el-button>
            <el-button @click="editFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>


        <el-footer class="last" style="height: 1.1rem">
          <div>
            <ul class="returnBtn">
              <li class="btn1">
                <router-link to='/daily'>
                  <div>
                    <img src="../../assets/img/goBack.png" alt="">
                    <span>返回</span>
                  </div>
                </router-link>
              </li>


              <li class="btn2">
                <!--                <router-link to='/send'>-->
                <div @click="getSend">
                  <img src="../../assets/img/nextStep.png" alt="">
                  <span>下一步</span>
                </div>

                <!--                </router-link>-->
              </li>
            </ul>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "item",
    data() {
      return {
        item: null,
        dataList: [
          {
            title: '选择题',
            num: 3,
            children: [
              {
                answer: ['A', 'B', 'C', 'D'],
                num: '2.0'
              },
              {
                answer: ['A', 'B', 'C', 'D'],
                num: '3.0'
              },
              {
                answer: ['A', 'B', 'C', 'D'],
                num: '2.0'
              },
            ]
          },
          {
            title: '判断题',
            children: [
              {
                answer: [],
                num: '2.0'
              },
              {
                answer: ['A', 'B'],
                num: '2.5'
              }
            ]
          }
        ],

        input: '',  // 作业标题
        textarea: '', // 备注
        checked: false,
        activeName: 'first',
        options: [{
          value: '选项1',
          label: '熟悉人教七年级上册'
        }, {
          value: '选项2',
          label: '语文人教七年级上册'
        }],
        value: '',
        form: {
          name: '',
          num: '',
          value: '',
          selectNum: ''
        },
        outerVisible: false,
        innerVisible: false, // 上传题目弹框
        // 编辑题弹框是否展示
        editFormVisible: false,
        formLabelWidth: '120px',
        index: 0
      }
    },
    methods: {
      test() {
        console.log(this.$route.params.chapters, 2222222);
        console.log(this.$route.params.book, 5555555);
        console.log(this.$route.params.grade, 66666666);
        console.log(this.$route.params.subject, 7777777);

        console.log(this.$route.params.chapter, 11111111);
        console.log(this.$route.params.list, 88888888888);

        console.log(this.$route.params.papers, 333333);
        console.log(this.$route.params.url, 4444444);
      },
      selection(idx) {
        this.index = idx;
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      // 编辑题
      editTopic(item) {
        this.item = item;
        this.form.name = item.title;
        this.form.num = item.children.length;
        this.form.value = item.value;
        this.form.selectNum = item.selectNum;
        this.editFormVisible = true;
      },
      submitModal() {
        this.editFormVisible = false;
        for (let i = 0; i < this.form.num; i++) {
          switch (this.item.title) {
            case '选择题':
              let answer = [];
              for (let j = 0; j < this.form.selectNum; j++) {
                answer.push(String.fromCharCode(j + 65) + " ")
              }
              this.item.children.push({
                answer: answer,
                value: this.form.value
              });
              break;
            case '判断题':
              this.item.children.push({
                answer: ['√', 'x'],
                value: this.form.value,
              });
              break;
            case '填空题':
            case "简答题":
              this.item.children.push({
                answer: [],
                value: this.form.value,
              });
              break;
          }
        }
      },
      // 发送作业
      getSend() {
        /*  let num = [
              {qtpye:'计算题', answer:2, score:4},
              {qtpye:'哈哈题', answer:25, score:85},
          //     ['计算题', 2, 4], ['填空题', 2, 3]
          ]

          var bb = JSON.stringify(num);

          this.axios({
              method: "get",
              url: "http://tk.exejk12.com:8787//index.php?s=App&m=Dayly&a=submit_dayly",
              params: {
                  uid: 644,
                  token: "513be51f05f85c2e3fc708be5431216d",
                  chapterId: this.$route.params.chapter,
                  chapter_s_id: this.$route.params.chapters,
                  paperName: '语文',
                  url: '',
                  // info: ['/计算题/', 2, 4], ['/填空题/', 2, 3]],
                  info: bb,
                  subjectId: this.$route.params.subject,
                  gradeId: this.$route.params.grade,
                  book_id: this.$route.params.book
              },
          }).catch(res => {
              console.log(res);
          }),*/

        let num = [
          {qtpye: '计算题', answer: 2, score: 4},
          {qtpye: '哈哈题', answer: 25, score: 85},
          //     ['计算题', 2, 4], ['填空题', 2, 3]
        ]
        console.log(num);

        this.axios.post('http://tk.exejk12.com:8787/index.php?s=App&m=Dayly&a=submit_dayly&uid=644&token=513be51f05f85c2e3fc708be5431216d', {
          info: num,
          id: 213
        },).then(response => {
          console.log(info);
          console.log(response);
        }).catch(res => {
          console.log(res);
        })
      }
    },
    computed: mapState(['answers'])
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

  .all {
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

          .head {
            width: 100%;
            padding-bottom: 0.31rem;
            border-bottom: 0.01rem solid #e5e5e5;

            .above {
              .title {
                font-size: 0.24rem;
              }

              .el-input {
                width: 5.6rem;
                height: 0.48rem;
                line-height: 0.48rem;
                font-size: 0.2rem;
                margin: 0 0 0 0.2rem;
              }
            }

            .above {
              /deep/ .el-input__inner {
                width: 5.6rem;
                height: 0.48rem;
                line-height: 0.48rem;
                font-size: 0.2rem;
                margin: 0 0 0 0.2rem;
              }
            }
          }

          .upload {
            margin-top: 0.29rem;
            height: 2.12rem;
            border-bottom: 0.01rem solid #e5e5e5;

            .above {
              .title {
                font-size: 0.24rem;
                margin-bottom: 0.3rem;
              }

              .upload_box {
                .first {
                  float: left;
                  width: 1.8rem;
                  height: 1.3rem;
                  border: 0.01rem solid #4b96ff;
                  border-radius: 0.06rem;
                  cursor: pointer;
                }

                .upload_list {
                  float: left;

                  ul {
                    li {
                      float: left;
                      width: 1.8rem;
                      height: 1.3rem;
                      border: 0.01rem solid #4b96ff;
                      border-radius: 0.06rem;
                      margin: 0 0.2rem 0 0.2rem
                    }
                  }
                }
              }
            }
          }

          .remarks {
            height: 0.8rem;
            background-color: #e6efff;
            line-height: 0.8rem;
            text-align: center;
            margin-bottom: 0.2rem;

            .above {
              span {
                font-size: 0.24rem;
              }

              .el-button {
                float: right;
                margin: 0.17rem 0.3rem 0 0;
                font-size: 0.2rem;
                width: 1.1rem;
                height: 0.46rem;
                background-color: #4b96ff;
                border-radius: 0.06rem;

                span {

                  line-height: 0.46rem;
                }
              }
            }
          }

          .answerCard {
            height: 4.54rem;
            /*background: #d9f8ff;*/
            margin-bottom: 0.3rem;

            .itemAnswer {
              border: 0.01rem solid #dcdcdc;

              .firstTopic {
                height: 0.68rem;
                background-color: #eeeeee;
                border-radius: 0.06rem;
                font-size: 0.2rem;
                line-height: 0.68rem;
                padding-left: 0.3rem;

                img {
                  width: 0.28rem;
                  height: 0.28rem;
                  margin: 0.2rem 0 0 0.23rem;
                }
              }

              .itemTopic {
                padding: 0.3rem 0.3rem 0 0.3rem;
                margin-bottom: 0.3rem;
                box-sizing: border-box;
                height: 0.99rem;
                background: #fff;

                .lastTopic {
                  border-bottom: 0.01rem solid #dcdcdc;
                  padding-bottom: 0.30rem;
                  box-sizing: border-box;

                  .el-col-4 {
                    font-size: 0.24rem;
                    line-height: 0.69rem;
                  }

                  .el-col-18 {
                    margin-left: -2.74rem;

                    .el-button--primary {
                      color: #333333;
                      background-color: #dcdee2;
                      border: none;
                    }
                  }

                  .el-col-2 {
                    width: 1rem;

                    .score {
                      width: 1.1rem;
                      height: 0.48rem;
                      background-image: linear-gradient(0deg,
                      #e7e7e7 0%,
                      #ffffff 100%),
                      linear-gradient(#ffffff,
                        #ffffff);
                      background-blend-mode: normal,
                      normal;
                      border-radius: 0.06rem;
                      border: solid 0.02rem #aaaaaa;
                      display: flex;
                      padding: 0 0 0 0.36rem;
                      box-sizing: border-box;

                      input {
                        width: 0.7rem;
                        height: 0.48rem;
                        font-size: 0.24rem;
                        margin-top: -0.02rem;
                        color: #333333;
                        font-family: PingFang-SC-Medium;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0;

                      }
                    }
                  }

                  .answerBtn {
                    width: 0.68rem;
                    height: 0.68rem;
                  }

                  .answerBtn.hover {
                    background-color: #00d096;
                  }

                  .answerBtn {
                    /deep/ span {
                      font-size: 0.3rem;
                    }
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
                width: 0.26rem;
                height: 0.27rem;
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

