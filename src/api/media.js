import { createAPI } from '@/utils/request'

// 机构查询媒资信息
export async function getMediaPageList(params, body) {
  const { data } = await createAPI('/media/files', 'post', params, body)
  return data
}

// 获取视频上传凭证
export async function getVodToken(body) {
  const { data } = await createAPI('/media/media/vod-token', 'post', null, body)
  return data
}

// 保存媒资信息
export async function saveMedia(body) {
  const { data } = await createAPI('/media/media', 'post', null, body)
  return data
}

// 预览点播视频
export async function previewMedia(mediaId) {
  const { data } = await createAPI(`/media/preview/${mediaId}`, 'get')
  return data
}

// 删除媒资信息
export async function deleteMedia(id) {
  const { data } = await createAPI(`/media/${id}`, 'delete')
  return data
}