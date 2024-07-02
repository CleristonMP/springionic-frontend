import { OrderItemDTO } from "./order-item.dto";
import { PaymentDTO } from "./payment.dto";
import { RefDTO } from "./ref.dto";

export interface OrderDTO {
    client: RefDTO;
    deliveryAddress: RefDTO | null;
    payment: PaymentDTO | null;
    items: OrderItemDTO[];
}
