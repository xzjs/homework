<template>
  <!--教辅题目详情页-->
  <div class="all">

    <el-container class="container">

      <el-aside width="3rem" class="left_nav">
        <el-select v-model="value" placeholder="全部题型" style="width: 2.36rem;height: 0.44rem">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.typeName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-aside>

      <el-container class="content">
        <el-header style="height: 0.88rem;padding: 0" class="nav">
          <p class="text">{{this.$route.params.passText}}</p>

        </el-header>

        <el-main class="middle">
          <div
            v-for="(item,index) in topicList"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
            class="whole"
          >
            <el-row>
              <el-col :span="24" class="firstFrame">
                <div class="grid-content bg-purple-dark">

                  <input type="checkbox" style="zoom:180%"
                         @change="allCheckeds(item,item.id,item.question,item['typeName'])"
                         v-model="abc[item['typeName']]">

                  <span class="title">{{item.typeName}}</span>
                </div>
              </el-col>
              <el-col :span="23" v-for="(i,n) in item.question" :key="i.id" :value="i.id" class="theme">
                <div class="grid-content bg-purple-dark">

                  <input :class="'checkall checkboxInput'+item.id" type="checkbox" style="zoom:180%" :value="i.id"
                         @change="checkeds(n,i.id,item['typeName'],item.id)">

                  <span v-html="i.title">{{i.title}}</span>
                  <div>
                    <span>{{i.option_a}}</span>
                    <span>{{i.option_b}}</span>
                    <span>{{i.option_c}}</span>
                    <span>{{i.option_d}}</span>
                    <span>{{i.option_e}}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>

        <div class="last">
          <ul class="returnBtn">
            <li class="btn1">
              <router-link to='/chapter'>
                <div @click="returnPage">
                  <img src="../../assets/img/goBack.png" alt="">
                  <span>返回</span>
                </div>
              </router-link>
            </li>


            <li class="btn2">
              <router-link to='/selected'>
                <div @click="select">
                  <span v-model="number">已选{{number}}题</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import $ from 'jquery';

  export default {
    name: "Content",
    data() {
      return {
        activeName: 'first',
        options: [],
        value: '',
        topicList: [],
        checked: {},
        number: 0,
        every: [],
        checkList: [],
        abc: {},
        aaa: [],
      }
    },
    created() {
      this.topic();
      this.questionType();
    },
    methods: {
      // 全选
      allCheckeds(index, bookId, question, tagName) {
        let allcheck = $('.checkall');
        setTimeout(() => {
          this.number = 0;
          allcheck.each((n, i) => {
            console.log($(i).prop("checked"));
            if ($(i).prop("checked")) {
              this.number++;
            }
          });
        }, 0);
        var checkboxx = Array.from(document.getElementsByClassName('checkboxInput' + bookId));

        if (this.abc[tagName]) {
          $('.checkboxInput' + bookId).prop('checked', true);

          Object.keys(question).forEach((item, index) => {
            this.checked[tagName][index] = question[item]['id'];
            this.number++;
          });
        } else {
          $('.checkboxInput' + bookId).prop('checked', false);
          checkboxx.forEach(i => {
            this.number--;
          });
          Object.keys(question).forEach((item, index) => {
            this.checked[tagName][index] = null;
          });
        }
      },

      // 单选
      checkeds(index, bookId, tagName, parentId) {
        var checkboxx = Array.from(document.getElementsByClassName('checkboxInput' + parentId));
        if (this.checked[tagName][index]) {
          this.checked[tagName][index] = null;
          this.number--;
          checkboxx[index].setAttribute('checked', false);

        } else {
          checkboxx[index].setAttribute('checked', true);
          this.checked[tagName][index] = bookId;
          this.number++;
        }

        let arr = [];
        for (let key in this.checked[tagName]) {
          if (!this.checked[tagName][key]) {
            arr.push(this.checked[tagName][key])
          }
        }
        if (!arr.length && this.abc) {
          this.abc[tagName] = true;
        } else {
          this.abc[tagName] = false;
        }


      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 返回上一层
      returnPage() {
        if (this.$route.params.upper) {
          this.$router.push(
            {
              name: 'Chapter',
              params: {
                id: this.$route.params.upper,

              }
            })
        } else {
          this.$router.push(
            {
              name: 'Chapter',
              params: {
                id: this.$route.params.upper,

              }
            })
        }
      },

      select(i, n) {
        let topicId = this.every.join(",");
        this.$router.push(
          {
            name: 'Selected',
            params: {
              topicId: this.checked,
            }
          })
        window.location.topics = this.checked
      },
      //  题目
      topic() {
        let url = '';
        //??????????????????????????????????????????????????????????????????
        if (this.$route.params.id) {
          url = '/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Textbook&a=Question&id=' + this.$route.params.id
        } else {
          url = '/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Textbook&a=Question&id=' + window.localStorage.book
        }

        this.axios.get(url).then(response => {

          var obj = response.data;
          // console.log(obj);
          for (let i in obj) {
            this.topicList.push(obj[i]); //属性
            this.abc[obj[i]['typeName']] = false;
            this.checked[obj[i]['typeName']] = {};
          }

        })
      },
      // 全部题型
      questionType() {
        this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Basic&a=getQtype').then(response => {
          // console.log(response);
          // this.recordL = response;
          // console.log(this.recordL);
          var obj = response.data;
          // console.log(obj);
          for (let i in obj) {
            this.options.push(obj[i]); //属性
            //this.recordL.push(obj[i]); //值
            // console.log(this.options);
          }
        })
      },
    },
  }
</script>

<style scoped lang="less">
  .el-header, .el-footer {
    background-color: #f6f6f6;
    color: #333;
  }

  .el-aside {
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #ffffff;
    padding: 0;
  }

  .all {
    background: #f6f6f6;

    .container {
      padding-right: 0.4rem;

      .left_nav {
        margin-top: 1.31rem;

        ul {
          li {
            margin-bottom: 0.3rem;
          }
        }
      }

      .content {
        .nav {
          font-size: 0.3rem;
          margin-left: 0.6rem;

          .text {
            height: 0.88rem;
            line-height: 0.88rem;
          }
        }

        .middle {
          /*margin-right: 0.4rem;*/
          background: #fff;
          /*height: 8.82rem;*/
          height: 8.958rem;
          padding: 0.3rem 0.3rem 0 0.3rem;

          .whole {
            margin: 0 0 0.2rem 0;
            background-color: #ffffff;
            border-radius: 0.06rem;
            border: 0.01rem solid #dcdcdc;

            .firstFrame {
              height: 0.68rem;
              background-color: #eeeeee;
              border-radius: 0.06rem 0.06rem 0 0;
              line-height: 0.68rem;
              padding-left: 0.29rem;

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
              margin: 0.3rem 0.29rem 0.3rem 0.29rem;
              box-sizing: border-box;
              border: 0.01rem solid #eee;
            }
          }
        }

        .last {
          padding: 0.29rem 0 0.4rem 0;
          font-size: 0.18rem;

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

</style>
