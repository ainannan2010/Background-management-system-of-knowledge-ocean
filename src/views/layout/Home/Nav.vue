<template>
  <div class="sideBox">
    <div class="logoBox">
      <img src="@assets/logo.png" />
      <span>学海图书管理系统</span>
    </div>
    <ul class="sideWrapper" :key="index" v-for="(item, index) in sideList">
      <li class="sideItem">
        <router-link :to="item.url" class="elet">{{item.name}}</router-link>
        <ul
          v-show="item.children.length"
          :key="i"
          v-for="(subItem, i) in item.children"
          class="subSideBox"
        >
          <li class="sideItem">
            <router-link :to="item.url+subItem.url" class="elet">{{subItem.name}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from '@vue/composition-api'

export default {
  setup(props, { root }) {
    // 创建响应式数据对象，类似于data
    const state = reactive({
      sideList: [],
    })
    // 代替methods的写法

    /**
     * 所有定义的属性方法都需要返回
     * state里的数据需要解构一下...state
     * toRefs的作用是使state里的数据具备响应式
     *
     */
    // 获取菜单
    const getMenuList = async () => {
      try {
        const { success, message, data = [] } = await root.$http({
          method: 'get',
          url: '/menuList',
        })

        if (!success) {
          alert(message)
          return
        }

        state.sideList = data
      } catch (error) {
        console.log('error', error)
      }
    }
    onMounted(() => {
      getMenuList()
    })
    return { ...toRefs(state) }
  },
}
</script>
<style scoped lang='less'>
@import '~@styles/variables.less';
.sideBox {
  width: 250px;
  color: #fff;
  font-weight: 700;
  background-color: @global-sidebar-color;
  .logoBox {
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    padding: 0 10px;
    height: 60px;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      margin-left: 5px;
      font-size: 20px;
    }
  }
  .sideWrapper {
    .sideItem {
      .elet {
        display: block;
        border-bottom: 1px solid #fff;
        padding: 10px;
        cursor: pointer;
        color: #fff;
        &:hover {
          color: @global-sidebar-hover-color;
          background-color: @global-side-bg-hover-color;
        }
      }
    }
    .subSideBox {
      .sideItem {
        .elet {
          display: block;
          border-bottom: 1px solid #fff;
          cursor: pointer;
          padding: 10px 25px;
          color: #fff;
          &:hover {
            color: @global-sidebar-hover-color;
            background-color: @global-side-bg-hover-color;
          }
        }
      }
    }
  }
}
</style>
