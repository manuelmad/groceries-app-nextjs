// import { Inter } from "next/font/google";
import { Playpen_Sans } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

const playPenSans = Playpen_Sans({
    subsets: ['latin'],
    weight: '400',
  }
);

export const metadata = {
  title: "Lista de compras",
  description: "Web App to create a list of groceries and share it",
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>{/*Agrego la etiqueta head aquí para poder agregar la etiqueta meta de http-equiv, la cual no está soportada por Next JS*/}
      </head>
      <body className={playPenSans.className}>{children}</body>
    </html>
  );
}
