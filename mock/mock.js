/**
 * @note   setOnline 线上接口 配置
 * @param  name  本地接口名
 *         type  接口类型
 *         url   线上接口地址
 */
var fs = require('fs');
var setOnline = [
  {
    name: 'home',
    type: 'post',
    url: '/home'
  },
  {
    name: 'regionIndex',
    type: 'post',
    url: '/region/index'
  },
  {
    name: 'cartMultipleStoreCartInfo',
    type: 'post',
    url: '/cartMultipleStore/cartInfo'
  },
  {
    name: 'cartCartInfo',
    type: 'post',
    url: '/cart/cartInfo'
  },
  {
    name: 'cartCombineCartInfo',
    type: 'post',
    url: '/cart/combineCartInfo'
  },
  {
    name: 'detail',
    type: 'post',
    url: '/detail'
  },
  {
    name: 'cartCartTotalCount',
    type: 'post',
    url: '/cart/cartTotalCount'
  },
  {
    name: 'addressDelete',
    type: 'post',
    url: '/address/delete'
  },
  {
    name: 'addressEditAddress',
    type: 'post',
    url: '/address/editAddress'
  },
  {
    name: 'addressDefaultAddress',
    type: 'post',
    url: '/address/defaultAddress'
  },
  {
    name: 'storeDecodeAddress',
    type: 'post',
    url: '/store/decodeAddress'
  },
  {
    name: 'personalIndex',
    type: 'post',
    url: '/personal/index'
  },
  {
    name: 'personalSelf',
    type: 'post',
    url: '/personal/self'
  },
  {
    name: 'personalEdit',
    type: 'post',
    url: '/personal/edit'
  },
  {
    name: 'paymentConfirmPayment',
    type: 'post',
    url: '/payment/confirmPayment'
  },
  {
    name: 'pinPinList',
    type: 'post',
    url: '/pin/pinList'
  },
  {
    name: 'listsNewList',
    type: 'post',
    url: '/lists/newList'
  },
  {
    name: 'listsPromotionList',
    type: 'post',
    url: '/lists/promotionList'
  },
  {
    name: 'listsPromotionList',
    type: 'post',
    url: '/lists/promotionList'
  },
  {
    name: 'pinGoodDetail',
    type: 'post',
    url: '/pin/goodDetail'
  },
  {
    name: 'pinPinDetail',
    type: 'post',
    url: '/pin/pinDetail'
  },
  {
    name: 'searchSearchlist',
    type: 'post',
    url: '/search/searchlist'
  },
  {
    name: 'homeStoreList',
    type: 'post',
    url: '/home/storeList'
  },
  {
    name: 'listsGoodslist',
    type: 'post',
    url: '/lists/goodslist'
  },
  {
    name: 'personalIntegral',
    type: 'post',
    url: '/personal/integral'
  },
  {
    name: 'couponIndex',
    type: 'post',
    url: '/coupon/index'
  },
  {
    name: 'couponExchange',
    type: 'post',
    url: '/coupon/exchange'
  },
  {
    name: 'orderOrderList',
    type: 'post',
    url: '/order/orderList'
  },
  {
    name: 'orderOrderDetail',
    type: 'post',
    url: '/order/orderDetail'
  },
  {
    name: 'orderOrderDetail',
    type: 'post',
    url: '/order/orderDetail'
  },
  {
    name: 'orderOrderSignIntegral',
    type: 'post',
    url: '/order/orderSignIntegral'
  },
  {
    name: 'orderDelOrder',
    type: 'post',
    url: '/order/delOrder'
  },
  {
    name: 'personalFinance',
    type: 'post',
    url: '/personal/finance'
  },
  {
    name: 'rechargeGetAllRecharge',
    type: 'post',
    url: '/recharge/getAllRecharge'
  },
  {
    name: 'storeGetStore',
    type: 'post',
    url: '/store/getStore'
  },
  {
    name: 'storeSearchStore',
    type: 'post',
    url: '/store/searchStore'
  },
  {
    name: 'categoryGetcate',
    type: 'post',
    url: '/category/getcate'
  },
  {
    name: 'codeValiTokenCode',
    type: 'post',
    url: '/code/valiTokenCode'
  },
  {
    name: 'weixinGetJsApiSign',
    type: 'post',
    url: '/weixin/getJsApiSign'
  },
  {
    name: 'logStoreHistory',
    type: 'post',
    url: '/log/storeHistory'
  },
  {
    name: 'commentCommentlist',
    type: 'post',
    url: '/comment/commentlist'
  },
  {
    name: 'success',
    type: 'post',
    url: '/login/passwordFreeCodeLogin'
  },
  {
    name: 'success',
    type: 'post',
    url: '/login/passwordFreeLogin'
  }
];

// 输出配置项
exports.setOnline = setOnline;

// 遍历输出json数据
for (var i = 0, len = setOnline.length; i < len; i++) {
  (function() {
    var name = setOnline[i].name;

    exports[name] = function(req, res) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      fs.readFile('./mock/' + name + '.json', function(err, data) {
        if (err) throw err;

        res.json(JSON.parse(data));
      });
    };
  })(i);
}
