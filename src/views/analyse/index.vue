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
              <el-button type="text" @click="detail(scope.row)">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog
      title="分析库"
      center
      :visible.sync="dialogVisible"
      @close="close"
      width="90%"
    >
      <el-row>
        <el-col :span="14">
          <el-card style="margin: 0 10px 10px 10px">
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
          <el-card class="box-card" style="margin: 10px">
            <div slot="header" class="clearfix">
              <span>图像</span>
            </div>
            <div class="block" style="text-align: center; margin-bottom: 15px">
              <el-image
                style="width: 500px; height: 370px; margin-bottom: 10px"
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
                      style="width: 148px; height: 149px"
                      @click="selectImg(item.url, item.image_num)"
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
                </el-table>
              </el-tab-pane>

              <el-tab-pane label="分析结果" name="result">
                <el-form ref="form" :model="form" size="small" class="zndfx">
                  <el-form-item label="分析结果">
                    <el-input
                      type="textarea"
                      :rows="6"
                      placeholder="请输入内容"
                      disabled
                      v-model="image.result"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="处置意见">
                    <el-input
                      type="textarea"
                      :rows="6"
                      disabled
                      placeholder="请输入内容"
                      v-model="image.idea"
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
import { updImages, getImageDetail } from "@/api/images";

export default {
  mounted() {
    this.loadMotor();
    this.loadSample();
    this.loadReport();
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
      dialogVisible: false,
      textarea: "",
      activeName: "tezhengmoli",
      selectImageNum: "",
      image: {},
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
                image_num: value.image_num,
              };
            });
          }
          if (this.fileList.length != 0) {
            this.imageUrl = this.fileList[0].url;
            this.selectImageNum = this.fileList[0].image_num;
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
          this.dialogVisible = true;
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
      this.form = {};
      this.dialogVisible = false;
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
    selectImg(url, image_num) {
      this.imageUrl = url;
      this.selectImageNum = image_num;
      this.tableData = [];
      getImageDetail({ id: this.image.id }).then((res) => {
        var molist = res.data;
        for (let s = 0; s < molist.length; s++) {
          let obj = {
            edit: false,
            moli_type: molist[s].moli_type,
            number: molist[s].number,
            level: molist[s].level,
            conc: molist[s].conc,
          };
          this.tableData.push(obj);
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

    .el-form-item {
      margin-bottom: 20px;
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