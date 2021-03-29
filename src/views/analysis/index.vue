<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="formInline"
      size="small"
      class="demo-form-inline row middle-xs"
      style="width: 100%; min-height: 60px; padding: 15px 15px 0 15px"
    >
      <el-form-item class="item4">
        <el-select v-model="formInline.status" clearable placeholder="飞机型号">
          <span slot="prefix" style="color: #333; margin-left: 5px">
            飞机型号:</span
          >
          <el-option label="A300" value="A300" />
          <el-option label="A310" value="A310" />
        </el-select>
      </el-form-item>

      <el-form-item class="item4">
        <el-select v-model="formInline.status" clearable placeholder="飞机编号">
          <span slot="prefix" style="color: #333; margin-left: 5px">
            飞机编号:</span
          >
          <el-option label="A300" value="A300" />
          <el-option label="A310" value="A310" />
        </el-select>
      </el-form-item>
      <el-form-item class="item5">
        <el-select
          v-model="formInline.status"
          clearable
          placeholder="发动机编号"
        >
          <span slot="prefix" style="color: #333; margin-left: 5px">
            发动机编号:</span
          >
          <el-option label="A300" value="A300" />
          <el-option label="A310" value="A310" />
        </el-select>
      </el-form-item>

      <el-form-item class="item4">
        <el-select v-model="formInline.status" clearable placeholder="取样部位">
          <span slot="prefix" style="color: #333; margin-left: 5px">
            取样部位:</span
          >
          <el-option label="A300" value="A300" />
          <el-option label="A310" value="A310" />
        </el-select>
      </el-form-item>

      <el-form-item class="item1" style="margin-right: 15px">
        <el-button type="primary">查询</el-button>
      </el-form-item>
      <el-form-item class="item1">
        <el-button type="">重置</el-button>
      </el-form-item>
    </el-form>
    <ve-line
      style="margin-top: 20px"
      :data="chartData"
      :extend="extend"
      :settings="chartSettings"
    />
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

export default {
  components: {
    VeLine,
  },
  data() {
    this.chartSettings = {
      labelMap: {
        total_amount: "总磨粒数",
        valid_total_amount: "总磨粒增长率",
        total_com: "严重滑动磨粒数",
        valid_total_com: "切削磨粒数",
        cost: "疲劳磨粒数",
        profit: "污染度等级",
      },
    };
    return {
      chartData: {
        columns: [
          "create_time_day",
          "total_amount",
          "valid_total_amount",
          "total_com",
          "valid_total_com",
          "cost",
          "profit",
        ],
        rows: [
          {
            create_time_day: "05-22",
            total_amount: "123",
            valid_total_amount: "51",
            total_com: "7",
            valid_total_com: "99",
          },
          {
            create_time_day: "05-23",
            total_amount: "58",
            valid_total_amount: "15",
            total_com: "32",
            valid_total_com: "21",
          },
          {
            create_time_day: "05-24",
            total_amount: "96",
            valid_total_amount: "69",
            total_com: "41",
            valid_total_com: "32",
          },
          {
            create_time_day: "05-25",
            total_amount: "45",
            valid_total_amount: "32",
            total_com: "47",
            valid_total_com: "85",
          },
          {
            create_time_day: "05-26",
            total_amount: "85",
            valid_total_amount: "32",
            total_com: "47",
            valid_total_com: "85",
          },
          {
            create_time_day: "05-27",
            total_amount: "124",
            valid_total_amount: "62",
            total_com: "78",
            valid_total_com: "54",
          },
        ],
      },
      extend: {
        series: {
          smooth: false,
        },
      },
      formInline: {},
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
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

    .item4 .el-input__inner {
      padding-left: 70px;
      width: 220px;
    }

    .item5 .el-input__inner {
      padding-left: 85px;
      width: 225px;
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