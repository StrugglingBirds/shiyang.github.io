<template>
  <div class="home">
    <pdf-viewer></pdf-viewer>
  </div>
</template>

<script>
import PdfViewer from '@/components/pdf-viewer.vue'
export default {
  name: 'home',
  components: {
    PdfViewer
  },
  setup () {
    return {}
  }
}
</script>

