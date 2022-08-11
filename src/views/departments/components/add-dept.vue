<template>
  <el-dialog title="新增部门" :visible="showDialog">
    <el-form label-width="120px" :model="formData" :rules="inputRules">
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
        ></el-select>
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
        <el-button size="small">Cancel</el-button>
        <el-button type="primary" size="small">Confirm</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
      inputRules: [],
    };
  },
};
</script>

<style>
</style>