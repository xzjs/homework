<template>
  <!--已选题目-->
  <div class="all">

    <el-container class="container">

      <el-container class="content">
        <el-header class="nav">
          <p class="text">已选题目</p>
        </el-header>
        <el-main class="middle">
          <div
            v-for="(item,index) in topicName"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
            class="whole"
          >
            <el-row>
              <el-col :span="24" class="firstFrame">
                <div class="grid-content bg-purple-dark">
                  <span class="title">{{item.typeName}}</span>
                </div>
              </el-col>

              <el-col :span="23"
                      v-for="(i,n) in item.question"
                      :key="i.id"
                      :value="i.id"
                      class="theme"
                      v-model="list"
              >
                <div class="grid-content bg-purple-dark">

                  <span class="question" v-html="i.title">{{i.title}}</span>
                  <div>
                    <span>{{i.option_a}}</span>
                    <span>{{i.option_b}}</span>
                    <span>{{i.option_c}}</span>
                    <span>{{i.option_d}}</span>
                    <span>{{i.option_e}}</span>
                  </div>

                  <ul class="edit">
                    <li @click="Movedown(i,n,index,item.question)">
                      <img src="../../assets/img/button.png" alt="">
                      <span>下移</span>
                    </li>
                    <li @click="moveUpward(i,n,index)">
                      <img src="../../assets/img/top.png" alt="">
                      <span>上移</span>
                    </li>

                    <li @click="deleteImg(i,n,index,item.question)">
                      <img src="../../assets/img/del.png" alt="">
                      <span>删除</span>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>
        <el-footer class="last" style="height: 1.1rem">
          <div>
            <ul class="returnBtn">
              <li class="btn1" @click="back">

                <div @click="goBack">
                  <img src="../../assets/img/goBack.png" alt="">
                  <span>返回</span>
                </div>
              </li>
              <li class="btn2">
                <router-link to='/send'>
                  <img src="../../assets/img/sendOut.png" alt="">
                  <span>发送作业</span>
                </router-link>
              </li>
            </ul>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  export default {
    name: "item",
    data() {
      return {
        input: '',  // 作业标题
        textarea: '', // 备注
        checked: false, // d多选框
        activeName: 'first', // 多选框
        value: '', // 下拉框内容
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
        }, //日历控件
        value1: '', //第一个下拉框
        value2: '', // 第二个下拉框
        value3: '', // 第三个下拉框
        topicName: [], // 全部数据
        list: [] // 删除的时候数据

      };

    },
    // {{this.$route.params.id}}
    created() {
      this.subject();
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      // 删除题
      deleteImg(i, n, index, item) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          item.splice(n, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 上移题
      moveUpward(i, n, index) {
        console.log(index);
        if (n == 0) {
          this.$message({
            message: "已是第一个素材",
            type: 'warning',
          });
          return
        }
        let Upevery = JSON.parse(JSON.stringify(this.topicName));
        let Upinde = JSON.parse(JSON.stringify(Upevery[index]));
        let Upques = Upinde.question;
        if (Upques.length < 2) {
          return;
        }
        let next = JSON.parse(JSON.stringify(Upques[n - 1]));
        let con = JSON.parse(JSON.stringify(Upques[n]));
        Upques[n] = next;
        Upques[n - 1] = con;
        Upevery[index] = Upinde;
        this.topicName = Upevery;

        console.log("上移");
      },

      // 下移题
      Movedown(i, n, index, item) {
        if (n + 1 == item.length) {
          console.log(111111);
          this.$message({
            message: "已是最后一个素材",
            type: 'warning',
          })
          return;
        }
        let every = JSON.parse(JSON.stringify(this.topicName));
        let inde = JSON.parse(JSON.stringify(every[index]));
        let ques = inde.question;
        if (ques.length < 2) {
          return;
        }
        let next = JSON.parse(JSON.stringify(ques[n + 1]));
        let con = JSON.parse(JSON.stringify(ques[n]));
        ques[n] = next;
        ques[n + 1] = con;
        every[index] = inde;
        this.topicName = every;
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
      goBack() {
        this.$router.push(
          {
            // name: 'Chapter',
            // params: {}
          })
      },
      // 获取已选题目
      subject() {
        if (this.$route.params.topicId) {
          let topic = this.$route.params.topicId;
          let ary = []; // 请求的数据转数组
          for (var n in topic) {
            Object.assign(ary, topic[n])
          }
          this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Textbook&a=loadQuestions&id=' + ary).then(response => {
            var obj = response.data;
            for (let i in obj) {
              let arr = [];
              for (let n in obj[i].question) {
                arr.push(obj[i].question[n])
              }
              obj[i].question = arr;
              this.topicName.push(obj[i]); //属性
            }
          })
        } else {
          let topic = window.location.topics;
          let ary = []; // 请求的数据转数组
          for (var n in topic) {
            Object.assign(ary, topic[n])
          }
          this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Textbook&a=loadQuestions&id=' + ary).then(response => {
            var obj = response.data;
            for (let i in obj) {
              let arr = [];
              for (let n in obj[i].question) {
                arr.push(obj[i].question[n])
              }
              obj[i].question = arr;
              this.topicName.push(obj[i]); //属性
            }
          })
        }

      },
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
          height: 8.8rem;

          .whole {
            margin: 0 0 0.2rem 0;
            background-color: #ffffff;
            border-radius: 0.06rem;
            /*border: 0.01rem solid #dcdcdc;*/

            .firstFrame {
              height: 0.51rem;
              /*background-color: #eeeeee;*/
              border-radius: 0.06rem 0.06rem 0 0;
              line-height: 0.68rem;
              padding-left: 0.29rem;
              /*border: 0.01rem solid #dcdcdc;*/

              .allele {
                /deep/ .el-checkbox__inner {
                  /*width: 0.24rem;*/
                  /*height: 0.24rem;*/
                  /* background-image: linear-gradient(0deg,
                   #e7e7e7 0%,
                   #ffffff 100%),
                   linear-gradient(
                     #ffffff,
                     #ffffff);*/
                  /*background-blend-mode: normal,*/

                  /*border-radius: 0.06rem;*/
                  /*border: 0.02rem solid #aaaaaa;*/

                }

                /deep/ .el-checkbox__inner::after {
                  /*width: 0.11rem;*/
                  /*height: 0.16rem;*/
                  width: 0.11rem;
                  height: 0.16rem;
                  text-align: center;
                  line-height: 0.16rem;
                }
              }

              .title {
                height: 0.2rem;
                font-family: PingFang-SC-Bold;
                font-size: 0.2rem;
                font-weight: bold;
                font-stretch: normal;
                /*line-height: 246px;*/
                letter-spacing: 0;
                color: #333333;
                margin-left: 0.16rem;
              }
            }

            .theme {
              /*height: 2.06rem;*/
              margin: 0.3rem 0.29rem 0.3rem 0.29rem;
              box-sizing: border-box;
              border: 0.01rem solid #dcdcdc;

              .grid-content {
                text-align: left;

                .question {
                  /*height: 1.49rem;*/

                }
              }

              .edit {
                height: 0.56rem;
                background-color: #eeeeee;
                margin-top: 1.06rem;

                li {
                  float: right;
                  margin-top: 0.18rem;
                  margin-right: 0.49rem;

                  img {
                    width: 0.2rem;
                    height: 0.2rem;
                    margin-bottom: -0.03rem;
                  }

                  span {
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

</style>

