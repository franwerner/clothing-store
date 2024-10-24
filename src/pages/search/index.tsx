import ActionButton from "@/components/ActionButton"
import AnimatedTitle from "@/components/AnimatedTitle"
import DeferLoader from "@/components/DefererLoader"
import PageWrapper from "@/components/PageWrapper"
import ProductCard from "@/containers/product"
import { productsTest1 } from "@/mocks/products.mocks"
import { Await, ScrollRestoration, useAsyncValue, useLoaderData } from "react-router-dom"


const Test = () => {
  const { products } = useAsyncValue() as {products:[{id:number,title:string}]}

  return productsTest1.map(i => <ProductCard key={i.id} {...i}/>)
}

const SearchPage = () => {

  const data = useLoaderData() as { res: Promise<Array<any>> }

  return (
    <PageWrapper>
      <AnimatedTitle title="Resultados" />
      <Await resolve={data.res}>
        <DeferLoader>
          <main className="flex flex-col flex-1">
            <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-1 xs:gap-6 md:gap-4  ">
              <Test />
            </div>
            <div className="flex-1 flex justify-center p-4">
              <ActionButton>
                Cargar más productos
              </ActionButton>
            </div>
          </main>
        </DeferLoader>
      </Await>
      <ScrollRestoration />
    </PageWrapper>
  )
}

export default SearchPage