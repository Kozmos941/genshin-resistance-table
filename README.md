## genshin-resistance-table

 原神抗性表

- [genshin-resistance-table](#genshin-resistance-table)
- [Development](#development)
- [Directory Structure](#directory-structure)
- [Data](#data)
  - [Store](#store)
  - [Process](#process)
  - [Config](#config)
- [TO DO](#to-do)

## Development

```
# Start Development Server
> npm run dev

# Building for Production
> npm run build

# Locally Preview Production Build
> npm run preview

# Merge Several Data Files into One
> npm run merge

# Pass a 'noSpan' argument (case insensitive) can generate data without considering rowspan (may be used for other projects)
> npm run merge -- noSpan
> npm run merge noSpan

# ESLint
> npm run lint
> npm run lint:fix
```

## Directory Structure 

```
genshin-resistance-table/
├─ ...                       ##
├─ src/                      ##
│  ├─ components/            ##
│  │  ├─ Download/           ## Image Save Related
│  │  │  ├─ DButton.vue      ## Download Button
│  │  │  ├─ DModal.vue       ## Download Modal
│  │  │  └─ ...              ## 
│  │  ├─ Footer/             ## Footer Related
│  │  │  └─ ...              ## 
│  │  ├─ Table/              ## Table Related
│  │  │  └─ ...              ## 
│  │  ├─ FooterView.vue      ## Footer
│  │  ├─ GithubCorner.vue    ## GitHub
│  │  ├─ MainView.vue        ## Button + GitHub + Table + Footer
│  │  ├─ SideNavigation.vue  ## Sider
│  │  └─ TableView.vue       ## Table
│  ├─ data/                  ##
│  │  ├─ ...                 ## Raw data used to generate
│  │  └─ table.json          ## Data for Rendering Table
│  ├─ scripts                ##
│  │  ├─ classes.ts          ## Class for Download, Event Handling
│  │  ├─ config.ts           ## Table Config (constant)
│  │  ├─ store.ts            ## 
│  │  └─ webfont.ts          ## Web Font Subsetting
│  ├─ stores                 ##
│  │  ├─ forage.ts           ## localforage
│  │  ├─ image.ts            ## useImageStore
│  │  └─ pinia.ts            ## usePiniaStore
│  ├─ App.vue                ## Side + Main
│  ├─ style.postcss          ## CSS Variable (mainly)
│  └─ main.ts                ##
├─ DEVLOG.md                 ## Recording issues, tries in development  
├─ index.html                ## 
├─ merge.js                  ## Merge data files into table.json
└─ ...
```

## Data

### Store

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
    },
    {/* …… */},
    /* …… */
  ]
}
```

|    key     | required? |         type         |   default    |     meaning      |
| :--------: | :-------: | :------------------: | :----------: | :--------------: |
|   being    |     ✅     |        String        |  (required)  |     怪物名称     |
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

- 除 `being` 外, 其他均可省略, 如

```json
{
  "being": "✱丘丘人"
}

{
  "being": "风魔龙"
}
```

- 当 `states` 有多个条目时, 需要保证每一项至少是空对象 `{}`, 如下所示

```json
{
  "being": "魔偶剑鬼",
  "states": [
    {}, // 该空对象不能省略
    {
      "state": "分身",
      "correspond": 30
    }
  ]
}
```

### Process

- 在本地通过 `merge.js` 将原数据合并 `data/table.json`
   - 需安装 `node.js`, 执行 `npm run merge` 或 `node merge`
   - 结合 `webfontloader` 尝试字体子集化

1. 每个 `data/*.json` 文件存放同一个种族的数据,  `fetchData()` 获取数据并存放于 `[]` 中

```js
[
  { race:'元素生命', raw:[ {/* …… */ }, /* …… */ ] },
  { race:'丘丘部落', raw:[ {/* …… */ }, /* …… */ ] },
  /* …… */
]
```

2. `flattedData()` 处理数据, 设置给定值, 没有则设置默认值, 并记录表格的 `rowspan`,

- 表格数据存储在 `DATA_ARRAY` 中, 以 `元素生命` 为例
  - 数据将被处理成符合表格的形式, 即考虑前面数据的 rowspan, 删除对应列
    - (可以通过 `npm run merge -- noSpan` 生成各行完整的数据)
  - 每一项即表格的一行, `Map` 类型 (单纯就是想用一下 `Map`)

```js
[
  Map(12) {
    'race' => '元素生命',
    'being' => '*史莱姆',
    'state' => null,
    'correspond' => 'infinity',
    'electro' => 10,
    'pyro' => 10,
    'hydro' => 10,
    'cryo' => 10,
    'dendro' => 10,
    'anemo' => 10,
    'geo' => 10,
    'physical' => 10
  },
  Map(11) {
    'being' => '狂风之核', 'state' => null, ///* …… */
  },
  ///* …… */
  Map(11) {
    'being' => '纯水幻形', 'state' => '豕/鼠', ///* …… */
  },
  Map(10) {
    'state' => '鹤/鸢', ///* …… */
  },
  Map(10) {
    'state' => '蟹/鸭', ///* …… */
  },
  Map(10) {
    'state' => '雀/蛙', ///* …… */
  },
  ///* …… */
  Map(11) {
    'being' => '*漂浮灵', ///* …… */
  }
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
  // /* …… */
}
```
### Config

- 文件 `src/scripts/config.ts` 为表格的配置文件

| constant      | meaning    | description                             |
| ------------- | ---------- | --------------------------------------- |
| RACES         | 种族名     |                                         |
| TABLE_HEADS   | 表格头     | 控制表格的列和颜色                      |
| THEADS_LENGTH | 表格头长度 |                                         |
| SIGN_REPLACE  | 替换符号   | 数据中 '*', 'infinity', '\n' 的替换符号 |
| TABLE_CAPTION | 表格标题   |                                         |

## TO DO
- 现在 commit 就是乱写, 先定个大致的规矩
  - commit message 先参考 vue 的写法 `release:``chore:``feat:` 等
  - version 的更新以生成的图片为标准, 即只要图片内容有变, 就算一个新版本
    - 比如修改数据、样式, 虽然只是小修改, 但只要图片变化就更新版本 `release: [new version]`

- 侧边栏锚点标签随着滚动即时改变背景颜色
  - 用 id 和 `<a>` 标签定位, 但效果达不到预期, 遂放弃
  - 利用 `onscroll` 粗略实现了但是有问题, 而且代码很乱, 打算重写
  - 目前先搁置, 看看有什么更好的方法

- 可以设定图片保存时的文件名, 以及自定义缩放, 图片类型、质量等
  - input 样式还不是那么兼容
    - 了解一下 clip-path
  - 类型 webp, 缩放 1；质量 0.99, 大小 1.04MB；质量 1, 大小反而 0.63MB, 是什么原因？ 

```css
input[type=range] {
  -webkit-appearance: none;

  /* Hides the slider so that custom slider can be made */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 2rem;
    width: 1rem;
    margin-top: -0.625rem;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;

    /* Add cool effects to your sliders! */
    @nest :disabled& {
      cursor: not-allowed;
      background: transparent;
    }
  }

  &::-webkit-slider-runnable-track {
    height: 0.75rem;
    /* cursor: pointer; */
    background: var(--teal-300);
    border-radius: .25rem;
  }
}
```

- 移动端适配
  - 移动端问题好多, 感觉如果想适配移动端的话, 还不如再写一套移动端的样式...
  - 安卓端（Chrome）打开 DModal, 向上滑屏, 浏览器地址栏会隐藏, 导致下方出现一小块未遮盖区域
    - 应该可以在开启状态中禁用滑屏, 但还是看看有没有更好的解决办法 
    - https://discourse.webflow.com/t/chrome-url-bar-scrolling-on-mobile/126334
    - https://developer.chrome.com/blog/url-bar-resizing/
    - https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html
    - https://bokand.github.io/demo/urlbarsize.html
  - (Chrome for Android) 第一次加载 `tableWidth` 比实际小, 怀疑是 Layout Shifting
  - `watchEffect` 没用
  - `onBeforeUpdate` 有用，但我不希望每次更新都赋值, 毕竟样式加载完全后, `tableWidth` 就不会变了
  - 看到说可以使用 ResizeObserver, 参考：
    - https://stackoverflow.com/questions/61112367/offsetwidth-of-element-seems-to-change-randomly
    - https://stackoverflow.com/questions/66282539/observe-size-change-of-element
    - https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver
    - https://web.dev/resize-observer/

```js
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const { contentRect } = entry
      console.log('Element:', entry.target)
      console.log(`Element padding: ${contentRect.top}px ; ${contentRect.left}px`)
      console.log(`Element size: ${contentRect.width}px x ${contentRect.height}px`)
      tableWidth.value = Math.ceil(contentRect.width)
    }
  })
  // Observe one or multiple elements
  resizeObserver.observe(table.value as HTMLTableElement)
```

- 尝试 i18n
