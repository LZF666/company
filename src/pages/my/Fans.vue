<template>
 <div  style="background-color:  #F6F7F6">
  <topbar title="My Fans" backUrl="my"></topbar>
  <div class="my-fans">
    <ul class="c-header">
      <li class="h-t-1">Fans Info</li>
      <li class="h-t-2">Her fans</li>
      <li class="h-t-3">Benefit</li>
    </ul>
    <ul class="c-body">
      <li v-for="item in fans" class="clearfix">
        <div class="detail clearfix fl">
          <img v-lazy="item.image && item.image.ossimg()" class="avator fl">
          <div class="content fl">
            <p class="name">{{item.name}}</p>
            <p class="time">{{item.date}}</p>
          </div>
        </div>
        <div class="d-2 fl">{{item.sub_fans}}</div>
        <div class="d-3 fl">{{item.benefit}}</div>
      </li>
    </ul>
  </div>
 </div>
</template>
<script>
export default {
  data() {
    return {
      fans: [],
      page: 1,
      total_page: 1
    }
  },
  mounted() {
    this.getFans();
  },
  methods: {
    // 累计收益
    getFans() {
      this.request('PersonalFans', {
        page: this.page
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.fans = res.content.incomes || [];
          this.total_page = res.content.total_page
        }
      }, err => {
        this.$Toast(err.data.msg);
      })
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.my-fans{
  background-color: #fff;
  margin-top: 110/@rem;
  padding: 0 20/@rem;
  .detail{
    width: 370/@rem;
    padding-top: 26/@rem;
    .name{
      font-size: 30/@rem;
      margin-top: 24/@rem;
    }
    .time{
      margin-top: 12/@rem;
      font-size: 18/@rem;
      color: #939399
    }
  }
  .c-body{
    li {
      height: 150/@rem;
    }
  }
  .c-header{
    height: 88/@rem;
    line-height: 88/@rem;
    li{
      float: left;
    }
  }
  .h-t-1 {
    width: 390/@rem;
    text-align: left
  }
  .h-t-2 {
    width: 180/@rem;
    text-align: left
  }
  .h-t-3 {
    width: 130/@rem;
    text-align: left
  }
  .avator{
    display: block;
    width: 100/@rem;
    height: 100/@rem;
    border-radius: 50%;
  }
  .content{
    padding-left: 10/@rem;
    overflow: hidden;
  }
  .d-2{
    width: 180/@rem;
    line-height: 150/@rem;
    padding-left: 30/@rem;
  }
  .d-3{
    padding-left: 20/@rem;
    width: 130/@rem;
    line-height: 150/@rem;
    color: #FF0000
  }
}
</style>


