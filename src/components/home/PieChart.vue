<template>
    <div :id="chartId" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

// 定义组件属性
const props = defineProps({
    // 图表ID，确保页面上唯一
    chartId: {
        type: String,
        default: () => `chart-${Date.now()}`
    },
    // 图表宽度
    width: {
        type: String,
        default: '100%'
    },
    // 图表高度
    height: {
        type: String,
        default: '300px'
    },
    // 标题
    title: {
        type: String,
        default: '数据分布'
    },
    // 系列名称
    seriesName: {
        type: String,
        default: '数量'
    },
    // 分类名称
    categories: {
        type: Array,
        default: () => []
    },
    // 对应的数值
    values: {
        type: Array,
        default: () => []
    }
});

// 图表实例
let chartInstance = null;

// 初始化图表
const initChart = () => {
    const chartDom = document.getElementById(props.chartId);
    if (!chartDom) return;

    // 创建或复用图表实例
    chartInstance = chartInstance || echarts.init(chartDom);

    // 配置选项
    const option = {
        title: {
            text: props.title,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: props.categories
        },
        series: [
            {
                name: props.seriesName,
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 18,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: props.categories.map((category, index) => ({
                    value: props.values[index],
                    name: category
                }))
            }
        ]
    };

    // 设置图表
    chartInstance.setOption(option);
};

// 响应数据变化重新渲染图表
watch(() => [...props.categories, ...props.values], () => {
    if (chartInstance) {
        initChart();
    }
}, { deep: true });

// 响应窗口大小变化
const handleResize = () => {
    if (chartInstance) {
        chartInstance.resize();
    }
};

// 生命周期钩子
onMounted(() => {
    initChart();
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    if (chartInstance) {
        chartInstance.dispose();
        chartInstance = null;
    }
});
</script>