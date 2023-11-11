import Http from "../http";
import { Occurrence, OccurrenceFilter } from "../types/occurrence";
import { ResourceFilter } from "../types/resource";

export default class OccurrenceService {
  private static http = new Http("http://localhost:5002/occurrence");

  static async registerOccurrence(
    occurrence: Occurrence
  ): Promise<Occurrence | void> {
    const response = await this.http
      .post<Occurrence>("/", occurrence)
      .then((r) => {
        return r;
      })
      .catch((err) => console.log(err));
    return response;
  }

  static async getOccurrenceById(
    id: string,
    getPdf = true
  ): Promise<Occurrence> {
    const response = await this.http.get<Occurrence>(
      `/?id=${id}&getPdf=${getPdf}`
    );
    return response;
  }

  static async getAllOccurrences(): Promise<OccurrenceFilter[]> {
    const response = await this.http.get<OccurrenceFilter[]>("/list");
    return response;
  }

  static async editOccurrence(
    id: string,
    occurrence: Occurrence
  ): Promise<Occurrence | void> {
    const response = this.http
      .put<Occurrence>(`/?id=${id}`, occurrence)
      .then((r) => {
        return r;
      })
      .catch((err) => console.log(err));
    return response;
  }

  static async getResourcesLinkedWithOccurrenceId(
    id: string
  ): Promise<ResourceFilter[]> {
    const response = await this.http.get<ResourceFilter[]>(
      `/resources?occurrenceId=${id}`
    );
    return response;
  }

  static async deleteOccurrence(id: string): Promise<boolean> {
    const response = await this.http
      .delete<boolean>(`/?id=${id}`)
      .then((r) => {
        return r;
      })
      .catch((err) => console.log(err));
    return response ?? false;
  }
}
