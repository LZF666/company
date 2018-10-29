<template>
  <div>
    <topbar title="My Coupons"></topbar>
    <div class="my-coupon">
      <div class="c-search">
        <input type="text" v-model="redeemCode" class="s-input" placeholder="Enter promo code here"/>
        <div class="search-btn" @click="getCouponList">Applay</div>
      </div>
      <div class="coupon-list" v-if="couponList && couponList.length > 0">
        <!-- 优惠券状态 1-可用 2-未开始 3-已过期未使用 4-已使用 -->
        <div class="coupon-item" :class="item.datestatus === 1 ? 'able': 'disable'" v-for="item in couponList" :key="item.id">
          <p class="title">${{item.price}} OFF</p>
          <p class="desc">For a purchase over ${{item.use_price}}</p>
          <p class="use-time">{{item.startdate}} - {{item.enddate}}</p>
          <div class="use-flag-img" :class="{'expired': item.datestatus === 3, 'used': item.datestatus === 4}"></div>
        </div>
      </div>
      <pageempty :margin-top="185" v-if="couponList && couponList.length === 0" icon="&#xe691;" desc="You don‘t have any available coupons now!"></pageempty>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchContent: '',
      couponList: [],
      redeemCode: ''
    }
  },
  created() {},
  mounted() {
    this.getCouponList();
  },
  methods: {
    getCouponList() {
      this.request('CouponList', {
        redeemCode: this.redeemCode
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.couponList = res.content.coupons || [];
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
.my-coupon{
  padding-top: 90/@rem;
  .c-search{
    margin-top: 20/@rem;
    position: relative;
    padding: 0 33/@rem;
    height: 80/@rem;
    line-height: 80/@rem;
  }
  .s-input{
    width: 684/@rem;
    height:100%;
    padding: 0 22/@rem;

  }
  .search-btn{
    position: absolute;
    right: 20/@rem;
    top: 0;
    width:140/@rem;
    height:80/@rem;
    line-height: 80/@rem;
    font-size: 28/@rem;
    text-align: center;
    background:rgba(216,216,219,1);
    border:1px solid rgba(240,240,243,1);
    background-color: #D8D8DB;
    color: #fff;
  }
  .coupon-list{
    padding: 0 34/@rem;
  }
  .coupon-item{
    height: 240/@rem;
    margin-top: 20/@rem;
    padding-left: 44/@rem;
    position: relative;
    background: url('data:image/png;base64,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') no-repeat center center;
    background-size: cover;
    .title{
      line-height:56/@rem;
      font-size:60/@rem;
      font-family:PingFangSC-Regular;
      font-weight:bold;
      font-style:italic;
      color:rgba(255,71,60,1);
      padding-top: 32/@rem;
    }
    .desc{
      color: #000000;
      font-size: 32/@rem;
      line-height:40/@rem;
      margin-top: 16/@rem;
      font-weight: 400
    }
    .use-time{
      color:#939399;
      font-size: 24/@rem;
      margin-top: 50/@rem;
    }
    &.disable{
      .title, .desc, .use-time{
        color: #939399 !important;
      }
    }
    .use-flag-img{
      position: absolute;
      right: 0;
      width: 147/@rem;
      height: 129/@rem;
      bottom: -10/@rem;
    }
    .used{
      background: url('../../images/my/coupon_used.png') no-repeat center center;
      background-size: cover;
    }
    .expired{
      background: url('../../images/my/coupon_expired.png') no-repeat center center;
      background-size: cover;
    }
  }
}
</style>