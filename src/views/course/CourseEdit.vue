<template>
  <div class="course-edit">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ isEdit ? "编辑课程" : "创建课程" }}</span>
        </div>
      </template>
      <el-form
        :model="courseForm"
        :rules="rules"
        ref="courseFormRef"
        label-width="120px"
      >
        <el-form-item label="课程名称" prop="courseName">
          <el-input
            v-model="courseForm.courseName"
            placeholder="请输入课程名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程分类" prop="courseCategory">
          <el-select
            v-model="courseForm.courseCategory"
            placeholder="请选择课程分类"
          >
            <el-option label="前端开发" value="前端开发"></el-option>
            <el-option label="后端开发" value="后端开发"></el-option>
            <el-option label="数据库" value="数据库"></el-option>
            <el-option label="移动开发" value="移动开发"></el-option>
            <el-option label="人工智能" value="人工智能"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授课教师" prop="teacherName">
          <el-input
            v-model="courseForm.teacherName"
            placeholder="请输入授课教师"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input
            v-model="courseForm.description"
            type="textarea"
            rows="4"
            placeholder="请输入课程描述"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getBaseInfo, submitBaseInfo } from "@/api/course";

const route = useRoute();
const router = useRouter();
const courseFormRef = ref(null);

const courseId = computed(() => route.query.id);
const isEdit = computed(() => !!courseId.value);

const courseForm = reactive({
  courseName: "",
  courseCategory: "",
  teacherName: "",
  description: "",
});

const rules = {
  courseName: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
  courseCategory: [
    { required: true, message: "请选择课程分类", trigger: "change" },
  ],
  teacherName: [{ required: true, message: "请输入授课教师", trigger: "blur" }],
};

const fetchCourseDetail = async (id) => {
  console.log("获取课程详情:", id);
  try {
    const data = await getBaseInfo(id);
    console.log("课程详情响应:", data);
    if (data) {
      Object.assign(courseForm, {
        id: data.id,
        courseName: data.courseName,
        courseCategory: data.courseCategory,
        teacherName: data.teacherName,
        description: data.description || "",
      });
    } else {
      ElMessage.error("获取课程详情失败");
    }
  } catch (error) {
    console.error("获取课程详情失败:", error);
    ElMessage.error("获取课程详情失败");
  }
};

const handleSubmit = async () => {
  if (!courseFormRef.value) return;

  await courseFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        console.log("提交表单:", courseForm);
        const formData = { ...courseForm };
        if (isEdit.value) {
          formData.id = courseId.value;
        }

        await submitBaseInfo(formData);
        ElMessage.success(isEdit.value ? "更新成功" : "创建成功");
        
        // 延时跳转，确保消息显示完成
        setTimeout(() => {
          router.push("/course/courseList");
        }, 500);
      } catch (error) {
        console.error("提交失败:", error);
        ElMessage.error("提交失败");
      }
    }
  });
};

const handleCancel = () => {
  router.push("/course/courseList");
};

onMounted(() => {
  if (isEdit.value) {
    fetchCourseDetail(courseId.value);
  }
});
</script>

<style scoped lang="less">
.course-edit {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
