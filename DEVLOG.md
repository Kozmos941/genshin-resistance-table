# Development Log

记录遇到的问题及心路历程

- [Development Log](#development-log)
  - [TO LEARN](#to-learn)
    - [Vue](#vue)
    - [SvelteKit](#sveltekit)
    - [CSS](#css)
      - [Media Query](#media-query)
    - [TypeScript](#typescript)
    - [Web Storage](#web-storage)
  - [Configuration](#configuration)
    - [Vite](#vite)
    - [TypeScript](#typescript-1)
    - [ESLint](#eslint)
  - [Deployement](#deployement)
    - [Vercel](#vercel)
    - [Netlify](#netlify)
    - [Domain](#domain)
      - [How to use](#how-to-use)
      - [DNS Related](#dns-related)
    - [Cloudflare](#cloudflare)
      - [DNS Records](#dns-records)
      - [Email Routing](#email-routing)
      - [Pages](#pages)
  - [Done](#done)
  - [Legacy](#legacy)
    - [Web Font Loader](#web-font-loader)

## TO LEARN

- 使用 React, Svelte 编写项目
  - 使用 SvelteKit + Svelte 基本复刻完成
    - 了解 SSR (Server Side Render)
  - 使用 Vite + React 实现了表格, 功能待实现
- 了解 Web Worker, Unit Test 等的用法及作用

### Vue

- [Template Ref](https://vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs)
  - 如何在 Component 上配合 `<script setup lang="ts">` 使用
  - `defineExpose({})` 传入的是 `{}`, 第一次用没注意, 一直获取不到实例
  - 嵌套太麻烦, 改用 Pinia 存储, 该方案废弃

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

- [Event Handling](https://vuejs.org/guide/essentials/event-handling.html#event-modifiers)
  - Modifiers

| modifiers | native                  |
| --------- | ----------------------- |
| .stop     | Event.stopPropagation() |
| .prevent  | Event.preventDefault()  |

- v-model

### SvelteKit

- SSR (Server Side Render)

### CSS

- [禁用选择](https://stackoverflow.com/a/4407335/15369811)
  - `user-select: none;`

- 改变选中区域的背景色 
  - `::selection { background: #000; }`

- Flexbox
  - 如何控制单个盒子大小, 比如某些固定, 某些自适应
    - [Controlling flex item ratios](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax)
    - 还是有点问题, 比如在 Chrome 一行能装下的两个元素, 在 Firefox 中不能从而会换行。

- Grid Layout
  - 在 `DModal.vue` 组件中试了下

- [禁用双触缩放](https://stackoverflow.com/a/53236027/15369811)
  - `touch-action: manipulation;`

```html
<button style="
    --tooltip-string: 'Ug. Tooltips.';
    --tooltip-color: #f06d06;
    --tooltip-font-size: 11px;
    --tooltip-top: -10px">
  Button
</button>
```

#### Media Query

- [Media Query Styles Not Overriding Original Styles](https://stackoverflow.com/a/47258781/15369811)
  - You need to link the media query file (queries.css) later than the normal css file (style.css).

- [CSS Nesting Syntax](https://drafts.csswg.org/css-nesting-1/#conditionals)

### TypeScript

- 找个时间深入学习下语法、类型等

### Web Storage

- Cookie
  - 原来 `arp_scroll_position` 这个 cookie 是 Chrome Extension 设置的
    - arp 即 Auto Refresh Plus

- IndexedDB
  - 感觉原生 API 好麻烦啊, 先使用 `localforage`

## Configuration

项目换成 TypeScript 了, 顺便尝试了一些插件

### Vite

- alias

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

- define

```ts
// vite-env.d.ts
declare const __APP_VERSION__: string

// vite.config.ts
define: {
  __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
},
```

- PostCSS

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


## Deployement

### Vercel

- [Ignored Build Step](#https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel)
  - 每次 `git push`, Vercel 都会生成一个 Preview Deployment
  - 如下配置可以只对 `main` branch 上的 push 进行 build 

```bash
if [ "$VERCEL_GIT_COMMIT_REF" == "main" ]; then exit 1; else exit 0; fi
```

### Netlify

- 没看到 Preview, 不能像 Vercel 自定义多个域名, 但好在没被 GFW

- [Status badges](https://docs.netlify.com/monitor-sites/status-badges/)

### Domain

- 注册了个域名, 目前不是很清楚具体是怎么运作的
- 据说把域名给 Cloudflare 代理可以避免被墙

#### How to use

- 将域名给 Cloudflare 代理
  - 将域名注册商那里的 Nameserver, 修改成 Cloudflare 提供的
    - 修改之后, 就不能在注册商那里 Manage DNS 了
  - 修改成功后, 在 Cloudflare 会看到如下所示
    - 但好像还是得等个一天才能正常使用

```
Great news! Cloudflare is now protecting your site
Data about your site's usage will be here once available.
```

- 添加 DNS Recordss
  - 在 Cloudflare 这边添加 Record, 对应地, 在网站托管服务那边也要添加 Domain
  - 如果不是使用 Cloudflare Pages 托管, 可能还要打开 SSL/TLS
    - (How do I use a Cloudflare domain with Vercel?)[https://vercel.com/guides/using-cloudflare-with-vercel]
    - (How do I resolve "err_too_many_redirects" when using a Cloudflare proxy with Vercel?)[https://vercel.com/guides/resolve-err-too-many-redirects-when-using-cloudflare-proxy-with-vercel]

#### DNS Related

- Command Line

```cmd
# 查询 DNS
> nslookup [DOMAIN]
Non-authoritative answer:
Name:    [DOMAIN]
Addresses:  [IPADDRESS1]
          [IPADDRESS2]

# 刷新 DNS 缓存
> ipconfig/flushdns
```

- Chrome
  - Ctrl + Shift + R
  - Shift + F5

### Cloudflare

#### DNS Records

- [Types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/)
  - IP address resolution
    - A & AAAA records map a domain name to one or multiple IPv4 or IPv6 address(es).
    - CNAME records map a domain name to another (canonical) domain name.
  - Email authentication
    - A mail exchange (MX) record is required to deliver email to a mail server.
  - Specialized records
    - A text (TXT) record lets you enter text into the DNS system.

- [TTL](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/)

#### Email Routing
- 邮件转发, 设置后自动配置 DNS Record

| Record type | Hostname | Priority |                   Value                    | Status |
| :---------: | :------: | :------: | :----------------------------------------: | :----: |
|     MX      |    @     |    88    |          route1.mx.cloudflare.net          | Added  |
|     MX      |    @     |    73    |          route2.mx.cloudflare.net          | Added  |
|     MX      |    @     |    82    |          route3.mx.cloudflare.net          | Added  |
|     TXT     |    @     |          | v=spf1 include:_spf.mx.cloudflare.net ~all | Added  |

#### Pages

## Done

- 第一次加载网页, 截图会少差不多一列
  - 疑似加载字体后出现的 Layout Shifting 让 `table` 的 `offsetWidth` 比字体渲染前大了
  - 直接设置一个固定宽度 `width: 1200;`, 暂时解决了

- 无穷符号 ∞, 字体都没这个符号, 看上去不和谐
  - 使用 Emoji ♾️ 可惜不能改变颜色
  - 试着用 `transform: rotate(-90degree)` 将全角 `８` 旋转
    - 网页看上去没问题, 但截图中 `td` 的 `border` 也旋转了
    - 貌似是 html2canvas 不支持 `transform`
  - 原来是字体名打错了, Noto 字体是有这个符号的, 虽然感觉还是小了点, 但看上去和谐多了

- 下载按钮要对齐表格左上角,  用 `html2canvas` 转换 `<table>` 时图片上不能有按钮
  - 这意味着不能把 `<button>` 作为 `<table>` 的子结点, 从而使用 `position: absolute`
  - 利用 `onresize` 监听 `<table>` 的 `left` 属性, 并通过 [v-bind in CSS](https://vuejs.org/api/sfc-css-features.html#v-bind-in-css) 给 `<button>`
  - 做完后反应过来了, 根本不用那么麻烦, 直接 `<table>` 外再套一层一样宽的 `<main>` 的就行了

- JSON.stringify(value[, replacer [, space]])
  - 之前生成的数据写入文件后只有一行, 每次 git diff 都是整个文件
  - 发现 stringify 可以返回 formatted 的数据, 顺便改用 replacer 来去除被 rowspan 覆盖掉的列

- `merge.js` 
  - 想改用 TypeScript, 这样就能直接从 `config.ts` 导入
    - tsc 无法识别 Vite 中定义的 `__APP_VERSION__`
    - ts-node 会报错...
    - 查了很多方法都无法解决, 暂时搁置
  - 可以传一个 `noSpan` 的参数来生成结构完整的数据
    - 可以传 `both` 同时生成两种数据...
  - 试一试 JSON-Server

- Sider
  - 样式想实现每次刷新 `div:hover` 都是随机的颜色
    - Inline Style 不能设置 :hover
    - CSS attr() 只能和 content 一起使用
    - 最后发现了[这个](https://stackoverflow.com/a/50551202/15369811) (从HTML给CSS传值, 这是什么黑科技)
  - 使用[事件委托](https://javascript.info/event-delegation)

- 尽量不使用 CSS/UI framework, Vuex 等
  - 了解下如何实现一个简单的状态管理
    - 可以用 `reactive()` API [State Management](https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api)
  - 所以最后还是用了 Pinia

## Legacy

### Web Font Loader

- 想使用 `Web Font Loader` 但 Android 端字体完全没加载（Chrome, Firefox）, 原因不明
  - [GitHub](https://github.com/typekit/webfontloader#get-started) 教程上是 `1.6.26`, 换成 [jsdelivr](https://www.jsdelivr.com/package/npm/webfontloader) 上的 `1.6.28` 移动端也加载字体了

```html
<!-- Web Font Loader -->
<!-- Embed -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap">
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200;300;400;500;600;700;900&family=Noto+Sans+SC:wght@100;300;400;500;700;900&display=swap">

<!-- Async -->
<script>
  WebFontConfig = {
    google: {
      families: [
        'Noto Serif SC:200,300,400,500,600,700,900',
        'Noto Sans SC:200,300,400,500,600,700,900',
        'Poppins:0,100,0,200,0,300,0,400,0,500,0,600,0,700,0,800,0,900,1,100,1,200,1,300,1,400,1,500,1,600,1,700,1,800,1,900',
      ],
      text: ``
    }
  };
  (function (d) {
    var wf = d.createElement('script'), s = d.scripts[0];
    wf.src = 'https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.min.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
  })(document);
</script>
```
