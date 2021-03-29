<template>
  <div class="douyincontain">
    <div class="serach row middle-xs center-xs">
      <el-input
        v-model="searchWord"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width:160px;"
        size="small"
        @input="backdata"
      />
    </div>
    <div v-if="data&&data.length" class="mainc" style="position:relative">
     
    </div>
    <div v-else>
      <div class="row center-xs mainc" style="font-size:12px">暂无数据</div>
    </div>

    <div style="height:20px;" class="row center-xs">
      <el-tooltip content="上页" placement="top">
        <i class="el-icon-d-arrow-left" style="cursor:pointer" @click="jian" />
      </el-tooltip>
      <span class="" style="cursor:pointer;margin:0 15px">{{ page }}</span>
      <el-tooltip content="下页" placement="top">
        <i class="el-icon-d-arrow-right" style="cursor:pointer" @click="add" />
      </el-tooltip>
      <i class="el-icon-refresh" style="cursor:pointer;opacity:0" />
      <!-- <el-button @click="jian">上页</el-button>
      <el-button @click="add">下页</el-button> -->
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
import { initwebview } from '@/utils/initwebview'
export default {
  name: 'DouyinItem',
  props: {

    data: {
      type: Array,
      required: true,
      default: []
    },
    isCollapse: {
      type: Boolean,
      required: true,
      default: false
    }

  },
  data() {
    return {
      searchWord: '',
      page: 1
    }
  },
  computed: {
    filterdata() {
      return this.data.filter(v => {
        if (v.nickname.indexOf(this.searchWord) != -1) {
          return true
        }
      }
      )
    }
  },
  methods: {
    add() {
      this.page = this.page + 1
      this.backdata()
    },
    jian() {
      this.page = this.page - 1
      if (this.page < 1) { return }
      this.backdata()
    },
    backdata() {
      this.$emit('backdata', { account: this.searchWord, page: this.page })
    },
    enterjl({ item }) {
      var _this = this
      if (true) {
        console.log(item)
        var tab = { tab: {
          name: item.nickname ? '巨量-' + item.nickname : '--',
          tabid: 'juliang' + item.id,
          partition: 'juliang' + item.id,
          url: 'https://buyin.jinritemai.com/dashboard/dataCenter/order',
          account: item,
          loading: true
        }}
        this.$store.dispatch('tabs/setCurChoiceId', { id: 'juliang' + item.id })
        this.$store.dispatch('tabs/addTab', tab)
        // this.$set(item, 'active', true)

        this.$nextTick(() => {
          function predouyin(e) {
            // tab.tab.loading=false

            const webview = document.querySelector('#' + tab.tab.tabid)

            initwebview({ webview, tab: tab.tab, _this })
          }
          ipcRenderer.removeAllListeners('prejuliang_ready')
          ipcRenderer.on('prejuliang_ready', predouyin)
          ipcRenderer.send('prejuliang', tab)
        })
      } else {
        this.$store.dispatch('tabs/setCurChoiceId', { id: 'douyin' + item.id })
      }
    },
    douyinClick({ item }) {
      var _this = this
      if (!item.active) {
        console.log(item)
        var tab = { tab: {
          name: item.nickname ? '抖音-' + item.nickname : '--',
          tabid: 'douyin' + item.id,
          partition: 'douyin' + item.id,
          url: 'https://creator.douyin.com',
          account: item,
          loading: true
        }}
        this.$store.dispatch('tabs/setCurChoiceId', { id: 'douyin' + item.id })
        this.$store.dispatch('tabs/addTab', tab)
        this.$set(item, 'active', true)

        this.$nextTick(() => {
          function predouyin(e) {
            // tab.tab.loading=false

            const webview = document.querySelector('#' + tab.tab.tabid)

            initwebview({ webview, tab: tab.tab, _this })
          }
          ipcRenderer.removeAllListeners('predouyin_ready')
          ipcRenderer.on('predouyin_ready', predouyin)
          ipcRenderer.send('predouyin', tab)
        })
      } else {
        this.$store.dispatch('tabs/setCurChoiceId', { id: 'douyin' + item.id })
      }
      // if (!item.active) {

      //   this.$set(item, 'active', true)
      // } else {

      //   this.$set(item, 'active', false)
      // }
    },
    douyinClickChildren({ item, children }) {
      if (!children.active) {
        this.$set(item, 'active', true)
        this.$set(children, 'active', true)
      } else {
        this.$set(children, 'active', false)
        if (!item.children.some(v => {
          return v.active
        })) {
          this.$set(item, 'active', false)
        }
      }
    }
  }
}
</script>
<style lang='scss'>
.el-popover {
  .douyinitem {
    cursor: pointer;
    height: 50px;
    padding: 0 25px 0 15px;
    &:hover {
      color: #ff9000;
    }
    &.active{
      color: #ff9000;
    }
  }
}
</style>
<style lang='scss' scoped>
.douyincontain {
  .mainc {
    overflow: auto;
    height: calc(100vh - 230px);
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .douyinitem {
      cursor: pointer;
      height: 50px;
      padding: 0 25px 0 15px;
      &:hover {
        color: #ff9000;
      }
       &.active{
      color: #ff9000;
    }
    }
  }
  .serach {
    height: 50px;
  }
}
</style>
