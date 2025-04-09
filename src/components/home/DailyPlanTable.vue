<template>
    <el-card shadow="hover" class="user-table">
        <div class="card-header">
            <span>我的每日计划</span>
            <el-button type="primary" size="small" @click="$emit('add-plan')">添加计划</el-button>
        </div>
        <el-table :data="plans" style="width: 100%">
            <el-table-column v-for="(val, key, index) in columns" :key="index" :prop="key" :label="val"
                v-if="key !== 'status'">
            </el-table-column>

            <el-table-column width="80">
                <template #default="scope">
                    <div class="checkbox-wrapper" @click="togglePlanStatus(scope.row)">
                        <div class="custom-checkbox" :class="{ 'is-checked': scope.row.status === '已完成' }">
                            <el-icon v-if="scope.row.status === '已完成'">
                                <Check />
                            </el-icon>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup>
import { Check } from '@element-plus/icons-vue';

const props = defineProps({
    plans: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Object,
        default: () => ({
            name: '计划内容',
            time: '计划时间',
            status: '完成状态'
        })
    }
});

const emit = defineEmits(['update-status', 'add-plan']);

const togglePlanStatus = (row) => {
    emit('update-status', row);
};
</script>

<style scoped lang="less">
.user-table {
    margin-top: 20px;

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

    .checkbox-wrapper {
        display: flex;
        justify-content: center;
        cursor: pointer;

        .custom-checkbox {
            width: 10px;
            height: 10px;
            border: 1px solid #dcdfe6;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;

            &.is-checked {
                background-color: #67c23a;
                border-color: #67c23a;
                color: white;
            }

            .el-icon {
                font-size: 8px;
                transform: scale(0.8);
            }
        }
    }
}

:deep(.el-table) {
    .el-table__header {
        th:first-child {
            width: 65% !important;
        }

        th:nth-child(2) {
            width: 25% !important;
        }

        th:last-child {
            width: 10% !important;
        }
    }

    .el-table__body {
        td:first-child {
            width: 65% !important;
        }

        td:nth-child(2) {
            width: 25% !important;
        }

        td:last-child {
            width: 10% !important;
        }
    }
}
</style>