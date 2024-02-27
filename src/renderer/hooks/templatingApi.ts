import templatingService from '@/services/templatingService';
import { useMutation, useQuery } from 'react-query';
import { AddTemplateEndpointRequest } from '@/bindings/templating/AddTemplateEndpointRequest';
import { MutationOptions } from '.';

const useGetTemplateList = () => {
  return useQuery(['getTemplateList'], () => {
    return templatingService.getTemplateList();
  });
};

const useAddTemplate = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['addTemplate'],
    mutationFn: (data: AddTemplateEndpointRequest) =>
      templatingService.addTemplate(data),
    ...options,
  });
};

const useRemoveTemplate = (options?: MutationOptions) => {
  return useMutation({
    mutationKey: ['removeTemplate'],
    mutationFn: ({ templateName }: { templateName: string }) =>
      templatingService.removeTemplate(templateName),
    ...options,
  });
};

export { useGetTemplateList, useAddTemplate, useRemoveTemplate };
