# 部署指南

## 方案一：Vercel 部署（推荐，永久免费）

### 部署前准备

项目文件结构：
```
├── opener-v3.html      # 主页面
├── api/
│   └── callDoubao.js   # API代理函数（解决CORS跨域问题）
├── vercel.json         # Vercel配置文件
├── package.json        # 项目配置
└── DEPLOY.md           # 本文件
```

### 方式一：GitHub 导入（推荐新手）

**Step 1: 创建 GitHub 仓库**

1. 访问 https://github.com 并登录
2. 点击右上角 **"+"** → **"New repository"**
3. 填写仓库名称（如 `opener-generator`）
4. 选择 **Private**（私有）或 **Public**（公开）
5. 点击 **"Create repository"**

**Step 2: 上传项目文件**

在新创建的仓库页面：

1. 点击 **"uploading an existing file"**
2. 将本文件夹中的所有文件拖拽到上传区域：
   - `opener-v3.html`
   - `api/` 文件夹（包含 `callDoubao.js`）
   - `vercel.json`
   - `package.json`
3. 点击 **"Commit changes"**

**Step 3: 部署到 Vercel**

1. 访问 https://vercel.com 并登录（推荐用 GitHub 账号登录）
2. 点击 **"Add New..."** → **"Project"**
3. 在 "Import Git Repository" 页面找到并选择刚创建的 GitHub 仓库
4. 点击 **"Import"**
5. 保持默认配置，直接点击 **"Deploy"**
6. 等待 1-2 分钟部署完成
7. 获得永久链接，如：`https://opener-generator.vercel.app`

### 方式二：Vercel CLI（适合命令行用户）

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 进入项目目录
cd /path/to/opener-generator

# 3. 登录 Vercel
vercel login

# 4. 部署
vercel

# 5. 回答问题：
#    - Set up and deploy? → Y
#    - Which scope? → 选择你的账号
#    - Link to existing project? → N
#    - Project name? → opener-generator（或你喜欢的名字）
#    - Directory? → ./
#    - Override settings? → N

# 6. 获得预览链接

# 7. 如果满意，生产部署
vercel --prod
```

---

## 方案二：Netlify 部署（备选）

Netlify 也支持 Serverless Functions（需要付费套餐）。

### 部署步骤

1. 访问 https://app.netlify.com 并登录
2. 点击 **"Add new site"** → **"Deploy manually"**
3. 将整个项目文件夹拖拽上传
4. 等待部署完成
5. Netlify 不原生支持 `/api` 路由，需要额外配置

**注意**：Netlify 免费版不支持 Serverless Functions，建议使用 Vercel。

---

## 方案三：临时分享 - ngrok

适合临时分享给朋友测试，不需要长期托管。

### 安装 ngrok

1. 访问 https://ngrok.com/download
2. 下载 Windows 版本
3. 注册账号获取 Authtoken

### 启动步骤

```bash
# 1. 确保本地服务器正在运行
node server.js

# 2. 在另一个终端启动 ngrok
ngrok http 18083

# 3. 获得公网链接，如：
#    https://xxxx.ngrok-free.app
```

---

## 分享后他人如何使用

1. 打开分享链接
2. 点击右上角 **"API配置"** 按钮
3. 填写自己的：
   - **API Key**：从豆包方舟控制台获取
   - **模型接入点ID**：填写自己的模型ID
4. 选择案例类型，输入主题
5. 点击 **"直接生成"**

---

## 故障排查

### Q: 部署后点击"直接生成"没反应？

**检查项**：
1. 是否正确填写了 API Key 和模型 ID
2. 查看浏览器控制台（F12）是否有报错

### Q: 提示 CORS 错误？

**原因**：API 代理函数未正确部署

**解决**：
1. 确认 `api/callDoubao.js` 文件已上传到 GitHub
2. 确认 `vercel.json` 中有 functions 配置
3. 重新部署：在 Vercel 中点击 **"Deployments"** → **"Redeploy"**

### Q: 如何更新已部署的网站？

1. 修改本地文件
2. 上传到 GitHub
3. Vercel 会自动重新部署

---

## 自定义域名（可选）

在 Vercel 项目设置 → **Domains** 中可以绑定自己的域名。
