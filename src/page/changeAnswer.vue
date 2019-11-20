<template>
    <div>
        <div>
            <van-nav-bar
                    title="修改答疑"
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
                                    :src="userImg"
                            />
                        </van-col>
                        <van-col span="20">
                            <div style="line-height: 36px;">
                                <span style="font-size: 14px;color: #666666;"
                                      class="span1">{{getQuestionInfo.question}}</span>
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
                                placeholder="请填写需要修改的内容"
                                rows="10"
                        />
                    </van-cell-group>
                </div>
            </div>


            <div style="padding: 10px;">
                <van-button type="primary" size="large" @click="onSubmit">修改</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import headImg from '../assets/timg.jpg'
    export default {
        name: "changeAnswer",
        data() {
            return {
                message: '',
                id:null,
                userImg: null,
            }
        },
        created(){
            this.message=this.getQuestionInfo.reply;
        },
        mounted() {
            this.userImg = headImg;
            const that = this;
            this.id = that.$route.params.id;
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

                const that = this;
                /*editCommitteeReply?reply=111&committeeMemberinfoId=222*/
                // const committeeId = that.$store.getters.curId;
                const data = new FormData();
                data.append('reply', that.message);
                data.append('committeeMemberinfoId', this.id);
                this.axios.post(`${that.$API}/editCommitteeReply`, data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then(function (response) {
                        // eslint-disable-next-line no-console
                        console.log("response",response)
                        that.$toast('修改答疑成功');
                        that.$router.push({path: '/viphome'})
                        // console.log(response.data.data.content);
                    })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        that.$toast('修改失败');
                    });
            }

        },
        computed: {
            getQuestionInfo() {
                // eslint-disable-next-line no-console
                console.log(this.$store.getters.selectQuestionInfo);
                return this.$store.getters.selectQuestionInfo;
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