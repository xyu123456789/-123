<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @load：触底的时候触发load事件 -->
    <!-- offset:规定滚动条和底部距离多少的时候触发loda事件，默认是300px -->
    <!-- immediate-check:初渲染的时候是否执行load事件，默认值是true -->
    <!-- v-model去绑定loading v-model="loading" -->
    <!-- loading如果为true，load事件不会被触发 -->
    <!-- loading如果为false，load事件会被触发 -->
    <!-- loading 会在load事件执行后，会被van-list组件自动设置为true-->
    <!-- finished:booleon. false:load事件会被触发 true:load事件不会被触发,并且触发finished-text的文本 -->
    <van-pull-refresh v-model="refreshing" @refresh="onLoad">
      <van-list
      offset="100"
      :immediate-check="false"
      v-model="loading"
      @load="onLoad"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多文章了~~"
    >
      <article-item
        v-for="item in Articles"
        :key="item.id"
        :article="item"
      ></article-item>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 发送请求,拿到当前文章的数据

// 引入请求
import { getArticles } from '@/api'

// 引入组件
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  components: { ArticleItem },
  created() {
    this.getFirstPageArticle()
  },
  data() {
    return {
      Articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false

    }
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.Articles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js的错误，上抛，400 上抛中文，507 原封不动额上抛
        if (!error.response || error.response?.status === 507) {
          throw error
        } else {
          if (error.response?.status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async onLoad() {
      try {
        // 1.发送请求
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 2.添加到articles
        if (this.refreshing) {
          this.Articles.unshift(...data.data.results)
        } else {
          this.Articles.push(...data.data.results)
        }

        // 3.更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // 错误进行处理
        this.error = true
      } finally {
        // finally语句一定会执行
        // 4.更改loading
        this.loading = false
        this.refreshing = false
      }
    }
  },
  computed: {}
}
</script>

<style scoped lang="less">
// 任何让盒子拥有自己的滚动条
// -1定高2.overflow: auto、scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}

</style>
