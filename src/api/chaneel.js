import requres from '@/utils/requres'
/**
 *获取用户自己的频道
 * @returns Promise
 */
export const getChannelAPI = () => {
  return requres({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannelsAPI = () => {
  return requres({
    url: '/v1_0/channels'
  })
}
/**
 * 删除频道
 * @param {Number|String} id 频道的id
 * @returns Promise
 */
export const delChannelsAPI = (id) => {
  return requres({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
/**
 * 新增频道
 * @param {String|Number} id新增频道的id
 * @param {Number} seq 新增频道添加的索引值
 * @returns Promise
 */
export const addChannelsAPI = (id, seq) => {
  return requres({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
