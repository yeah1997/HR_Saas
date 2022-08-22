<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <div>
      <svg-icon
        style="color: #fff; font-size: 20px"
        icon-class="language"
      ></svg-icon>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="$i18n.locale=== 'zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="$i18n.locale=== 'en'">English</el-dropdown-item>
      <el-dropdown-item command="ja" :disabled="$i18n.locale=== 'ja'">日本語</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from "js-cookie";

export default {
  methods: {
    changeLanguage(lang) {
      Cookie.set("language", lang);

      this.$i18n.locale = lang;
      this.$message.success("Success to change Language:" + lang);
    },
  },
};
</script>

<style>
</style>