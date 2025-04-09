import { createAPI } from '@/utils/request'

// 获取首页计划数据
export async function getPlans() {
  const { data } = await createAPI('/api/plans')
  return data
}

// 提交每日计划
export async function submitPlan(plan) {
  const { data } = await createAPI('/api/plans', 'post', undefined, plan)
  return data
}

// 更新计划状态
export async function updatePlanStatus(planId, status) {
  const { data } = await createAPI(`/api/plans/${planId}/status`, 'put', undefined, { status })
  return data
}

// 删除计划
export async function removePlan(planId) {
  await createAPI(`/api/plans/${planId}`, 'delete')
}

// 获取统计数据
export async function getDashboardStats() {
  const { data } = await createAPI('/api/dashboard/stats')
  return data
}