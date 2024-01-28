import templatingService from "@/services/templatingService";
import { useMutation, useQuery } from "react-query";
import { AddTemplateEndpointRequest } from "@/bindings/templating/AddTemplateEndpointRequest";

const useGetTemplateList = () => {
  return useQuery(["getTemplateList"], () => { return templatingService.getTemplateList(); });
}

const useAddTemplate = (data: AddTemplateEndpointRequest, options?: any) => {
  return useMutation(
    () => {
      return templatingService.addTemplate(data);
    },
    ...options,
  )
}

const useRemoveTemplate = (templateName: string, options?: any) => {
  return useMutation(
    () => {
      return templatingService.removeTemplate(templateName);
    },
    ...options,
  )
}

export {
  useGetTemplateList,
  useAddTemplate,
  useRemoveTemplate
}
