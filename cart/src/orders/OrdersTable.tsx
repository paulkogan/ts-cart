import React, {useState, useEffect, useMemo} from 'react';
import moment from 'moment';
import { useTable } from "react-table"
import {Order} from "../types/types"
import './Orders.css';

interface Props {
  ordersList: Order[]
}

const  OrdersTable:React.FC <Props> = ({ordersList}) => {

    const columns = [

        {
          Header: "Date Placed ",
          accessor: (order:Order) => {
            return moment(order.date_placed)
              .local()
              .format("DD-MM-YYYY")
          }
        },
        {
          Header: "Status",
          accessor: "order_status",
        },
        {
          Header: "Cust. Name",
          accessor: "customer.name",
        },
        {
          Header: "Delivery State",
          accessor: "delivery_us_state",
        },
        {
          Header: "Items Total",
          accessor: "items_total",
        },
        {
          Header: "Tax Total",
          accessor: "tax_total",
        }
      ]

    const TableContainer = ({columns, data}:any, ) => {
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data,
      })
    
      return (
        // If you're curious what props we get as a result of calling our getter functions (getTableProps(), getRowProps())
        // Feel free to use console.log()  This will help you better understand how react table works underhood.
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column:any) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
    
          <tbody {...getTableBodyProps()}>
            {rows.map((row:any) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell:any) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }





  return (
    <div className="prod-list">
      {ordersList && <TableContainer columns = {columns} data = {ordersList}/>}
    </div>
  );
}

export default OrdersTable;
