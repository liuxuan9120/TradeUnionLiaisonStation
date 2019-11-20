<template>
    <div class="vip_index" style="background-color: white ;">
        <!--        <van-nav-bar-->
        <!--                title="委员登录"-->
        <!--                left-text=""-->
        <!--                right-text=""-->
        <!--                fixed-->
        <!--                border-->
        <!--        >-->
        <!--            <van-icon name="cross" slot="left"/>-->
        <!--            <van-icon name="ellipsis" slot="right"/>-->
        <!--        </van-nav-bar>-->
        <!--        <div style="height: 46px;">-->

        <!--        </div>-->
        <div style="height: 50px;width: 100%;text-align: left;background-color: white;z-index: 1;position: fixed;">
            <img class="img-logo" src="../assets/logo.png">
        </div>

        <div class="back_img">
            <div class="login_content">
                <div class="box_content">
                    <div class="login_header">
                        <span style="opacity: 1;">委员登录</span>
                    </div>
                    <div class="login_main">
                        <div class="login_main_content">
                            <div class="login_main_box">
                                <div class="login_main_item">
                                    <div class="user_name_icon">
                                        <van-icon name="manager"/>
                                    </div>
                                    <div class="user_name_input">
                                        <van-cell-group>
                                            <van-field v-model="loginForm.username" type="tel"
                                                       placeholder="请输入用户名(手机号)"/>
                                        </van-cell-group>
                                    </div>
                                </div>
                            </div>
                            <div style="height: 20px;"></div>
                            <div class="login_main_box">
                                <div class="login_main_item">
                                    <div class="msg_code_input">
                                        <van-cell-group>
                                            <van-field v-model="loginForm.validateCode" type="number"
                                                       placeholder="请输入验证码"/>
                                        </van-cell-group>
                                    </div>
                                    <van-button class="msg_btn" :disabled="isMsg" @click="getMSgCode">{{msgBtnText}}
                                    </van-button>
                                </div>
                            </div>

                            <div style="height: 20px;"></div>
                            <div style="display: flex;justify-content: center;">
                                <van-button class="login_btn" @click="onLogin">
                                    登录
                                </van-button>
                            </div>

                        </div>

                    </div>
                </div>


            </div>

        </div>
    </div>

</template>

<script>
    export default {

        name: "vipIndex",
        data() {
            return {
                activeName: 'a',
                sms: '',
                isMsg: false,
                msgBtnText: '获取验证码',
                num: 180,
                loginForm: {
                    username: '',
                    validateCode: '',
                }
            };
        },
        mounted() {
        },
        methods: {
            getMSgCode() {
                if (!this.loginForm.username) {
                    this.$toast('请输入用户名(手机号)');
                    return;
                }
                this.isMsg = true;
                this.msgBtnText = `(${this.num}秒)`;
                const that = this;
                let numInterval = setInterval(function () {
                    that.num--;
                    that.msgBtnText = `(${that.num}秒)`;
                    if (that.num <= 0) {
                        that.isMsg = false;
                        that.msgBtnText = '获取验证码';
                        clearInterval(numInterval);
                    }
                }, 1000);
                //获取验证码
                this.sendCaptcha(this.loginForm.username);

            },
            onLogin() {
                if (!this.loginForm.username) {
                    this.$toast('请输入用户名(手机号)');
                    return;
                }
                if (!this.loginForm.validateCode) {
                    this.$toast('请输入验证码');
                    return;
                }
                /*登录
                **/
                /*http://58.54.251.155:8088/wzzgh-fwdt/committeeImp/login?phone=18186569120&validateCode=11122*/
                const that = this;
                const data = new FormData();
                data.append('phone', that.loginForm.username);
                data.append('validateCode', that.loginForm.validateCode);
                //     {
                //     'phone': that.loginForm.username,
                //     'validateCode': that.loginForm.validateCode
                // }
                this.axios.post(`${that.$API}/login`, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then(function (response) {

                        that.$toast(response.data.msg);
                        if (response.data.result) {
                            that.$store.dispatch('getCurId', response.data.data.id)
                            that.$router.push({path: '/viphome'});
                        }

                    })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        that.$toast('登录失败');
                    });
                // that.$store.dispatch('getCurId', null)
                // this.$router.push({path: '/viphome'});
            },
            sendCaptcha(phoneNumber) {
                const that = this;
                const data = new FormData();
                data.append('phone', phoneNumber);
                this.axios.post(`${that.$API}/modifyInfo/sendModifyValidateCode`, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then(function (response) {
                        // eslint-disable-next-line no-console
                        console.log(response);
                        that.$toast('验证码发送成功');
                    })
                    .catch(function (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                        that.$toast('180秒后请重新获取验证码');
                    });
            }

        }
    }
</script>

<style scoped>
    .vip_index {

    }

    .img-logo {
        padding-left: 10px;
        padding-top: 10px;
        width: auto;
        height: 35px;
    }

    .van-nav-bar .van-icon {
        color: black;
        vertical-align: middle;
    }

    .back_img {
        position: fixed;
        width: 100%;
        height: 100%;
        background: url(../assets/body_bg.jpg) no-repeat;
        background-size: cover;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 0;
    }

    .login_content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box_content {
        width: 335px;
    }

    .login_header {
        line-height: 60px;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.5);;
        text-align: center;
        color: white;
        font-size: 18px;
        border-radius: 5px 5px 0 0;
    }

    .login_main {
        height: 269px;
        background-color: rgba(255, 255, 255, 0.5);;
        border-radius: 0 0 5px 5px;
    }

    .login_main_content {
        padding-top: 50px;
    }

    .login_main_box {
        display: flex;
        justify-content: center;
    }

    .login_main_item {
        /*border: 1px solid rgba(204, 204, 204, 1);*/
        width: 250px;
        display: flex;
        /*border-radius: 3px;*/
    }

    .user_name_icon {
        width: 40px;
        height: 40px;
        background-color: rgba(238, 238, 238, 1);
        display: flex;
        justify-content: center;
        font-size: 18px;
        align-items: center;
    }

    .user_name_input {
        height: 40px;
        background-color: white;
        width: 210px;
    }

    .msg_code_input {
        width: 160px;
        height: 40px;
        background-color: white;
    }


    .msg_btn {
        width: 90px;
        height: 40px;
        background-color: rgba(217, 83, 79, 1);
        text-align: center;
        color: white;
        line-height: 40px;
        font-size: 14px;
        border-width: 0;
        padding: 0;
        border-radius: 0 3px 3px 0;
    }

    .login_btn {
        width: 252px;
        height: 42px;
        line-height: 40px;
        border-radius: 3px;
        background-color: rgba(217, 83, 79, 1);
        color: rgba(255, 255, 255, 1);
        font-size: 18px;
        text-align: center;
    }

    .van-cell {
        padding: 8px 16px;
    }
</style>