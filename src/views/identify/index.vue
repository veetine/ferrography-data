<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12">
        <el-card
          :body-style="{
            padding: '10px',
            minHeight: '609px',
          }"
          style="margin: 10px"
          class="mycard"
        >
          <div class="block" style="text-align: center; margin-bottom: 15px">
            <el-image
              style="width: 500px; height: 500px"
              fit="scale-down"
              :src="imageUrl"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onImgChange"
            multiple
            :limit="8"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="tabHandleClick">
            <el-tab-pane label="图像信息" name="imginfo">
              <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="模型类型">
                  <el-select
                    v-model="form.fjxh"
                    size="small"
                    placeholder="请选择模型类型"
                  >
                    <el-option label="A300" value="A300" />
                    <el-option label="A310" value="A310" />
                  </el-select>
                </el-form-item>

                <el-form-item label="健康状态诊断">
                  <el-select
                    v-model="form.fjxh"
                    size="small"
                    placeholder="待分析"
                  >
                    <el-option label="A300" value="A300" />
                    <el-option label="A310" value="A310" />
                  </el-select>
                </el-form-item>

                <el-form-item style="margin-top: 15px">
                  <el-button type="primary" size="small"
                    >设为训练样本</el-button
                  >
                  <el-button type="primary" size="small"
                    >在线训练模型</el-button
                  >
                </el-form-item>

                <el-form-item style="margin-top: 15px">
                  <el-button type="primary" size="small"
                    >保存当前记录</el-button
                  >
                  <el-button type="danger" size="small">删除当前记录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="定量分析" name="ferrinfo" class="dlfx">
              <p>总浓度分析</p>
              <el-form
                ref="form"
                :model="form"
                size="small"
                label-width="130px"
                class="zndfx"
              >
                <el-form-item label="图像滤-高斯滤波">
                  <div class="block">
                    <el-slider v-model="form.slider_val"></el-slider>
                  </div>
                </el-form-item>
                <el-form-item label="图像增-伽马变换">
                  <div class="block">
                    <el-slider v-model="form.slider_val2"></el-slider>
                  </div>
                </el-form-item>

                <el-form-item label="总颗粒浓度分析">
                  <span>总浓度</span
                  ><el-input
                    placeholder="0.49%"
                    v-model="form.sumnd"
                    style="width: 80px; margin-right: 10px"
                  >
                  </el-input>
                  <span>光密度</span
                  ><el-input
                    placeholder="0.01%"
                    v-model="form.gmd"
                    style="width: 80px"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="大颗粒浓度分析">
                  <span>>=60μm</span
                  ><el-input
                    placeholder="0.49%"
                    v-model="form.liushium"
                    style="width: 80px; margin-right: 10px"
                    size="small"
                  >
                  </el-input>
                  <span>>=45μm</span
                  ><el-input
                    v-model="form.sishiwuum"
                    placeholder="0.01%"
                    style="width: 80px"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="">
                  <span>>=30μm</span
                  ><el-input
                    placeholder="0.49%"
                    v-model="form.sanshium"
                    style="width: 80px; margin-right: 10px"
                  >
                  </el-input>
                  <span>>=15μm</span
                  ><el-input
                    v-model="form.shiwuum"
                    placeholder="0.01%"
                    style="width: 80px"
                    size="small"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="磨损烈度指数">
                  <el-input
                    placeholder="待分析"
                    v-model="form.msld"
                    style="width: 80px; margin-right: 10px"
                    size="small"
                  >
                  </el-input>
                </el-form-item>
              </el-form>
              <p>三色磨粒浓度分析</p>
              <el-form ref="form" :model="form" label-width="130px">
                <el-form-item label="亮色磨粒">
                  <div class="block">
                    <el-slider v-model="form.lsml" show-input=""></el-slider>
                  </div>
                </el-form-item>
                <el-form-item label="黑色磨粒">
                  <div class="block">
                    <el-slider v-model="form.hsml" show-input=""></el-slider>
                  </div>
                </el-form-item>
                <el-form-item label="红色磨粒">
                  <div class="block">
                    <el-slider v-model="form.hosml" show-input=""></el-slider>
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="特征磨粒分析" name="tzfreeinfo">
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
          </el-tabs>
        </el-card>
        <el-card class="box-card">
          <el-tabs v-model="activeName2" class="dlfx">
            <el-tab-pane label="谱片信息" name="imginfo">
              <p>取样信息</p>
              <el-form
                ref="form"
                :model="form"
                size="small"
                label-width="130px"
                class="zndfx"
              >
                <el-form-item label="记录编码">
                  <el-input v-model="form.jlbm" placeholder="123" size="small">
                  </el-input>
                </el-form-item>
                <el-form-item label="设备名称">
                  <el-input
                    placeholder="设备名称"
                    v-model="form.sbmc"
                    size="small"
                  >
                  </el-input>
                </el-form-item>

                <el-form-item label="取油部位">
                  <el-select
                    v-model="form.qybw"
                    size="small"
                    style="width: 150px"
                    placeholder="请选择"
                  >
                    <el-option label="A300" value="A300" />
                    <el-option label="A310" value="A310" />
                  </el-select>
                  <span style="margin: 0 10px">润滑油型号</span>
                  <el-select
                    v-model="form.rhyxh"
                    size="small"
                    style="width: 100px"
                    placeholder="请选择"
                  >
                    <el-option label="A300" value="A300" />
                    <el-option label="A310" value="A310" />
                  </el-select>
                </el-form-item>
                <el-form-item label="取样日期">
                  <el-date-picker
                    size="small"
                    v-model="picker"
                    style="width: 150px"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                  <span style="margin: 0 10px">取样人</span>
                  <el-select
                    v-model="form.qyr"
                    size="small"
                    style="width: 100px; margin-left: 28px"
                    placeholder="请选择"
                  >
                    <el-option label="A300" value="A300" />
                    <el-option label="A310" value="A310" />
                  </el-select>
                </el-form-item>
              </el-form>
              <p>分析信息</p>
              <el-form
                ref="form"
                :model="form"
                size="small"
                label-width="130px"
                class="zndfx"
              >
                <el-form-item label="分析人">
                  <el-select
                    v-model="form.fxr"
                    size="small"
                    style="width: 150px"
                    placeholder="请选择"
                  >
                    <el-option label="A300" value="A300" />
                    <el-option label="A310" value="A310" />
                  </el-select>
                </el-form-item>

                <el-form-item label="常用建议">
                  <el-select
                    v-model="form.cyjy"
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option label="A300" value="A300" />
                    <el-option label="A310" value="A310" />
                  </el-select>
                </el-form-item>
                <el-form-item label="维护建议">
                  <el-input
                    type="textarea"
                    :rows="2"
                    style="width: 60%"
                    placeholder="请输入内容"
                    v-model="form.textarea"
                  >
                  </el-input>
                </el-form-item>
              </el-form> </el-tab-pane
          ></el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setCurTabNav } from "@/utils/initwebview";
export default {
  name: "Dashboard",
  data() {
    return {
      number: "歼So123ad_123fausd_",
      picker: "",
      form: {
        c1: "",
        slider_val: 26,
        slider_val2: 62,
        lsml: 95,
        hsml: 27,
        hosml: 61,
      },
      imageUrl: "",
      dialogVisible: false,
      activeName: "imginfo",
      activeName2: "imginfo",
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
    };
  },
  mounted() {},
  methods: {
    tabHandleClick(tab, event) {},
    handleAvatarSuccess(file, filelist) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onSubmit() {},
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      for (var i = 0; i < fileList.length; i++) {
        this.imageUrl = fileList[i].url;
        break;
      }
    },
    onImgChange(file, fileList) {
      this.imageUrl = file.url;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  .el-form-item__label {
    font-size: 13px;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    display: block;
  }
  .dlfx {
    p {
      font-size: 14px;
      line-height: 1.5em;
      font-weight: 600;
    }
    .zndfx {
      span {
        margin-right: 10px;
      }
    }
  }

  .box-card {
    .el-input {
      width: 60%;
    }
    .el-select {
      width: 60%;
    }
    .clearfix {
      font-size: 14px;
    }
    margin: 10px;
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }

    .box-card {
      width: 480px;
    }
  }
  ::v-deep {
    .el-table td {
      position: unset;
    }
    .el-table th.head {
      background: #f9f9f9;
      border-bottom: 0;
      color: #999;
      font-size: 13px;
    }
    .el-table th {
      padding: 8px 0;
    }
    .el-table__expanded-cell {
      padding-top: 0;
      padding-bottom: 0;
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
    .el-upload-dragger {
      width: auto;
      height: auto;
      min-width: 360px;
      min-height: 180px;
    }

    .el-tabs__nav-wrap::after {
      background: none;
    }
  }
}
</style>
