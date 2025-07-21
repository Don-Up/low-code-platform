# Low-Code Platform

基于 Next.js 的可视化低代码平台

## 快速开始
```bash
git clone https://github.com/lingziyaonuliya/low-code-platform.git
cd low-code-platform
npm install
npm run dev

## 分支策略
- `main`: 生产稳定分支 (保护状态)
- `feat-Daisy/*`: Daisy开发分支
- `feat-Don/*`: Don开发分支
- `fix/*`: 问题修复分支

## 开发流程
1. 从 `dev` 分支创建新分支:  
   `git checkout -b feat/your-feature-name`
2. 开发完成后推送分支:  
   `git push -u origin feat/your-feature-name`
3. 创建 Pull Request 到 `dev` 分支
4. 通过至少 1 位团队成员的代码审查
5. 使用 `Squash and merge` 合并 PR

## 代码规范
- TypeScript 类型定义必须完整
