<template>
  <div>
    <topbar title="Order Details"></topbar>
    <div class="order-detail">
      <div class="page-title">
        {{orderDesc}}
      </div>
      <div class="address">
        <i class="iconfont address-icon">&#xe651;</i>
        <p class="user"><span class="name">{{name}}</span><span>{{telephone.toString().slice(0, 3)}}*****{{telephone.toString().slice(7, 10)}}</span></p>
        <p class="adddress-detail">Ship to：{{address}}</p>
      </div>
      <div  class="my-order-list">
        <div class="top">
          <p class="order-id">Order: {{orderid}}</p>
          <p class="order-time">Date: {{ordertime}}</p>
        </div>
        <router-link :to="{path: '/detail?id=' + item.id}" class="detail" v-for="item in ordergoods">
          <div class="img fl">
            <img v-lazy="item.img && item.img.ossimg()">
          </div>
          <div class="info fl">
            <div class="title">{{item.name}}</div>
            <div class="sku" v-for="(ele, index) in item.sku_value">{{ele}}</div>
            <div class="price">${{item.price}}</div>
            <div class="num">x {{item.num}}</div>
          </div>
        </router-link>
      </div>
      <div>
        <p class="o-price"><span class="fl">Subtotal:</span><span class="fr">${{parseFloat(finalAmount - shipping).toFixed(2)}}</span></p>
        <p class="o-price"><span class="fl">Shipping：Free</span><span class="fr">$ {{shipping}}</span></p>
        <p class="o-price total"><span class="fl">All Total：</span><span class="fr">${{finalAmount}}</span></p>
      </div>
      <div class="operate clearfix">
        <!-- 订单状态(订单状态 1-待付款 3-待发货 4-待收货 5-交易完成 6-交易取消 ) -->
        <!-- TODO 代付款  按钮是红色   其他时候都是正常颜色 -->
        <div class="operate-item operate-two" v-if="orderHandle.pay" @click="payMoney">Pay now {{this.finalTime}}</div>
        <div class="operate-item operate-two" @click="handleCollect" v-if="orderHandle.collect">I get it</div>
        <div class="operate-item" @click="getLogistics" v-if="orderHandle.logistic">Logistics Info</div>
        <div class="operate-item" v-if="orderHandle.delete" @click="handleDelete">Delete</div>
      </div>
    </div>
    <confirm :show.sync="confirmModal.show" :title="confirmModal.title"  :content="confirmModal.content" :on-ok="confirmModal.action"  okText="Yes"></confirm>
  </div>
</template>
<script>
import order from './Order'
export default {
  components: { order },
  data() {
    return {
      orders: [],
      ordergoods: [],
      orderid: '',
      ordertime: '',
      finalAmount: 0,
      shipping: '',
      name: '',
      telephone: '',
      address: '',
      orderStatusDesc: '',
      orderDesc: '',
      orderHandle: {
        delete: false,
        pay: false,
        logistic: false,
        collect: false
      },
      finalTime: '',
      confirmModal: {},
      orderstatus: 0
    }
  },
  mounted() {
    this.orderid = this.$route.query.orderid;
    this.orderstatus = this.$route.query && this.$route.query.order_status || '';
    console.log(this.orderstatus)
    this.getOrderDetail();

  },
  computed: {},
  methods: {
    // 支付
    payMoney() {
      this.$router.push({
        path: '/cart/secure?orderId=' + this.orderid
      })
    },
    // 剩余时间倒计时
    getCountDown() {
      let orderTime = new Date(this.ordertime).getTime();
      const self = this;
      let timer = setInterval(function() {
        let now = new Date().getTime();
        let t = now - orderTime;
        let min = Math.floor((t / 60000) % 60);
        let sec = Math.floor((t / 1000) % 60);
        if (t > 0) {
          min = min < 10 ? '0' + min : min;
          sec = sec < 10 ? '0' + sec : sec;
        } else {
          clearInterval(timer);
        }
        self.finalTime = min + ':' + sec;
      }, 1000);
    },
    getOrderDesc() {
      let handle = {};
      if(+this.orderstatus === 1) {
        this.orderStatusDesc = 'Unpaid';
        this.orderDesc = 'Waiting for payment';
        // 待付款
        // 删除订单（delete）、支付（pay）
        handle.delete = true;
        handle.pay = true;
      } else if (+this.orderstatus === 3) {
        this.orderStatusDesc = 'Preparing';
        // 待发货 无操作
        this.orderDesc = 'Goods awaiting confirmation';
      } else if(+this.orderstatus === 4) {
        // 待收货
        this.orderStatusDesc = 'Shipped';
        this.orderDesc = 'Goods awaiting confirmation';
        // 确认收货、查看物流信息
        handle.logistic = true;
        handle.collect = true
      } else if (+this.orderstatus === 5) {
        this.orderStatusDesc = 'Delivered';
        this.orderDesc = 'Goods have been served'
      } else if (+this.orderstatus === 6) {
        this.orderStatusDesc = 'Cancelled';
        // 已取消
        this.orderDesc = 'Order cancelled';
        handle.delete = true;
      }
      this.orderHandle = handle;
    },
    // 订单详情
    getOrderDetail() {
      this.request('OrdersDetail', {
        order_id: this.orderid
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.ordergoods = res.content.ordergoods;
          this.orderstatus = res.content.orderstatus;
          this.orderid = res.content.orderid;
          this.ordertime = res.content.ordertime;
          this.finalAmount = res.content.final_amount;
          this.shipping = res.content.shipping;
          this.name = res.content.name;
          this.telephone = res.content.telephone;
          this.address = res.content.address;
          this.getOrderDesc();
          if(this.orderstatus === 1) {
            this.getCountDown();
          }
        }
      }, err => {
        this.$Toast(err.data.msg);
      })
    },
    // 确认收货
    handleCollect() {
      this.confirmModal = {
        show: true,
        title: 'Do you confirm receipt?',
        onText: 'Yes',
        content: `Confirm receipt can get ${Math.floor(this.finalAmount)} points!`,
        action: this.handleCollectCb
      }
    },
    // 确认收货 回调
    handleCollectCb() {
      this.request('OrdersSign', {
        order_id: this.orderid
      }).then((res) => {
        if(res.status === 200) {
          this.confirmModal.show = false;
          this.getOrderDetail();
          this.$Toast('success');
        }
      }, err => {
        this.$Toast(err)
      })
    },
    // 删除订单
    handleDelete() {
      this.request('OrdersDelete', {
        order_id: this.orderid
      }).then((res) => {
        if(res.status === 200) {
          this.confirmModal.show = false;
          this.getOrderDetail();
          this.$Toast(res.msg)
        }
      }, err => {
        this.$Toast(err)
      })
    },
    // 物流信息
    getLogistics() {
      this.$router.push({
        name: 'logistics',
        query: {
          order_id: this.orderid
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.order-detail{
  margin-top: 90/@rem;
  background-color: #fff;
  .page-title{
    color: #fff;
    height: 128/@rem;
    line-height: 128/@rem;
    background-color: #FC5866;
    font-size: 36/@rem;
    text-align: left;
    padding-left: 50/@rem;
  }
  .o-price{
    width: 100%;
    height: 48/@rem;
    color: #939399;
    font-size: 24/@rem;
    line-height: 48/@rem;
    padding: 0 20/@rem;
    span{
      display: block;
    }
  }
  .total{
    span:nth-child(1){
      color: #050505;
    }
    span:nth-child(2){
      color: #FF473C;
    }
  }
  .address{
    position: relative;
    height: 117/@rem;
    padding-left: 70/@rem;
    box-shadow:0px 1px 0px 0px rgba(221,220,220,1);
    padding-top: 27/@rem;
    .address-icon{
      position: absolute;
      top: 43/@rem;
      left: 20/@rem;
      color: #939399;
      font-size: 33/@rem;
    }
    .user{
      color: #131313;
      font-size: 28/@rem;
      span{
        display: inline-block
      }
      .name{
        margin-right: 30/@rem;
      }
    }
    .adddress-detail{
      margin-top: 6/@rem;
    }
  }
  .my-order-list {
    background-color: #fff;
    .top {
      position: relative;
      width: 100%;
      height: 100/@rem;
      padding: 10/@rem 70/@rem;
      color: #939399;
      font-size: 24/@rem;
      margin-bottom: 20/@rem;
      p{
        line-height: 44/@rem;
      }
    }
    .detail {
      display: block;
      padding: 0 20/@rem;
      margin-bottom: 18/@rem;
      // margin-top: 20/@rem;
      .clearfix();
      .img, img {
        .wh(148, 148);
        background-size: 100%;
      }
      .info {
        position: relative;
        margin-left: 20/@rem;
        width: 540/@rem;
        .title {
          .height(50);
          .line1();
        }
        .sku {
          .height(45);
          color: @gray2;
        }
        .price {
          position: absolute;
          top: 55/@rem;
          right: 0;
        }
        .num {
          position: absolute;
          top: 95/@rem;
          right: 0;
          color: @gray2;
        }
      }
    }
  }
  .operate {
    position: relative;
    width: 100%;
    border-top: 1px solid #f0f0f3;
    .operate-item{
      margin: 20/@rem 10/@rem;
    }
    & > div {
      float: right;
      padding: 0 30/@rem;
      .height(60);
      border-radius: 50/@rem;
      border: 1px solid #e0e0e0;
      color: @gray2;
      text-align: center;
    }
    .operate-two {
      color: #FF473C
    }
  }
}
</style>

