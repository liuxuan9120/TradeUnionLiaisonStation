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
            <ul>
                <li v-for="item in committeeList" :key="item.id" class="member-list-box" @click="onClickItem(item.id)">
                    <div class="photo_content">
                        <van-image class="photo_item"
                                   :src="item.photo"
                        />
                    </div>
                    <div class="info_content">
                        <div style="width: 100%;">
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
<!--        <m_footer></m_footer>-->
    </div>
</template>

<script>
    /* eslint-disable no-console */
    // import m_footer from '../components/mFooter';
    import config from '../config.js'
    export default {
        name: "MemberList",
        // components: {
            // m_footer
        // },
        data() {
            return {
                committeeList:[],
                loading: false,
                finished: false,
                border: true,
                fixed: true,
                pageIndex: 1,
                pageSize: 20,
            };
        },
        created() {
            // this.loading = true;
            // this.$store.dispatch('getCommitteeList', {pageIndex: this.pageIndex, pageSize: this.pageSize});
        },
        // filters: {
        //     urlPrefixion(url) {
        //         return 'http://58.54.251.155:8088/wzzgh-upload/' + url;
        //     }
        // },
        methods: {
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            onClickRight() {
                this.$router.push({path: '/questionsList'})
            },
            onClickItem(id) {
                this.$router.push({path: '/caseDetails/' + id})
            },
            reduceList(list){
                let obj = {};
                let reList = list.reduce((cur,next) => {
                    obj[next.id] ? '' : obj[next.id] = true && cur.push(next);
                    return cur;
                },[]) ;//设置cur默认类型为数组，并且初始值为空的数组
                console.log(reList);
                return reList;
            },
            onLoad() {
                const that = this;
                const index = that.pageIndex;
                this.axios.get(`${config.api}//getCommitteeList?pageIndex=${index}&pageSize=${that.pageSize}`, {})
                    .then(function (response) {
                        if(!response.data.data.last){
                            that.pageIndex++;
                        }

                        const responseList=response.data.data.content;
                        that.committeeList=that.reduceList(that.committeeList.concat(responseList));
                        for (const item of that.committeeList) {
                            if(item.photo){
                                item.photo = config.imgUrl + item.photo;
                                // eslint-disable-next-line no-console
                                console.log('item.photo',item.photo)
                            }

                        }
                        that.$store.dispatch('getCommitteeList', that.committeeList);
                        that.loading = false;
                        if(responseList.length<that.pageSize){
                            that.finished = true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        that.$toast('获取失败4');

                    });
            }
        },
        computed: {

            getMemberList() {
                const that = this;
                console.log('this.$store.getters.committeeList', this.$store.getters.committeeList);
                const list = this.$store.getters.committeeList;
                that.loading = false;
                if (list.length < that.pageSize) {
                    that.finished = true;
                }
                return this.$store.getters.committeeList;
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
        width: 100%;
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

