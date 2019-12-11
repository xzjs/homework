<template>
  <!--设置答题卡-->
  <div class="content">
    <el-row>
      <el-col>
        <v-book
          :content="content"
        ></v-book>
      </el-col>

      <router-link to="/Record">
        <div class="home_record">

          <img src="../../assets/img/home_record.png" alt="">
          <p style="font-size: 0.2rem;color: #2b3642;text-align: center;margin-top: 0.12rem">作业记录</p>
        </div>
      </router-link>

    </el-row>


  </div>
</template>


<script>
    import vBook from '../../components/tabs/vBook';
    export default {
        name: "Tab",
        data() {
            return {
              content:[{
                  title: '日常作业',
                  content: '客观题、填空题智能批改，重新定义在线作业',
                  link: '/daily',
                  img: require('../../assets/img/home_daily.png')
                },{
                  title: '教辅（校本）作业',
                  content: '实际教学配套',
                  link: '/teach',
                  img: require('../../assets/img/home_teach.png')
              },{
                  title: '题库出题',
                  content: '海量试题随便挑、真题巩固知识点',
                  link: '/item',
                  img: require('../../assets/img/home_item.png')
              },{
                title: '错题本出题',
                content: '复习做错题目、加深试题理解',
                link: '/error',
                img:require( '../../assets/img/home_error .png')
              }]
            }
        },
        methods: {},
        components: {vBook}
    }
</script>

<style scoped lang="less">
  html,body,.content{
    width: 100%;
    height: 100%;
    background: url("../../assets/img/home_background.png") no-repeat;
    background-size:100% 100%;
    position:absolute;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='bg-login.png',sizingMethod='scale');
  }
  .content {
    .el-row{
      width: 100%;
      height: 100%;
      display:flex;
      align-items: center;
      justify-content: center;

        .home_record {
          position: fixed;
          right: 1.2rem;
          bottom: 0.89rem;
          


    }
    }

  }
</style>
