<template>
    <div>
        <div style="background-color: white;position: fixed;bottom: 0;width: 100%;">
            <table>
                <tr>
                    <td>
                        <van-button icon="records" type="default" size="large" @click="goProposals">提案征集
                        </van-button>
                    </td>
                    <td>
                        <van-button type="primary" size="large" @click="goMessageBoard">向委员提问</van-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mFooter",
        methods:{
            goMessageBoard() {
                this.$router.push({path: '/messageBoard'})
            },
            goProposals() {
                this.$router.push({path: '/proposals'})
            },
        }
    }
</script>

<style scoped>
    table, tr {
        width: 100%;
    }

    td {
        width: 50%;
        padding: 0;
    }
</style>
