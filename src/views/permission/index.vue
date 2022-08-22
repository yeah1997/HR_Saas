<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1, '0')"
            >添加权限</el-button
          >
        </template>
      </PageTools>

      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作" prop="">
          <template v-slot="{ row }">
            <el-button
              type="text"
              v-if="row.type === 1"
              @click="addPermission(2, row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="editPermission(row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="deletePermission(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :visible="showDialog" :title="showText" @close="btnCancle">
      <el-form
        ref="permForm"
        label-width="120px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input
            v-model="formData.description"
            style="width: 90%"
          ></el-input>
        </el-form-item>

        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
            style="width: 90%"
          ></el-switch>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOk">确定</el-button>
          <el-button size="small" @click="btnCancle">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  updatePermission,
  addPermission,
  getPermissionDetail,
  delPermission,
  getPermissionList,
} from "@/api/permission";
import { tranListToTreeData } from "@/utils";

export default {
  name: "PeimissionIndex",
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      },
      rules: {
        name: [
          { required: true, message: "权限名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "权限标识不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    showText() {
      return this.formData.id? "编辑权限" : "新增权限" 
    }
  },
  created() {
    this.loadPermissionList();
  },

  methods: {
    async loadPermissionList() {
      this.list = tranListToTreeData(await getPermissionList(), "0");
    },

    deletePermission(id) {
      this.$confirm("Sure to delete")
        .then(() => {
          return delPermission(id);
        })
        .then(() => {
          this.$message.success("Success to delete");
          this.loadPermissionList();
        });
    },

    addPermission(type, id) {
      this.formData.type = type;
      this.formData.pid = id;
      this.showDialog = true;
    },
    async editPermission(id) {
      this.formData = await getPermissionDetail(id);
      this.showDialog = true;
    },

    btnOk() {
      this.$refs.permForm
        .validate()
        .then(() => {
          if (this.formData.id) {
            return updatePermission(this.formData);
          }
          return addPermission(this.formData);
        })
        .then(() => {
          this.$message.success("Success to add!");
          this.loadPermissionList();
          this.showDialog = false;
        });
    },
    btnCancle() {
      this.formData = {
        name: "", // 名称
        code: "", // 标识
        description: "", // 描述
        type: "", // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: "", // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: "0", // 开启
      }

      this.$refs.permForm.resetFields()

      this.showDialog = false
    },
  },
};
</script>

<style>
</style>