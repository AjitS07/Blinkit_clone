import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'




const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table className='w-full py-0 px-0 border-collapse'>
        <thead className='bg-neutral-500 text-white'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              <th>Sr.No</th>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='border whitespace-nowrap'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} className="relative group hover:bg-neutral-100">
              {/* Serial Number */}
              <td className='border border-neutral-400 px-2 py-1'>{index + 1}</td>

              {/* Other cells */}
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='border border-neutral-400 px-2 py-1 whitespace-nowrap'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}

              {/* Floating action buttons (appear on row hover) */}
              
            </tr>
          ))}
        </tbody>

      </table>
      <div className="h-4" />
    </div>
  )
}

export default DisplayTable
