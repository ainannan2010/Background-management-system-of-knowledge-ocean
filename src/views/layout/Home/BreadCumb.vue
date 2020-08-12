<template>
  <div class="crumbsBox">
    <div class="crumbs">
      <span :key="index" v-for="(item, index) in cumbList">
        <span
          :class="['title', index === cumbList.length-1 ? 'actived': null]"
          a="1"
        >{{item.meta.title}}</span>
        <span v-if="index<cumbList.length-1 && cumbList[1].meta.title">/</span>
      </span>
    </div>
    <div class="personalBox">
      <span class="user">{{userName}}</span>
      <div class="logoutBtn" @click="goback">Logout</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from '@vue/composition-api'

export default {
  setup(props, { root }) {
    // 创建响应式数据对象，类似于data
    const state = reactive({
      userName: sessionStorage.getItem('userName'),
      cumbList: [],
    })
    // 代替methods的写法
    const goback = () => {
      sessionStorage.removeItem('userName')
      root.$router.push('/login') // vue 3.0+
    }

    /**
     * 所有定义的属性方法都需要返回
     * state里的数据需要解构一下...state
     * toRefs的作用是使state里的数据具备响应式
     *
     */
    onMounted(() => {
      // 路由信息
      console.log('***--*********:', root.$route.matched[1]) // eslint-disable-line
      state.cumbList = root.$route.matched
    })
    watch(
      () => root.$route,
      (to) => {
        state.cumbList = to.matched
      }
    )
    return { ...toRefs(state), goback }
  },
}
</script>
<style scoped lang='less'>
@import '~@styles/variables.less';
.crumbsBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 2px solid #aaa;
  padding: 0 10px;
  .crumbs {
    flex: 1;
    color: #000;
    .title {
      margin: 0 2px;
      cursor: pointer;
      &:hover {
        color: @global-hover-color;
      }
    }
    .actived {
      color: @global-active-color;
    }
  }
  .personalBox {
    display: flex;
    align-items: center;
    color: #fff;
    .user {
      margin-right: 5px;
      color: #000;
      font-weight: 600;
    }
    .logoutBtn {
      background-color: @global-btn-color;
      color: #fff;
      padding: 5px 10px;
      border: 2px solid #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
