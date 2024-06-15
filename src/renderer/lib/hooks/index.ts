import { useMutation, useQuery } from 'react-query';

export type MutationOptions = Parameters<typeof useMutation>[2];
export type QueryOptions = Parameters<typeof useQuery>[2];
