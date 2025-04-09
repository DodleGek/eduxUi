<template>
    <el-card shadow="hover">
        <div class="card-header">
            <span>最新公告</span>
            <el-button type="text" @click="$emit('view-all')">查看全部</el-button>
        </div>
        <div class="notice-list">
            <div v-for="(item, index) in notices" :key="item.id" class="notice-item"
                @click="$emit('view-detail', item)">
                <el-badge v-if="item.important" type="danger" />
                <div class="notice-title">{{ item.title }}</div>
                <div class="notice-time">{{ item.time }}</div>
            </div>
            <el-empty v-if="!notices.length" description="暂无公告" />
        </div>
    </el-card>
</template>

<script setup>
defineProps({
    notices: {
        type: Array,
        default: () => []
    }
});

defineEmits(['view-detail', 'view-all']);
</script>

<style scoped lang="less">
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

.notice-list {
    .notice-item {
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background-color: #f5f7fa;
            padding-left: 10px;
        }

        .notice-title {
            flex: 1;
            font-size: 14px;
            color: #303133;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .notice-time {
            margin-left: 15px;
            font-size: 12px;
            color: #909399;
        }
    }
}
</style>