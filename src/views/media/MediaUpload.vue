<template>
  <div class="media-upload">
    <div class="content-wrapper">
      <div class="header-section">
        <div class="card-header">
          <span>媒资上传</span>
        </div>
      </div>

      <div class="upload-container">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="本地上传" name="local">
            <div class="upload-area">
              <el-upload
                class="upload-dropzone"
                drag
                :multiple="false"
                :auto-upload="false"
                :show-file-list="true"
                :on-change="handleFileChange"
                :file-list="fileList"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  拖拽文件到此处或 <em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    支持视频、音频、文档等常见格式文件，单个文件不超过500MB
                  </div>
                </template>
              </el-upload>

              <div class="file-info" v-if="currentFile">
                <h3>文件信息</h3>
                <p>文件名称：{{ currentFile.name }}</p>
                <p>
                  文件大小：{{ (currentFile.size / 1024 / 1024).toFixed(2) }} MB
                </p>
                <p>文件类型：{{ currentFile.type || "未知" }}</p>
              </div>

              <div class="upload-actions" v-if="currentFile">
                <el-button
                  type="primary"
                  @click="handleUpload"
                  :loading="uploading"
                >
                  开始上传
                </el-button>
                <el-button @click="handleCancel">取消</el-button>
              </div>

              <div
                v-if="uploadProgress > 0 && uploadProgress < 100"
                class="progress-area"
              >
                <el-progress
                  :percentage="uploadProgress"
                  :format="percentFormat"
                  :stroke-width="15"
                  status="success"
                ></el-progress>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="视频上传" name="video">
            <div class="upload-area">
              <p class="video-upload-tip">
                视频上传支持云端分发，获取更好的播放体验
              </p>
              <el-upload
                class="upload-dropzone"
                drag
                :multiple="false"
                :auto-upload="false"
                :show-file-list="true"
                :on-change="handleVideoChange"
                :file-list="videoFileList"
                accept="video/*"
              >
                <el-icon class="el-icon--upload"><video-camera /></el-icon>
                <div class="el-upload__text">
                  拖拽视频文件到此处或 <em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    支持MP4、AVI、MOV等常见视频格式，单个文件不超过2GB
                  </div>
                </template>
              </el-upload>

              <div class="file-info" v-if="currentVideoFile">
                <h3>视频信息</h3>
                <p>文件名称：{{ currentVideoFile.name }}</p>
                <p>
                  文件大小：{{
                    (currentVideoFile.size / 1024 / 1024).toFixed(2)
                  }}
                  MB
                </p>
                <p>文件类型：{{ currentVideoFile.type || "未知" }}</p>
              </div>

              <div class="upload-actions" v-if="currentVideoFile">
                <el-button
                  type="primary"
                  @click="handleVideoUpload"
                  :loading="videoUploading"
                >
                  开始上传
                </el-button>
                <el-button @click="handleVideoCancel">取消</el-button>
              </div>

              <div
                v-if="videoUploadProgress > 0 && videoUploadProgress < 100"
                class="progress-area"
              >
                <el-progress
                  :percentage="videoUploadProgress"
                  :format="percentFormat"
                  :stroke-width="15"
                  status="success"
                ></el-progress>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { UploadFilled, VideoCamera } from "@element-plus/icons-vue";
import { getVodToken, saveMedia } from "@/api/media";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("local");
const fileList = ref([]);
const videoFileList = ref([]);
const currentFile = ref(null);
const currentVideoFile = ref(null);
const uploading = ref(false);
const videoUploading = ref(false);
const uploadProgress = ref(0);
const videoUploadProgress = ref(0);

// 本地文件上传相关
const handleFileChange = (file) => {
  currentFile.value = file.raw;
  fileList.value = [file];
};

const handleCancel = () => {
  currentFile.value = null;
  fileList.value = [];
  uploadProgress.value = 0;
};

// 模拟上传进度
const simulateProgress = (progressRef) => {
  progressRef.value = 0;
  const timer = setInterval(() => {
    if (progressRef.value < 90) {
      progressRef.value += Math.floor(Math.random() * 10);
    } else {
      clearInterval(timer);
    }
  }, 500);
  return timer;
};

const handleUpload = async () => {
  if (!currentFile.value) {
    ElMessage.error("请先选择要上传的文件");
    return;
  }

  uploading.value = true;
  const progressTimer = simulateProgress(uploadProgress);

  try {
    // 这里实现文件上传逻辑
    // 这里模拟文件上传完成的处理
    setTimeout(async () => {
      clearInterval(progressTimer);
      uploadProgress.value = 100;

      // 保存媒资信息
      await saveMedia({
        filename: currentFile.value.name,
        fileId: `file-${Date.now()}`, // 模拟文件ID
        type: getFileType(currentFile.value.type),
      });

      ElMessage.success("上传成功");
      setTimeout(() => {
        handleCancel();
        uploading.value = false;
        // 上传成功后导航到媒资列表
        router.push("/media/list");
      }, 1000);
    }, 3000);
  } catch (error) {
    clearInterval(progressTimer);
    console.error("上传失败:", error);
    ElMessage.error("上传失败");
    uploading.value = false;
    uploadProgress.value = 0;
  }
};

// 获取文件类型分类
const getFileType = (mimeType) => {
  if (!mimeType) return "其他";

  if (mimeType.startsWith("video/")) {
    return "视频";
  } else if (mimeType.startsWith("audio/")) {
    return "音频";
  } else if (mimeType.startsWith("image/")) {
    return "图片";
  } else if (
    mimeType.includes("pdf") ||
    mimeType.includes("word") ||
    mimeType.includes("excel") ||
    mimeType.includes("powerpoint") ||
    mimeType.includes("text")
  ) {
    return "文档";
  }

  return "其他";
};

// 视频上传相关
const handleVideoChange = (file) => {
  currentVideoFile.value = file.raw;
  videoFileList.value = [file];
};

const handleVideoCancel = () => {
  currentVideoFile.value = null;
  videoFileList.value = [];
  videoUploadProgress.value = 0;
};

const handleVideoUpload = async () => {
  if (!currentVideoFile.value) {
    ElMessage.error("请先选择要上传的视频文件");
    return;
  }

  videoUploading.value = true;
  const progressTimer = simulateProgress(videoUploadProgress);

  try {
    // 获取视频上传凭证
    const vodToken = await getVodToken({
      filename: currentVideoFile.value.name,
    });

    // 这里模拟VOD视频上传完成的处理
    setTimeout(async () => {
      clearInterval(progressTimer);
      videoUploadProgress.value = 100;

      // 保存视频媒资信息
      await saveMedia({
        filename: currentVideoFile.value.name,
        fileId: vodToken?.videoId || `video-${Date.now()}`, // 使用返回的videoId或模拟
        type: "视频",
      });

      ElMessage.success("视频上传成功");
      setTimeout(() => {
        handleVideoCancel();
        videoUploading.value = false;
        // 上传成功后导航到媒资列表
        router.push("/media/list");
      }, 1000);
    }, 3000);
  } catch (error) {
    clearInterval(progressTimer);
    console.error("视频上传失败:", error);
    ElMessage.error("视频上传失败");
    videoUploading.value = false;
    videoUploadProgress.value = 0;
  }
};

// 进度条格式化
const percentFormat = (percentage) => {
  return `${percentage}%`;
};

onMounted(() => {
  // 可在这里初始化上传相关配置
});
</script>

<style scoped lang="less">
.media-upload {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}

.content-wrapper {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 25px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
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

.upload-container {
  padding: 20px 0;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
}

.upload-dropzone {
  width: 80%;
  max-width: 600px;
  margin-bottom: 30px;

  :deep(.el-upload-dragger) {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .el-icon--upload {
      font-size: 50px;
      color: #409eff;
      margin-bottom: 15px;
    }

    .el-upload__text {
      font-size: 16px;
      color: #606266;

      em {
        color: #409eff;
        font-style: normal;
        cursor: pointer;
      }
    }
  }

  :deep(.el-upload__tip) {
    color: #909399;
    text-align: center;
    margin-top: 10px;
  }
}

.file-info {
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  background-color: #f8f9fa;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 16px;
    color: #303133;
  }

  p {
    margin: 8px 0;
    color: #606266;
  }
}

.upload-actions {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.progress-area {
  width: 80%;
  max-width: 600px;
  margin-top: 30px;
}

.video-upload-tip {
  margin-bottom: 20px;
  color: #409eff;
  font-size: 16px;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .upload-dropzone,
  .file-info,
  .progress-area {
    width: 100%;
  }

  .upload-area {
    padding: 15px 0;
  }

  .file-info {
    padding: 10px;
  }
}
</style>
