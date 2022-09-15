import requres from '@/utils/requres'

export const getSuggestionsAPI = (q) => {
  return requres({
    url: 'v1_0/suggestion',
    params: {
      q
    }
  })
}
