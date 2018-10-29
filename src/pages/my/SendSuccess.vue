<template>
  <div>
    <topbar title="Forgot Password" backUrl="my"></topbar>
    <div class="sendEmail-page">
      <p class="title">Successfully sent</p>
      <p class="desc">An email with the reset link has been sent to <span style="color: #000">{{email}}</span></p>
      <div class="submit-btn" @click="resend">Return to sign in</div>
      <div class="foot">
          Didn’t get the email? <a href="javascript:;" class="resend" 
          @click="resend">Resend</a>
      </div>
    </div>
    <confirm :show.sync="confirmModal.show" :type="confirmModal.type" :on-ok="confirmModal.action" :title="confirmModal.title" :content="confirmModal.content" :ok-text="confirmModal.onText">
    </confirm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      confirmModal: {
        show: false,
        title: '',
        content: '',
        onText: 'yes',
        action: () => {}
      }
    }
  },
  mounted() {
    this.email = this.$route.query.email || ''
  },
  methods: {
    // 重发
    resend() {
      this.confirmModal = {
        show: true,
        type: 'alert',
        title: '',
        onText: 'ok',
        content: `we've send an email to ${this.email} with this instructions to you rsent you password`,
        action: this.resendCB
      }
    },
    resendCB() {
      this.request('PwdReset', {
        email: this.email
      }).then((res) => {
        if (res.status === 200) {
          this.confirmModal.show = false;
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.sendEmail-page{
  padding: 100/@rem 45/@rem 0;
  .title{
    margin: 40/@rem 0;
    font-size: 28/@rem;
    color: #000;
    text-align: center;
  }
  .desc{
    width: 550/@rem;
    margin: 0 auto;
    color: #939399;
  }
  .submit-btn {
    width:660/@rem;
    height:88/@rem;
    margin-top: 76/@rem;
    background:rgba(255,71,60,1);
    border-radius:44px;
    font-size: 32/@rem;
    color: #fff;
    text-align: center;
    line-height: 88/@rem;
  }
  .foot{
    margin-top: 17/@rem;
    text-align: center;
    color: #939399;
  }
}
</style>

