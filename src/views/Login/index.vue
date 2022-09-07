<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登入" class="nav-bar" />
    <!-- 表单 -->
    <!-- van-field:输入框，text，password，文本域...-->
    <!-- v-model:用户输入的值 -->
    <!-- name:表示表单项 -->
    <!-- rules:是一个数组 :rules={ required:是否必选,
    message:是错误提示信息,pattern正则,trigger:规则的触发时机onchange、onBlur} -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码 -->
        <template #button>
          <!-- type="default" 默认 写不写都可以 -->
          <van-button
            class="btn"
            block
            size="small"
            type="default"
            round
            native-type="button"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >发送验证码</van-button
          >
          <van-count-down
            v-else
            :time="3 * 1000"
            format="ss秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
// 引入Api
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
// token 身份证，标识用户

export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    // Submit只有在表单校验通过以后会被触发

    // loading
    // message:提示文案
    // forbidclick:禁止点击
    // duration:展示的时长，为0，一直展示
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        // 将token存进vuex
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        // 成功的提示
        this.$toast.success('登入成功')
      } catch (error) {
        // 细分一下失败,提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能知道
        // error:1.js拋的错2.axios封装的error对象
        // axios封装的error对象
        //  -error.response.data 后端返回的数据
        // -error.response.status 后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // 1.js导致的错误 2.507
          console.dir(error)
          this.$toast.clear()
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      // 0.验证用户是否输入有效的手机号 1.发送请求  2.显示倒计时组件
      await this.$refs.form.validate('mobile')
      this.loading()
      // 1.发送请求
      try {
        await sendCodeAPI(this.mobile)
        // 2.显示倒计时
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          (error.response && error.response.status === 429) ||
          error.response.status === 404
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式作用于当前的组件
// vue-cli -提供了语法：deep() 深度选择器
.nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }

  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
