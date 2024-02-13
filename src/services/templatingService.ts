import { ListTemplateEndpointResponse } from "@/bindings/templating/ListTemplateEndpointResponse";
import { removeTemplatingEndpoint, templatingEndpoint } from "@/config/api";
import { AddTemplateEndpointRequest } from "@/bindings/templating/AddTemplateEndpointRequest";
import { TemplateEndpointResponse } from "@/bindings/templating/TemplateEndpointResponse";
import { initializeAxiosClient } from ".";

const axiosClient = initializeAxiosClient();

class TemplatingService {
  async getTemplateList() {
    const res = await axiosClient.get<ListTemplateEndpointResponse>(templatingEndpoint());
    return res;
  }

  async addTemplate(data: AddTemplateEndpointRequest) {
    const res = await axiosClient.post<TemplateEndpointResponse>(templatingEndpoint(), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async removeTemplate(templateName: string) {
    const res = await axiosClient.delete<TemplateEndpointResponse>(removeTemplatingEndpoint(templateName));
    return res;
  }
}

export default new TemplatingService();
