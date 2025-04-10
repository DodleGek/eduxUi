<template>
    <el-aside :width="width">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        :default-active="activePath"
      >
        <h3 v-show="!isCollapse">教学后台管理</h3>
        <h3 v-show="isCollapse">后台</h3>
        <el-menu-item
          v-for="item in noChildren"
          :index="item.path"
          :key="item.path"
        >
          <el-icon>
            <component class="icon" :is="item.icon" />
          </el-icon>
          <span>{{ item.lable }}</span>
        </el-menu-item>
        <el-sub-menu
          v-for="item in hasChildren"
          :index="item.path"
          :key="item.path"
        >
          <template #title>
            <el-icon>
              <component class="icon" :is="item.icon" />
            </el-icon>
            <span>{{ item.lable }}</span>
          </template>
          <!-- 移除 el-menu-item-group 标签，直接使用子菜单项 -->
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :index="subItem.path"
            :key="subItem.path"
          >
            <el-icon>
              <component class="icon" :is="subItem.icon" />
            </el-icon>
            <span>{{ subItem.lable }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
  </template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAllStore } from "@/stores";

const route = useRoute();
const activePath = computed(() => route.path);

const list = ref([
  {
    path: "/home",
    name: "home",
    lable: "首页",
    icon: "house",
    url: "Home",
  },
  {
    path: "/course",
    name: "course",
    lable: "课程管理",
    icon: "document",
    children: [
      {
        path: "/course/courseList",
        name: "courseList",
        lable: "课程列表",
        icon: "document",
        url: "CourseList",
      },
      {
        path: "/course/courseEdit",
        name: "courseEdit",
        lable: "课程创建/编辑",
        icon: "document",
        url: "CourseEdit",
      },
    ],
    url: "Course",
  },
  {
  path: "/media",
  name: "media",
  lable: "媒资管理",
  icon: "video-camera",
  children: [
    {
      path: "/media/list",
      name: "mediaList",
      lable: "媒资列表",
      icon: "picture",
      url: "MediaList",
    },
    {
      path: "/media/upload",
      name: "upload",
      lable: "媒资上传",
      icon: "upload",
      url: "Upload",
    }
  ],
  url: "Media",
},
  {
    path: "/student",
    name: "student",
    lable: "学员管理",
    icon: "user",
    children: [
      {
        path: "/student/studentList",
        name: "studentList",
        lable: "学员列表",
        icon: "user",
        url: "StudentList",
      },
    ],
    url: "Student",
  },
  {
    path: "/teacher",
    name: "teacher",
    lable: "教师管理",
    icon: "user",
    children: [
      {
        path: "/teacher/teacherList",
        name: "teacherList",
        lable: "教师列表",
        icon: "user",
        url: "TeacherList",
      },
    ],
    url: "Teacher",
  },
]);

const noChildren = computed(() => {
  return list.value.filter((item) => !item.children);
});

const hasChildren = computed(() => {
  return list.value.filter((item) => item.children);
});

const store = useAllStore();

const isCollapse = computed(() => {
  return store.state.isCollapse;
});

// 侧边栏宽度
const width = computed(() => {
  return store.state.isCollapse ? "64px" : "180px";
});
</script>

<style scoped lang="less">
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.el-menu {
  border-right: none;

  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }

  // 调整子菜单项的样式
  :deep(.el-menu-item) {
    height: 50px;
    line-height: 50px;

    &.is-active {
      background-color: #434a50 !important; // 当前选中项的背景色
    }
  }

  // 调整子菜单的缩进和内边距
  :deep(.el-sub-menu .el-menu-item) {
    height: 40px;
    line-height: 40px;
    min-width: 160px;
    padding-left: 40px !important; // 增加缩进，恢复视觉层次
  }

  // 调整折叠状态下的样式
  :deep(.el-menu--collapse) {
    .el-sub-menu {
      .el-sub-menu__title {
        padding-left: 20px;
      }
    }
  }

  // 确保子菜单有明确的视觉标识
  :deep(.el-sub-menu) {
    .el-sub-menu__title {
      &:hover {
        background-color: #4a535c !important;
      }
    }
  }
}

// 折叠状态下弹出菜单样式
:deep(.el-menu--popup) {
  padding: 0 !important; // 移除内边距

  // 确保子菜单无缝对接
  .el-menu-item {
    height: 40px !important;
    line-height: 40px !important;
    padding: 0 20px !important;
    margin: 0 !important;
    min-width: 160px;
  }
}

.el-aside {
  height: 100%;
  background-color: #545c64;
  overflow-x: hidden; // 防止横向滚动条
}
</style>