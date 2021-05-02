<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="samples"
          style="width: 100%"
          header-cell-class-name="head"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80" />
          <el-table-column prop="id" label="编号"> </el-table-column>
          <el-table-column prop="position" label="采样部位"> </el-table-column>
          <el-table-column>
            <template slot="header">
              <el-button type="primary" @click="add">添加</el-button>
            </template>
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)"> 编辑 </el-button>
              <el-button type="text" @click="del(scope.row)"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog
      :title="status"
      center
      :visible.sync="dialogVisible"
      @close="close"
      width="35%"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="采样部位">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <el-button type="primary" @click="onSubmit">提 交</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addSample, getSample, delSample, updSample } from "@/api/sample";
export default {
  mounted() {
    this.loadSample();
  },
  methods: {
    del(row) {
      this.$confirm("此操作将永久删除该信息吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delSample({ id: row.id }).then((response) => {
            if (response.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
                duration: 1500,
                offset: 75,
              });
              this.loadSample();
            }
          });
        })
        .catch(() => {});
    },
    close() {
      this.form = {};
    },
    loadSample() {
      getSample().then((response) => {
        if (response) {
          this.samples = response.data;
        }
      });
    },
    onSubmit() {
      if (this.status == "添加采样信息") {
        addSample(this.form).then((response) => {
          if (response.code == 0) {
            this.$message({
              type: "success",
              message: "添加成功!",
              duration: 1500,
              offset: 75,
            });
            this.dialogVisible = false;
            this.form = {};
            this.loadSample();
          }
        });
      } else {
        updSample(this.form).then((response) => {
          if (response.code == 0) {
            this.$message({
              type: "success",
              message: "更新成功!",
              duration: 1500,
              offset: 75,
            });
            this.dialogVisible = false;
            this.form = {};
            this.loadSample();
          }
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      this.dialogVisible = true;
      this.status = "添加采样信息";
    },
    edit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
      this.status = "编辑采样信息";
    },
  },
  data() {
    return {
      status: "",
      dialogVisible: false,
      samples: [],
      form: {},
    };
  },
};
</script>
<style lang='scss' scoped>
.container {
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  ::v-deep {
    .el-card__body {
      padding: 0px;
    }
    .el-dialog {
      height: 270px;
      border-radius: 8px;
      .el-dialog__body {
        padding: 25px 45px 30px 25px;
      }
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
  }
}
</style>