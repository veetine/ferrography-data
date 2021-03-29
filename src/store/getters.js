const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  curChoice:state=>state.account.curChoice,
  permission_routes: state => state.permission.routes,
  canback:state=>state.tabs.curChoice.canback,
  canforward:state=>state.tabs.curChoice.canforward,
  canfresh:state=>{
    if(state.tabs.curChoice.id=='main'){
      return true
    }else{
      var curtar= state.tabs.tabs.filter(v=>{
        return v.tabid==state.tabs.curChoice.id
      })
      return !curtar[0].loading
    }
  },
  curUrl:state=>state.tabs.curChoice.url,
  curId:state=>state.tabs.curChoice.id
}
export default getters
