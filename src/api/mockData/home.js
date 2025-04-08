export default {
  getTableData: () => {
    return {
      code: 200,
      message: "success",
      data: {
        plans: [
          {
            id: 1,
            name: "完成项目报告",
            time: "2023-05-15",
            status: "已完成",
          },
          {
            id: 2,
            name: "客户需求分析",
            time: "2023-05-18",
            status: "进行中",
          },
          {
            id: 3,
            name: "团队周会",
            time: "2023-05-20 14:00",
            status: "未开始",
          },
          {
            id: 4,
            name: "系统设计评审",
            time: "2023-05-22 10:30",
            status: "已完成",
          },
          {
            id: 5,
            name: "代码重构",
            time: "2023-05-25",
            status: "进行中",
          },
          {
            id: 6,
            name: "用户体验测试",
            time: "2023-05-28",
            status: "未开始",
          },
          {
            id: 7,
            name: "项目交付准备",
            time: "2023-06-01",
            status: "未开始",
          },
        ],
      },
    };
  },
};
