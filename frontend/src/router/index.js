import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import CreateForm from '@/pages/CreateForm'
import Question from '@/pages/Question'
import Statistic from '@/pages/Statistic'
import Viewer from '@/pages/Viewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/create-form',
      name: 'CreateForm',
      component: CreateForm
    },
    {
      path: '/question',
      name: 'Question',
      component: Question
    },
    {
      path: '/statistic',
      name: 'Statistic',
      component: Statistic
    },
    {
      path: '/viewer',
      name: 'Viewer',
      component: Viewer
    },
  ]
})
