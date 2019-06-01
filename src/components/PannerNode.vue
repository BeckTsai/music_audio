<template>
  <div>
    <h1>Panner Node</h1>
    <b-button :pressed.sync="btnStatus" variant="outline-primary">{{ status }}</b-button>
    <b-button variant="outline-info">Reset</b-button>
    <div class="config">
      <div class="audio-note">
        <h3>音源</h3>
        <div class="item">
          frequency:
          <span>{{ frequency }}</span>
          <el-slider v-model="frequency" :min="430" :max="450" :step="1"></el-slider>
        </div>
      </div>
      <div class="audio-note">
        <h3>增益節點</h3>
        <div class="item">
          volume:
          <span>{{ volume }}</span>
          <el-slider show-stops v-model="volume" :min="0" :max="5" :step="0.1"></el-slider>
        </div>
      </div>
    </div>
    <div class="drag-area">
      <div
        class="listener"
        @mousemove="moveHandler"
        :style="{ top: `${this.dragData.listenr.X}px`,left: `${this.dragData.listenr.Y}px` }"
      >聽者</div>
    </div>
  </div>
</template>

<script>
import audioUnlock from "../lib/audioUnlock.js";
export default {
  data() {
    return {
      btnStatus: false,
      frequency: 440,
      volume: 1,
      moveStatus: false,
      dragData: {
        listenr: {
          X: 0,
          Y: 0
        },
        source: {
          X: 0,
          Y: 0
        }
      }
    };
  },
  computed: {
    status() {
      return this.btnStatus ? "Stop" : "Play";
    }
  },
  methods: {
    pressHandler(e) {},
    moveHandler() {
      this.dragData.listenr.X = this.X;
      this.dragData.listenr.Y = this.Y;
    }
  }
};
</script>

<style lang="scss" scoped>
.config {
  display: flex;
  width: 600px;
  margin: 5px auto;
  border: 1px solid #000;
  justify-content: space-around;
}
.audio-note {
  width: 290px;

  &:first-child {
    border-right: 1px solid #000;
  }
}
.drag-area {
  position: relative;
  width: 600px;
  margin: 0 auto;
  height: 400px;
  border: 1px solid #000;

  .listener,
  .source {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    line-height: 50px;
  }

  .listener {
    background-color: rgb(240, 218, 22);
  }

  .source {
    background-color: rgb(9, 168, 35);
  }
}
</style>
