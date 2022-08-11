<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <TreeTools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="loadDepartments"
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
      <AddDept :show-dialog="showDialog" />
    </div>
  </div>
</template>

<script>
import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils";

import AddDept from "@/views/departments/components/add-dept.vue";
import TreeTools from "@/views/departments/components/tree-tools.vue";

export default {
  name: "Departments",
  data() {
    return {
      company: { name: "", manager: "负责人" }, // Company
      departs: [], // departments info
      defaultProps: {
        label: "name",
      },
      showDialog: false, //show dialog
      addedNode: null  // record current node
    };
  },
  components: {
    TreeTools,
    AddDept,
  },
  async created() {
    await this.loadDepartments();
  },

  methods: {
    async loadDepartments() {
      const result = await getDepartments();

      this.company = { name: result.companyName };
      this.departs = tranListToTreeData(result.depts, "");
    },

    async addDepts(treeNode) {
      this.showDialog = true
      this.addedNode = node
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>