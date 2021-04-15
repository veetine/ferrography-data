<template>
  <div class="navbar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      router
      menu-trigger="click"
      :default-active="activeMenu"
      @select="handleSelect"
    >
      <el-menu-item index="/motor/index">发动机信息库</el-menu-item>
      <el-menu-item index="/grease/index">滑油信息库</el-menu-item>
      <el-menu-item index="/sample/index">采样部位信息库</el-menu-item>
      <el-menu-item index="/oil/index">制谱用油样量</el-menu-item>
      <el-menu-item index="/dilution/index">稀释比设置</el-menu-item>
      <el-menu-item index="/analyse/index">铁谱磨粒故障库</el-menu-item>
      <el-menu-item index="/images/index">铁谱磨粒图片库</el-menu-item>
      <el-menu-item index="/statement/index">分析报告查询</el-menu-item>
      <el-submenu index="/system">
        <template slot="title">系统设置</template>
        <el-menu-item index="/system/user">账号管理</el-menu-item>
        <el-menu-item index="/system/pwd">修改密码</el-menu-item>
        <el-menu-item index="/system/dump">数据库备份</el-menu-item>
        <el-menu-item index="">数据库导入</el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">帮助</template>
        <el-menu-item>软件介绍</el-menu-item>
      </el-submenu>
      <div class="right-menu" style="height: 60px; line-height: 60px">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="@/assets/img/headimg.jpeg" class="user-avatar" />
            <span style="margin-left: 10px">管理员</span>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item>
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <div class="ul-line">
      <ul>
        <li @click="engine"><img src="@/assets/img/engine.png" /></li>
        <li @click="oil"><img src="@/assets/img/oil.png" /></li>
        <li @click="data_regist"><img src="@/assets/img/data_regist.png" /></li>
        <li @click="abrasive"><img src="@/assets/img/abrasive.png" /></li>
        <li><img src="@/assets/img/user_setting.png" /></li>
        <li><img src="@/assets/img/system_setting.png" /></li>
        <li><img src="@/assets/img/help.png" /></li>
      </ul>
    </div>
    <!-- <breadcrumb class="breadcrumb-container" /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from "@/components/Hamburger";
const { ipcRenderer } = window.require("electron");

export default {
  components: {
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (path == "/analyse/detail") {
        return "/analyse/index";
      }
      if (path == "/images/detail" || path == "images/add") {
        return "/images/index";
      }
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    engine() {
      this.$router.push({ path: "/register/engine" });
    },
    abrasive() {
      this.$router.push({ path: "/analyse/index" });
    },
    oil() {
      this.$router.push({ path: "/grease/index" });
    },
    data_regist() {
      this.$router.push({ path: "/sample/index" });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      ipcRenderer.send("logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 135px;
  z-index: 1500;
  background: #ffff;
  .ul-line {
    padding-top: 5px;
    ul {
      display: inline;
      padding: 5px 0 0 10px;
      white-space: nowrap;
      li {
        display: inline-block;
        margin-right: 6px;
        img {
          width: 65px;
          height: 65px;
        }
      }
    }
    .editimg {
      li {
        img {
          width: 45px;
          height: 45px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .dd {
    position: fixed;
    width: 100%;
    height: 10px;
    top: 60px;
    left: 0;
    box-shadow: 0px 6px 4px -4px #c1c1c1;
    z-index: 99999999999;
  }

  .hamburger-container {
    line-height: 65px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        height: 60px;
        cursor: pointer;
        .user-avatar {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
      }
    }
  }
  ::v-deep {
    .el-menu {
      background: #ecf5ff;
    }
    .el-submenu__title:hover {
      background: none;
    }
    .el-menu-item:hover {
      background: none;
    }
    .el-menu-item:focus {
      background: none;
    }
  }
}
</style>
