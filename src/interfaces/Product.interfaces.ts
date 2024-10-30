import Product from "@/pages/product-fullview"

interface Product {
  id: number,
  name: string,
  discount?: number,
  price: number,
  brand: string,
  category: string
}

interface ProductPreview extends Product {
  image: string,
  stock: boolean,
  color: string,
}

interface ProductShopcart extends Product {
  quantity: number,
  size: string | number,
  color: string,
  image: string,
  colorID: number,
  waistID: number
}

interface ProductVariant {
  colorID: number
  waists: Array<{
    waistID: number,
    size: string | number
    stock: boolean
  }>
  images: Array<{
    imageID: number,
    url: string
  }>
  color: string
  hexadecimal: string
}

interface ProductFullPreview extends Product {
  variants: Array<ProductVariant>
}

export type {
  ProductPreview,
  ProductShopcart,
  ProductVariant,
  ProductFullPreview
}
export default Product