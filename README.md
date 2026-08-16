# dsh-web-mobile

DeepSeek Harness Web UI 移动端适配:窄屏(≤768px)下设置弹窗变为整屏 sheet、左侧导航栏变为顶部横向条,详情面板变为整屏抽屉(悬浮按钮开合);桌面端(>768px)保持与未安装时一致。纯 client 插件。

[![Release v0.1.0](https://img.shields.io/badge/release-v0.1.0-5B4CF0?style=flat-square)](package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-0B7285?style=flat-square)](LICENSE)
[![DSH](https://img.shields.io/badge/DSH-Web%20Profile-5B4CF0?style=flat-square)](cordis.patch.yml)

## 特性

- **设置界面整屏**:官方 800px 双栏弹窗在手机上改为整屏 sheet——无圆角、无留边,`100dvh` 自适应地址栏收起/展开,`env(safe-area-inset-*)` 避开刘海;左侧 188px 导航栏变为顶部横向滚动条,内容区占满剩余空间;
- **详情面板抽屉**:官方布局在窄屏会把右侧详情列强制压成 0px(内置 `openDetails()` 无法显示),本插件用悬浮按钮(⋯)把它切换为整屏抽屉,右上角 ✕ 关闭;
- **防 iOS 输入框自动放大**:`input/textarea/select` 字号 ≥16px,聚焦时不触发自动缩放;
- **桌面端无感**:所有改动都在 `@media (max-width: 768px)` 内,桌面端与未安装时一致。

## 安装

```sh
dsh plugin --profile web add github:brisyramshere/dsh-web-mobile
```

仓库自带构建产物,一条命令直接安装,无 `allowBuilds` 拦截。装完重启 `dsh web`。

npm 安装:

```sh
dsh plugin --profile web add @brisyramshere/dsh-web-mobile
```

本地开发:`dsh plugin --profile web add link:/path/to/dsh-web-mobile`

## 构建

```sh
pnpm install
pnpm build
```

产物 `lib/` 与源码同步入库,改动源码后重新构建再提交。

## 验证

- `pnpm verify` 类型检查;`dsh --profile web --dump-config` 应出现插件层;
- 移动端(≤768px):设置弹窗整屏、导航条横排、详情抽屉开合/关闭;
- 桌面端(>768px):与未安装时一致。

## 兼容性

需要 `:has()`(Chromium 105+);`prefers-reduced-motion: reduce` 下自动禁用动画。

## License

[MIT](LICENSE)
