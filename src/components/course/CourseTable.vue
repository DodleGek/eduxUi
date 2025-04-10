<template>
  <div class="course-table">
    <el-table :data="courses" style="width: 100%" v-loading="loading" border>
      <el-table-column prop="courseName" label="课程名称" width="250">
        <template #default="scope">
          <el-link type="primary" @click="handleView(scope.row)">{{
            scope.row.courseName
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="courseCategory"
        label="课程分类"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="teacherName"
        label="授课教师"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="180">
        <template #default="scope">
          <el-button link type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button link type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  courses: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["view", "edit", "delete"]);

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

const handleView = (row) => {
  emit("view", row);
};

const handleEdit = (row) => {
  emit("edit", row);
};

const handleDelete = (row) => {
  emit("delete", row);
};
</script>
