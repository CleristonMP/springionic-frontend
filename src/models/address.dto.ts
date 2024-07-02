import { CityDTO } from "./city.dto";

export interface AddressDTO {
    id: string;
    publicPlace: string;
    number: string;
    complement: string;
    district: string;
    zipCode: string;
    city: CityDTO;
}
