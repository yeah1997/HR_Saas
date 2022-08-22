<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <template v-slot:before>
          <span>共{{ pageSet.total }}条记录</span>
        </template>
        <template v-slot:after>
          <el-button
            size="small"
            type="success"
            @click="$router.push('/import')"
            >excal导入</el-button
          >
          <el-button size="small" type="danger" @click="exportData"
            >excal导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="showDialog = true"
            :disabled="!checkPermission('POINT-USER-ADD')"
            >新增员工</el-button
          >
        </template>
      </PageTools>

      <el-table v-loading="loading" :data="list">
        <el-table-column type="index" label="序号" sortable="" />
        <el-table-column prop="username" label="姓名" sortable="" />
        <el-table-column width="120px" label="头像" align="center">
          <template v-slot="{ row }">
            <img
              v-imgerror="require('@/assets/common/head.jpg')"
              :src="row.staffPhoto"
              @click="showQrCode(row.staffPhoto)"
              alt=""
              style="
                border-radius: 50%;
                width: 100px;
                height: 100px;
                padding: 10px;
              "
            />
          </template>
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" sortable="" />
        <el-table-column
          prop="formOfEmployment"
          :formatter="formatEmployment"
          label="聘用形式"
          sortable=""
        />
        <el-table-column prop="departmentName" label="部门" sortable="" />
        <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
          <template slot-scope="obj">
            {{ obj.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="enableState" label="账户状态" sortable="">
          <template slot-scope="{ row }">
            <el-switch :value="row.enableState === 1"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/employees/detail/${row.id}`)"
              :disabled="!checkPermission('POINT-USER-UPDATE')"
              >查看</el-button
            >
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="editRole(row.id)"
              >角色</el-button
            >
            <el-button type="text" size="small" @click="deleteEmployee(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next"
          :current-page="pageSet.page"
          :page-size="pageSet.size"
          :total="pageSet.total"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <AddEmployee :show-dialog.sync="showDialog" />
    <el-dialog title="QR-Code" :visible.sync="showCodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <AssignRole
      ref="assginRole"
      :show-role-dialog.sync="showRoleDialog"
      :user-id="userId"
    />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from "@/api/employees";
import { formatDate } from "@/filters";
import QrCode from "qrcode";

import EmployeeEnum from "@/api/constant/employees";
import AssignRole from "./components/assign-role.vue";
import AddEmployee from "./components/add-employee.vue";

export default {
  name: "Employees",
  data() {
    return {
      list: [],
      pageSet: {
        page: 1,
        size: 10,
        total: 0,
      },
      loading: false,
      showDialog: false,
      showCodeDialog: false,
      showRoleDialog: false,
      userId: "1",
    };
  },
  components: {
    AddEmployee,
    AssignRole,
  },
  created() {
    this.loadEmployeeList();
  },
  methods: {
    async loadEmployeeList() {
      this.loading = true;
      const { total, rows } = await getEmployeeList(this.pageSet);

      this.pageSet.total = total;
      this.list = rows;

      this.loading = false;
    },
    changePage(newPage) {
      this.pageSet.page = newPage;
      this.loadEmployeeList();
    },
    // 格式化聘用形式
    formatEmployment(row, col, cellValue, index) {
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellValue);
      return obj ? obj.value : "Not Defined";
    },

    // Delete Employee
    async deleteEmployee(id) {
      try {
        await this.$confirm("Sure to delete Employee?");
        await delEmployee(id);
        this.$message.success("Success to Delete");
        this.getEmployeeList();
      } catch (err) {
        console.log(err);
      }
    },

    // export Exel
    exportData() {
      // chiese-english
      const headers = {
        姓名: "username",
        手机号: "mobile",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };

      import("@/vendor/Export2Excel").then(async (excel) => {
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.pageSet.total,
        });

        const data = this.formatJson(headers, rows);
        const multiHeader = [["姓名", "主要信息", "", "", "", "", "部门"]];
        const merges = ["A1:A2", "B1:F1", "G1:G2"];

        excel.export_json_to_excel({
          header: Object.keys(headers),
          multiHeader,
          merges,
          data,
          filename: "员工资料表",
          bookType: "xlsx",
        });
      });
    },

    // Role
    async editRole(id) {
      this.userId = id;
      await this.$refs.assginRole.loadUserDetailById(id);
      this.showRoleDialog = true;
    },

    // Show QR-Code
    showQrCode(url) {
      if (url) {
        this.showCodeDialog = true;
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url);
        });
      } else {
        this.$message.warning("Need to upload avatar");
      }
    },

    // [{}] => [[]]
    formatJson(headers, rows) {
      // [["x", "x", "x"], ["x", "x", "x"]...]
      return rows.map((item) => {
        // ["x", "x", "x"]
        return Object.keys(headers).map((key) => {
          if (
            headers[key] === "timeOfEntry" ||
            headers[key] === "correctionTime"
          ) {
            return formatDate(item[headers[key]]);
          } else if (headers[key] === "formOfEmployment") {
            let hireObj = EmployeeEnum.hireType.find(
              (obj) => obj.id === item[headers[key]]
            );
            return hireObj ? hireObj.value : "Not defined";
          }
          return item[headers[key]];
        });
      });

      // return rows.map(row=> Object.keys(headers).map(key=> item[headers[key]]))
    },
  },
};
</script>

<style>
</style>