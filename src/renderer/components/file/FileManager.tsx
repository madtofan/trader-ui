import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
} from "@tanstack/react-table"
import { ArrowUpDown, FileUp, Save, Trash } from 'lucide-react';
import { FileTable } from './FileTable';
import { useEffect } from 'react';
import { toast } from '../ui/use-toast';
import { FILE_CHANNELS } from '../../../shared-types';

export type FileDetail = {
  id: string
  fileName: string
  dateModified: Date
  actions: string
}

export const columns: ColumnDef<FileDetail>[] = [
  {
    accessorKey: "fileName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const cellValue: string = String(row.renderValue('fileName'));
      return <div onClick={() => row.toggleSelected()}>{cellValue}</div>;
    }
  },
  {
    accessorKey: "dateModified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Modified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const cellValue: string = String(row.renderValue('dateModified'));
      return <div onClick={() => row.toggleSelected()}>{cellValue}</div>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const fileName = row.getValue('fileName');

      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Trash className="h-4 w-4" />
        </Button>
      )
    },
  },
]

const MOCK_DATA: FileDetail[] = [
  {
    id: 'test',
    fileName: 'test',
    dateModified: new Date(),
    actions: 'test',
  },
  {
    id: 'test2',
    fileName: 'test2',
    dateModified: new Date(),
    actions: 'test2',
  }
]

export default function FileManager() {
  const handleGetFileList = async () => {
    await window.electron.ipcRenderer
      .invoke(FILE_CHANNELS.GetList, [])
      .then(() => {
        toast({
          title: 'Success!',
          description: 'obtained file list',
          variant: 'default',
        });
        return true;
      })
      .catch((err: Error) => {
        toast({
          title: 'Error during obtaining file list',
          description: err.message,
          variant: 'destructive',
        });
      });
  }

  const handleSaveFile = async () => {
    await window.electron.ipcRenderer
      .invoke(FILE_CHANNELS.GetList, [])
      .then(() => {
        toast({
          title: 'Success!',
          description: 'obtained file list',
          variant: 'default',
        });
        return true;
      })
      .catch((err: Error) => {
        toast({
          title: 'Error during obtaining file list',
          description: err.message,
          variant: 'destructive',
        });
      });
  }

  useEffect(() => {
    handleGetFileList();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            <div>File Manager</div>
            <div className="flex gap-2">
              <Button variant="outline" className="ml-auto">
                Load <FileUp className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="ml-auto">
                Save <Save className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="container mx-auto py-10">
          <FileTable columns={columns} data={MOCK_DATA} />
        </div>
      </CardContent>
    </Card>
  )
}
