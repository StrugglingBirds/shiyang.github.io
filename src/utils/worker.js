import axios from "axios"
import ESCAPE from "./escape.enum"

export function createWorker (resolve, reject, fn, arg) {
  const blob = new Blob(['('+fn.toString()+')()'])
  const url = window.URL.createObjectURL(blob)
  let worker = null
  if (Worker) {
    worker = new Worker(url)
    worker.addEventListener('error', err => {
      console.error('Worker Error:', err);
      worker.terminate()
      reject(err)
    })
    worker.postMessage(JSON.stringify(ESCAPE))
    worker.postMessage(arg)
    worker.addEventListener('message', function (event) {
      console.log('master accept data:', event)
      resolve(event.data)
    })

    return worker
  }
}

export function getMdFile (filepath, filename) {
  return new Promise((resolve, reject) => {
    axios.get(filepath + filename, {
      headers: {
        'Content-type': 'text/markdown;charset=utf-8;'
      }
    }).then(({ data }) => {
      // 创建worker线程
      createWorker(resolve, reject, function () {
        // worker.js
        let html, escape;
        this.addEventListener('message', run)

        function run (ev) {
          getJS()
          const res = getMessage(ev)
          switch (res.type) {
            case 'html':
              html = res.value;
              html = getCode(html, escape)
              this.postMessage(html)
              break;
            case 'escape':
              escape = res.value;
              break;
          }
          
        }

        function getMessage ({data}) {
          if (data.includes('##')) {
            return {
              type: 'html',
              value: this.marked.parse(data)
            }
          }
          if (data.includes('&#39;')) {
            return {
              type: 'escape',
              value: JSON.parse(data)
            }
          }
        }

        function getJS () {
          // 引入代码高亮插件
          this.importScripts('https://strugglingbirds.github.io/home/tools/highlight.min.js')
          // 引入markdown转HTML文档插件
          this.importScripts('https://strugglingbirds.github.io/home/tools/marked.min.js')
        }
        function getCode (html, escape) {
          let codes = html.match(/<code[\s\S]*?<\/code>/g)
          if (codes) {
            codes.forEach(code => {
              let codeContain = code.replace(/<\/*code.*?>/g, '')
              const classNames = code.match(/language-[a-z]+/g)
              const className = classNames ? classNames[0] : '-text'
              const type = className.split('-')[1]

              Object.keys(escape).forEach(es => {
                codeContain = codeContain.replace(new RegExp(es, 'g'), escape[es])
              })

              const highLightHtml = this.hljs.highlight(codeContain, {language: type})
              html = html.replace(code, highLightHtml.value)
              // 添加语言类型标记
              html = html.replace('<pre>', '<pre data-lang="'+ type +'">')
            })
          }
          return html
        }
      }, data)
    })
  })
}