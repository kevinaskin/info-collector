<template lang="pug">
.home-page
  .back(@click="handleBack") 登出
  h2 hello, {{ username }}
  .home-tab
    .home-tab-item(
      v-for="(item, index) in items",
      :key="item.id",
      :class="{'active': itemIndex === index}",
      @click="changeTab(index)"
    ) {{item.name}}
  .home-content
    my-forms(v-show="itemIndex === 0")
    .more(v-show="itemIndex === 1") 目前啥都没有...
</template>

<script>
import MyForms from '../components/home/my-forms'
export default {
  name: 'home-page',
  mounted() {
    this.checkToken()
  },
  data() {
    return {
      items: [
        { name: '我的问卷' },
        { name: '更多' },
      ],
      itemIndex: 0,
      username: ''
    }
  },
  methods: {
    checkToken() {
      const token = localStorage.getItem('token')
      if (!token) this.$router.push({ name: 'Login' })
      const username = localStorage.getItem('user')
      this.username = username
    },
    handleBack() {
      localStorage.setItem('token', '')
      localStorage.setItem('user', '')
      this.$router.push({ name: 'Login' })
    },
    changeTab(index) {
      this.itemIndex = index
    }
  },
  components: {
    MyForms
  }
}
</script>

<style scoped lang="stylus">
.home-page
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
  .home-tab
    display flex
    justify-content space-around
    .home-tab-item
      width 20vw
      text-align center
      border-bottom 1px solid #e9e9e9
      line-height 30px
      color #ccc
      &.active
        color #000
  .home-content
    margin-top 10px
    .more
      margin-top 20px
</style>
