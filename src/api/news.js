import requres from '@/utils/requres'
/**
 *
 * @param {Steing|Number} id 频道的id
 * @param {Number} timestamp 请求新的推荐数据传当前的时间挫，请求历史
 * @returns
 */
export const getArticles = (id, timestamp) => {
  return requres({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
