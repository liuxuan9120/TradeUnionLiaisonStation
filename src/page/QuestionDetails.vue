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
        <div >


            <div style="position: fixed;top:56px;width: 100%;background-color: #f1f1f1;"
                 >
                <m_uer_details :member="getCommitteeMember"></m_uer_details>

                <div>

                    <van-image-preview
                            v-model="showBigImage"
                            :images="images"
                    >
                        <template v-slot:index>第页</template>
                    </van-image-preview>
                    <div style="text-align: left;padding: 10px;background-color: white;">
                        <div>
                            <div>
                                <p><span style="font-size: 16px;font-weight: bold;">提问</span></p>
                            </div>

                            <div>
                                <span style="font-size: 14px;color: #666666;word-wrap:break-word;">{{caseList.question}}</span>
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
                                    <van-button round plain hairline size="mini" type="info" @click="onclickDownload">查 看
                                    </van-button>
                                </div>
                            </div>
                            <div style="padding: 10px 0;">
                                <span style="font-size: 12px;color: #aaaaaa;">{{caseList.questionTimeF}}</span>
                            </div>

                        </div>
                        <div v-show="caseList.questionType!=='1'">
                            <div style="text-align: left;">
                                <table>
                                    <tr>
                                        <td style="width: 24px;">
                                            <div style="width: 24px;height: 24px;background-color: #bbbbbb;border-radius: 12px;"></div>
                                        </td>
                                        <td>
                                            <p><span
                                                    style="font-size: 16px;font-weight: bold;">{{committeeMember.name}}</span><span
                                                    style="font-size: 13px;color: #888888;">&nbsp;&nbsp;&nbsp;&nbsp;回答了该问题</span>
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                            </div>

                            <div>
                                <span style="font-size: 14px;color: #666666;word-wrap:break-word;">{{caseList.reply}}</span>
                            </div>
                            <div style="padding: 10px 0;">
                                <span style="font-size: 12px;color: #aaaaaa;">{{caseList.replyTimeF}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="padding:10px 0 10px 16px;text-align: left;background-color: white;margin-top: 20px;margin-bottom: 10px;" v-show="caseList.questionType!=='1'">
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

        </div>
<!--        <div style="background-color: white;position: fixed;bottom: 0;width: 100%;">-->
<!--            <van-button type="primary" size="large" @click="onSubmit">继续提问</van-button>-->

<!--        </div>-->
    </div>
</template>

<script>
    import m_uer_details from '../components/mUserDetails';
    // import m_case_list from '../components/mCaseList';
    import {ImagePreview} from "vant";
    import config from '../config'
    export default {
        name: "QuestionDetails",
        components: {
            m_uer_details,
            // m_case_list,
        },
        data() {
            return {
                checked: true,
                message: '',
                caseList: {},
                committeeMember: {
                    name: '',
                    post: '',
                    introduction: ''
                },
                isShow: false,
                btnText: "点击查看全文",
                showBigImage: false,
                images: [],
                imgShow: false,
                pdfShow: false,
            };
        },
        created() {

        },
        mounted() {

            const that = this;
            const id = that.$route.params.id;
            this.axios.get(`${that.$API}/myQuestionDetail?id=${id}`, {})
                .then(function (response) {
                    // eslint-disable-next-line no-console
                    console.log("@@@@@@@response", response)
                    that.caseList = response.data.data;
                    that.isShowFile();
                    // eslint-disable-next-line no-console
                    console.log(" ##########that.caseList", that.caseList)

                    // eslint-disable-next-line no-console
                    console.log(" ##########that.committeeMember", that.committeeMember)
                    if (response.data.data.committeeMember) {
                        that.committeeMember = response.data.data.committeeMember
                    }
                })
                .catch(function (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    that.$toast('获取失败2');
                });
        },
        methods: {
            onClickImage() {
                //2在函数中使用
                ImagePreview({images: this.images, startPosition: 0});//this.images为图片资源
            },
            // getQuestionById(id) {
            //     const list = this.$store.getters.questionList;
            //     for (let question of list) {
            //         if (question.id === id) {
            //             return question;
            //         }
            //     }
            // },
            isShowFile(){
                const that = this;
                if(that.caseList.appendix){
                    that.caseList.appendix = config.fileUrl + that.caseList.appendix;

                }
                if(that.caseList.questionType==='1'){
                    // eslint-disable-next-line no-console
                    console.log("11111111111111")
                    const url = that.caseList.appendix;
                    that.imgShow = url.indexOf('.png') >= 0||url.indexOf('.jpg') >= 0;
                    that.pdfShow = !that.imgShow;
                }else{
                    // eslint-disable-next-line no-console
                    console.log("222222222222222222222")
                    that.imgShow = false;
                    that.pdfShow = false;
                }
                that.images = [that.caseList.appendix];
            },
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            onSubmit() {
                // console.log('submit!');
                const id = this.$route.params.id;
                this.$router.push({path: '/addQuestion/'+id+'/'+this.caseList.question})

            },
            showToggle() {
                this.isShow = !this.isShow
                if (this.isShow) {
                    this.btnText = "点击隐藏全文"
                } else {
                    this.btnText = "点击查看全文"
                }
            },
            onclickDownload() {
                window.open(this.caseList.appendix);
            }
        },
        computed: {

            getCommitteeMember(){
                // eslint-disable-next-line no-console
                console.log("this.committeeMember;",this.committeeMember);

                return this.committeeMember;
            },
            getCaseList(){
                return this.caseList;
            }
        }
    }
</script>

<style scoped>
    table, tr {
        width: 100%;
    }

    td {
        padding: 0;
    }

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
        margin-bottom: 12px !important;

    }
</style>
