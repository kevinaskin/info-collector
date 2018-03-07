<template lang="pug">
.question
  .back(@click="handleBack", v-if="showBack") 返回
  .back(@click="$router.push('/')", v-else) 制作
  h1.title {{ format.title }}
  .line(v-for="(key, index) in format.keys", :key="key.id")
    .label {{index + 1}}.{{ key.name }}
    textarea.input(placeholder="请输入你的答案", v-model="key.value")

  .url
    #qrcode
    br
    p(style="color: #aaa;margin-top: 10px;text-align:center") 长按保存，分享二维码
  .submit(@click="handleSubmit") 提交
</template>

<script>
export default {
  name: 'question',
  mounted() {
    this.url = window.location.href
    this.qrcode = new QRCode(document.getElementById("qrcode"), {
      width : 100,
      height : 100
    })
    this.qrcode.makeCode(window.location.href)
    const token = localStorage.getItem('token')
    if (token) this.showBack = true
    this.getDetail()
  },
  data() {
    return {
      url: '',
      showBack: false,
      format: {
        title: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      let length = this.format.keys.filter(i => i.value).length
      if (length < this.format.keys.length) {
        alert('请填写完整')
        return
      }
      this.$http({
        method: 'post',
        url: '/forms/answer',
        data: {
          fid: this.fid,
          answer: JSON.stringify(this.format)
        }
      }).then(res => {
        const data = res.data
        if (data.code === 0) {
          alert('保存成功')
          this.$router.push({
            name: 'Home'
          })
        }
      })
    },
    handleBack() {
      this.$router.go(-1)
    },
    getDetail() {
      const id = this.$route.query.id
      if (!id) this.$router.go(-1)
      this.fid = id

      this.$http({
        method: 'post',
        url: '/forms',
        data: {
          id
        }
      }).then(res => {
        const data = res.data
        if (data.code === 0) {
          this.format = JSON.parse(data.data.format)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.question
  padding 0 20px
  .url
    font-size 12px
    text-align left 
    width 100%
    margin 30px 0
    #qrcode
      margin 0 auto
      width 100px
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
      resize none
      height 100px
      border 1px solid #e9e9e9
</style>
