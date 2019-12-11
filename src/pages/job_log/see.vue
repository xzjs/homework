<template>
  <div class="jobRecord">
    <!--      作业详情 题-->
    <el-container class="container">

      <el-container class="content">

        {{this.$route.params.idd}}

        <el-header class="nav">
          <p class="text">作业详情</p>
        </el-header>

        <el-main class="middle">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark" v-for="i in ques">
                <p class="title">{{ques.typeName}}</p>
                <ul class="list">
                  <li class="topic">
                    <p>{{i.title}}</p>
                    <span>{{i.option_a}}</span>
                    <span>{{i.option_b}}</span>
                    <span>{{i.option_c}}</span>
                    <span>{{i.option_d}}</span>
                    <span>{{i.option_e}}</span>
                    <span>{{i.option_f}}</span>
                  </li>
                  <li class="answer">
                    <p class="correct">正确答案：</p>
                    <p class="correctAnswer">{{i.answer1}}</p>
                    <p class="parse">解析</p>
                    <p class="parseAnswer">{{i.parse}}</p>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </el-main>

        <el-footer class="last" style="height: 1.1rem">
          <div>
            <ul class="returnBtn">
              <li class="btn1">
                <router-link to='/tack'>
                  <div>
                    <img src="../../assets/img/goBack.png" alt="">
                    <span>返回</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <ul class="methodBtn">
              <li class="btnitem">
                <div type="primary" @click="topQues">
                  <img src="../../assets/img/left.png" alt="">
                  <span>上一题</span>
                </div>
              </li>
              <li class="btnitem">
                <div @click="nextQues">
                  <img src="../../assets/img/right.png" alt="">
                  <span>下一题</span>
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

  export default {
    name: "Tack",
    data() {
      return {
        details: [],
        ques: [],
        num: 0
      }
    },
    created() {
      this.seeDetails();

    },
    methods: {

      seeDetails() {
        this.axios.get('http://tk.exejk12.com:8787/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&id=596&m=Zujuan&a=zujuanQuestions').then(response => {
          var obj = response.data;
          // console.log(obj);
          for (let i in obj) {
            console.log(obj[i]['question']);
            let data = obj[i]['question'];
            for (let key in data) {
              this.details.push(data[key]); //属性
            }
          }
          console.log(this.details);
          this.ques = [this.details[this.num]];
          console.log(this.ques);
        })
      },
      // 下一题
      nextQues() {
        if (this.num == this.details.length-1) {
          return;
        }
        this.num++;
        console.log(this.num);
        this.ques = [this.details[this.num]];
      },
      // 上一题
      topQues() {
        if (this.num == 0) {
          return;
        }
        this.num--;
         this.ques = [this.details[this.num]];
      }
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

  .jobRecord {
    background: #f6f6f6;
    padding: 0.3rem 0.4rem 0 0.4rem;
    box-sizing: border-box;

    .container {
      .content {
        .nav {
          .text {
            font-size: 0.29rem;
          }
        }

        .middle {
          background: #fff;
          padding: 0.3rem 0.3rem 0 0.3rem;
          box-sizing: border-box;
          border-radius: 0.06rem;
          height: 8.82rem;

          .grid-content {
            .title {
              height: 0.5rem;
              font-family: PingFang-SC-Bold;
              font-size: 0.2rem;
              font-weight: bold;
              font-stretch: normal;
              letter-spacing: 0;
              color: #333333;

              border-bottom: 0.01rem solid #dcdee2;
            }

            .list {
              .topic {
                height: 1.89rem;
                /*line-height: 1.89rem;*/
                font-family: MicrosoftYaHei;
                font-size: 0.24rem;
                font-weight: normal;
                font-stretch: normal;
                color: #333333;
                border-bottom: 0.01rem dashed #dcdee2;
                vertical-align: middle;
                padding-top: 0.3rem;
                box-sizing: border-box;

                span {
                  height: 0.53rem;
                  font-family: MicrosoftYaHei;
                  font-size: 0.18rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 0.38rem;
                  letter-spacing: 0;
                  color: #2b3642;
                }
              }

              .answer {
                height: 2.47rem;

                .correct {
                  padding-top: 0.38rem;
                  box-sizing: border-box;
                  /*width: 86px;*/
                  /*height: 0.22rem;*/
                  font-family: PingFang-SC-Medium;
                  font-size: 0.22rem;
                  /*font-weight: normal;*/
                  /*font-stretch: normal;*/
                  /*letter-spacing: 0;*/
                  color: #19be6b;
                }

                .correctAnswer {
                  /*width: 287px;*/
                  height: 53px;
                  font-family: MicrosoftYaHei;
                  font-size: 0.18rem;
                  /*font-weight: normal;*/
                  /*font-stretch: normal;*/
                  /*line-height: 0.38rem;*/
                  /*letter-spacing: 0;*/
                  color: #2b3642;
                }

                /* .parse {
                   !*width: 42px;*!
                   height: 22px;
                   font-family: PingFang-SC-Medium;
                   font-size: 22px;
                   font-weight: normal;
                   font-stretch: normal;
                   letter-spacing: 0px;
                   color: #2b3642;
                 }*/
                /* .parseAnswer {
                   width: 1133px;
                   height: 62px;
                   font-family: PingFang-SC-Medium;
                   font-size: 18px;
                   font-weight: normal;
                   font-stretch: normal;
                   letter-spacing: 0px;
                   color: #777e8c;
                 }*/
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

          .methodBtn {
            margin-top: -0.5rem;
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .btnitem {
              background: #fff;
              float: left;
              width: 1.3rem;
              height: 0.5rem;
              line-height: 0.5rem;
              text-align: center;
              border-radius: 0.06rem;
              border: solid 0.01rem #c8c8c8;
              margin-right: 0.2rem;
              color: #fff;

              img {
                width: 0.24rem;
                height: 0.24rem;
                vertical-align: middle;
                margin-top: -0.03rem;
              }

              span {
                font-size: 0.18rem;
                color: #333333;
              }
            }
          }

        }
      }
    }
  }


</style>
