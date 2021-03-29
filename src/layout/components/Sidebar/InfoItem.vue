<template>
  <div class="infocontain">
    <div class="serach row middle-xs center-xs">
      <el-input
        v-model="searchWord"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width:160px;"
        size="small"
      />
    </div>
    <div class="mainc">
      <div v-for="(item,index) in filterdata" :key="index" style="position:relative">
        <div
          v-if="!(item.shops&&item.shops.length>0)"
          class="infoitem row middle-xs"
          :class="item.active?'active':''"
          @click="infoClick({item})"
        >
        
          <div class="col-xs">
            <div
              v-if="!isCollapse"
              class="line2"
              style="font-size:14px;line-height:1.3"
            >{{ item.name }}</div>
          </div>
          <div
            v-if="item.active"
            style="width:10px;height:10px;background:#ff9000;border-radius:50%;margin-left:5px;position:absolute;right:10px;top:20px;"
          />
        </div>
        <el-popover v-else placement="right-start" width="200" trigger="hover">
          <div
            v-for="(item1,index1) in item.shops"
            :key="index1"
            class="infoitem row middle-xs"
            style="padding:3px 0;cursor:pointer"
            :class="item1.active?'active':''"
            @click="infoClickChildren({item,children:item1})"
          >
           
            <div class="col-xs">
              <div class="line2" style="font-size:14px;line-height:1.3">{{ item1.shop_name }}</div>
            </div>
          </div>
          <div
            slot="reference"
            :class="item.active?'active':''"
            class="infoitem row middle-xs"
            style="position:relative"
            @click="infoClick({item})"
          >
     
            <div class="col-xs">
              <div
                v-if="!isCollapse"
                class="line2"
                style="font-size:14px;line-height:1.3"
              >{{ item.name }}</div>
            </div>
            <div
              v-if="item.active"
              style="width:10px;height:10px;background:#ff9000;border-radius:50%;margin-left:5px;position:absolute;right:10px;top:20px;"
            />
          </div>
        </el-popover>
      </div>
    </div>

  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
import { initwebview } from '@/utils/initwebview'
export default {
  name: 'InfoItem',
  props: {
    yunying: {
      type: Boolean,
      required: true,
      default: true
    },
    data: {
      type: Array,
      required: true,
      default: () => {
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
        if (v.name.indexOf(this.searchWord) != -1) {
          return true
        }
      }
      )
    }
  },
  watch: {
    yunying() {
      console.log(this.data)
    }
  },
  mounted() {

  },

  methods: {
    infoClick({ item }) {
      return
      var _this = this
      if (!item.active) {
        console.log(item)
        var tab = { tab: {
          name: item.account_name ? '信息流户-' + item.account_name : '--',
          tabid: 'info' + item.id,
          partition: 'info' + item.id,
          url: 'https://ad.oceanengine.com/pages/select/account.html',
          account: item,
          loading: true
        }}
        this.$store.dispatch('tabs/setCurChoiceId', { id: 'info' + item.id })
        this.$store.dispatch('tabs/addTab', tab)
        this.$set(item, 'active', true)

        this.$nextTick(() => {
          function preinfo(e) {
            // tab.tab.loading=false

            const webview = document.querySelector('#' + tab.tab.tabid)

            initwebview({ webview, tab: tab.tab, _this })
          }
          ipcRenderer.removeAllListeners('preinfo_ready')
          ipcRenderer.on('preinfo_ready', preinfo)
          ipcRenderer.send('preinfo', tab)
        })
      } else {
        this.$store.dispatch('tabs/setCurChoiceId', { id: 'info' + item.id })
      }
    },
    infoClickChildren({ item, children }) {
      const _this = this
      console.log(item)

      // var curtar = children.kefu ? children.kefu : children
      // if (curtar.kefu_id) {
      //   curtar.parent = item
      //   curtar.shop_name = item.shop_name
      // }
      // children = curtar
      // console.log(children)
      var curtar
      if (children.kefu || children.kefu === null) {
        if (!children.kefu) {
          this.$message({
            type: 'warning',
            message: '暂无客服'
          })
          return
        }

        var name = children.shop_name

        curtar = children.kefu

        curtar.shop_name = name
        curtar.parent = children
      } else {
        curtar = children
      }

      // children.cookie = item.cookie
      if (!children.active) {
      // this.$set(item, 'active', true)
        this.$set(children, 'active', true)

        var tab = { tab: {
          name: curtar.shop_name ? curtar.shop_name : '--',
          tabid: 'doudian' + curtar.id,

          partition: 'doudian' + curtar.id,
          url: 'https://fxg.jinritemai.com/login',
          account: curtar,
          loading: false
        }}

        this.$store.dispatch('tabs/setCurChoiceId', { id: 'doudian' + curtar.id })
        this.$store.dispatch('tabs/addTab', tab)

        this.$nextTick(() => {
          function preinfo(e) {
          // tab.tab.loading=false

            const webview = document.querySelector('#' + tab.tab.tabid)

            initwebview({ webview, tab: tab.tab, _this })
          }
          ipcRenderer.removeAllListeners('predoudian_ready')
          ipcRenderer.on('predoudian_ready', preinfo)
          ipcRenderer.send('predoudian', tab)
        })
      } else {
        this.$store.dispatch('tabs/setCurChoiceId', { id: 'doudian' + curtar.id })
        // this.$set(children, 'active', false)
        // if (!item.children.some(v => {
        //   return v.active
        // })) {
        //   this.$set(item, 'active', false)
        // }
      }
    }
  }
}
</script>
<style lang='scss'>
.el-popover {
  .infoitem {
    cursor: pointer;
    height: 50px;
    padding: 0 25px 0 15px;
    &:hover {
      color: #ff9000;
    }
    &.active {
      color: #ff9000;
    }
  }
}
</style>
<style lang='scss' scoped>
.infocontain {
  .mainc {
    overflow: auto;
    height: calc(100vh - 230px);
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .infoitem {
      cursor: pointer;
      height: 50px;
      padding: 0 25px 0 15px;
      &:hover {
        color: #ff9000;
      }
      &.active {
        color: #ff9000;
      }
    }
  }
  .serach {
    height: 50px;
  }
}
</style>
