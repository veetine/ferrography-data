<template>
  <div class="diag-container">
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
            style="width: 600px; height: 500px"
            fit="scale-down"
            :src="imageUrl"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </el-col>
      <el-col :span="7">
        <el-table
          @row-click="handdleRow"
          ref="multipleTable"
          highlight-current-row
          :data="fileList"
          tooltip-effect="dark"
          style="width: 100%; min-height: 400px"
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getReportImages } from "@/api/report";
import { delImages } from "@/api/images";
import { getFormData } from "@/api/motor";

export default {
  mounted() {
    this.loadFormData();
    this.loadReportImg();
  },
  data() {
    return {
      form: {},
      reports: [],
      motors: [],
      samples: [],
      fileList: [],
      imageUrl: "",
      selectImageNum: "",
      id: "",
      image: {},
      dilutions: [],
      oils: [],
      graeases: [],
    };
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
    del() {
      delImages({ id: this.id }).then((response) => {
        if (response) {
          this.loadReportImg();
        }
      });
    },
    analyse() {
      console.log(this.$route.query.id);
      this.$router.push({
        path: "/analyse/detail",
        query: { id: this.$route.query.id },
      });
    },
    handdleRow(row, event, column) {
      this.$refs.multipleTable.setCurrentRow(row);
      this.id = row.id;
      this.imageUrl = row.url;
      this.selectImageNum = row.image_num;
    },
    handleclose() {
      this.$router.push({ path: "/images/index" });
    },
    tabHandleClick(tab, event) {},
    loadReportImg() {
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
            this.$refs.multipleTable.setCurrentRow(this.fileList[0]);
            this.id = this.fileList[0].id;
          }
          this.form = response.data;
        }
      });
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