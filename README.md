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

|    key     | required? |         type         |       default       |     meaning      |
| :--------: | :-------: | :------------------: | :-----------------: | :--------------: |
|    name    |     ⭕     |        String        | (required property) |     怪物名称     |
|   states   |    *❌     |        Array         |        null         |     状态列表     |
|   state    |     ❌     |        String        |        null         |       状态       |
|  general   |     ❌     |        Number        |         10          | 通常情况下的抗性 |
| particular |     ❌     |        Object        |        null         | 特殊情况下的抗性 |
| correspond |     ❌     | Number or 'infinity' |        null         |  对应属性的抗性  |
|  electro   |     ❌     |        Number        |    this.general     |    电元素抗性    |
|    pyro    |     ❌     |        Number        |    this.general     |    火元素抗性    |
|   hydro    |     ❌     |        Number        |    this.general     |    水元素抗性    |
|    cryo    |     ❌     |        Number        |    this.general     |    冰元素抗性    |
|   dendro   |     ❌     |        Number        |    this.general     |    草元素抗性    |
|   anemo    |     ❌     |        Number        |    this.general     |    风元素抗性    |
|    geo     |     ❌     |        Number        |    this.general     |    地元素抗性    |
|  physical  |     ❌     |        Number        |    this.general     |     物理抗性     |

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

## 处理

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

## 问题

- 第一次加载，截图会少差不多一列
  - 貌似是因为字体渲染导致的 Layout Shifting 让 `table` 的 `offsetWidth` 比字体完全渲染后的小
  - 直接设置一个固定宽度 `width: 1200`，好像解决了

- 无穷符号 ∞
  - 好多字体都没这个符号，看上去不和谐
  - 试着用 `transform: rotate(-90degree)` 将全角 `８` 逆时针旋转，网页没问题但是截图又出问题了
    - 貌似是 html2canvas 的问题

