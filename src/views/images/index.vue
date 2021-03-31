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
          <el-table-column label="图像编号">
            <template slot-scope="scope">
              {{ scope.row.image_num }}
            </template>
          </el-table-column>
          <el-table-column label="飞机型号">
            <template slot-scope="scope">
              {{ scope.row.plane_type }}
            </template>
          </el-table-column>

          <el-table-column label="发动机型号">
            <template slot-scope="scope">
              {{ scope.row.motor_type }}
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

    <el-dialog
      title="新增照片库"
      center
      :visible.sync="dialogVisible"
      @close="close"
      width="91%"
    >
      <el-row>
        <el-col :span="16">
          <el-card
            style="margin-right: 10px; margin-bottom: 10px; min-height: 475px"
            class="imglist"
          >
            <div slot="header" class="clearfix">
              <span>图像列表</span>
            </div>
            <el-upload
              ref="upload"
              action="http://localhost:4394/api/images/upload"
              list-type="picture-card"
              :on-remove="handleRemove"
              :data="form"
              :on-preview="handlePictureCardPreview"
              :on-change="handleAvatarSuccess"
              :auto-upload="false"
              multiple
              :file-list="fileList"
              :limit="20"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogImg" append-to-body>
              <img width="100%" :src="imageUrl" alt="" />
            </el-dialog>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card style="padding-right: 15px">
            <div slot="header" class="clearfix">
              <span>信息录入</span>
            </div>
            <el-form
              style="margin-top: 10px"
              ref="form"
              :model="form"
              size="small"
              label-width="130px"
              class="zndfx"
            >
              <el-form-item label="飞机型号">
                <el-select
                  v-model="form.plane_type"
                  size="small"
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

              <el-form-item label="发动机型号">
                <el-select
                  v-model="form.motor_type"
                  size="small"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in motors"
                    :key="item.id"
                    :label="item.motor_type"
                    :value="item.motor_type"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="发动机编号">
                <el-select
                  v-model="form.motor_num"
                  size="small"
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
                  style="width: 191px"
                  v-model="form.sample_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="采样日期"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="发动机工作时间">
                <el-input
                  v-model="form.motor_work_time"
                  placeholder="123"
                  size="small"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="滑油工作时间">
                <el-input
                  placeholder="滑油工作时间"
                  v-model="form.grease_work_time"
                  size="small"
                >
                </el-input>
              </el-form-item>

              <el-form-item style="margin-top: 15px">
                <el-button type="primary" size="small" @click="save"
                  >保存</el-button
                >
                <el-button type="danger" size="small" @click="close"
                  >关闭</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
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

export default {
  mounted() {
    this.loadMotor();
    this.loadSample();
    this.loadReport();
  },
  data() {
    return {
      dialogVisible: false,
      dialogImg: false,
      formInline: {},
      picker: "",
      form: { picker: "" },
      reports: [],
      motors: [],
      samples: [],
      fileList: [],
      imageUrl: "",
      status: "",
    };
  },
  methods: {
    edit(row) {
      this.status = "edit";
      getReportImages({ image_num: row.image_num }).then((response) => {
        if (response) {
          if (response.data.images != null) {
            this.fileList = response.data.images.map((value, key) => {
              return {
                name: value.id,
                url: value.image_path,
              };
            });
          }
          this.form = response.data;
          this.dialogVisible = true;
        }
      });
    },
    handleAvatarSuccess(file, filelist) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    find() {
      this.loadReport();
    },
    reset() {
      this.formInline = {};
      this.loadReport();
    },
    close() {
      this.form = {};
      this.$refs.upload.clearFiles();
      this.dialogVisible = false;
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogImg = true;
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
    onImgChange() {},
    handleRemove(file, fileList) {
      for (var i = 0; i < fileList.length; i++) {
        this.imageUrl = fileList[i].url;
        break;
      }
      console.log(file);
      if (file.status == "success") {
        var id = file.name;
        if (file.response != undefined && file.response.data.id != "") {
          id = file.response.data.id;
        }
        delImages({ id: id }).then((response) => {
          if (response) {
            this.samples = response.data;
          }
        });
      }
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
  ::v-deep {
    .imglist {
      .el-card__body {
        margin: 10px;
      }
    }
    .el-table td {
      position: unset;
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
</style>