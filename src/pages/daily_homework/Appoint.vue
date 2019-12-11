<template>
  <div class="editAnswer">
    <!--      选择学生-->
    <el-container class="container">
      
      <el-container class="content">
        
        <el-header class="nav">
          <p class="text">选择学生</p>
        </el-header>
        
        <el-main class="middle">
          
          <div class="grid-content bg-purple-dark content" v-for="(item,n) in classList" :key="n">
            <el-collapse accordion>
              <el-collapse-item :title="item.classname">
                <ul>
                  <!--？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？                             暂时路径有问题             <img :src="i.userimg" alt="">-->
                  
                  <li class="name" v-for="(i,index) in item.student" :key="index">
                    <input type="checkbox">
                    
                    <img src="../../assets/img/home_daily.png" alt="" style="width: 0.68rem;height: 0.68rem">
                    <span class="subName">{{i.username}}</span>
                  </li>
                
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        
        
        </el-main>
        
        <el-footer class="last" style="height: 1.1rem">
          <div>
            
            <el-button type="primary" class="btn" @click="back">
              <img src="../../assets/img/返回2.png" alt="">
              <span>返回</span>
            
            </el-button>
            
            <el-button type="primary" class="btns" @click="back">
              <img src="../../assets/img/下一步.png" alt="">
              <span>确定</span>
            </el-button>
          
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Appoint",
        data() {
            return {
                classList: []
            }
        },
        created() {
            this.classtMethod()
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            classtMethod() {
                this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Dayly&a=class_student').then(response => {
                    var obj = response.data;
                    for (let i in obj) {
                        this.classList.push(obj[i]); //属性
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
          height: 8.8rem;
          
          .grid-content {
            margin-bottom: 0.20rem;
            
            /deep/ .el-collapse-item__arrow {
              
              /* flex: 1 0 auto;
               order: -1*/
              
            }
            
            .el-collapse {
              border: 0.01rem solid #eee;
            }
            
            .el-collapse-item {
              .name {
                height: 0.89rem;
                font-family: PingFang-SC-Medium;
                font-size: 0.2rem;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0;
                margin: 0.2rem 0.3rem 0 0.3rem;
                border-bottom: 0.01rem solid #eee;
                display: flex;
                align-items: center;
                justify-items: center;
                padding-bottom: 0.21rem;
                box-sizing: border-box;
                input {
                  width: 0.24rem;
                  height: 0.24rem;
                  line-height: 0.89rem;
                  background-image: linear-gradient(0deg,
                  #e7e7e7 0%,
                  #ffffff 100%),
                  linear-gradient(
                    #ffffff,
                    #ffffff);
                  background-blend-mode: normal,
                  normal;
                  border-radius: 0.06rem;
                  border: solid 0.02rem #aaaaaa;
                }
               img{
                 width: 0.68rem;
                 height: 0.68rem;
                 margin: 0 0.21rem 0 0.31rem;
               }
              }
            }
          }
          
          .content {
            /deep/ .el-collapse-item__header {
              font-size: 0.24rem;
              height: 0.68rem;
              background-color: #eeeeee;
              border-radius: 0.06rem;
              padding-left: 0.83rem;
              box-sizing: border-box;
            }
          }
        }
        
        .last {
          padding: 0.30rem 0 0 0;
          font-size: 0.18rem;
          box-sizing: border-box;
          
          .btn {
            margin-right: 5.45rem;
          }
          
          .btn {
            width: 1.4rem;
            height: 0.5rem;
            color: #333;
            background: #fff;
            border: 0.01rem solid #c8c8c8;
            border-radius: 0.06rem;
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
            
            /*padding:  0.14rem 0 0 0.34rem;*/
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
