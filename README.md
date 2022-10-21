## genshin-resistance-table

 原神怪物抗性表

- [genshin-resistance-table](#genshin-resistance-table)
- [Vue 3 + TypeScript + Vite](#vue-3--typescript--vite)
  - [Recommended IDE Setup](#recommended-ide-setup)
  - [Type Support For `.vue` Imports in TS](#type-support-for-vue-imports-in-ts)
- [数据](#数据)
  - [存储](#存储)
- [数据处理](#数据处理)
- [配置](#配置)
  - [Vite](#vite)
    - [define](#define)
    - [PostCSS](#postcss)
  - [TypeScript](#typescript)
  - [ESLint](#eslint)
  - [CSS](#css)
- [TO LEARN](#to-learn)
- [TO DO](#to-do)

## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


## 数据

### 存储

- 数据存储在 `data` 文件夹中，每一项完整数据如下所示

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

- 除 `name` 属性，其他均可省略，如

```json
{
  "name": "✱丘丘人"
}

{
  "name": "风魔龙"
}
```

- 当 `states` 有多个条目时，需要保证每一项至少是空对象 `{}`，如下所示

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

## 数据处理

0. 在本地通过 `./data/mergeData.js` 将表格数据合并成 `data.json`
   - 需安装 `node.js`，`node ./data/mergeData.js`
   - 结合 `webfontloader` 尝试字体子集化
   - 在本地处理数据，或许能提升点性能吧？

1. 每个 `.json` 文件存放同一个种族的数据， `fetchData()` 获取数据并存放于 `[]` 中

```js
[
  { race:'元素生命', raw:[ {...}, ...] },
  { race:'丘丘部落', raw:[ {...}, ...] },
  ...
]
```

2. `flattedData()` 将每项数据处理成无嵌套的形式，设置给定值，没有则设置默认值，将各行 `rowspan` 记录在全局对象 `_` 中

```js
[
  // ...
  {
    race: '愚人众',
    name: '藏镜仕女',
    state: null,
    correspond: 'infinity',
    electro: 10,
    pyro: 10,
    hydro: 50,
    cryo: 10,
    dendro: 10,
    anemo: 10,
    geo: 10,
    physical: -20
  },
  { race: '愚人众', name: '✱愚人众先遣队', state: null, ... },
  { race: '愚人众', name: '✱愚人众先遣队', state: '盾', ... }, 
  // ...
  { race: '异种魔兽', name: '✱飞萤', state: null, ... },
  // ...
]
```

3. 种族和怪物都要设置 rowspan，`tableData()` 把不需要的 `race`和 `name` 删除

```js
[
  // ...
  { race: '愚人众', name: '藏镜仕女', state: null, ... },
  { name: '✱愚人众先遣队', state: null, ... },
  { state: '盾', ... },
  // ...
  { race: '异种魔兽', name: '✱飞萤', state: null, ... },
  // ...
]
```

## 配置

项目换成 TypeScript 了，顺便尝试了一些插件

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
 - 全局引入 `.postcss` 文件 
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
```css
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
```

## TO LEARN

- Flexbox
  - 如何控制单个盒子大小，比如某些固定，某些自适应

- Grid Layout

- TypeScript
  - 语法、类型等

- Storage
  - Cookie
  - IndexedDB

- Web Worker
  - 了解下用法和作用

## TO DO

- 移动端样式
