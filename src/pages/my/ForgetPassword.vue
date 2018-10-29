<template>
  <div>
    <topbar title="Forgot Password"></topbar>
    <div class="forgetpwd-page">
      <input type="text" class="input-control" v-model="email" placeholder="Email">
      <p class="desc">Confirm your identity to reset password</p>
      <div class="submit-btn" @click="send">Submit</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    send() {
      if(!this.email) {
        this.$Toast('email no empty');
        return false
      }
      this.request('PwdReset', {
        email: this.email
      }).then((res) => {
        if (res.status === 200) {
          this.$router.push({
            name: 'forgetSendSuccess',
            query: {
              email: this.email
            }
          })
        }
      })
      
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.forgetpwd-page{
  padding: 174/@rem 45/@rem 0;
  .input-control {
    width: 660/@rem;
    height: 88/@rem;
    padding: 0 34/@rem;
    background:rgba(255,255,255,1);
    border:1px solid rgba(225,225,225,1);
    border-radius: 44/@rem;
  }
  .desc{
    padding-left: 34/@rem;
    margin: 20/@rem 0 70/@rem;
    color: #939399;
  }
  .submit-btn {
    width:660/@rem;
    height:88/@rem;
    background:rgba(255,71,60,1);
    border-radius:44px;
    font-size: 32/@rem;
    color: #fff;
    text-align: center;
    line-height: 88/@rem;
  }
}
</style>

