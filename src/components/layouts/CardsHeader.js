import React, { useEffect,useContext } from 'react';
import CardsSearch from './CardsSearch';
import usePagination from './../../hooks/Pagination';
import CardsFilter from './CardsFilter';

import { RecoilRoot } from "recoil";
import { atom, useRecoilState } from 'recoil';
import { FilterContext } from '../../context/FilterContext';



const CardsHeader = () => {
    const [filters] = useContext(FilterContext);
    const showHideFilter2 = atom({
      key: "ShowHideFilter",
      default: 'true',
   });
    const [showFilter, setShowFilter] = useRecoilState(showHideFilter2);
   const handleFilter=()=>{
    setShowFilter(x=>x==='true'?'false':'true');
   };
  
//    useEffect(() => {
//     const main=document.getElementById('maindiv');
//     if(html)
//        main.innerHTML=html;
// }, [html])

   
 const { next, prev, jump, currentPage,setCurrentPage, maxPage ,itemsPerPage,setItemsPerPage} = usePagination();

    return (
        <>

            <div className="header">
                <div className="pages">
                    <p>{currentPage}  of {maxPage}</p>
                    <i className="fas fa-arrow-alt-circle-left"onClick={prev}></i>
                    <i className="fas fa-arrow-alt-circle-right"onClick={next}></i>
                </div>
                <div className="price__box">
                    <select className="selection__form" name="price" id="price">
                        <option className="opt" value="low to hight">dark</option>
                        <option className="opt" value="high to low">Light</option>
                    </select>
                </div>
                <div className="bars">
                    <i className="fas fa-bars"></i>
                </div>
                <div className="four__square">
                    <i className="fas fa-th-large"></i>
                </div>
                <div className="filter__form active" onClick={handleFilter}>
                    <input type="text" id="filter" placeholder='Filter' disabled value={`${filters.filter(x=>x.checked===true).length} filters selected`}/>
                </div>
                <div className="Sort__form">
                    <input type="text" id="sort" placeholder="Sort" />
                </div>


                <CardsSearch />



                <div className="ranges">
                    <div className="range">
                        <p className="sort">Sort</p>
                        <input type="range" min="0" max="100" value="50" className="slider1" />
                    </div>
                    <div className="range">
                        <p className="filter">Filter</p>
                        <input type="range" min="0" max="100" value="50" className="slider2" />
                    </div>
                </div>
                <div className="toggle__btn" id="to__btn">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
            <CardsFilter/>




        </>
    )


}
export default CardsHeader;
