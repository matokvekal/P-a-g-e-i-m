import React,{useState} from 'react';
import CardsPaging from './CardsPaging';
import usePagination from './../../hooks/Pagination';

const CardsFooter=()=>{
      const {setItemsPerPage} = usePagination();

      const items=[20,50,100];
      const handleItems =(event)=>{
        setItemsPerPage(event.target.value);
      }
   return(
      <>
                <div className="footer">
                  <CardsPaging/>
                    <div className="page__box">
                        <>
                        <select className="selection__form" name="itemInpage" id="itemInpage"onChange={handleItems}>
                            {
                                items.map((item,index)=>(
                                    <option className="opt" value={item} key={index} >{item} Per Page</option>
                                ))
                            }

                        </select>
                        </>
                    </div>
                </div>
      </>
   )

}
export default CardsFooter;