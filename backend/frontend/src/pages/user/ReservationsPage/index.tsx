import {useProducts} from "../../../hooks/useProducts.ts";
import {useEffect, useState} from "react";
import {useClients} from "../../../hooks/useClients.ts";
import {UnitEnum} from "../../../enums/UnitEnum.enum.ts";
import {ProductType} from "../../../types/ProductType.ts";
import {FormContainer} from "../DeliveryPage/styles.ts";
import {Autocomplete, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {useReservations} from "../../../hooks/useReservations.ts";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DeliveryTypeEnum} from "../../../enums/DeliveryTypeEnum.enum.ts";
import {PaymentConfirmationEnum} from "../../../enums/PaymentConfirmationEnum.enum.ts";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import {ReservationPost} from "../../../types/ReservationType.ts";


const solveUnit = (unit: UnitEnum) => {
    if (unit.toString().toLocaleLowerCase() == UnitEnum.BOTTLE.toString().toLocaleLowerCase()) {
        return 'Butelka';
    } else if (unit.toString().toLocaleLowerCase() == UnitEnum.CARTON.toString().toLocaleLowerCase()) {
        return 'Karton';
    } else {
        return 'Zgrzewka';
    }
}

export const ReservationsPageComponent = () => {
    const {products, fetchProducts, isFetching} = useProducts();
    const {clients, fetchClients} = useClients();
    const {addReservation, isAdding} = useReservations();

    const [productsFields, setProductsFields] = useState([
        {name: "", unit: UnitEnum.BOTTLE, numberOfUnits: 1},
    ]);

    const [client, setClient] = useState('');

    const [selectedDate, setSelectedDate] = useState<string>("")
    const [selectedDeliveryTyep, setSelectedDeliveryType] = useState<DeliveryTypeEnum>(DeliveryTypeEnum.DELIVERY)
    const [selectedPaymentConfirmationType, setSelectedPaymentConfirmationType] = useState<PaymentConfirmationEnum>(PaymentConfirmationEnum.INVOICE)


    useEffect(() => {
        if (!products) {
            fetchProducts()
        }
        if (!clients) {
            fetchClients()
        }
    }, []);

    const handleChangeProductsInput = (index: number, event: any): void => {
        const values: ProductType[] = [...productsFields];
        // @ts-ignore
        values[index][event.target.name] = event.target.value;
        if (event.target.name === 'name') {
            const product = products?.find(product => product.name === event.target.value);
            if (product) {
                values[index].unit = product.unit;
            }
        }
        setProductsFields(values);
    }

    const handleClientChange = (event: any, value: string | null) => {
        event.preventDefault();
        if (value) {
            setClient(value);
        }
    }

    const handleDeliveryTypeChange = (event: any) => {
        setSelectedDeliveryType(event.target.value);
    }

    const handleDateChange = (date: any) => {
        console.log(selectedDate)
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        setSelectedDate(formattedDate)
    };

    const handlePaymentConfirmationTypeChange = (event: any) => {
        setSelectedPaymentConfirmationType(event.target.value);
    }

    const handleAddFields = () => {
        setProductsFields([...productsFields, {name: "", unit: UnitEnum.BOTTLE, numberOfUnits: 1}]);
    };

    const handleSubmit = () => {
        const reservation: ReservationPost = {
            clientName: client,
            deliveryType: selectedDeliveryTyep,
            paymentConfirmation: selectedPaymentConfirmationType,
            deliveryDate: selectedDate,
            products: productsFields
        }
        addReservation(reservation)
    }

    const handleRemoveFields = (index: number) => {
        const values = [...productsFields];
        values.splice(index, 1);
        setProductsFields(values);
    };

    return <div>
        <FormContainer>
            <form>
                <Autocomplete
                    autoSelect
                    options={clients?.map((option) => option.name) || []}
                    renderInput={(params) => <TextField {...params} label="Nazwa klienta" variant="filled"/>}
                    onChange={(event, value) => {
                        handleClientChange(event, value)
                    }}
                    sx={{mr: 1, my: 1, minWidth: '20vw'}}
                >
                </Autocomplete>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{mr: 1, my: 1}}>
                        <DatePicker
                            label="Data dostarczenia zamówienia"
                            onChange={handleDateChange}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <FormControl variant="outlined" sx={{my: 2}}>
                    <InputLabel id='delivery-type-label'>Typ dostawy</InputLabel>
                    <Select
                        labelId="delivery-type-label"
                        id="delivery-type-select"
                        name="deliveryType"
                        label="Typ"
                        variant="filled"
                        value={selectedDeliveryTyep}
                        sx={{mr: 1, my: 1, minWidth: '15rem'}}
                        onChange={handleDeliveryTypeChange}
                    >
                        <MenuItem value={DeliveryTypeEnum.DELIVERY}>Dostawa</MenuItem>
                        <MenuItem value={DeliveryTypeEnum.SHIPMENT}>Przesyłka</MenuItem>
                    </Select>
                </FormControl>

                <FormControl variant="outlined" sx={{my: 2}}>
                    <InputLabel id='payment-confirmation-label'>Forma płatności</InputLabel>
                    <Select
                        labelId="payment-confirmation-label"
                        id="payment-confirmation-select"
                        name="paymentConfirmationType"
                        label="Potwierdzenie płatności"
                        variant="filled"
                        value={selectedPaymentConfirmationType}
                        onChange={handlePaymentConfirmationTypeChange}
                        sx={{mr: 1, my: 1, minWidth: '15rem'}}
                    >
                        <MenuItem value={PaymentConfirmationEnum.INVOICE}>Faktura</MenuItem>
                        <MenuItem value={PaymentConfirmationEnum.RECEIPT}>Paragon</MenuItem>
                        <MenuItem value={PaymentConfirmationEnum.GIFT}>Zestaw upominkowy</MenuItem>
                    </Select>
                </FormControl>

                {productsFields.map((productField, index) => (
                    <div key={index} className={'product'}>
                        {!isFetching &&

                            <Autocomplete
                                autoSelect
                                options={products?.map((option) => option.name) || []}
                                renderInput={(params) => <TextField {...params} label="Nazwa" variant="filled"/>}
                                onChange={(event, value) => {
                                    event.preventDefault();
                                    if (value) {
                                        const values: ProductType[] = [...productsFields];
                                        values[index].name = value;
                                        values[index].unit = products?.find(product => product.name === value)?.unit || UnitEnum.BOTTLE;
                                        setProductsFields(values);
                                    }
                                }}
                                sx={{mr: 1, my: 1, minWidth: '20vw'}}
                            >
                            </Autocomplete>}

                        <TextField
                            variant="filled"
                            value={solveUnit(productField.unit)}
                            disabled={true}
                            sx={{mr: 1, my: 1}}
                        />

                        <TextField
                            name="numberOfUnits"
                            label="Liczba"
                            variant="filled"
                            value={productField.numberOfUnits}
                            onChange={(event) => handleChangeProductsInput(index, event)}
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
                    id="submit-reservation-button"
                    variant="contained"
                    color="primary"
                    type="button"
                    disabled={isAdding}
                    onClick={handleSubmit}
                >
                    Zapisz
                </Button>
            </form>
        </FormContainer>
    </div>
}
