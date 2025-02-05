<script lang="ts">
import videojs from 'video.js';

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    url: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<template>
    <div>
        <video ref="videoPlayer" class="video-js" controls>
            Your browser does not support the video tag.
        </video>
    </div>
</template>