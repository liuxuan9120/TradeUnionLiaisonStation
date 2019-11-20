<template>
    <div style="background-color: #f1f1f1;">
        <div>
            <van-nav-bar
                    title="继续提问"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                    fixed
                    border
            />
        </div>
        <div style="margin-top: 56px;">
            <div>
                <div>

                    <div class="title_text">{{title}}…</div>
                    <van-cell-group>
                        <van-field
                                v-model="message"
                                type="textarea"
                                placeholder="请填写需要咨询的内容"
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
        name: "AddQuestion",
        data() {
            return {
                checked: true,
                message: '',
                title:''
            };
        },
        created() {
            this.title=this.$route.params.title;
        },
        methods: {
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            onSubmit() {
                const that = this;
                const id = that.$route.params.id;
                const data = new FormData();
                data.append('content', that.message);
                data.append('committeeMemberinfoId', id);
                this.axios.post(`${that.$API}/continueCommitteeMemberinfoSave`, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then(function (response) {
                        // eslint-disable-next-line no-console
                        console.log(response.data.data.content);
                        if (response.data.result) {
                            that.$toast('提交成功');
                        } else {
                            that.$toast(response.data.msg);
                        }
                    })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        that.$toast('提交失败');
                    });
            }
        },
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

    .title_text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;

    }
</style>
