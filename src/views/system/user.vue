<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-table
          :data="users"
          style="width: 100%"
          header-cell-class-name="head"
          tooltip-effect="dark"
        >
          <el-table-column type="selection" width="80" />
          <el-table-column prop="id" label="编号"> </el-table-column>
          <el-table-column prop="account" label="账号"> </el-table-column>
          <el-table-column>
            <template slot="header">
              <el-button type="primary" @click="add">添加</el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.permission == 2"
                @click="edit(scope.row, 3)"
              >
                停用
              </el-button>
              <el-button type="text" v-else @click="edit(scope.row, 2)">
                恢复权限</el-button
              >
              <el-button
                type="text"
                @click="del(scope.row)"
                style="margin-left: 15px"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-dialog
        title="添加账号"
        center
        :visible.sync="dialogVisible"
        @close="close"
        width="35%"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="账号">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 30px">
            <el-button type="primary" @click="onSubmit">提 交</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { getUser, addUser, updUser, delUser } from "@/api/user";
export default {
  mounted() {
    this.loadUser();
  },
  methods: {
    onSubmit() {
      if (this.status == "添加") {
        addUser(this.form).then((response) => {
          if (response.code == 0) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.dialogVisible = false;
            this.form = {};
            this.loadUser();
          }
        });
      }
    },
    loadUser() {
      getUser().then((response) => {
        if (response) {
          this.users = response.data;
        }
      });
    },
    close() {
      this.form = {};
    },
    add() {
      this.dialogVisible = true;
      this.status = "添加";
    },
    edit(row, permission) {
      this.form = JSON.parse(JSON.stringify(row));
      this.form.permission = permission;
      updUser(this.form).then((response) => {
        if (response) {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        }
        this.loadUser();
      });
    },
    del(row) {
      this.$confirm("此操作将永久删除该账号吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form = JSON.parse(JSON.stringify(row));
          delUser(this.form).then((response) => {
            if (response) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            this.loadUser();
          });
        })
        .catch(() => {});
    },
  },
  data() {
    return {
      users: [],
      status: "",
      dialogVisible: false,
      oils: [],
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
      height: 320px;
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