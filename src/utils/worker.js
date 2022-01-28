import axios from "axios"

export function createWorker (fn, arg) {
  const blob = new Blob(['('+fn.toString()+')()'])
  const url = window.URL.createObjectURL(blob)
  let worker = null
  if (Worker) {
    worker = new Worker(url)
    worker.addEventListener('error', err => {
      console.error('Worker Error:', err);
      worker.terminate()
    })
    worker.postMessage(arg)
    worker.addEventListener('message', function (event) {
      console.log('master accept data:', event)
    })

    return worker
  }
}

export function getMdFile (filepath, filename) {
  axios.get(filepath + filename, {
    headers: {
      'Content-type': 'text/markdown;charset=utf-8;'
    }
  }).then(({ data }) => {
    createWorker(function () {
      // worker.js
      this.addEventListener('message', ev => {
        this.importScripts('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js')
        this.importScripts('https://cdn.jsdelivr.net/npm/marked/marked.min.js')
        let html = this.marked.parse(ev.data)
        console.log(html);
        getCode(html)

        // this.postMessage(heighLightHtml.value)
      })

      function getCode (html) {
        let codes = html.match(/<code[\s\S]*?<\/code>/g)
        console.log('codes:', codes);
        codes = codes.map(code => {
          const codeContain = code.replace(/<\/*code.*?>/g, '')
          const className = code.replace(/<code(\sclass=")?|"?>.*?\n*?<\/code>/g, '')
          const type = className.split('-')[1]
          console.log('codeContain:', codeContain, 'className:', className)
          return code || this.hljs.highlight(codeContain, {language: type})

        })
        console.log('code:', codes)
      }




    }, data)
  })
}