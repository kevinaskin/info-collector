<template lang="pug">
.statistic
  .back(@click="handleBack") 返回
  h1 统计数据
  .msg 目前共有{{answers.length}}个人填写了问卷 
    a(style="color:#358ffe", @click="handleBuild")  点击下载

  .answer(v-for="(answer, index) in answers", :key="answer.id")
    span.time {{index + 1}}. {{ formatTime(answer.timeTag) }}
    span.check(@click="handleCheck(answer)") 查看
</template>

<script>
export default {
  name: 'statistic',
  mounted() {
    this.getStatistic()
  },
  data() {
    return {
      answers: []
    }
  },
  methods: {
    handleBack() {
      console.log(1)
      this.$router.go(-1)
    },
    handleBuild() {
      let url = 'http://q.api.kevinaskin.cn/download?fid=' + this.fid
      window.location.href = url
    },
    formatTime(time) {
      let fix = num => {
        let _str = num.toString()
        return _str.length < 2 ? '0' + _str : _str
      }
      const date = new Date(time)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${fix(date.getMinutes())}`
    },
    handleCheck(answer) {
      this.$router.push({
        name: 'Viewer',
        query: {
          id: answer._id
        }
      })
    },
    getStatistic() {
      const fid = this.$route.query.id
      if (!fid) {
        this.$router.go(-1)
        return
      }
      this.fid = fid

      this.$http({
        method: 'post',
        url: '/forms/statistic',
        data: {
          fid
        }
      }).then(res => {
        console.log(res)
        const data = res.data
        if (data.code === 0) {
          this.answers = data.data.answers
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.statistic
  padding 0 20px
  .save
    position fixed
    bottom -20px
    right -60px
    width 150px
    height 80px
    background-color #e9e9e9
    transform rotate(-45deg)
    text-align center
    line-height 40px
    font-size 24px
    font-weight bolder
  .back
    position fixed
    top -20px
    left -60px
    width 150px
    height 80px
    background-color #e9e9e9
    transform rotate(315deg)
    text-align center
    line-height 120px
    font-size 24px
    font-weight bolder
  .msg
    margin-bottom 20px
  .answer
    border 1px solid #e9e9e9
    padding 10px
    margin-bottom 10px
    display flex
    justify-content space-between
    .check
      color #358ffe
</style>


