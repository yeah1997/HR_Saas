<template>
  <el-dialog :title="showTile" :visible="showDialog" @close="btnCancle">
    <el-form
      label-width="120px"
      :model="formData"
      :rules="inputRules"
      ref="deptForm"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input placeholder="1-50" v-model="formData.name"> </el-input>
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input placeholder="1-50" v-model="formData.code"> </el-input>
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="Please choose"
          v-model="formData.manager"
          @focus="loadEmployeeSimple"
        >
          <el-option
            v-for="people in peopleManager"
            :key="people.id"
            :label="people.username"
            :value="people.username"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          placeholder="1-300"
          type="textarea"
          :row="3"
          v-model="formData.introduce"
        >
        </el-input>
      </el-form-item>
    </el-form>

    <el-row type="flex" justify="center" slot="footer">
      <el-col :span="8">
        <el-button size="small" @click="btnCancle">Cancel</el-button>
        <el-button type="primary" size="small" @click="btnOk"
          >Confirm</el-button
        >
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getDepartments,
  addDepartments,
  getDepartDetail,
  updateDepartments,
} from "@/api/departments";
import { getEmployeeSimple } from "@/api/employees";

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    treeNode: {
      // parent Node
      type: Object,
      default: null,
    },
  },
  data() {
    const checkNameRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();

      let isReapt = false;

      if (this.formData.id) {
        isReapt = depts
          .filter(
            (item) =>
              item.id !== this.formData.id && item.pid === this.treeNode.pid
          )
          .some((item) => item.name === value);
      } else {
        isReapt = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value);
      }

      isReapt ? callback(new Error(`${value} is Reat`)) : callback();
    };

    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();
      let isReapt = false;

      if (this.formData.id) {
          isReapt = depts.some((item) =>  item.id !== this.formData.id && item.code === value);
      } else {
        isReapt = depts.some((item) => item.code === value && value);
      }

      isReapt ? callback(new Error(`${value} is Reat`)) : callback();
    };

    return {
      formData: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
      inputRules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "1-50", trigger: "blur" },
          { validator: checkNameRepeat, trigger: "blur" },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "1-50", trigger: "blur" },
          { validator: checkCodeRepeat, trigger: "blur" },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          { min: 1, max: 3000, message: "1-50", trigger: "blur" },
        ],
      },

      peopleManager: [],
    };
  },
  computed: {
    showTile() {
      return this.formData.id ? "编辑部门" : "新增子部门";
    },
  },
  methods: {
    async loadEmployeeSimple() {
      this.peopleManager = await getEmployeeSimple();
    },

    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id);
    },

    btnOk() {
      this.$refs.deptForm.validate(async (isOk) => {
        if (isOk) {
          if (this.formData.id) {
            await updateDepartments(this.formData);
          } else {
            await addDepartments({ ...this.formData, pid: this.treeNode.id });
          }

          this.$emit("addDepts");
          this.$emit("update:showDialog", false);
        }
      });
    },

    btnCancle() {
      (this.formData = {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      }),
        this.$refs.deptForm.resetFields();
      this.$emit("update:showDialog", false);
    },
  },
};
</script>

<style>
</style>