import Http from "../http";
import { Resource, ResourceFilter } from "../types/resource";

export default class ResourceService {
  private static http = new Http("http://localhost:5002/resource");

  static async registerResource(resource: Resource): Promise<Resource | void> {
    const response = await this.http
      .post<Resource>("/", resource)
      .then((r) => {
        return r;
      })
      .catch((err) => console.log(err));
    return response;
  }

  static async getUnlinkedResourcesByOccurenceId(
    occurrenceId: string
  ): Promise<ResourceFilter[]> {
    const response = await this.http.get<ResourceFilter[]>(
      `/unlinked?occurrenceId=${occurrenceId}`
    );
    return response;
  }

  static async linkResouceWithOccurrence(
    occurrenceId: string,
    resourceId: string
  ): Promise<boolean> {
    const response = await this.http.put<boolean>(
      `/linkOccurrence?occurrenceId=${occurrenceId}&resourceId=${resourceId}`
    );
    return response;
  }

  static async unlinkResouceWithOccurrence(
    occurrenceId: string,
    resourceId: string
  ): Promise<boolean> {
    const response = await this.http.delete<boolean>(
      `/unlinkOccurrence?occurrenceId=${occurrenceId}&resourceId=${resourceId}`
    );
    return response;
  }

  static async getAllResources(): Promise<ResourceFilter[]> {
    const response = await this.http.get<ResourceFilter[]>("/list");
    return response;
  }

  static async getResourceById(id: string): Promise<ResourceFilter> {
    const response = await this.http.get<ResourceFilter>(`/?id=${id}`);
    return response;
  }

  static async editResource(
    id: string,
    resource: Resource
  ): Promise<Resource | void> {
    const response = this.http
      .put<Resource>(`/?id=${id}`, resource)
      .then((r) => {
        return r;
      })
      .catch((err) => console.log(err));
    return response;
  }

  static async deleteResource(id: string): Promise<boolean | void> {
    const response = this.http
      .delete(`/?id=${id}`)
      .then((r) => {
        return true;
      })
      .catch((err) => console.log(err));
    return response;
  }
}
