<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史/建议/搜索结果 -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
    <!-- 第一种不利于复用性 -->
    <!-- @change-keywords="[(keywords=$event),(isShowSearchResult = true)]" -->
    <!-- 第二种简洁 -->
    <!-- @change-keywords="onSearch" -->
  </div>
</template>

<script>
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
import searchSuggestion from './components/searchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史：搜索框的值为空时
      // 搜索建议：搜索框有值，并且不渲染搜索结果
      // 搜索结果：触发搜索时，显示搜索结果
      if (this.keywords === '') {
        return 'searchHistory'
      }
      // this.keywords一定有值
      if (this.isShowSearchResult) {
        return 'searchResult'
      }
      // 及不渲染搜索结果，也不渲染搜索历史
      return 'searchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把keywords关键词存起来
      // 1.用户手动敲回车 2.点击了搜索建议
      // 去重：1.获取没有去重的数组2.放在new Set(arr)3.[...set]
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role="button"] {
    color: #fff;
  }
}
</style>
