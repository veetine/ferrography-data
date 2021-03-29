<template>
  <div id="update">
    <el-card>
      <div slot="header" class="header">
        <div class="update-title">
        </div>
      </div>
      <el-progress :percentage="percentage" :stroke-width="10" :show-text="false" :text-inside="true" />
      <div v-if="url" class="down-load-btn">
        <el-button type="success" @click="updateDownload">请点我手动下载更新</el-button>
      </div>
      <div v-else class="info-msg">
        <span>{{ updatemsg }}</span>
        <span class="process-percentage">{{ percentage }}%</span>
      </div>
    </el-card>
  </div>
</template>

<script>

const { ipcRenderer, shell } = require('electron')
export default {
  data() {
    return {
      systemName: 'XHLMALL',
      percentage: 0,
      updatemsg: '正在检测软件更新，请稍后...',
      url: ''
    }
  },
  beforeMount() {
    const self = this
    ipcRenderer.removeAllListeners('updatestatus')
    ipcRenderer.on('updatestatus', self.updateStatus)
  },
  mounted() {
    ipcRenderer.send('checkupdate', true)
  },
  methods: {
    updateStatus(event, arg) {
      const self = this
      if (arg.status === 0) {
        self.percentage = arg.percent
        self.updatemsg = arg.msg
        // 手动更新
        console.log(arg)
        if (arg.info) {
          self.url = arg.info.url ? arg.info.url : arg.info.path
        } else {
          setTimeout(() => {
            self.$router.replace('login')
          }, 1000)
        }
      } else {
        self.percentage = arg.percent
        self.updatemsg = arg.msg
      }
    },
    updateDownload() {
      shell.openExternal(this.url)
    }
  }
}
</script>

<style lang="scss">
#update {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eee;
  overflow: hidden;

  .el-card {
    width: 500px;
    border: none;
    border-radius: 0;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
    .el-card__header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      height: 240px;
      background-image: url('~@/assets/update/update-bg.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      .update-title {
        display: flex;
        align-items: center;
        color: #fff;
        width: 100%;

        .update-logo {
          width: 240px;
        }
      }
    }

    .el-card__body {
      .el-progress {
        .el-progress-bar {
          .el-progress-bar__outer {
            .el-progress-bar__inner {
              background: linear-gradient(to right, #29c97c, #2eb473) !important;
            }
          }
        }
      }
      .info-msg {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        font-size: 16px;
        color: #666;

        span {
          width: 360px;
          padding-left: 5px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .process-percentage {
          font-size: 16px;
          font-weight: 500;
          color: #333;
          width: 100px;
          text-align: right;
        }
      }

      .down-load-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        width: 100%;
      }
    }
  }
}
</style>
