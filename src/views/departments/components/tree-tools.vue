<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>

    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          
          <!-- DropDown -->
          <el-dropdown @command="operateDepts">
            <span
              >操作
              <i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- /DropDown -->

        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'

export default {
    props: {
        treeNode: {
            type: Object,
            required: true
        },
        // is Root of Node
        isRoot: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // Function for Button
        operateDepts(command) {
            if(command === 'add') {
              this.$emit('addDepts', this.treeNode)
            }else if(command === 'edit') {

            }else {
                this.$confirm('Sure to Delte').then(()=> {
                    return delDepartments(treeNode.id)
                }).then(()=> {
                    this.$emit('delDepts')
                    this.$message.success("Delete successful")
                })
                
            }
        }
    },
};
</script>

<style>
</style>