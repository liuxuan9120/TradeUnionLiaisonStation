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




            <van-tabs v-model="activeName">
                <van-tab  name="a">
                    <div slot="title" >
                        <van-row>
                            <van-col span="8"></van-col>
                            <van-col span="8">全部</van-col>
                            <van-col span="8"><div style="padding: 10px 5px;"><van-tag round type="danger">10</van-tag></div></van-col>
                        </van-row>

                    </div>
                </van-tab>
                <van-tab  name="b" >
                    <div slot="title" >
                        <van-row>
                            <van-col span="8"></van-col>
                            <van-col span="8">以解答</van-col>
                            <van-col span="8"><div style="padding: 10px 5px;"><van-tag round type="danger">10</van-tag></div></van-col>
                        </van-row>

                    </div>
                </van-tab>
                <van-tab  name="c">
                    <div slot="title" >
                        <van-row>
                            <van-col span="8"></van-col>
                            <van-col span="8">未解答</van-col>
                            <van-col span="8"><div style="padding: 10px 5px;"><van-tag round type="danger">10</van-tag></div></van-col>
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

    </div>
</template>

<script>
    export default {
        name: "VipHome",
        data() {
            return {
                activeName: 'a',
                list: [
                    {id: 1, title: '会员咨询问题的描述内容', time: '时间1'},
                    {id: 2, title: '会员咨询问题的描述内容', time: '时间1'}
                ],
                loading: false,
                finished: true,
            };
        },
        methods: {
            onClickRight() {
                // Toast('按钮');
                this.$toast('退出');
            },
            onLoad(){

            },
            onClickItem(item){
                this.$router.push({path: '/advisory/'+item.id})

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
