<template lang="pug">
.my-forms-item
  .title 标题: {{ info.format.title }}
  .time 创建时间: {{ formatTime(info.timeTag) }}
  .btns
    .check(@click.stop="handleCheck") 查看数据
    .enter(@click.stop="handleEnter") 前去分享
</template>

<script>
export default {
  name: 'my-forms-item',

  props: {
    info: {
      type: Object
    }
  },

  methods: {
    handleCheck() {
      this.$router.push({
        name: 'Statistic',
        query: {
          id: this.info._id
        }
      })
    },
    handleEnter() {
      this.$router.push({
        name: 'Question',
        query: {
          id: this.info._id
        }
      })
    },
    formatTime(time) {
      const date = new Date(time)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    },
  }
}
</script>

<style scoped lang="stylus">
.my-forms-item
  margin-bottom 10px
  display flex
  flex-direction column
  border 1px solid #e9e9e9
  height 120px
  padding-left 10px
  justify-content center
  align-items flex-start
  .title
    font-weight bolder
  .time
    color #ccc
    margin-top 5px
    font-size 14px
  .check
    line-height 40px
    font-size 14px
    color #358ffe
    display inline-block
  .enter
    margin-left 15px
    line-height 40px
    font-size 14px
    color #ff492b
    display inline-block
</style>


