import {useAlert} from "./useAlert.ts";
import {useProductsState} from "../context/ProductsContext.tsx";
import {api} from "../api/api.ts";
import {ProductType} from "../types/ProductType.ts";
import {useState} from "react";

export const useProducts = () => {
    const {showErrorAlert, showSuccessAlert} = useAlert()
    const {isFetching, setIsFetching, products, setProducts} = useProductsState()

    const fetchProducts = async () => {
        try {
            setIsFetching(true)
            const {data} = await api.getProducts()
            const sortedProducts = data.sort((a: ProductType, b: ProductType) => a.name.localeCompare(b.name))
            setProducts(sortedProducts)
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsFetching(false)
        }
    }

    const [isCreating, setIsCreating] = useState(false)

    const addProduct = async (product: ProductType) => {
        try {
            setIsCreating(true)
            await api.addProduct(product).then(() => showSuccessAlert('Produkt ' + product.name +' został dodany'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsCreating(false)
        }
    }

    const [isDeleting, setIsDeleting] = useState(false)

    const deleteProduct = async (name: string) => {
        try {
            setIsDeleting(true)
            await api.deleteProduct(name).then(() => showSuccessAlert('Produkt ' + name +' został usunięty'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsDeleting(false)
        }
    }

    const [isUpdating, setIsUpdating] = useState(false)

    const updateNumberOfProductItems = async (product: ProductType) => {
        try {
            setIsUpdating(true)
            await api.updateNumberOfProductItems(product).then(() => showSuccessAlert('Produkt ' + product.name +' został zaktualizowany'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsUpdating(false)
        }
    }

    const updateProducts = async (products: ProductType[]) => {
        try {
            setIsUpdating(true)
            await api.updateProducts(products).then(() => showSuccessAlert('Produkty zostały zaktualizowane'))
        } catch (error: any) {
            console.error(JSON.stringify(error))
            showErrorAlert(error.response.data)
        } finally {
            setIsUpdating(false)
        }

    }

    return {products, isFetching, fetchProducts, isCreating, addProduct, isDeleting, deleteProduct, isUpdating, updateNumberOfProductItems, updateProducts}
}