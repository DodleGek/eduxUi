<template>
  <div class="pagination-container">
    <el-pagination
      v-model:current-page="currentPageValue"
      v-model:page-size="pageSizeValue"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 50],
  },
});

const emit = defineEmits([
  "update:currentPage",
  "update:pageSize",
  "pagination",
]);

const currentPageValue = ref(props.currentPage);
const pageSizeValue = ref(props.pageSize);

watch(
  () => props.currentPage,
  (val) => {
    currentPageValue.value = val;
  }
);

watch(
  () => props.pageSize,
  (val) => {
    pageSizeValue.value = val;
  }
);

const handleSizeChange = (val) => {
  emit("update:pageSize", val);
  emit("pagination", {
    currentPage: currentPageValue.value,
    pageSize: val,
  });
};

const handleCurrentChange = (val) => {
  emit("update:currentPage", val);
  emit("pagination", {
    currentPage: val,
    pageSize: pageSizeValue.value,
  });
};
</script>

<style scoped lang="less">
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
