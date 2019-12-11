<template>
  <div class="jobRecord">
    <!--      作业详情-->
    <el-container class="container">

      <el-container class="content">

        <el-header class="nav">
          <p class="text">{{this.$route.params.time}}</p>
        </el-header>

        <el-main class="middle">
          <el-row class="header">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <img src="../../assets/img/record.png" alt="">
                <p>答题卡</p>
              </div>
            </el-col>
          </el-row>

          <el-row class="topicContent">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark" v-for="(item,index) in option" :key="index">
                <p class="title">{{item.typeName}}</p>

                <div v-for="(i,n) in item.question" :key="n" class="topicBtn" style="float: left">
                  <el-button circle class="everyBtn">{{i.order}}</el-button>
                </div>


              </div>
            </el-col>
          </el-row>
        </el-main>

        <el-footer class="last" style="height: 1.1rem">
          <div>


            <ul class="returnBtn">
              <li class="btn1">
                <router-link to='/record'>
                  <div>
                    <img src="../../assets/img/goBack.png" alt="">
                    <span>返回</span>
                  </div>
                </router-link>
              </li>


              <li class="btn2">
                <router-link to='/see'>
                  <img src="../../assets/img/seeTopics.png" alt="">
                  <span>查看题目</span>
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
        name: "Tack",
        data() {
            return {
                option: [],
                num: this.i
            }
        },
        created() {
            this.tackPages();
        },
        methods: {
            aaa() {
                console.log(this.num);
            },
            toDetail(m, n) {

                console.log(m);
                this.$router.push(
                    {
                        name: 'Tack',
                        params: {
                            idd: 1
                        }
                    })
            },
            tackPages() {
                this.axios.get('http://tk.exejk12.com:8787/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&id=596&m=Zujuan&a=zj_detail').then(response => {
                    var obj = response.data;
                    // console.log(obj);
                    for (let i in obj) {
                        this.option.push(obj[i]); //属性
                    }
                    console.log(this.option);
                })
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
    padding: 00.3rem 0.4rem 0 0.4rem;
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
          height: 8.80rem;

          .header {
            .grid-content {
              position: relative;

              img {
                width: 17.79rem;
                height: 1.2rem;
                background-color: #4495fe;
              }

              p {
                position: absolute;
                top: 0.34rem;
                left: 8.2rem;
                width: 1.38rem;
                height: 0.34rem;
                font-family: FZZZHONGJW--GB1-0;
                font-size: 0.36rem;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0.1rem;
                color: #ffffff;
              }
            }
          }

          .topicContent {
            .title {
              width: 2.93rem;
              height: 0.24rem;
              font-family: PingFang-SC-Medium;
              font-size: 0.24rem;
              font-weight: bold;
              font-stretch: normal;
              /*line-height: 246px;*/
              letter-spacing: 0;
              color: #333333;
              margin-top: 0.3rem;
            }

            .topicBtn {
              height: 0.6rem;
              font-family: DIN-Bold;
              font-size: 0.3rem;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 0;
              color: #333333;
              margin: 0.25rem 0.3rem 0 0;
              border: none;

              .everyBtn {
                width: 0.68rem;
                height: 0.68rem;
                background-color: #dcdee2;

                /deep/ span {
                  height: 0.22rem;
                  font-family: DIN-Bold;
                  font-size: 0.3rem;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0;
                  color: #333333;
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
                width: 0.24rem;
                height: 0.24rem;
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
