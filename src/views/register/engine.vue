<template>
  <el-row>
    <el-col :span="15">
      <el-card
        :body-style="{
          padding: '10px',
        }"
        style="margin: 10px"
        class="mycard"
      >
        <div slot="header" class="clearfix">
          <span>发动机列表</span>
        </div>
        <el-table
          :data="tableData"
          size="small"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="plane_model" label="飞机型号" width="180">
          </el-table-column>
          <el-table-column prop="plane_num" label="飞机编号" width="180">
          </el-table-column>
          <el-table-column prop="engine_num" label="发动机编号">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template>
              <el-button type="text" size="small"> 编辑 </el-button>
              <el-button type="text" size="small"> 移除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card></el-col
    >
    <el-col :span="9">
      <el-card
        :body-style="{
          padding: '10px',
        }"
        style="margin: 10px; margin-left: 0px"
        class="mycard"
      >
        <div slot="header" class="clearfix">
          <span>发动机注册</span>
        </div>
        <el-form ref="form" :model="form" label-width="100px" size="small">
          <el-form-item label="飞机型号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="飞机编号">
            <el-input v-model="form.name"></el-input> </el-form-item
          ><el-form-item label="发动机编号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

  <script>
export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    onSubmit() {
      console.log("submit!");
    },
  },
  data() {
    return {
      tableData: [
        {
          plane_model: "B733",
          plane_num: "2801",
          engine_num: "CMF56-7B",
        },
        {
          plane_model: "B735",
          plane_num: "2822",
          engine_num: "CMF56-7B",
        },
        {
          plane_model: "A320",
          plane_num: "2546",
          engine_num: "CMF56-7B",
        },
        {
          plane_model: "A319",
          plane_num: "2766",
          engine_num: "CMF56-7B",
        },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>