<template>
  <div class="editAnswer">
    <!--      添加教辅-->
    <el-container class="container">

      <el-container class="content">

        <el-header class="nav">
          <p class="text">添加教辅</p>
        </el-header>

        <el-main class="middle">
<!--          学科下拉框-->
          <el-row class="navMiddle">
            <el-col :span="8" class="sub">
              <span class="subject">学科</span>
              <el-select v-model="subValue" class="subList" @change="bookOne" placeholder="语文">
                <el-option
                  v-for="item in subjectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-col>
            <!--          年级下拉框-->
            <el-col :span="16" class="gra">
              <span class="grade">年级</span>
              <el-select v-model="graValue" class="graList" @change="gradeCheck" placeholder="一年级">
                <el-option
                  v-for="item in gradeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

<!--          教辅展示-->
          <el-row class="teachImg">
            <el-col :span="24">

              <div v-for="(m,index) in imgList"
                   :key="index" class="every">
                <input type="checkbox" class="frame" v-if="!hide" style="zoom:180%" @change="checkeds(index,m.id)">
                <img :src="m.imgurl" alt=""  @click="toDetail(m,index)">
                <div class="words">
                  <p class="first">{{m.textbook}}</p>
                </div>
              </div>

            </el-col>
          </el-row>
        </el-main>


        <el-footer class="last" style="height: 1.1rem">

          <ul class="returnBtn">
            <li class="btn1">
              <router-link to='/teach'>
                <div>
                  <img src="../../assets/img/goBack.png" alt="">
                  <span>返回</span>
                </div>
              </router-link>
            </li>


            <li class="btn2" v-if="!showBtn" @click="add">
              <img src="../../assets/img/AddBook.png" alt="">
              <span>添加教辅</span>

            </li>
          </ul>

          <ul v-if="showBtn" class="methodBtn">
            <li class="btnitem">
              <div type="primary" @click="deleteBook">
                <img src="../../assets/img/delect.png" alt="">
                <span>添加</span>
              </div>
            </li>
            <li class="btnitem">
              <div @click="cancel">

                <img src="../../assets/img/cancel.png" alt="">
                <span>取消</span>
              </div>
            </li>
          </ul>

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
                img: [{
                    imgS: require('../../assets/img/长方形.png')
                }, {
                    imgS: require('../../assets/img/长方形.png')
                }],
                subValue: "", // 学科
                graValue: "", // 年级
                subjectList: [], // 学科总数据
                gradeList: [],// 年级总数据
                imgList: [], // 教辅总数据
                showBtn: false, // 添加按钮展示
                all: [], // 请求图片数据
                class: [], // 年级筛选
                hide: true, // input显示
                checked: {}

            }
        },
        created() {
            this.subjectMethod();
            this.gradeMethod();
            this.imgMethod();
            this.imgList = this.all;
        },
        methods: {

            // 删除框
            checkeds(index,bookId) {
                let b = document.getElementsByClassName("frame");
                if (this.checked[index]) {
                    this.checked[index] = 'none';
                } else {
                    this.checked[index] = bookId;
                }
            },
            // 显示按钮
            add() {
                this.showBtn = true;
                this.hide = false
            },
            // 删除书本
            deleteBook() {
                this.$confirm('是否继续添加此教材?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    console.log(this.checked);
                    let list = [];
                    for (let key in this.checked) {
                        if (this.checked[key] !== 'none') {
                            list.push(this.checked[key]);
                        }
                    }

                    this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Textbook&a=addTextbook&id='+list.join(',')).then(response => {
                        console.log(response);
                    })

                    this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消添加'
                    });
                });

            },
            // 取消按钮
            cancel() {
                this.showBtn = false;
                this.hide = true
            },

            // 学科筛选框
            bookOne(event) {
                this.imgList = this.all;
                if (event) {
                    this.option = this.imgList.filter((item, index) => {
                        if (item.textbook.indexOf(event) !== -1) {
                            return item
                        }
                    });
                    this.imgList = this.option;
                }
            },
            //年级筛选
            gradeCheck(val) {

                this.imgList = this.all;
                if (val) {
                    this.class = this.imgList.filter((item, index) => {
                        if (item.textbook.indexOf(val) !== -1) {
                            return item
                        }
                    });
                    this.imgList = this.class;
                }
            },

            // 路由传参
            toDetail(m, index) {
                this.$router.push(
                    {
                        name: 'Chapter',
                        params: {
                            id: index + 1,
                            passImg: m.imgurl,
                            passText: m.textbook
                        }
                    });
                window.localStorage.bookid = index + 1; //

                window.localStorage.text = m.textbook;
                window.localStorage.textImg = m.imgurl;

            },

            // 学科
            subjectMethod() {
                this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Basic&a=getSubject').then(response => {
                    var obj = response.data;
                    for (let i in obj) {
                        this.subjectList.push(obj[i]); //属性
                    }
                })
            },
            // 年级
            gradeMethod() {
                this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Basic&a=getGrade').then(response => {
                    var obj = response.data;
                    for (let i in obj) {
                        this.gradeList.push(obj[i]); //属性
                    }
                })
            },
            // 图片列表
            imgMethod() {
                this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Textbook&a=getList').then(response => {
                    var obj = response.data;
                    for (let i in obj) {
                        this.imgList.push(obj[i]); //属性
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
          padding: 0.3rem 0.5rem 0 0.5rem;
          border-radius: 0.06rem;
          height: 8.8rem;

          .navMiddle {
            z-index: 10;

            span {
              font-size: 0.24rem;
              font-family: PingFang-SC-Medium;
              font-weight: bold;
              font-stretch: normal;
              letter-spacing: 0;
              color: #333333;
              margin-right: 0.18rem;
            }

            /deep/ input {
              width: 3rem;
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
              font-size: 0.2rem;
            }
          }

         .teachImg {
           .every {
             display: inline-block;
             position: relative;

             img {
               width: 2.02rem;
               height: 2.83rem;
               float: left;
               margin: 0.6rem 0.43rem 0 0.44rem;
             }
             .frame {
               width: 0.32rem;
               height: 0.32rem;
               background-color: #4b96ff;
               border: solid 1px #4b96ff;
               position:absolute;
               top: 0.48rem;
               left: 0.3rem;
             }

             .words {
               position: absolute;
               left: 0.45rem;
               bottom: 0;
               width: 2rem;
               height: 0.72rem;
               /*background-color: #000000;*/
               box-shadow: 0 0.03rem 0.08rem 0 rgba(0, 0, 0, 0.2);
               border-radius: 0 0 0.05rem 0.05rem;
               background: #252217;
               opacity: 0.6;
               z-index: 100;

               .first {
                 /*width: 161px;*/
                 height: 0.22rem;
                 font-family: PingFang-SC-Medium;
                 font-size: 0.22rem;
                 font-weight: bold;
                 font-stretch: normal;
                 /*line-height: 0.38rem;*/
                 letter-spacing: 0;
                 color: #ffffff;
                 padding: 0.1rem 0.27rem 0 0.12rem;
                 box-sizing: border-box;
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
            .btn1,.btn2 {
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
            .btn1{
              margin-right: 7.1rem;
              img {
                width: 0.29rem;
                height: 0.23rem;
                vertical-align: middle;
                margin-top: -0.08rem;
              }
            }
            .btn2{
              img{
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
              float: left;
              width: 1.3rem;
              height: 0.5rem;
              line-height: 0.5rem;
              text-align: center;
              background-color: #2c97ff;
              border-radius: 0.06rem;
              border: solid 0.01rem #c8c8c8;
              margin-right: 0.2rem;
              cursor: pointer;
              color: #fff;

              img {
                width: 0.25rem;
                height: 0.25rem;
                vertical-align: middle;
                margin-top: -0.03rem;
              }

              span {
                font-size: 0.18rem;
              }
            }
          }

        }

      /*  .background1 {
          position: fixed;
          top: 4.95rem;
          left: 0.9rem;
          z-index: 0;
          display: block;
          width: 17.40rem;
        }

        .background2 {
          position: fixed;
          bottom: 1.9rem;
          left: 0.9rem;
          z-index: 0;
          width: 17.40rem;
        }*/
      }
    }
  }

</style>
