<template>
  <div class="container" style="margin: 0 auto; text-align: center">
    <p style="margin: 40px">首页</p>
    <el-image fit="scale-down" :src="img" />
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
  },
  data() {
    return {
      libpath: "",
      res: "",
      activeIndex: "1",
      img: require("@/assets/img/index.png"),
    };
  },
  methods: {
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
