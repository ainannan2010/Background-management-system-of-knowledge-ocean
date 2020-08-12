<template>
  <div class="loginBox">
    <div class="loginWrapper">
      <h2>学海图书管理系统</h2>
      <div class="loginContent">
        <div class="loginPanel">
          <input type="text" class="inputs" placeholder="user name" v-model="userName" />
        </div>
        <div class="loginPanel">
          <input type="text" class="inputs" placeholder="password" v-model="password" />
        </div>
        <div class="loginPanel">
          <button class="loginBtn" @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import { request } from '@utils/request'

export default {
  // vue 3.0+
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    // 创建响应式数据对象，类似于data
    const state = reactive({ userName: 'yangwuc', password: 'Admin@1234' })
    // 代替methods的写法
    const login = async () => {
      const { userName, password } = state
      if (!userName || !password) return
      try {
        const { success, message, data } = await request({
          method: 'post',
          url: '/login',
          data: {
            userName,
            password,
          },
        })

        if (!success) {
          alert(message)
          return
        }

        sessionStorage.setItem('userName', data)
        root.$router.push('/home')
      } catch (error) {
        console.log('error', error)
      }
    }

    /**
     * 所有定义的属性方法都需要返回
     * state里的数据需要解构一下...state
     * toRefs的作用是使state里的数据具备响应式
     *
     */
    return { ...toRefs(state), login }
  },
}
</script>
<style scoped lang="less">
@import '~@styles/variables.less';
.loginBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @global-background-color;
  .loginWrapper {
    height: 300px;
    width: 500px;
    margin: 100px auto;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #aaa;
    box-shadow: 5px 5px 2px 2px @global-boxshadow-color;
    text-align: center;
    padding: 20px 50px;
  }
  .loginPanel {
    margin-bottom: 40px;
    .inputs {
      width: 90%;
      height: 30px;
      border-radius: 10px;
    }
    .loginBtn {
      height: 40px;
      width: 90%;
      background-color: @global-btn-color;
      border-radius: 10px;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
