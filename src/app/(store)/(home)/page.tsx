import Link from "next/link";
import Image from "next/image";
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Metadata } from "next";

//Cache & memoization
//reutilização de dados 


async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured', { //armazenar a requisiçao no cache, tempo indeterminado
    next: {
      revalidate: 60 * 60, //quando a primeira requisição for feita, os dados vão ser salvos em cache apenas 1 hora, todos que fizerem essa requisição acessaram esse cache
    }
    // cache: 'force-cache' armazena o cache
    // cache: 'no-store' não armazena para páginas de constante atualização
  })

  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: "Home"
}

export default async function Home() {

  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts() //pega o primeiro produto que é o maior, e adiona os demais no outro array

  return (
    <>
      <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
        <Link href={`/product/${highlightedProduct.slug}`}
          className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex items-end justify-center">

          <Image
            src={highlightedProduct.image}
            alt="moletom"
            width={920}
            height={920}
            quality={100}
            className="group-hover:scale-105 transition-transform duration-500 "
          />

          <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] 
          rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{highlightedProduct.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">{highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}</span>
          </div>

        </Link>

        {otherProducts.map(product => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex items-end justify-center">

              <Image
                src={product.image}
                alt="moletom"
                width={920}
                height={920}
                quality={100}
                className="group-hover:scale-105 transition-transform duration-500 "
              />

              <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] 
          rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="text-sm truncate">{product.title}</span>
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">{product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0
                })}</span>
              </div>

            </Link>
          )
        })}
      </div>
    </>
  );
}
