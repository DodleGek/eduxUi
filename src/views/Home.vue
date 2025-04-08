<script setup>
import { ref } from 'vue';

const getImgUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href;
}

// 修改为计划表数据
const tableData = ref([
    {
        name: '学习Vue3基础知识',
        time: '09:00-10:30',
        status: '已完成'
    },
    {
        name: '完成项目页面设计',
        time: '13:00-15:00',
        status: '未完成'
    },
    {
        name: '阅读技术文档',
        time: '16:00-17:30',
        status: '未完成'
    }
]);

// 修改表头名称
const tableLable = ref({
    name: '计划内容',
    time: '计划时间',
    status: '完成状态'
});

// 修改切换计划完成状态的方法，在字符串状态间切换
const toggleStatus = (row) => {
    row.status = row.status === '已完成' ? '未完成' : '已完成';
};

</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImgUrl('user')" class="user" />
                    <div class="user-info">
                        <p class="user-info-admin">admin</p>
                        <p class="user-info-p">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>登录时间:<span>{{ loginTime }}</span></p>
                    <p>登录IP:<span>{{ loginIp }}</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" class="user-table">
                <div class="card-header">
                    <span>我的每日计划</span>
                    <el-button type="primary" size="small">添加计划</el-button>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column v-for="(val, key) in tableLable" :key="key" :prop="key" :label="val"
                        v-if="key !== 'status'">
                    </el-table-column>

                    <el-table-column width="80">
                        <template #default="scope">
                            <div class="checkbox-wrapper" @click="toggleStatus(scope.row)">
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
        </el-col>

    </el-row>
</template>


<style scoped lang="less">
.home {
    height: 100%;
    overflow: hidden;

    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }

        .user-info {
            p {
                line-height: 40px;
            }

            .user-info-p {
                color: #999;
            }

            .user-info-admin {
                font-size: 35px;
            }
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px
            }
        }
    }

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

        // 仅修改样式部分，不改变模板结构
        .checkbox-wrapper {
            display: flex;
            justify-content: center;
            cursor: pointer;

            .custom-checkbox {
                width: 10px;  // 从20px改为10px
                height: 10px; // 从20px改为10px
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
                    font-size: 8px;  // 从14px改为8px
                    transform: scale(0.8);  // 缩小图标比例
                }
            }
        }
    }

    // 添加样式确保表格列的宽度比例合适
    :deep(.el-table) {
        .el-table__header {
            th:first-child {
                width: 65% !important;  // 第一列宽度65%
            }
            
            th:nth-child(2) {
                width: 25% !important;  // 第二列宽度25%
            }
            
            th:last-child {
                width: 10% !important;  // 第三列(勾选列)宽度10%
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

}
</style>