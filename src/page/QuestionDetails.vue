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


            <div style="position: fixed;top:60px;bottom: 60px;width: 100%;background-color: #f1f1f1;"
                 >
                <m_uer_details :member="getCommitteeMember"></m_uer_details>
                <!--<div style="background-color: white;" v-show="committeeMember.name">
                    <van-row>
                        <van-col span="6">
                            <van-image
                                    width="60"
                                    height="80"
                                    :src="committeeMember.photo"
                            />
                        </van-col>
                        <van-col span="18">
                            <div class="item-body">
                                <div style="text-align: left;font-size: 14px;padding: 5px 0 5px 0;">
                                    <span>{{committeeMember.name}}</span><span>{{committeeMember.post}}</span>
                                </div>

                                <div :class="{'item-content-display-all': isShow, 'item-content': !isShow}"
                                     @click="showToggle()">
                                    {{committeeMember.introduction}}
                                </div>


                            </div>
                        </van-col>

                    </van-row>
                    <div class="click-display-all" style="width: 100%;padding: 10px;font-size: 11px;color: #aaaaaa;"
                         v-show="!isShow"
                         @click="showToggle()">
                        {{btnText}}
                    </div>
                </div>-->
                <div>
<!--                    <m_case_list :caseList="getCaseList"></m_case_list>-->
                    <div style="text-align: left;padding: 10px;background-color: white;">
                        <div>
                            <div>
                                <p><span style="font-size: 16px;font-weight: bold;">第一次提问</span></p>
                            </div>

                            <div>
                                <span style="font-size: 14px;color: #666666;word-wrap:break-word;">{{caseList.question}}</span>
                            </div>
                            <div style="padding: 10px 0;">
                                <span style="font-size: 12px;color: #aaaaaa;">{{caseList.questionTimeF}}</span>
                            </div>

                        </div>
                        <div v-show="committeeMember.name">
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
<!--        <div style="background-color: white;position: fixed;bottom: 0;width: 100%;">-->
<!--            <van-button type="primary" size="large" @click="onSubmit">继续提问</van-button>-->

<!--        </div>-->
    </div>
</template>

<script>
    import m_uer_details from '../components/mUserDetails';
    // import m_case_list from '../components/mCaseList';
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
        },
        computed: {
            getCommitteeMember(){
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
        margin-bottom: 15px;

    }
</style>
