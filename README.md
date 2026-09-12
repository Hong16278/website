# Lucas 软件开发 · 官网

Lucas 软件产品矩阵的统一入口。基于选定的蓝白色官网设计，提供首页、产品中心、产品详情、下载中心、帮助中心和关于页面。

## 当前版本

这是第一版可浏览的展示网站，不是已经接通支付的电商系统。当前已适配 AutoMate、鼠标助手、定时消息助手、键盘点击助手和定时截图的已上架版本；识别提醒助手与快捷回复助手仅作开发预览展示。真实安装包、价格、购买链接、联系方式和域名尚未提供，因此不虚构下载量、客户评价、购买链接或备案信息。首页轮播中的软件窗口均为 CSS 制作的界面示意，不是真实软件截图。

## 技术方案

纯 HTML、CSS、原生 JavaScript、JSON 数据和 Nginx。无需 npm、数据库或常驻 Node.js 服务，适合低配置服务器。后续支付与授权可以由独立后端提供 API，网站不应在前端保存支付密钥或授权私钥。

## 本地预览

需要 Python 3：

```bash
python3 deploy/preview.py
```

打开 `http://127.0.0.1:8080`。如端口被占用，可修改预览脚本中的端口。不要把这个开发服务器直接暴露到公网。

## Docker 部署

在已经安装 Docker 和 Docker Compose 插件的 Linux 服务器上：

```bash
git clone https://github.com/Hong16278/website.git
cd website
cp .env.example .env
docker compose up -d --build
docker compose ps
curl http://127.0.0.1:8080/healthz
```

默认只监听服务器本机的 8080 端口，避免和已有服务冲突。已有 Nginx/Caddy 可将域名反向代理到 `http://127.0.0.1:8080`，再为域名配置 HTTPS。不要随意替换服务器现有的反向代理配置。若仅在可信的内网测试，可在 `.env` 中设置 `LUCAS_BIND=0.0.0.0`，并通过防火墙限制访问。

更新网站：

```bash
git pull --ff-only
docker compose up -d --build
```

停止网站：`docker compose down`。此命令不会删除其他 Compose 项目的容器。

## 添加和发布软件

统一编辑 `data/products.json`。每个产品拥有独立 `slug`，形成 `/products/<slug>` 页面。常用字段：

| 字段 | 用途 |
| --- | --- |
| `slug` | 永久且唯一的英文路径，发布后尽量不要修改 |
| `name`, `subtitle`, `description`, `longDescription` | 产品名称与介绍 |
| `category`, `icon`, `color` | 分类、图标和主题色 |
| `features`, `scenarios` | 功能与适用场景数组 |
| `status` | `planned`、`preview` 或 `released` |
| `platform`, `version`, `updatedAt` | 系统要求、版本和更新日期 |
| `downloadUrl` | 已确认的官方安装包 HTTPS 地址 |
| `purchaseUrl` | 正式购买页面地址，未接通时保持空字符串 |
| `documentationUrl` | 预留的产品文档地址 |
| `screenshots` | 真实软件截图 URL 数组 |

`released` 表示已经有可交付的正式上架版本；只有同时填写 `downloadUrl` 才会显示下载按钮。`preview` 只用于不可售的开发预览，`planned` 用于尚未确定的产品方向。`purchaseUrl` 非空时才显示购买授权入口。价格、用户数、下载量等信息不应凭空填写。

新增产品时复制一个 JSON 对象，填写唯一 slug 和真实资料即可自动加入首页、产品中心、下载中心及交叉推荐。提交前用 `python3 -m json.tool data/products.json` 验证 JSON。页面内容会进行 HTML 转义，但下载和购买地址仍应仅由可信维护者配置。

## 官网安装包发布

官网会读取 `data/release-source.json` 指定的公开发布清单。该清单只接受 `https://license.lucas.dpdns.org/downloads/` 下、带版本、文件大小与 SHA-256 的正式安装包。清单暂时不可用时，网站仍会展示产品，但不会显示虚构的下载按钮。

服务器安装包发布说明位于工作区的 `projects/LucasSoftwareKit/docs/服务器下载发布.md`；授权校验和客户端在线更新源仍按原有流程运行。

## 目录

```text
index.html              入口与 SEO 基础信息
assets/app.js           页面、路由、搜索和交互
assets/styles.css       蓝白色响应式设计
assets/favicon.svg      Lucas 图标
data/products.json      产品目录与发布配置
deploy/nginx.conf        静态站、SPA 回退和安全响应头
deploy/preview.py        本地开发预览
Dockerfile              Nginx 容器镜像
compose.yaml            Docker Compose 部署
.env.example            本地绑定与端口配置
```

## 后续接入

优先补齐真实产品截图、安装包、版本号、授权规则和正式联系渠道，再接入 HTTPS、域名、统计、支付与自动发货。支付订单应在服务端校验，授权码由服务端安全生成并交付，不能仅靠前端按钮或客户端回调认定付款成功。正式上线前还需根据实际经营主体、服务器所在地及销售地区处理适用的备案、隐私、消费者权益和软件许可要求。

此项目尚未在你的服务器上部署，Docker 镜像构建与公网访问需在目标环境验证。
