<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                type="primary"
                size="small"
                @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>

            <el-table border="" :data="list">
              <el-table-column
                type="index"
                align="center"
                prop="id"
                label="序号"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="240"
              ></el-table-column>
              <el-table-column
                prop="description"
                label="描述"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button size="samll" type="success">sss</el-button>
                  <el-button
                    size="samll"
                    type="primary"
                    @click="editRole(row.id)"
                    >Edit</el-button
                  >
                  <el-button
                    size="samll"
                    type="danger"
                    @click="deleteRole(row.id)"
                    >Delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <!-- Page compo -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                :total="pageSet.total"
                :page-size="pageSet.pagesize"
                :current-page="pageSet.page"
                layout="prev, pager, next"
                @current-change="changePage"
              ></el-pagination>
            </el-row>
            <!-- /Page compo -->
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="formData.name"
                  style="width: 400px"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  style="width: 400px"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="formData.companyPhone"
                  style="width: 400px"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  style="width: 400px"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :row="3"
                  style="width: 400px"
                  v-model="formData.remarks"
                  disabled
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancle">
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small" @click="btnCancle">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  deleteRole,
  getRoleDetail,
  updateRole,
  addRole,
} from "@/api/setting";
import { mapGetters } from "vuex";

export default {
  name: "Setting",
  data() {
    return {
      list: [],
      pageSet: {
        page: 1,
        pagesize: 10,
        total: 0,
      },
      formData: {},
      showDialog: false,
      roleForm: {
        name: "",
        description: "",
      },
      rules: {
        name: [{ required: true, message: "No Space", trigger: "blur" }],
      },
    };
  },

  computed: {
    ...mapGetters(["companyId"]),
  },

  created() {
    this.loadRoleList();
    this.loadCompanyInfo();
  },

  methods: {
    async loadRoleList() {
      const { total, rows } = await getRoleList(this.pageSet);
      this.pageSet.total = total;
      this.list = rows;
    },
    async loadCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId);
    },

    async deleteRole(id) {
      try {
        await this.$confirm("Sure to Delete");
        await deleteRole(id);
        this.loadRoleList();
        this.$message.success("Success to delete");
      } catch (err) {
        console.log(err);
      }
    },

    async editRole(id) {
      this.roleForm = await getRoleDetail(id);
      this.showDialog = true;
    },

    changePage(newPage) {
      this.pageSet.page = newPage;
      this.loadRoleList();
    },
    btnCancle() {
      this.roleForm = {
        name: "",
        description: "",
      };
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async btnOk() {
      try {
        await this.$refs.roleForm.validate();

        if (this.roleForm.id) {
          await updateRole(this.roleForm);
        } else {
          await addRole(this.roleForm);
        }

        this.loadRoleList();
        this.$message.success("success to update");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>