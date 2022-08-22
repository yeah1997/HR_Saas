<template>
  <div>
    <svg-icon
      icon-class="fullscreen"
      @click="changeScreen"
      style="color: #fff; width: 20px; height: 20px"
    />
  </div>
</template>


<script>
import ScreenFull from 'screenfull'

export default {
  name: "SreenFull",
  methods: {
    changeScreen() {
        if(!ScreenFull.isEnabled) {
            this.$message.warning("Full screnn is failed")
            return
        }
        ScreenFull.toggle()
    }
  },
};
</script>

<style>
</style>