import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'

Vue.use(Vuex);

/*const moduleA = {
    state: {
        memberList: []
    },
    getters: {
        memberList: state => state.memberList
    },
    mutations: {
        startedDataReceived(state, payload) {
            state.memberList = payload
        }
    },
    actions: {
        Vue.axios.post('/getCommitteeList', {
            pageIndex: '1',
            pageSize: '20'
        }).then(function (response) {
            console.log(response);
            context.commit('startedDataReceived', response.data.data)
        })
            .catch(function (error) {
                console.log(error);
            })
}
}

const moduleB = {
    state: {...},
    mutations: {...},
    actions: {...}
}

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
})
export default store;*/
export default new Vuex.Store({
    state: {
        /*会员ID*/
        /**/
        /*当前问题ID*/
        /*委员ID*/
        curId: null,

        memberId: null,
        /*当前问题信息*/
        selectQuestionInfo: null,
        /*委员列表*/
        committeeList: [],
        /*问题列表*/
        questionList: [],
        /*推荐案例列表*/
        recommendList: [],
        /*我的问题详情*/
        myQuestionDetail: null
    },
    getters: {

        curId: state => {
            return state.curId
        },
        memberId: state => {
            return state.memberId
        },

        committeeList: state => {
            return state.committeeList
        },
        recommendList: state => {
            return state.recommendList
        },
        questionList: state => {
            return state.questionList
        },
        selectQuestionInfo: state => {
            return state.selectQuestionInfo
        },
        myQuestionDetail: state => {
            return state.myQuestionDetail
        },

    },
    actions: {
        getCurId(context, response) {
            context.commit('getUserId', response)
        },
        getMemberInfoId(context, response) {
            context.commit('getMemberId', response)
        },
        getCommitteeById: (state) => (id) => {
            return state.committeeList.find(committee => committee.id === id)
        },
        getCommitteeList(context, info) {

            context.commit('stateCommitteeList', info);
            // const that = this;
            // Vue.axios.get(`${config.api}/getCommitteeList?pageIndex=${info.pageIndex}&pageSize=${info.pageSize}`, {})
            //     .then(function (response) {
            //         const list = response.data.data.content;
            //         for (const item of list) {
            //             item.phone = config.imgUrl + item.phone;
            //         }
            //         context.commit('stateCommitteeList', [...list,...list,...list,...list,...list]);
            //     })
            //     .catch(function (error) {
            //         // eslint-disable-next-line no-console
            //         console.log(error);
            //         that.$toast(error);
            //     });

        },
        addCommitteeList(context, info){
            // const that = this;
            // const list =[];
            context.commit('stateCommitteeList', [...context.committeeList,...info]);
        },
        getRecommendList(context, ID) {
            const that = this;
            Vue.axios.get(`/recommendList?committeeMemberId=${ID}`, {})
                .then(function (response) {
                    context.commit('stateRecommendList', response.data.data);
                })
                .catch(function (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    that.$toast('获取失败1');
                });
        },
        questionList(context, response) {
            context.commit('getQuestionList', response)
        },

        selectQuestionInfo(context, response) {
            context.commit('getQuestionInfo', response)
        },
        queryMyQuestionDetail(context, info) {
            const that = this;
            Vue.axios.get(`${config.api}/myQuestionDetail?id=${info}`,
                {})
                .then(function (response) {
                    context.commit('getMyQuestionDetail', response.data.data);
                })
                .catch(function (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    that.$toast('获取问题详情失败');
                });
        }
    },
    mutations: {
        getUserId(state, id) {
            state.curId = id;
        },
        getMemberId(state, id) {
            state.memberId = id;
        },
        stateCommitteeList(state, payload) {
            state.committeeList = payload
        },
        stateRecommendList(state, payload) {
            state.recommendList = payload
        },
        getQuestionList(state, list) {
            state.questionList = list
        },
        getQuestionInfo(state, info) {
            state.selectQuestionInfo = info
        },
        getMyQuestionDetail(state, info) {
            state.myQuestionDetail = info
        },
    }

})
