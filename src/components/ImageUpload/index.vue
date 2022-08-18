<template>
  <div>
    <el-upload
      list-type="picture-card"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="uploadFile"
      :file-list="fileList"
      :limit="1"
      :class="{ disabled: fileComputed }"
      action="#"
    >
      <i class="el-icon-plus" :limit="1"></i>
    </el-upload>
    <el-progress
      :percentage="precent"
      style="width: 180px"
      v-if="showPercent"
    ></el-progress>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import Cos from "cos-js-sdk-v5";

// Tencent Cos
const cos = new Cos({
  SecretId: "AKIDoSs3zg8LJ3Yopb8SgpkQr7AyXrwrXzDC",
  SecretKey: "pQmunRq0vb2ECvPfgT0JNCm7D5i6IGyR",
});

export default {
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: "",
      currentFileUid: null, //Record Current Image file
      precent: 0,
      showPercent: false,
    };
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1;
    },
  },
  methods: {
    // preview
    preview(file) {
      console.log(file);
      this.imgUrl = file.url;
      this.showDialog = true;
    },

    // handleRemove
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
    },
    changeFile(file, fileList) {
      //   console.log(fileList);
      this.fileList = fileList.map((item) => item);
      //   console.log('123', this.fileList);
    },
    beforeUpload(file) {
      const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
      // check type
      if (!types.includes(file.type)) {
        this.$message.error("Only JPG、GIF、BMP、PNG !");
        return false; // finish upload
      }

      const maxSize = 5 * 1024 * 1024;

      // check Size
      if (file.size > maxSize) {
        this.$message.error("File size is too Big(5Mb)");
        return false;
      }
      this.showPercent = true;
      this.currentFileUid = file.uid;
      return true; //checking is ok
    },

    uploadFile(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: "lee1997-1313393138" /* 填入您自己的存储桶，必须字段 */,
            Region: "ap-tokyo" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
            Key: params.file.name, //file name
            StorageClass: "STANDARD",
            Body: params.file, // 上传文件对象
            onProgress: (progressData) => {
              this.precent = progressData.percent * 100
            },
          },
          // func Returned Data
          (err, data) => {
            // console.log(err || data);

            // Response is Ok
            if (!err && data.statusCode === 200) {
              this.fileList = this.fileList.map((item) => {
                // is uploaded Image?
                if (item.uid === this.currentFileUid) {
                  return { url: "http://" + data.Location, upload: true }; // Set Url of image
                }
                return item;
              });
            }

            setTimeout(()=>{
                this.showPercent = false
                this.percent = 0
            }, 1000)
          }
        );
      }
    },
  },
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>