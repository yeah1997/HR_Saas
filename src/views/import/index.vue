<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from "@/api/employees";

export default {
  methods: {
    async success({ header, results }) {
        // 如果是导入员工
        const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }

        // let userArr = []

        // results.forEach(item=> {
        //   let userInfo= {}
        //   Object.keys(item).forEach(key=> {
        //     userInfo[userRelations[key]] = item[key]
        //   })
        //   userArr.push(userInfo)
        // })

        let userArr = results.map(item=>{
          let userInfo = {}
          Object.keys(item).forEach(key=>{
            if(userRelations[key] === "timeOfEntry" || userRelations[key] === "correctionTime") {
              userInfo[userRelations[key]] = new Date(this.formatDate2(item[key], '/'))
            }else {
              userInfo[userRelations[key]] = item[key]
            }
            
          })
          return userInfo
        })

        await importEmployee(userArr)
        this.$message.success('Success import Exel')
        this.$router.back()
    },
      // Exel Date => Date
    formatDate2(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  },


};
</script>

<style scoped>
</style>