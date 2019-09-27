<template>
    <div class="member-list" style="background-color: #f1f1f1;">
        <van-nav-bar
                title="政协届别委员联络站"
                left-text="返回"
                right-text="我的提问"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
                fixed
                border
        >
        </van-nav-bar>
        <van-list style="margin-top: 56px;"
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
        >
            <!-- <van-cell-group value="" size="large" v-for="item in list" :key="item.id"
                             border>
                 <van-cell
                         is-link
                         @click="onClickItem(item)">
                     <template slot="title">
                         <div style="width: 65px;height: 65px;">
                             <van-image
                                     width="65"
                                     height="65"
                                     :src="item.photo"
                             />
                         </div>

                     </template>
                     <template slot="default">
                         <div style="text-align: left;">
                             <div>
                                 <div style="text-align: left;height: 50%;"><span
                                         style="font-size: 18px;">{{item.name}}</span>
                                 </div>
                                 <div style="text-align: left;height:50%;">
                                     <span style="font-size: 13px;color: #9b9b9b;white-space: normal;overflow: hidden;text-overflow: ellipsis;">{{item.introduction}}</span>
                                 </div>
                             </div>
                         </div>


                     </template>
                 </van-cell>
             </van-cell-group>-->
            <ul>
                <li v-for="item in getMemberList" :key="item.id" class="member-list-box" @click="onClickItem(item.id)">
                    <div class="photo_content">
                        <van-image class="photo_item"
                                   :src="item.photo |urlPrefixion"
                        />
                    </div>
                    <div class="info_content">
                        <div>
                            <div><span class="name_text">{{item.name}}</span>
                            </div>
                            <div>
                                <span class="introduction_text">{{item.introduction}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="icon_content">
                        <van-icon name="arrow"/>
                    </div>
                </li>
            </ul>


        </van-list>

<!--        <div style="background-color: white;position: fixed;bottom: 0;width: 100%;">-->
<!--            <table>-->
<!--                <tr>-->
<!--                    <td>-->
<!--                        <van-button icon="records" type="default" size="large" @click="goProposals">提案征集-->
<!--                        </van-button>-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        <van-button type="primary" size="large" @click="goMessageBoard">向委员提问</van-button>-->
<!--                    </td>-->
<!--                </tr>-->
<!--            </table>-->
<!--        </div>-->
        <m_footer></m_footer>
    </div>
</template>

<script>
    /* eslint-disable no-console */
    import m_footer from '../components/mFooter';
    export default {
        name: "MemberList",
        components: {
            m_footer
        },
        data() {
            return {
                loading: true,
                finished: false,
                border: true,
                fixed: true,
                ops: {//滚动条设置
                    vuescroll: {},
                    scrollPanel: {},
                    rail: {
                        keepShow: true
                    },
                    bar: {
                        hoverStyle: true,
                        onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                        background: 'white',
                    }
                },
            };
        },
        created() {
            const that = this;
            console.log(this, this.$axios, this.axios)
            this.axios.post('/getCommitteeList', {
                pageIndex: '1',
                pageSize: '20'
            })
                .then(function (response) {
                    console.log(response);
                    // that.memberList = response.data.data;
                    that.$store.dispatch('getList',response.data.data)
                    that.loading = false;
                    that.finished = true;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        filters: {
            urlPrefixion(url) {
                return 'http://58.54.251.155:8088/wzzgh-upload/' + url;
            }
        },
        methods: {
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
                // Toast('返回');
            },
            onClickRight() {
                // Toast('按钮');
                this.$router.push({path: '/questionsList'})
            },
            onClickItem(id) {
                this.$router.push({path: '/caseDetails/' + id})
            },
            onLoad() {
                // 异步更新数据
                // setTimeout(() => {
                //     for (let i = 0; i < 10; i++) {
                //         this.list.push(this.list.length + 1);
                //     }
                //     // 加载状态结束
                //     this.loading = false;
                //
                //     // 数据全部加载完成
                //     if (this.list.length >= 40) {
                //         this.finished = true;
                //     }
                // }, 500);
            }
        },
        computed:{
            getMemberList () {
                console.log('this.$store.getters.memberList',this.$store.getters.memberList)
                return this.$store.getters.memberList;
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

    .van-cell__value {
        left: -80px;
    }

    .member-list-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        justify-items: center;
        height: 88px;
        background-color: white;
        border: 0 solid #bbbbbb;
        border-bottom-width: 1px;
    }

    .photo_content {
        width: 92px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        padding-left: 15px;
    }

    .photo_item {
        width: 65px;
        height: 65px;
        vertical-align: middle;
    }

    .info_content {
        text-align: left;
        /*width: 200px;*/
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 15px;
    }

    .name_text {
        font-size: 18px;
    }

    .introduction_text {
        /*width: 200px;*/
        font-size: 13px;
        color: #9b9b9b;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .icon_content {
        line-height: 88px;
        padding-right: 10px;
    }
</style>
/* {
"id": "ac87ede7-4151-491d-b675-5aafdf452b8b",
"name": "陈兆军",
"age": 47,
"birthday": 65721600000,
"gender": false,
"nativePlace": "湖南澧县人",
"post": "公务员",
"nation": "汉族",
"education": "大学本科",
"timeToJoinTheParty": 815155200000,
"workingHours": 691516800000,
"incentives": "1998年个人荣立三等功一次\r\n2003年个人荣立三等功一次\r\n2004年个人荣立三等功一次\r\n2005年个人荣立三等功一次\r\n",
"introduction": "1991.12-1992.8 中国人民解放军海军潜艇学院第三训练团战士\r\n1992.8-1994.9  海军潜艇第42支队257艇战士\r\n1994.9-1997.7  海军广州舰艇学院学员\r\n1997.7-1998.11 海军护卫艇29大队二中队6387艇正排（职）实习副艇长\r\n1998.11-2000.1  海军护卫艇30大队6387艇副艇长\r\n2000.1-2009.4   海军快艇第16支队司令部历任作战科副连职参谋、作战科正连职参谋、作战科副营职参谋、自动化工作站正营职站长、作战科正营职参谋\r\n2009.4-2015.7   温州水警区作战科副团职科长\r\n2015.7-2015.12  转业待安置\r\n2015.12至今   温州市龙湾区（高新区）总工会党组成员、副主席（副科级）\r\n",
"isDel": false,
"photo": "/upload/committeeMemberCover/2019/8/2d97c865-828b-4d2d-ba6f-31f90a658b75.jpg",
"cardId": "",
"password": "789",
"birthdayF": "1972-02-01",
"genderF": "男",
"timeToJoinThePartyF": "1995-11-01",
"workingHoursF": "1991-12-01"
},*/
