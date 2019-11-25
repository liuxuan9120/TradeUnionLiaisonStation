<template>
    <div>
        <div style="background-color: white;">
            <van-row>
                <van-col span="6">
                    <van-image
                            width="60"
                            height="80"
                            :src="member.photo|getUserImg"
                    />
                </van-col>
                <van-col span="18">
                    <div class="item-body">
                        <div style="text-align: left;font-size: 14px;padding: 5px 0 5px 0;">
                            <span>{{member.name}}</span>&nbsp;&nbsp;<span>{{member.post}}</span>
                        </div>

                        <div :class="{'item-content-display-all': isShow, 'item-content': !isShow}"
                             @click="showToggle()">
                            {{member.introduction}}
                        </div>


                    </div>
                </van-col>

            </van-row>
            <div class="click-display-all" style="width: 100%;padding: 10px 0;font-size: 11px;color: #aaaaaa;"
                 v-show="!isShow"
                 @click="showToggle()">
                {{btnText}}
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../config'
    export default {
        name: "mUserDetails",
        props:[
            'member'
        ],
        data() {
            return {
               /* item: {
                    id: 1,
                    name: '委员姓名',
                    position: '委员任职信息',
                    dispalyAll: false,
                    body: '委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委' +
                        '委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委员介绍等文字内容委'
                },*/
                isShow: false,
                btnText: "点击查看全文",
            }
        },
        methods:{
            showToggle() {
                this.isShow = !this.isShow
                if (this.isShow) {
                    this.btnText = "点击隐藏全文"
                } else {
                    this.btnText = "点击查看全文"
                }
            },
        },
        filters: {
            // urlPrefixion(url) {
            //     return 'http://58.54.251.155:8088/wzzgh-upload/' + url;
            // },
            getUserImg(str){
               if(str.indexOf(config.imgUrl)>=0){
                   return str
               }else{
                   return config.imgUrl +str;
               }

            },
        },
    }
</script>

<style scoped>
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
        padding-right: 10px;
        white-space: pre-line;
    }

    .item-content-display-all {
        color: #999999;
        font-size: 12px;
        text-align: left;
        max-width: 590px;
        word-break: break-all;
        margin-bottom: 15px;
        padding-right: 10px;
        white-space: pre-line;
    }

    .click-display-all {
        color: #6ea4eb;
        margin-bottom: 12px !important;

    }
</style>
