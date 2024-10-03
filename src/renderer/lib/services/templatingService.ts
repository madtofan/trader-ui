import { ListTemplateEndpointResponse } from '@/bindings/templating/ListTemplateEndpointResponse';
import { removeTemplatingEndpoint, templatingEndpoint } from '@/lib/config/api';
import { AddTemplateEndpointRequest } from '@/bindings/templating/AddTemplateEndpointRequest';
import { TemplateEndpointResponse } from '@/bindings/templating/TemplateEndpointResponse';
import { initializeAxiosClient } from '.';

const axiosClient = initializeAxiosClient();

class TemplatingService {
  templatingEndpoint: () => string;

  removeTemplatingEndpoint: (templateName: string) => string;

  constructor() {
    this.removeTemplatingEndpoint = removeTemplatingEndpoint;
    this.templatingEndpoint = templatingEndpoint;
  }

  async getTemplateList() {
    const res = await axiosClient.get<ListTemplateEndpointResponse>(
      this.templatingEndpoint(),
    );
    return res;
  }

  async addTemplate(data: AddTemplateEndpointRequest) {
    const res = await axiosClient.post<TemplateEndpointResponse>(
      this.templatingEndpoint(),
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );
    return res;
  }

  async removeTemplate(templateName: string) {
    const res = await axiosClient.delete<TemplateEndpointResponse>(
      this.removeTemplatingEndpoint(templateName),
    );
    return res;
  }
}

export default new TemplatingService();
