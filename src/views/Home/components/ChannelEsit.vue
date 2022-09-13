<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        round
        size="mini"
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item,index) in myChannels"
          :class="{ active: item.name === '推荐' }"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handleMyChannel(item, index)"
        />
      </van-grid>
      <!-- 推荐频道 -->
    </div>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道" />
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommmendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        />
      </van-grid>
      <!-- 推荐频道 -->
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    recommmendChannels() {
      // 推荐频道：所有频道-我的频道
      // filter返回值：数组
      return this.allChannels.filter((allChannelItem) => {
        // 所有频道-我的频道
        // 我的频道数组里面，看一下，有没有allChannelItem,有retuen false
        return !this.myChannels.find(
          (myChannelItem) => myChannelItem.id === allChannelItem.id
        )
      })
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      this.allChannels = data.data.channels
    },
    handleMyChannel({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log('删除频道', name)
      } else {
        this.$emit('change-active', index)
      }
    }
  }
}
</script>
// postcss插件无法把行内px-->rem
<style scoped lang="less">
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channel-edit {
  padding-top: 92px;
  :deep(.btn) {
    width: 100px;
    font-size: 25px;
  }
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
