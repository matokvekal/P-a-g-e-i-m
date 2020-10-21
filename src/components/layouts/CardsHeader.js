import React, { useEffect, useContext, useRef } from 'react';
import CardsSearch from './CardsSearch';
import usePagination from './../../hooks/Pagination';
import CardsFilter from './CardsFilter';
import CardsSideNav from './CardsSideNav';
import { atom, useRecoilState } from 'recoil';
import { FilterContext } from '../../context/FilterContext';
import { SortContext } from '../../context/SortContext';


const CardsHeader = () => {

    const [filters, setFilters] = useContext(FilterContext);
    const [sortList] = useContext(SortContext);
    const showHideFilter2 = atom({
        key: "_ShowHideFilter",
        default: 'true',
    });
    const menuOpenClose = atom({
        key: "_menuOpenClose",
        default: 'true',
    });
    const sortSelected = atom({
        key: "_sortSelected",
        default: '',
    });
    const newFilter = atom({
        key: "_filterState",
        default: "",
    });
    const search = atom({
        key: "_searchState",
        default: "",
    });
    const Query = atom({
        key: "_critQuery",
        default: "",
    });
    const [anyQuery, setAnyQuery] = useRecoilState(Query);
    const [searchNew, setSearchNew] = useRecoilState(search);
    const [showFilter, setShowFilter] = useRecoilState(showHideFilter2);
    const [menuToggle, setMenuToggle] = useRecoilState(menuOpenClose);
    const [order_by, setOrder_by] = useRecoilState(sortSelected);
    const [filter, setFilter] = useRecoilState(newFilter);

    const selectRef = useRef();

    const handleFilter = () => {
        setShowFilter(x => x === 'true' ? 'false' : 'true');
    };

    function handleMenu() {
        setMenuToggle(menuToggle === '' ? 'active' : '');
    }
    function sortSelect(event) {
        setOrder_by(event.target.value)
    }
    function resetAllQuerys() {

        selectRef.current.value = "";
        setSearchNew('');
        setOrder_by('');
        setFilter({
            checked: false,
            name: 'ALL',
            value: 'ALL',
        });
        setFilters((x) => {
            const newFilters = filters.map((item) => {
                return {
                    count: item.count,
                    data: item.data,
                    field: item.field,
                    filterId: item.filterId,
                    checked: false
                }
            });
            return newFilters;
        });
        setAnyQuery(null);
    }


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

                <div className="four__square" title='Reset all filter,sort' onClick={resetAllQuerys}>
                    <i className={`fa fa-recycle  ${anyQuery === 'true' ? "red" : ""}`}></i>
                </div>
                <a href="#"><div className="filter__form active" onClick={handleFilter}>
                    <input type="text" id="filter" placeholder='Filter' disabled value={`${filters.filter(x => x.checked === true).length} filters selected`} />
                </div>   </a>

                <div className="sort__box" >
                    <select className="selection__form" name="price" id="price" ref={selectRef} onChange={sortSelect}>
                        <option className="opt" value="">Sort</option>
                        {
                            sortList && sortList.length > 0 ? sortList.map((item, index) => (
                                <>
                                    <option className="opt sortItem" value={item[0] + ' asc'} key={(index+11)*11}>{item[1]}&#9651; </option>
                                    <option className="opt sortItem" value={item[0] + ' desc'} key={index*991}>{item[1]} &#9661;</option>
                                </>
                            )) : null
                        }
 
                    </select>
                </div>
                <CardsSearch />
                <div className="toggle__btn" id="to__btn" onClick={handleMenu}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
            <CardsFilter />
        </>
    )


}
export default CardsHeader;
