<template>
    <div>
        <div>
            <van-nav-bar
                    title="我的提问"
                    left-text="返回"
                    right-text="向委员提问"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
                    fixed
                    border
            />
        </div>
        <div style="text-align: left;margin-top: 56px;">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <van-cell-group border v-for="item in list" v-bind:key="item.id">
                    <van-cell
                            :title="item.question|stringLen"
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
</template>

<script>
    export default {
        name: "QuestionsList",
        data() {
            return {
                list: [
                    // {
                    //     id: 'dc970c53-da83-4817-8fb3-a3710c360c09',
                    //     questionTitle: '会员咨询问题的描述内容1',
                    //     questionTimeF: '2019-08-30 10:21:21',
                    //     question: ''
                    // },
                    // {
                    //     id: 'e1ab3a52-393b-421a-acdb-3cb73e23a634',
                    //     questionTitle: '会员咨询问题的描述内容2',
                    //     questionTimeF: '2019-08-30 10:21:21',
                    //     question: ''
                    // }
                ],
                loading: true,
                finished: false,
                pageIndex: 1,
                pageSize: 20,
            };
        },
        created() {
            const that = this;
            /*0是留言板1是提案征集‘’是全部*/
            const qType="";
            /*myQuestionList?questionType=0&pageIndex=1&pageSize=20*/
            this.axios.get(`${that.$API}/myQuestionList?questionType=${qType}&pageIndex=${that.pageIndex}&pageSize=${that.pageSize}`, {})
                .then(function (response) {
                    that.list = response.data.rows;
                    that.loading = false;
                    if (response.data.total < that.pageSize || response.data.total === 0) {
                        that.finished = true;
                    }
                })
                .catch(function (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    that.$toast('获取失败5');

                });
        },
        methods: {
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
                // Toast('返回');
            },
            onClickRight() {
                // Toast('按钮');
                this.$router.push({path: '/memberList'})
            },
            onLoad() {
                // 异步更新数据
                // setTimeout(() => {
                //     for (let i = 0; i < 10; i++) {
                //         this.list.push(this.list.length + 1);
                //     }
                //     // 加载状态结束
                //     this.loading = false;
                //
                //     // 数据全部加载完成
                //     if (this.list.length >= 40) {
                //         this.finished = true;
                //     }
                // }, 500);
            },
            onClickItem(item) {
                this.$router.push({path: '/questionDetails/' + item.id})
            }
        },

        filters: {
            stringLen: function (str) {
                if (str.length >= 15) {
                    return str.substring(0, 15)+'...';
                } else {
                    return str
                }
            },
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .van-nav-bar {
        height: 55px;
        line-height: 55px;
    }

    .van-nav-bar__left, .van-nav-bar__right {
        font-size: 16px;
    }

    .van-nav-bar__title {
        font-size: 18px;
    }

    .van-nav-bar .van-icon {
        color: black;
        vertical-align: middle;
        font-size: 18px;
    }

    .van-doc-nav-bar .van-icon {
        color: #969799;
        font-size: 24px;
        cursor: pointer;
    }

    .van-nav-bar__text {
        color: black;

    }

    .van-cell__title {
        font-size: 18px;


    }

    .van-cell__label {
        font-size: 13px;
    }

    .van-cell__title > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
