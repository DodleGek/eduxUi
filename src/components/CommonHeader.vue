<template>
  <div class="header">
    <div class="l-content">
      <el-button size="small" @click="handleCollpase">
        <component class="icons" is="menu"></component>
      </el-button>
      <el-breadcrumb separator=">" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.meta.parentTitle">{{
          route.meta.parentTitle
        }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.meta.title">{{
          route.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useAllStore } from "@/stores";

const route = useRoute();
const store = useAllStore();

const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};

const handleCollpase = () => {
  store.state.isCollapse = !store.state.isCollapse;
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}

.icons {
  width: 20px;
  height: 20px;
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

// 修改后的面包屑样式
:deep(.bread) {
  // 非当前页面的样式
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: rgba(255, 255, 255, 0.7) !important; // 非当前页面为淡白色
      cursor: pointer !important;

      &:hover {
        color: rgba(255, 255, 255, 0.9) !important; // 鼠标悬停时加亮
      }
    }
  }

  // 当前激活页面的样式
  .el-breadcrumb__item:last-child {
    .el-breadcrumb__inner {
      color: #ffffff !important; // 当前页面为纯白色
      font-weight: 600;
    }
  }

  // 分隔符样式
  .el-breadcrumb__separator {
    color: rgba(255, 255, 255, 0.5) !important; // 分隔符颜色
    margin: 0 8px;
    font-weight: bold;
    font-size: 14px;
  }
}
</style>
