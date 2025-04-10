<template>
  <div class="course-search">
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="课程名称">
        <el-input
          v-model="searchForm.courseName"
          placeholder="请输入课程名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="课程分类">
        <el-select
          v-model="searchForm.category"
          placeholder="请选择课程分类"
          clearable
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="searchForm.status"
          placeholder="请选择状态"
          clearable
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const props = defineProps({
  initialValues: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["search", "reset"]);

const categoryOptions = [
  { label: "前端开发", value: "前端开发" },
  { label: "后端开发", value: "后端开发" },
  { label: "数据库", value: "数据库" },
  { label: "移动开发", value: "移动开发" },
  { label: "人工智能", value: "人工智能" },
];

const statusOptions = [
  { label: "已发布", value: "已发布" },
  { label: "未发布", value: "未发布" },
  { label: "审核中", value: "审核中" },
];

const searchForm = reactive({
  courseName: props.initialValues.courseName || "",
  category: props.initialValues.category || "",
  status: props.initialValues.status || "",
});

const handleSearch = () => {
  emit("search", { ...searchForm });
};

const handleReset = () => {
  searchForm.courseName = "";
  searchForm.category = "";
  searchForm.status = "";
  emit("reset");
};
</script>

<style scoped lang="less">
.course-search {
  margin-bottom: 20px;

  .search-form {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
