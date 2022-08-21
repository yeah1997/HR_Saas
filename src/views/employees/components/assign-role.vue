<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancle">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>

    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancle">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from "@/api/setting";
import { getUserDetailById } from "@/api/user";
import { assignRoles } from "@/api/employees";

export default {
  name: "AssignRole",
  data() {
    return {
      list: [], // All of role Objects
      roleIds: [], // A empolyee's All of role id
    };
  },
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      default: null,
    },
  },
  created() {
    this.loadRoleList();
  },
  methods: {
    async loadRoleList() {
      const { rows } = await getRoleList({
        page: 1,
        pagesize: 20,
      });

      this.list = rows;
    },

    async loadUserDetailById(id) {
      const {roleIds} = await getUserDetailById(id)
      this.roleIds = roleIds
    },

    async btnOK() {
        await assignRoles({
            id: this.userId,
            roleIds: this.roleIds
        })

        this.$emit('update:showRoleDialog', false)
        // this.$parent.showRoleDialog = false
    },
    btnCancle(){
        this.roleIds = []
        this.$emit('update:showRoleDialog', false)
    }
  },
};
</script>

<style>
</style>