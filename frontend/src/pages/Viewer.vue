<template lang="pug">
.view
  .back(@click="handleBack", v-if="showBack") 返回
  .back(@click="$router.push('/')", v-else) 制作
  h1.title {{ answer.title }}
  .line(v-for="(key, index) in answer.keys", :key="key.id")
    .label {{index + 1}}.{{ key.name }}
    .input {{key.value}}
</template>

<script>
export default {
  name: 'viewer',
  mounted() {
    const token = localStorage.getItem('token')
    if (token) this.showBack = true
    this.getDetail()
  },
  data() {
    return {
      showBack: false,
      answer: {
        title: ''
      }
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    getDetail() {
      const id = this.$route.query.id
      if (!id) this.$router.go(-1)
      this.fid = id

      this.$http({
        method: 'post',
        url: '/forms/answer/detail',
        data: {
          aid: id
        }
      }).then(res => {
        const data = res.data
        if (data.code === 0) {
          this.answer = JSON.parse(data.data.answer)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.view
  padding 0 20px
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
  .submit
    width 100px
    height 40px
    background-color #358ffe
    margin 10px auto
    color #fff
    line-height 40px
    font-weight bolder
  .line
    margin-top 15px
    .label
      word-break break-all
      width 100%
      line-height 28px
      text-overflow wrap
      text-align left
      font-weight bolder
      border-bottom 1px solid #e9e9e9
    .input
      margin-top 10px
      width 100%
      height 100px
      border 1px solid #e9e9e9
      text-align left 
      padding 5px
</style>
