<template lang="pug">
.login-page
  img(src="../assets/logo.png")
  .login 问卷收集助手@Minus.live
  input.username.input(
    placeholder="用户名", 
    type="text", 
    @keyup.enter="finishUsername",
    v-model="username"
  )
  input.password.input(
    placeholder="密码", 
    type="password", 
    ref="psd", 
    @keyup.enter="handleSubmit",
    v-model="password"
  )
  .btn(@click="handleSubmit") 登录
  .blank(style="height: 100px")
  .msg 无需注册，首次登陆自动注册
</template>

<script>
export default {
  name: 'login-page',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const username = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      if (username && token) {
        this.$router.push({ name: 'Home' })
      }
    },
    finishUsername(e) {
      if (this.username) this.$refs.psd.focus()
    },
    handleSubmit() {
      if (this.username && this.password) {
        // login or regist
        this.$http({
          method: 'post',
          url: '/login',
          data: {
            username: this.username,
            password: this.password,
          }
        }).then(res => {
          const data = res.data
          if (data.code === 0) {
            const token = data.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('user', this.username)
            this.$router.push({ name: 'Home' })
          } else {
            alert('密码错误！也可能用户名被抢先注册了！')
          }
        })
      } else {
        alert('用户名密码是必填项~')
      }
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped lang="stylus">
.login-page
  .login
    margin-bottom 60px
  .input
    width 55%
    height 40px
    border 0
    border-bottom 1px solid #e9e9e9
    outline none
    border-radius 0
  .btn
    width 55%
    height 40px
    line-height 40px
    margin 10px auto
    border 1px solid #e9e9e9
  .msg
    font-size 12px
    line-height 18px
    color #999
</style>
