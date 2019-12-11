<template>
  <!--首页-->
  <div class="con" @click="toDetail" >
    <div v-for="(item,index) in content" :key="index" class="list"
    @click="onToAss(index)">
      <div class="image">
        <img :src="item.img" alt="">
      </div>
      <div class="title">
      {{item.title}}
      </div>
      <div class="content">
      {{item.content}}

      </div>

      </div>
    </div>
</template>


<script>

  export default {
    name: "vBook",
    props: ['content'],
  /*  created(){
      console.log(this.content)
    },*/
    data() {
      return {}
    },
    methods: {
      toDetail: function () {
        this.$router.push({path: this.link})
      },
      onToAss(index) {
        console.log(index)
        switch(index){
          case 0:

            this.$router.push('/Daily')
            return
          case 1:

            this.$router.push('/Teach')
            return
          case 2:

            this.$router.push('/Item')
            return
          case 3:

            this.$router.push('/Error')
            return
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .con {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .list {
      width:3.03rem;
      height: 3.9rem;
      background: #fff;
      margin-right: 0.5rem;
      border: 0.01rem solid #d9dbe7;
      border-radius: 0.07rem;
      cursor: pointer;
      .image {
        width: 1.03rem;
        height: 1.03rem;
        /*border:0.01rem solid salmon;*/

        margin: 0.5rem 0 0.62rem 0.31rem;
        img{
          width: 100%;
          height: 100%;

        }
      }
      .title {
        font-size: 0.24rem;
        margin: 0 0 0 0.33rem;
      }
      .content {
        width: 2.3rem;
        font-size: 0.18rem;
        margin: 0.29rem 0 0 0.29rem;
      }
    }
  }

</style>
