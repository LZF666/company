<template>
  <div class="profile-main">
    <TopBar :title="`Profile`" :backUrl="`my`"></TopBar>
    <ul class="profile-ul">
      <li class="first">
        <img class="head-img" :src="params.image">
        <div class="info">Edit</div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li>
        <div class="label">Full Name</div>
        <div class="info"><input type="text" v-model="params.name" placeholder="Full Name"></div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li @click.capture="onGenderChange">
        <div class="label">Gender</div>
        <div class="info">
          <input type="text" v-model="params.gender" readonly>
          <actionsheet cancelText="cancle" :actions="genders" v-model="actionsheetShow"></actionsheet>
        </div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li  @click.capture="openPicker">
        <div class="label">Date Of Birth</div>
        <div class="info">
          <input type="text" v-model="params.birth" readonly>
          <datetime-picker
          ref="birthPicker"
          type="date"
          confirmText="ok"
          cancelText="cancle"
          @confirm="birthConfirm"
          >
        </datetime-picker>
        </div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li>
        <div class="label">Telephone</div>
        <div class="info"><input type="text" v-model="params.phone" ></div>
        <i class="iconfont">&#xe62e;</i>
      </li>
       <li>
        <div class="label">Email</div>
        <div class="info"><input type="text" v-model="params.email" readonly></div>
      </li>
      <li @click="toAddress">
        <div class="label">Shipping Address</div>
        <div class="info"></div>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li @click="signOut">
        <div class="label">Sign Out</div>
        <i class="iconfont">&#xe62e;</i>
      </li>
    </ul>
    <div class="btn" @click="personalEdit">SAVE</div>
    <confirm :show.sync="confirmModal.show" :content="confirmModal.content" :on-ok="confirmModal.action"></confirm>
  </div>
</template>

<script>
import { Actionsheet, DatetimePicker } from 'mint-ui';
import TopBar from 'common/TopBar.vue';
import { formatToHMS } from 'components/utils/date.js';
export default {
  name: 'cart',
  components: {
    TopBar,
    Actionsheet,
    DatetimePicker
  },
  data () {
    return {
      params: {
        birth: '',
        gender: 'Man'
      },
      actionsheetShow: false,
      dateTimePickerShow: false,
      genders: [
        {
          name: 'Man',
          method: this.genderSelect
        },
         {
          name: 'Female',
          method: this.genderSelect
        }
      ],
      confirmModal: {
        show: false
      }
    };
  },
  mounted () {
    this.getUserInfo();
  },
  watch: {},
  methods: {
    getUserInfo() {
      // 表单校验
      this.request('PersonalInfo').then((res) => {
        if (res.status === 200 && res.content) {
          this.params = res.content;
          if (this.params.birth) {
            this.params.birth = formatToHMS(this.params.birth);
          }
        }
      }, err => {
        this.$Toast(err);
      })
    },
    onGenderChange() {
      this.actionsheetShow = !this.actionsheetShow;
    },
    genderSelect(type) {
      this.params.gender = type.name;
    },
    // 打开日期选择器
    openPicker() {
      this.$refs.birthPicker.open();
    },
    birthConfirm(value) {
      this.params.birth = formatToHMS(value);
      // console.log(formatToHMS(value))
    },
    pickerCancle() {
      this.$refs.birthPicker.close();
    },
    // 退出
    signOut() {
      this.confirmModal = {
        show: true,
        type: 'confirm',
        content: 'Are you sure to sign out',
        action: this.signOutCb
      }
    },
    signOutCb() {
      this.confirmModal.show = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
      localStorage.removeItem('touristToken');
      this.$router.go(-1)
    },
    toAddress() {
      this.$router.push({
        name: 'shippingAddress'
      })
    },
    // 修改资料
    personalEdit() {
      this.request('PersonalEdit', this.params).then((res) => {
        if (res.status === 200 && res.content) {
          this.$router.push({
            name: 'my'
          })
        } else {
          this.$Toast(res.msg);
        }
      }, err => {
        this.$Toast(err);
      })
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.profile-main {
  padding-top: 92/@rem;
  .profile-ul {
    background-color: #fff;
    display: block;
    li {
      .clearfix();
      position: relative;
      width: 100%;
      .height(86);
      padding: 0 20/@rem;
      border-bottom: 1px solid @gray3;
      font-size: 26/@rem;
    }
    .first {
      height: 152/@rem;
    }
    .head-img {
      margin-top: 20/@rem;
      .wh(110, 110);
      background-size: 100%;
    }
    .label {
      float: left;
      width: 250/@rem;
      text-align: left;
      color: @gray2;
    }
    .info, i {
      position: absolute;
      color: @gray2;
      input {
        color: @gray2;
        text-align: right;
        border: 0;
        box-shadow: none;
        outline: 0;
      }
    }
    .info {
      height: 88/@rem;
      line-height: 88/@rem;
      right: 60/@rem;
    }
    i {
      right: 15/@rem;
    }
    .first {
      .info {
        top: 45/@rem;
      }
      i {
        top: 45/@rem;
      }
    }
  }
  .btn {
    position: fixed;
    background-color: #fff;
    left: 60/@rem;
    bottom: 60/@rem;
    width: 630/@rem;
    border: 1px solid @red;
    border-radius: 5px;
    .height(98);
    font-size: 28/@rem;
    color: @red;
    text-align: center;
  }
}
</style>
