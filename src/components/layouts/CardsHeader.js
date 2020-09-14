import React, { useEffect, useContext } from 'react';
import CardsSearch from './CardsSearch';
import usePagination from './../../hooks/Pagination';
import CardsFilter from './CardsFilter';
import CardsSideNav from './CardsSideNav';

import { atom, useRecoilState, RecoilRoot } from 'recoil';
import { FilterContext } from '../../context/FilterContext';
import { SortContext } from '../../context/SortContext';


const CardsHeader = () => {
    const [filters] = useContext(FilterContext);

    const [sortList]=useContext(SortContext);
    //debugger
    const showHideFilter2 = atom({
        key: "ShowHideFilter",
        default: 'true',
    });
    const menuOpenClose = atom({
        key: "menuOpenClose",
        default: 'true',
    });
    const sortSelected = atom({
        key: "sortSelected",
        default: '',
    });
    const [showFilter, setShowFilter] = useRecoilState(showHideFilter2);
    const [menuToggle, setMenuToggle] = useRecoilState(menuOpenClose);
    const [order_by, setOrder_by] = useRecoilState(sortSelected);
    const handleFilter = () => {
        setShowFilter(x => x === 'true' ? 'false' : 'true');
    };

    function handleMenu() {
        setMenuToggle(menuToggle === '' ? 'active' : '');
    }
    function sortSelect(event) {
        setOrder_by(event.target.value)
    }
    //    useEffect(() => {
    //     const main=document.getElementById('maindiv');
    //     if(html)
    //        main.innerHTML=html;
    // }, [html])

    const { next, prev, jump, currentPage, setCurrentPage, maxPage, itemsPerPage, setItemsPerPage } = usePagination();

    return (
        <>
            <CardsSideNav />
            <div className="header">
                <div className="pages">
                    <p>{currentPage}  of {maxPage}</p>
                    <i className="fas fa-arrow-alt-circle-left" onClick={prev}></i>
                    <i className="fas fa-arrow-alt-circle-right" onClick={next}></i>
                </div>
                {/* <div className="price__box">
                    <select className="selection__form" name="price" id="price">
                        <option className="opt" value="low to hight">dark</option>
                        <option className="opt" value="high to low">Light</option>
                    </select>
                </div> */}
                {/* <div className="bars">
                    <i className="fas fa-bars"></i>
                </div>
                <div className="four__square">
                    <i className="fas fa-th-large"></i>
                </div> */}
                <a href="#"><div className="filter__form active" onClick={handleFilter}>
                    <input type="text" id="filter" placeholder='Filter' disabled value={`${filters.filter(x => x.checked === true).length} filters selected`} />
                </div>   </a>

                <div className="sort__box" >
                    <select className="selection__form" name="price" id="price" onChange={sortSelect}>
                        <option className="opt" value="">Sort</option>
                        {
                            sortList && sortList.length > 0 ? sortList.map((item, index) => (
                                <>
                                    <option className="opt" value={item[0] + ' asc'}>{item[1]} &uarr; </option>
                                    <option className="opt" value={item[0] + ' desc'}>{item[1]} &darr; </option>
                                </>
                            )) : null
                        }
                        {/* 
                        <option className="opt" value="a1">Place &uarr; </option>
                        <option className="opt" value="high to low">Place &darr;</option> */}
                    </select>
                </div>



                <CardsSearch />



                {/* <div className="ranges">
                    <div className="range">
                        <p className="sort">Search</p>
                        <input type="range" min="0" max="100" value="50" className="slider1" />
                    </div>
                    <div className="range">
                        <p className="filter">Filter</p>
                        <input type="range" min="0" max="100" value="50" className="slider2" />
                    </div>
                </div> */}
                <div className="toggle__btn" id="to__btn" onClick={handleMenu}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
            <CardsFilter />




        </>
    )


}
export default CardsHeader;
