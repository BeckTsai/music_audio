<template>
  <div id="web-audio-api">
    <h1>Hello, Web Audio API</h1>
    <button @click="clickHandler">Play / Pause</button>
    <button @click="reset">Reset</button>
    <div id="config">
      <div class="audio-note">
        <h3>
          <span>音源</span>
        </h3>
        <div class="item">
          <div class="title">
            type :
            <span>{{ waveType }}</span>
          </div>
          <b-form-select
            v-model="waveType"
            :options="waveForm"
            class="form-select"
            @change="changeHandler"
          />
        </div>
        <div class="item">
          <div class="title">
            frequency :
            <span>{{ frequency }}</span>
          </div>
          <b-form-input
            type="range"
            v-model="frequency"
            min="0"
            max="4000"
            step="1"
            @input="changeHandler"
          />
        </div>
        <div class="item">
          <div class="title">
            detune :
            <span>{{ detune }}</span>
          </div>
          <b-form-input
            type="range"
            v-model="detune"
            min="-2000"
            max="2000"
            step="1"
            @input="changeHandler"
          />
        </div>
      </div>
      <div class="audio-note">
        <h3>
          <span>增益節點</span>
        </h3>
        <div class="item">
          <div class="title">
            volume :
            <span>{{ volume }}</span>
          </div>
          <b-form-input
            type="range"
            v-model="volume"
            min="0"
            max="5"
            step="0.1"
            @input="changeHandler"
          />
        </div>
      </div>
      <div class="audio-note">
        <h3>
          <span>濾波器節點</span>
        </h3>
        <div class="item">
          <div class="title">
            filterType :
            <span>{{ filterType }}</span>
          </div>
          <b-form-select
            :options="filterForm"
            v-model="filterType"
            class="form-select"
            @change="changeHandler"
          />
        </div>
        <div class="item">
          <div class="title">
            filterF :
            <span>{{ filterF }}</span>
          </div>
          <b-form-input
            type="range"
            min="0"
            max="4000"
            step="1"
            v-model="filterF"
            @input="changeHandler"
          />
        </div>
        <div class="item">
          <div class="title">
            filterQ :
            <span>{{ filterQ }}</span>
          </div>
          <b-form-input
            type="range"
            min="0.01"
            max="1000"
            step="0.01"
            v-model="filterQ"
            @input="changeHandler"
          />
        </div>
        <div class="item">
          <div class="title">
            filterGain :
            <span>{{ filterGain }}</span>
          </div>
          <b-form-input
            type="range"
            min="0"
            max="5"
            step="0.1"
            v-model="filterGain"
            @input="changeHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import audioUnlock from "../lib/audioUnlock";
export default {
  data() {
    const AudioContext = window.AudioContext || window.webkitAudioContext; // 跨瀏覽器
    const audioCtx = new AudioContext(); // 主控台的概念
    const oscillator = audioCtx.createOscillator(); // 振盪器 (音源)
    const gainNode = audioCtx.createGain(); // 增益節點 控制音量的
    const filter = audioCtx.createBiquadFilter(); // 濾波器
    return {
      isPlaying: false,
      audioCtx,
      oscillator,
      gainNode,
      filter,
      waveType: "sine", // sine, square, sawtooth, triangle
      waveForm: [
        { value: "sine", text: "sine" },
        { value: "square", text: "square" },
        { value: "sawtooth", text: "sawtooth" },
        { value: "triangle", text: "triangle" }
      ],
      filterForm: [
        { value: "allpass", text: "allpass" },
        { value: "highpass", text: "highpass" },
        { value: "bandpass", text: "bandpass" },
        { value: "lowshelf", text: "lowshelf" },
        { value: "highshelf", text: "highshelf" },
        { value: "lowshelf", text: "lowshelf" },
        { value: "notch", text: "notch" }
      ],
      frequency: 440, // A4
      detune: 0, // 解諧 可做出和聲
      volume: 1, // 音量
      filterType: "allpass", // lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch
      filterF: "350", // 濾波的判斷頻率
      filterQ: "1", // 品質參數
      filterGain: "0" // 過濾掉的頻率通過的音量
    };
  },
  methods: {
    clickHandler() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    changeHandler() {
      this.setNoteConfig();
    },
    reset() {
      this.waveType = "sine";
      this.frequency = 440;
      this.detune = 0;
      this.volume = 1;
      this.filterType = "allpass";
      this.filterF = 350;
      this.filterQ = 1;
      this.filterGain = 0;
      this.setNoteConfig();
    },
    play() {
      this.filter.connect(this.audioCtx.destination);
    },
    stop() {
      this.filter.disconnect(this.audioCtx.destination);
    },
    setNoteConfig() {
      this.oscillator.type = this.waveType;
      this.oscillator.frequency.value = this.frequency;
      this.oscillator.detune.value = this.detune;
      this.gainNode.gain.value = this.volume;
      this.filter.type = this.filterType;
      this.filter.frequency.value = this.filterF;
      this.filter.Q.value = this.filterQ;
      this.filter.gain.value = this.filterGain;
    }
  },
  mounted() {
    audioUnlock(this.audioCtx);
    this.setNoteConfig();
    this.oscillator.connect(this.gainNode); // 將音源接到音量節點上
    this.gainNode.connect(this.filter);
    this.oscillator.start(); // 啟動音源
  },
  beforeDestroy() {
    if (this.isPlaying) this.filter.disconnect(this.audioCtx.destination);
  }
};
</script>
<style lang="scss" scoped>
.audio-note {
  width: 600px;
  margin: 30px auto;
  border: 1px solid #888;
}

.item {
  display: flex;
  width: 300px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
}

.form-select {
  width: 132px;
}

.custom-range {
  width: 129px;
}
</style>
