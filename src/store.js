import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
        memberList: []
    },
    getters: {
        memberList: state => {return state.memberList},
        getMemberById(state,id){
            for (let member of state.memberList) {
                if(member.id===id){
                    return member;
                }
            }
        }
    },
    mutations: {
        getCommitteeList(state, payload) {
            state.memberList = payload
        }
    },
    actions: {
        getList(context,response){
            context.commit('getCommitteeList', response)
        }
    }
})
