<template>
  <div class="course-list">
    <div class="content-wrapper">
      <div class="header-section">
        <div class="card-header">
          <span>课程列表</span>
          <div class="header-actions"></div>
        </div>
      </div>

      <!-- 搜索区域 - 调整布局 -->
      <div class="search-area">
        <el-form :inline="true" :model="searchForm">
          <!-- 左侧搜索条件 -->
          <div class="search-left">
            <el-form-item label="课程名称">
              <el-input
                v-model="searchForm.courseName"
                placeholder="请输入课程名称"
                clearable
                class="wider-input"
              ></el-input>
            </el-form-item>
            <el-form-item label="课程分类">
              <el-select
                v-model="searchForm.category"
                placeholder="请选择课程分类"
                clearable
                class="wider-select"
              >
                <el-option label="前端开发" value="前端开发"></el-option>
                <el-option label="后端开发" value="后端开发"></el-option>
                <el-option label="数据库" value="数据库"></el-option>
                <el-option label="移动开发" value="移动开发"></el-option>
                <el-option label="人工智能" value="人工智能"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 右侧操作按钮 -->
          <div class="search-right">
            <el-form-item>
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <!-- 课程卡片网格布局 -->
      <div v-loading="loading" class="course-container">
        <el-empty
          v-if="courseList.length === 0"
          description="暂无课程数据"
        ></el-empty>

        <div v-else class="course-grid">
          <!-- 使用更精确的网格布局 -->
          <el-row :gutter="20">
            <el-col
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              v-for="(course, index) in courseList"
              :key="course.id"
              class="course-card-col"
            >
              <el-card shadow="hover" class="course-card">
                <!-- 课程封面 -->
                <div class="course-image" @click="handleViewCourse(course)">
                  <img :src="getCourseImage(course)" alt="课程封面" />
                  <div class="course-status">
                    <el-tag :type="getStatusType(course.status)" size="small">
                      {{ course.status }}
                    </el-tag>
                  </div>
                </div>

                <!-- 课程内容 -->
                <div class="course-content">
                  <h3 class="course-name" @click="handleViewCourse(course)">
                    {{ course.courseName }}
                  </h3>
                  <div class="course-info">
                    <p class="course-category">
                      <el-icon><Document /></el-icon> 分类:
                      {{ course.courseCategory }}
                    </p>
                    <p>
                      <el-icon><User /></el-icon> 教师: {{ course.teacherName }}
                    </p>
                    <p>
                      <el-icon><Calendar /></el-icon> 创建时间:
                      {{ course.createTime }}
                    </p>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>

      <!-- 课程内容主体区域的占位空间，防止内容被分页遮挡 -->
      <div class="content-spacer"></div>

      <!-- 分页区域 - 固定在底部，使用中文 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[8, 12, 16, 24]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
          <template #total>
            <span>总计 {{ total }} 条</span>
          </template>
          <template #jumper>
            <span class="el-pagination__jump">
              跳转至
              <el-input
                v-model.number="currentPage"
                size="small"
                class="el-pagination__editor"
              />
              页
            </span>
          </template>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Document, User, Calendar } from "@element-plus/icons-vue";
import { list } from "@/api/course";

const router = useRouter();
const loading = ref(false);
const courseList = ref([]);
const currentPage = ref(1);
const pageSize = ref(12); // 默认每页显示12条
const total = ref(0);

const searchForm = reactive({
  courseName: "",
  category: "",
});

// 获取课程封面图片
const getCourseImage = (course) => {
  // 根据课程类别选择不同的默认图片
  const category = course.courseCategory || "前端开发";

  if (category === "前端开发") {
    return "https://via.placeholder.com/300x200/4fc08d/ffffff?text=前端开发";
  } else if (category === "后端开发") {
    return "https://via.placeholder.com/300x200/3c8dbc/ffffff?text=后端开发";
  } else if (category === "数据库") {
    return "https://via.placeholder.com/300x200/605ca8/ffffff?text=数据库";
  } else if (category === "移动开发") {
    return "https://via.placeholder.com/300x200/ff851b/ffffff?text=移动开发";
  } else {
    return "https://via.placeholder.com/300x200/00a65a/ffffff?text=其他课程";
  }
};

// 获取课程列表数据
const fetchCourseList = async () => {
  console.log("尝试获取课程列表...");
  loading.value = true;
  try {
    // 查询参数
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
    };

    // body参数包含搜索条件
    const body = {
      courseName: searchForm.courseName || "",
      category: searchForm.category || "",
    };

    const response = await list(null, body);
    console.log("课程列表响应:", response);

    if (response && response.list) {
      courseList.value = response.list;
      total.value = response.total || 0;
    } else {
      courseList.value = [];
      total.value = 0;
      ElMessage.warning("获取课程列表数据格式不正确");
    }
  } catch (error) {
    console.error("获取课程列表失败:", error);
    ElMessage.error("获取课程列表失败");
    // 使用默认数据
    courseList.value = [
      {
        id: "demo-1",
        courseName: "Vue3实战教程",
        courseCategory: "前端开发",
        teacherName: "示例教师",
        createTime: "2025-04-01",
        status: "未发布",
      },
    ];
    total.value = 1;
  } finally {
    loading.value = false;
  }
};

const getStatusType = (status) => {
  switch (status) {
    case "已发布":
      return "success";
    case "未发布":
      return "info";
    case "审核中":
      return "warning";
    default:
      return "info";
  }
};

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1; // 重置页码
  fetchCourseList();
};

// 处理重置
const handleReset = () => {
  searchForm.courseName = "";
  searchForm.category = "";
  currentPage.value = 1;
  fetchCourseList();
};

// 分页方法
const handleSizeChange = (val) => {
  pageSize.value = val;
  fetchCourseList();
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchCourseList();
};

// 查看课程详情
const handleViewCourse = (row) => {
  router.push(`/course/courseDetail?id=${row.id}`);
};

onMounted(() => {
  fetchCourseList();
});
</script>

<style scoped lang="less">
.course-list {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 16px; /* 保持页面周围的边距 */
}

.content-wrapper {
  height: 100%;
  width: 100%;
  /* 移除 overflow: hidden，不限制内容高度 */
  display: flex;
  flex-direction: column;
  background-color: #ffffff; /* 保持背景色为白色 */
  border-radius: 6px; /* 增加圆角效果 */
  padding: 25px; /* 增加内边距，替代卡片的内边距 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05); /* 添加轻微阴影 */
  position: relative; /* 添加相对定位，使分页可以固定在底部 */
}

.header-section {
  margin-bottom: 30px;
  border-bottom: 1px solid #ebeef5; /* 添加底部边框替代卡片标题的分隔 */
  padding-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 22px; /* 增大标题字体 */
  font-weight: 600;
  color: #303133;
}

.search-area {
  margin-bottom: 30px; /* 增加与课程列表的间距 */
  padding: 20px; /* 增加内边距 */
  border-radius: 8px; /* 圆角效果 */
  /* 移除边框，改用下划线 */
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07); /* 添加浅色下划线 */
  padding-bottom: 25px; /* 增加底部内边距使下划线与内容有一定间距 */

  el-form {
    width: 100%;
  }

  /* 调整搜索区域布局 */
  :deep(.el-form) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap; /* 小屏幕自动换行 */
    align-items: center; /* 确保所有元素垂直居中对齐 */
  }

  .search-left {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    flex-wrap: wrap; /* 小屏幕自动换行 */
    gap: 20px; /* 表单项之间的间距 */
  }

  .search-right {
    margin-left: auto;
    display: flex;
    align-items: center; /* 垂直居中对齐 */
  }

  /* 修改表单项为弹性布局，确保垂直居中 */
  :deep(.el-form-item) {
    margin-bottom: 10px; /* 为小屏幕换行提供更好的垂直间距 */
    margin-right: 15px; /* 水平间距 */
    display: flex;
    align-items: center; /* 关键：确保标签和内容垂直居中 */
  }

  /* 调整标签样式 */
  :deep(.el-form-item__label) {
    font-size: 17px; /* 放大标签文字 */
    font-weight: 500;
    padding-right: 15px; /* 增加标签与控件的间距 */
    color: #303133;
    height: 46px; /* 与输入框一致高度 */
    line-height: 46px; /* 与输入框一致行高 */
    display: flex;
    align-items: center; /* 确保标签文字垂直居中 */
    margin: 0; /* 移除可能的外边距 */
  }

  /* 统一输入框和选择框样式 */
  .wider-input,
  .wider-select {
    width: 300px !important; /* 统一宽度为300px */

    /* 统一表单项内容区域高度 */
    :deep(.el-form-item__content) {
      height: 46px !important;
      line-height: 46px !important;
      display: flex;
      align-items: center; /* 确保内容垂直居中 */
      margin: 0 !important; /* 移除默认左边距，确保完全对齐 */
    }

    /* 统一输入框和选择框样式 */
    :deep(.el-input__wrapper),
    :deep(.el-select .el-input__wrapper) {
      height: 46px !important; /* 统一高度 */
      line-height: 46px !important; /* 统一行高 */
      font-size: 16px !important; /* 统一字体大小 */
      padding: 1px 11px !important; /* 统一内边距 */
      box-sizing: border-box !important; /* 确保盒模型一致 */
      display: flex;
      align-items: center; /* 确保内容垂直居中 */
    }

    /* 处理内部输入框元素 */
    :deep(.el-input__inner) {
      height: 100% !important;
      line-height: 46px !important;
      font-size: 16px !important;
      vertical-align: middle; /* 确保文本垂直居中 */
    }
  }

  /* 下拉框特有样式 - 强制让select也保持一致高度 */
  .wider-select {
    /* 确保select内部元素也保持一致高度 */
    :deep(.el-input) {
      height: 46px !important;
      line-height: 46px !important;
      display: flex;
      align-items: center;
    }

    /* 处理select内部结构 */
    :deep(.el-select__wrapper) {
      width: 100% !important;
      height: 46px !important;
      line-height: 46px !important;
      box-sizing: border-box !important;
      display: flex;
      align-items: center;
    }

    /* 下拉菜单样式 */
    :deep(.el-select__popper .el-select-dropdown__item) {
      font-size: 16px; /* 放大下拉菜单字体 */
      padding: 8px 16px; /* 增加下拉项内边距 */
    }
  }

  /* 按钮放大，确保垂直居中 */
  :deep(.el-button) {
    height: 46px !important; /* 与输入框高度一致 */
    padding: 0 24px !important; /* 增加按钮内边距，使按钮更宽 */
    font-size: 16px !important; /* 增加按钮字体大小 */
    border-radius: 4px !important;
    font-weight: 500 !important;
    margin: 0 !important; /* 移除按钮默认边距 */
    display: flex !important;
    align-items: center !important; /* 垂直居中文字 */
    justify-content: center !important; /* 水平居中文字 */

    &.el-button--primary {
      background-color: #409eff !important; /* 确保主色调 */
    }
  }
}

.course-container {
  width: 100%;
  flex: 1; /* 让课程容器占据剩余空间 */

  /* 确保课程网格容器填充可用空间 */
  .course-grid {
    width: 100%;
  }

  /* 修复row布局 */
  :deep(.el-row) {
    width: 100%;
    margin-left: 0 !important;
    margin-right: 0 !important;
    display: flex;
    flex-wrap: wrap;
  }

  /* 修复col布局，确保每行均匀分布 */
  :deep(.el-col) {
    padding-left: 10px !important;
    padding-right: 10px !important;
    box-sizing: border-box;
  }
}

/* 防止分页区域遮挡内容的占位空间 */
.content-spacer {
  height: 70px; /* 分页区域的高度 */
  width: 100%;
}

.course-card-col {
  margin-bottom: 30px; /* 增加卡片之间的垂直间距 */
  display: flex; /* 使用flex布局确保卡片高度一致 */
}

.course-card {
  width: 100%; /* 确保卡片占满列宽 */
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  border-radius: 8px; /* 增加卡片圆角 */
  overflow: hidden;
  border: 1px solid #ebeef5; /* 恢复卡片边框 */

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  .course-image {
    position: relative;
    height: 180px; /* 增加图片高度 */
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s;

      &:hover {
        transform: scale(1.08);
      }
    }

    .course-status {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 1;

      .el-tag {
        font-size: 13px; /* 增大标签字体 */
        padding: 0 8px;
        height: 26px;
        line-height: 26px;
      }
    }
  }

  .course-content {
    padding: 20px; /* 增加内容区域内边距 */
    flex: 1; /* 让内容区域占据剩余空间 */
    display: flex;
    flex-direction: column;

    .course-name {
      margin: 0 0 15px;
      font-size: 20px; /* 进一步增大课程名称字体 */
      font-weight: bold;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;

      &:hover {
        color: #409eff;
      }
    }

    .course-info {
      margin-bottom: 15px;
      font-size: 15px; /* 增大整体信息字体 */
      color: #606266;
      flex: 1; /* 让信息区域填充剩余空间 */

      p {
        margin: 8px 0; /* 增加行间距 */
        display: flex;
        align-items: center;

        .el-icon {
          margin-right: 8px; /* 增加图标与文字的间距 */
          font-size: 16px; /* 增大图标 */
          color: #606266;
        }
      }

      /* 增强分类样式 */
      .course-category {
        font-size: 17px; /* 增大课程分类字体 */
        font-weight: 500;
        margin-bottom: 12px;
        color: #303133;

        .el-icon {
          color: #409eff; /* 分类图标使用主题色 */
        }
      }
    }
  }
}

/* 修改分页容器样式，使其固定在底部 */
.pagination-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px 0;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;
  z-index: 10;
  display: flex;
  justify-content: center;

  /* 中文化分页控件样式 */
  :deep(.el-pagination) {
    font-size: 15px;

    button {
      min-width: 35px;
      height: 35px;
      line-height: 35px;

      &.btn-prev,
      &.btn-next {
        padding: 0;
      }
    }

    .el-pagination__total {
      font-size: 15px;
      margin-right: 15px;
    }

    .el-pagination__sizes {
      margin-right: 15px;

      .el-select .el-input {
        margin: 0 5px;
        width: 110px;

        .el-input__inner {
          height: 35px;
          line-height: 35px;
          font-size: 15px;
        }
      }
    }

    .el-pagination__jump {
      margin: 0 5px;
      width: auto;
      font-size: 15px;

      .el-pagination__editor {
        width: 50px;
        margin: 0 5px;
        
        .el-input__inner {
          height: 35px;
          line-height: 35px;
          font-size: 15px;
        }
      }
    }
  }
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .search-area {
    padding: 15px;

    .search-left {
      width: 100%;
      justify-content: space-between;
    }

    .search-right {
      width: 100%;
      margin-top: 15px;
      justify-content: flex-end;
    }

    .wider-input,
    .wider-select {
      width: 100% !important;
    }
  }

  .content-spacer {
    height: 100px; /* 在移动设备上增加底部空间 */
  }

  .pagination-container {
    padding: 10px 0;

    :deep(.el-pagination) {
      .el-pagination__sizes {
        display: none; /* 在小屏幕上隐藏每页条数选择器 */
      }
    }
  }
}
</style>