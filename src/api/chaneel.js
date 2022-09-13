import requres from '@/utils/requres'

export const getChannelAPI = () => {
  return requres({
    url: '/v1_0/user/channels'
  })
}
