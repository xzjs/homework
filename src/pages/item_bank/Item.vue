<template>
  <!--题库出题-->
  <div class="all">

    <el-container class="container">

      <el-aside width="3rem" class="left_nav">
        <!--    学段-->
        <el-select v-model="value" :disabled=!prohibit placeholder="学段" @change="trigger">
          <el-option
            v-for="item in stage"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--    年级-->
        <el-select v-model="value1" :disabled=subprohibit placeholder="年级" @change="subTrigger">
          <el-option
            v-for="item in learning"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--    科目-->
        <el-select v-model="value2" :disabled=leaprohibit placeholder="科目" @change="bookTrigger()">
          <el-option
            v-for="item in subsection"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="lis(item.name)"
          >
          </el-option>
        </el-select>
        <!--    版本-->
        <el-select v-model="value3" :disabled=bookprohibit placeholder="版本" @change="book">
          <el-option
            v-for="item in bookVersion"
            :key="item.Id"
            :label="item.Name"
            :value="item.Id">

          </el-option>
        </el-select>

      </el-aside>

      <el-container class="content">
        <el-header style="height: 1.33rem" class="nav">

          <p class="text">我的题库</p>

          <ul class="tabbox" @click="changeTab">
            <li class="btnitem" :class="activetab==index?'active':''" v-for="(item,index) in list" :data-id="index">
              {{item}}
            </li>
          </ul>
          <div>

          </div>

        </el-header>

        <el-main style="margin-right: 0.4rem" class="middle">
          <!--          章节选-->
          <!--          <router-link to='/details'>-->
          <div class="" v-show="activetab==0">
            <el-tree
              :data="chapterData"
              accordion
              @node-click="handleNodeClick"
            >
            </el-tree>
          </div>

          <!--          知识选-->
          <div class="" v-show="activetab==1">
            <el-tree
              :data="knowledgePoints"
              accordion
              @node-click="handleNode">
            </el-tree>
          </div>
        </el-main>

        <el-footer class="last">
          <router-link to='tab'>
            <el-button type="primary" class="btn">
              <img src="../../assets/img/返回2.png" alt="">
              <span style="margin-bottom: 0.18rem;">返回</span>
            </el-button>
          </router-link>
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
        tabPosition: 'left',
        activetab: '0',
        list: ['按照章节选', '按照知识点选'],
        chapterData: [], // 章节
        knowledgePoints: [], // 知识
        value: '',
        value1: '',
        value2: '',
        value3: '',
        prohibit: true, // 学段是否禁用
        subprohibit: true, // 年级
        leaprohibit: true, // 科目
        bookprohibit: true, // 版本
        // 学段
        stage: [
          {
            id: '1',
            name: "小学"
          }, {
            id: '2',
            name: "中学"
          }, {
            id: '3',
            name: "高学"
          },
        ],
        subsection: [], // 科目
        learning: [], // 年级
        bookVersion: [], // 书的版本
        number: [],
        bookName: [],
        homeName: []
      }
    },
    created() {
      this.subject();
      this.section();
    },
    methods: {
      lis(name) {
        console.log(name);
        this.homeName = name
      },
      book() {
        this.itemChapter();
        this.knowledge()
      },
      // 路由传参 章节
      handleNodeClick(data) {
        console.log(data['children']);
        if (!data['children']) {
          this.number = data["id"];
          this.bookName = data["label"]

          this.$router.push(
            {
              name: 'Details',
              params: {
                id: 0,
                bookId: this.number,
                name: this.bookName,
                grade: this.value1,
                subject: this.value2,
                study: this.value,
                homeName:this.homeName
              }
            });
        }
      },
      // 路由传参 知识点  ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
      handleNode(data) {
        console.log(data);
        console.log(data.children);
        console.log(data['children']);
        if (!data['children']) {
          this.$router.push(
            {
              name: 'Details',
              params: {
                id: 1,
                bookId: this.number,
                name: this.bookName
              }
            });
        }
      },

      handleClick(tab, event) {
        console.log(tab, event)
      },
      changeTab(e) {
        this.activetab = e.target.dataset.id
      },

      // 激活年级框
      trigger() {
        this.subprohibit = false
      },
      // 激活科目框
      subTrigger() {
        this.leaprohibit = false;
      },
      // 激活版本框
      bookTrigger(index) {
        console.log(index);
        this.bookprohibit = false;
        this.edition();
      },
      // 科目
      subject() {
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Basic&a=getSubject').then(response => {
          var obj = response.data;
          for (let i in obj) {
            this.subsection.push(obj[i]); //属性
          }
        })
      },
      // 年级
      section() {
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Basic&a=getGrade').then(response => {
          var obj = response.data;
          for (let i in obj) {
            this.learning.push(obj[i]); //属性
          }
        })
      },
      // 版本
      edition() {
        let grade = this.value1;
        let subject = this.value2;
        let pharse = this.value;
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Basic&a=getEdition&gradeId=' + grade + '&subjectId=' + subject + '&pharseId=' + pharse).then(response => {
          var obj = response.data;
          this.bookVersion = [];
          for (let i in obj) {
            this.bookVersion.push(obj[i]); //属性
          }
          console.log(this.bookVersion);
        })
      },
      // 处理后台数据
      hanlder(data) {
        let obj = {
          id: data.id,
          label: data.name
        };
        if (data.child) {
          let aaa = [];
          for (let key in data.child) {
            aaa.push(this.hanlder(data.child[key]));
          }
          obj.children = aaa;
        }
        return obj;
      },
      // 章节api
      itemChapter() {
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Questions&a=getChapter&subjectId=' + this.value2 + '&gradeId=' + this.value1 + '&editionId=' + this.value3 + '&pharseId=' + this.value).then(response => {
          this.chapterData = []
          var obj = response.data;
          for (let key in obj) {
            this.chapterData.push(this.hanlder(obj[key])); //属性
          }
          console.log(this.chapterData);
        })
      },
      // 知识点api
      knowledge() {
        this.axios.get('http://tk.exejk12.com:8787//index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Questions&a=getknowledge&subjectId=' + this.value2 + '&phaseId=' + this.value).then(response => {
          var obj = response.data;
          this.knowledgePoints = []
          for (let key in obj) {
            this.knowledgePoints.push(this.hanlder(obj[key])); //属性
          }
        })
      }
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
        margin-top: 1.31rem;

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

          .text {
            height: 0.88rem;
            line-height: 0.88rem;
          }

          .tabbox {
            overflow: hidden;

            .btnitem:first-child {

            }

            .btnitem {
              float: left;
              width: 1.45rem;
              height: 0.45rem;
              line-height: 0.45rem;
              background-color: #fff;
              border-radius: 0.06rem 0.06rem 0 0;
              margin: 0 0.2rem 0 0;
              text-align: center;
              font-size: 0.2rem;
              color: #333;
              cursor: pointer;
            }

            li.active {
              background: #4b96ff;
              color: #fff;
            }
          }


        }

        .middle {
          height: 8.37rem;
          padding: 0.5rem 0 0 0.3rem;
          box-sizing: border-box;


          .el-tree {
            /deep/ .el-tree-node__label {
              font-size: 0.2rem;
            }

            /deep/ .el-tree-node__content {
              margin-bottom: 0.4rem;
            }

            /deep/ .el-tree__empty-block {
              width: 1.35rem;
              height: 1.23rem;
              background: url("../../assets/img/nothing.png") no-repeat;
              background-size: 1.35rem 1.23rem;
              position: absolute;
              top: 3rem;
              left: 6.89rem;

            }

            /deep/ .el-tree__empty-text {
              display: none;
            }

          }
        }

        .last {
          height: 1.10rem !important;
          padding: 0.29rem 0 0.4rem 0;
          font-size: 0.18rem;

          .btn {
            display: block;
            width: 1.4rem;
            height: 0.5rem;
            color: #333;
            background: #fff;
            border: 0.01rem solid #c8c8c8;
            font-size: 0.18rem;
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
<style>
  .el-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    color: #4a95ff;
  }

  .el-tree .el-icon-caret-right:before {
    content: "\E723";
    font-size: 0.24rem;
    /*color: #4a95ff;*/
  }

  .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    content: "\E722";
    font-size: 0.24rem;
    color: #4a95ff;
  }
</style>
