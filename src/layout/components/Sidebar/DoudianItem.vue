<template>
  <div class="doudiancontain">
    <div class="serach row middle-xs center-xs">
      <el-input
        v-model="searchWord"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width:160px;"
        size="small"
      />
    </div>
    
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
import { initwebview } from '@/utils/initwebview'
export default {
  name: 'DoudianItem',
  props: {

    data: {
      type: Array,
      required: true,
      default: function(){
        return []
      }
    },
    isCollapse: {
      type: Boolean,
      required: true,
      default: false
    }

  },
  data() {
    return {
      searchWord: ''
    }
  },
  computed: {
    filterdata() {
      return this.data.filter(v => {
        if (v.shop_name.indexOf(this.searchWord) !== -1) {
          return true
        }
      }
      )
    }
  },
  methods: {
    enterjl({ item }) {

    },
    doudianClick({ item }) {
      var _this = this
      if (!item.active) {
        console.log(item)
        var tab = { tab: {
          name: item.shop_name ? '抖店-' + item.shop_name : '--',
          tabid: 'doudian' + item.id,
          partition: 'doudian' + item.id,
          url: 'https://fxg.jinritemai.com/login',
          account: item,
          loading: true
        }}
        this.$store.dispatch('tabs/setCurChoiceId', { id: 'doudian' + item.id })
        this.$store.dispatch('tabs/addTab', tab)
        this.$set(item, 'active', true)

        this.$nextTick(() => {
          function predoudian(e) {
            // tab.tab.loading=false

            const webview = document.querySelector('#' + tab.tab.tabid)

            initwebview({ webview, tab: tab.tab, _this })
          }
          ipcRenderer.removeAllListeners('predoudian_ready')
          ipcRenderer.on('predoudian_ready', predoudian)
          ipcRenderer.send('predoudian', tab)
        })
      } else {
        this.$store.dispatch('tabs/setCurChoiceId', { id: 'doudian' + item.id })
      }
      // if (!item.active) {

      //   this.$set(item, 'active', true)
      // } else {

      //   this.$set(item, 'active', false)
      // }
    },
    doudianClickChildren({ item, children }) {
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
  .doudianitem {
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
.doudiancontain {
  .mainc {
    overflow: auto;
    height: calc(100vh - 230px);
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .doudianitem {
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
