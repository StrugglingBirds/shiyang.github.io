# Webpack

## 全局环境变量

### 默认环境变量

npm run serve 默认process.env.NODE_ENV值为：**development**

npm run build 默认process.env.NODE_ENV值为：**production**

package.json

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }
}
```

### 设置&增加环境及环境变量

例如：增加测试环境

启动命令

```shell
# sit环境本地环境启动
npm run test-sit

# uat环境测试环境打包
npm run test-uat
```

package.json

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "test-sit": "vue-cli-service serve --mode testsit",
    "test-uat": "vue-cli-service build --mode testuat",
    "lint": "vue-cli-service lint"
  }
}
```

前端根目录增加.env.testsit

```
NODE_ENV='testsit'
VUE_APP_BASE_URL='./base/sit/apis/'
```

前端根目录增加.env.testuat

```
NODE_ENV='testuat'
VUE_APP_BASE_URL='./base/uat/apis/'
```

全局变量可访问为

```javascript
process.env.NODE_ENV === 'testsit' // true
```

```javascript
process.env.NODE_ENV === 'testuat' // true
```

### webpack增加客户端全局变量

```javascript
const { DefinePlugin } = require('webpack')

module.exports = {
  plugins: [
    new DefinePlugin({
      myvalue: '这里可以自定义全局变量'
    })
  ]
}
```

访问方式

```javascript
console.log(process.env.myvalue) // 输出："这里可以自定义全局变量"
```

