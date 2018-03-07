<template lang="pug">
.my-forms
  my-forms-item(v-for="form in forms", :key="form.id", :info="form")
  .msg(v-if="!forms.length") 你还没创建过问卷。
  .add(@click="handleAdd") +
</template>

<script>
import MyFormsItem from './my-forms-item'
export default {
  name: 'home-my-forms',
  methods: {
    handleAdd() {
      this.$router.push({ name: 'CreateForm' })
    },
    getForms() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({ name: 'Login' })
      } else {
        this.$http({
          method: 'post',
          url: '/forms',
          data: {
            token
          }
        }).then(res => {
          const data = res.data
          if (data.code === 0) {
            this.forms = data.data.map(i => {
              i.format = JSON.parse(i.format)
              return i
            })
          }
        })
      }
    }
  },
  data() {
    return {
      forms: []
    }
  },
  mounted() {
    this.getForms()
  },
  watch: {
    '$route.fullPath': {
      handler() {
        this.getForms()
      }
    }
  },
  components: {
    MyFormsItem
  }
}
</script>

<style scoped lang="stylus">
.my-forms
  padding 10px
  width calc(100vw - 20px)
  margin-left 10px
  .add
    width 50px
    height 50px
    border-radius 25px
    text-align center 
    line-height 50px
    font-size 30px
    margin 50px auto
    background-color #358ffe
    color #fff
    box-shadow 0 0 10px rgba(0, 0, 0, .18)
</style>


