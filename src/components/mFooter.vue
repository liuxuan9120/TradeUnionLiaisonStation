<template>
    <div>
        <div style="background-color: white;position: fixed;bottom: 0;width: 100%;">
            <table>
                <tr>
                    <td>
                        <van-button icon="records" type="default" size="large" @click="goProposals(id)">提案征集
                        </van-button>
                    </td>
                    <td>
                        <van-button type="primary" size="large" @click="goMessageBoard(id)">向委员提问</van-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mFooter",
        props:[
            'id'
        ],
        methods:{
            goMessageBoard(id) {
                this.$router.push({path: '/messageBoard/'+id})
            },
            goProposals(id) {
                this.$router.push({path: '/proposals/'+id})
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
