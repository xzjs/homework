<template>
  <!--我的错题本-->
  <div class="all">

    <el-container class="container">

      <el-aside width="3rem" class="left_nav">
        <el-select v-model="value" placeholder="题库出题" style="width: 2.36rem;height: 0.44rem">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-aside>

      <el-container class="content">
        <el-header style="height: 0.88rem" class="nav">
          <p class="text">我的错题本</p>

        </el-header>

        <el-main class="middle">
          <el-row style="border-radius: 0.04rem;height: 4.66rem;width: 100%;border: 0.01rem solid #eee;">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark" style="height: 0.68rem;width: 100%;background: #eee;line-height: 0.689rem;padding-left: 0.3rem">
                <el-checkbox v-model="checked"></el-checkbox>
                <span>一、选择题</span>
              </div>
            </el-col>
            <el-col :span="24" style="height: 1.89rem;width: 100%;border-bottom:0.01rem solid #eee;padding-left: 0.3rem ">
              <div class="grid-content bg-purple-dark">
                <el-checkbox v-model="checked"></el-checkbox>
                <span>1.</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark" style="padding-left: 0.3rem">
                <el-checkbox v-model="checked"></el-checkbox>
                <span>2.</span>
              </div>
            </el-col>
          </el-row>

          <el-row style="border-radius: 0.04rem;width: 100%;height:2.59rem;border: 0.01rem solid #eee;margin-top: 0.2rem">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark" style="height: 0.68rem;width: 100%;background: #eee;line-height: 0.689rem;padding-left: 0.3rem">
                <el-checkbox v-model="checked"></el-checkbox>
                <span>二、判断题</span>
              </div>
            </el-col>
            <el-col :span="24" style="height: 1.89rem;width: 100%;border-bottom:0.01rem solid #eee;padding-left: 0.3rem;margin-bottom: 1.05rem ">
              <div class="grid-content bg-purple-dark">
                <el-checkbox v-model="checked"></el-checkbox>
                <span>3.</span>
              </div>
            </el-col>

          </el-row>
        </el-main>

        <div class="last">
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
              <router-link to='/selected'>
                  <span>已选1题</span>
              </router-link>
            </li>
          </ul>
        </div>

      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "item",
        data() {
            return {
                checked: false,
                activeName: 'first',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''

            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
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
        }

        .middle {
          margin-right: 0.4rem;
          background: #fff;
          padding: 0.3rem 0.3rem 0 0.3rem;
        }

        .last {
          padding: 0.29rem 0 0.4rem 0;
          font-size: 0.18rem;
  
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
        }
      }
    }
  }

</style>

