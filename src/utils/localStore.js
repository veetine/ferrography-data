const settings = require("electron-settings");
window.settings=settings
export default {
  get_token() {
    return settings.get("access_token");
  },
  set_token(token) {
  
    if (token == null) {
      settings.delete("access_token");
    } else {
      settings.set("access_token", token);
    
    }
  },
  get_email() {
    return settings.get("email");
  },
  set_email(email) {
     
    if (email == null) {
      settings.delete("email");
    } else {
      settings.set("email", email);
    
    }
  },
  get_password() {
    return settings.get("password");
  },
  set_password(password) {
    
    if (password == null) {
      settings.delete("password");
    } else {
      settings.set("password", password);
    }
  }
};
