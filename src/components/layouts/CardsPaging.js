import React from 'react';
import usePagination from './../../hooks/Pagination';
const CardsPaging=()=>{

 const { next, prev, jump, currentPage, maxPage  ,items} = usePagination();


   return(
      <>
               
                    <div className="page__count">
                        <p className="page__count_no">{currentPage}  of {maxPage}</p> 
                        <i className="fas fa-arrow-alt-circle-left" onClick={prev}></i>
                        <i className="fas fa-arrow-alt-circle-right" onClick={next}></i>
                        <p className="page__no"onClick={()=>jump(1)}>1</p>
                        <p className="page__no_b">...</p>
                        <p className="page__no" onClick={()=>jump(maxPage)}>{maxPage}</p>
                      
                    </div>
                    <div className="page__count">
               
                        <p className="page__no" >{items}</p>
                      
                    </div>
             
      </>
   )

}
export default CardsPaging;