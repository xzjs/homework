<template>
  <div class="preview">
    <!--  预览    -->
    <el-container>
      <el-header>
        <span class="title">题目预览</span>
        <span class="num">1/5</span>
      </el-header>
      <el-main>
        
        <el-row>
          <el-col class="left">
            <div class="grid-content bg-purple">
              <img src="../../assets/img/upper.png" alt="">
            </div>
          </el-col>
          
          <el-col class="middle">
            <div class="grid-content bg-purple-light">3213</div>
          </el-col>
          
          <el-col class="right">
            <div class="grid-content bg-purple">
              <img src="../../assets/img/lower.png" alt="">
            </div>
          </el-col>
        
        </el-row>
      
      </el-main>
      <el-footer class="last" style="height: 1.1rem">
        <div>
          <ul class="returnBtn">
            <li class="btn1">
              <!--              <router-link to='/tab'>-->
              <div @click="back">
                <img src="../../assets/img/goBack.png" alt="">
                <span>返回</span>
              </div>
              <!--              </router-link>-->
            </li>
            
            
            <li class="btn2">
              <div @click="delBtn">
                <img src="../../assets/img/del.png" alt="">
                <span>删除</span>
              </div>
          
            </li>
          </ul>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Preview",
        data() {
            return {}
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            delBtn() {
                console.log("shanchu");
            }
        }
    }
</script>

<style scoped lang="less">
  .preview {
    background: #f6f6f6;
    width: 19.2rem;
    height: 10.8rem;
    
    .el-header {
      height: 0.88rem !important;
      color: #333;
      line-height: 0.88rem;
      padding: 0;
      
      .title {
        width: 11.9rem;
        height: 0.29rem;
        font-family: PingFang-SC-Bold;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.38rem;
        letter-spacing: 0;
        color: #333333;
        margin-left: 1.75rem;
      }
      
      .num {
        float: right;
        width: 0.34rem;
        height: 0.2rem;
        font-family: PingFang-SC-Bold;
        font-size: 0.2rem;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0;
        color: #4b96ff;
        margin-right: 1.75rem;
      }
    }
    
    .el-main {
      padding: 0;
      
      .middle {
        width: 15.70rem;
        height: 8.82rem;
        background-color: #e5e5e5;
      }
      
      .left {
        width: 1.75rem;
        
        img {
          width: 0.6rem;
          height: 0.6rem;
          margin: 4.06rem 0.5rem 0 0.65rem;
        }
      }
      
      .right {
        width: 1.75rem;
        
        img {
          width: 0.6rem;
          height: 0.6rem;
          margin: 4.06rem 0.65rem 0 0.5rem;
        }
      }
    }
    
    .el-footer {
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
          color: #fff;
          background-color: #fff;
        }
        
        .btn1 {
          margin: 0 5.75rem 0 1.75rem;
          
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


</style>
