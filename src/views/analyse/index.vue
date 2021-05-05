<template>
  <div class="diag-container">
    <el-row>
      <el-col :span="24">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline row middle-xs"
          style="width: 100%; min-height: 60px; padding: 15px 15px 0 15px"
        >
          <el-form-item class="item4">
            <el-select
              v-model="formInline.plane_type"
              clearable
              placeholder="飞机型号"
              @change="loadReport"
            >
              <span slot="prefix" style="color: #333; margin-left: 5px">
                飞机型号:</span
              >
              <el-option
                v-for="item in motors"
                :key="item.id"
                :label="item.plane_type"
                :value="item.plane_type"
              />
            </el-select>
          </el-form-item>

          <el-form-item class="item5">
            <el-select
              v-model="formInline.motor_type"
              clearable
              placeholder="发动机型号"
              @change="loadReport"
            >
              <span slot="prefix" style="color: #333; margin-left: 5px">
                发动机型号:</span
              >
              <el-option
                v-for="item in motors"
                :key="item.id"
                :label="item.motor_type"
                :value="item.motor_type"
              />
            </el-select>
          </el-form-item>

          <el-form-item class="item4">
            <el-select
              v-model="formInline.sample_position"
              clearable
              @change="loadReport"
              placeholder="采样部位"
            >
              <span slot="prefix" style="color: #333; margin-left: 5px">
                采样部位:</span
              >
              <el-option
                v-for="item in samples"
                :key="item.id"
                :label="item.position"
                :value="item.position"
              />
            </el-select>
          </el-form-item>

          <el-form-item class="item4">
            <el-select
              v-model="formInline.brand"
              clearable
              @change="loadReport"
              placeholder="滑油牌号"
            >
              <span slot="prefix" style="color: #333; margin-left: 5px">
                滑油牌号:</span
              >
              <el-option
                v-for="item in greases"
                :key="item.id"
                :label="item.brand"
                :value="item.brand"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            class="item1"
            style="margin-left: 10px; margin-right: 15px"
          >
            <el-button type="primary" @click="find">查询</el-button>
          </el-form-item>
          <el-form-item class="item1">
            <el-button type="" @click="reset">重置</el-button>
          </el-form-item>
          <el-form-item class="item1" style="margin-right: 15px">
          </el-form-item>
        </el-form>

        <el-table
          ref="multipleTable"
          :data="reports"
          tooltip-effect="dark"
          style="width: 100%"
          header-cell-class-name="head"
        >
          <el-table-column label="飞机型号">
            <template slot-scope="scope">
              {{ scope.row.plane_type }}
            </template>
          </el-table-column>

          <el-table-column label="飞机编号">
            <template slot-scope="scope">
              {{ scope.row.plane_num }}
            </template>
          </el-table-column>

          <el-table-column label="发动机型号">
            <template slot-scope="scope">
              {{ scope.row.motor_type}}
            </template>
          </el-table-column>
          <el-table-column label="采样部位">
            <template slot-scope="scope">
              {{ scope.row.sample_position }}
            </template>
          </el-table-column>
          <el-table-column label="采样日期">
            <template slot-scope="scope">
              {{ scope.row.sample_time }}
            </template>
          </el-table-column>

          <el-table-column label="滑油牌号">
            <template slot-scope="scope">
              {{ scope.row.brand }}
            </template>
          </el-table-column>
          <el-table-column label="总工作时间">
            <template slot-scope="scope">
              {{ scope.row.sum_work_time }}
            </template>
          </el-table-column>
          <el-table-column label="滑油工作时间">
            <template slot-scope="scope">
              {{ scope.row.grease_work_time }}
            </template>
          </el-table-column>
          <el-table-column label="制谱用油样量">
            <template slot-scope="scope">
              {{ scope.row.dosage }}
            </template>
          </el-table-column>
          <el-table-column label="稀释比">
            <template slot-scope="scope">
              {{ scope.row.ratio }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row)">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getFormData } from "@/api/motor";
import { getReport } from "@/api/report";

export default {
  mounted() {
    this.loadFormData();
    this.loadReport();
  },
  data() {
    return {
      formInline: {},
      form: {},
      reports: [],
      motors: [],
      samples: [],
      tableData: [],
      imageUrl: "",
      textarea: "",
      greases: [],
      selectImageNum: "",
      image: {},
    };
  },
  methods: {
    loadFormData() {
      getFormData().then((response) => {
        if (response) {
          this.motors = response.data.motors;
          this.samples = response.data.samples;
          this.greases = response.data.greases;
          this.oils = response.data.oils;
          this.dilutions = response.data.dilutions;
        }
      });
    },
    detail(row) {
      this.$router.push({ path: "/analyse/detail", query: { id: row.id } });
    },
    find() {
      this.loadReport();
    },
    reset() {
      this.formInline = {};
      this.loadReport();
    },
    loadReport() {
      this.formInline.guzhang=1
      getReport(this.formInline).then((response) => {
        if (response) {
          this.reports = response.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.diag-container {
  ::v-deep {
    .el-table td {
      position: unset;
    }
    .infolfform {
      .el-form-item {
        margin-bottom: 8px;
      }
    }
    .item4 .el-form-item__label {
      margin-left: 3px;
      margin-right: 3px;
      font-weight: unset;
      position: absolute;
      left: 5px;
      z-index: 1;
      font-size: 13px;
      color: #333;
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

    .item4 .el-input__inner {
      padding-left: 75px;
      width: 235px;
    }
    .item5 .el-input__inner {
      padding-left: 95px;
      width: 235px;
    }
    .item5 .el-input__inner {
      padding-left: 90px;
    }
  }
}
</style>