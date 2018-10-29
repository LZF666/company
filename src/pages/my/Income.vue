<template>
  <div style="background-color:  #F6F7F6">
    <topbar :title="pageTitle" backUrl="my"></topbar>
    <div class="my-income">
      <div class="title">Detail</div>
      <ul class="income-list">
        <li v-for="item in incomes" class="income">
          <img v-lazy="item.image && item.image.ossimg()" alt="" class="avator">
          <div class="content fl">
            <p class="name ">{{item.type}}</p>
            <p class="detail ">{{item.description}}</p>
            <p class="time ">{{item.date}}</p>
          </div>
          <div class="price fr">{{item.amount > 0 ? '+ $' + Math.abs(item.amount) : '- $' + Math.abs(item.amount)}}</div>
        </li>
      </ul>
      <div class="empty" v-if="incomes.length === 0">
        No history so far
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      incomes: [],
      type: 0,
      page: 1,
      total_page: 1,
      pageTitle: ''
    }
  },
  mounted() {
    this.type = this.$route.query.type;
    if(+this.type === 1) {
      this.getIncome();
      this.pageTitle = 'Accumulated Income'
    } else {
      this.getAccount();
      this.pageTitle = 'Wait for an account'
    }
  },
  methods: {
    // 累计收益
    getIncome() {
      this.request('PersonalIncome', {
        page: this.page
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.incomes = res.content.incomes || [];
          this.total_page = res.content.total_page
        }
      }, err => {
        this.$Toast(err.data.msg);
      })
    },
    // 待入账
    getAccount() {
      this.request('PersonalAccount', {
        page: this.page
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.incomes = res.content.incomes || [];
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
.my-income {
  background-color: #fff;
  margin-top: 110/@rem;
  padding: 0 20/@rem;
  .title{
    height:92/@rem;
    line-height: 92/@rem;
    background:rgba(254,254,254,1);
    box-shadow:1px 0px 0px rgba(240,240,243,1);
  }
  .income{
    box-sizing: border-box;
    height: 150/@rem;
    padding: 24/@rem 0/@rem;
  }
  .avator{
    width: 100/@rem;
    height: 100/@rem;
    border-radius: 50%;
    float: left;
  }
  .content{
    margin-left: 10/@rem;
  }
  .name{
    color: #302F2F;
    font-size: 28/@rem;
  }
  .detail{
    color: #939399;
    font-size: 22/@rem;
    margin: 10/@rem 0 15/@rem;
  }
  .time{
    color: #939399;
    font-size: 22/@rem;
  }
  .price{
    color: #FF0000;
    font-size: 28/@rem;
    line-height: 100/@rem;
    font-weight: 400
  }
   .empty{
    color: #302F2F;
    font-size: 28/@rem;
    padding-top: 37/@rem;
    padding-bottom: 50/@rem;
  }

}
</style>


