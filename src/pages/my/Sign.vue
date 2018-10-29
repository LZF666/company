<template>
  <div >
    <topbar title="Sign In" :close="true"></topbar>
    <div class="sign">
      <input type="text" class="input-control email" v-model="params.email" placeholder="Email">
      <input type="password" class="input-control" v-model="params.password"  placeholder="Password">
      <div class="forget">
        <router-link  v-if="type === 'sign'" :to="{name: 'forgetpwd'}">Forgot password</router-link>
      </div>
      <div v-if="type === 'sign'">
        <div class="signin-btn" @click="sign(2)">Sign In</div>
        <div class="signin-btn signin-nocolor" @click="register(1)">Register</div>
      </div>
      <div v-if="type === 'register'">
        <div class="signin-btn" @click="register(2)">Register</div>
        <div class="signin-btn signin-nocolor" @click="sign(1)">Sign In</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 'sign',
      params: {
        touristToken: window.localStorage.getItem('touristToken') ||　'',
        email: '',
        password: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    // 注册
    register(type) {
      if (type === 1) {
        this.type = 'register';
        this.params.email = '';
        this.params.password = '';
      } else {
        // 请求
        if(!this.paramsValid()) {
          return;
        }
        this.request('UsersRegister', this.params).then((res) => {
          if(res.status === 200 && res.content) {
            window.localStorage && window.localStorage.setItem('userToken', res.content.token);
            window.localStorage && window.localStorage.setItem('userId', res.content.user_id);
            this.$router.go(-1);
          } else {
            this.$Toast(res.msg)
          }
        }, err => {
          this.$Toast(err)
        })
      }
    },
    sign(type) {
      if (type === 1) {
        this.type = 'sign';
        this.params.email = '';
        this.params.password = '';
      } else {
        if(!this.paramsValid()) {
          return;
        }
        // 请求
        this.request('UsersLogin', {
          email: this.params.email,
          password: this.params.password
        }).then((res) => {
          if(res.status === 200 && res.content) {
            window.localStorage && window.localStorage.setItem('userToken', res.content.token)
            window.localStorage && window.localStorage.setItem('userInfo', JSON.stringify({
              first_name: res.content.first_name,
              last_name: res.content.last_name,
              member_since: res.content.member_since,
              email: res.content.email
            }))
            this.$router.go(-1);
          } else {
            this.$Toast(res.msg)
          }
        }, err => {
          this.$Toast(err);
        })
      }
    },
    paramsValid() {
      const regemail = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
      if(!this.params.email) {
        this.$Toast('E-mail can not be empty');
        return false
      }
      if(!regemail.test(this.params.email)) {
        this.$Toast('E-mail format is incorrect');
        return false
      }
      if(!this.params.password) {
        this.$Toast('password no empty');
        return false
      }
      return true;
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';
.sign{
  margin-top: 90/@rem;
  padding: 0 45/@rem;
  .input-control{
    width: 660/@rem;
    height: 88/@rem;
    padding: 0 34/@rem;
    background:rgba(255,255,255,1);
    border:1px solid rgba(225,225,225,1);
    border-radius:44/@rem;
  }
  .email{
    margin-top: 103/@rem;
    margin-bottom: 40/@rem;
  }
  .signin-btn{
    width:660/@rem;
    height:88/@rem;
    background:rgba(255,71,60,1);
    border-radius:44/@rem;
    color: #fff;
    font-size: 32/@rem;
    line-height: 88/@rem;
    text-align: center;
  }
  .signin-nocolor{
    margin-top: 50/@rem;
    background-color: transparent;
    color: #010101
  }
  .forget{
    height: 24/@rem;
    margin: 22/@rem 34/@rem 30/@rem;
    a{
      color: #939399;
    }
  }
}
</style>


