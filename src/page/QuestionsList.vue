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

                            :title="item.title"
                            is-link
                            :label="item.time"
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
                    {id: 1, title: '会员咨询问题的描述内容', time: '时间1'},
                    {id: 2, title: '会员咨询问题的描述内容', time: '时间1'}
                ],
                loading: false,
                finished: true,
            };
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
                this.$router.push({path: '/messageBoard'})
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
        }
    }
</script>

<style scoped>
    .van-nav-bar{
        height: 55px;
        line-height: 55px;
    }
    .van-nav-bar__left, .van-nav-bar__right{
        font-size: 16px;
    }
    .van-nav-bar__title{
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
    .van-nav-bar__text{
        color: black;

    }
    .van-cell__title{
       font-size: 18px;
    }
    .van-cell__label{
        font-size: 13px;
    }
</style>
