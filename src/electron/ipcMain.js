import {
  ipcMain
} from 'electron'
const {
  app,
  Menu
} = require('electron')
let mainWin

function initIpcMain(_mainWin) {
  mainWin = _mainWin
  // mainWin.webContens().opendevTopol()
  // 登录成功
  // ipcMain.on('login_success', loginSuccess)
  mainWin.setResizable(true)
  mainWin.setMaximizable(true)
  ipcMain.on('logout', logout)
}

function loginSuccess() {
  mainWin.setResizable(true)
  mainWin.setMaximizable(true)
  // if (!mainWin.isMaximized()) {
  //   mainWin.maximize()
  // }
}

function logout() {
  mainWin.setBounds({
    width: 1200,
    height: 700
  })
  mainWin.setResizable(false)
  mainWin.setMaximizable(false)

  mainWin.center()
}

function initMenu() {
  const isMac = process.platform === 'darwin'

  const template = [

    {
      label: 'File',
      submenu: [{
          label: '打开electron',
          click: async () => {
            const {
              dialog
            } = require('electron')
            dialog.showOpenDialog({
              properties: ['openFile', 'multiSelections']
            }).then(result => {
              console.log(result)
            })
            // const { shell } = require('electron')
            // await shell.openExternal('https://electronjs.org')
          }
        },
        {
          label: '打开百度',
          click: async () => {
            const {
              shell
            } = require('electron')
            await shell.openExternal('https://baidu.com')
          }
        }
      ]
    },

    {
      role: 'help',
      submenu: [{
        label: 'Learn More',
        click: async () => {
          const {
            shell
          } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

export {
  initIpcMain,
  initMenu
}
