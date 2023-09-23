import Http from "../http";
import { Person } from "../types/person";

export default class PersonService {
  private static http = new Http("http://localhost:5000/person");

  static async registerPerson(person: Person): Promise<Person> {
    console.log(person);
    const response = await this.http.post<Person>("/", person);
    console.log(response);
    return response;
    // personFullName: string;
    // personCPF: string;
    // personBirth: Date;
    // personPhone?: string;
    // userId: string;
    // addressId: string;
  }
}
