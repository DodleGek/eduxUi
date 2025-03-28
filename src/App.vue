<template>
  <el-config-provider :size="elSize">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 根据屏幕大小自适应组件尺寸
const elSize = computed(() => (document.body.clientWidth >= 500 ? 'large' : 'default'))
</script>
