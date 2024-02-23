import {useProducts} from "../../../hooks/useProducts.ts";
import {useEffect, useState} from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {LoaderComponent} from "../../../components/Loader";
import {ProductType} from "../../../types/ProductType.ts";


export const AvailabilityPageComponent = () => {
    const {products, isFetching, fetchProducts} = useProducts()
    const [filteredProducts, setFilteredProducts] = useState<ProductType[] | null>([]);

    useEffect(() => {
        if (!products) {
            fetchProducts()
        }
    }, [])

    useEffect(() => {
        filterProducts('')
    }, [products])


    const filterProducts = (search: string) => {
        if (search.length === 0 || search === '' || search === null) {
            setFilteredProducts(products)
        }
        const filtered = products?.filter((product) => {
            return product.name.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredProducts(filtered ?? [])
    }

    const renderTable = () => {
        if (!filteredProducts || filteredProducts.length === 0) {
            return <div>Brak wyników</div>
        }

        return (
            <Table sx={{minWidth: 300}}>
                <TableHead sx={{background: '#605f5f'}}>
                    <TableRow>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.2rem'}}>Nazwa</TableCell>
                        <TableCell
                            sx={{color: '#ffffff', fontSize: '1.2rem', textAlign: 'center'}}>Jednostka</TableCell>
                        <TableCell sx={{color: '#ffffff', fontSize: '1.2rem', textAlign: 'right'}}>Liczba</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {filteredProducts.map(({id, name, unit, numberOfUnits}) => (
                        <TableRow
                            key={id}
                            hover
                        >
                            <TableCell component="th" scope="row" sx={{fontSize: '1.1rem'}}>
                                {name}
                            </TableCell>
                            <TableCell align="center" sx={{fontSize: '1.1rem'}}>
                                {unit.toString() === "BOTTLE" ? 'Butelka' : ''}
                                {unit.toString() === "CARTON" ? 'Karton' : ''}
                                {unit.toString() === "PACK" ? 'Zgrzewka' : ''}
                            </TableCell>
                            <TableCell align="right" sx={{fontSize: '1.1rem'}}>
                                {numberOfUnits}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    return (
        <div>
            <div style={{display: 'flex'}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchProducts}
                    disabled={isFetching}
                    sx={{my: 2}}
                >
                    Odśwież
                </Button>

                <TextField
                    type="text"
                    label="Szukaj"
                    onChange={(event) => filterProducts(event.target.value)}
                    sx={{ml: 'auto'}}
                />
            </div>

            <TableContainer component={Paper}>
                {isFetching ? <LoaderComponent small/> : renderTable()}
            </TableContainer>
        </div>
    )
}
