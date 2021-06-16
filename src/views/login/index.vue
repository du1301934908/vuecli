<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登陆" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" :rules="userFormRules.mobile" type='number' maxlength=11> 
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field name="code" placeholder="请输入验证码" v-model="user.code"
      :rules="userFormRules.code" type='number' maxlength=6>
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="1000 * 5" format="ss s" v-if="isCountDownShow" @finish='isCountDownShow = false'/>
          <van-button round size="small" type="default" class="send-sms-btn" @click='onSendSms' native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { login,sendSms } from "@/api/user.js";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "", // 手机号
        code: "", // 验证码
      },
      userFormRules: {
          mobile: [{ required: true, message: '手机号不能为空' },{pattern: /^1[3|5|7|8]\d{9}$/,message: '手机号格式错误'}],
          code: [{ required: true, message: '验证码不能为空' },{pattern: /^\d{6}$/,message:'验证码格式错误'}]
      },
      isCountDownShow: false   // 是否展示倒计时
    }
  },
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user;
      // 2.表单验证
    //   在组件中必须通过this.$toast 来调用Toast组件
      this.$toast.loading({
        message: "登陆中...",
        forbidClick: true,  // 禁用背景点击
        duration: 0   // 默认时间2000
      });
      // 3.提交表单请求登陆
      try {
        const { data } = await login(user);
        console.log("登陆成功", data);
        // vuex调用的方法$store.commit     可调用函数修改数值，也可调用参数使用this.$store.state.user;
            this.$store.commit('setUser',data.data)
            // console.log('vuex调用'+this.$store.state.user);
            this.$toast.success('登陆成功')
      } catch (err) {
        if (err.response.status === 400) {
            this.$toast.fail('手机号或验证码错误')
        } else {
            this.$toast.fail('登陆失败')
        //   console.log("登陆失败", err);
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    async onSendSms(){
        console.log(123);
        // 1.校验手机号
        try {
            // 验证表单，支持传入 name 来验证单个或部分表单项
            await this.$refs.loginForm.validate('mobile')
            console.log('验证通过');
        }catch(err) {
            console.log('验证失败');
            return
        }
        // 2.验证通过，显示倒计时
        this.isCountDownShow = 'true'
        // 3.请求发送验证码
        try { 
          await sendSms(this.user.mobile);
          this.$toast('发送成功')
        }catch(err) {
          this.isCountDownShow = false
          this.$toast('发送失败请稍后重试')
        }
    }
  },
};
</script>

<style lang='less'>
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  background-color: #ededed;
  width: 160px;
  height: 46px;
  line-height: 46px;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: 0px;
  }
}
</style>
