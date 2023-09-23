import Http from "../http";
import { Address } from "../types/address";

export default class AddressService {
  private static http = new Http("http://localhost:5000/address");

  static async registerAddress(address: Address): Promise<Address> {
    const response = await this.http.post<Address>("/", address);
    console.log(response);
    return response;
    // addressState: ServedStates;
    // addressCity: ServedCities;
    // addressDistrict: string;
    // addressStreet: string;
    // addressNumber: string;
    // addressZipCode: string;
  }
}
