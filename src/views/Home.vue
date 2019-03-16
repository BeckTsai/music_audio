<template>
  <div class="home">
    <GuitarTune/>
  </div>
</template>

<script>
// @ is an alias to /src
import GuitarTune from "@/components/GuitarTune.vue";

export default {
  name: "home",
  components: {
    GuitarTune
  }
};
</script>
