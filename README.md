# ✦ Mayank Pandey — Portfolio

<div align="center">

<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Bun-1.x-black?style=for-the-badge&logo=bun" />

<br />

### Modern • Responsive • Fast • Developer-focused

A personal portfolio website built with **Next.js, TypeScript, Tailwind CSS, and MDX** to showcase my projects, skills, experience, and technical journey.

<br />

<a href="https://portfolio-mayank-dev.vercel.app/">
  <img src="https://img.shields.io/badge/🌐_Live_Portfolio-Visit_Website-black?style=for-the-badge" />
</a>

<a href="https://github.com/Mayank-Pandey7">
  <img src="https://img.shields.io/badge/GitHub-Mayank--Pandey7-181717?style=for-the-badge&logo=github" />
</a>

</div>

---

## ✨ About

This is my personal developer portfolio, created to present my work and experience through a clean, modern, and responsive interface.

The website includes dedicated sections for my:

- 👨‍💻 Introduction
- 🛠️ Technical Skills
- 💼 Experience
- 🚀 Projects
- ✍️ Blog
- 📊 GitHub Activity
- 📬 Contact
- 🔗 Social Profiles

The project is designed with a strong focus on **performance, accessibility, responsive design, SEO, and maintainable code**.

---

## 🎯 Highlights

| Feature          | Description                                   |
| ---------------- | --------------------------------------------- |
| ⚡ Next.js       | Modern App Router architecture                |
| 🎨 Responsive UI | Optimized for desktop, tablet & mobile        |
| 🌙 Theme Support | Dark & light mode                             |
| 📝 MDX           | Markdown-based blog/content system            |
| 🚀 Performance   | Optimized modern React/Next.js architecture   |
| 🔍 SEO           | Metadata and search-engine friendly structure |
| 📊 Analytics     | Website analytics integration                 |
| 🧹 Code Quality  | ESLint, Prettier & lint-staged                |
| 🐶 Git Hooks     | Husky pre-commit workflow                     |
| 🔄 CI/CD         | GitHub Actions support                        |

---

## 🖥️ Preview

<div align="center">

### Home

<img src="./public/assets/home.png" alt="Portfolio Home" width="900" />

### Projects

<img src="./public/assets/projects.png" alt="Portfolio Projects" width="900" />

### Blog

<img src="./public/assets/blog.png" alt="Portfolio Blog" width="900" />

</div>

> **Note:** Replace the screenshot paths above with your actual screenshot filenames if they are different.

---

## 🛠️ Tech Stack

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss)
![MDX](https://img.shields.io/badge/MDX-1B1F24?style=flat-square&logo=mdx)

### Tools & Workflow

![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github)
![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions)

---

## 🧩 Features

### 🎨 Modern UI

Clean and minimal interface with a focus on readability, usability, and visual hierarchy.

### 📱 Responsive Design

The website adapts to different screen sizes:

- Desktop
- Laptop
- Tablet
- Mobile

### 🌙 Dark / Light Mode

Users can switch between dark and light themes for a comfortable browsing experience.

### 📝 MDX Content

Blog posts and content can be written using Markdown/MDX, making content management simple and developer-friendly.

### 🚀 Project Showcase

Projects are presented with relevant information including:

- Description
- Technologies
- Features
- Links
- Project details

### 📊 GitHub Activity

The portfolio includes a GitHub activity section to showcase my development consistency and contribution history.

### 🔎 SEO

The project follows modern SEO practices using Next.js metadata and structured page architecture.

### 📈 Analytics

Analytics integration helps understand website traffic and visitor engagement.

---

## 📂 Project Structure

```text
portfolio-main/
│
├── .github/
│   └── workflows/
│
├── .husky/
│   └── pre-commit
│
├── public/
│   ├── assets/
│   ├── images/
│   └── ...
│
├── src/
│   ├── app/
│   ├── components/
│   ├── content/
│   ├── config/
│   ├── lib/
│   └── ...
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- Bun
- Git

### Clone the repository

```bash
git clone https://github.com/Mayank-Pandey7/portfolio-main.git
```

### Enter the project

```bash
cd portfolio-main
```

### Install dependencies

Using Bun:

```bash
bun install
```

Or npm:

```bash
npm install
```

### Start development server

Using Bun:

```bash
bun dev
```

Or npm:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory if your local configuration requires environment variables.

```env
# Example

NEXT_PUBLIC_...
...
```

> Never commit `.env.local` or other files containing secrets.

---

## 📝 Adding Blog Posts

The portfolio uses MDX for content.

A typical post can look like:

```mdx
---
title: 'My New Blog Post'
description: 'A short description of the article.'
date: '2026-08-02'
---

# My New Blog Post

Write your content here.
```

You can use Markdown as well as supported React/MDX components.

---

## 🔧 Development Commands

| Command       | Description              |
| ------------- | ------------------------ |
| `bun dev`     | Start development server |
| `bun build`   | Create production build  |
| `bun start`   | Start production server  |
| `bun lint`    | Run ESLint               |
| `bun install` | Install dependencies     |

Using npm is also supported where corresponding scripts are available.

---

## 🧪 Code Quality

This project uses automated development tools to maintain code quality.

### ESLint

Used for identifying code-quality and JavaScript/TypeScript issues.

### Prettier

Used for consistent formatting.

### Husky

Git hooks help run checks before commits.

### lint-staged

Runs configured checks only on staged files.

This helps prevent unnecessary formatting and linting issues from reaching the repository.

---

## 🌐 Deployment

The portfolio is deployed using **Vercel**.

### Live Website

<div align="center">

<a href="https://portfolio-mayank-dev.vercel.app/">

<img src="https://img.shields.io/badge/🚀_Visit_Live_Portfolio-portfolio--mayank--dev.vercel.app-black?style=for-the-badge" />

</a>

</div>

### Deploy Your Own

1. Fork this repository.
2. Clone it locally.
3. Push it to your GitHub account.
4. Import the repository into Vercel.
5. Configure required environment variables.
6. Deploy.

---

## 🤝 Contributing

This repository primarily contains my personal portfolio, but suggestions and improvements are welcome.

To contribute:

```bash
git checkout -b feature/your-feature
```

Make your changes, commit them, and open a pull request.

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting a contribution.

---

## 📄 License

This project is licensed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

### Mayank Pandey

Computer Science & Engineering student and software developer passionate about building modern web applications and improving software engineering skills.

<br />

<a href="https://portfolio-mayank-dev.vercel.app/">
<img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

<a href="https://github.com/Mayank-Pandey7">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

</div>

---

## ⭐ Support

If you found this project useful or inspiring, consider giving the repository a ⭐.

<div align="center">

### Thanks for visiting! 🚀

**Built with ❤️ using Next.js & TypeScript**

</div>
