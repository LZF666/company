<template>
  <div class="my-order-main">
    <div class="no-order" v-if="!data">
      <div class="i-bg">
        <i class="iconfont">&#xe637;</i>
      </div>
      <p>You have no orders yet!</p>
    </div>
    <div class="my-order-list" v-else>
      <div class="top">
        <div class="time">Order ID：{{data.orderid}}</div>
        <div class="status">{{orderStatusDesc}}</div>
      </div>
      <router-link class="detail" v-for="item in data.ordergoods" :to="{ name: 'orderDetail', query: {orderid: data.orderid, order_status: data.orderstatus}}">
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
      <div class="operate clearfix">
        <!-- 订单状态(订单状态 1-待付款 3-待发货 4-待收货 5-交易完成 6-交易取消 ) -->
        <!-- TODO 代付款  按钮是红色   其他时候都是正常颜色 -->
        <div class="operate-item operate-two" v-if="orderHandle.pay">
          <router-link :to="{path: '/cart/secure?orderId=' + data.orderid}">Pay now {{this.finalTime}}</router-link>
        </div>
        <div class="operate-item operate-two" @click="handleCollect" v-if="orderHandle.collect">I get it</div>
        <div class="operate-item" @click="getLogistics" v-if="orderHandle.logistic">Logistics Info</div>
        <div class="operate-item" v-if="orderHandle.delete" @click="handleDelete">Delete</div>
      </div>
    </div>
    <confirm :show.sync="confirmModal.show" :title="confirmModal.title"  :content="confirmModal.content" :on-ok="confirmModal.action"  okText="Yes"></confirm>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    },
    operate: {
      type: Boolean,
      default: true
    },
    handleCb: {
      // 操作回调
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      orderStatusDesc: '',
      orderDesc: '',
      orderstatus: 0,
      orderHandle: {
        delete: false,
        pay: false,
        logistic: false,
        collect: false
      },
      confirmModal: {},
      orderHandle: [],
      finalAmount: 0,
      finalTime: 0,
    }
  },
  mounted() {
    this.orderstatus = this.data.orderstatus;
    this.orderid = this.data.orderid;
    this.getOrderDesc();
    if(this.data.orderstatus === 1) {
      this.getCountDown();
    }
  },
  methods: {
    getCountDown() {
      let orderTime = new Date(this.data.ordertime).getTime();
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
         // 删除订单（delete）、支付（pay）
        handle.delete = true;
        handle.pay = true;
      } else if (+this.orderstatus === 3) {
        this.orderStatusDesc = 'Preparing';
        this.orderDesc = 'Goods awaiting confirmation';
      } else if(+this.orderstatus === 4) {
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
        this.orderDesc = 'Order cancelled';
        handle.delete = true;
      }
      this.orderHandle = handle;
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
          this.handleCb && this.handleCb()
          this.$Toast('success');
        }
      }, err => {
        this.$Toast(err)
      })
    },
     // 确认收货
    handleDelete() {
      this.confirmModal = {
        show: true,
        type: 'confirm',
        content: 'Are you sure to delete the order？',
        action: this.handleDeleteCb
      }
    },
    // 删除订单
    handleDeleteCb() {
      this.request('OrdersDelete', {
        order_id: this.orderid
      }).then((res) => {
        if(res.status === 200) {
          // this.$Toast(res.msg)
          this.confirmModal.show = false;
          this.handleCb && this.handleCb();
        } else {
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
    },
    // 空对象判断
    emptyObj(obj) {
      var b = function() {
      for(var key in obj) {
        return false;
      }
        return true;
      }
    }
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.my-order-main {
  padding-bottom: 1px;
  margin-bottom: 18/@rem;
  .no-order {
    padding-top: 45/@rem;
    text-align: center;
    .i-bg {
      margin: 0 auto;
      width: 185/@rem;
      height: 185/@rem;
      background-color: #dedede;
      border-radius: 100%;
      i {
        .whl(160, 180);
        color: #fff;
        font-size: 120/@rem;
      }
    }
    p {
      margin-top: 25/@rem;
      font-size: 32/@rem;
      color: @gray2;
    }
  }
  .my-order-list {
    background-color: #fff;
  }
  .top {
    position: relative;
    width: 100%;
    .height(60);
    padding: 0 20/@rem;
    color: @gray2;
    .time {}
    .status {
      position: absolute;
      top: 0;
      right: 20/@rem;
    }
  }

  .detail {
    display: block;
    padding: 0 20/@rem;
    margin-bottom: 18/@rem;
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

  .operate {
    position: relative;
    width: 100%;
    border-top: 1px solid #f0f0f3;
    .operate-item{
      margin: 20/@rem;
    }
    & > div {
      float: right;
      margin-right: 20/@rem;
      .height(60);
      padding: 0 30/@rem;
      border-radius: 50/@rem;
      border: 1px solid #e0e0e0;
      color: @gray2;
      text-align: center;
    }
    .operate-one {
      right: 200/@rem;
    }
    .operate-two {
      right: 20/@rem;
      color: #FF473C;
      a {
        color: #FF473C;
      }
    }
  }

}
</style>
