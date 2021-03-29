
const { ipcRenderer } = require('electron')

global=undefined
globalThis=undefined

window=Window.prototype

function waitForElement (selector, sub) {
  return new Promise(function (resolve, reject) {
    // first time check
    var element = document.querySelector(selector)
    if (element != null) {
      resolve(element)
    } else {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          for (var i = 0; i < mutation.addedNodes.length; i++) {
            var Node = mutation.addedNodes[i]
            if (!sub && typeof Node.matches === 'function' && Node.matches(selector)) {
              resolve(Node)
              observer.disconnect()
              return
            } else if (sub && typeof Node.querySelector === 'function' && Node.querySelector(selector)) {
              resolve(Node)
              observer.disconnect()
            }
          }
        })
      })
      // start  监听body下面的事件变化
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    }
  })
}

window.waitForElement=waitForElement

window.onload=function(){
   

if(location.href=='https://fxg.jinritemai.com/login'){

  waitForElement(".email",false).then(function(){
    document.querySelector(".email").click()

    var t=function(){
      var time= setTimeout(()=>{
        if(document.querySelector("input[name='email']")){
          clearTimeout(time)
          console.log(document.querySelector("input[name='email']"))
          document.querySelector("input[name='email']").oninput=function(){
            localStorage.setItem('account',document.querySelector("input[name='email']").value)
          }
          document.querySelector("input[name='password']").oninput=function(){
            localStorage.setItem('password',document.querySelector("input[name='password']").value)
          }
        }else{
          t()
        }
      },100)
    }
t()
ipcRenderer.on('getpassword',function(v,data){
console.log(data)
localStorage.setItem('account',data.account)
localStorage.setItem('password',data.password)
// document.querySelector(".email").click()
// document.querySelector("input[name='email']").setAttribute('class','has-value')
// document.querySelector("input[name='email']").setAttribute('has','true')
document.querySelector("input[name='email']").value=data.account

document.querySelector("input[name='password']").value=data.password

function a(){
  document.querySelector("input[name='email']").value=data.account
  document.querySelector("input[name='email']").removeEventListener('focus',a)
}
function b(){
  document.querySelector("input[name='password']").value=data.password
  document.querySelector("input[name='password']").removeEventListener('focus',b)
}



document.querySelector("input[name='email']").addEventListener('focus',a)
document.querySelector("input[name='password']").addEventListener('focus',b)

})
ipcRenderer.sendToHost('getpassword')
  })
  


}

 
   if((location.href.indexOf('https://fxg.jinritemai.com/ffa/mshop/homepage/index')!=-1)||(location.href=='https://fxg.jinritemai.com/ffa/g/create')||(location.href=='https://fxg.jinritemai.com/index.html')){

    fetch('https://fxg.jinritemai.com/common/index/index').then(function (v) {
        v.json().then(function (k) {
          console.log('k')
          console.log(k)
          //alert(k.data.id)
      //    ipcRenderer.sendToHost('backcheckidFxg', k.data.id, account, cookiejar)
      var account=localStorage.getItem('account')?localStorage.getItem('account'):''
      var password=localStorage.getItem('password')?localStorage.getItem('password'):''

      ipcRenderer.sendToHost('checkDoudian',k.data.id,account,password)
        }).catch(function () {
          console.log('err')
        })
      }).catch(function () {
        console.log('err')
      })
    
   }

   if(location.href.indexOf('https://creator.douyin.com/creator-micro/home')!=-1){
    fetch('https://creator.douyin.com/web/api/media/user/info/').then(function (v) {
          v.json().then(function (k) {
            console.log('k')
            console.log(k)

            ipcRenderer.sendToHost('checkDouyin', k.user.uid)
          }).catch(function () {
            console.log('err')
          })
        }).catch(function () {
          console.log('err')
        })
   }

   if(location.href.indexOf('https://buyin.jinritemai.com/dashboard')!=-1){
    // fetch('https://buyin.jinritemai.com/index/getUser').then(function (v) {
    //     v.json().then(function (k) {
    //       console.log('k')
    //       console.log(k)
    //       ipcRenderer.sendToHost('checkBuyin', k.data.origin_uid)
    //     }).catch(function () {
    //       console.log('err')
    //     })
    //   }).catch(function () {
    //     console.log('err')
    //   })
   }


}