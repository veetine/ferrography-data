<template>
  <div class="container">
      
  </div>
</template>

<script>
import { dump } from "@/api/user";
export default {
  mounted() {
    dump().then((response) => {
      if (response) {
        this.$message({
          type: "success",
          message: "数据备份成功!",
        });
      }
    });
  },
  methods: {},
  data() {
    return {
      users: [],
      status: "",
      dialogVisible: false,
      oils: [],
      form: {},
    };
  },
};
</script>
<style lang='scss' scoped>
</style>