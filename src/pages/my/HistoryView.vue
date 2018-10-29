<template>
  <div class="history-view">
    <topbar title="History View" backUrl="my"></topbar>
    <goods-list :list="goodsList" v-if="goodsList.length"></goods-list>
    <pageempty icon="&#xe693;"  desc="Sorry, we couldn‘t find anything in your 
history" v-if="goodsList.length === 0" ></pageempty>
  </div>
</template>
<script>
import GoodsList from 'common/GoodsList'
export default {
  data() {
    return {
      goodsList: [],
      params: {
        page: 1,
        pageSize: 20
      },
      total: 0,
      totalPage: 1,
    }
  },
  components: { GoodsList },
  mounted() {
    // this.getHistorView();
  },
  methods: {
    getHistorView() {
      this.$http.get('/store/historyview').then((res) => {
        res = res.data;
        if(res.status === 1 && res.data) {
          this.goodsList = res.data.goods;
          // this.total = res.data.total;
          this.totalPage = res.data.totalPage
        }
      }, err => {
 
      }).catch((err) => {

      })
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";

.history-view{
  padding-top: 90/@rem;
}
</style>
