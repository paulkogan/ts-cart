import React, {useState, useEffect, useReducer} from 'react';
import './Orders.css';

interface Props {
    setPageIndex: Function, 
    pageIndex: number
  }
  
const  Pagination:React.FC <Props> = ({setPageIndex, pageIndex}) => {

    const prevPage = () => setPageIndex(pageIndex-1)
    const nextPage = () => setPageIndex(pageIndex+1)

    return (
        <div className="pagination-outer">
            <div className="pagination-button">           
                <button onClick={() => prevPage()}>PREV</button>
            </div> 
            <div className="pagination-pageNum">           
                {pageIndex}
            </div> 
            <div className="pagination-button">           
                <button onClick={() => nextPage()}>NEXT</button>
            </div> 
                   

        </div>
    );
    
}

export default Pagination;
