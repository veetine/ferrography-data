<template>
  <el-dialog
    :visible.sync="open"
    style="width: 100%"
    center
    class="abow_dialog"
    title="铁谱磨粒照片库"
    :before-close="handleclose"
  >
    <div class="diag-container">
      <el-row>
        <el-col :span="13">
          <el-card style="margin-right: 10px; margin-bottom: 10px">
            <div slot="header" class="clearfix">
              <span>图像信息</span>
            </div>
            <el-form
              :inline="true"
              ref="form"
              :model="form"
              size="small"
              label-width="110px"
            >
              <el-form-item label="铁谱照片编号">
                <el-input
                  style="width: 500px"
                  disabled
                  v-model="selectImageNum"
                />
              </el-form-item>

              <el-form-item label="飞机型号">
                <el-select
                  v-model="form.plane_type"
                  size="small"
                  disabled
                  style="width: 190px"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in motors"
                    :key="item.id"
                    :label="item.plane_type"
                    :value="item.plane_type"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="发动机编号">
                <el-select
                  v-model="form.motor_num"
                  size="small"
                  disabled
                  style="width: 190px"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in motors"
                    :key="item.id"
                    :label="item.motor_num"
                    :value="item.motor_num"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="发动机编号">
                <el-select
                  disabled
                  v-model="form.motor_num"
                  size="small"
                  style="width: 190px"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in motors"
                    :key="item.id"
                    :label="item.motor_num"
                    :value="item.motor_num"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="采样部位">
                <el-select
                  disabled
                  style="width: 190px"
                  v-model="form.sample_position"
                  size="small"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in samples"
                    :key="item.id"
                    :label="item.position"
                    :value="item.position"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="采样日期">
                <el-date-picker
                  style="width: 190px"
                  disabled
                  v-model="form.sample_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="采样日期"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="发动机工作时间">
                <el-input
                  disabled
                  style="width: 190px"
                  v-model="form.motor_work_time"
                  placeholder="123"
                  size="small"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="滑油工作时间">
                <el-input
                  style="width: 190px"
                  disabled
                  placeholder="滑油工作时间"
                  v-model="form.grease_work_time"
                  size="small"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card style="margin-right: 10px">
            <div class="block" style="text-align: center; margin-bottom: 15px">
              <el-image
                style="width: 400px; height: 370px; margin-bottom: 10px"
                fit="scale-down"
                :src="imageUrl"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </el-card>
        </el-col>

        <el-col :span="11">
          <el-card class="box-card-images">
            <el-table
              @row-click="handdleRow"
              size="small"
              ref="multipleTable"
              highlight-current-row
              :data="fileList"
              tooltip-effect="dark"
              style="width: 100%; min-height: 260px"
              header-cell-class-name="head"
            >
              <el-table-column label="图像序号" type="index" width="150">
              </el-table-column>
              <el-table-column label="图像编号">
                <template slot-scope="scope">
                  {{ scope.row.image_num }}
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <el-card
            style="margin-top: 10px; margin-bottom: 10px"
            class="caozuoqu"
          >
            <div slot="header" class="clearfix">
              <span>操作区</span>
            </div>
            <el-form :inline="true">
              <el-form-item style="margin-top: 15px">
                <el-button type="primary" @click="analyse">查看</el-button>
                <el-button type="primary" @click="del">删除</el-button>
                <el-button type="danger" @click="handleclose">关闭</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { getMotor } from "@/api/motor";
import { getSample } from "@/api/sample";
import { getReport, getReportImages } from "@/api/report";
import { delImages } from "@/api/images";

export default {
  mounted() {
    this.loadMotor();
    this.loadSample();
    this.loadReport();
    this.loadReportImg();
  },
  data() {
    return {
      open: true,
      picker: "",
      form: { picker: "" },
      reports: [],
      motors: [],
      samples: [],
      fileList: [],
      imageUrl: "",
      selectImageNum: "",
      id: "",
    };
  },
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    analyse() {
      this.$emit("toanalyse", this.form, this.imageUrl);
    },
    del() {
      delImages({ id: this.id }).then((response) => {
        if (response) {
          this.loadReportImg();
        }
      });
    },
    handdleRow(row, event, column) {
      this.$refs.multipleTable.setCurrentRow(row);
      this.id = row.id;
      this.imageUrl = row.url;
      this.selectImageNum = row.image_num;
    },
    handleclose() {
      this.$emit("backdata");
    },
    tabHandleClick(tab, event) {},
    loadReportImg() {
      getReportImages({ id: this.row.id }).then((response) => {
        if (response) {
          if (response.data.images != null) {
            this.fileList = response.data.images.map((value, key) => {
              return {
                id: value.id,
                url: value.image_path,
                image_num: value.image_num,
              };
            });
          }
          if (this.fileList.length != 0) {
            this.imageUrl = this.fileList[0].url;
          }
          console.log(this.fileList);
          this.form = response.data;
        }
      });
    },
    find() {
      this.loadReport();
    },
    reset() {
      this.formInline = {};
      this.loadReport();
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
      this.status = "add";
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.diag-container {
  padding: 10px;
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
      padding: 10px;
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