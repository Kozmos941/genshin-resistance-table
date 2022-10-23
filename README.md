## genshin-resistance-table

 原神怪物抗性表

- [genshin-resistance-table](#genshin-resistance-table)
- [数据](#数据)
  - [数据存储](#数据存储)
  - [数据处理](#数据处理)
  - [表格配置](#表格配置)
- [项目配置](#项目配置)
  - [Vite](#vite)
    - [define](#define)
    - [PostCSS](#postcss)
  - [TypeScript](#typescript)
  - [ESLint](#eslint)
  - [CSS](#css)
- [TO LEARN](#to-learn)
  - [Vue](#vue)
  - [CSS](#css-1)
  - [TypeScript](#typescript-1)
  - [Web Storage](#web-storage)
- [TO DO](#to-do)

## 数据

### 数据存储

- 数据存储在 `src/data` 文件夹中, 每一项完整数据如下所示

```js
{
  "name": "",
  "states": [
    {
      "state": "",
      "general": "",
      "correspond": "",
      "electro": "",
      "pyro": "",
      "hydro": "",
      "cryo": "",
      "dendro": "",
      "anemo": "",
      "geo": "",
      "physical": ""
    }
  ]
}
```

|    key     | required? |         type         |   default    |     meaning      |
| :--------: | :-------: | :------------------: | :----------: | :--------------: |
|    name    |     ✅     |        String        |  (required)  |     怪物名称     |
|   states   |    *❌     |        Array         |     null     |     状态列表     |
|   state    |     ❌     |        String        |     null     |       状态       |
| correspond |     ❌     | Number or 'infinity' |     null     |  对应属性的抗性  |
|  general   |     ❌     |        Number        |      10      | 通常情况下的抗性 |
|  electro   |     ❌     |        Number        | this.general |    电元素抗性    |
|    pyro    |     ❌     |        Number        | this.general |    火元素抗性    |
|   hydro    |     ❌     |        Number        | this.general |    水元素抗性    |
|    cryo    |     ❌     |        Number        | this.general |    冰元素抗性    |
|   dendro   |     ❌     |        Number        | this.general |    草元素抗性    |
|   anemo    |     ❌     |        Number        | this.general |    风元素抗性    |
|    geo     |     ❌     |        Number        | this.general |    地元素抗性    |
|  physical  |     ❌     |        Number        | this.general |     物理抗性     |

- 除 `name` 属性, 其他均可省略, 如

```json
{
  "name": "✱丘丘人"
}

{
  "name": "风魔龙"
}
```

- 当 `states` 有多个条目时, 需要保证每一项至少是空对象 `{}`, 如下所示

```json
{
  "name": "魔偶剑鬼",
  "states": [
    {}, // 该空对象不能省略
    {
      "state": "分身",
      "correspond": 30
    }
  ]
}
```

### 数据处理

- 在本地通过 `merge.js` 将原数据合并 `data/table.json`
   - 需安装 `node.js`, 执行 `npm run merge` 或 `node merge`
   - 结合 `webfontloader` 尝试字体子集化

1. 每个 `data/*.json` 文件存放同一个种族的数据,  `fetchData()` 获取数据并存放于 `[]` 中

```js
[
  { race:'元素生命', raw:[ {...}, ...] },
  { race:'丘丘部落', raw:[ {...}, ...] },
  ...
]
```

2. `flattedData()` 处理数据, 设置给定值, 没有则设置默认值, 并记录表格的 `rowspan`, 

- 表格数据存储在 `DATA_ARRAY` 中, 以 `元素生命` 为例, 数据将被处理符合表格的形式
  - 每一项即表格的一行, `Map` 类型 (单纯就是想用一下 `Map`)
  - 键名为完整键名的前两个字符 (主要是想缩减 `table.json` 的大小, 不知道数据文件大小对性能有多大影响？)

```js
[
  Map(12) {
    'ra' => '元素生命', 
    'be' => '*史莱姆', 
    'st' => null, 
    'co' => 'infinity', 
    'el' => 10, 
    'py' => 10, 
    'hy' => 10, 
    'cr' => 10, 
    'de' => 10,
    'an' => 10,
    'ge' => 10,
    'ph' => 10
  },
  Map(11) {
    'be' => '狂风之核', 'st' => null, //...
  },
  //...
  Map(11) {
    'be' => '纯水幻形', 'st' => '豕/鼠', //...
  },
  Map(10) {
    'st' => '鹤/鸢', //...
  },
  Map(10) {
    'st' => '蟹/鸭', //...
  },
  Map(10) {
    'st' => '雀/蛙', //...
  },
  Map(11) {
    'be' => '雷音权现', //...
  },
  //...
]
```

3. `rowspan` 数据记录在 `SPAN_MAP` 中, 形式如下

```js
Map() {
  '纯水幻形' => 4,
  '元素生命' => 9,
  '丘丘部落' => 4,
  '*兽境幼兽' => 2,
  '*兽境猎犬' => 2,
  '黄金王兽' => 3,
  // ...
}
```
### 表格配置

- 文件 `src/scripts/config.ts` 为表格的配置文件 

| constant      | meaning    | description                             |
| ------------- | ---------- | --------------------------------------- |
| RACES         | 种族名     | 数据的 '\n' 是为了在网页渲染中换行      |
| TABLE_HEADS   | 表格头     | 控制表格的列和颜色                      |
| THEADS_LENGTH | 表格头长度 |                                         |
| SIGN_REPLACE  | 替换符号   | 数据中 '*', 'infinity', '\n' 的替换符号 |
| TABLE_CAPTION | 表格标题   |                                         |
| TABLE_WIDTH   | 表格宽度   |                                         |


## 项目配置

项目换成 TypeScript 了, 顺便尝试了一些插件

### Vite

```ts
// alias
import { resolve } from 'path'

resolve: {
  extensions: ['.ts', '.js', '.vue'],
  alias: [
    {
      find: '@',
      replacement: resolve(__dirname, 'src'),
    }
  ],
}

// server
server: {
  host: '0.0.0.0',
}
```

#### define

```ts
// vite-env.d.ts
declare const __APP_VERSION__: string

// vite.config.ts
define: {
  __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
},
```

#### PostCSS

- 配置 `vite.config.ts`
```ts
import postcssNesting from 'postcss-nesting'

css: {
  postcss: {
    plugins: [postcssNesting()],
  },
},
```

- 使用
 - `main.ts` 中引入 `*.postcss` 文件 
 - `.vue` 中 `<style lang="postcss">`

### TypeScript

```json
// 配合 vite.config.ts 的 alias 使用
"paths": {
  "@/*": ["src/*"],
  "$config": ["src/assets/config.ts"],
  "$types": ["src/scripts/types.ts"]
}
```

### ESLint

```json
// 禁用插件
"vue/no-setup-props-destructure": "off"
```

|                 |               |
| --------------- | ------------- |
| max-len         | 行长度        |
| indent          | 缩进          |
| linebreak-style | 换行 LF or CR |
| quotes          | 引号          |
| semi            | 分号          |
| comma-spacing   | 逗号空格      |
| comma-style     |               |
| comma-dangle    | 尾逗号        |

### CSS
- 禁用选择 [stackoverflow](https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting)

## TO LEARN

- 这个项目主要是为了学习、尝试各种东西
  - 使用 React, Svelte 编写项目
  - 了解 Web Worker, Unit Test 等的用法及作用

### Vue

- v-bind in CSS [Vuejs](https://vuejs.org/api/sfc-css-features.html#v-bind-in-css)
  - 通过 因为`html2canvas`

- Template Ref [Vuejs](https://vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs)
  - 如何在 Component 上配合 `<script setup lang="ts">` 使用
  - `defineExpose({})` 传入的是 `{}`, 第一次用没注意, 一直获取不到实例

```ts
/* TView.vue */
const tableRef = ref<HTMLTableElement>()
defineExpose({
  tableRef,
})

/* MainView.vue */
const tViewRef = ref<InstanceType<typeof TView>>()
onMounted(() => {
  const tView = tViewRef.value as InstanceType<typeof TView>
  const table = tView.tableRef as HTMLTableElement
})
```

### CSS

- Flexbox
  - 如何控制单个盒子大小, 比如某些固定, 某些自适应

- Grid Layout
  - 在 `DModal.vue` 组件中尝试了下

### TypeScript

- 找个时间深入学习下语法、类型等

### Web Storage

-  Cookie
   - 原来 `arp_scroll_position` 这个 cookie 是 Chrome Extension 设置的
     - arp 即 Auto Refresh Plus

- IndexedDB
  - 感觉原生 API 好麻烦啊, 先使用 `localforage`

## TO DO

- 无穷符号 ∞, 字体都没这个符号, 看上去不和谐
   - 使用 Emoji ♾️ 可惜不能改变颜色
   - 试着用 `transform: rotate(-90degree)` 将全角 `８` 旋转
      - 网页看上去没问题, 但截图中 `td` 的 `border` 也旋转了
      - 貌似是 html2canvas 不支持 `transform`
   - 原来是字体名打错了, Noto 字体是有这个符号的, 虽然感觉还是小了点, 但个人已经可以接受了

- 第一次加载网页, 截图会少差不多一列
   - 貌似是因为字体渲染导致的 Layout Shifting 让 `table` 的 `offsetWidth` 比字体完全渲染后的小
   - 直接设置一个固定宽度 `width: 1200`, 暂时解决了

- 侧边栏锚点标签随着滚动即时改变背景颜色
  - 用 id 和 `<a>` 标签定位, 但效果达不到预期, 遂放弃
  - 利用 `onscroll` 粗略实现了但是有问题, 而且代码很乱, 打算重写
  - 目前先搁置, 看看有什么更好的方法
