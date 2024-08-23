<template>
  <div class="home">
    <van-nav-bar v-bind:title="title">
      <template slot="left">
        <van-icon name="bars" size="26" color="#999" v-on:click="changeMenuShow"></van-icon>
      </template>
    </van-nav-bar>
    <van-popup v-model:show="menuShow" position="left" teleport="#app" v-bind:style="{height: '100%'}">
      这里是弹框内容部分
    </van-popup>
    <main class="doc" ref="docRef">
      <div v-html="docHtml"></div>
    </main>
  </div>
</template>

<script>
import { ref, watch, onMounted, nextTick } from 'vue'
import { getMdFile } from '../../utils/worker'
import { useRoute } from 'vue-router'
export default {
  name: "home",
  setup () {
    const menuShow = ref(false)
    const title = ref('')
    const docRef = ref(null)
    const docHtml = ref('')
    const docLoaded = ref(false)
    const changeMenuShow = () => menuShow.value = !menuShow.value
    const route = useRoute()
    const scrollWin = () => {
      const els_a = document.querySelectorAll('a')
      els_a.forEach(el_a => {
        el_a.addEventListener('click', function (ev) {
          ev.preventDefault()
          if (ev.target.getAttribute('href').startsWith('#')) {
            let top = ev.target.offsetTop
            window.scrollTo({behavior: 'smooth', top})
          } else {
            window.open(ev.target.href, '_blank')
          }
        })
      })
    }

    const loadDoc = async () => {
      const markfiles = require.context('../../../public/markfiles/', true, /.md$/)
      const docs = markfiles.keys().map(key => key.split('/')[1])
      if (docs.includes(route.params.doc)) {
        const html = await getMdFile('./markfiles/', route.params.doc)
        docHtml.value = html
        nextTick(() => {
          title.value = docRef.value.querySelector('.doc h1').textContent
          docLoaded.value = true
          scrollWin()
        })
      } else {
        docHtml.value = `<div>未找到相应文档</div>`
        docLoaded.value = true
      }
    }

    onMounted(() => {
      loadDoc();
    })

    watch(() => route.params.doc, () => {
      loadDoc()
    })
    
    return {
      title,
      menuShow,
      changeMenuShow,
      docHtml,
      docLoaded,
      docRef
    }
  },
  beforeRouteLeave (to) {
    return !!to.matched.length
  }
}
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
  background-color: rgb(30, 30, 30);
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