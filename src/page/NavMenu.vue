<template>
    <div class="nav-menu">
        <div>
            <span>服务大厅</span>
        </div>
<!--        <van-grid square :column-num="3" :gutter="2">-->
<!--            <van-grid-item-->
<!--                    v-for="value in 6"-->
<!--                    :key="value"-->
<!--                    icon="photo-o"-->
<!--                    text="文字"-->
<!--            />-->
<!--        </van-grid>-->
      <table class="nav-item-tab">
          <tr class="nav-item-tr">
              <td class="nav-item-td"><div>法律维权</div></td>
              <td><div>互助保障</div></td>
              <td><div>疗休养</div></td>
          </tr>
          <tr>
              <td><div>青年交友</div></td>
              <td><router-link :to="{name:'MemberList'}" ><div>留言墙</div></router-link></td>
              <td><div>工会热线</div></td>
          </tr>

      </table>
        <div>
            <span>活动列表</span>
        </div>

        <table class="nav-item-tab">
            <tr class="nav-item-tr">
                <td class="nav-item-td"><div>电子书屋</div></td>
                <td><div>文化艺术</div></td>
                <td><div>体育健身</div></td>
            </tr>
            <tr>
                <td><div>电影票</div></td>
                <td><div>积分兑换</div></td>
                <td><div>技协帮</div></td>
            </tr>

        </table>
        <div>
            <span>服务指南</span>
        </div>
        <table class="nav-item-tab">
            <tr class="nav-item-tr">
                <td class="nav-item-td"><div>我要入会</div></td>
                <td><div>妈咪小屋</div></td>
                <td><div>新闻阅读</div></td>
            </tr>


        </table>
    </div>


</template>

<script>
    export default {
        name: "NavMenu"
    }
</script>

<style scoped>
    a{
        color: #2c3e50;
        text-decoration: none;
    }
    .nav-menu >div{
      height: 30px;
        line-height: 30px;
    }
    .nav-menu{
        background-color: #f1f1f1;
    }
    .nav-item-tab{
        width: 100%;

    }
    .nav-item-tab tr{
        width: 100%;
    }
    .nav-item-tab tr td{
        width: 33.33%;
        height: 140px;
    }
    .nav-item-tab tr td div{
       background-color: white;
        width: 100%;
        height: 100%;
        line-height: 140px;
    }
</style>
