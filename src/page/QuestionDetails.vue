<template>
    <div>
        <div style="position: fixed;top:0;width: 100%;">
            <van-nav-bar
                    title="我的问题"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                    fixed
                    border
            />
        </div>
        <div style="margin-top: 56px;">


        <div style="position: fixed;top:60px;bottom: 60px;width: 100%;background-color: #f1f1f1;">
            <div style="background-color: white;">
                <van-row>
                    <van-col span="6">
                        <van-image
                                width="60"
                                height="80"
                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                        />
                    </van-col>
                    <van-col span="18">
                        <div class="item-body">
                            <div style="text-align: left;font-size: 14px;padding: 5px 0 5px 0;">
                                <span>{{item.name}}</span><span>{{item.position}}</span>
                            </div>

                            <div :class="{'item-content-display-all': isShow, 'item-content': !isShow}"
                                 @click="showToggle()">
                                {{item.body}}
                            </div>


                        </div>
                    </van-col>

                </van-row>
                <div class="click-display-all" style="width: 100%;padding: 10px;font-size: 11px;color: #aaaaaa;"
                     v-show="!isShow"
                     @click="showToggle()">
                    {{btnText}}
                </div>
            </div>
            <div>
                <div style="text-align: left;padding: 10px;background-color: white;">
                    <div>
                        <div>
                            <p><span style="font-size: 16px;font-weight: bold;">第一次提问</span></p>
                        </div>

                        <div>
                            <span style="font-size: 14px;color: #666666;">{{caseList[0].questions}}</span>
                        </div>
                        <div style="padding: 10px 0;">
                            <span style="font-size: 12px;color: #aaaaaa;">{{caseList[0].qTime}}</span>
                        </div>

                    </div>
                    <div>
                        <div style="text-align: left;">
                            <table>
                                <tr>
                                    <td style="width: 24px;">
                                        <div style="width: 24px;height: 24px;background-color: #bbbbbb;border-radius: 12px;"></div>
                                    </td>
                                    <td>
                                        <p><span
                                                style="font-size: 16px;font-weight: bold;">{{caseList[0].name}}</span><span
                                                style="font-size: 13px;color: #888888;">&nbsp;&nbsp;&nbsp;&nbsp;回答了该问题</span>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </div>

                        <div>
                            <span style="font-size: 14px;color: #666666;">{{caseList[0].answers}}</span>
                        </div>
                        <div style="padding: 10px 0;">
                            <span style="font-size: 12px;color: #aaaaaa;">{{caseList[0].aTime}}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div style="padding:10px 0 10px 16px;text-align: left;background-color: white;margin-top: 20px;margin-bottom: 10px;">
                <table>
                    <tr>
                        <td><span>不对外展示咨询问题及答复</span></td>
                        <td>
                            <van-switch
                                    v-model="checked"
                                    size="24px"
                            />

                        </td>
                    </tr>
                </table>

            </div>
        </div>

        </div>
        <div style="background-color: white;position: fixed;bottom: 0;width: 100%;">
            <van-button type="primary" size="large" @click="onSubmit">继续提问</van-button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "QuestionDetails",
        data() {
            return {
                checked: true,
                message: '',
                caseList: [{
                    id: 1,
                    name: '委员名称',
                    questions: '会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字。',
                    qTime: '提问时间1',
                    answers: '委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字。',
                    aTime: '回答时间1'
                }, {
                    id: 2,
                    name: '委员2',
                    questions: '问题2',
                    qTime: '提问时间2',
                    answers: '回答2',
                    aTime: '回答时间2'
                }],
                item: {
                    id: 1,
                    name: '委员姓名',
                    position: '委员任职信息',
                    dispalyAll: false,
                    body: '委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委' +
                        '委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委'
                },
                isShow: false,
                btnText: "点击查看全文",
            };
        },
        methods: {
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            onSubmit() {
                // console.log('submit!');
                this.$router.push({path: '/addQuestion'})

            },
            showToggle() {
                this.isShow = !this.isShow
                if (this.isShow) {
                    this.btnText = "点击隐藏全文"
                } else {
                    this.btnText = "点击查看全文"
                }
            },
        },
    }
</script>

<style scoped>
    table, tr {
        width: 100%;
    }

    td {
        padding: 0;
    }
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

    .item-content {
        color: #999999;
        text-align: left;
        font-size: 12px;
        max-width: 590px;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    .item-content-display-all {
        color: #999999;
        font-size: 12px;
        text-align: left;
        max-width: 590px;
        word-break: break-all;
        margin-bottom: 15px;
    }

    .click-display-all {
        color: #6ea4eb;
        margin-bottom: 15px;

    }
</style>
