<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="12">
        <el-card
          :body-style="{ padding: '10px', minHeight: '609px',alignItems:'center',display:'flex',display:'-webkit-flex',alignItem:'center',justifyContent: 'center' }"
          style="margin:10px;"
          class="mycard"
        >
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :auto-upload="false"
            drag
            multiple
            :on-change="handleAvatarSuccess"
          >
            <el-image v-if="imageUrl" :src="imageUrl" class="avatar" fit="scale-down"></el-image>
            <i v-else class="el-icon-upload"></i>
            <div v-if="!imageUrl" class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>磨屑图像来源信息</span>
          </div>
          <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="飞机型号">
              <el-select
                v-model="form.fjxh"
                size="small"
                placeholder="请选择飞机型号"
              >
                <el-option label="A300" value="A300" />
                <el-option label="A310" value="A310" />
              </el-select>
            </el-form-item>

            <el-form-item label="飞机编号">
              <el-select
                v-model="form.fjbh"
                size="small"
                placeholder="请选择飞机编号"
              >
                <el-option label="S30001" value="S30001" />
              </el-select>
            </el-form-item>

            <el-form-item label="发动机编号">
              <el-select
                v-model="form.fdjbh"
                size="small"
                placeholder="请选择发动机编号"
              >
                <el-option label="123456" value="shanghai" />
              </el-select>
            </el-form-item>

            <el-form-item label="采样部位">
              <el-select
                v-model="form.cybw"
                size="small"
                placeholder="请选择采样部位"
              >
                <el-option label="主油滤" value="shanghai" />
              </el-select>
            </el-form-item>

            <el-form-item label="采样日期">
              <el-date-picker
                size="small"
                v-model="picker"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="油虑检查间隔">
              <el-input
                v-model="form.name"
                placeholder="请填写油虑检查间隔"
                size="small"
              />
            </el-form-item>

            <el-form-item label="发动机工作时间">
              <el-input placeholder="500" :disabled="true" size="small" />
            </el-form-item>
            <el-form-item label="分析人员">
              <el-input placeholder="超级用户" :disabled="true" size="small" />
            </el-form-item>
            <el-form-item label="分析日期">
              <el-date-picker
                size="small"
                v-model="picker"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="产生磨屑图像编号">
              <el-input
                placeholder="123asdasdasdsasd"
                v-model="number"
                :disabled="true"
                size="small"
              >
              </el-input>
            </el-form-item>

            <el-form-item style="margin-top: 15px">
              <el-button type="primary" @click="onSubmit" size="small"
                >图像注册</el-button
              >
            </el-form-item>
          </el-form>
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
      },
      imageUrl: "",
    };
  },
  mounted() {},
  methods: {
    handleAvatarSuccess(file, filelist) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    onSubmit() {},
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
    .mycard {
      .el-card__body {
        .el-upload-list__item-actions {
          .el-upload-list__item-delete {
          }
        }
      }
    }
  }
}
</style>
