<template>
    <div>
        <div>
            <van-tabs>
                <van-tab v-for="(item,index) in caseList" :title="'案例 ' + (index+1)" v-bind:key="item.id">
                    <div style="text-align: left;padding: 10px;background-color: white;">
                        <div>
                            <div>
                                <p><span style="font-size: 16px;font-weight: bold;">第一次提问</span></p>
                            </div>

                            <div>
                                <span style="font-size: 14px;color: #666666;">{{item.questions}}</span>
                            </div>
                            <div style="padding: 10px 0;">
                                <time style="font-size: 12px;color: #aaaaaa;">{{item.qTime|formatDate}}</time>
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
                                                    style="font-size: 16px;font-weight: bold;">{{item.name}}</span><span
                                                    style="font-size: 13px;color: #888888;">&nbsp;&nbsp;&nbsp;&nbsp;回答了该问题</span>
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                            </div>

                            <div>
                                <span style="font-size: 14px;color: #666666;">{{item.answers}}</span>
                            </div>
                            <div style="padding: 10px 0;">
                                <span style="font-size: 12px;color: #aaaaaa;">{{item.aTime|formatDate}}</span>
                            </div>
                        </div>
                    </div>

                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mCaseList",
        data(){
            return {
                caseList: [{
                    id: 1,
                    name: '委员名称',
                    questions: '会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字会员提问问题描述文字。',
                    qTime: Date.now(),
                    answers: '委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字委员答疑内容文字。',
                    aTime: Date.now()
                }, {
                    id: 2,
                    name: '委员名称',
                    questions: '问题2',
                    qTime: '提问时间2',
                    answers: '回答2',
                    aTime: '回答时间2'
                },
                    {
                        id: 3,
                        name: '委员1',
                        questions: '问题1',
                        qTime: '提问时间1',
                        answers: '回答1',
                        aTime: '回答时间1'
                    },
                    {
                        id: 4,
                        name: '委员1',
                        questions: '问题1',
                        qTime: '提问时间1',
                        answers: '回答1',
                        aTime: '回答时间1'
                    },
                    {
                        id: 5,
                        name: '委员1',
                        questions: '问题1',
                        qTime: '提问时间1',
                        answers: '回答1',
                        aTime: '回答时间1'
                    },
                ]
            }
        },
        filters:{
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
    }
</script>

<style scoped>
    table, tr {
        width: 100%;
    }

    .footer td {
        width: 50%;
        padding: 0;
    }



    .van-doc-nav-bar .van-icon {
        color: #969799;
        font-size: 24px;
        cursor: pointer;
    }

</style>
