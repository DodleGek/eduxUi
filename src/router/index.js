import { createRouter, createWebHashHistory } from 'vue-router'

// 制定路由规则
const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home.vue'),
                meta: {
                    title: '首页',
                    icon: 'house'
                }
            },
            // 课程管理相关路由
            {
                path: '/course/courseList',
                name: 'courseList',
                component: () => import('@/views/course/CourseList.vue'),
                meta: {
                    title: '课程列表',
                    icon: 'document',
                    parentTitle: '课程管理'
                }
            },
            {
                path: '/course/courseEdit',
                name: 'courseEdit',
                component: () => import('@/views/course/CourseEdit.vue'),
                meta: {
                    title: '课程创建/编辑',
                    icon: 'document',
                    parentTitle: '课程管理'
                }
            },
            {
                path: '/course/courseDetail',
                name: 'courseDetail',
                component: () => import('@/views/course/CourseDetail.vue'),
                meta: {
                    title: '课程详情',
                    icon: 'document',
                    parentTitle: '课程管理'
                }
            },
            // 媒资管理相关路由
            {
                path: '/media/list',
                name: 'mediaList',
                component: () => import('@/views/media/MediaList.vue'),
                meta: {
                    title: '媒资列表',
                    icon: 'picture',
                    parentTitle: '媒资管理'
                }
            },
            {
                path: '/media/upload',
                name: 'upload',
                component: () => import('@/views/media/MediaUpload.vue'), // 修改这里，使用MediaUpload而不是Upload
                meta: {
                    title: '媒资上传',
                    icon: 'upload',
                    parentTitle: '媒资管理'
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router