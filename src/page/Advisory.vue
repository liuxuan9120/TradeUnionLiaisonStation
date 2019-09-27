<template>
    <div>
        <div>
            <van-nav-bar
                    title="会员咨询"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                    fixed
                    border
            />
        </div>
        <div style="margin-top: 56px;">
            <div style="background-color: white;padding: 10px 0;">
                <van-row>
                    <van-col span="6">
                        <van-image
                                width="60"
                                height="60"
                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                        />
                    </van-col>
                    <van-col span="12">
                        <div style="text-align: left;">
                            <div style="height: 40px;">
                                <div style="font-size: 14px;">
                                    会员姓名 男 31岁
                                </div>
                                <div style="font-size: 12px;padding-top: 5px;">
                                    {{tel}}
                                </div>
                            </div>

                            <div style="font-size: 12px;">
                                会员所在工作单位
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div @click="callPhone">
                            <div style="font-size: 32px;height: 40px;">
                                <van-icon name="phone" color="green"/>
                            </div>
                            <div style="font-size: 12px;">
                                <span>拨打电话</span>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>

            <div>
                <div style="text-align: left;padding: 10px;background-color: white;">
                    <div>
                        <div>
                            <p><span style="font-size: 16px;font-weight: bold;">第一次提问</span></p>
                        </div>

                        <div>
                            <span style="font-size: 12px;color: #666666;">{{caseList[0].questions}}</span>
                        </div>
                        <div style="padding: 10px 0;">
                            <span style="font-size: 12px;color: #aaaaaa;">{{caseList[0].qTime}}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div style="background-color: white;position: fixed;bottom: 0;width: 100%;">
            <van-button type="primary" size="large" @click="onSubmit">解答疑问</van-button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Advisory",
        data() {
            return {
                tel:'110',
                caseList: [{
                    id: 1,
                    name: '委员名称',
                    questions: '会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字。',
                    qTime: '提问时间1',
                    answers: '委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字。',
                    aTime: '回答时间1'
                }]
            }},
        methods: {
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
                // Toast('返回');
            },
            goMessageBoard() {
                this.$router.push({path: '/messageBoard'})
            },
            goProposals() {
                this.$router.push({path: '/proposals'})
            },
            showToggle() {
                this.isShow = !this.isShow
                if (this.isShow) {
                    this.btnText = "点击隐藏全文"
                } else {
                    this.btnText = "点击查看全文"
                }
            },
            onSubmit(){
                this.$router.push({path: '/memberAnswer'})
            },
            callPhone(){
                window.location.href = 'tel://'+this.tel
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
</style>
