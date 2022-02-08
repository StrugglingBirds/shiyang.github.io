# code

## Project setup
```html
<div>
  <span>这里是HTML</span>
  <div class="className">这里是div？?</div>
</div>
```

### Compiles and hot-reloads for development
```shell
yarn serve
```

### Compiles and minifies for production
```shell
yarn build
```

### Lints and fixes files
```shell
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Components
```javascript
// 这里是注释
var doc = document.querySelector('.main')
console.log(doc)
const menuShow = ref(false)
const changeMenuShow = () => menuShow.value = !menuShow.value
function fn () {
  return doc
}
```

```css
.font {
  color: #fff;
  background-color: rgb(200, 100, 34);
}

```