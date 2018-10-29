<template>
  <div>
    <topbar title="Logistics Details"></topbar>
    <div class="logistics">
      <div class="order-info clearfix">
        <img v-lazy="goodsImg.ossimg()" class="img fl">
        <div class="content fl">
          <p class="title">Logistics status: {{logisStatus}}</p>
          <p>Type of logistics：{{express}}</p>
          <p>Tracking number：<span id="orderid">{{expressNumber}}</span><span :data-clipboard-text="expressNumber" @click="copyOrderid" class="copy">COPY</span></p>
          <p>Official TEL：{{tel}}</p>
        </div>
      </div>
      <div class="logistics-list">
        <p class="l-title">Logistics info</p>
        <ul>
          <li class="l-detail" v-for="(item, index) in logisDetail">
            <span class="icon"></span>
            <span class="line-b" v-if="index < logisDetail.length -1"></span>
            <span class="line-t" v-if="index > 0"></span>
            <div class="info">
              <p>{{item.description}}</p>
              <p>{{item.date}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
export default {
  data() {
    return {
      orderId: '',
      goodsImg: '',
      expressNumber: '',
      express: '',
      logisStatus: '',
      tel: '',
      logisDetail: []
    }
  },
  mounted() {
    this.orderId = this.$route.query.order_id;
    this.getLogistics()
  },
  methods: {
    // 物流信息
    getLogistics() {
      this.request('OrdersLogDetail', {
        order_id: this.orderId
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.logisDetail = res.content.detail;
          this.goodsImg = res.content.img;
          this.expressNumber = res.content.number;
          this.express = res.content.type;
          this.logisStatus = res.content.status;
          this.tel = res.content.tel;
        }
      }, err => {
        this.$Toast(err)
      })
    },
    // 复制订单号
    copyOrderid() {
      const clipboard = new Clipboard('.copy');
      clipboard.on('success', e => {
        console.log('复制成功');
        this.$Toast('Successful copy');
        // 释放内存
        clipboard.destroy();
      })
      clipboard.on('error', e => {
        this.$Toast('Replication failed');
        // 不支持复制
        console.log('该浏览器不支持自动复制');
        // 释放内存
        clipboard.destroy();
      })
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.logistics{
  .order-info{
    padding: 30/@rem 20/@rem;
    height: 210/@rem;
    margin-top: 90/@rem;
    .img{
      width: 148/@rem;
      height: 148/@rem;
      float: left;
    }
    .content{
      margin-left: 17/@rem;
      position: relative;
      width: 500/@rem;
      .title{
        color: #131313;
        font-size: 28/@rem;
        line-height: 42/@rem;
      }
      p{
        color: #939399;
        font-size: 20/@rem;
        line-height: 40/@rem;
      }
      .copy{
        // position: absolute;
        // right: 55/@rem;
        // top: 0;
        float: right;
        display: block;
        width:72/@rem;
        height:40/@rem;
        line-height: 38/@rem;
        font-size: 22/@rem;
        border:1px solid rgba(147,147,153,1);
        border-radius:22/@rem;
        text-align: center;
      }
    }
  }
  .logistics-list{
    margin-top: 10/@rem;
    padding: 33/@rem 20/@rem;
    color: #939399;
    li:first-child{
      color: #038B44;
      .icon{
        background-color: #3F966A;
      }
    }
    .l-title{
      color: #040404;
      font-size: 28/@rem;
    }
    .l-detail{
      position: relative;
      padding-left: 77/@rem;
      .icon{
        position: absolute;
        left: 40/@rem;
        top: 50%;
        width: 12/@rem;
        height: 12/@rem;
        border-radius: 50%;
        background-color: #939399;
      }
      .line-b{
        position: absolute;
        left: 44/@rem;
        top: 62/@rem;
        width: 1px;
        height: 60/@rem;
        background-color: #939399;
      }
      .line-t{
        position: absolute;
        left: 44/@rem;
        top: 0/@rem;
        width: 1px;
        height: 60/@rem;
        background-color: #939399;
      }
      .info{
        padding: 26/@rem 0;
        p:nth-child(2) {
          margin-top: 12/@rem;
        }
        border-bottom: 1px solid #E4E4E4;
      }
    }
  }
}
</style>


