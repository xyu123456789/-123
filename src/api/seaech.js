import requres from '@/utils/requres'

export const getSuggestionsAPI = (q) => {
  return requres({
    url: 'v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 *获取搜索结果
 * @param {*} page 分页页数，非必填，不填默认值1
 * @param {*} per_page 每一页数据的数量
 * @param {*} q 搜索关键词
 * @returns
 */
export const getResultsAPI = (/* eslint-disable-line */ page, per_page, q) => {
  return requres({
    url: 'v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
