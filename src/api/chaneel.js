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

export const getAllChannelsAPI = () => {
  return requres({
    url: '/v1_0/channels'
  })
}
