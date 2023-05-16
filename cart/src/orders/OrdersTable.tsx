import React, {useState, useEffect, useMemo} from 'react';
import moment from 'moment';
import { useTable, useSortBy} from "react-table"
import {Order} from "../types/types"
import {toDollarString} from "../utils"
import './Orders.css';

interface Props {
  ordersList: Order[]
}

const  OrdersTable:React.FC <Props> = ({ordersList}) => {

  const columns = React.useMemo(
    () => [

        {
          Header: "Date Placed ",
          accessor: (order:Order) => {
            return moment(order.date_placed)
              .local()
              .format("DD-MM-YYYY")
          }, 

        },
        {
          Header: "Status",
          accessor: "order_status",
        },
        {
          Header: "Cust. Name",
          accessor: "customer.name",
          disableSortBy: true,
          Cell: (props: { value: string }) => {
            const formattedName  = props.value.includes("Paul") ? 
            <span className="cell-highlight">{props.value}</span> : <span className="cell-normal">{props.value}</span>
            return formattedName ;
          },
        },
        {
          Header: "Delivery State",
          accessor: "delivery_us_state",
        },
        {
          Header: "Items Total",
          accessor: (order:Order) => {
            return toDollarString(order.items_total)
  
          }
        },
        {
          Header: "Tax Total",
          accessor: (order:Order) => {
            return toDollarString(order.tax_total)
  
          }
        }
      ], []
  );
    const ordersListMemo = useMemo(() => ordersList, [ordersList]);


    const TableContainer = ({columns, data}:any, ) => {
      //use the useTable hook to define the table
      //pass it with at least data & columns, and any options
      //it returns an instance with all the elements needed to construct your table
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data
      }, 
      useSortBy,
      
   
      )
      //this should be printing once, not 4 times
      console.log(rows[1])   

      return (
        // If you're curious what props we get as a result of calling our getter functions (getTableProps(), getRowProps())
        // Feel free to use console.log()  This will help you better understand how react table works underhood.
      <div>
        <div>{`Cell Value: ${rows[0]?.cells[2]?.value}`}</div>      
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column:any) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔼" : " 🔽") : " -"}</span>
                  </th>
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
                    return <td  {...cell.getCellProps()}>{cell.render("Cell")} </td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      )
    }

  return (
    <div className="prod-list">
      {ordersList && 
          <TableContainer columns = {columns} data = {ordersListMemo}/>
      }
    </div>
  );
}

export default OrdersTable;
