<template>
  <div class="diag-container">
    <el-row>
      <el-col :span="24">
        <el-form
          :inline="true"
          :model="formInline"
          size="small"
          class="demo-form-inline row middle-xs"
          style="width: 100%; min-height: 60px; padding: 15px 15px 0 15px"
        >
          <el-form-item class="item4">
            <el-select
              v-model="formInline.status"
              clearable
              placeholder="飞机型号"
            >
              <span slot="prefix" style="color: #333; margin-left: 5px">
                查询字段:</span
              >
              <el-option label="A300" value="A300" />
              <el-option label="A310" value="A310" />
            </el-select>
          </el-form-item>

          <el-form-item class="item4">
            <el-input v-model="formInline.orderId" placeholder="A10">
              <span slot="prefix" style="color: #333; margin-left: 5px">
                关键词:</span
              >
            </el-input>
          </el-form-item>

          <el-form-item class="item1" style="margin-right: 15px">
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-form-item class="item1">
            <el-button type="">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table
          size="small"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          header-cell-class-name="head"
        >
          <el-table-column label="油样编号">
            <template slot-scope="scope">
              {{ scope.row.yybh }}
            </template>
          </el-table-column>
          <el-table-column label="飞机型号">
            <template slot-scope="scope">
              {{ scope.row.fjxh }}
            </template>
          </el-table-column>

          <el-table-column label="飞机编号">
            <template slot-scope="scope">
              {{ scope.row.fjbh }}
            </template>
          </el-table-column>

          <el-table-column label="发动机编号">
            <template slot-scope="scope">
              {{ scope.row.fdjbh }}
            </template>
          </el-table-column>
          <el-table-column label="发动机时间">
            <template slot-scope="scope">
              {{ scope.row.fdjsj }}
            </template>
          </el-table-column>
          <el-table-column label="发动机滑油">
            <template slot-scope="scope">
              {{ scope.row.fdjhy }}
            </template>
          </el-table-column>
          <el-table-column label="采样日期">
            <template slot-scope="scope">
              {{ scope.row.cyrq }}
            </template>
          </el-table-column>
          <el-table-column label="采样部位">
            <template slot-scope="scope">
              {{ scope.row.cybw }}
            </template>
          </el-table-column>
          <el-table-column label="分析日期">
            <template slot-scope="scope">
              {{ scope.row.fxrq }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template>
              <el-button type="text" size="small"> 诊断 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      libpath: "",
      res: "",
      activeIndex: "1",
      img: require("@/assets/img/index.png"),
      formInline: {},
      tableData: [
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
        {
          yybh: "HW08",
          fjxh: "歼-10",
          fjbh: "B-38",
          fdjbh: "55",
          fdjsj: "500",
          fdjhy: "1",
          cyrq: "2020-03-24",
          cybw: "主油滤",
          fxrq: "2020-03-24",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.diag-container {
  ::v-deep {
    .el-table td {
      position: unset;
    }

    .el-form-item {
      margin-bottom: 0px;
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
  }
}
</style>