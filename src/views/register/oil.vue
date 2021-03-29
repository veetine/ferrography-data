<template>
  <div class="oil-content">
    <el-row>
      <el-col :span="24">
        <el-card
          :body-style="{
            padding: '10px',
          }"
          style="margin: 10px"
          class="mycard"
        >
          <div slot="header" class="clearfix">
            <span>油液列表</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="dialogVisible = true"
              >注册油液</el-button
            >
          </div>
          <el-table
            :data="tableData"
            size="small"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="take_point" label="采样部位" width="180">
            </el-table-column>
            <el-table-column prop="take_date" label="采样日期" width="180">
            </el-table-column>
            <el-table-column prop="ferr_number" label="铁谱片号">
            </el-table-column>
            <el-table-column prop="engine_time" label="发动机工作时间(h)">
            </el-table-column>
            <el-table-column prop="huayou_time" label="滑油工作时间(h)">
            </el-table-column>
            <el-table-column prop="oil_sum" label="制谱用油量(L)">
            </el-table-column>
            <el-table-column prop="ratio" label="稀释比"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template>
                <el-button type="text" size="small"> 编辑 </el-button>
                <el-button type="text" size="small"> 移除 </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card></el-col
      >

      <el-dialog center title="油液注册" :visible.sync="dialogVisible">
        <div>
          <el-form
            size="small"
            ref="form"
            :model="form"
            label-width="130px"
            class="demo-ruleForm"
          >
            <el-form-item label="采样部位" prop="take_point">
              <el-input
                v-model="form.take_point"
                placeholder="请填写采样部位"
              />
            </el-form-item>
            <el-form-item label="采样日期" prop="create_time">
              <el-date-picker
                v-model="form.create_time"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>

            <el-form-item label="铁谱片号" prop="take_point">
              <el-input
                v-model="form.take_point"
                placeholder="请填写铁谱片号"
              />
            </el-form-item>

            <el-form-item label="发动机工作时间(h)" prop="take_point">
              <el-input
                v-model="form.take_point"
                placeholder="请填写发动机工作时间"
              />
            </el-form-item>

            <el-form-item label="滑油工作时间(h)" prop="take_point">
              <el-input
                v-model="form.take_point"
                placeholder="请填写滑油工作时间"
              />
            </el-form-item>

            <el-form-item label="制谱用油量(h)" prop="take_point">
              <el-input
                v-model="form.take_point"
                placeholder="请填写制谱用油量"
              />
            </el-form-item>

             <el-form-item label="稀释比" prop="take_point">
              <el-input
                v-model="form.take_point"
                placeholder="请填稀释比"
              />
            </el-form-item>
            <el-form-item style="margin-top: 30px">
              <el-button type="primary">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

  <script>
export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "success-row";
      } else if (rowIndex === 3) {
        // return "success-row";
      }
      return "";
    },
    onSubmit() {
      console.log("submit!");
    },
    register() {
      console.log(123);
    },
  },
  data() {
    return {
      ruleForm: {},
      dialogVisible: false,
      tableData: [
        {
          take_point: "主油滤",
          take_date: "2020-03-23 15:05:21",
          ferr_number: "145123",
          engine_time: "500h",
          huayou_time: "24h",
          oil_sum: "10",
          ratio: "5%",
        },
        {
          take_point: "主油滤",
          take_date: "2020-03-23 15:05:21",
          ferr_number: "145123",
          engine_time: "500h",
          huayou_time: "24h",
          oil_sum: "10",
          ratio: "5%",
        },
        {
          take_point: "主油滤",
          take_date: "2020-03-23 15:05:21",
          ferr_number: "145123",
          engine_time: "500h",
          huayou_time: "24h",
          oil_sum: "10",
          ratio: "5%",
        },
        {
          take_point: "主油滤",
          take_date: "2020-03-23 15:05:21",
          ferr_number: "145123",
          engine_time: "500h",
          huayou_time: "24h",
          oil_sum: "10",
          ratio: "5%",
        },
        {
          take_point: "主油滤",
          take_date: "2020-03-23 15:05:21",
          ferr_number: "145123",
          engine_time: "500h",
          huayou_time: "24h",
          oil_sum: "10",
          ratio: "5%",
        },
        {
          take_point: "主油滤",
          take_date: "2020-03-23 15:05:21",
          ferr_number: "145123",
          engine_time: "500h",
          huayou_time: "24h",
          oil_sum: "10",
          ratio: "5%",
        },
        {
          take_point: "主油滤",
          take_date: "2020-03-23 15:05:21",
          ferr_number: "145123",
          engine_time: "500h",
          huayou_time: "24h",
          oil_sum: "10",
          ratio: "5%",
        },
        {
          take_point: "主油滤",
          take_date: "2020-03-23 15:05:21",
          ferr_number: "145123",
          engine_time: "500h",
          huayou_time: "24h",
          oil_sum: "10",
          ratio: "5%",
        },
        {
          take_point: "主油滤",
          take_date: "2020-03-23 15:05:21",
          ferr_number: "145123",
          engine_time: "500h",
          huayou_time: "24h",
          oil_sum: "10",
          ratio: "5%",
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
<style lang='scss' scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.oil-content {
  ::v-deep {
    .el-checkbox-group {
      padding: 15px;
    }

    .el-checkbox {
      margin-bottom: 10px;
      margin-right: 20px;
    }

    .el-dialog {
      border-radius: 6px;
    }

    .el-checkbox__label {
      font-size: 12px;
    }

    .el-table th.head {
      background: #f9f9f9;
      border-bottom: 0;
      color: #999;
      font-size: 13px;
    }

    .el-table__expanded-cell {
      padding-top: 0;
      padding-bottom: 0;
    }

    .fir {
      .el-input__inner {
        width: 350px;
      }
    }

    .t {
      .el-input__inner {
        width: 90%;
      }
    }

    .el-input__inner {
      width: 350px;
    }

    .el-textarea__inner {
      width: 350px;
    }

    .el-date-editor.el-input__inner {
      width: 350px;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 350px;
    }
  }
}
</style>