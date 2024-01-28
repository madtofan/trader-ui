import axios from "axios";
import { ListTemplateEndpointResponse } from "@/bindings/templating/ListTemplateEndpointResponse";
import { removeTemplatingEndpoint, templatingEndpoint } from "@/config/api";
import { AddTemplateEndpointRequest } from "@/bindings/templating/AddTemplateEndpointRequest";
import { TemplateEndpointResponse } from "@/bindings/templating/TemplateEndpointResponse";

class TemplatingService {
  async getTemplateList() {
    const res = await axios.get<ListTemplateEndpointResponse>(templatingEndpoint());
    return res;
  }

  async addTemplate(data: AddTemplateEndpointRequest) {
    const res = await axios.post<TemplateEndpointResponse>(templatingEndpoint(), {
      method: "POST",
      body: JSON.stringify(data)
    });
    return res;
  }

  async removeTemplate(templateName: string) {
    const res = await axios.delete<TemplateEndpointResponse>(removeTemplatingEndpoint(templateName));
    return res;
  }
}

export default new TemplatingService();
