<template>
  <div class="">
    首页
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'

export default {
  setup(props, { root }) {
    // 创建响应式数据对象，类似于data
    const state = reactive({
      userName: sessionStorage.getItem('userName'),
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

    return { ...toRefs(state), goback }
  },
}
</script>
<style scoped lang='less'>
@import '~@styles/variables.less';
</style>
