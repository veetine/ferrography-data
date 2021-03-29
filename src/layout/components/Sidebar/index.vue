<template>
  <div :class="{ 'has-logo': showLogo }" class="dd">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div style="height:50px;background:#e5e5e5" class="row middle-xs center-xs">
        <div
          style="width:160px;background:white;border-radius:6px;height:33px"
          class="row middle-xs center-xs"
        >

          <el-menu default-active="2" class="el-menu-demo" mode="horizontal" @select="handleSelect">

            <el-submenu index="2">
              <template slot="title">{{ path }}</template>
              <!-- <el-menu-item index="2-1">抖店</el-menu-item> -->

              <el-submenu index="2-4">
                <template slot="title">抖店</template>
                <el-menu-item index="2-4-1">运营</el-menu-item>
                <el-menu-item index="2-4-2">客服</el-menu-item>
                <!-- <el-menu-item index="2-4-3">选项3</el-menu-item> -->
              </el-submenu>
              <el-menu-item index="2-1">抖音内容号</el-menu-item>
              <el-menu-item index="2-2">Feed抖音号</el-menu-item>

            </el-submenu>

          </el-menu>

         
        </div>
      </div>

      <section v-loading="initLoading" class="mainCon">
        <info-item v-if="curChoice.type==1||curChoice.type==2" :is-collapse="isCollapse" :yunying="yunying" :data="infoList" />
        <douyin-item v-if="curChoice.type==3" :is-collapse="isCollapse" :data="douyinList" @backdata="backdatadouyin" />
        <feeddouyin-item v-if="curChoice.type==4" :is-collapse="isCollapse" :data="douyinList" @backdata="backdatafeed" />
        <doudian-item v-if="curChoice.type==5" :is-collapse="isCollapse" :data="doudianList" />
      </section>
      <div style="border-top:1px solid #efefef" />
      <div class="row middle-xs"><i class="el-icon-refresh" style="margin-left:15px;margin-top:16px;color:#409EFF" /><span id="refresh" style="cursor:pointer;font-size:14px;margin-top:16px;color:#409EFF" @click="refresh">刷新列表</span></div>
      <!-- <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>-->
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import InfoItem from './InfoItem'
import DouyinItem from './DouyinItem'
import FeeddouyinItem from './FeeddouyinItem'
import DoudianItem from './DoudianItem'
import variables from '@/styles/variables.scss'
import { getAccountList, getJuliangList, getDouYinList, getkefus, getyunyings, getfeedDouYinList } from '@/api/account'
export default {
  components: { SidebarItem, Logo, InfoItem, DouyinItem, DoudianItem, FeeddouyinItem },
  data() {
    return {
      path: '全部',
      initLoading: false,
      infoList: [],
      douyinList: [],
      doudianList: [],
      yunying: true,
      activeList: [],
      douyindata: {},
      feeddata: {}

    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar', 'curChoice']),
    activeMenu() {
      console.log(1)
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    backdatadouyin(e) {
      console.log(e)
      this.douyindata = e
      if (e) {
        this.getDouYinList(e)
      } else {
        this.getDouYinList()
      }
    },
    backdatafeed(e) {
      this.feeddata = e
      console.log(e)
      if (e) {
        this.getfeedDouYinList(e)
      } else {
        this.getfeedDouYinList()
      }
    },
    refresh() {
      console.log()

      switch (this.$store.state.account.curChoice.type) {
        case '1':

          this.getyunyings()
          break
        case '2':
          this.getkefus()
          break
        case '3':
          // this.getDouYinList()
          this.backdatadouyin(this.douyindata)
          break
        case '4':
          this.backdatafeed(this.feeddata)
          // this.getfeedDouYinList()
          break
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      switch (key) {
        case '2-4-1':
          this.path = '抖店-运营'
          this.$store.dispatch('account/setCurChoiceType', '1')
          this.getyunyings()
          break
        case '2-4-2':
          this.path = '抖店-客服'
          this.$store.dispatch('account/setCurChoiceType', '2')
          this.getkefus()
          break
        case '2-1':
          this.path = '抖音内容号'
          this.$store.dispatch('account/setCurChoiceType', '3')
          this.getDouYinList()
          break
        case '2-2':
          this.path = 'Feed抖音号'
          this.$store.dispatch('account/setCurChoiceType', '4')
          this.getfeedDouYinList()
          break
      }
    },
    handleCommand(command) {
      // this.$message('click on item ' + command);
      switch (command) {
        case '1':
          this.$store.dispatch('account/setCurChoiceType', '1')
          break
        case '2':
          this.$store.dispatch('account/setCurChoiceType', '2')
          break
        case '3':
          this.$store.dispatch('account/setCurChoiceType', '3')
          break
        default:
          break
      }
    },
    async init(status) {
      const self = this
      self.initLoading = true
      const getAccountList = new Promise(async function(resolve, reject) {
        // await self.getkefus()
        resolve()
      })
        .then(v => { })
        .catch(v => { })
      const getJuliangList = new Promise(async function(resolve, reject) {
      //  await self.getJuliangList()
        resolve()
      })
        .then(v => { })
        .catch(v => { })
      const getDouYinList = new Promise(async function(resolve, reject) {
        //   await self.getDouYinList()
        resolve()
      })
        .then(v => { })
        .catch(v => { })
      Promise.all([getAccountList, getJuliangList, getDouYinList])
        .then(v => {
          // alert(3)
          self.initLoading = false
        })
        .catch(v => {
          self.initLoading = false
        })
    },
    getids() {
      this.activeList = []
      if (this.$store.state.account.infoList && this.$store.state.account.infoList.length) {
        this.$store.state.account.infoList.forEach(v => {
          if (v.shops && v.shops.length) {
            v.shops.forEach(k => {
              if (k.active) {
                this.activeList.push(k.id)
              }
            })
          }
        })
      }
    },
    getdouyinids() {
      this.activeList = []
      if (this.$store.state.tabs.tabs && this.$store.state.tabs.tabs.length) {
        this.$store.state.tabs.tabs.forEach(v => {
          if (v.account) {
            // v.shops.forEach(k => {
            //   if (k.active) {
            this.activeList.push(v.account.id)
            //   }
            // })
          }
        })
      }
      // this.activeList = []
      // if (this.$store.state.account.douyinList && this.$store.state.account.douyinList.length) {
      //   this.$store.state.account.douyinList.forEach(v => {
      //     // if (v.shops && v.shops.length) {
      //     //   v.shops.forEach(k => {
      //     if (v.active) {
      //       this.activeList.push(v.id)
      //     }
      //     // })
      //     // }
      //   })
      // }
    },
    fuzhiactive(data) {
      console.log(this.activeList)

      if (data && data.length > 0) {
        data.forEach(v => {
          if (v && v.shops.length > 0) {
            v.shops.forEach(k => {
              if (Array.from(this.activeList).some(m => { return m == k.id })) {
                k.active = true
              }
            })
          }
        })
      }
      console.log(data)
      return data
    },
    fuzhidouyinactive(data) {
      console.log(this.activeList)

      if (data && data.length > 0) {
        data.forEach(v => {
          // if (v && v.shops.length > 0) {
          //   v.shops.forEach(k => {
          if (Array.from(this.activeList).some(m => { return m == v.id })) {
            v.active = true
            //   }
            // })
          }
        })
      }
      console.log(data)
      return data
    },
    async getyunyings() {
      const self = this
      self.initLoading = true
      this.getids()

      const res = await getyunyings()
      if (res.status_code === 0) {
        if (res.data && res.data.length > 0) {
          var data = this.fuzhiactive(res.data)
          this.$store.dispatch('account/setInfoList', data)
          this.infoList = data
        } else {
          this.$store.dispatch('account/setInfoList', [])
          this.infoList = []
        }
        this.yunying = true
      }
      console.log(res)
      self.initLoading = false
    },
    async getkefus() {
      const self = this
      this.getids()

      self.initLoading = true
      const res = await getkefus()
      if (res.status_code === 0) {
        if (res.data && res.data.length > 0) {
          var data = this.fuzhiactive(res.data)
          this.$store.dispatch('account/setInfoList', data)
          this.infoList = data
        } else {
          this.$store.dispatch('account/setInfoList', [])
          this.infoList = []
        }

        this.yunying = false
      }
      console.log(res)
      self.initLoading = false
    },
    async getAccountList() {
      await getAccountList().then(v => {
        if (v.status == 1) {
          if (v.data && v.data.length > 0) {
            this.$store.dispatch('account/setInfoList', v.data)
            this.infoList = v.data
          } else {
            this.$store.dispatch('account/setInfoList', [])
            this.infoList = []
          }
        }
      }).catch(e => {
        this.$store.dispatch('account/setInfoList', [])
        this.infoList = []
      })
    },
    async getJuliangList() {
      await getJuliangList().then(v => {
        if (v.status == 1) {
          if (v.data && v.data.length > 0) {
            this.$store.dispatch('account/setDoudianList', v.data)
            this.doudianList = v.data
          } else {
            this.$store.dispatch('account/setDoudianList', [])
            this.doudianList = []
          }
        }
      }).catch(e => {
        this.$store.dispatch('account/setDoudianList', [])
        this.doudianList = []
      })
    },

    async getfeedDouYinList(obj) {
      this.getdouyinids()
      await getfeedDouYinList(obj).then(v => {
        if (v.status_code == 0) {
          if (v.data && v.data.length > 0) {
            var data = this.fuzhidouyinactive(v.data)
            this.$store.dispatch('account/setDouyinList', data)
            this.douyinList = data
          } else {
            this.$store.dispatch('account/setDouyinList', [])
            this.douyinList = []
          }
        }
      }).catch(e => {
        this.$store.dispatch('account/setDouyinList', [])
        this.douyinList = []
      })
    },
    async getDouYinList(obj) {
      this.getdouyinids()
      await getDouYinList(obj).then(v => {
        if (v.status_code == 0) {
          if (v.data && v.data.length > 0) {
            var data = this.fuzhidouyinactive(v.data)
            this.$store.dispatch('account/setDouyinList', data)
            this.douyinList = data
          } else {
            this.$store.dispatch('account/setDouyinList', [])
            this.douyinList = []
          }
        }
      }).catch(e => {
        this.$store.dispatch('account/setDouyinList', [])
        this.douyinList = []
      })
    }
  }

}
</script>
<style lang='scss' scoped>
:focus {
  outline: none;
}
.scrollbar-wrapper {
  .mainCon {
    height: calc(100vh - 150px);
    overflow: auto;

  }

}
.dd{
  ::v-deep{
    .el-menu--horizontal > .el-submenu .el-submenu__title{
      width:160px;

      height:33px;
      line-height:33px;
      background:transparent !important;
      &.hover{
         background:transparent  !important
      }
    }
  }
}
#app {
  ::v-deep{
    .sidebar-container .el-submenu__title:hover{
       background:transparent  !important
    }
  }

}
</style>
