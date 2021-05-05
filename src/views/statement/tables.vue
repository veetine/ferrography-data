<template>
  <div>
    <div style="margin: 0 auto" id="printMe">
      <div style="padding: 20px; padding-bottom: 10px; text-align: center">
        <span
          style="
            line-height: 24px;
            font-size: 18px;
            color: #303133;
            font-weight: 800;
          "
          >铁谱分析报告</span
        >
      </div>
      <div
        style="
          border: 1px;
          text-align: center;
          margin: 0 auto;
          border: 2px solid black;
          margin-bottom: 20px;
          width: 1000px;
        "
      >
        <h4 style="margin: 0; background: #c5c5c5; padding: 10px 0">
          基本数据
        </h4>
        <hr style="border: 1px solid black; margin: 0" />
        <form data-v-62ef9ff0="" style="text-align: left">
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >部门:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.dept }}</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >发动机型号:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.report.motor_type }}</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >发动机编号:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.report.motor_num }}</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >总工作时间:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.report.sum_work_time }}</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >分析日期:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.report.updated_at }}</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >滑油工作时间:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.report.grease_work_time }}</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >制谱用油样量:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.report.dosage }} ml</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >滑油牌号:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.report.brand }}</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >稀释比:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.report.ratio }}</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >采样部位:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  width: 200px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.report.sample_position }}</span
              ><!---->
            </div>
          </div>
          <div
            data-v-62ef9ff0=""
            style="
              margin-bottom: 0px;
              display: inline-block;
              margin-right: 10px;
              vertical-align: top;
            "
          >
            <label
              style="
                width: 110px;
                text-align: right;
                vertical-align: middle;
                float: left;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                float: none;
                display: inline-block;
                font-weight: 700;
              "
              >铁谱片号:</label
            >
            <div
              style="
                line-height: 40px;
                position: relative;
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
              "
            >
              <span
                data-v-62ef9ff0=""
                style="
                  width: 500px;
                  line-height: 32px;
                  font-weight: 400;
                  color: rgb(96, 98, 102);
                  font-size: 16px;
                  display: block;
                  text-align: left;
                "
                >{{ stat.image.image_num }}</span
              ><!---->
            </div>
          </div>
        </form>
        <hr style="border: 1px solid black; margin: 0" />
        <h4 style="margin: 0; background: #c5c5c5; padding: 10px 0">
          分析结果
        </h4>
        <hr style="border: 1px solid black; margin: 0" />
        <div>
          <ul style="margin: 0; padding: 0">
            <li
              style="
                background: #d1d1d1;
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              磨粒链
            </li>

            <li
              style="
                background: #d1d1d1;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              等级
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              正常磨粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.level }}
            </li>
            <li
              style="
                background: #d1d1d1;
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              磨粒类型
            </li>
            <li
              style="
                background: #d1d1d1;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              数量（个）
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              疲劳剥落磨粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.fatigue_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              层状磨粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.layered_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              球粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.sphere_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              粘着擦伤磨粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.adhere_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              切削磨损磨粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.cutt_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              严重滑动磨粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.slide_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              暗金属氧化磨粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.golden_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              铁的红色氧化物
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.red_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              腐蚀磨损磨粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.etch_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              有色金属磨粒
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.color_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              油污
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.oil_amt }}
            </li>
            <li
              style="
                border-right: 1px #000 solid;
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              其他
            </li>
            <li
              style="
                list-style: none;
                min-height: 37px;
                padding: 10px 0;
                width: 498px;
                border-bottom: 1px #000 solid;
                float: left;
                margin: 0;
              "
            >
              {{ stat.image.other_amt }}
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        <div>
          <h4
            style="
              margin: 0;
              background: #c5c5c5;
              padding: 7px 0;
              text-align: left;
            "
          >
            <span style="margin: 0 0 0 10px">磨损状态判读:</span>
            <div style="display: inline-block">
              <span style="margin-left: 30px">极低</span>
              <label style="font-size: 22px" v-if="stat.status == 0">★</label>
              <span style="margin-left: 100px">正常</span>
              <label style="font-size: 22px" v-if="stat.status == 1">★</label>
              <span style="margin-left: 100px">注意</span>
              <label style="font-size: 22px" v-if="stat.status == 2">★</label>
              <span style="margin-left: 100px">超标</span>
              <label style="font-size: 22px" v-if="stat.status >= 3">★</label>
            </div>
          </h4>
        </div>
        <hr style="border: 1px solid black; margin: 0" />
        <div>
          <h4 style="text-align: left; margin: 0; margin-top: 10px">
            <span style="margin: 0 0 0 10px">评价:</span>
          </h4>
          <ul style="margin: 10px 0">
            <li style="float: left; list-style: none; width: 150px">磨粒链</li>
            <li style="float: left; list-style: none; width: 150px">
              {{ stat.level }}
            </li>
            <li style="float: left; list-style: none; width: 150px">级</li>
            <!-- <li v-if="stat.level == 1 || stat.level == 0">极低</li>
            <li v-if="stat.level == 2">正常</li>
            <li v-if="stat.level == 3">注意</li>
            <li v-if="stat.level >= 4">极高</li> -->
            <div style="clear: both"></div>
          </ul>
          <ul style="margin: 10px 0">
            <li style="float: left; list-style: none; width: 150px">
              特征磨粒
            </li>
            <li style="float: left; list-style: none; width: 150px">
              {{ stat.sum }}
            </li>
            <li
              style="float: left; list-style: none; width: 150px"
              v-if="stat.tz_status == 0 || stat.tz_status == undefined"
            >
              无
            </li>
            <li
              v-if="stat.tz_status == 1"
              style="float: left; list-style: none; width: 150px"
            >
              少量
            </li>
            <li
              v-if="stat.tz_status == 2"
              style="float: left; list-style: none; width: 150px"
            >
              中量
            </li>
            <li
              v-if="stat.tz_status >= 3"
              style="float: left; list-style: none; width: 150px"
            >
              大量
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        <hr style="border: 1px solid black; margin: 0" />
        <h4 style="margin: 0; background: #c5c5c5; padding: 10px 0">
          铁谱图片
        </h4>
        <hr style="border: 1px solid black; margin: 0" />
        <ul
          style="
            margin: 0;
            display: inline;
            vertical-align: top;
            padding: 0;
            list-style: none;
          "
        >
          <li
            tabindex="0"
            style="
              margin: 10px 15px;
              float: left;
              width: 300px;
              height: 280px;
              border: 0;
              transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
              font-size: 14px;
              color: #606266;
              line-height: 1.8;
              margin-top: 5px;
              position: relative;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              border-radius: 4px;
            "
            v-for="(item, i) in stat.images"
            :key="i"
          >
            <div
              data-v-62ef9ff0=""
              style="
                width: 250px;
                height: 250px;
                position: relative;
                display: inline-block;
                overflow: hidden;
              "
            >
              <img
                :src="item.image_path"
                style="
                  object-fit: cover;
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
                "
              /><!---->
            </div>

            <div data-v-62ef9ff0="">
              <span data-v-62ef9ff0="" style="margin-right: 10px"
                >倍数：{{ item.lv }}</span
              ><span data-v-62ef9ff0="" style="margin-left: 15px"
                >光源：W/G</span
              >
            </div>
          </li>
          <div style="clear: both"></div>
        </ul>
      </div>
    </div>
    <el-form label-width="" inline style="width: 1000px; margin: 0 auto">
      <el-form-item>
        <el-button type="primary" @click="println">打印报告</el-button>
        <el-button type="danger" @click="close">关闭</el-button>
        <el-button type="primary" v-print="printObj" id="printObj" style="display: none"
          >打印报告</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findStatements, addStatement } from "@/api/statement";
import { getReportImages } from "@/api/report";
import print from "vue-print-nb";

export default {
  mounted() {
    this.loadStatements();
  },
  data() {
    return {
      status: "",
      imageUrl: "",
      stat: { report: {}, images: [], image: {} },
      form: {},
      show: true,
      printObj: {
        id: "printMe",
        popTitle: "good print",
        endCallback: this.endCallback(),
      },
    };
  },
  directives: {
    print,
  },
  methods: {
    endCallback() {
      this.show = true;
    },
    println() {
      this.show = false;
      document.getElementById("printObj").click()
    },
    del(image) {
      this.stat.images = this.stat.images.filter(
        (item) => item.id !== image.id
      );
      addStatement({
        report_id: this.stat.report.id,
        data: JSON.stringify(this.stat),
      }).then((response) => {
        if (response) {
          this.$message({
            type: "success",
            message: "删除成功!",
            duration: 1500,
            offset: 75,
          });
        }
      });
    },
    addImages() {
      getReportImages({ id: this.stat.report.id }).then((response) => {
        if (response) {
          if (response.data.images != null) {
            var array = response.data.images;
            for (let i = 0; i < array.length; i++) {
              var ok = false;
              for (let s = 0; s < this.stat.images.length; s++) {
                if (this.stat.images[s].id == array[i].id) {
                  ok = true;
                }
              }
              if (!ok) {
                this.stat.images.push(array[i]);
              }
            }
            addStatement({
              report_id: this.stat.report.id,
              data: JSON.stringify(this.stat),
            });
          }
        }
      });
    },
    save() {
      this.$message({
        type: "success",
        message: "保存成功!",
        duration: 1500,
        offset: 75,
      });
    },
    loadStatements() {
      findStatements().then((response) => {
        if (response) {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].stat = JSON.parse(response.data[i].data);
            if (this.$route.query.id == response.data[i].stat.report.id) {
              this.stat = response.data[i].stat;
            }
          }
          this.statements = response.data;
        }
      });
    },
    report(row) {
      this.stat = row.stat;
    },
    close() {
      this.$router.push({
        path: "/statement/index",
      });
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