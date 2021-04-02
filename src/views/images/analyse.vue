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
              size="small"
              label-width="110px"
              class="zndfx"
            >
              <el-form-item label="飞机型号">
                <el-select
                  v-model="form.plane_type"
                  size="small"
                  disabled
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

              <el-form-item label="飞机编号">
                <el-select
                  v-model="form.plane_num"
                  size="small"
                  disabled
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

              <el-form-item label="发动机编号">
                <el-select
                  disabled
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
                  disabled
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
                  disabled
                  size="small"
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
                  style="width: 191px"
                  v-model="form.motor_work_time"
                  placeholder="发动机工作时间"
                  size="small"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="滑油工作时间">
                <el-input
                  style="width: 191px"
                  disabled
                  placeholder="滑油工作时间"
                  v-model="form.grease_work_time"
                  size="small"
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
                style="width: 400px; height: 370px; margin-bottom: 10px"
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
                      fit="contain"
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
                      {{ scope.row.mltype }}
                    </template>
                  </el-table-column>
                  <el-table-column label="数量">
                    <template slot-scope="scope">
                      {{ scope.row.number }}
                    </template>
                  </el-table-column>

                  <el-table-column label="等级">
                    <template slot-scope="scope">
                      {{ scope.row.level }}
                    </template>
                  </el-table-column>

                  <el-table-column label="浓度">
                    <template slot-scope="scope">
                      {{ scope.row.nongdu }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="磨粒链" name="molilian">
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
                      {{ scope.row.mltype }}
                    </template>
                  </el-table-column>
                  <el-table-column label="数量">
                    <template slot-scope="scope">
                      {{ scope.row.number }}
                    </template>
                  </el-table-column>

                  <el-table-column label="等级">
                    <template slot-scope="scope">
                      {{ scope.row.level }}
                    </template>
                  </el-table-column>

                  <el-table-column label="浓度">
                    <template slot-scope="scope">
                      {{ scope.row.nongdu }}
                    </template>
                  </el-table-column>
                </el-table></el-tab-pane
              >
              <el-tab-pane label="分析结果" name="result">
                <el-form
                  style="margin-top: 10px"
                  ref="form"
                  :model="form"
                  size="small"
                  class="zndfx"
                >
                  <el-form-item label="分析结果">
                    <el-input
                      disabled
                      type="textarea"
                      :rows="6"
                      placeholder="请输入内容"
                      v-model="textarea"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="处置意见">
                    <el-input
                      disabled
                      type="textarea"
                      :rows="6"
                      placeholder="请输入内容"
                      v-model="textarea"
                    >
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
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
      tableData: [
        {
          mltype: "正常磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "疲劳剥落磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "层状磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "球形磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "疲劳剥块磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "黏着磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "切削磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "严重滑动磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "黑色氧化物磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "红色氧化物磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "腐蚀磨损磨粒",
          number: "98",
          level: "10",
          nongdu: "55",
        },
        {
          mltype: "有色金属",
          number: "98",
          level: "10",
          nongdu: "55",
        },
      ],
      fileList: [],
      imageUrl: "",
      dialogVisible: true,
      textarea: "",
      activeName: "tezhengmoli",
    };
  },
  methods: {
    tabHandleClick(tab, event) {},
    detail(row) {
      getReportImages({ id: row.id }).then((response) => {
        if (response) {
          if (response.data.images != null) {
            this.fileList = response.data.images.map((value, key) => {
              return {
                name: value.id,
                url: value.image_path,
              };
            });
          }
          if (this.fileList.length != 0) {
            this.imageUrl = this.fileList[0].url;
          }
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