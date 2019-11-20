<template>
    <div style="background-color: #f1f1f1;">
        <div>
            <van-nav-bar
                    title="提案征集"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                    fixed
                    border
            />
        </div>
        <div style="margin-top: 56px;">
            <div style="background-color: white;text-align: left;margin-top: 20px;">
                <van-row>
                    <van-col span="8">
                        <div style="line-height: 44px;padding-left: 16px;font-size: 17px;">

                            <span style="color: red;">*</span><span>提案标题</span></div>
                    </van-col>
                    <van-col span="16">
                        <van-cell-group>
                            <van-field v-model="title" placeholder="请输入标题"/>
                        </van-cell-group>
                    </van-col>
                </van-row>

            </div>
            <div>
                <div>
                    <div style="text-align: left;padding: 16px;font-size: 17px;">
                        <span style="color: red;">*</span><span>咨询问题</span>
                    </div>
                    <van-cell-group>
                        <van-field
                                v-model="message"
                                type="textarea"
                                placeholder="请输入留言"
                                rows="10"
                        />
                    </van-cell-group>
                </div>
            </div>
            <div style="text-align: left;background-color: white;margin: 10px 0;padding: 10px;">
                <div style="padding: 10px;">
                    <span>上传附件</span><span style="color: #dddddd;">    最多上传5份</span>
                </div>
                <van-uploader
                        v-model="fileList"
                        multiple
                        :max-count="5"
                        :before-read="beforeRead"
                />
            </div>

            <div style="padding: 10px;">
                <van-button type="primary" size="large" @click="onSubmit">提交</van-button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Proposals",
        data() {
            return {
                title: '',
                fileList: [],
                message: '',
                value: '',
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            // 返回布尔值
            beforeRead(file) {
                if (file.type !== 'image/jpeg') {
                    this.$toast('请上传 jpg 格式图片');
                    return false;
                }

                return true;
            },
            // addPhoto(){
            //     let self = this
            //     const form = new FormData()
            //     self.fileList.forEach((file) => {   // fileList 是要上传的文件数组
            //         self.imageUrl = file.url || file.thumbUrl
            //         form.append('image', self.dataURLtoFile(self.imageUrl,file.name))
            //     });
            //     form.append('seedbedId', self.seedbedId)
            //     const instance = axios.create({
            //         withCredentials:true
            //     })
            //     instance.post('url',form).then(res=>{
            //         if(res.data.code===2000){
            //             console.log(res.data.message)
            //         }else{
            //             console.log(res.data.message)
            //         }
            //     })
            //         .catch(err=>{
            //             console.log(err)
            //         })
            // },
            // dataURLtoFile(dataurl, filename) {//将base64转换为文件
            //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            //     while(n--){
            //         u8arr[n] = bstr.charCodeAt(n);
            //     }
            //     return new File([u8arr], filename, {type:mime});
            // },
            onSubmit() {
                const that = this;
                const id = that.$route.params.id;
                if(!that.title){
                    that.$toast('标题不能为空');
                    return
                }
                if(!that.message&&that.message.length>10){
                    that.$toast('提案不能为空');
                    return
                }

                const data = new FormData();
                // eslint-disable-next-line no-console
                console.log("file111",that.fileList)
                data.append('title', that.title);
                data.append('content', that.message);
                data.append('committeeMemberId', id);
                // data.append('file', that.fileList);
                that.fileList.forEach((file) => {   // fileList 是要上传的文件数组
                    // that.imageUrl = file.url || file.thumbUrl
                    data.append('file', file.file)
                });
                // eslint-disable-next-line no-console
                console.log("file222",that.fileList)
                /*http://58.54.251.155:8088/wzzgh-fwdt/committeeImp/motionSave?liuyan=dddddddddddddddddddddddd&curId=12345*/
                this.axios.post(`${that.$API}/motionSave`, data)
                    .then( (response) =>{
                        if(response.data.result){
                            if(response.data.msg !==''){
                                that.$toast(response.data.msg);
                            }else{
                                that.$toast('提交成功');
                            }
                            this.$router.push({path: '/MemberList'})
                        }else{
                            that.$toast(response.data.msg);
                        }

                    })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log("error",error)
                        that.$toast('提交失败9');
                    });
            },
            // handleRemove(file, fileList) {
            //     // console.log(file, fileList);
            // },
            // handlePictureCardPreview(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible = true;
            // }
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
