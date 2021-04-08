<template>
  <div class="analyse-container">
    <el-dialog
      title="分析库"
      center
      :visible.sync="dialogVisible"
      @close="close"
      width="90%"
    >
      <el-row>
        <el-col :span="14">
          <el-card style="margin-right: 10px; margin-bottom: 10px">
            <div slot="header" class="clearfix">
              <span>图像信息</span>
            </div>
            <el-form
              :inline="true"
              ref="form"
              :model="form"
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
                >
                </el-input>
              </el-form-item>
              <el-form-item label="滑油工作时间">
                <el-input
                  style="width: 190px"
                  disabled
                  placeholder="滑油工作时间"
                  v-model="form.grease_work_time"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card" style="margin-right: 10px">
            <div slot="header" class="clearfix">
              <span>图像</span>
            </div>
            <div class="block" style="text-align: center; margin-bottom: 15px">
              <el-image
                style="width: 600px; height: 400px; margin-bottom: 10px"
                fit="scale-down"
                :src="imageUrl"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div data-v-3780a3d6="">
                <ul class="el-upload-list el-upload-list--picture-card">
                  <li
                    v-for="item in fileList"
                    :key="item.name"
                    :label="item.url"
                    :value="item.url"
                    tabindex="0"
                    class="el-upload-list__item is-success"
                    style="float: left"
                  >
                    <el-image
                      fit="cover"
                      style="width: 148px; height: 148px"
                      @click="selectImg(item.url)"
                      :src="item.url"
                    />
                    <a class="el-upload-list__item-name"
                      ><i class="el-icon-document"></i>15 </a
                    ><label class="el-upload-list__item-status-label"
                      ><i
                        class="el-icon-upload-success el-icon-check"
                      ></i></label
                    ><i class="el-icon-close"></i>
                  </li>
                </ul>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="10">
          <el-card class="box-card">
            <el-tabs v-model="activeName" @tab-click="tabHandleClick">
              <el-tab-pane label="特征磨粒" name="tezhengmoli">
                <el-table
                  size="small"
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  header-cell-class-name="head"
                >
                  <el-table-column label="磨粒类型">
                    <template slot-scope="scope">
                      {{ scope.row.moli_type }}
                    </template>
                  </el-table-column>
                  <el-table-column label="数量">
                    <template slot-scope="scope">
                      <el-input
                        v-if="scope.row.edit"
                        v-model="scope.row.number"
                        placeholder="数量"
                        type="number"
                      ></el-input>
                      <span v-else>{{ scope.row.number }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="等级">
                    <template slot-scope="scope">
                      <el-input
                        v-if="scope.row.edit"
                        v-model="scope.row.level"
                        placeholder="等级"
                        type="number"
                      ></el-input>
                      <span v-else>{{ scope.row.level }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="浓度">
                    <template slot-scope="scope">
                      <el-input
                        v-if="scope.row.edit"
                        v-model="scope.row.conc"
                        placeholder="浓度"
                        type="number"
                      ></el-input>
                      <span v-else>{{ scope.row.conc }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        v-if="scope.row.edit"
                        type="text"
                        size="medium"
                        @click="confirmAdd(scope.row)"
                      >
                        <i class="el-icon-check" aria-hidden="true"></i>
                      </el-button>
                      <div v-else>
                        <el-button
                          type="text"
                          size="medium"
                          @click="editData(scope.row)"
                        >
                          <i class="el-icon-edit" aria-hidden="true"></i>
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="分析结果" name="result">
                <el-form
                  style="margin-top: 10px"
                  ref="form"
                  :model="form"
                  class="zndfx"
                >
                  <el-form-item label="分析结果">
                    <el-input
                      type="textarea"
                      :rows="6"
                      placeholder="请输入内容"
                      v-model="image.result"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="处置意见">
                    <el-input
                      type="textarea"
                      v-model="image.idea"
                      :rows="6"
                      placeholder="请输入内容"
                    >
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
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
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="danger" @click="close">关闭</el-button>
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
import { updImages, getImageDetail } from "@/api/images";

export default {
  mounted() {
    this.loadMotor();
    this.loadSample();
    this.loadReport();
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
      formInline: {},
      picker: "",
      form: { picker: "" },
      reports: [],
      motors: [],
      samples: [],
      tableData: [],
      fileList: [],
      imageUrl: "",
      dialogVisible: true,
      selectImageNum: "",
      activeName: "tezhengmoli",
      image: {},
    };
  },
  mounted() {
    this.detail(this.row);
  },
  methods: {
    confirmAdd(row) {
      row.edit = false;
      row.id = this.image.id;
      updImages(row).then((response) => {});
    },
    save() {
      updImages(this.image).then((response) => {});
    },
    tabHandleClick(tab, event) {},
    detail(row) {
      getReportImages({ id: row.id }).then((response) => {
        if (response) {
          if (response.data.images != null) {
            this.fileList = response.data.images.map((value, key) => {
              return {
                name: value.id,
                url: value.image_path,
                image_num: value.image_num,
              };
            });
          }
          if (this.fileList.length != 0) {
            this.imageUrl = this.fileList[0].url;
            this.selectImageNum = this.row.image_num;
            this.image = response.data.images[0];
            for (let s = 0; s < this.image.tz_moli.length; s++) {
              let obj = {
                edit: false,
                moli_type: this.image.tz_moli[s].moli_type,
                number: this.image.tz_moli[s].number,
                level: this.image.tz_moli[s].level,
                conc: this.image.tz_moli[s].conc,
              };
              this.tableData.push(obj);
            }
          }
          this.form = response.data;
        }
      });
    },
    editData(row) {
      row.edit = true;
    },
    find() {
      this.loadReport();
    },
    reset() {
      this.formInline = {};
      this.loadReport();
    },
    close() {
      this.$emit("backdata");
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
      this.imageUrl = this.row.image_path;
      this.form = this.row.form;
      console.log(this.row);
      this.selectImageNum = this.row.image_num;
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
    selectImg(url) {
      this.imageUrl = url;
    },
  },
};
</script>

<style lang="scss" scoped>
.analyse-container {
  ::v-deep {
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
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