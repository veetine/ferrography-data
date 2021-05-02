<template>
  <div class="container">
    <el-row>
      <el-col :span="13">
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
              <el-image
                style="width: 148px; height: 148px; margin-bottom: 10px"
                fit="cover"
                :src="item.url"
              />
            </li>
          </ul>
        </el-card>
      </el-col>

      <el-col :span="11">
        <el-card>
          <div slot="header" class="clearfix">
            <span>信息录入</span>
          </div>
          <el-form
            :inline="true"
            style="margin-top: 10px; text-align: center"
            ref="form"
            :model="form"
            label-position="right"
            class="zndfx"
            label-width="110px"
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
              label="发动机型号"
              :rules="[{ required: true, message: '请选择发动机型号' }]"
              prop="motor_type"
            >
              <el-select v-model="form.motor_type" placeholder="请选择">
                <el-option
                  v-for="item in motors"
                  :key="item.id"
                  :label="item.motor_type"
                  :value="item.motor_type"
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

            <el-form-item
              label="总工作时间"
              prop="sum_work_time"
              :rules="[{ required: true, message: '请填写总工作时间' }]"
            >
              <el-input v-model="form.sum_work_time" placeholder="总工作时间">
              </el-input>
            </el-form-item>
            <el-form-item
              label="滑油牌号"
              prop="brand"
              :rules="[{ required: true, message: '请选择滑油牌号' }]"
            >
              <el-select v-model="form.brand" placeholder="滑油牌号">
                <el-option
                  v-for="item in greases"
                  :key="item.id"
                  :label="item.brand"
                  :value="item.brand"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="滑油工作时间"
              prop="grease_work_time"
              :rules="[{ required: true, message: '请填写滑油工作时间' }]"
            >
              <el-input
                placeholder="滑油工作时间"
                v-model="form.grease_work_time"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="制谱用油样量"
              prop="dosage"
              :rules="[{ required: true, message: '请选择制谱用油样量' }]"
            >
              <el-select v-model="form.dosage" placeholder="制谱用油样量">
                <el-option
                  v-for="item in oils"
                  :key="item.id"
                  :label="item.dosage"
                  :value="item.dosage"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="稀释比"
              prop="ratio"
              :rules="[{ required: true, message: '请选择稀释比' }]"
            >
              <el-select v-model="form.ratio" placeholder="稀释比">
                <el-option
                  v-for="item in dilutions"
                  :key="item.id"
                  :label="item.ratio"
                  :value="item.ratio"
                />
              </el-select>
            </el-form-item>

            <el-form-item label=" " prop="ratio"> </el-form-item>
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
                >添加磨粒链照片</el-button
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
                @click="addTzImage"
                style="margin-right: 10px"
                >添加特征磨粒照片</el-button
              >
            </el-form-item>

            <el-form-item style="margin-top: 15px">
              <el-button type="primary" @click="delImage">删除图片</el-button>
              <el-button type="primary" @click="generate">生成编号</el-button>
            </el-form-item>
            <el-form-item style="margin-top: 15px; margin-bottom: 49px">
              <el-button type="primary" @click="save">保存</el-button>
              <el-button type="danger" @click="handleclose">关闭</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="设置特征磨粒图片倍数"
      center
      :visible.sync="dialogImg"
      @close="dialogClose"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        style="margin-top: 25px"
      >
        <el-form-item label="倍数">
          <el-input
            v-model="times"
            style="width: 80%"
            type="number"
            placeholder="请输入图片倍数"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="sure">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

  <script>
import { getFormData } from "@/api/motor";
import { getReportImages, addReport } from "@/api/report";
import { delImages, addImages } from "@/api/images";

export default {
  mounted() {
    this.loadFormData();
    this.loadReportImg();
  },
  data() {
    return {
      open: true,
      image_name: "",
      image_num: "",
      motors: [],
      form: {},
      oils: [],
      dilutions: [],
      graeases: [],
      fileList: [],
      times: "",
      samples: [],
      dialogImg: false,
      imgfilesback: [],
      greases: [],
      index: -1,
      file: {},
      dialogImg: false,
    };
  },
  methods: {
    delImage() {
      if (this.index != -1) {
        if (this.file.status == "success") {
          this.imgfilesback.splice(this.index, 1);
          this.fileList.splice(this.index, 1);
          delImages({ id: this.image_name }).then((response) => {
            if (response) {
              this.index = -1;
            }
          });
        } else {
          this.imgfilesback.splice(this.index, 1);
          this.fileList.splice(this.index, 1);
          this.index = -1;
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
          duration: 1500,
          offset: 75,
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择图片!",
          duration: 1500,
          offset: 75,
        });
      }
    },
    dialogClose() {
      this.dialogImg = false;
    },
    sure() {
      this.dialogImg = false;
      if (this.times != "") {
        this.$refs.imgupload.click();
      }
    },
    loadReportImg() {
      if (this.$route.query.id) {
        getReportImages({ id: this.$route.query.id }).then((response) => {
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
              var sum = 16 - this.fileList.length;
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
              for (var i = 0; i < 16; i++) {
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
        for (var i = 0; i < 16; i++) {
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
      this.$router.push({ path: "/images/index" });
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
              _this.fileList[i].times = _this.times;
              break;
            }
          }
        };
      }
      this.$refs.imgupload.value = "";
    },
    addImage() {
      this.times = "100";
      this.$refs.imgupload.click();
    },
    addTzImage() {
      this.times = "";
      this.dialogImg = true;
    },
    generate() {
      this.save();
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
                  formData.append("times", this.fileList[i].times);
                  addImages(formData).then((response) => {
                    this.fileList[i].image_num = response.data.image_num;
                    this.fileList[i].status = "success";
                    this.fileList[i].name = response.data.id;
                  });
                }
              }
              this.$message({
                type: "success",
                message: "保存成功!",
                duration: 1500,
                offset: 75,
              });
              for (var i = 0; i < this.fileList.length; i++) {
                this.fileList[i].selected = false;
              }
              this.index = -1;
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
  },
};
</script>
<style lang='scss' scoped>
.container {
  .el-upload-list {
    max-width: 880px;
    height: 636px;
    display: inline-block;
  }
  padding: 10px;
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  ::v-deep {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    .el-upload-list__item {
      transition: none !important;
    }
    .zndfx {
      .el-form-item {
        margin-bottom: 18px;
      }
      .el-form-item {
        width: 47%;
        .el-form-item__content {
          width: 60%;
          .el-select {
            width: 100%;
          }
        }
      }

      .el-date-editor {
        width: 100%;
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
        margin: 0 15px 8px 15px;
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
        text-align: center;
        margin-top: 10px;
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
      height: 250px;
      width: 35%;
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