/*
 * @Author: kingbuladeli
 * @Date: 2019-05-23 16:54:42
 * @Last Modified by: kingbuladeli
 * @Last Modified time: 2019-05-30 14:13:49
 */

import { autoUpdater } from 'electron-updater'
import { ipcMain } from 'electron'

// 更新信息
let updateinfo, mainWin

// 更新事件注册
function updateRegister (_mainWin) {
  mainWin = _mainWin
  ipcMain.on('checkupdate', checkUpdate)
  autoUpdater.on('checking-for-update', updateStatus)
  autoUpdater.on('download-progress', downLoadProcess)
  autoUpdater.on('error', updateError)
  autoUpdater.on('update-available', updateAvailabel)
  autoUpdater.on('update-downloaded', updateDownloaded)
  autoUpdater.on('update-not-available', updateNotAvailabel)
}

/**
 * 校验软件更新
 */
function checkUpdate () {
  autoUpdater.checkForUpdates()
}

// 软件更新状态
function updateStatus () {
  mainWin.webContents.send('updatestatus', {
    status: 1,
    percent: 0,
    msg: '正在检测软件更新，请稍后...'
  })
}

/**
 *
 * @param {object} data | 软件下载进度
 */
function downLoadProcess (data) {
  let msg = '正在下载软件更新，下载速度为：'
  if (data.bytesPerSecond && data.bytesPerSecond > 0) {
    msg += data.bytesPerSecond / 1000 + 'Kb/s'
  } else {
    msg += '0Kb/s'
  }
  mainWin.webContents.send('updatestatus', {
    status: 1,
    percent: Number((25.0 + (data.percent / 100) * 75).toFixed(2)),
    msg: msg
  })
}

/**
 *
 * @param {object} info | 软件信息
 */
function updateAvailabel (info) {
  updateinfo = info
  mainWin.webContents.send('updatestatus', {
    status: 1,
    percent: 25,
    msg: '已检测到软件更新，准备下载软件更新...'
  })
}

/**
 * 软件更新完成
 */
function updateDownloaded () {
  mainWin.webContents.send('updatestatus', {
    status: 0,
    percent: 100,
    msg: '下载完成，将启动自动安装'
  })
  autoUpdater.quitAndInstall()
}

/**
 *
 * @param {*} ev
 * @param {*} err
 * 软件更新失败
 */
function updateError (ev, err) {
  mainWin.webContents.send('updatestatus', {
    status: 0,
    percent: 100,
    msg: '已检查到新版本，但下载更新失败，请手动更新。',
    info: updateinfo
  })
}

/**
 * 软件无需更新
 */
function updateNotAvailabel () {
  mainWin.webContents.send('updatestatus', {
    status: 0,
    percent: 100,
    msg: '软件已是最新版本!'
  })
}

export {
  checkUpdate,
  updateRegister
}
