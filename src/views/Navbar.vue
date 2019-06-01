<template>
  <div>
    <div id="nav">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>導覽列</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1" route="/">Home</el-menu-item>
              <el-menu-item index="2" route="/webAudio">Web Audio</el-menu-item>
              <el-menu-item index="3" route="/guitarTuner">Guitar Tuner</el-menu-item>
              <el-menu-item index="4" route="/pannerNode">Panner Node</el-menu-item>
              <el-menu-item index="5" route="/test">test</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>
    <router-view/>
  </div>
</template>
<style lang="scss">
#nav {
  position: fixed;
  width: 300px;
}
</style>
