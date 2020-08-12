<template>
  <div class="homeBox">
    <!-- 左侧导航 -->
    <Nav />

    <!-- 右侧内容区 -->
    <div class="contentBox">
      <!-- 面包屑 -->
      <BreadCumb />
      <!-- 内容主体区 -->
      <div class="contentWrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Nav from './Nav.vue'
import BreadCumb from './BreadCumb.vue'

export default {
  // 代替methods的写法
  setup() {
    const state = reactive({})
    return { ...toRefs(state) }
  },
  components: {
    Nav,
    BreadCumb,
  },
}
</script>
<style scoped lang='less'>
@import '~@styles/variables.less';
.homeBox {
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  width: 1400px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
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
        border-bottom: 1px solid #fff;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: @global-sidebar-hover-color;
          background-color: @global-side-bg-hover-color;
        }
      }
    }
  }
  .contentBox {
    flex: 1;
    background-color: @global-content-color;
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
    .contentWrapper {
      padding: 10px;
    }
  }
}
</style>
