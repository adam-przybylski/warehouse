import {ProductType} from "../types/ProductType.ts";
import {createContext, ReactNode, useContext, useState} from "react";

interface ProductsState {
    isFetching: boolean;
    setIsFetching: (isFetching: boolean) => void;
    products: ProductType[] | null;
    setProducts: (products: ProductType[] | null) => void;
}

export const ProductsStateContext = createContext<ProductsState | null>(null)

export const ProductsStateContextProvider = ({children}: {children: ReactNode}) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductType[] | null>(null);

    return (
        <ProductsStateContext.Provider value={{
            isFetching,
            setIsFetching,
            products,
            setProducts
        }}>
            {children}
        </ProductsStateContext.Provider>
    )
}

export const useProductsState = () => {
    const productsState = useContext(ProductsStateContext)

    if (!productsState) {
        throw new Error('You forgot about ProductsStateContextProvider!')
    }

    return productsState
}