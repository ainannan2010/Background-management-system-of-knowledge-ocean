<template>
  <div class="box">
    <ul class='buttonBox'>
      <li
       :key="index"
        v-for="(item, index) in buttonList"
        class='itemLi'
        :style="{'background':item.color}"
        >
        {{item.title}}
      </li>
    </ul>
    <Map />
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Map from './Map.vue'

export default {
  setup(props, { root }) {
    // 创建响应式数据对象，类似于data
    const state = reactive({
      userName: sessionStorage.getItem('userName'),
      buttonList: [
        {
          title: '用户数',
          num: 160000,
          color: 'red'
        },
        {
          title: 'VIP',
          num: '3000+,',
          color: 'yellow'
        },
        {
          title: '图书分类',
          num: 315,
          color: 'skyblue'
        },
        {
          title: '作者',
          num: '20k+',
          color: 'pink'
        },
      ],
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
  components: {
    Map,
  },
}
</script>
<style scoped lang='less'>
@import '~@styles/variables.less';
.buttonBox {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  .itemLi {
    width: 200px;
    height: 50px;
    border: 1px solid #aaa;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }
}
</style>
