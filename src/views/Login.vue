<template>
  <div class="loginBox">
    <div class="loginWrapper">
      <h2>学海图书管理系统</h2>
      <div class="loginContent">
        <div class="loginPanel">
          <input type="text" class="inputs" placeholder="user name" v-model="userName" />
          <div class="tips" v-show="!userName&&isToggle">请输入用户名</div>
        </div>
        <div class="loginPanel">
          <input
            :type="showPwd ? 'text' : 'password'"
            class="inputs"
            placeholder="password"
            value="showPwd?password:hidePwd"
            v-model="password"
          />
          <div class="tips" v-show="!password&&isToggle">请输入密码</div>
          <div class="tubiao" @click="togglePwd">
            <div class="d"></div>
          </div>
        </div>
        <div class="loginPanel">
          <button class="loginBtn" @click="login">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from '@vue/composition-api'

export default {
  // vue 3.0+
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    // 创建响应式数据对象，类似于data
    const state = reactive({
      userName: '', // yangwuc
      password: '', // Admin@1234
      isToggle: false,
      showPwd: false,
    })
    // 代替methods的写法
    const login = async () => {
      const { userName, password } = state
      state.isToggle = true
      if (!userName || !password) return
      try {
        const { success, message, data } = await root.$http({
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
        // 登陆成功
        sessionStorage.setItem('userName', data)
        state.isToggle = false
        root.$router.push('/home')
      } catch (error) {
        console.log('error', error)
      }
    }

    const togglePwd = () => {
      state.showPwd = !state.showPwd
    }

    /**
     * 所有定义的属性方法都需要返回
     * state里的数据需要解构一下...state
     * toRefs的作用是使state里的数据具备响应式
     *
     */
    return { ...toRefs(state), login, onMounted, togglePwd }
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
    height: 70px;
    position: relative;
    .inputs {
      width: 90%;
      height: 30px;
      border-radius: 10px;
    }
    .tips {
      text-align: left;
      margin: 5px 0 0 25px;
      color: red;
    }
    .tubiao {
      width: 20px;
      height: 5px;
      position: absolute;
      right: 30px;
      padding-top: 8px;
      opacity: 0.8;
      background: #000;
      top: 12px;
      border-radius: 80%;
      cursor: pointer;
      .d {
        position: absolute;
        top: 3px;
        left: 7px;
        width: 7px;
        height: 7px;
        background: #b3dae9;
        border-radius: 7px;
      }
    }

    .tubiao:hover {
      opacity: 1;
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
