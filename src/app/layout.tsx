import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Life Numerology | 生命数字计算器',
  description: '专业的毕达哥拉斯生命数字报告生成工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400">
        {children}
      </body>
    </html>
  )
}
