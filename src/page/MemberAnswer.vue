<template>
    <div>
        <div>
            <van-nav-bar
                    title="解答疑问"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                    fixed
                    border
            />
        </div>
        <div style="margin-top: 56px;">
            <div style="text-align: left;background-color: white;">
                <div style="padding: 10px 0 10px 16px;">
                    <van-row>
                        <van-col span="4">
                            <van-image
                                    width="32"
                                    height="32"
                                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                            />
                        </van-col>
                        <van-col span="20">
                            <div style="line-height: 36px;">
                                <span style="font-size: 14px;color: #666666;" class="span1">会员所需咨询问题的内容描述会员所需咨询问题…</span>
                            </div>

                        </van-col>
                    </van-row>

                </div>


            </div>
            <div>
                <div>
                    <van-cell-group>
                        <van-field
                                v-model="message"
                                type="textarea"
                                placeholder="请填写需要解答的内容"
                                rows="10"
                        />
                    </van-cell-group>
                </div>
            </div>


            <div style="padding: 10px;">
                <van-button type="primary" size="large" @click="onSubmit">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MemberAnswer",
        data() {
            return {
                message:''
            }
        },
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
            onSubmit() {
                 this.$toast('提交');
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

    .span1 {
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
    }
</style>
