import Mock from 'mockjs'

// 创建首页计划数据的mock
Mock.mock('/api/plans', 'get', {
  code: 200,
  data: {
    plans: [
      {
        id: '1',
        name: '完成Vue3项目初始化',
        time: '09:00-11:30',
        status: '已完成'
      },
      {
        id: '2',
        name: '学习Element Plus组件',
        time: '13:00-15:00',
        status: '未完成'
      },
      {
        id: '3',
        name: '完善项目文档',
        time: '16:00-17:30',
        status: '未完成'
      },
      {
        id: '4',
        name: '解决首页数据展示问题',
        time: '18:00-20:00',
        status: '未完成'
      }
    ]
  }
})

// 提交计划的mock
Mock.mock('/api/plans', 'post', (options) => {
  const body = JSON.parse(options.body)
  return {
    code: 200,
    data: {
      id: Mock.mock('@id'),
      ...body,
    }
  }
})

// 更新计划状态的mock
Mock.mock(new RegExp('/api/plans/\\d+/status'), 'put', {
  code: 200,
  data: {
    success: true
  }
})

// 删除计划的mock
Mock.mock(new RegExp('/api/plans/\\d+'), 'delete', {
  code: 200,
  data: {
    success: true
  }
})

// 仪表盘统计数据的mock - 包含通知和课程技术统计
Mock.mock('/api/dashboard/stats', 'get', {
  code: 200,
  data: {
    totalPlans: 10,
    completedPlans: 4,
    completionRate: '40%',
    courseStats: {
      categories: ['前端开发', '后端开发', '数据库', '移动开发', '人工智能'],
      values: [42, 28, 15, 10, 5]
    },
    notices: [
      {
        id: 1,
        title: '关于2025年春季学期在线课程安排的通知',
        content: '各位老师、同学：2025年春季学期即将开始，在线课程安排已经完成，请各位老师及时查看相关安排并做好准备工作。学生可在下周一起登录系统选课。',
        time: '2025-04-08',
        important: true
      },
      {
        id: 2,
        title: '系统维护通知：4月15日系统升级',
        content: '尊敬的用户：本系统将于4月15日凌晨2:00-5:00进行例行维护升级，届时系统将暂停服务。请您提前做好相关工作安排，由此带来的不便敬请谅解。',
        time: '2025-04-07',
        important: false
      },
      {
        id: 3,
        title: '新功能发布：课程统计分析工具上线',
        content: '我们很高兴地通知您，全新的课程统计分析工具已经上线。该工具可帮助教师追踪学生学习进度、参与度及考核情况，提供直观的数据可视化展示。',
        time: '2025-04-05',
        important: false
      },
      {
        id: 4,
        title: '关于期末课程考核方式的说明',
        content: '各位教师：关于本学期期末考核方式，请注意以下几点：1. 线上考试需提前一周提交试题；2. 线下考试需提前两周预约考场；3. 大作业评分标准需提前告知学生。',
        time: '2025-04-03',
        important: true
      }
    ],
    recentActivity: [
      { 
        time: '2025-04-09 15:20', 
        action: '完成了计划: Vue3项目初始化' 
      },
      { 
        time: '2025-04-09 13:15', 
        action: '创建了新计划: 学习Element Plus组件' 
      }
    ]
  }
})