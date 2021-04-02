<template>
  <div class="diag-container">
    <el-row>
      <el-col :span="24">
        <el-form
          :inline="true"
          :model="formInline"
          size="small"
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
              v-model="formInline.motor_num"
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
                :label="item.motor_num"
                :value="item.motor_num"
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

          <el-form-item style="margin-right: 15px" label="采样日期">
            <el-date-picker
              size="small"
              v-model="formInline.sample_time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              @change="loadReport"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item style="margin-right: 15px" label="分析日期">
            <el-date-picker
              size="small"
              v-model="formInline.analyse_time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              @change="loadReport"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item class="item4" style="margin-right: 25px">
            <el-input
              v-model="formInline.ferr_num"
              placeholder="铁谱片号"
              @change="loadReport"
            >
              <span slot="prefix" style="color: #333; margin-left: 5px">
                铁谱片号:</span
              >
            </el-input>
          </el-form-item>

          <el-form-item class="item1" style="margin-right: 15px">
            <el-button type="primary" @click="find">查询</el-button>
          </el-form-item>
          <el-form-item class="item1">
            <el-button type="" @click="reset">重置</el-button>
          </el-form-item>
          <el-form-item class="item1" style="margin-right: 15px">
            <el-button type="primary" @click="add">添加</el-button>
          </el-form-item>
        </el-form>
        <el-table
          size="small"
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

          <el-table-column label="发动机编号">
            <template slot-scope="scope">
              {{ scope.row.motor_num }}
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
          <el-table-column label="分析日期">
            <template slot-scope="scope">
              {{ scope.row.analyse_time }}
            </template>
          </el-table-column>
          <el-table-column label="铁谱片号">
            <template slot-scope="scope">
              {{ scope.row.ferr_num }}
            </template>
          </el-table-column>
          <el-table-column label="滑油牌号">
            <template slot-scope="scope">
              {{ scope.row.brand }}
            </template>
          </el-table-column>
          <el-table-column label="发动机工作时间">
            <template slot-scope="scope">
              {{ scope.row.motor_work_time }}
            </template>
          </el-table-column>
          <el-table-column label="滑油工作时间">
            <template slot-scope="scope">
              {{ scope.row.grease_work_time }}
            </template>
          </el-table-column>
          <el-table-column label="制谱用油量">
            <template slot-scope="scope">
              {{ scope.row.gasoline }}
            </template>
          </el-table-column>
          <el-table-column label="稀释比">
            <template slot-scope="scope">
              {{ scope.row.dilution }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detail(scope.row)">
                查看
              </el-button>
              <el-button type="text" size="small" @click="edit(scope.row)">
                编辑
              </el-button>
              <el-button type="text" size="small" @click="del(scope.row)">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <AddImages
      @backdata="backdata"
      v-if="addImagesShow"
      :row="currow"
      class="add_images"
    />

    <Detail
      @backdata="detailBackData"
      @toanalyse="toAnalyse"
      v-if="detailShow"
      :row="currow"
      class="detail_images"
    />

    <Analyse
      @backdata="analyseBackData"
      @toanalyse="toAnalyse"
      v-if="analyseShow"
      :row="currow"
      class="add_images"
    />
  </div>
</template>

<script>
import { getMotor } from "@/api/motor";
import { getSample } from "@/api/sample";
import {
  getReport,
  delReport,
  updReport,
  getReportImages,
  addReport,
} from "@/api/report";
import { delImages } from "@/api/images";
import AddImages from "./add";
import Detail from "./detail";
import Analyse from "./analyse";

export default {
  components: {
    AddImages,
    Detail,
    Analyse,
  },
  mounted() {
    this.loadMotor();
    this.loadSample();
    this.loadReport();
  },
  data() {
    return {
      currow: {},
      addImagesShow: false,
      analyseShow: false,
      detailShow: false,
      dialogImg: false,
      formInline: {},
      picker: "",
      form: { picker: "" },
      reports: [],
      motors: [],
      samples: [],
      fileList: [],
      status: "",
    };
  },
  methods: {
    detail(row) {
      this.detailShow = true;
      this.currow = row;
    },
    detailBackData() {
      this.detailShow = false;
      this.currow = {};
    },
    analyseBackData() {
      this.analyseShow = false;
      this.currow = {};
    },
    toAnalyse(form, e) {
      this.detailShow = false;
      this.analyseShow = true;
      this.$set(this.currow, "image_path", e);
      this.$set(this.currow, "form", form);
    },
    backdata(e) {
      this.addImagesShow = false;
      this.currow = {};
    },
    edit(row) {
      row.status = "edit";
      this.currow = row;
      this.addImagesShow = true;
    },
    find() {
      this.loadReport();
    },
    reset() {
      this.formInline = {};
      this.loadReport();
    },
    del(row) {
      this.$confirm("此操作将永久删除该信息吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delReport({ id: row.id }).then((response) => {
            if (response.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.loadReport();
            }
          });
        })
        .catch(() => {});
    },
    save() {
      if (this.status == "add" && !this.form.id) {
        addReport(this.form).then((response) => {
          if (response) {
            this.$set(this.form, "id", response.data);
            this.$refs.upload.submit();
            this.$message({
              type: "success",
              message: "保存成功!",
            });
            this.loadReport();
          }
        });
      } else {
        updReport(this.form).then((response) => {
          if (response) {
            this.$refs.upload.submit();
            this.$message({
              type: "success",
              message: "保存成功!",
            });
            this.loadReport();
          }
        });
      }
    },
    loadMotor() {
      getMotor().then((response) => {
        if (response) {
          this.motors = response.data;
        }
      });
    },
    loadReport() {
      getReport(this.formInline).then((response) => {
        if (response) {
          this.reports = response.data;
        }
      });
    },
    loadSample() {
      getSample().then((response) => {
        if (response) {
          this.samples = response.data;
        }
      });
    },
    add() {
      this.currow.status = "add";
      this.addImagesShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.diag-container {
  ::v-deep {
    .el-upload-list__item {
      transition: none !important;
    }
    .caozuoqu {
      .el-card__body {
        padding: 20px;
      }
    }
    .add_images {
      .el-dialog {
        width: 90%;
      }
    }
    .detail_images {
      .el-dialog {
        width: 92%;
        .el-dialog__body {
          padding: 10px;
          padding-top: 0;
        }
      }
      .el-card__body {
        padding-top: 10px;
      }
    }
    .imglist {
      .el-card__body {
        margin: 10px;
      }
    }
    .el-table td {
      position: unset;
    }
    .box-card-images {
      .el-card__body {
        padding-top: 0px;
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

    .item2 .el-input__inner {
      padding-left: 45px;
    }

    .item3 .el-input__inner {
      padding-left: 60px;
    }

    .item4 .el-input__inner {
      padding-left: 75px;
    }

    .item5 .el-input__inner {
      padding-left: 95px;
    }
    .item5 .el-input__inner {
      padding-left: 90px;
    }

    .item6 .el-input__inner {
      padding-left: 105px;
    }

    .el-card__body {
      width: 100%;
      padding: 0;
      border-radius: 4px;
      overflow: hidden;
    }
    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #f5f7fa;
      color: #909399;
      font-size: 40px;
    }
  }
}
.analyse-container {
  ::v-deep {
    .el-table td {
      position: unset;
    }

    .el-form-item {
      margin-bottom: 8px;
    }
    .el-card__header {
      padding: 14px 20px;
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

    .el-card__body {
      width: 100%;
      padding: 10px;
      padding-top: 4px;
      border-radius: 4px;
      overflow: hidden;
    }
    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #f5f7fa;
      color: #909399;
      font-size: 40px;
    }
  }
}
</style>