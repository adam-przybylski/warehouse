import {PaymentConfirmationEnum} from "../enums/PaymentConfirmationEnum.enum.ts";
import {ProductType} from "./ProductType.ts";
import {ClientType} from "./ClientType.ts";
import {DeliveryTypeEnum} from "../enums/DeliveryTypeEnum.enum.ts";

export interface ReservationPost {
    clientName: string;
    deliveryDate: string;
    paymentConfirmation: PaymentConfirmationEnum;
    deliveryType: string;
    products: ProductType[];
}

export interface ReservationGet {
    id: string;
    client: ClientType;
    products: ProductType[];
    reservationDate: string;
    deliveryDate: string;
    paymentConfirmation: PaymentConfirmationEnum;
    deliveryType: DeliveryTypeEnum;
    delivered: boolean;
}