# HaloMoon

HaloMoon 是一个使用 Astro 生成的轻量中文静态博客。

## 内容仓库

- 博客源码：[Hole333/HaloMoon](https://github.com/Hole333/HolyLinux)
- Markdown 文章：[Hole333/HaloMoon-Notes](https://github.com/Hole333/HaloMoon-Notes)

Markdown 的父文件夹作为分类，文件路径映射到统一文章栏目：

```text
notes/structured_light/measurement.md → /blog/structured_light/measurement/
```

Windows 双击 `publish-notes.cmd`，Linux 运行 `./publish-notes.sh`，即可自动补齐元数据、推送并部署。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 线上地址

https://www.halomoon.cn/

详细写作说明见 [WRITING.md](./WRITING.md)。
