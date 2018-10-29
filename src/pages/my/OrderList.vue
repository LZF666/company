<template>
  <div class="c-order">
    <topbar title="Orders List" backUrl="my"></topbar>
    <ul class="order-tabs">
      <li v-for="item in tabs" :key="item.type" @click="tabClick(item)">
        <a href="javascript:;" :class="{'active': item.active}">{{item.name}}</a>
      </li>
    </ul>
    <div class="order-list">
      <order :handle-cb="getOrderList" v-for="(item, index) in orders" :data="item" :key="index" v-if="orders.length"></order>
      <pageempty icon="&#xe637;" :margin-top="200" desc="You have no related orders yet!" v-if="orders.length === 0" ></pageempty>
    </div>
  </div>
</template>
<script>
import order from './Order'
export default {
  data() {
    return {
      tabs: [
        {
          name: 'Unpaid',
          active: false,
          type: 1
        },
        {
          name: 'Shipping',
          active: false,
          type: 4
        },
        {
          name: 'All',
          active: true,
          type: 0
        }
      ],
      orders: [],
      params: {
        type: ''
      }
    }
  },
  mounted() {
    this.getOrderList();
  },
  components: { order },
  methods: {
    tabClick(item) {
      this.tabs.forEach(element => {
        element.active = false;
      });
      item.active = true;
      this.params.type = item.type;
      this.getOrderList();
    },
    getOrderList() {
      this.request('OrdersList', this.params).then((res) => {
        if(res.status === 200) {
          this.orders = res.content.orderData || [];
        } else {
          this.$Toast(res.msg);
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
.c-order{
  padding-top: 90/@rem;
  .order-tabs{
    padding: 0 5/@rem;
    height: 88/@rem;
    background:rgba(255,255,255,1);
    border: 1px solid rgba(240,240,243,1);
    li{
      width: 33%;
      height: 100%;
      float: left;
      text-align: center;
      font-size: 30/@rem;
      color: #131313;
      line-height: 88/@rem;
      .active{
        display: inline-block;
        padding: 0 15/@rem;
        color: #FF473C;
        height: 100%;
        border-bottom: 4/@rem solid #FF473C;
      }
    }
  }
}
</style>

