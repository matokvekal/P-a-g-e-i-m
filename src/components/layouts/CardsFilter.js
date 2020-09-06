import React, { useState, useContext } from 'react';
import { FilterContext } from '../../context/FilterContext';
//import { MenuContext } from '../../context/MenuContext';
import { RecoilRoot } from "recoil";
import { atom, useRecoilState } from 'recoil';



const CardsFilter = () => {
    const showHideFilter = atom({
        key: "ShowHideFilter",
        default: "",
    });
    const newFilter = atom({
        key: "filterState",

        default: "",
    });
    const [filter, setFilter] = useRecoilState(newFilter);
    const [showFilter, setShowFilter] = useRecoilState(showHideFilter);
    const [filters, setFilters] = useContext(FilterContext);
    const [filterCheckbox, setFilterCheckbox] = useState(filters.filter(x => x.checked === true).length === 0 ? false : true)
    function removeAllFilters(e) {//condidere to remove this// copy atom as remove all//go to server to same SP but flag remove all,the return  no selected filter/in useEffect it will change all 
        debugger
        setFilter({
            checked: e.target.checked,
            name: 'ALL',
            value: 'ALL',
        })
        setFilters((x) => {
            const newFilters = filters.map((item) => {

                return {
                    count: item.count,
                    data: item.data,
                    field: item.field,
                    filterId: item.filterId,

                }


            });
            return newFilters;
        });
        // setFilterCheckbox(false)

    }
    function handleSelectFilter(e) {
        //after filter change it will handle in card3.js filterUpdate
   

        setFilter({
            checked: e.target.checked,
            name: e.target.name,
            value: e.target.value,
        })
        setFilters((x) => {
            const newFilters = filters.map((item) => {
                if (item.filterId.toString() === e.target.id) {
                    return {
                        ...item,
                        checked: e.target.checked,
                    }
                }
                else {
                    return item;
                }
            });
            return newFilters;
        }

        )
    }

    let categorys = [...new Set(filters.map(cat => cat.field).filter(x => x))];


    return (
        <>
            <div className="sub__menu">
                <div className={`catagory  ${showFilter === 'true' ? "active" : ""}`} id="catagory ">
                    {filters && filters.length > 0 ?
                        <>
                            <h1 className='filterheader'>Filters: ({filters.length} )   <input className="filterCheckbox" type="checkbox" checked={filters.filter(x => x.checked === true).length === 0 ? false : true} onClick={removeAllFilters} /> </h1>

                            {categorys.map((category, index1) => (
                                <>
                                    <div className={index1 % 2 === 0 ? 'sub__catagory__1' : 'sub__catagory__2'} key={7623 * index1}>

                                        <label htmlFor={index1 % 2 === 0 ? 'A' : 'B'}>{category}</label>
                                        <ul className="sub__catagory">
                                            {filters.filter(item => item.field === category).map((item, index) => (


                                                <li className="cat__item" key={index * 1999}>
                                                    <input type="checkbox" id={item.filterId} value={item.data} name={category} onClick={handleSelectFilter} checked={item.checked} />
                                                    <label htmlFor={index1 % 2 === 0 ? 'sub__1' : 'sub__2'}>{item.data}({item.count})</label>
                                                </li>

                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ))}
                        </>
                        : null}


                </div>

            </div>
        </>
    )

}
export default CardsFilter;