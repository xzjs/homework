<template>
  <div class="imgs" @click="toDetail">
    <router-link to='/AddBook'>
      <div class="add">
        <div class="addImg">
          <img src="../../assets/img/addTo.png" alt="">
        </div>
        <p>添加课本</p>
      </div>
    </router-link>
    <div v-for="(m,index) in imgList"
         :key="index" @click="teachList(index)" class="every">
      <input type="checkbox" class="frame" v-if="hide">
      <img :src="m.imgurl" alt="">
      <div class="words">
        <p class="first">{{m.textbook}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tImg",
        props: ['imgList'],
        created() {

            // console.log(this.imgList.index.id);
            // console.log(this.imgList.textbook);
        },
        data() {
            return {
                hide:false
            }
        },
        methods: {
            toDetail: function () {
                this.$router.push({path: this.link})
            },
            teachList(index) {
                console.log(index)
                /*  switch (index) {
                      case 0:
  
                          this.$router.push('/chapter')
                          return
                      case 1:
  
                          this.$router.push('/chapter')
                          return
                      case 2:
  
                          this.$router.push('/chapter')
                          return
                      case 3:
  
                          this.$router.push('/chapter')
                          return
                  }*/
            }
        }
    }
</script>

<style scoped lang="less">
  .imgs {
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
        position: relative;
        top: 0.5rem;
        left: -2.6rem;
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
    
    .add {
      display: inline-block;
      position: relative;
      width: 2.02rem;
      height: 2.83rem;
      float: left;
      margin: 0.6rem 0.43rem 0 0.44rem;
      background-color: #f8f9f9;
      border-radius: 0.05rem;
      text-align: center;
      padding: 0.78rem 0.56rem 0 0.57rem;
      box-sizing: border-box;
      cursor: pointer;
      
      .addImg {
        width: 0.88rem;
        height: 0.88rem;
        
        background: #e8e8e8;
        border-radius: 0.44rem;
        border: none;
        display: flex;
        align-items: center; /*垂直居中*/
        justify-content: center; /*水平居中*/
        
        img {
          width: 0.41rem;
          height: 0.41rem;
          
          
        }
      }
      
      p {
        height: 0.22rem;
        font-family: MicrosoftYaHei;
        font-size: 0.22rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.38rem;
        letter-spacing: 0;
        color: #2b3642;
        margin-top: 0.19rem;
      }
    }
  }

</style>
