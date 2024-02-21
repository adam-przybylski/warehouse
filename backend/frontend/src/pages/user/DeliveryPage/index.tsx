import {useEffect, useState} from "react";
import {Autocomplete, Button, IconButton, MenuItem, Select, TextField} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {ProductType} from "../../../types/ProductType.ts";
import {UnitEnum} from "../../../enums/UnitEnum.enum.ts";
import {useProducts} from "../../../hooks/useProducts.ts";
import {FormContainer} from "./styles.ts";

export const DeliveryPageComponent = () => {

    const {products, fetchProducts, isFetching, isUpdating, updateProducts} = useProducts();

    const [inputFields, setInputFields] = useState([
        {name: "", unit: UnitEnum.BOTTLE, numberOfUnits: 1},
    ]);


    useEffect(() => {
        if (!products) {
            fetchProducts()
        }
    }, []);


    const handleChangeInput = (index: number, event: any): void => {
        const values: ProductType[] = [...inputFields]; // Replace YourType with the type of inputFields items
        // @ts-ignore
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        updateProducts(inputFields)
            .then(() => {
                setInputFields([{name: "", unit: UnitEnum.BOTTLE, numberOfUnits: 1}])
                fetchProducts()
            });
    };

    const handleAddFields = () => {
        setInputFields([...inputFields, {name: "", unit: UnitEnum.BOTTLE, numberOfUnits: 1}]);
    };

    const handleRemoveFields = (index: number) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    return (
        <div>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    {inputFields.map((inputField, index) => (
                        <div key={index} className={'product'}>
                            {!isFetching &&
                                <Autocomplete
                                    freeSolo
                                    autoSelect
                                    options={products?.map((option) => option.name) || []}
                                    renderInput={(params) => <TextField {...params} label="Nazwa" variant="filled"/>}
                                    onChange={(event, value) => {
                                        event.preventDefault();
                                        if (value) {
                                            const values: ProductType[] = [...inputFields];
                                            values[index].name = value;
                                            console.log(value)
                                            setInputFields(values);
                                        }
                                    }}
                                    sx={{mr: 1, my: 1, minWidth: '20vw'}}
                                >
                                </Autocomplete>}
                            <Select
                                name="unit"
                                label="Jednostka"
                                variant="filled"
                                value={inputField.unit}
                                onChange={(event) => handleChangeInput(index, event)}
                                sx={{mr: 1, my: 1}}
                            >
                                <MenuItem value={UnitEnum.BOTTLE}>Butelka</MenuItem>
                                <MenuItem value={UnitEnum.PACK}>Zgrzewka</MenuItem>
                                <MenuItem value={UnitEnum.CARTON}>Karton</MenuItem>
                            </Select>

                            <TextField
                                name="numberOfUnits"
                                label="Liczba"
                                variant="filled"
                                value={inputField.numberOfUnits}
                                onChange={(event) => handleChangeInput(index, event)}
                                sx={{mr: 1, my: 1}}
                            />

                            <IconButton onClick={() => handleRemoveFields(index)}>
                                <RemoveIcon/>
                            </IconButton>

                            <IconButton onClick={() => handleAddFields()}>
                                <AddIcon/>
                            </IconButton>

                        </div>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isUpdating}
                        onClick={handleSubmit}
                    >
                        Zapisz
                    </Button>
                </form>
            </FormContainer>
        </div>
    );
}
