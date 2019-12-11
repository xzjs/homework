<template>
  <!--布置作业-->
  <div class="all">


    <el-container class="container">

      <el-aside width="3.7rem" class="left_nav">
        <el-row class="tac">
          <!-- 语文人教 下拉框-->
          <el-select v-model="value" class="list" @change="obtain">

            <el-option v-for="(item,index) in queryList" :key="item.id" :label="item.textbook" :value="item.id"
                       @click.native="chapter(item)">
            </el-option>

          </el-select>
          <!--          左侧导航-->
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#f6f6f6"
            @open="handleOpen"
            @close="handleClose">

            <el-submenu v-for="(i,n) in rendering" :index="(n+1+'')" :key="n">
              <template slot="title">
                <span @click="extract(i)">{{i.label}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" v-for="(q,m) in i.children" :key="m">
                  <span style="margin-left: 0.41rem" @click="take(q)">
                  {{q.label}}
                  </span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>

        </el-row>

      </el-aside>

      <el-container class="content">
        <!--        布置作业-->
        <el-header class="nav" style="height: 0.88rem;">
          <p class="text">布置作业</p>
        </el-header>
        <!-- 内容 -->
        <el-main class="middle">
          <!--          作业标题-->
          <el-row class="head">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark above">
                <span class="title">作业标题</span>
                <el-input v-model="input" placeholder="初中语文日常作业"></el-input>
              </div>
            </el-col>
          </el-row>
          <!--          上传题目-->
          <el-row class="upload">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark above">
                <span class="title">上传题目</span>
                <div class="upload_box" style="margin-top: 0.3rem">
                  <div class="first" style="text-align: center" @click="outerVisible = true">
                    <img src="../../assets/img/上传题目.png" alt="" style="width: 0.46rem;
	height: 0.49rem;margin-top: 0.25rem">
                    <p style="font-size: 0.2rem">上传题目</p>
                  </div>

                  <div class="upload_list">
                    <ul>
                      <li v-for="(item,index) in images">
                        <img :src="item" alt="" style="width: 80px;height: 80px" @click="preview(index)">
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </el-col>
          </el-row>

          <!--          答题卡-->
          <el-row class="answer_card">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark above">
                <p class="title">答题卡制作</p>
                <div @click="qq"
                     v-for="(item,n) in optionCard" class="optionBtn">
                  <el-button type="primary" class="optionNum" @click="dialogFormVisible = true">
                    {{item.type}}
                  </el-button>
                </div>
              </div>
            </el-col>

            <div class="tags">
              <el-tag
                class="tag1"
                style="background: #fff;border: none;"
                v-for="(tag,n) in newDynamicTags"
                :key="n"
                closable
                :disable-transitions="false"
                @close="handleCloseTag(tag,n)">
                <span style="line-height: 0.48rem;color: #333" v-html="tag">{{tag}}</span>
              </el-tag>
            </div>
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


              <li class="btn2">
                <div @click="lower">
                  <img src="../../assets/img/nextStep.png" alt="">
                  <span>下一步</span>
                </div>
              </li>
            </ul>
          </div>
        </el-footer>
      </el-container>
    </el-container>

    <!--    上传题目弹框-->
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
          <el-button type="primary" @click="upload">
            <img src="../../assets/img/camera.png" alt="">
            <p>
              相册
            </p>
          </el-button>
          <input type="file" ref="upload" class="fileUpload"/>
        </div>
      </el-dialog>
    </div>

    <!-- 作业弹框表单 -->
    <div class="tabs">
      <el-dialog title="设置题目" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="questionForm">

          <el-form-item label="题型：" :label-width="formLabelWidth">
            <el-select v-model="form.name" placeholder="请选择题型" class="please">
              <el-option v-for=" tabNum in tabOption"
                         :key="tabNum.value"
                         :label="tabNum.label"
                         :value="tabNum.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="题号：" :label-width="formLabelWidth" class="tabsLast">
            <el-input type="number" v-model="form.num" autocomplete="off" class="tabsFront"></el-input>
            <span>&#8197—&#8197</span>
            <el-input type="number" v-model="form.nums" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitModal">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>

        </div>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: "item",
    data() {
      return {
        input: '',  // 作业标题
        checked: false,
        activeName: 'first',

        // 导航
        value: '语文人教七年级上册',
        outerVisible: false,
        innerVisible: false, // 上传题目弹框
        // 答题卡选项
        optionCard: [{
          type: "+ 选择题"
        }, {
          type: "+ 判断题"
        }, {
          type: "+ 填空题"
        }, {
          type: "+ 简答题"
        },],
        // 弹窗题型选项
        tabOption: [{
          value: '选择题',
        }, {
          value: '填空题',
        }, {
          value: '判断题',
        }, {
          value: '简单题',
        },],
        // 表单弹窗
        newDynamicTags: [],
        dialogFormVisible: false,
        form: {
          region: '',
          label: "",
          value: '',
          num: "",
          nums: ''
        },
        formLabelWidth: '120px',
        dynamicTags: [], // 创建的题
        queryList: [], // 全部输
        titles: '', // 点击的是几下面渲染几
        rendering: [], // 匹配数据

        chapterId: '', // 章节目录ID
        chapter_s_id: '', //章节子集

        paper: '', // 作业标题 暂无
        urlImg: '', // 上传图片路径 暂无

        subjectId: '', // 科目id
        gradeId: '',  //   年级id
        bookId: '', // 课本的ID
      }
    },
    created() {
//      this.queryFrame()
    },
    methods: {
      ...mapMutations(['addImg', 'addAnswer']),
      upload() {
        this.$refs.upload.click();
        this.$refs.upload.addEventListener("change", this.changepic, false);
      },
      changepic() {
        let f = this.$refs.upload.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = e => {
          this.addImg(reader.result);
        }
      },
      // 预览 传参
      preview(index) {
        this.$router.push(
          {
            name: 'Preview',
            params: {
              'index': index,
            }
          });
      },
      // 章目录ID
      extract(i) {
        this.chapterId = i.id
      },
      // 目录子集id
      take(i) {
        this.chapter_s_id = i.id
      },
      chapter(item) {
        // console.log(item.textbook);
        // console.log(item.subject);
        // console.log(item.grade);
        this.subjectId = item.subject;
        this.gradeId = item.grade

      },
      // 点击的书id
      obtain(index) {
        this.titles = index;
        this.linkage();
        this.bookId = index;
      },
      handleClick(tab, event) {
        // console.log(tab, event)
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath)
      },
      qq() {
        this.dialogFormVisible = true
      },
      // 弹框提交
      submitModal() {
        this.dialogFormVisible = false;

        for (let i = this.form.num; i <= this.form.nums; i++) {
          this.addAnswer({
            no: i,
            title: this.form.name,
            children: [],
            selectNum: 4,
            value: 2,
          })
        }

        let str = `<p style="float:left;width: 560px;height: 48px;border: 0.01rem solid #777e8c;background: #f8f8f8;padding-left: 0.14rem;border-radius: 0.06rem;">${this.form.name} <span style="float: right;margin-right: 0.32rem">题号: ${this.form.num}到 ${this.form.nums}<span></p>`;

        if (this.dynamicTags.includes(str)) {
          return
        }
        this.newDynamicTags = [];
        this.dynamicTags.push(str);

        console.log(this.dynamicTags);

        this.dynamicTags.forEach((i, n) => {
          this.newDynamicTags.push(` <p style="float: left">${n + 1}、</p>` + i)
          console.log(this.newDynamicTags);
        });

        this.$refs.questionForm.resetFields()

      },
      handleCloseTag(tag, n) {
        tag = tag.slice(6);
        console.log(tag);
        console.log(this.dynamicTags);
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.newDynamicTags = [];
        this.dynamicTags.forEach((i, n) => {

          this.newDynamicTags.push(`第 ${n + 1} 题 ` + i)
        })
      },
      // 课本查询
      queryFrame() {
        this.axios.get('/index.php?s=App&m=Dayly&a=book_info&uid=644&token=513be51f05f85c2e3fc708be5431216d').then(response => {
          var obj = response.data;
          for (let i in obj) {
            this.queryList.push(obj[i]); //属性
          }
        })
      },
      // 课本联动渲染
      linkage() {
        this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Dayly&a=query_info&id=' + this.titles).then(response => {
          this.rendering = [];
          var obj = response.data;
          for (let i in obj) {
            this.rendering.push(obj[i]); //属性
          }
        }).catch(req => {
          this.rendering = [];
          var obj = req.data.data;
          for (let i in obj) {
            this.rendering.push(obj[i]); //属性
          }
        })
      },
      // 下一步 路由传参
      lower() {
        this.$router.push(
          {
            name: 'Answer',
            params: {
              chapter: this.chapterId,
              chapters: this.chapter_s_id,
              papers: this.paper,
              url: this.urlImg,
              book: this.bookId,
              grade: this.gradeId,
              subject: this.subjectId,
              list: this.newDynamicTags
            }
          });
      }
    },
    computed: mapState(['images'])

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
        display: block;
        margin-top: 0.88rem;

        .list {
          /deep/ .el-input__inner {
            width: 3.10rem;
            height: 0.48rem;
            font-size: 0.2rem;
          }
        }

        .el-menu {
          /deep/ span, li {
            font-size: 0.2rem;
            width: 100%;
            text-align: left;
          }
        }

        .el-menu {
          /deep/ span {
            padding-left: 0.11rem;
            box-sizing: border-box;
          }
        }

        .el-menu {
          /deep/ i {
            margin-right: 0.2rem;
          }
        }

        .el-menu--inline {
          /deep/ li {
            padding-left: 0.71rem;
            box-sizing: border-box;
          }
        }

        .el-menu-item-group {
          /deep/ div {
            padding: 0;
          }
        }
      }

      .content {
        .nav {
          font-size: 0.3rem;
          height: 0.88rem;
          line-height: 0.88rem;

          .text {
          }
        }

        .middle {
          margin-right: 0.4rem;
          background: #fff;
          padding: 0.3rem 0.3rem 0 0.3rem;
          box-sizing: border-box;
          border-radius: 0.06rem;
          height: 8.82rem;

          .head {
            width: 100%;
            padding-bottom: 0.3rem;
            box-sizing: border-box;
            border-bottom: 0.01rem solid #e5e5e5;

            .above {
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
                      /*border: 0.01rem solid #4b96ff;*/
                      border-radius: 0.06rem;
                      margin: 0 0.2rem 0 0.2rem
                    }
                  }
                }
              }
            }
          }

          .answer_card {

            height: 2.8rem;
            margin-bottom: 1.03rem;

            .tags {
              margin-top: 1.8rem;

              .tag1 {
                display: block;
                width: 6.45rem;
                height: 0.48rem;
                font-size: 0.2rem;
                margin-bottom: 0.2rem;
              }
            }

            .above {
              .title {
                font-size: 0.24rem;
                margin: 0.31rem 0 0.3rem 0;
              }

              .optionBtn {
                float: left;
                margin-right: 0.2rem;

                .optionNum {
                  font-size: 0.2rem;
                  width: 1.8rem;
                  height: 0.5rem;
                  background-color: #4b96ff;
                  border-radius: 0.06rem;
                  border: solid 0.01rem #4b96ff;
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
              margin-right: 5.45rem;

              img {
                width: 0.29rem;
                height: 0.23rem;
                vertical-align: middle;
                margin-top: -0.08rem;
              }
            }

            .btn2 {
              img {
                width: 0.29rem;
                height: 0.23rem;
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

  .tabs {
    /deep/ .el-dialog {
      width: 4.8rem;
      height: 3.26rem;
      margin-top: 35vh !important;
      margin-left: 82.8vh;
      text-align: center;
      border-radius: 0.06rem;
    }
  }

  .tabs {
    /deep/ .el-dialog__header {
      height: 0.9rem;
      line-height: 0.9rem;
    }
  }

  .tabs {
    /deep/ .el-dialog__title {
      font-size: 0.24rem;
      margin-top: 0.44rem;
    }
  }

  .tabs {
    /deep/ .el-form-item__label {
      font-size: 0.20rem;
      padding-top: 0.03rem;
    }
  }

  .el-form {
    /deep/ .el-input--suffix {
      font-size: 0.20rem;
      width: 2.36rem;
      height: 0.48rem;

      /*margin-left: 0.2rem;*/
      float: left;
    }
  }

  .el-form-item {
    /deep/ .el-input__inner {
      height: 0.48rem;
      line-height: 0.48rem;
    }
  }

  .tabs {
    /deep/ .el-dialog__body {
      padding: 0.24rem 0 0 0;
      box-sizing: border-box;
    }
  }

  .tabs {
    /deep/ .el-popper {
      margin-left: -1.1rem;
    }
  }

  .el-dialog__body {
    .tabsLast {
      /deep/ .el-input {
        width: 1.0rem;
        height: 0.48rem;
      }
    }
  }

  .tabs {
    /deep/ .please {
      margin-left: -1.1rem;
    }
  }

  .tabs {
    /deep/ .tabsFront {
      margin-left: -1.0rem;
    }
  }

  .tabs {
    /deep/ .dialog-footer {
      text-align: center;
      margin: 0 0.2rem 0 0;
    }
  }

  .fileUpload {
    display: none;
  }


</style>

