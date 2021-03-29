const { ipcRenderer, shell } = require('electron')
const { remote } = require('electron')
import {
  setkefus,
  setdoudians,
  updateDoudianCookie,
  storepassword,
  getpassword,
  updateDouYinBuyingCookie,
  updateDouYinAwemeCookie
} from '@/api/account'
// import { MessageBox, Message } from "element-ui";
export function setCurTabNav({ webview, tab, _this }) {
  _this.$store.dispatch('tabs/setCurUrl', webview.getURL())
  _this.$store.dispatch('tabs/setTabCanForward', webview.canGoForward())
  _this.$store.dispatch('tabs/setTabCanBack', webview.canGoBack())
  const content = remote.webContents.fromId(webview.getWebContentsId())
  content.setMaxListeners(1)
  content.removeAllListeners('will-prevent-unload')
  content.once('will-prevent-unload', function(evt) {
    evt.preventDefault()
  })
  content.session.on('will-download', (event, item, webContents) => {
    console.log(item)
    // event.preventDefault()
    // require('request')(item.getURL(), (data) => {
    //   require('fs').writeFileSync('/somewhere', data)
    // })
  })
}

export function initwebview({ webview, tab, _this }) {
  console.log(webview)

  webview.addEventListener('dom-ready', () => {
    var eee = remote.webContents.fromId(webview.getWebContentsId()).session

    // alert(webview.getURL())
    if (tab.tabid.indexOf('doudian') != -1 && tab.tabid.indexOf('t') == -1) { eee.setProxy({ proxyRules: 'http://59.48.153.185:47112' }, function() { console.log(555) }) } else {
      eee.setProxy({ mode: 'direct' }, function() { console.log(555) })
    }
    // webview.openDevTools()
    tab.loading = false
    setCurTabNav({ webview, tab, _this })
  })
  webview.addEventListener('new-window', e => {
    e.preventDefault()
    console.log(e)

    var newtab
    if (tab.tabid.indexOf('info') != -1) {
      newtab = {
        tab: {
          name: tab.account.account_name
            ? '信息流户新-' + tab.account.account_name
            : '--',
          tabid: 'info' + tab.account.id + 't' + new Date().getTime(),
          partition: 'info' + tab.account.id,
          url: e.url,
          account: tab.account,
          loading: true
        }
      }
    }
    if (tab.tabid.indexOf('doudian') != -1) {
      console.log(tab)
      newtab = {
        tab: {
          name: tab.account.shop_name
            ? tab.account.shop_name
            : '--',
          tabid: 'doudian' + tab.account.id + 't' + new Date().getTime(),
          partition: 'doudian' + tab.account.id,
          url: e.url,
          account: tab.account,
          loading: true
        }
      }
    }
    if (tab.tabid.indexOf('douyin') != -1) {
      newtab = {
        tab: {
          name: tab.account.nickname ? '抖音新-' + tab.account.nickname : '--',
          tabid: 'douyin' + tab.account.id + 't' + new Date().getTime(),
          partition: 'douyin' + tab.account.id,
          url: e.url,
          account: tab.account,
          loading: true
        }
      }
    }
    if (tab.tabid.indexOf('juliang') != -1) {
      newtab = {
        tab: {
          name: tab.account.nickname ? '巨量新-' + tab.account.nickname : '--',
          tabid: 'juliang' + tab.account.id + 't' + new Date().getTime(),
          partition: 'juliang' + tab.account.id,
          url: e.url,
          account: tab.account,
          loading: true
        }
      }
    }

    _this.$store.dispatch('tabs/setCurChoiceId', { id: newtab.tab.tabid })
    _this.$store.dispatch('tabs/addTab', newtab)

    _this.$nextTick(() => {
      const webview = document.querySelector('#' + newtab.tab.tabid)

      initwebview({ webview, tab: newtab.tab, _this })
    })
  })
  webview.addEventListener('ipc-message', event => {
    console.log(event)
    switch (event.channel) {
      case 'checkDoudian':
        checkDoudian(event, tab, webview, _this)
        break
      case 'checkDouyin':
        checkDouyin(event, tab, webview, _this)
        break
      case 'checkBuyin':
        checkBuyin(event, tab, webview, _this)
        break
      case 'getpassword':
        getpassword1(event, tab, webview, _this)
        break
    }
  })
  webview.addEventListener('did-navigate-in-page', e => {
    _this.$store.dispatch('tabs/setCurUrl', webview.getURL())
  })
}
function getpassword1(event, tab, webview, _this) {
  getpassword(tab.account.id).then(res => {
    if (res.status_code === 0) {
      webview.send('getpassword', res.data)
    }
  }).catch(() => {})
}
function checkDoudian(event, tab, webview, _this) {
  console.log(webview)
  console.log(remote)
  console.log('tab')
  console.log(tab)
  console.log(event)
  console.log(tab.account.shop_id)
  if (event.args[0] == tab.account.shop_id) {
    const sess = remote.webContents.fromId(webview.getWebContentsId()).session
    if (event.args[1] && event.args[2]) {
      storepassword(tab.account.id, {
        account: event.args[1],
        password: event.args[2]
      }).then(res => {

      }).catch(() => {})
    }
    let cookiejar = []

    sess.cookies.get({ url: 'https://fxg.jinritemai.com/' }).then(cookies => {
      console.log('getdoudian')

      cookies.forEach(function(cookie) {
        cookiejar.push({
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain
        })
      })
      cookiejar = cookiejar.sort(function(a, b) {
        return a.name.localeCompare(b.name)
      })
      console.log(cookiejar)
      if (tab.account.kefu_id) {
        setkefus(tab.account.id, {
          cookie: JSON.stringify(cookiejar)
        }).then(v => {
          console.log(v)

          document.querySelector('#refresh').click()
        })
          .catch(() => {})
      } else {
        setdoudians(tab.account.id, {
          cookie: JSON.stringify(cookiejar)
        }).then(v => {
          console.log(v)
          document.querySelector('#refresh').click()
        })
          .catch(() => {})
      }

      // updateDoudianCookie(tab.account.id, {
      //   cookie: cookiejar
      // })
      // .then(v => {
      //   console.log(v)
      // })
      // .catch(() => {})
    })
  } else {
    _this.$message.error('非本账号录入')
    const sess = remote.webContents.fromId(webview.getWebContentsId()).session
    sess.clearStorageData().then(() => {
      webview.reload()
    })
  }
}

function checkDouyin(event, tab, webview, _this) {
  console.log(webview)

  if (event.args[0] == tab.account.uid) {
    const sess = remote.webContents.fromId(webview.getWebContentsId()).session

    let cookiejar = []

    sess.cookies.get({ url: 'https://creator.douyin.com/' }).then(cookies => {
      console.log('getdouyin')

      cookies.forEach(function(cookie) {
        cookiejar.push({
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain
        })
      })
      cookiejar = cookiejar.sort(function(a, b) {
        return a.name.localeCompare(b.name)
      })
      console.log(cookiejar)
      updateDouYinAwemeCookie({
        cookie: JSON.stringify(cookiejar)
      })
        .then(v => {
          console.log(v)
          document.querySelector('#refresh').click()
        })
        .catch(() => {})
    })
  } else {
    _this.$message.error('非本账号录入')
    const sess = remote.webContents.fromId(webview.getWebContentsId()).session
    sess.clearStorageData().then(() => {
      webview.reload()
    })
  }
}

function checkBuyin(event, tab, webview, _this) {
  console.log(webview)

  if (event.args[0] == tab.account.uid) {
    const sess = remote.webContents.fromId(webview.getWebContentsId()).session

    let cookiejar = []

    sess.cookies.get({ url: 'https://buyin.jinritemai.com/' }).then(cookies => {
      console.log('getBuyin')

      cookies.forEach(function(cookie) {
        cookiejar.push({
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain
        })
      })
      cookiejar = cookiejar.sort(function(a, b) {
        return a.name.localeCompare(b.name)
      })
      console.log(cookiejar)
      updateDouYinBuyingCookie({
        cookie: JSON.stringify(cookiejar)
      })
        .then(v => {
          console.log(v)
        })
        .catch(() => {})
    })
  } else {
    _this.$message.error('非本账号录入')
    const sess = remote.webContents.fromId(webview.getWebContentsId()).session
    sess.clearStorageData().then(() => {
      webview.reload()
    })
  }
}
//  [{"name": "gfpart_1.0.0.2864_30", "value": "0", "domain": "fxg.jinritemai.com"},
//  {"name": "gfsitesid", "value": "MTc2MDIyMzkyM3wxNjAzNTM4MDI1ODJ8fDAGBgYGBgY", "domain": ".fxg.jinritemai.com"},
//  {"name": "gftoken", "value": "MTc2MDIyMzkyM3wxNjAzNTM4MDI1ODJ8fDAGBgYGBgY", "domain": ".fxg.jinritemai.com"},
//  {"name": "need_choose_shop", "value": "0", "domain": "fxg.jinritemai.com"},
// {"name": "PHPSESSID", "value": "60c1e6bbfdb6effa742e2ab8eb579f92", "domain": ".jinritemai.com"},
// {"name": "PHPSESSID_SS", "value": "60c1e6bbfdb6effa742e2ab8eb579f92", "domain": ".jinritemai.com"},
//  {"name": "s_v_web_id", "value": "verify_kgnl58ed_rf4b6NEc_Z2eK_4PRQ_9JzC_pLKHd4g1zqYe", "domain": "fxg.jinritemai.com"},
//  {"name": "SLARDAR_WEB_ID", "value": "4221744248002109", "domain": ".fxg.jinritemai.com"},
//  {"name": "tt_scid", "value": "mvJd7VbPGRAxS1ZcT8YJ2Hj1KtcAoOzc.W32XqUkrZXD551fpaLMp35dfV.cTw5V2e3e", "domain": "fxg.jinritemai.com"},
//  {"name": "ttcid", "value": "3d03c1768402457699e91cae951b3cac41", "domain": "fxg.jinritemai.com"}]
