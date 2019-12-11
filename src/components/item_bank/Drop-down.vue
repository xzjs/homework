<template>
  <div class="frame">
    <!--    学段-->
    <el-select v-model="value" :disabled=!prohibit placeholder="学段" @change="trigger">
      <el-option
        v-for="item in stage"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <!--    年级-->
    <el-select v-model="value1" :disabled=subprohibit placeholder="年级" @change="subTrigger">
      <el-option
        v-for="item in learning"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <!--    科目-->
    <el-select v-model="value2" :disabled=leaprohibit placeholder="科目" @change="bookTrigger">
      <el-option
        v-for="item in subsection"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <!--    版本-->
    <el-select v-model="value3" :disabled=bookprohibit placeholder="版本">
      <el-option
        v-for="item in bookVersion"
        :key="item.Id"
        :label="item.Name"
        :value="item.Id">
      
      </el-option>
    </el-select>
  </div>
</template>

<script>
    export default {
        name: "Frame",
        data() {
            return {
                value: '',
                value1: '',
                value2: '',
                value3: '',
                prohibit: true, // 学段是否禁用
                subprohibit: true, // 年级
                leaprohibit: true, // 科目
                bookprohibit: true, // 版本
                // 学段
                stage: [
                    {
                        id: '1',
                        name: "小学"
                    }, {
                        id: '2',
                        name: "中学"
                    }, {
                        id: '3',
                        name: "高学"
                    },
                ],
                subsection: [], // 科目
                learning: [], // 年级
                bookVersion: [], // 书的版本


            }
        },
        created() {
            this.subject();
            this.section();
        },
        methods: {
           

            // 激活年级框
            trigger() {
                this.subprohibit = false
            },
            // 激活科目框
            subTrigger() {
                this.leaprohibit = false
            },
            // 激活版本框
            bookTrigger() {
                this.bookprohibit = false;
                this.edition();
            },
            // 科目
            subject() {
                this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&&m=Basic&a=getSubject').then(response => {
                    var obj = response.data;
                    for (let i in obj) {
                        this.subsection.push(obj[i]); //属性
                    }
                })
            },
            // 年级
            section() {
                this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&&m=Basic&a=getGrade').then(response => {
                    var obj = response.data;
                    for (let i in obj) {
                        this.learning.push(obj[i]); //属性
                    }
                })
            },
            // 版本
            edition() {
                let grade = this.value1;
                // console.log(gradeId);
                let subject = this.value2;
                // console.log(subjectId);
                let pharse = this.value;
                // console.log(pharseId)
                //    111&subjectId=1&pharseId=1
                this.axios.get('/index.php?s=App&uid=644&token=513be51f05f85c2e3fc708be5431216d&&m=Basic&a=getEdition&gradeId=' + grade + '&subjectId=' + subject + '&pharseId=' + pharse).then(response => {
                    var obj = response.data;
                    for (let i in obj) {
                        this.bookVersion.push(obj[i]); //属性
                    }
                    console.log(this.bookVersion);
                })
            }
        }
    }
</script>

<style scoped lang="less">
  .frame {
    .el-select {
      margin-bottom: 0.3rem;
    }
  }

</style>
