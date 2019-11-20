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
        <div style="margin-top: 56px;" v-if="isShow">
            <div style="background-color: white;padding: 10px 0;">
                <van-row>
                    <van-col span="6">
                        <van-image
                                width="60"
                                height="60"
                                :src="userImg"
                        >
                            <template v-slot:error>
                                <van-icon name="user-o"/>
                            </template>
                        </van-image>
                    </van-col>
                    <van-col span="12">
                        <div style="text-align: left;">
                            <div style="height: 40px;">
                                <div style="font-size: 14px;">
                                    {{memberInfo.name}} {{memberInfo.sexN}} {{memberInfo.age}}岁
                                </div>
                                <div style="font-size: 12px;padding-top: 5px;">
                                    {{memberInfo.tel}}
                                </div>
                            </div>

                            <div style="font-size: 12px;">
                                {{memberInfo.createByN}}
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
            <van-image-preview
                    v-model="showBigImage"
                    :images="images"
            >
                <template v-slot:index>第页</template>
            </van-image-preview>
            <div v-if="isShow">
                <div style="text-align: left;padding: 10px;background-color: white;">
                    <div>
                        <div>
                            <p><span style="font-size: 16px;font-weight: bold;">提问</span></p>
                        </div>

                        <div>
                            <span style="font-size: 12px;color: #666666;">{{caseList.question}}</span>
                        </div>
                        <div v-show="imgShow">
                            <van-image
                                    @click="onClickImage"
                                    width="10rem"
                                    height="10rem"
                                    fit="contain"
                                    :src="caseList.appendix"
                            />
                        </div>
                        <div v-show="pdfShow">
                            <van-divider content-position="left">附件</van-divider>
                            <div style="display: flex;justify-content: space-between;">

                                <div style="display: flex;justify-content: flex-start;">
                                    <img width="22px"
                                         height="22px"
                                         fit="contain"
                                         src="../assets/attach_file.png"
                                    >
                                    <span style="font-size: 12px;">{{caseList.questionTitle}}</span>
                                </div>
                                <van-button round plain hairline size="mini" type="info" @click="onclickDownload">下 载
                                </van-button>
                            </div>
                        </div>


                        <div style="padding: 10px 0;">
                            <span style="font-size: 12px;color: #aaaaaa;">{{caseList.questionTimeF}}</span>
                        </div>
                    </div>
                </div>
                <div style="text-align: left;padding: 10px;background-color: white;" v-show="caseList.reply">
                    <div>
                        <div>
                            <p><span style="font-size: 16px;font-weight: bold;">回答</span></p>
                        </div>

                        <div>
                            <span style="font-size: 12px;color: #666666;">{{caseList.reply}}</span>
                        </div>
                        <div style="padding: 10px 0;">
                            <span style="font-size: 12px;color: #aaaaaa;">{{caseList.replyTimeF}}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div style="background-color: white;position: fixed;bottom: 0;width: 100%;">
            <van-button :type="style" size="large" @click="onSubmit">{{footerName}}</van-button>

        </div>
    </div>
</template>

<script>
    import headImg from '../assets/timg.jpg'
    import {ImagePreview} from "vant";
    import config from '../config'

    export default {
        name: "Advisory",
        data() {
            return {
                style: 'primary',
                isShow: false,
                memberInfo: null,
                caseList: null,
                userImg: null,
                footerName: '解答疑问',
                showBigImage: false,
                images: [],
                imgShow: false,
                pdfShow: false,

            }
        },
        mounted() {
            this.userImg = headImg;
            const that = this;
            const id = that.$route.params.id;
            this.caseList = this.getQuestionById(id);
            this.caseList.appendix = config.fileUrl + this.caseList.appendix;
            const url = this.caseList.appendix;
            this.imgShow = url.indexOf('.png') >= 0;
            this.pdfShow = url.indexOf('.pdf') >= 0;
            this.memberInfo = this.caseList.memberInfo;
            this.images = [this.caseList.appendix];
            this.isShow = true;
            if (this.caseList.reply) {
                this.style = 'info';
                this.footerName = '修改回答'
            } else {
                this.style = 'primary';
                this.footerName = '解答疑问'
            }
        },
        methods: {
            getQuestionById(id) {
                const list = this.$store.getters.questionList;
                for (let question of list) {
                    if (question.id === id) {
                        return question;
                    }
                }
            },
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
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
                if (!this.caseList.reply) {
                    /*第一次回答*/
                    this.$router.push({path: '/memberAnswer/' + this.caseList.id})
                } else {
                    /*修改回答*/
                    this.$router.push({path: '/changeAnswer/' + this.caseList.id})
                }

            },
            callPhone() {
                window.location.href = `tel://${this.memberInfo.tel}`
            },
            onClickImage() {
                //2在函数中使用
                ImagePreview({images: this.images, startPosition: 0});//this.images为图片资源
            },
            onclickDownload() {
                window.open(this.caseList.appendix);
            }

        },
        computed: {
            getQuestion() {
                return this.$store.getters.questionList;
            },
            getMemberInfo() {
                return this.caseList.memberInfo;
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
