<template>
  <el-dialog
    :visible.sync="open"
    style="width: 100%"
    center
    title="添加照片库"
    :before-close="handleclose"
  >
    <div class="container">
      <el-row>
        <el-col :span="16">
          <el-card
            style="margin-right: 10px; margin-bottom: 10px; min-height: 475px"
            class="imglist"
          >
            <div slot="header" class="clearfix" style="text-align: center">
              <el-form label-width="100px" inline>
                <el-form-item label="图片序号">
                  <el-input
                    size="small"
                    disabled
                    style="width: 210px"
                    v-model="image_name"
                /></el-form-item>
                <el-form-item label="图片编号">
                  <el-input
                    size="small"
                    disabled
                    style="width: 260px"
                    v-model="image_num"
                /></el-form-item>
              </el-form>
            </div>
            <el-upload
              style="display: inline"
              ref="upload"
              action="http://localhost:4394/api/images/upload"
              list-type="picture-card"
              :on-remove="handleRemove"
              :data="form"
              :on-preview="handlePictureCardPreview"
              :on-change="handleAvatarSuccess"
              :auto-upload="false"
              multiple
              :limit="20"
              :file-list="fileList"
              :on-exceed="handleExceed"
              :on-success="(value, file) => handleSuccessImg(value, file)"
            >
            </el-upload>
            <ul class="el-upload-list el-upload-list--picture-card">
              <li
                tabindex="0"
                class="el-upload-list__item is-success"
                v-for="item in myFileList"
                :key="item.name"
              >
                <img
                  src="@/assets/img/default-img.png"
                  alt=""
                  class="el-upload-list__item-thumbnail"
                />
                <a class="el-upload-list__item-name">
                  <i class="el-icon-document"> </i>
                  0
                </a>
                <label class="el-upload-list__item-status-label">
                  <i class="el-icon-upload-success el-icon-check"> </i>
                </label>
                <!---->
              </li>
            </ul>
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
              <el-form-item
                label="飞机型号"
                prop="plane_type"
                :rules="[{ required: true, message: '请选择飞机型号' }]"
              >
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

              <el-form-item
                label="飞机编号"
                :rules="[{ required: true, message: '请选择飞机编号' }]"
                prop="plane_num"
              >
                <el-select
                  v-model="form.plane_num"
                  size="small"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in motors"
                    :key="item.id"
                    :label="item.plane_num"
                    :value="item.plane_num"
                  />
                </el-select>
              </el-form-item>

              <el-form-item
                label="发动机编号"
                :rules="[{ required: true, message: '请选择发动机编号' }]"
                prop="motor_num"
              >
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

              <el-form-item
                label="采样部位"
                :rules="[{ required: true, message: '请选择采样部位' }]"
                prop="sample_position"
              >
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

              <el-form-item
                label="采样日期"
                :rules="[{ required: true, message: '请选择采样日期' }]"
                prop="sample_time"
              >
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
                  placeholder="发动机工作时间"
                  style="width: 191px"
                  size="small"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="滑油工作时间">
                <el-input
                  placeholder="滑油工作时间"
                  style="width: 191px"
                  v-model="form.grease_work_time"
                  size="small"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card style="margin-top: 10px">
            <div slot="header" class="clearfix">
              <span>操作区</span>
            </div>
            <el-form size="small" label-width="50px">
              <el-form-item style="margin-top: 15px">
                <el-button
                  type="primary"
                  size="small"
                  @click="addImage"
                  style="margin-right: 10px"
                  >添加图片</el-button
                >
                <el-button size="small" type="primary" @click="generate"
                  >生成编号</el-button
                >
              </el-form-item>
              <el-form-item style="margin-top: 15px">
                <el-button
                  type="primary"
                  size="small"
                  @click="save"
                  style="margin-right: 10px"
                  >保存图片</el-button
                >
                <el-button type="danger" size="small" @click="handleclose"
                  >关闭</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

  <script>
import { addMotor, getMotor, delMotor, updMotor } from "@/api/motor";
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
    this.loadReportImg();
  },
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      open: true,
      image_name: "",
      image_num: "",
      motors: [],
      form: {},
      myFileList: [],
      fileList: [],
      samples: [],
      dialogImg: false,
    };
  },
  methods: {
    loadReportImg() {
      if (this.row.status == "edit") {
        getReportImages({ id: this.row.id }).then((response) => {
          if (response) {
            if (response.data.images != null) {
              this.fileList = response.data.images.map((value, key) => {
                this.myFileList.pop();
                return {
                  name: value.id,
                  url: value.image_path,
                  image_num: value.image_num,
                };
              });
            }
            this.form = response.data;
          }
        });
      }
    },
    handleclose() {
      this.$emit("backdata");
    },
    addImage() {
      document.querySelector('input[name="file"]').click();
    },
    generate() {
      this.save();
    },
    handleExceed(file, fileList) {
      this.$message({
        type: "warning",
        message: "最多可上传20张图片",
      });
    },
    loadSample() {
      getSample().then((response) => {
        if (response) {
          this.samples = response.data;
        }
      });
    },
    save() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (!this.form.id) {
            addReport(this.form).then((response) => {
              if (response) {
                this.$set(this.form, "id", response.data);
                this.$refs.upload.submit();
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }
            });
          } else {
            updReport(this.form).then((response) => {
              if (response) {
                this.$refs.upload.submit();
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    handleSuccessImg(response, file) {
      file.image_num = response.data.image_num;
    },
    handleAvatarSuccess(file, fileList) {
      if (file.status != "success") {
        this.myFileList.pop();
      }
    },
    handleRemove(file, fileList) {
      this.myFileList.push({
        name: this.myFileList.length,
      });
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
    handlePictureCardPreview(file) {
      this.image_name = file.name;
      this.image_num = file.image_num;
    },
    close() {
      location.reload();
    },
    loadMotor() {
      getMotor().then((response) => {
        if (response) {
          this.motors = response.data;
        }
      });
      for (var i = 0; i < 20; i++) {
        this.myFileList.push({ name: i });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.container {
  .el-upload-list {
    width: 0px;
    height: 0px;
  }
  padding: 10px;
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  ::v-deep {
    .myupload {
      .el-upload-list__item-actions {
        background: none;
        .selected {
          background: #f0f9eb;
        }
        .el-upload-list__item-preview {
          width: 100%;
          height: 100%;
          display: block;
          i {
            display: none;
          }
        }
        .el-upload-list__item-delete {
          display: none;
        }
      }
    }

    .el-upload--picture-card {
      display: none;
    }
    .el-upload-list--picture-card {
      .el-upload-list__item {
        margin: 0 20px 8px 0;
      }
    }

    .el-card__header {
      padding: 14px 20px;
    }
    .imglist {
      .el-card__body {
        margin-top: 10px;
        padding-left: 30px;
      }
      .el-card__header {
        padding: 3px 0;
      }
      .el-form-item {
        margin-bottom: 0;
      }
    }
    .el-card__body {
      padding: 0px;
    }
    .el-dialog {
      border-radius: 8px;
    }
    .el-table__header-wrapper .el-checkbox:before {
      content: "选择";
      font-size: 13px;
      color: #999;
    }
    .el-popover {
      min-width: 100px;
    }

    .el-cascader {
      width: 100%;
    }

    .el-table__header-wrapper .el-checkbox:before {
      content: "选择";
      font-size: 13px;
      color: #999;
    }

    .el-table-column--selection .cell {
      text-align: center;
    }

    .el-table__header-wrapper .el-checkbox {
      text-indent: 1px;
    }

    .el-table__header-wrapper .el-checkbox span {
      display: none;
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