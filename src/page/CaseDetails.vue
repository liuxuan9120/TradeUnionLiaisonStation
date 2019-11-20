<template>
    <div class="case_details_page">
        <div style="width: 100%;">
            <van-nav-bar
                    title="委员答疑"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                    border
            />
        </div>
        <div class="case_details_content">


            <div style="width: 100%;background-color: #f1f1f1;">

                <!-- <div style="background-color: white;">
                     <van-row>
                         <van-col span="6">
                             <van-image
                                     width="60"
                                     height="80"
                                     src="https://img.yzcdn.cn/vant/cat.jpeg"
                             />
                         </van-col>
                         <van-col span="18">
                             <div class="item-body">
                                 <div style="text-align: left;font-size: 14px;padding: 5px 0 5px 0;">
                                     <span>{{item.name}}</span><span>{{item.position}}</span>
                                 </div>

                                 <div :class="{'item-content-display-all': isShow, 'item-content': !isShow}"
                                      @click="showToggle()">
                                     {{item.body}}
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
                <m_uer_details :member="getCommittee"></m_uer_details>
                <m_case_list :caseList="qList"></m_case_list>
                <!--  <div>
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
                                          <time style="font-size: 12px;color: #aaaaaa;">{{item.qTime|date}}</time>
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
                                          <span style="font-size: 12px;color: #aaaaaa;">{{item.aTime}}</span>
                                      </div>
                                  </div>
                              </div>

                          </van-tab>
                      </van-tabs>
                  </div>-->
            </div>

        </div>

        <div>
            <m_footer :id="selectId"></m_footer>
        </div>

    </div>

</template>

<script>
    /* eslint-disable no-console */
    import m_footer from '../components/mFooter';
    import m_uer_details from '../components/mUserDetails';
    import m_case_list from '../components/mCaseList';

    export default {
        name: "CaseDetails",
        components: {
            m_uer_details,
            m_case_list,
            m_footer
        },
        data() {
            return {
                // member: {},
                qList: [],
                selectId:null
            };
        },
        created() {
        },
        mounted() {

            const that = this;
            const id = that.$route.params.id;
            this.selectId=that.$route.params.id;
            this.axios.get(`${that.$API}/recommendList?committeeMemberId=${id}`, {})
                .then(function (response) {
                    that.qList = response.data.data;
                })
                .catch(function (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    that.$toast('获取失败6');
                });
        },
        methods: {
            onClickLeft() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            },
            goMessageBoard(id) {
                this.$router.push({path: '/messageBoard/'+ id})
            },
            goProposals(id) {
                this.$router.push({path: '/proposals/'+id})
            },


        },
        computed: {
            getRecommendList() {
                return this.$store.getters.recommendList;
            },
            getCommittee() {
                const that = this;
                const id = that.$route.params.id;
                const list = this.$store.getters.committeeList;
                console.log(list);
                return list.find(member => {
                    return member.id === id
                })
            }
        }
    }
</script>

<style scoped>
    .case_details_page {

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

    .van-nav-bar__text {
        color: black;

    }
</style>
