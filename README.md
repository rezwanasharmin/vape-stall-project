# Vape Stall UAE — Frontend Web Application

An e-commerce frontend replica of [vapstall.ae](https://vapstall.ae/), built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## 🌟 Key Features

- **100% Faithful Content**: Retains authentic product titles, AED prices, descriptions, and UAE customer care info directly from Vape Stall.
- **Local Asset Storage**: All product pictures, category banners, and brand assets are stored locally in `public/images/` with Next.js image optimization.
- **Cart & State Management**: Fully functional shopping cart drawer with quantity controls, subtotal calculator, free UAE delivery progress bar, and persistent `localStorage`.
- **21+ Age Verification Gate**: Modal prompt complying with UAE tobacco and vape age regulations.
- **Shop & Filtering**: Filter products by category, brand, or search keyword, with multiple sort options.
- **Product Detail Page**: High-resolution image preview, flavor selector, puff and nicotine specs, related items, and direct WhatsApp order button.
- **UAE Cash on Delivery Checkout**: Realistic order form covering all 7 Emirates with confirmation screen.
- **Direct WhatsApp Chat Integration**: Fast floating button connected to Vape Stall UAE customer support hotline (+971 55 168 8299).

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: React Context API + LocalStorage

## 🚀 Getting Started

First, install the dependencies:

```bash
pnpm install
# or
npm install
```

Run the development server:

```bash
pnpm run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
public/
  └── images/          # Local product images, categories, and logos
src/
  ├── app/             # Next.js App Router pages (Home, Shop, Product, Cart, Checkout, etc.)
  ├── components/      # Modular UI components (Layout, Home, Product, Cart, Common)
  ├── context/         # Cart and state management
  ├── data/            # Mock dataset with authentic Vape Stall UAE products
  └── types/           # TypeScript interfaces and definitions
```
