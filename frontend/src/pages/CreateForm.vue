<template lang="pug">
.create-form
  .save(@click="handleSave") 保存
  .back(@click="handleBack") 返回
  .line
    .label 问卷标题:
    input.input(placeholder="标题是必填的...", v-model="title")
  .line(v-for="(key, index) in keys", :key="key.id")
    .label 问题{{index + 1}}:
    input.input(:placeholder="`输入问题${index + 1}`", v-model="keys[index].name")
    .btn(@click="handleDelKey(index)", v-show="index > 0") del
  .add-key(@click="handleAddKey") 添加问题
  .footer
</template>

<script>
export default {
  name: 'create-form',
  methods: {
    handleDelKey(index) {
      this.keys.splice(index, 1)
    },
    handleAddKey() {
      const template = {
        name: '',
      }
      this.keys.push(template)
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleSave() {
      if (!this.title) return
      let length = this.keys.filter(i => !!i.name).length
      if (length < this.keys.length) return
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({ name: 'Login' })
        return
      }

      this.$http({
        method: 'post',
        url: '/forms/create',
        data: {
          token,
          format: JSON.stringify({
            title: this.title,
            keys: this.keys
          })
        }
      }).then(res => {
        const data = res.data
        if (data.code === 0) {
          this.handleBack()
        }
      })
    }
  },
  data() {
    return {
      title: '',
      keys: [
        {
          name: ''
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
.create-form
  padding 50px 20px 0
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
  .line
    margin-top 15px
    display flex
    justify-content flex-start
    align-items center
    .label
      width 30%
      text-align left
      font-weight bolder
    .input
      width 55%
    .btn
      width 15%
      background-color #ff492b
      height 30px
      line-height 30px
      color #fff
      font-weight bolder
  .add-key
    width 40%
    text-align center
    line-height 40px
    height 40px
    background-color #358ffe
    font-weight bolder 
    color #fff
    margin 30px auto 0
  .footer
    height 100px
</style>


