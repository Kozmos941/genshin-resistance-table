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
  { race:'A', raw:[ {...}, ...] },
  { race:'B', raw:[ {...}, ...] },
  ...
]
```

2. `flattedData()` 将每项数据处理成无嵌套的形式，设置给定值，没有则设置默认值，将各行 `rowspan` 记录在全局对象 `_` 中

```js
[
  {
    race: 'A',
    name: 'aaaa',
    state: '1',
    correspond: 'infinity',
    electro: 10,
    pyro: 10,
    hydro: 10,
    cryo: 10,
    dendro: 10,
    anemo: 10,
    geo: 10,
    physical: 50
  },
  { race: 'A', name: 'aaaa', state: '2', ... },
  { race: 'A', name: 'bbbb', state: null, ... }, 
  // ...
  { race: 'B', name: 'xxxx', state: null, ... }
]
```

3. 种族和怪物都要设置 rowspan，`tableData()` 把不需要的 `race`和 `name` 删除

```js
[
  { race: 'A', name: 'aaaa', state: '1', ... },
  { state: '2', ... },
  { name: 'bbbb', state: null, ... },
  // ...
  { race: 'B', name: 'xxxx', state: null, ... }
]
```

