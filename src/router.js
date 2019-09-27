import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import HomePage from './page/HomePage'
import MemberList from './page/MemberList'
import MessageBoard from './page/MessageBoard'
import Proposals from './page/Proposals'
import CaseDetails from './page/CaseDetails'
import QuestionsList from './page/QuestionsList'
import QuestionDetails from './page/QuestionDetails'
import AddQuestion from './page/AddQuestion'
import VipHome from './page/VipHome'
import Advisory from './page/Advisory'
import MemberAnswer from './page/MemberAnswer'


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/memberList',
    name: 'MemberList',
    component: MemberList
  },
  {
    path: '/messageBoard',
    name: 'MessageBoard',
    component: MessageBoard
  },
  {
    path: '/proposals',
    name: 'Proposals',
    component: Proposals
  },
  {
    path: '/caseDetails/:id',
    name: 'CaseDetails',
    component: CaseDetails
  },
  {
    path: '/questionsList',
    name: 'QuestionsList',
    component: QuestionsList
  },
  {
    path: '/questionDetails/:id',
    name: 'QuestionDetails',
    component: QuestionDetails
  },
  {
    path: '/addQuestion',
    name: 'AddQuestion',
    component: AddQuestion
  },
  {
    path: '/vipHome',
    name: 'VipHome',
    component: VipHome
  },
  {
    path: '/advisory/:id',
    name: 'Advisory',
    component: Advisory
  },
  {
    path: '/memberAnswer',
    name: 'MemberAnswer',
    component: MemberAnswer

  }

]
/*export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/memberList',
      name: 'MemberList',
      component: MemberList
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/!* webpackChunkName: "about" *!/ './views/About.vue')
    }
  ]
})*/
export default new Router({
  mode: 'history',
  base: __dirname,
  routes: routes// (缩写) 相当于 routes: routes
});
