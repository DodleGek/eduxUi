<template>
  <div class="media-list">
    <div class="content-wrapper">
      <div class="header-section">
        <div class="card-header">
          <span>媒资列表</span>
          <div class="header-actions"></div>
        </div>
      </div>

      <!-- 搜索区域 -->
      <div class="search-area">
        <el-form :inline="true" :model="searchForm">
          <!-- 左侧搜索条件 -->
          <div class="search-left">
            <el-form-item label="媒资名称">
              <el-input
                v-model="searchForm.filename"
                placeholder="请输入媒资名称"
                clearable
                class="wider-input"
              ></el-input>
            </el-form-item>
            <el-form-item label="媒资类型">
              <el-select
                v-model="searchForm.type"
                placeholder="请选择媒资类型"
                clearable
                class="wider-select"
              >
                <el-option label="视频" value="视频"></el-option>
                <el-option label="音频" value="音频"></el-option>
                <el-option label="文档" value="文档"></el-option>
                <el-option label="图片" value="图片"></el-option>
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

      <!-- 媒资内容 -->
      <div v-loading="loading" class="media-container">
        <el-empty
          v-if="mediaList.length === 0"
          description="暂无媒资数据"
        ></el-empty>

        <el-table v-else :data="mediaList" style="width: 100%" border>
          <el-table-column
            prop="filename"
            label="文件名称"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="fileId"
            label="文件标识"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="createDate"
            label="上传时间"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="上传人"
            width="120"
          ></el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="scope">
              <el-button link type="primary" @click="handlePreview(scope.row)"
                >预览</el-button
              >
              <el-button link type="danger" @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 内容占位空间，防止内容被分页遮挡 -->
      <div class="content-spacer"></div>

      <!-- 分页区域 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
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

    <!-- 预览弹窗 -->
    <el-dialog
      v-model="previewDialogVisible"
      title="媒资预览"
      width="60%"
      :before-close="handleClosePreview"
    >
      <div v-if="currentMedia" class="preview-content">
        <!-- 根据媒资类型显示不同的预览内容 -->
        <div v-if="currentMedia.type === '视频'" class="video-preview">
          <video
            :src="currentMedia.url"
            controls
            style="width: 100%; max-height: 500px"
          ></video>
        </div>
        <div v-else-if="currentMedia.type === '音频'" class="audio-preview">
          <audio :src="currentMedia.url" controls style="width: 100%"></audio>
        </div>
        <div v-else-if="currentMedia.type === '图片'" class="image-preview">
          <img
            :src="currentMedia.url"
            style="max-width: 100%; max-height: 500px"
          />
        </div>
        <div v-else class="document-preview">
          <p>{{ currentMedia.filename }}</p>
          <el-button type="primary" @click="openUrl(currentMedia.url)">
            打开文档
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getMediaPageList, previewMedia, deleteMedia } from "@/api/media";

const loading = ref(false);
const mediaList = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const searchForm = reactive({
  filename: "",
  type: "",
});

// 预览相关
const previewDialogVisible = ref(false);
const currentMedia = ref(null);

// 获取媒资列表数据
const fetchMediaList = async () => {
  console.log("尝试获取媒资列表...");
  loading.value = true;
  try {
    // 查询参数
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
    };

    // body参数包含搜索条件
    const body = {
      filename: searchForm.filename || "",
      type: searchForm.type || "",
    };

    const response = await getMediaPageList(params, body);
    console.log("媒资列表响应:", response);

    if (response && response.items) {
      mediaList.value = response.items;
      total.value = response.counts || 0;
    } else {
      mediaList.value = [];
      total.value = 0;
      ElMessage.warning("获取媒资列表数据格式不正确");
    }
  } catch (error) {
    console.error("获取媒资列表失败:", error);
    ElMessage.error("获取媒资列表失败");
    // 使用默认数据
    mediaList.value = [
      {
        id: "demo-1",
        filename: "示例视频.mp4",
        type: "视频",
        fileId: "demo-file-001",
        createDate: "2025-04-01",
        username: "admin",
        url: "https://example.com/video.mp4",
      },
    ];
    total.value = 1;
  } finally {
    loading.value = false;
  }
};

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1; // 重置页码
  fetchMediaList();
};

// 处理重置
const handleReset = () => {
  searchForm.filename = "";
  searchForm.type = "";
  currentPage.value = 1;
  fetchMediaList();
};

// 分页方法
const handleSizeChange = (val) => {
  pageSize.value = val;
  fetchMediaList();
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchMediaList();
};

// 预览媒资
const handlePreview = async (row) => {
  try {
    const previewData = await previewMedia(row.id);
    currentMedia.value = {
      ...row,
      url: previewData.url || row.url,
    };
    previewDialogVisible.value = true;
  } catch (error) {
    console.error("预览失败:", error);
    ElMessage.error("预览失败");
  }
};

// 关闭预览
const handleClosePreview = () => {
  previewDialogVisible.value = false;
  currentMedia.value = null;
};

// 打开URL
const openUrl = (url) => {
  if (url) {
    window.open(url, "_blank");
  }
};

// 删除媒资
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除媒资 "${row.filename}" 吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteMedia(row.id);
        ElMessage.success("删除成功");
        fetchMediaList(); // 重新加载列表
      } catch (error) {
        console.error("删除失败:", error);
        ElMessage.error("删除失败");
      }
    })
    .catch(() => {
      // 用户取消删除
    });
};

onMounted(() => {
  fetchMediaList();
});
</script>

<style scoped lang="less">
.media-list {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}

.content-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 25px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  position: relative;
}

.header-section {
  margin-bottom: 30px;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 22px;
  font-weight: 600;
  color: #303133;
}

.search-area {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  padding-bottom: 25px;

  /* 调整搜索区域布局 */
  :deep(.el-form) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
  }

  .search-left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .search-right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  /* 修改表单项为弹性布局，确保垂直居中 */
  :deep(.el-form-item) {
    margin-bottom: 10px;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }

  /* 调整标签样式 */
  :deep(.el-form-item__label) {
    font-size: 17px;
    font-weight: 500;
    padding-right: 15px;
    color: #303133;
    height: 46px;
    line-height: 46px;
    display: flex;
    align-items: center;
    margin: 0;
  }

  /* 统一输入框和选择框样式 */
  .wider-input,
  .wider-select {
    width: 300px !important;
  }
}

.media-container {
  width: 100%;
  flex: 1;
}

/* 防止分页区域遮挡内容的占位空间 */
.content-spacer {
  height: 70px;
  width: 100%;
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
  }
}

/* 预览弹窗样式 */
.preview-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
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
    height: 100px;
  }

  .pagination-container {
    padding: 10px 0;

    :deep(.el-pagination) {
      .el-pagination__sizes {
        display: none;
      }
    }
  }
}
</style>
