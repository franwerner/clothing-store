const ProductDiscountBand = ({ discount }: { discount: number }) => (
    <div
        style={{ top: "19px", left: "-66px" }}
        className="absolute group-hover:bg-default-900 w-48 text-center  z-10 bg-default-800  -rotate-45 "
    >
        <h3 className="text-white p-[1px]">{discount}% OFF</h3>
    </div>
)


export default ProductDiscountBand