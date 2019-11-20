<template>
    <div>
        <van-nav-bar
                title="政协届别委员联络站"
                right-text="退出"
                @click-right="onClickRight"
                fixed
                border
        >
        </van-nav-bar>
        <div style="margin-top: 56px;">


            <van-tabs v-model="activeName" @click="onClick">
                <van-tab name="0">
                    <div slot="title">
                        <van-row>
                            <van-col span="8"></van-col>
                            <van-col span="8">全部</van-col>
                            <van-col span="8">
                                <div style="padding: 10px 5px;" v-show="isShowAll">
                                    <van-tag round type="danger">{{replyInfo.allReply}}</van-tag>
                                </div>
                            </van-col>
                        </van-row>

                    </div>
                </van-tab>
                <van-tab name="1">
                    <div slot="title">
                        <van-row>
                            <van-col span="8"></van-col>
                            <van-col span="8">已解答</van-col>
                            <van-col span="8">
                                <div style="padding: 10px 5px;" v-show="isShowRe">
                                    <van-tag round type="danger">{{replyInfo.reReply}}</van-tag>
                                </div>
                            </van-col>
                        </van-row>

                    </div>
                </van-tab>
                <van-tab name="2">
                    <div slot="title">
                        <van-row>
                            <van-col span="8"></van-col>
                            <van-col span="8">未解答</van-col>
                            <van-col span="8">
                                <div style="padding: 10px 5px;" v-show="isShowNot">
                                    <van-tag round type="danger">{{replyInfo.notReply}}</van-tag>
                                </div>
                            </van-col>
                        </van-row>

                    </div>
                </van-tab>
            </van-tabs>
            <!--            <van-tabbar v-model="active">-->
            <!--                <van-tabbar-item  dot>标签</van-tabbar-item>-->
            <!--                <van-tabbar-item  info="5">标签</van-tabbar-item>-->
            <!--                <van-tabbar-item  info="20">标签</van-tabbar-item>-->
            <!--            </van-tabbar>-->
            <!--                        <div style="position: relative;z-index: 1;top:-35px;text-align: right;">-->
            <!--                            <van-row style="height: 0;">-->
            <!--                                <van-col span="8">-->
            <!--                                    <div style="width: 90%;">-->
            <!--                                        <van-tag round type="danger">10</van-tag>-->
            <!--                                    </div>-->
            <!--                                </van-col>-->
            <!--                                <van-col span="8">-->
            <!--                                    <div style="width: 90%;">-->
            <!--                                        <van-tag round type="danger">10</van-tag>-->
            <!--                                    </div>-->
            <!--                                </van-col>-->
            <!--                                <van-col span="8">-->
            <!--                                    <div style="width: 90%;">-->
            <!--                                        <van-tag round type="danger">10</van-tag>-->
            <!--                                    </div>-->
            <!--                                </van-col>-->
            <!--                            </van-row>-->
            <!--                        </div>-->
            <div style="text-align: left;">


                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <van-cell-group border v-for="item in getQuestionList" v-bind:key="item.id">
                        <van-cell

                                :title="item.question"
                                is-link
                                :label="item.questionTimeF"
                                @click="onClickItem(item)"
                                border
                        >

                        </van-cell>
                    </van-cell-group>

                </van-list>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "VipHome",
        data() {
            return {
                activeName: '0',
                list: [],
                loading: false,
                finished: false,
                pageIndex: 1,
                pageSize: 20,
                isShowAll: false,
                isShowRe: false,
                isShowNot: false,
                replyInfo: {
                    allReply: 0,
                    reReply: 0,
                    notReply: 0
                },
                currentName: null
            };
        },
        created() {
            this.getQuestionCount();
            this.getList(this.activeName);

        },
        methods: {
            onClickRight() {
                this.$toast('退出');
                this.$router.push({path: '/vipindex'});
            },
            onLoad() {
                // this.pageIndex = this.$store.getters.questionList.length + 1;
                this.loading = true;
                if(this.currentName){
                    this.addList(this.currentName)
                }
            },
            onClickItem(item) {
                this.$store.dispatch('selectQuestionInfo', item);
                this.$router.push({path: '/advisory/' + item.id})

            },
            initialization(){
                this.list = [];
                this.pageIndex = 1;
                this.loading = true;//下拉加载中
                this.finished = false;//下拉结束
            },
            onClick(name,) {
                this.initialization();
                this.currentName = name;
                this.getList(name);
            },
            getQuestionCount() {
                /*http://58.54.251.155:8088/wzzgh-fwdt/committeeImp/getCommitteeQuestionCount?committeeId=*/
                const that = this;
                const id = that.$store.getters.curId;
                this.axios.get(`${that.$API}/getCommitteeQuestionCount?committeeId=${id}`, {})
                    .then(function (response) {
                        that.replyInfo = response.data.data;
                        // that.isShowAll = that.replyInfo.allReply > 0;
                        that.isShowRe = that.replyInfo.reReply > 0;
                        that.isShowNot = that.replyInfo.notReply > 0;
                    })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        // that.$toast(error);
                    });
            },
            getList(status) {
                /*http://58.54.251.155:8088/wzzgh-fwdt/committeeImp/getCommitteeQuestionList?
          committeeId=308e1f73-3b9d-424d-9aa9-ca35350f5208&status=1&pageIndex=1&pageSize=20*/
                const that = this;
                const id = that.$store.getters.curId;
                this.axios.get(`${that.$API}/getCommitteeQuestionList?committeeId=${id}&status=${status}&pageIndex=${that.pageIndex}&pageSize=${that.pageSize}`, {})
                    .then(function (response) {
                        that.pageIndex++;
                        that.$store.dispatch('questionList', response.data.data.content);
                        that.loading = false;
                        if (response.data.data.content.length < that.pageSize||response.data.data.content.length ===0) {
                            that.finished = true;
                        }

                    })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        that.$toast('获取失败10');
                    });
            },
            addList(status) {
                /*http://58.54.251.155:8088/wzzgh-fwdt/committeeImp/getCommitteeQuestionList?
          committeeId=308e1f73-3b9d-424d-9aa9-ca35350f5208&status=1&pageIndex=1&pageSize=20*/
                const that = this;
                const id = that.$store.getters.curId;
                this.axios.get(`${that.$API}/getCommitteeQuestionList?committeeId=${id}&status=${status}&pageIndex=${that.pageIndex}&pageSize=${that.pageSize}`, {})
                    .then(function (response) {
                        const list = that.$store.getters.questionList;
                        that.$store.dispatch('questionList', list.push(...response.data.data.content));
                        that.loading = false;
                        if (response.data.data.content.length < that.pageSize) {
                            that.finished = true;
                        }
                    })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        that.$toast('获取失败0');
                    });
            }
        },
        computed: {
            getQuestionList() {
                // eslint-disable-next-line no-console
                console.log(this.$store.getters.questionList);
                return this.$store.getters.questionList;
            }
        }
    }

</script>

<style scoped>
    .van-nav-bar {
        height: 55px;
        line-height: 55px;
    }

    .van-nav-bar__left, .van-nav-bar__right {
        font-size: 14px;
    }

    .van-nav-bar__title {
        font-size: 18px;
    }

    .van-nav-bar__text {
        color: black;

    }
</style>
