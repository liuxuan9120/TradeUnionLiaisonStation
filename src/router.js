import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import HomePage from './page/HomePage'
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
import VipIndex from './page/vipIndex'
import ChangeAnswer from './page/changeAnswer'
import config from './config'
import axios from 'axios'

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'MemberList',
        component: MemberList,
    },
    {
        path: '/memberList',
        name: 'MemberList',
        component: MemberList
    },
    {
        path: '/messageBoard/:id',
        name: 'MessageBoard',
        component: MessageBoard
    },
    {
        path: '/proposals/:id',
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
        path: '/addQuestion/:id/:title',
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
        path: '/memberAnswer/:id',
        name: 'MemberAnswer',
        component: MemberAnswer

    },
    {
        path: '/changeAnswer/:id',
        name: 'ChangeAnswer',
        component: ChangeAnswer

    },

    {
        path: '/vipIndex',
        name: 'VipIndex',
        component: VipIndex
    },
    {
        path: '*',
        name: '404',
        component: Error,
        hidden: true
    }

];
const router = new Router({
    // mode: 'history',
    base: __dirname,
    routes: routes// (缩写) 相当于 routes: routes
});


export async function getFaceResult() {
    try {
        let hasLogin = await this.hasLogin();
        if (hasLogin) {
            //如果用户信息存在则往下执行。
        } else {
            //如果用户token不存在则跳转到login页面
            window.location.href = config.loginUrl;
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
}

// 全局路由守卫
if(!config.test){
    router.beforeEach(async (to, from, next) => {
        const name = to.name.toLowerCase();
        const nextRoute = ['vipindex', 'viphome', 'advisory', 'changeanswer', 'memberanswer'];
        if (nextRoute.indexOf(name) >= 0) {
            next();
        } else {
            try {
                const isLogin = await axios.get('/regUser/hasLogin', {});
                // eslint-disable-next-line no-console
                console.log("result", isLogin.data.result);
                if (isLogin.data.result) {
                    next()
                } else {
                    window.location.href = config.loginUrl;
                }
            } catch (e) {
                window.location.href = config.loginUrl;
                // eslint-disable-next-line no-console
                console.log(e)

            }
        }


    });
}


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

// export default new Router({
//   // mode: 'history',
//   base: __dirname,
//   routes: routes// (缩写) 相当于 routes: routes
// });
export default router;

/*

const that = this;
this.axios.get(`${config.api}/regUser/hasLogin`, {})
    .then(function (response) {
        console.log("response",response)
    })
    .catch(function (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        that.$toast(error);

    });
*/
