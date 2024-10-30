"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Clients } from "@/constants"
import Image from "next/image"
import { Client } from "@/types/appwrite.types"


export const columns: ColumnDef<Client>[] = [
    {
        header: "ID",
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
    },
    {
        accessorKey: "client",
        header: 'Client',
        cell: ({ row }) => {
          const client = Clients.find((client) => client.id === row.original.id)
    
          return (
            <div className="flex items-center gap-3">
                <Image 
                    src={client?.image || ''}
                    alt={client?.name || ''}
                    height={100}
                    width={100}
                    className="size-8"
                />
                <p className="whitespace-nowrap">
                    {client?.name}
                </p>
            </div>
          )
        },
      },
    {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
        <div className="min-w-[115px]">
            <StatusBadge status={row.original.status}/>
        </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Start Date",
    cell: ({ row }) => (
        <p className="text-14-regular min-w-[100px]">
            {formatDateTime(row.original.schedule).dateTime}
        </p>
    )
  },
  
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row: {original: data} }) => {
            return (
                <></>
            )
        },
    },
]
