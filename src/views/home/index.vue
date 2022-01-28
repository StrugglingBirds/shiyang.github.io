<template>
  <div class="home">
    <van-nav-bar title="Edit">
      <template #left>
        <van-icon @click="changeMenuShow" name="bars" size="26" color="#999"/>
      </template>
    </van-nav-bar>
    <van-popup v-model:show="menuShow" position="left"  teleport="#app" :style="{height: '100%'}">
      这里是弹框内容部分
    </van-popup>
    <main class="doc"></main>
  </div>
</template>
<script>
import { ref } from 'vue'
// import axios from 'axios'
import { marked } from 'marked'
import { getMdFile } from '../../utils/worker'
console.log(marked);
export default {
  name: "home",
  setup () {
    const menuShow = ref(false)
    const changeMenuShow = () => menuShow.value = !menuShow.value
    
    getMdFile('./markfiles', '/README.md')

    // axios.get('./markfiles/README.md').then(res => {
    //   const doc = document.querySelector('.doc')
    //   const html = marked.parse(res.data)
    //   doc.innerHTML = html
    // })

    return {
      menuShow,
      changeMenuShow
    }
  }
};
</script>
<style scoped>
.home {
  height: 100%;
}
.doc {
  padding: 10px;
}
.doc >>> pre {
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  background-color: rgb(30, 30, 30)
}
</style>