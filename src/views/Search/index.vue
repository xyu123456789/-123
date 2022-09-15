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
      @focus="isShowSearchResult=false"
      />
    </form>
    <!-- 搜索历史/建议/搜索结果 -->
    <component :keywords="keywords" :is="componentName"></component>

  </div>
</template>

<script>
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
import searchSuggestion from './components/searchSuggestion.vue'
export default {
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  computed: {
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
    onSearch() {
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
.search{
  [role='button']{
    color: #fff;
  }
}
</style>
