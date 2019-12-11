<template>
  <!--题库详情-->
  <div class="all">

    <el-container class="container">

      <el-aside width="3rem" class="left_nav">
        <el-select v-model="value" :disabled=!type placeholder="全部题型" @change="topicType">
          <el-option
            v-for="item in questionType"
            :key="item.id"
            :label="item.typeName"
            :value="item.id">
          </el-option>
        </el-select>

        <el-select v-model="value1" :disabled=hard placeholder="全部难度" @change="topicQuestion">
          <el-option
            v-for="item in difficulty"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <el-select v-model="value2" :disabled=question placeholder="全部题类">
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-aside>

      <el-container class="content">
        <el-header class="nav">
          <p class="text">{{this.$route.params.name}}</p>

        </el-header>

        <el-main style="margin-right: 0.4rem" class="middle">
          <div
            v-for="(item,index) in whole"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
            class="wholeBox"
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

              <el-col :span="23"
                      v-for="(i,n) in item.question"
                      :key="i.id"
                      :value="i.id"
                      class="theme"
              >
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
<!--{{// this.$route.params.homeName}}-->
        <el-footer class="last">
          <router-link to='/item'>
            <el-button type="primary" class="btn">
              <img src="../../assets/img/返回2.png" alt="">
              <span>返回</span>
            </el-button>
          </router-link>
          <router-link to='/itemSend'>
            <el-button type="primary" class="btns" @click="select">
              <span v-model="number">已选{{number}}题</span>
            </el-button>
          </router-link>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>


  import $ from "jquery";

  export default {
    name: "item",
    data() {
      return {
        activeName: 'first',
        whole: [], // 全部章节下的题
        questionType: [],  // 全部题型
        difficulty: [], // 全部难度
        category: [], // 全部题类

        type: true, // 全部题型
        hard: true, // 全部难度
        question: true, // 全部题类

        value: '',
        value1: '',
        value2: '',

        checked: {},
        number: 0,
        every: [],
        abc: {},
        aaa: [],

      }
    },
    created() {
      this.detailedItem();
      this.allTopic();
      this.allDifficulty();
      this.allCategory()
    },
    methods: {

      allCheckeds(index, bookId, question, tagName) {
        let allcheck = $('.checkall');
        setTimeout(() => {
          this.number = 0;
          allcheck.each((n, i) => {
            if ($(i).prop("checked")) {
              this.number++;
            }
          });
        }, 0);

        var checkboxx = Array.from(document.getElementsByClassName('checkboxInput' + bookId));
        if (this.abc[tagName]) {
          $('.checkboxInput' + bookId).prop('checked', true);

          Object.keys(question).forEach((item, index) => {
              console.log(question[item]['id']);
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
        console.log(this.checked, index);
        console.log(this.checked[index]);
        if (this.checked[tagName][index]) {
          this.checked[tagName][index] = null;
          this.number--;
          console.log(this.number);
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
      topicType() {
        this.hard = false
      },
      topicQuestion() {
        this.question = false
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 路由传参
      select(i, n) {
        let topicId = this.every.join(",");
        this.$router.push(
          {
            name: 'ItemSend',
            params: {
              topicId: this.checked,
              sub:this.$route.params.homeName,
            }
          })
        window.location.topics = this.checked
      },
      //  获取章节下的题目
      detailedItem() {
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Questions&a=Questions&id=' + this.$route.params.bookId + '&type=' + this.$route.params.id).then(response => {
          var obj = response.data;
          for (let i in obj) {
            this.whole.push(obj[i]); //属性
            this.abc[obj[i]['typeName']] = false;
            this.checked[obj[i]['typeName']] = {};
          }

        })
      },
      // 获取全部题型
      allTopic() {
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Basic&a=getQtype&subjectId=' + this.$route.params.subject + 'gradeId=' + this.$route.params.grade).then(response => {
          var obj = response.data;
          for (let i in obj) {
            this.questionType.push(obj[i]); //属性
          }
          // console.log(this.questionType);
        })
      },

      // 全部难度
      allDifficulty() {
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Basic&a=getDiff').then(response => {
          var obj = response.data;
          for (let i in obj) {
            this.difficulty.push(obj[i]); //属性
          }
        })
      },
      // 全部题类
      allCategory() {
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Basic&a=gatPaperTypes&pharseId=' + this.$route.params.study).then(response => {
          var obj = response.data;
          for (let i in obj) {
            this.category.push(obj[i]); //属性
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
      .left_nav {
        margin-top: 0.88rem;

        .el-select {
          margin-bottom: 0.3rem;
        }


        ul {
          li {
            margin-bottom: 0.3rem;
          }
        }
      }

      .content {
        .nav {
          font-size: 0.3rem;
          height: 0.88rem !important;

          .text {
            height: 0.88rem;
            line-height: 0.88rem;
          }
        }

        .middle {
          background: #fff;
          height: 8.82rem;
          padding: 0.3rem 0.3rem 0 0.3rem;

          .wholeBox {
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
          height: 1.10rem !important;
          padding: 0.29rem 0 0.4rem 0;
          font-size: 0.18rem;

          .btn {
            margin-right: 5.8rem;
          }

          .btn {
            margin-right: 5.8rem;
          }

          .btn {
            width: 1.4rem;
            height: 0.5rem;
            color: #333;
            background: #fff;
            border: 1px solid #c8c8c8;
          }

          .btns {
            width: 1.4rem;
            height: 0.5rem;
            color: #333;
            background: #fff;
            border: 1px solid #c8c8c8;
          }

          img {
            width: 0.29rem;
            height: 0.23rem;

          }
        }
      }
    }
  }

</style>
