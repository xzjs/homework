<template>
  <div class="editAnswer">
    <!--      编辑答案-->
    <el-container class="container">
      
      <el-container class="content">
        <el-header class="nav">
          <p class="text">编辑答案卡</p>
        </el-header>
        
        <el-main class="middle">
          
          <div class="answerCard" v-for="(item,n) in dataList">
            
            <div class="itemAnswer">
              <el-row class="firstTopic">
                <el-col :span="24">
                  
                  <input type="checkbox" style="float: left">
                  <h3>第 {{n+1}} 题 {{item.title}}</h3>
                </el-col>
              
              </el-row>
              
              <div class="itemTopic" v-for="(i,ndex) in item.children">
                <el-row class="lastTopic">
                  <input type="checkbox" style="float: left">
                  <el-col :span="4">{{ndex+1}}.</el-col>
                  <el-col :span="18">
                    <div style="float: left;" v-for="(item,idx) in i.answer">
                      <el-button type="primary" circle style="margin-left: 20px;" class="answerBtn"
                                 :class="idx==index?'hover':''"
                                 @click="selection(idx)">
                        {{item}}
                      
                      </el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        
        </el-main>
        
        <el-footer class="last" style="height: 1.15rem">
          
          <ul class="methodBtn">
            <li class="btnitem">
              <router-link to='/answer'>
              <div>
                <img src="../../assets/img/cancelle.png" alt="">
                <span>取消</span>
              </div>
              </router-link>
            </li>
            <li class="btnitem">
              <div @click="open">
                <img src="../../assets/img/del.png" alt="">
                <span>删除</span>
              </div>
            </li>
          </ul>
        
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        name: "Edit",
        data() {
            return {

                dataList: [
                    {
                        title: '选择题',
                        num: 3,
                        children: [
                            {answer: ['A', 'B', 'C', 'D'],},
                            {answer: ['A', 'B', 'C', 'D'],},
                            {answer: ['A', 'B', 'C', 'D'],},
                        ]
                    },
                    {
                        title: '判断题',
                        children: [
                            {
                                answer: ['A', 'B'],
                            },
                            {
                                answer: ['A', 'B'],
                            }
                        ]
                    }
                ],
                index: 0,
                number: 0,
                checked: {},
                abc: {}
            }
        },
        methods: {
            // 删除
            open() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 选择
            selection(idx) {
                this.index = idx;

            },
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
          padding: 0.3rem 0.3rem 0 0.3rem;
          border-radius: 0.06rem;
          
          .answerCard {
            /*height: 4.54rem;*/
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
                
                input {
                  width: 0.24rem;
                  height: 0.24rem;
                  background-image: linear-gradient(0deg,
                  #e7e7e7 0%,
                  #ffffff 100%),
                  linear-gradient(#ffffff,
                  #ffffff);
                  background-blend-mode: normal,
                  normal;
                  border-radius: 0.06rem;
                  border: solid 0.02rem #aaaaaa;
                  margin: 0.22rem 0.24rem 0 0;
                  vertical-align: middle;
                }
                
                .el-icon-edit-outline {
                  width: 0.28rem;
                  height: 0.28rem;
                  
                }
              }
              
              .itemTopic {
                padding: 0.3rem 0.3rem 0 0.3rem;
                margin-bottom: 0.3rem;
                box-sizing: border-box;
                height: 0.99rem;
                background: #fff;
                
                .lastTopic {
                  /*height: 0.99rem;*/
                  border-bottom: 0.01rem solid #dcdcdc;
                  padding-bottom: 0.30rem;
                  box-sizing: border-box;
                  
                  input {
                    width: 0.24rem;
                    height: 0.24rem;
                    background-image: linear-gradient(0deg,
                    #e7e7e7 0%,
                    #ffffff 100%),
                    linear-gradient(#ffffff,
                    #ffffff);
                    background-blend-mode: normal,
                    normal;
                    border-radius: 0.06rem;
                    border: solid 0.02rem #aaaaaa;
                    margin: 0.22rem 0.24rem 0 0;
                    vertical-align: middle;
                  }
                  
                  .el-col-4 {
                    font-size: 0.24rem;
                    line-height: 0.69rem;
                    /*line-height: 0.99rem;*/
                    /*margin: 0.54rem 0 0 0.32rem;*/
                  }
                  
                  .el-col-18 {
                    margin-left: -2.74rem;
                    
                    .el-button--primary {
                      color: #333333;
                      background-color: #dcdee2;
                      border: none;
                    }
                  }
                  
                  .answerBtn {
                    width: 0.68rem;
                    height: 0.68rem;
                  }
                  
                  .answerBtn {
                    /deep/ span {
                      font-size: 0.3rem;
                    }
                  }
                  
                  .answerBtn.hover {
                    background-color: #00d096;
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
          
          .methodBtn {
            margin-top: -0.5rem;
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: 0rem;
            
            .btnitem {
              float: left;
              width: 1.3rem;
              height: 0.5rem;
              line-height: 0.5rem;
              text-align: center;
              background-color: #ffffff;
              border-radius: 0.06rem;
              border: solid 0.01rem #c8c8c8;
              margin-right: 0.2rem;
              /*cursor: pointer;*/
              
              img {
                width: 0.25rem;
                height: 0.25rem;
                vertical-align: middle;
                margin-top: -0.03rem;
              }
              
              span {
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
