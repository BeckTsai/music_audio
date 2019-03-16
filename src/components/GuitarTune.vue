<template>
  <div id="tunerWrep">
    <h1>Guitar Tuner</h1>
    <b-button :pressed.sync="btnStatus" variant="outline-primary" @click="clickHandler">{{ status }}</b-button>
    <b-button variant="info">reset</b-button>
    <div class="config">
      <div class="audio-note">
        <h3>設定</h3>
        <div class="itemWrap">
          <div class="item">
            <div class="title">
              A4:
              <span>{{ standardA4 }}</span>
            </div>
            <b-form-input type="range" v-model="standardA4" min="430" max="450" step="1"></b-form-input>
          </div>
          <div class="item">
            <div class="title">調弦法:</div>
            <b-form-select
              v-model="tuning"
              :options="tuningForm"
              @change="changeTuningHandler(tuning)"
            ></b-form-select>
          </div>
          <div class="item">
            <div class="title">
              volume:
              <span>{{ volume }}</span>
            </div>
            <b-form-input type="range" v-model="volume" min="0" max="5" step="0.1"></b-form-input>
          </div>
        </div>
        <div id="note">
          <b-button-group>
            <b-button
              v-for="(note, index) in noteArr"
              :key="index"
              @click="changeNoteHandler(note)"
            >
              <span>{{ note }}</span>
            </b-button>
          </b-button-group>
        </div>
        <h3>{{ note }}</h3>
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

    return {
      oscillator,
      gainNode,
      audioCtx,
      btnStatus: false,
      currentNote: "E2",
      frequency: 440,
      standardA4: 440,
      tuning: "standard",
      tuningForm: [
        { value: "standard", text: "標準" },
        { value: "1-step-down", text: "降全音" },
        { value: "drop-d", text: "Drop D" },
        { value: "open-e", text: "Open E" },
        { value: "open-d", text: "Open D" }
      ],
      volume: 1,
      noteArr: ["E2", "A2", "D3", "G3", "B3", "E4"],
      note: "-",
      noteList: {
        C: 0,
        "C#": 1,
        Db: 1,
        D: 2,
        "D#": 3,
        Eb: 3,
        E: 4,
        F: 5,
        "F#": 6,
        Gb: 6,
        G: 7,
        "G#": 8,
        Ab: 8,
        A: 9,
        "A#": 10,
        Bb: 10,
        B: 11
      },
      noteNameArr: {
        standard: ["E2", "A2", "D3", "G3", "B3", "E4"],
        "1-step-down": ["D2", "G2", "C3", "F3", "A3", "D4"],
        "drop-d": ["D2", "A2", "D3", "G3", "B3", "E4"],
        "open-e": ["E2", "B2", "E3", "G#3", "B3", "E4"],
        "open-d": ["D2", "A2", "D3", "F#3", "A3", "D4"]
      }
    };
  },
  computed: {
    status() {
      return this.btnStatus ? "Stop" : "Play";
    }
  },
  mounted() {
    audioUnlock(this.audioCtx);
    this.setNoteConfig();
    this.oscillator.connect(this.gainNode);
    this.oscillator.start();
  },
  methods: {
    getSemitone(note) {
      if (!note || note === "-") return 69;
      return (
        this.noteList[note.slice(0, 1)] + 12 * (1 + parseInt(note.slice(-1)))
      );
    },
    getFrequency(semitone) {
      return this.standardA4 * Math.pow(2, (semitone - 69) / 12);
    },
    setNoteConfig() {
      this.oscillator.type = "triangle";
      this.oscillator.frequency.value = this.frequency;
      this.oscillator.detune.value = 0;
      this.gainNode.gain.value = this.volume;
    },
    changeNoteHandler(note) {
      this.currentNote = note;
      this.note = note;
      this.frequency = this.getFrequency(this.getSemitone(note));
      this.setNoteConfig();
    },
    changeTuningHandler(tuning) {
      this.noteArr = this.noteNameArr[tuning];
    },
    clickHandler() {
      if (!this.btnStatus) {
        this.gainNode.disconnect(this.audioCtx.destination);
        this.note = "-";
      } else {
        this.changeNoteHandler(this.currentNote);
        this.gainNode.connect(this.audioCtx.destination);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#tunerWrep {
  width: 600px;
  margin: 0 auto;
}

.audio-note {
  margin-top: 10px;

  > h3 {
    margin-top: 10px;
  }
}

.item {
  display: flex;
  width: 260px;
  margin: 0 auto;
  justify-content: space-between;

  .title {
    line-height: 38px;
  }
}

.custom-select {
  width: 132px;
  height: 38px;
}

.custom-range {
  width: 129px;
  height: 38px;
}
</style>