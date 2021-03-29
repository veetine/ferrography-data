import { ipcMain, session } from 'electron'

function preHandleInit() {
  ipcMain.on('preinfo', preinfo)
  ipcMain.on('predoudian', predoudian)
  ipcMain.on('predouyin', predouyin)
  ipcMain.on('prejuliang', prejuliang)
}

function preinfo(event, { tab }) {
  console.log('preinfo')

  const cookieinfo = tab.account.cookie
  //   console.log(cookieinfo);
  if (cookieinfo && cookieinfo.length > 0) {
    const sess = session.fromPartition('persist:' + tab.partition)

    sess.clearStorageData({ storages: ['cookies'] })
    // event.sender.send("preinfo_ready");
    !(function() {
      console.log('clear cookie success!')
      cookieinfo.forEach((ck, idx) => {
        let url

        if (ck.Domain) {
          ck.Domain.charAt(0) === '.'
            ? (ck.Domain = ck.Domain)
            : (ck.Domain = '.' + ck.Domain)
          url =
            'http://' +
            (ck.Domain.charAt(0) === '.' ? ck.Domain.slice(1) : ck.Domain) +
            '/'
          const cookie = {
            url: url,
            name: ck.Name,
            value: ck.Value,
            domain: ck.Domain && ck.Domain.charAt(0) === '.' ? ck.Domain : '',

            path: '/'
          }

          sess.cookies.set(cookie).then(() => {
            if (idx === cookieinfo.length - 1) {
              console.log('set all cookie success!')
              event.sender.send(
                'preinfo_ready'
              )
            }
            // success
          }, (error) => {
            console.error(error)
          })
        }

        if (ck.domain) {
          url =
            'http://' +
            (ck.domain.charAt(0) === '.' ? ck.domain.slice(1) : ck.domain) +
            '/'
          const cookie = {
            url: url,
            name: ck.name,
            value: ck.value,
            domain: ck.domain && ck.domain.charAt(0) === '.' ? ck.domain : '',

            path: '/'
          }
          sess.cookies.set(cookie).then(() => {
            if (idx === cookieinfo.length - 1) {
              console.log('set all cookie success!')
              event.sender.send(
                'preinfo_ready'
              )
            }
            // success
          }, (error) => {
            console.error(error)
          })
        }
      })
    }())
  } else {
    event.sender.send('preinfo_ready')
  }
}

function predoudian(event, { tab }) {
  console.log('predoudian')

  const cookiedoudian = tab.account ? tab.account.cookie ? tab.account.cookie : [] : []
  const sess = session.fromPartition('persist:' + tab.partition)
  // sess.setProxy({ proxyRules: 'http://59.48.153.185:47112' }, function() { console.log(555) })

  console.log(1)
  //  sess.webRequest.onBeforeRequest({urls:[]}, (details, callback) => {

  //  if(details.url.indexOf('fxg.jinritemai.com/api/order/searchlist')!=-1){
  //   console.log(details)
  //   callback({ cancel:true })
  //  }else{
  //    callback({})
  //  }

  //  })
  console.log(cookiedoudian)
  sess.clearStorageData({ storages: ['cookies'] })
  if (cookiedoudian && cookiedoudian.length > 0) {
    !(function() {
      console.log('clear cookie success!')
      cookiedoudian.forEach((ck, idx) => {
        let url

        if (ck.Domain) {
          ck.Domain.charAt(0) === '.'
            ? (ck.Domain = ck.Domain)
            : (ck.Domain = '.' + ck.Domain)
          url =
            'http://' +
            (ck.Domain.charAt(0) === '.' ? ck.Domain.slice(1) : ck.Domain) +
            '/'
          const cookie = {
            url: url,
            name: ck.Name,
            value: ck.Value,
            domain: ck.Domain && ck.Domain.charAt(0) === '.' ? ck.Domain : '',

            path: '/'
          }

          sess.cookies.set(cookie).then(() => {
            if (idx === cookiedoudian.length - 1) {
              console.log('set all cookie success!')
              event.sender.send(
                'predoudian_ready'
              )
            }
            // success
          }, (error) => {
            console.error(error)
          })
        }

        if (ck.domain) {
          url =
            'http://' +
            (ck.domain.charAt(0) === '.' ? ck.domain.slice(1) : ck.domain) +
            '/'
          const cookie = {
            url: url,
            name: ck.name,
            value: ck.value,
            domain: ck.domain && ck.domain.charAt(0) === '.' ? ck.domain : '',

            path: '/'
          }
          sess.cookies.set(cookie).then(() => {
            if (idx === cookiedoudian.length - 1) {
              console.log('set all cookie success!')
              event.sender.send(
                'predoudian_ready'
              )
            }
            // success
          }, (error) => {
            console.error(error)
          })
        }
      })
    }())
  } else {
    event.sender.send('predoudian_ready')
  }
}

function predouyin(event, { tab }) {
  console.log('predouyin')

  const cookiedouyin = tab.account.cookie

  if (cookiedouyin && cookiedouyin.length > 0) {
    const sess = session.fromPartition('persist:' + tab.partition)
    // sess.setProxy({ proxyRules: 'http://59.48.153.185:47112' }, function () { console.log(555) })
    sess.clearStorageData({ storages: ['cookies'] })

    !(function() {
      console.log('clear cookie success!')
      cookiedouyin.forEach((ck, idx) => {
        let url

        if (ck.Domain) {
          ck.Domain.charAt(0) === '.'
            ? (ck.Domain = ck.Domain)
            : (ck.Domain = '.' + ck.Domain)
          url =
            'http://' +
            (ck.Domain.charAt(0) === '.' ? ck.Domain.slice(1) : ck.Domain) +
            '/'
          const cookie = {
            url: url,
            name: ck.Name,
            value: ck.Value,
            domain: ck.Domain && ck.Domain.charAt(0) === '.' ? ck.Domain : '',

            path: '/'
          }

          sess.cookies.set(cookie).then(() => {
            if (idx === cookiedouyin.length - 1) {
              console.log('set all cookie success!')
              event.sender.send(
                'predouyin_ready'
              )
            }
            // success
          }, (error) => {
            console.error(error)
          })
        }

        if (ck.domain) {
          url =
            'http://' +
            (ck.domain.charAt(0) === '.' ? ck.domain.slice(1) : ck.domain) +
            '/'
          const cookie = {
            url: url,
            name: ck.name,
            value: ck.value,
            domain: ck.domain && ck.domain.charAt(0) === '.' ? ck.domain : '',

            path: '/'
          }
          sess.cookies.set(cookie).then(() => {
            if (idx === cookiedouyin.length - 1) {
              console.log('set all cookie success!')
              event.sender.send(
                'predouyin_ready'
              )
            }
            // success
          }, (error) => {
            console.error(error)
          })
        }
      })
    }())
  } else {
    event.sender.send('predouyin_ready')
  }
}

function prejuliang(event, { tab }) {
  console.log('prejuliang')

  const cookiejuliang = tab.account.buying_cookie

  if (cookiejuliang && cookiejuliang.length > 0) {
    const sess = session.fromPartition('persist:' + tab.partition)
    // sess.setProxy({ proxyRules: 'http://59.48.153.185:47112' }, function () { console.log(555) })
    sess.clearStorageData({ storages: ['cookies'] })

    !(function() {
      console.log('clear cookie success!')
      cookiejuliang.forEach((ck, idx) => {
        let url

        if (ck.Domain) {
          ck.Domain.charAt(0) === '.'
            ? (ck.Domain = ck.Domain)
            : (ck.Domain = '.' + ck.Domain)
          url =
            'http://' +
            (ck.Domain.charAt(0) === '.' ? ck.Domain.slice(1) : ck.Domain) +
            '/'
          const cookie = {
            url: url,
            name: ck.Name,
            value: ck.Value,
            domain: ck.Domain && ck.Domain.charAt(0) === '.' ? ck.Domain : '',

            path: '/'
          }

          sess.cookies.set(cookie).then(() => {
            if (idx === cookiejuliang.length - 1) {
              console.log('set all cookie success!')
              event.sender.send(
                'prejuliang_ready'
              )
            }
            // success
          }, (error) => {
            console.error(error)
          })
        }

        if (ck.domain) {
          url =
            'http://' +
            (ck.domain.charAt(0) === '.' ? ck.domain.slice(1) : ck.domain) +
            '/'
          const cookie = {
            url: url,
            name: ck.name,
            value: ck.value,
            domain: ck.domain && ck.domain.charAt(0) === '.' ? ck.domain : '',

            path: '/'
          }
          sess.cookies.set(cookie).then(() => {
            if (idx === cookiejuliang.length - 1) {
              console.log('set all cookie success!')
              event.sender.send(
                'prejuliang_ready'
              )
            }
            // success
          }, (error) => {
            console.error(error)
          })
        }
      })
    }())
  } else {
    event.sender.send('prejuliang_ready')
  }
}

export { preHandleInit }
