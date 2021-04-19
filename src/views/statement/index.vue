<template>
  <div class="diag-container">
    <el-table
      ref="multipleTable"
      :data="statements"
      tooltip-effect="dark"
      style="width: 100%"
      header-cell-class-name="head"
    >
      <el-table-column label="报告编号" width="250">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column label="飞机型号">
        <template slot-scope="scope">
          {{ scope.row.stat.report.plane_type }}
        </template>
      </el-table-column>
      <el-table-column label="飞机编号">
        <template slot-scope="scope">
          {{ scope.row.stat.report.plane_num }}
        </template>
      </el-table-column>
      <el-table-column label="发动机型号">
        <template slot-scope="scope">
          {{ scope.row.stat.report.motor_type }}
        </template>
      </el-table-column>
      <el-table-column label="发动机编号">
        <template slot-scope="scope">
          {{ scope.row.stat.report.motor_num }}
        </template>
      </el-table-column>

      <el-table-column label="采样部位">
        <template slot-scope="scope">
          {{ scope.row.stat.report.sample_position }}
        </template>
      </el-table-column>
      <el-table-column label="采样日期">
        <template slot-scope="scope">
          {{ scope.row.stat.report.sample_time }}
        </template>
      </el-table-column>
      <el-table-column label="报告日期">
        <template slot-scope="scope">
          {{ scope.row.updated_at }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="report(scope.row)"> 查看 </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="铁谱分析报告"
      center
      :visible.sync="dialogVisible"
      @close="close"
      width="60%"
    >
      <div
        style="
          border: 1px;
          width: 85%;
          text-align: center;
          margin: 0 auto;
          border: 2px solid black;
          margin-bottom: 20px;
        "
      >
        <h3 style="margin: 0; background: #c5c5c5; padding: 10px 0">
          基本数据
        </h3>
        <hr style="border: 1px solid black; margin: 0" />
        <el-form
          :inline="true"
          ref="form"
          :model="stat"
          class="myfrom"
          label-width="110px"
        >
          <el-form-item label="部门:">
            <span>{{ stat.dept }}</span>
          </el-form-item>
          <el-form-item label="发动机型号:">
            <span>{{ stat.report.motor_type }}</span>
          </el-form-item>

          <el-form-item label="发动机编号:">
            <span>{{ stat.report.motor_num }}</span>
          </el-form-item>

          <el-form-item label="总工作时间:">
            <span>{{ stat.report.sum_work_time }}</span>
          </el-form-item>

          <el-form-item label="分析日期:">
            <span>{{ stat.report.updated_at }}</span>
          </el-form-item>

          <el-form-item label="滑油工作时间:">
            <span>{{ stat.report.grease_work_time }}</span>
          </el-form-item>
          <el-form-item label="制谱用油样量:">
            <span>{{ stat.report.dosage }}</span>
          </el-form-item>
          <el-form-item label="滑油牌号:">
            <span>{{ stat.report.brand }}</span>
          </el-form-item>

          <el-form-item label="稀释比:">
            <span>{{ stat.report.ratio }}</span>
          </el-form-item>
          <el-form-item label="采样部位:">
            <span>{{ stat.report.sample_position }}</span>
          </el-form-item>
          <el-form-item label="铁谱片号:">
            <span style="width: 500px">{{ stat.image.image_num }}</span>
          </el-form-item>
        </el-form>
        <hr style="border: 1px solid black; margin: 0" />
        <h3 style="margin: 0; background: #c5c5c5; padding: 10px 0">
          分析结果
        </h3>
        <hr style="border: 1px solid black; margin: 0" />
        <div>
          <ul class="statul">
            <li style="background: #d1d1d1; border-right: 1px #000 solid">
              磨粒链
            </li>
            <li style="background: #d1d1d1">等级</li>
            <li style="border-right: 1px #000 solid">正常磨粒</li>
            <li>{{ stat.image.level }}</li>
            <li style="background: #d1d1d1; border-right: 1px #000 solid">
              磨粒类型
            </li>
            <li style="background: #d1d1d1">数量（个）</li>
            <li style="border-right: 1px #000 solid">疲劳剥落磨粒</li>
            <li>{{ stat.image.fatigue_amt }}</li>
            <li style="border-right: 1px #000 solid">层状磨粒</li>
            <li>{{ stat.image.layered_amt }}</li>
            <li style="border-right: 1px #000 solid">球粒</li>
            <li>{{ stat.image.sphere_amt }}</li>
            <li style="border-right: 1px #000 solid">粘着擦伤磨粒</li>
            <li>{{ stat.image.adhere_amt }}</li>
            <li style="border-right: 1px #000 solid">切削磨损磨粒</li>
            <li>{{ stat.image.cutt_amt }}</li>
            <li style="border-right: 1px #000 solid">严重滑动磨粒</li>
            <li>{{ stat.image.slide_amt }}</li>
            <li style="border-right: 1px #000 solid">暗金属氧化磨粒</li>
            <li>{{ stat.image.golden_amt }}</li>
            <li style="border-right: 1px #000 solid">铁的红色氧化物</li>
            <li>{{ stat.image.red_amt }}</li>
            <li style="border-right: 1px #000 solid">腐蚀磨损磨粒</li>
            <li>{{ stat.image.etch_amt }}</li>
            <li style="border-right: 1px #000 solid">有色金属磨粒</li>
            <li>{{ stat.image.color_amt }}</li>
            <li style="border-right: 1px #000 solid">油污</li>
            <li>{{ stat.image.oil_amt }}</li>
            <li style="border-right: 1px #000 solid">其他</li>
            <li>{{ stat.image.other_amt }}</li>
            <div style="clear: both"></div>
          </ul>
        </div>
        <div>
          <h3 class="mosun">
            <span style="margin: 0 0 0 10px">磨损状态判读:</span>
            <div v-if="stat.report.times==100" style="display:inline-block">
            <span style="margin-left: 30px">极低</span>
            <label v-if="stat.image.level == 1 || stat.image.level == 0"
              >★</label
            >
            <span>正常</span>
            <label v-if="stat.image.level == 2">★</label>
            <span>注意</span> <label v-if="stat.image.level == 3">★</label>
            <span>极高</span> <label v-if="stat.image.level == 4">★</label>
            </div>

            <div v-else style="display:inline-block">
               <span style="margin-left: 30px">极低</span>
                <label v-if="stat.image.sum == 1 || stat.image.sum == 0"
              >★</label
            >
            <span>正常</span>
            <label v-if="stat.image.sum == 2">★</label>
            <span>注意</span> <label v-if="stat.image.sum == 3">★</label>
            <span>极高</span> <label v-if="stat.image.sum == 4">★</label>
            </div>
            
          </h3>
        </div>
        <hr style="border: 1px solid black; margin: 0" />
        <div>
          <h3 style="text-align: left; margin: 0; margin-top: 10px">
            <span style="margin: 0 0 0 10px">评价:</span>
          </h3>
          <ul class="pingjia">
            <li>磨粒链</li>
            <li>{{ stat.image.level }}</li>
            <li>级</li>
            <li v-if="stat.image.level == 1 || stat.image.level == 0">极低</li>
            <li v-if="stat.image.level == 2">正常</li>
            <li v-if="stat.image.level == 3">注意</li>
            <li v-if="stat.image.level == 4">极高</li>
            <div style="clear: both"></div>
          </ul>
          <ul class="pingjia">
            <li>特征磨粒</li>
            <li>{{ stat.image.sum }}</li>
            <li>个</li>
            <li
              v-if="
                stat.image.sum == 1 ||
                stat.image.sum == 0 ||
                stat.image.sum == undefined
              "
            >
              极低
            </li>
            <li v-if="stat.image.sum == 2">正常</li>
            <li v-if="stat.image.sum == 3">注意</li>
            <li v-if="stat.image.sum == 4">极高</li>
            <div style="clear: both"></div>
          </ul>
        </div>
        <hr style="border: 1px solid black; margin: 0" />
        <h3 style="margin: 0; background: #c5c5c5; padding: 10px 0">
          铁谱图片
        </h3>
        <hr style="border: 1px solid black; margin: 0" />
        <ul class="el-upload-list el-upload-list--picture-card imgul">
          <li
            tabindex="0"
            style="margin: 10px 15px; float: left"
            class="el-upload-list__item"
            :class="[
              item.status == 'success' ? 'is-success' : '',
              item.selected ? 'select' : '',
            ]"
            v-for="(item, i) in stat.images"
            :key="i"
          >
            <el-image
              style="width: 250px; height: 250px"
              fit="cover"
              :src="item.image_path"
            />
            <div>
              <span style="margin-right: 10px"
                >倍数：{{ stat.report.times }}</span
              >
              <span>光源：W/G</span>
            </div>
          </li>
          <div
            style="
              width: 300px;
              height: 250px;
              float: left;
              display: flex;
              margin: 10px;
            "
          >
          </div>
          <div style="clear: both"></div>
        </ul>
      </div>
      <el-form label-width="" inline style="width: 85%; margin: 0 auto">
        <el-form-item>
          <el-button type="primary">打印报告</el-button>
          <el-button type="danger" @click="close">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { findStatements, addStatement } from "@/api/statement";
import { getSample } from "@/api/sample";
import { updImages } from "@/api/images";

export default {
  mounted() {
    this.loadStatements();
  },
  data() {
    return {
      statements: [],
      dialogVisible: false,
      status: "",
      imageUrl: "",
      stat: { report: {}, images: [], image: {} },
      form: {},
    };
  },
  methods: {
    handleSuccessImg(value) {
      this.stat.images.push(value.data);
      addStatement({
        report_id: this.stat.report.id,
        data: JSON.stringify(this.stat),
      }).then((response) => {
        if (response) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        }
      });
    },
    del(image) {
      this.stat.images = this.stat.images.filter(
        (item) => item.id !== image.id
      );
      image.tag = 0;
      updImages(image).then((response) => {
        if (response) {
          addStatement({
            report_id: this.stat.report.id,
            data: JSON.stringify(this.stat),
          }).then((response) => {
            if (response) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        }
      });
    },
    save() {
      this.$message({
        type: "success",
        message: "保存成功!",
      });
    },
    loadStatements() {
      findStatements().then((response) => {
        if (response) {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].stat = JSON.parse(response.data[i].data);
            if (this.$route.query.id == response.data[i].stat.report.id) {
              this.stat = response.data[i].stat;
              this.dialogVisible = true;
            }
          }
          this.statements = response.data;
        }
      });
    },
    report(row) {
      this.dialogVisible = true;
      this.stat = row.stat;
    },
    close() {
      this.stat = { report: {}, images: [], image: {} };
      this.dialogVisible = false;
    },
    change() {
      this.$router.push({
        path: "/analyse/index",
        query: { id: this.stat.report.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.diag-container {
  ::v-deep {
    .upload-demo {
      float: left;
      width: 250px;
      height: 250px;
      margin-top: 10px;
      margin: 0 auto;
      .el-upload-dragger {
        width: 250px;
        height: 250px;
      }
      .el-icon-upload {
        margin-top: 75px;
      }
    }
    .el-upload-list--picture-card {
      .el-upload-list__item:focus {
        outline: none;
      }
    }

    .el-upload-list__item {
      width: 300px;
      height: 280px;
      border: 0;
    }
    .myfrom {
      text-align: left;
      .el-form-item {
        margin-bottom: 0px;
      }
      label {
        line-height: 32px;
        font-weight: 400;
        color: #606266;
      }
      span {
        line-height: 32px;
        font-weight: 400;
        color: #606266;
        font-size: 16px;
        width: 200px;
        display: block;
        text-align: left;
      }
    }
    .mosun {
      margin: 0;
      background: #c5c5c5;
      padding: 10px 0;
      text-align: left;
      span {
        margin-left: 100px;
      }
    }
    .pingjia {
      margin: 10px 0;
      li {
        float: left;
        list-style: none;
        width: 150px;
      }
    }
    .statul {
      margin: 0;
      padding: 0;
      li {
        padding: 10px 0;
        width: 50%;
        border-bottom: 1px #000 solid;
        float: left;
        list-style: none;
      }
    }
    .el-dialog__bod {
      padding: 0;
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