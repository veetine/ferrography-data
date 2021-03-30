<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-card style="margin: 10px" class="mycard">
          <div slot="header" class="clearfix">
            <span>滑油信息库</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="add"
              >新增</el-button
            >
          </div>

          <el-table
            :data="greases"
            size="small"
            style="width: 100%"
            header-cell-class-name="head"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="65" />
            <el-table-column prop="id" label="编号" width="120">
            </el-table-column>
            <el-table-column prop="brand" label="滑油品牌"> </el-table-column>
            <el-table-column prop="brand_type" label="型号"> </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="edit(scope.row)">
                  编辑
                </el-button>
                <el-button type="text" size="small" @click="del(scope.row)">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card></el-col
      >
    </el-row>

    <el-dialog
      :title="status"
      center
      :visible.sync="dialogVisible"
      @close="close"
      width="35%"
    >
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-form-item label="滑油品牌">
          <el-input v-model="form.brand"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="form.brand_type"></el-input>
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
import { addGrease, getGrease, delGrease, updGrease } from "@/api/grease";
export default {
  mounted() {
    this.loadGrease();
  },
  methods: {
    del(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该信息吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delGrease({ id: row.id }).then((response) => {
            if (response.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.loadGrease();
            }
          });
        })
        .catch(() => {});
    },
    close() {
      this.form = {};
    },
    loadGrease() {
      getGrease().then((response) => {
        if (response) {
          this.greases = response.data;
        }
      });
    },
    onSubmit() {
      if (this.status == "添加滑油信息") {
        addGrease(this.form).then((response) => {
          if (response.code == 0) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.dialogVisible = false;
            this.form = {};
            this.loadGrease();
          }
        });
      } else {
        updGrease(this.form).then((response) => {
          if (response.code == 0) {
            this.$message({
              type: "success",
              message: "更新成功!",
            });
            this.dialogVisible = false;
            this.form = {};
            this.loadGrease();
          }
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      this.dialogVisible = true;
      this.status = "添加滑油信息";
    },
    edit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
      this.status = "编辑滑油信息";
    },
  },
  data() {
    return {
      status: "",
      dialogVisible: false,
      greases: [],
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
      border-radius: 8px;
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