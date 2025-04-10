import Mock from "mockjs";

console.log("初始化媒资Mock数据...");

// 媒资列表数据
Mock.mock("/media/files", "post", {
  code: 200,
  data: {
    items: [
      {
        id: "1",
        filename: "课程介绍.mp4",
        type: "视频",
        fileId: "file-001",
        createDate: "2025-04-01 10:20:30",
        username: "admin",
        bucket: "media-bucket",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      },
      {
        id: "2",
        filename: "课程资料.pdf",
        type: "文档",
        fileId: "file-002",
        createDate: "2025-04-02 09:15:22",
        username: "teacher1",
        bucket: "media-bucket",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: "3",
        filename: "教学指南.docx",
        type: "文档",
        fileId: "file-003",
        createDate: "2025-04-03 14:30:10",
        username: "admin",
        bucket: "media-bucket",
        url: "https://example.com/document.docx",
      },
      {
        id: "4",
        filename: "教学音频.mp3",
        type: "音频",
        fileId: "file-004",
        createDate: "2025-04-04 16:45:20",
        username: "teacher2",
        bucket: "media-bucket",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        id: "5",
        filename: "课程封面.jpg",
        type: "图片",
        fileId: "file-005",
        createDate: "2025-04-05 11:10:05",
        username: "admin",
        bucket: "media-bucket",
        url: "https://via.placeholder.com/800x450",
      },
    ],
    counts: 5,
    page: 1,
    pageSize: 10,
  },
});

// 预览媒资信息
Mock.mock(/\/media\/preview\/\d+/, "get", function (options) {
  const id = options.url.match(/\/media\/preview\/(\d+)/)[1];

  // 根据ID返回不同的URL
  let url;
  switch (id) {
    case "1":
      url =
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
      break;
    case "2":
      url =
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      break;
    case "3":
      url = "https://example.com/document.docx";
      break;
    case "4":
      url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      break;
    case "5":
      url = "https://via.placeholder.com/800x450";
      break;
    default:
      url = "https://via.placeholder.com/800x450";
  }

  return {
    code: 200,
    data: {
      url: url,
    },
  };
});

// 获取视频上传凭证
Mock.mock("/media/media/vod-token", "post", {
  code: 200,
  data: {
    requestId: Mock.Random.guid(),
    uploadAddress: "https://example-upload.com/upload",
    uploadAuth: "mock-auth-token",
    videoId: "video-" + Mock.Random.guid(),
    userId: "user-001",
  },
});

// 保存媒资信息
Mock.mock("/media/media", "post", {
  code: 200,
  data: {
    id: Mock.Random.guid(),
    success: true,
  },
});

// 删除媒资
Mock.mock(/\/media\/\d+/, "delete", {
  code: 200,
  data: {
    success: true,
  },
});

console.log("媒资Mock数据初始化完成");
