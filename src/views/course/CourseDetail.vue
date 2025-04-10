<template>
  <div class="course-detail">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>课程详情</span>
          <div>
            <el-button @click="handleBack">返回</el-button>
            <el-button type="primary" @click="handleEdit">编辑</el-button>
          </div>
        </div>
      </template>
      <div v-loading="loading">
        <div class="detail-item">
          <span class="label">课程名称：</span>
          <span class="content">{{ course.courseName }}</span>
        </div>
        <div class="detail-item">
          <span class="label">课程分类：</span>
          <span class="content">{{ course.courseCategory }}</span>
        </div>
        <div class="detail-item">
          <span class="label">授课教师：</span>
          <span class="content">{{ course.teacherName }}</span>
        </div>
        <div class="detail-item">
          <span class="label">创建时间：</span>
          <span class="content">{{ course.createTime }}</span>
        </div>
        <div class="detail-item">
          <span class="label">课程状态：</span>
          <span class="content">
            <el-tag :type="getStatusType(course.status)">{{
              course.status
            }}</el-tag>
          </span>
        </div>
        <div class="detail-item">
          <span class="label">课程描述：</span>
          <div class="description">{{ course.description || "暂无描述" }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getBaseInfo } from "@/api/course";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const course = ref({
  courseName: "",
  courseCategory: "",
  teacherName: "",
  createTime: "",
  status: "",
  description: "",
});

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

const fetchCourseDetail = async () => {
  const id = route.query.id;
  if (!id) {
    ElMessage.error("课程ID不能为空");
    return;
  }

  loading.value = true;
  try {
    console.log("尝试获取课程详情:", id);
    const data = await getBaseInfo(id);
    console.log("课程详情响应:", data);
    if (data) {
      course.value = data;
    } else {
      ElMessage.error("获取课程详情失败");
    }
  } catch (error) {
    console.error("获取课程详情失败:", error);
    ElMessage.error("获取课程详情失败");
  } finally {
    loading.value = false;
  }
};

const handleBack = () => {
  router.push("/course/courseList");
};

const handleEdit = () => {
  router.push(`/course/courseEdit?id=${route.query.id}`);
};

onMounted(() => {
  fetchCourseDetail();
});
</script>

<style scoped lang="less">
.course-detail {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .detail-item {
    margin-bottom: 16px;
    font-size: 14px;

    .label {
      display: inline-block;
      width: 100px;
      color: #606266;
      font-weight: bold;
    }

    .content {
      color: #303133;
    }

    .description {
      margin-top: 8px;
      padding: 12px;
      background-color: #f8f8f8;
      border-radius: 4px;
      line-height: 1.6;
    }
  }
}
</style>
