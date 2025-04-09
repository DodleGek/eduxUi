<template>
    <el-dialog v-model="dialogVisible" :title="notice?.title" width="50%">
        <p class="notice-date">发布日期：{{ notice?.time }}</p>
        <p class="notice-content">{{ notice?.content }}</p>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeDialog">关闭</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    notice: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['update:modelValue']);

const dialogVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

const closeDialog = () => {
    dialogVisible.value = false;
};
</script>

<style scoped>
.notice-date {
    color: #909399;
    font-size: 14px;
    margin-bottom: 15px;
}

.notice-content {
    line-height: 1.6;
    color: #303133;
    font-size: 14px;
}
</style>