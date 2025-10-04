// Layout para seção da loja, tudo que estiver dentro de /store/* vai usar esse layout

import { CartProvider } from "@/context/cart-context";
import Header from "../../components/header";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[min-content_max-content] gap-5 px-8 py-8">
        <Header />
        {children}
      </div>
    </CartProvider>
  );
}