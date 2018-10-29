<template>
  <div>
    <topbar title="My Balance" backUrl="my"></topbar>
    <div class="finance">
      <div class="finance-count">
        <div class="icon"><i class="iconfont">&#xe694;</i></div>
        <div class="number">{{money}}</div>
      </div>
      <div class="finance-detail">
        <div class="title">The detail</div>
        <div class="detail-list">
          <div v-for="item in finance" class="detail-item">
            <p class="item item1 clearfix"><span class="name fl">{{item.operate_type}}</span><span class="time fr">{{item.created_at}}</span></p>
            <p class="item item2 clearfix"><span class="detail fl">{{item.operate_description}}</span><span class="price fr" :style="{'color': item.amount > 0 ? '#FF0000' : '#9ABD00'}">{{item.amount > 0 ? '+ $' + Math.abs(item.amount) : '- &' + Math.abs(item.amount)}}</span></p>
          </div>
         
        </div>
        <div class="empty" v-if="finance.length === 0">
          No history so far
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: 0.00,
      finance: []
    }
  },
  mounted() {
    this.getFinanceDetail();
  },
  methods: {
    getFinanceDetail() {
      this.request('PersonalFinance').then((res) => {
        if(res.status === 200) {
          this.money = res.content.money ;
          this.finance = res.content.finance || [];
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.finance{
  position: relative;
  padding-top: 90/@rem;
  .finance-count {
    height: 230/@rem;
    background: #fff;
  }
  .icon{
    position: absolute;
    top: 172/@rem;
    left: 52/@rem;
    height: 84/@rem;
    width: 84/@rem;
    line-height: 84/@rem;
    border-radius: 84/@rem;
    background-color: #FF473C;
    font-weight:400;
    color: #fff;
    text-align: center
  }
  .number{
    color: #000000;
    font-size: 64/@rem;
    padding-left: 165/@rem;
    padding-top: 84/@rem
  }
  .finance-detail{
    margin-top: 20/@rem;
    padding: 0 20/@rem;
    background: #fff;
    .title{
      color: #939399;
      font-size: 28/@rem;
      height: 92/@rem;
      line-height: 92/@rem;
      background:rgba(254,254,254,1);
      box-shadow:1px 0px 0px rgba(240,240,243,1);
    }
    .detail-list{
      .detail-item{
        box-sizing: border-box;
        width: 100%;
        height: 115/@rem;
        padding-top: 22/@rem;
      }
      .name{
        font-size: 28/@rem;
        color: #302F2F;
      }
      .time{
        color: #939399;
        font-size: 22/@rem;
      }
      .detail{
        color: #939399;
        font-size: 22/@rem;
      }
      .price{
        font-size: 28/@rem;
        color: #FF0000;
        font-weight: 400;
      }
      .item1{
        line-height: 37/@rem;

      }
      span{
        display: inline-block;
      }
      
    }
    .empty{
      color: #302F2F;
      font-size: 28/@rem;
      padding-top: 37/@rem;
      padding-bottom: 50/@rem;
    }
  }
}
</style>


