import Mock from 'mockjs'

console.log("初始化课程Mock数据...")

// 课程列表数据 - 使用精确路径模拟POST请求
Mock.mock('/api/course/list', 'post', {
  code: 200,
  data: {
    list: [
      {
        id: '1',
        courseName: 'Vue3实战教程',
        courseCategory: '前端开发',
        teacherName: '张三',
        createTime: '2025-04-01',
        status: '已发布'
      },
      {
        id: '2',
        courseName: 'React高级开发',
        courseCategory: '前端开发',
        teacherName: '李四',
        createTime: '2025-04-02',
        status: '未发布'
      },
      {
        id: '3',
        courseName: 'Spring Boot实战',
        courseCategory: '后端开发',
        teacherName: '王五',
        createTime: '2025-04-03',
        status: '审核中'
      }
    ],
    total: 3
  }
})

// 课程详情数据 - 为常用ID创建单独的Mock
Mock.mock('/api/course/1', 'get', {
  code: 200,
  message: '获取成功',
  data: {
    id: '1',
    courseName: 'Vue3实战教程',
    courseCategory: '前端开发',
    teacherName: '张三',
    createTime: '2025-04-01',
    status: '已发布',
    description: '本课程详细讲解Vue3的新特性和实战应用'
  }
})

Mock.mock('/api/course/2', 'get', {
  code: 200,
  message: '获取成功',
  data: {
    id: '2',
    courseName: 'React高级开发',
    courseCategory: '前端开发',
    teacherName: '李四',
    createTime: '2025-04-02',
    status: '未发布',
    description: '深入学习React高级特性和性能优化技巧'
  }
})

Mock.mock('/api/course/3', 'get', {
  code: 200,
  message: '获取成功',
  data: {
    id: '3',
    courseName: 'Spring Boot实战',
    courseCategory: '后端开发',
    teacherName: '王五',
    createTime: '2025-04-03',
    status: '审核中',
    description: 'Spring Boot框架快速入门与项目实战'
  }
})

// 删除课程 - 为每个ID创建单独的Mock
Mock.mock('/api/course/1', 'delete', {
  code: 200,
  message: '删除成功',
  data: null
})

Mock.mock('/api/course/2', 'delete', {
  code: 200,
  message: '删除成功',
  data: null
})

Mock.mock('/api/course/3', 'delete', {
  code: 200,
  message: '删除成功',
  data: null
})

// 新增/编辑课程
Mock.mock('/api/course', 'post', {
  code: 200,
  message: '创建成功',
  data: {
    id: '4' // 使用固定ID
  }
})

Mock.mock('/api/course', 'put', {
  code: 200,
  message: '更新成功',
  data: {
    success: true
  }
})

// 课程分类
Mock.mock('/api/course-category/tree-nodes', 'get', {
  code: 200,
  data: [
    {
      id: '1',
      name: '前端开发',
      children: [
        { id: '1-1', name: 'Vue' },
        { id: '1-2', name: 'React' }
      ]
    },
    {
      id: '2',
      name: '后端开发',
      children: [
        { id: '2-1', name: 'Java' },
        { id: '2-2', name: 'Python' }
      ]
    }
  ]
})

// 提交审核
Mock.mock('/api/courseaudit/commit/1', 'post', {
  code: 200,
  message: '提交审核成功',
  data: null
})

// 课程发布
Mock.mock('/api/coursepublish/1', 'post', {
  code: 200,
  message: '发布成功',
  data: null
})

// 课程下架
Mock.mock('/api/courseoffline/1', 'get', {
  code: 200,
  message: '下架成功',
  data: null
})

console.log("课程Mock数据初始化完成")