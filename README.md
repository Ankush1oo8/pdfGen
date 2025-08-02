# ResumeMate

A modern, user-friendly resume PDF generator built with Next.js, React, and Tailwind CSS.

## Features

- Beautiful, responsive UI
- Live preview of your resume
- Download your resume as a PDF
- Customizable fields: Name, Email, Phone, Position, Description
- SVG icons for a professional look
- Gradient buttons and modern design

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
# or
npm install
```

### Development

```bash
pnpm dev
# or
npm run dev
```

### Build for Production

```bash
pnpm build
# or
npm run build
```

## Usage

1. Fill in your details in the form fields.
2. Click **View PDF** to preview your resume.
3. Click **Download PDF** to save your resume as a PDF file.

## Screenshots

<!-- Add screenshots of the form and preview pages below -->

![Form Page](screenshots/form-page.png)

![Preview Page](screenshots/preview-page.png)

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [jsPDF](https://github.com/parallax/jsPDF)

## Folder Structure

```
components/      # Reusable UI components
contexts/        # React context for form data
hooks/           # Custom React hooks
lib/             # Utility functions (PDF generation, etc.)
public/          # Static assets (SVG icons, etc.)
styles/          # Global styles
app/             # Next.js app directory (pages, layouts)
```

## License

MIT

---


