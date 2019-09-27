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
                            <van-field v-model="value" placeholder="请输入标题"/>
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
                titlename: '',
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
            onSubmit() {
                // console.log('submit!');
                this.$toast('提交');
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
