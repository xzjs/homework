<template>
  <div class="jobRecord">
    <!--      发送作业-->
    <el-container class="container">

      <el-container class="content">

        <el-header class="nav">
          <p class="text">作业记录</p>
        </el-header>

        <el-main class="middle">
          <el-row v-for="(item, index) in recordList" :key="index" @click="toDetail(item,index)">
            <el-col :span="24" class="recordNav">
              <div class="recordFirst">
                {{item.time}}
              </div>
              <div v-for="(i,index) in item.info" :key="index" class="recordLast">
                <!--                图片-->
                <div class="img clearfix" v-if="i.is_error === '0'">
                  <img :src="judgeImg[i.paperType]" alt="">
                </div>

                <div class="middleContent clearfix">
                  <!--         标题       -->
                  <p class="timeRecord">
                    {{i.paperName}}
                  </p>
                  <!--                接收对象-->
                  <div class="receiveObj">
                    接收对象:<span v-for="(n,index) in i.class" :key="index">
                    {{n.classname}}
                  </span>
                  </div>

                  <div class="timeEnd">
                    截止时间：{{i.createTime}}
                  </div>

                  <router-link to='tack'>
                    <el-button type="primary" class="middleBtn" @click="toDetail(i,index)">查看详情</el-button>
                  </router-link>

                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
        <el-footer class="last" style="height: 1.1rem">
          <div>
            <ul class="returnBtn">
              <li class="btn1">
                <router-link to='/tab'>
                  <div>
                    <img src="../../assets/img/goBack.png" alt="">
                    <span>返回</span>
                  </div>
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
        name: "Edit",
        data() {
            return {
                recordList: [],
                judgeImg: {
                    1: require('../../assets/img/home_daily.png'),
                    2: require('../../assets/img/home_teach.png'),
                    3: require('../../assets/img/home_item.png'),
                    4: require('../../assets/img/home_error .png')
                }

            }
        },
        created() {
            this.recordBook()
        },
        methods: {
            // 传参
            toDetail(m, index) {

                this.$router.push(
                    {
                        name: 'Tack',
                        params: {
                            time: m.paperName,
                        }
                    })
            },
            // 获取所有作业记录
            recordBook() {
                this.axios.get('http://tk.exejk12.com:8787/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Zujuan&a=getList').then(response => {
                    var obj = response.data;
                    // console.log(obj);
                    for (let i in obj) {
                        this.recordList.push(obj[i]); //属性
                    }
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
          padding: 0 0.3rem 0 0.3rem;
          box-sizing: border-box;
          border-radius: 0.06rem;
          height: 8.80rem;

          .recordNav {
            margin-top: 0.4rem;
            /*标题*/


            .recordFirst {
              font-size: 0.24rem;
              margin-bottom: 0.2rem;
              height: 0.23rem;
            }

            /*内容*/

            .recordLast {
              height: 1.64rem;
              border: 0.01rem solid #dcdcdc;
              padding: 0.3rem 0.2rem 0 0.2rem;
              margin-bottom: 0.2rem;

              .img {
                width: 1.03rem;
                height: 1.03rem;
                float: left;
              }

              .clearfix:after {
                content: '';
                height: 0;
                display: block;
                clear: both;
              }

              .middleContent {
                padding-left: 1.24rem;
                /*标题*/

                .timeRecord {
                  font-size: 0.24rem;
                  line-height: 0.38rem;
                  color: #333333;
                  font-family: PingFang-SC-Medium;
                  font-weight: bold;
                  font-stretch: normal;
                  letter-spacing: 0px;
                }

                /*接收对象*/

                .receiveObj {
                  display: block;
                  font-size: 0.2rem;
                  line-height: 0.38rem;
                  font-family: PingFang-SC-Medium;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #333333;

                  span {
                    color: #4a95ff;
                    cursor: pointer;
                  }

                }

                /*截止时间*/

                .timeEnd {
                  float: left;
                  font-size: 0.18rem;
                  line-height: 0.38rem;
                  font-family: PingFang-SC-Medium;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0px;
                  color: #777e8c;
                }

                /*查看详情按钮*/

                .middleBtn {
                  float: right;
                  margin-top: -0.27rem;
                  width: 1.4rem;
                  height: 0.5rem;
                  background-color: #4a95ff;
                  border-radius: 0.05rem;
                  font-size: 0.2rem;
                }

                .clearfix:after {
                  content: '';
                  height: 0;
                  display: block;
                  clear: both;
                }


              }

            }

            .recordLast:last-child {
              margin-bottom: 0;
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
              img {
                width: 0.29rem;
                height: 0.23rem;
                vertical-align: middle;
                margin-top: -0.08rem;
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
