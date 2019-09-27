<template>
    <div style="background-color: #f1f1f1;">
        <div>
            <van-nav-bar
                    title="留言板"
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
            <div style="padding:10px 0 10px 16px;text-align: left;background-color: white;margin-top: 20px;margin-bottom: 10px;">
                <table>
                    <tr>
                        <td><span style="font-size: 14px;">不对外展示咨询问题及答复</span></td>
                        <td>
                            <van-checkbox v-model="checked"></van-checkbox>
                        </td>
                    </tr>
                </table>

            </div>

            <div style="padding: 10px;">
                <van-button type="primary" size="large" @click="onSubmit">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageBoard",
        data() {
            return {
                checked: true,
                message: ''
            };
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
            }
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
