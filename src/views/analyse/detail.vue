<template>
  <div class="analyse-container">
    <el-row>
      <el-col :span="17">
        <el-form
          style="padding-left: 30px"
          :inline="true"
          ref="form"
          size="small"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="铁谱照片编号">
            <el-input style="width: 490px" disabled v-model="selectImageNum" />
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
          <el-form-item label="分析日期">
            <el-date-picker
              style="width: 190px"
              disabled
              v-model="form.created_at"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="分析日期"
            >
            </el-date-picker>
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

          <el-form-item label="飞机编号">
            <el-input
              style="width: 190px"
              disabled
              placeholder="飞机编号"
              v-model="form.plane_num"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="采样部位">
            <el-select
              disabled
              style="width: 190px"
              v-model="form.sample_position"
              placeholder="采样部位"
            >
              <el-option
                v-for="item in samples"
                :key="item.id"
                :label="item.position"
                :value="item.position"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="滑油牌号">
            <el-select
              disabled
              v-model="form.brand"
              style="width: 190px"
              placeholder="滑油牌号"
            >
              <el-option
                v-for="item in graeases"
                :key="item.id"
                :label="item.brand"
                :value="item.brand"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="发动机编号">
            <el-select
              disabled
              v-model="form.motor_num"
              style="width: 190px"
              placeholder="发动机编号"
            >
              <el-option
                v-for="item in motors"
                :key="item.id"
                :label="item.motor_num"
                :value="item.motor_num"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="制谱用油样量">
            <el-select
              disabled
              v-model="form.dosage"
              style="width: 190px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in oils"
                :key="item.id"
                :label="item.dosage"
                :value="item.dosage"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="稀释比">
            <el-select
              disabled
              v-model="form.ratio"
              style="width: 190px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in dilutions"
                :key="item.id"
                :label="item.ratio"
                :value="item.ratio"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="总工作时间">
            <el-input
              disabled
              style="width: 190px"
              v-model="form.sum_work_time"
              placeholder="123"
            >
            </el-input>
          </el-form-item>
        </el-form>
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
          <div data-v-3780a3d6="" style="padding-left: 20px">
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
                  @click="selectImg(item.url, item.image_num)"
                  :src="item.url"
                />
                <a class="el-upload-list__item-name"
                  ><i class="el-icon-document"></i>15 </a
                ><label class="el-upload-list__item-status-label"
                  ><i class="el-icon-upload-success el-icon-check"></i></label
                ><i class="el-icon-close"></i>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <p style="margin: 5px 0">磨粒链分析</p>
        <div
          data-v-0c55db87=""
          class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition el-table--small"
          style="width: 100%"
        >
          <div class="hidden-columns">
            <div data-v-0c55db87=""></div>
            <div data-v-0c55db87=""></div>
          </div>
          <div class="el-table__header-wrapper">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              class="el-table__header"
              style="width: 386px"
            >
              <colgroup>
                <col name="el-table_2_column_3" width="193" />
                <col name="el-table_2_column_4" width="193" />
                <col name="gutter" width="0" />
              </colgroup>
              <thead class="has-gutter">
                <tr class="">
                  <th
                    colspan="1"
                    rowspan="1"
                    class="el-table_2_column_3 is-leaf head"
                  >
                    <div class="cell">磨粒链</div>
                  </th>
                  <th
                    colspan="1"
                    rowspan="1"
                    class="el-table_2_column_4 is-leaf head"
                  >
                    <div class="cell">等级</div>
                  </th>
                  <th class="gutter" style="width: 0px; display: none"></th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="el-table__body-wrapper is-scrolling-none">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              class="el-table__body"
              style="width: 386px"
            >
              <colgroup>
                <col name="el-table_2_column_3" width="193" />
                <col name="el-table_2_column_4" width="193" />
              </colgroup>
              <tbody>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">正常磨粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <!---->
              </tbody>
            </table>
            <!----><!---->
          </div>
          <!----><!----><!----><!---->
          <div
            class="el-table__column-resize-proxy"
            style="display: none"
          ></div>
        </div>
        <p style="margin: 5px 0">特征磨粒分析</p>

        <div
          data-v-0c55db87=""
          class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition el-table--small"
          style="width: 100%"
        >
          <div class="hidden-columns">
            <div data-v-0c55db87=""></div>
            <div data-v-0c55db87=""></div>
          </div>
          <div class="el-table__header-wrapper">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              class="el-table__header"
              style="width: 386px"
            >
              <colgroup>
                <col name="el-table_2_column_3" width="193" />
                <col name="el-table_2_column_4" width="193" />
                <col name="gutter" width="0" />
              </colgroup>
              <thead class="has-gutter">
                <tr class="">
                  <th
                    colspan="1"
                    rowspan="1"
                    class="el-table_2_column_3 is-leaf head"
                  >
                    <div class="cell">磨粒类型</div>
                  </th>
                  <th
                    colspan="1"
                    rowspan="1"
                    class="el-table_2_column_4 is-leaf head"
                  >
                    <div class="cell">数量（个）</div>
                  </th>
                  <th class="gutter" style="width: 0px; display: none"></th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="el-table__body-wrapper is-scrolling-none">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              class="el-table__body"
              style="width: 386px"
            >
              <colgroup>
                <col name="el-table_2_column_3" width="193" />
                <col name="el-table_2_column_4" width="193" />
              </colgroup>
              <tbody>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">疲劳剥落磨粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">层状磨粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">球粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">粘着擦伤磨粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">切削磨损磨粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">严重滑动磨粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">暗金属氧化磨粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">铁的红色氧化物</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">腐蚀磨损磨粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>

                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">有色金属磨粒</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>

                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">油污</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_2_column_3">
                    <div class="cell">其他</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_2_column_4">
                    <div class="cell">
                      <span data-v-0c55db87="">123</span>
                    </div>
                  </td>
                </tr>

                <!---->
              </tbody>
            </table>
            <!----><!---->
          </div>
          <!----><!----><!----><!---->
          <div
            class="el-table__column-resize-proxy"
            style="display: none"
          ></div>
        </div>
        <div style="margin-top: 10px">
          <el-button type="danger" @click="close">关闭</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getFormData } from "@/api/motor";
import { getReport, getReportImages } from "@/api/report";

export default {
  data() {
    return {
      picker: "",
      form: { picker: "" },
      tableData: [{ moli: "正常磨粒", number: "123" }],
      fileList: [],
      imageUrl: "",
      selectImageNum: "",
      image: {},
      dilutions: [],
      oils: [],
      graeases: [],
      reports: [],
      motors: [],
      samples: [],
    };
  },
  mounted() {
    this.loadFormData();
    this.loadReportImg();
  },
  methods: {
    loadFormData() {
      getFormData().then((response) => {
        if (response) {
          this.motors = response.data.motors;
          this.samples = response.data.samples;
          this.graeases = response.data.graeases;
          this.oils = response.data.oils;
          this.dilutions = response.data.dilutions;
        }
      });
    },
    confirmAdd(row) {
      row.edit = false;
      row.id = this.image.id;
      updImages(row).then((response) => {});
    },
    save() {
      updImages(this.image).then((response) => {});
    },
    tabHandleClick(tab, event) {},
    detail(row) {},
    editData(row) {
      row.edit = true;
    },
    close() {
      this.$router.push({ path: "/analyse/index" });
    },
    loadMotor() {
      getMotor().then((response) => {
        if (response) {
          this.motors = response.data;
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
    },
    loadReportImg() {
      console.log(this.$route.query.id);
      getReportImages({ id: this.$route.query.id }).then((response) => {
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
            this.selectImageNum = this.fileList[0].image_num;
          }
          this.form = response.data;
        }
      });
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
    .right-card {
      .el-card__body {
        padding: 0px;
      }
    }
  }
}
</style>