<template>
  <div class="home">
    <van-nav-bar :title="title">
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
import { getMdFile } from '../../utils/worker'
export default {
  name: "home",
  setup () {
    const menuShow = ref(false)
    let title = ref('')
    const changeMenuShow = () => menuShow.value = !menuShow.value

    const scrollWin = () => {
      const els_a = document.querySelectorAll('a')
      els_a.forEach(el_a => {
        el_a.addEventListener('click', function (ev) {
          ev.preventDefault()
          let el = document.querySelector(this.getAttribute('href'))
          let top = el.offsetTop
          window.scrollTo({behavior: 'smooth',top})
        })
      })
    }

    getMdFile('./markfiles/', 'git.md').then(html => {
      let el_doc = document.querySelector('.doc')
      el_doc.innerHTML = html
      title.value = el_doc.querySelector('h1').textContent
      scrollWin()
    })
    
    return {
      title,
      menuShow,
      changeMenuShow
    }
  },
  beforeRouteLeave (to) {
    return !!to.matched.length
  }
};
</script>
<style scoped>
.home {
  height: 100%;
}
.doc {
  padding: 10px 30px;
}
.doc >>> pre {
  position: relative;
  color: #fff;
  padding: 10px;
  overflow: auto;
  border-radius: 4px;
  background-color: rgb(30, 30, 30)
}
.doc >>> pre::before {
  content: attr(data-lang);
  position: absolute;
  right: 10px;
  color: #666;
  font-size: 12px;
}
.doc >>> pre::-webkit-scrollbar {
  height: 10px;
}
.doc >>> pre::-webkit-scrollbar-thumb {
  height: 5px;
  background-color: rgba(139, 136, 136, 0.521);
  border-radius: 5px;
}
</style>