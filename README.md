# genshin-resistance-table

 原神怪物抗性表

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
      "particular": {
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
| particular |     ❌     |        Object        |     null     | 特殊情况下的抗性 |
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
      "particular": {
        "correspond": "30"
      }
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

## 截图

- 使用 `html2canvas` 实现截图功能
  - PC 端缩放默认为 1.25，移动端为 1

- 在 devtool 中可使用 `setScale(NUM)` 自定义缩放 (NUM 最大为 5)
  - 待测试功能，可能存在问题

## 问题

- 若第一次加载网页，截图会少差不多一列（可通过无痕模式模拟第一次加载）
  - 貌似是因为字体渲染导致的 Layout Shifting 让 `table` 的 `offsetWidth` 比字体完全渲染后的小
  - 直接设置一个固定宽度 `width: 1200`，好像解决了

- 无穷符号 ∞，好多字体都没这个符号，看上去不和谐
  - 使用 Emoji ♾️ 可惜不能改变颜色
  - 试着用 `transform: rotate(-90degree)` 将全角 `８` 旋转
    - 网页看上去没问题，但截图中 `td` 的 `border` 也旋转了
    - 貌似是 html2canvas 的问题
  - 之前字体名打错了，Noto 字体其实是有这个符号的，虽然看上去还是小了，但个人已经可以接受了。

- 想使用 `Web Font Loader` 但 Android 端字体完全没加载（Chrome, Firefox），原因不明
  - [GitHub](https://github.com/typekit/webfontloader#get-started) 教程上是 `1.6.26`，换成 [jsdelivr](https://www.jsdelivr.com/package/npm/webfontloader) 上的 `1.6.28` 移动端也加载字体了

```html
<!-- Web Font Loader -->
<!-- <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.min.js" ></script>
<script>
  WebFont.load({
    google: {
      families: [
        'Poppins:0,100,0,200,0,300,0,400,0,500,0,600,0,700,0,800,0,900,1,100,1,200,1,300,1,400,1,500,1,600,1,700,1,800,1,900',
        'Noto Serif SC:200,300,400,500,600,700,900',
        'Noto Sans SC:200,300,400,500,600,700,900'
      ]
    }
  })
</script>

<!-- Embed -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap">
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200;300;400;500;600;700;900&family=Noto+Sans+SC:wght@100;300;400;500;700;900&display=swap">
```
