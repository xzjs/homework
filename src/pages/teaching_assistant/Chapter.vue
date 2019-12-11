<template>
  <div class="all">
    <!-- 选择章节-->
    <div class="whole">
      <p class="title">选择章节</p>

      <div class="content">
        <img :src="this.$route.params.passImg" alt="" class="left">
        <div class="clear"></div>
        <div class="right">
          <p>
            {{this.$route.params.passText}}

          </p>
        </div>

        <el-row class="switch">
          <router-link to='teach'>
            <el-button type="primary" class="btn">
              切换教辅
            </el-button>
          </router-link>
        </el-row>
        <div class="main">
          <div v-for="(item,index) in list" :key="index">
            <p>{{item.name}}</p>
            <ul>
              <li v-for="(i,n) in item.child" :data-id="i.id" @click="detailsPage(i,i.id)">{{i.name}}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="last">
        <ul class="returnBtn">
          <li class="btn1">
            <router-link to='/addBook'>
              <div>
                <img src="../../assets/img/goBack.png" alt="">
                <span>返回</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Teach",
    data() {
      return {
        // 课本标题
        list: [] // 全部数据
      }
    },
    created() {
      this.obtain();
      console.log(window.localStorage.textImg);
      console.log(window.localStorage.text);

    },
    methods: {
      // 路由传参
      detailsPage(item, index) {
        console.log(11111111111111111);
        if (this.$route.params.id) {
          this.$router.push(
            {
              name: 'Content',
              params: {
                id: Number(index),

                passText: this.$route.params.passText,
                passImg: this.$route.params.passImg,

                upper: this.$route.params.id,

              }
            })
        } else {
          console.log(11111111111111111);
          this.$router.push(
            {
              name: 'Content',
              params: {
                id: Number(index),
                // passText: item.name,
                passText: window.localStorage.text,
                passImg: window.localStorage.textImg,

                upper: window.localStorage.bookid
              }
            });
        }

        window.localStorage.book = Number(index);
        window.localStorage.name = item.name

      },
      // id请求
      obtain() {
        let urlBook = '';
        if (this.$route.params.id) {
          urlBook = '/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Textbook&a=getChapter&id=' + this.$route.params.id;
        } else {
          urlBook = '/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&m=Textbook&a=getChapter&id=' + window.localStorage.bookid;
        }
        this.axios.get(urlBook).then(response => {
          var obj = response.data;
          for (let i in obj) {
            this.list.push(obj[i]); //属性
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  .all {
    .whole {
      background: #f6f6f6;
      padding: 0 0.4rem 0 0.4rem;

      .title {
        font-size: 0.3rem;
        padding: 0.3rem 0 0.3rem 0.7rem;
      }
    }

    .content {
      background: #fff;
      padding: 0.3rem 0 0 0.8rem;

      .left {
        width: 1.2rem;
        height: 1.7rem;
        float: left
      }

      .right {
        font-size: 0.24rem;
        margin: 0.29rem 0 0 1.51rem;
      }

      .switch {
        margin: 0.36rem 0 0 1.51rem;
        width: 1.4rem;
        height: 0.5rem;
      }

      .main {
        p {
          font-size: 0.3rem;
          margin-top: 0.5rem;
        }

        ul {
          li {
            margin-top: 0.34rem;

            .text_one:hover {
              cursor: pointer;
              color: #4b96ff;
              text-decoration: underline
            }

          }

          .text {
            padding-bottom: 0.88rem;
          }
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

</style>
