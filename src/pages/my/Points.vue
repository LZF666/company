<template>
  <div>
    <topbar title="My Points"></topbar>
    <div class="my-points">
      <div class="point-null">
        <i class="iconfont points-icon">&#xe64a;</i>
        <div class="detail">
          <div class="points"><span class="zero">{{personal_integral}}</span>Points</div>
          <p><i class="iconfont icon">&#xe60c;</i>One point equals to U.S $0.01</p>
        </div>
      </div>
      <div class="history">
        <div class="title">History</div>
        <div class="content">
          <div class="content-list" v-if="integral.length > 0">
            <div class="clearfix content-item"  v-for="item in integral">
              <div class="fl">
                <p class="c-a">{{item.source_type}}</p>
                <div class="c-b">{{item.created_at}}</div>
              </div>
              <span class="fr c-c" :class="Number(item.integral) > 0 ? 'add' : 'reduce'">{{item.integral}}</span>
            </div>
          </div>
          <div class="empty" v-if="integral.length === 0">
             No history so far
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return  {
      personal_integral: 0,
      integral: [], // 历史纪录
      params: {
        page: 1
      }
    }
  },
  created() {},
  mounted() {
    this.getPoints();
  },
  methods: {
    getPoints: function() {
      this.request('PersonalIntegral', this.params).then((res) => {
        if(res.status === 200 && res.content) {
          this.integral = res.content.integral;
          this.personal_integral = res.content.personal_integral;
        }
      }, err => {
        this.$Toast(err);
      })
    }
  }
}
</script>
<style lang="less">
  @import "~less/tool.less";
  .my-points {
    padding-top: 90/@rem;
    .point-null {
      height: 230/@rem;
      padding-top: 73/@rem;
      // border-bottom: 1px solid #939399;
      background:rgba(254,254,254,1);
      box-shadow:1px 0px 0px rgba(240,240,243,1);
    }
    .points-icon{
      color: #fff;
      font-size: 42/@rem;
      text-align: center;
      line-height: 86/@rem;
      margin-right: 28/@rem;
      position: absolute;
      left: 51/@rem;
      display: block;
      width: 86/@rem;
      height: 86/@rem;
      border-radius: 50%;
      background-color: #FACC31;
      margin-top: 0;
    }
    .detail{
      padding-left: 165/@rem;
      .icon{
        font-size: 32/@rem;
        margin-right: 7/@rem;
      }
    }
    .zero{
      display: inline-block;
      font-size: 64/@rem;
      color: #000;
      margin-right: 20/@rem
    }
    .points{
      margin-bottom: 20/@rem;
      color: #000;
    }
    .history {
      margin-top: 20/@rem;
      background: #fff;
      .title{
        padding: 0 20/@rem;
        line-height: 92/@rem;
        font-size:28/@rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #939399
      }
      .content{
        padding: 37/@rem 20/@rem;
        color: #302F2F;
        font-size: 28/@rem;
        font-family:PingFangSC-Regular;
      }
      .content-item{
        height: 115/@rem;
      }
      .c-a{
        color: #302F2F;
        font-size:28/@rem;
      }
      .c-b {
        color: #939399;
        font-size: 18/@rem;
        margin-top: 20/@rem;
      }
      .add{
        display: block;
        line-height: 115/@rem;
        color: #FF0000
      }
      .reduce{
        display: block;
        line-height: 115/@rem;
        color: #9ABD00
      }
    }
  }
</style>


