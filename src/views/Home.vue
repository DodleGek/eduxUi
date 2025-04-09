<script setup>
import { ref, onMounted, reactive } from 'vue';
import { getPlans, updatePlanStatus, getDashboardStats } from '@/api/home';
import PieChart from '@/components/home/PieChart.vue';
import UserInfoCard from '@/components/home/UserInfoCard.vue';
import DailyPlanTable from '@/components/home/DailyPlanTable.vue';
import NoticeList from '@/components/home/NoticeList.vue';
import NoticeDetailDialog from '@/components/home/NoticeDetailDialog.vue';

// 用户信息数据
const loginTime = ref('2025-04-09 17:45:22');
const loginIp = ref('192.168.1.100');
const userData = {
    username: 'admin',
    role: '超级管理员',
    avatar: 'user'
};

// 计划表数据
const tableData = ref([
    {
        name: '加载中...',
        time: '...',
        status: '未完成'
    }
]);

// 公告数据
const notices = ref([]);

// 课程技术分布数据
const courseStats = reactive({
    categories: [],
    values: []
});

// 表头名称
const tableLable = ref({
    name: '计划内容',
    time: '计划时间',
    status: '完成状态'
});

// 切换计划完成状态
const handleUpdateStatus = async (row) => {
    const newStatus = row.status === '已完成' ? '未完成' : '已完成';
    try {
        // 先更新UI
        row.status = newStatus;
        // 然后调用API更新后端
        if (row.id) {
            await updatePlanStatus(row.id, newStatus);
        }
    } catch (error) {
        console.error('更新计划状态失败:', error);
        // 如果API调用失败，恢复原状态
        row.status = row.status === '已完成' ? '未完成' : '已完成';
    }
};

// 添加新计划
const handleAddPlan = () => {
    // 实现添加计划的逻辑
    console.log('添加新计划');
    // 这里可以打开一个表单弹窗
};

// 获取表格数据
const getTableData = async () => {
    try {
        const response = await getPlans();
        if (response && response.plans) {
            tableData.value = response.plans;
        }
    } catch (error) {
        console.error('获取计划数据失败:', error);
    }
};

// 获取统计数据和通知
const getStatisticsData = async () => {
    try {
        const response = await getDashboardStats();
        if (response) {
            // 填充公告数据
            if (response.notices) {
                notices.value = response.notices;
            }

            // 填充课程技术分布数据
            if (response.courseStats) {
                courseStats.categories = response.courseStats.categories;
                courseStats.values = response.courseStats.values;
            }
        }
    } catch (error) {
        console.error('获取统计数据失败:', error);
    }
};

// 查看全部公告
const handleViewAllNotices = () => {
    console.log('查看全部公告');
    // 实现查看全部公告的逻辑，如导航到公告页面
};

// 处理公告详情
const currentNotice = ref(null);
const showNoticeDialog = ref(false);

const handleViewNoticeDetail = (notice) => {
    currentNotice.value = notice;
    showNoticeDialog.value = true;
};

onMounted(() => {
    getTableData();
    getStatisticsData();
});
</script>

<template>
    <el-row class="home" :gutter="20">
        <!-- 左侧 - 用户信息和计划表 -->
        <el-col :span="8" style="margin-top: 20px;">
            <UserInfoCard :username="userData.username" :role="userData.role" :avatar="userData.avatar"
                :login-time="loginTime" :login-ip="loginIp" />

            <DailyPlanTable :plans="tableData" :columns="tableLable" @update-status="handleUpdateStatus"
                @add-plan="handleAddPlan" />
        </el-col>

        <!-- 右上侧 - 最新公告 -->
        <el-col :span="16" style="margin-top: 20px;">
            <NoticeList :notices="notices" @view-detail="handleViewNoticeDetail" @view-all="handleViewAllNotices" />

            <!-- 右下侧 - 课程技术分布饼图 -->
            <el-card shadow="hover" style="margin-top: 20px; height: 340px;">
                <div class="card-header">
                    <span>课程技术分布</span>
                </div>
                <PieChart chartId="courseChart" :categories="courseStats.categories" :values="courseStats.values"
                    title="课程技术分布" seriesName="课程数量" height="280px" />
            </el-card>
        </el-col>
    </el-row>

    <!-- 公告详情弹窗 -->
    <NoticeDetailDialog v-model="showNoticeDialog" :notice="currentNotice" />
</template>

<style scoped lang="less">
.home {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        span {
            font-size: 16px;
            font-weight: bold;
        }
    }
}
</style>