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
                <el-form-item label="图片序号:">
                  <span>{{ image_name }}</span>
                </el-form-item>
                <el-form-item label="图片编号:">
                  <span>{{ image_num }}</span>
                </el-form-item>
              </el-form>
            </div>
            <ul class="el-upload-list el-upload-list--picture-card">
              <li
                tabindex="0"
                class="el-upload-list__item"
                :class="[
                  item.status == 'success' ? 'is-success' : '',
                  item.selected ? 'select' : '',
                ]"
                v-for="(item, i) in fileList"
                :key="i"
                @click="handleImgClick(i)"
              >
                <img
                  :src="item.url"
                  alt=""
                  class="el-upload-list__item-thumbnail"
                />
                <a class="el-upload-list__item-name">
                  <i class="el-icon-document"> </i>
                  0
                </a>
                <label class="el-upload-list__item-status-label"
                  ><i class="el-icon-upload-success el-icon-check"></i
                ></label>
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
              label-width="130px"
              class="zndfx"
            >
              <el-form-item
                label="飞机型号"
                prop="plane_type"
                :rules="[{ required: true, message: '请选择飞机型号' }]"
              >
                <el-select v-model="form.plane_type" placeholder="请选择">
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
                <el-select v-model="form.plane_num" placeholder="请选择">
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
                <el-select v-model="form.motor_num" placeholder="请选择">
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
                <el-select v-model="form.sample_position" placeholder="请选择">
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
                  style="width: 90%"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="滑油工作时间">
                <el-input
                  placeholder="滑油工作时间"
                  style="width: 90%"
                  v-model="form.grease_work_time"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card style="margin-top: 10px">
            <div slot="header" class="clearfix">
              <span>操作区</span>
            </div>
            <el-form label-width="50px">
              <el-form-item style="margin-top: 15px">
                <el-button
                  type="primary"
                  @click="addImage"
                  style="margin-right: 10px"
                  >添加图片</el-button
                >
                <input
                  style="display: none"
                  ref="imgupload"
                  type="file"
                  multiple="multiple"
                  accept="image/*"
                  @change="handleFileChange($event)"
                />
                <el-button
                  type="primary"
                  @click="delImage"
                  style="margin-right: 10px"
                  >删除图片</el-button
                >
              </el-form-item>

              <el-form-item style="margin-top: 15px">
                <el-button type="primary" @click="generate">生成编号</el-button>
              </el-form-item>
              <el-form-item style="margin-top: 15px">
                <el-button type="primary" @click="save">保存</el-button>
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
import { addMotor, getMotor, delMotor, updMotor } from "@/api/motor";
import { getSample } from "@/api/sample";
import {
  getReport,
  delReport,
  updReport,
  getReportImages,
  addReport,
} from "@/api/report";
import { delImages, addImages } from "@/api/images";

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
      fileList: [],
      samples: [],
      dialogImg: false,
      imgfilesback: [],
      index: -1,
      file: {},
    };
  },
  methods: {
    delImage() {
      if (this.index != -1) {
        if (this.file.status == "success") {
          delImages({ id: this.image_name }).then((response) => {
            if (response) {
              this.imgfilesback.splice(this.index, 1);
              this.fileList.splice(this.index, 1);
            }
          });
        } else {
          is.imgfilesback.splice(this.index, 1);
          this.fileList.splice(this.index, 1);
        }
        this.fileList.push({
          name: this.fileList.length + 1,
          status: "ready",
          default: true,
          selected: false,
          url: require("@/assets/img/default-img.png"),
        });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择图片!",
        });
      }
    },
    loadReportImg() {
      if (this.row.status == "edit") {
        getReportImages({ id: this.row.id }).then((response) => {
          if (response) {
            if (response.data.images != null) {
              this.fileList = response.data.images.map((value, key) => {
                return {
                  name: value.id,
                  url: value.image_path,
                  image_num: value.image_num,
                  default: false,
                  status: "success",
                };
              });
              this.fileList.map((item, index) => {
                this.imgfilesback.push({ file: 1 });
              });
              var sum = 20 - this.fileList.length;
              for (let i = 0; i < sum; i++) {
                this.fileList.push({
                  name: "",
                  status: "ready",
                  default: true,
                  selected: false,
                  image_num: "",
                  url: require("@/assets/img/default-img.png"),
                });
              }
            } else {
              for (var i = 0; i < 20; i++) {
                this.fileList.push({
                  name: "",
                  status: "ready",
                  default: true,
                  selected: false,
                  image_num: "",
                  url: require("@/assets/img/default-img.png"),
                });
              }
            }
            this.form = response.data;
          }
        });
      } else {
        for (var i = 0; i < 20; i++) {
          this.fileList.push({
            name: "",
            status: "ready",
            default: true,
            selected: false,
            image_num: "",
            url: require("@/assets/img/default-img.png"),
          });
        }
      }
    },
    handleclose() {
      this.$emit("backdata");
    },
    handleImgClick(k) {
      for (var i = 0; i < this.fileList.length; i++) {
        if (k == i) {
          this.fileList[i].selected = true;
          this.image_num = this.fileList[i].image_num;
          this.image_name = this.fileList[i].name;
          this.file = this.fileList[i];
        } else {
          this.fileList[i].selected = false;
        }
      }
      this.index = k;
    },
    handleFileChange(e) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files;
      var leng = file.length;
      for (var i = 0; i < leng; i++) {
        var reader = new FileReader();
        _this.imgfilesback.push(file[i]);
        reader.readAsDataURL(file[i]);
        reader.onload = function (e) {
          for (let i = 0; i < _this.fileList.length; i++) {
            if (_this.fileList[i].default) {
              _this.fileList[i].url = e.target.result;
              _this.fileList[i].default = false;
              break;
            }
          }
        };
      }
      console.log(this.imgfilesback);
    },
    addImage() {
      this.$refs.imgupload.click();
    },
    generate() {
      this.save();
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
          addReport(this.form).then((response) => {
            if (response) {
              this.$set(this.form, "id", response.data);
              for (let i = 0; i < this.fileList.length; i++) {
                if (
                  this.fileList[i].status == "ready" &&
                  !this.fileList[i].default
                ) {
                  const formData = new FormData();
                  formData.append("id", response.data);
                  formData.append("file", this.imgfilesback[i]);
                  console.log(this.imgfilesback);
                  addImages(formData).then((response) => {
                    this.fileList[i].image_num = response.data.image_num;
                    this.fileList[i].status = "success";
                    this.fileList[i].name = response.data.id;
                  });
                }
              }
            }
          });
        } else {
          return false;
        }
      });
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
    .zndfx {
      .el-date-editor {
        width: 90%;
      }
      .el-select {
        width: 90%;
      }
    }
    .el-upload-list {
      li.select {
        border: 4px solid#FFC07B;
      }
    }

    .el-upload--picture-card {
      display: none;
    }
    .el-upload-list--picture-card {
      .el-upload-list__item {
        margin: 0 20px 8px 0;
      }
      .el-upload-list__item:focus {
        outline: none;
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