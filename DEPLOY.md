# 个人网站部署指南

## 📁 文件结构
```
d:\cc test\
├── index.html          # 主页面
├── style.css          # 样式表
├── script.js          # 主交互脚本
├── toolbar.js         # AI工具栏脚本
├── chatbot.js         # 聊天机器人脚本
├── test.html          # 功能测试页面
└── DEPLOY.md          # 部署说明
```

## 🚀 部署到 GitHub Pages

### 步骤 1：创建 GitHub 仓库
1. 登录 GitHub，点击右上角 "+" → "New repository"
2. 仓库名：`bu-xiao-site`（或自定义）
3. 描述：`Bu Xiao 的个人网站 - AI 训练师 / AGI 探索者`
4. 选择 Public（公开）
5. 不要初始化 README、.gitignore 或 license
6. 点击 "Create repository"

### 步骤 2：上传文件到 GitHub
```bash
# 初始化本地仓库
git init
git add .
git commit -m "初始提交：Apple 极简风格个人网站"

# 连接到远程仓库
git remote add origin https://github.com/你的用户名/bu-xiao-site.git
git branch -M main
git push -u origin main
```

### 步骤 3：启用 GitHub Pages
1. 进入仓库 Settings → Pages
2. Source：选择 `main` 分支
3. Folder：选择 `/ (root)`
4. 点击 Save

### 步骤 4：访问网站
等待几分钟后，访问：`https://你的用户名.github.io/bu-xiao-site`

## 🎨 自定义内容

### 修改个人信息
1. **姓名与头衔**：编辑 `index.html` 第 29、53-56 行
2. **个人故事**：编辑 `index.html` 第 75-91 行（时间线内容）
3. **项目展示**：编辑 `index.html` 第 150-201 行（项目卡片）
4. **联系方式**：编辑 `index.html` 第 199-211 行（社交链接）

### 更换图片
1. **项目图片**：替换 `.project-image-placeholder` 为 `<img src="your-image.jpg">`
2. **个人头像**：可在 Hero 区域添加头像元素

### 调整样式
1. **主题色**：修改 `style.css` 第 15 行 `--color-accent`
2. **字体大小**：调整 `:root` 中的 `--font-size-*` 变量
3. **间距圆角**：修改 `--spacing-*` 和 `--border-radius-*` 变量

## 🔧 功能说明

### 1. 主题切换
- 位置：导航栏右侧按钮（🌓）
- 功能：点击切换浅色/深色主题
- 存储：自动保存到 localStorage
- 响应式：移动端自动调整

### 2. 滚动效果
- **进度条**：导航栏上方显示滚动进度
- **视差滚动**：Hero 区域几何图形随滚动移动
- **交错动画**：元素按顺序淡入显示
- **平滑滚动**：导航锚点跳转顺滑

### 3. AI 智能工具栏
- **位置**：右下角可拖动工具栏
- **功能**：
  - 拖拽移动（标题栏）
  - 展开/收起（▼按钮）
  - 主题切换、回到顶部、分享、聊天
- **聊天机器人**：
  - 基于规则的对话系统
  - 支持 AI、技术、网站相关话题
  - 对话历史保存到 localStorage

### 4. 新增内容版块
- **技能专长**：进度条展示专业技能
- **技术栈**：标签云展示工具与技术

## 📱 响应式设计
- **桌面端** (>1024px)：完整功能，最佳体验
- **平板端** (768-1024px)：布局调整，功能完整
- **手机端** (<768px)：单列布局，触摸优化

## 🧪 功能测试
1. 打开 `test.html` 进行基本功能检查
2. 或直接测试以下功能：
   - 主题切换按钮
   - 滚动效果
   - 工具栏拖拽与功能
   - 聊天机器人回复
   - 新内容版块显示

## ⚡ 性能优化
- 使用 CSS transform 优化动画性能
- 图片懒加载（如需添加图片）
- 代码分割（已按功能模块化）
- localStorage 数据管理

## 🐛 常见问题

### Q1：GitHub Pages 不显示样式
- 检查文件路径是否正确
- 确保所有文件已上传到 main 分支根目录
- 等待 GitHub Pages 构建完成（约 1-5 分钟）

### Q2：工具栏无法拖拽
- 确保 `toolbar.js` 已正确加载
- 检查浏览器控制台是否有错误
- 尝试清除浏览器缓存

### Q3：聊天机器人不回复
- 检查 `chatbot.js` 是否加载
- 查看控制台是否有 JavaScript 错误
- 确保输入消息后按 Enter 或点击发送

### Q4：移动端显示异常
- 检查 viewport 设置
- 测试不同尺寸的设备
- 确保响应式 CSS 正确应用

## 📞 技术支持
如有问题，请：
1. 检查浏览器控制台错误信息
2. 查看 GitHub Pages 构建日志
3. 参考代码中的中文注释进行调试

## 🎯 后续扩展建议
1. **博客系统**：添加 Markdown 文章支持
2. **项目详情页**：为每个项目创建独立页面
3. **多语言支持**：添加英文版本
4. **数据分析**：集成 Google Analytics
5. **评论系统**：添加访客留言功能

---

**最后更新**：2024年3月13日
**技术栈**：HTML5 + CSS3 + Vanilla JavaScript
**设计风格**：Apple 极简美学 + 毛玻璃效果
**兼容性**：现代浏览器（Chrome、Firefox、Safari、Edge）