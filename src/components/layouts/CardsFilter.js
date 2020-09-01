import React, { useState, useContext } from 'react';
import { FilterContext } from '../../context/FilterContext';
//import { MenuContext } from '../../context/MenuContext';
import { RecoilRoot } from "recoil";
import { atom, useRecoilState } from 'recoil';



const CardsFilter = () => {
    const showHideFilter1 = atom({
        key: "ShowHideFilter",
        default: "",
    });
    const [showFilter, setShowFilter] = useRecoilState(showHideFilter1);
    const [filters, setFilters] = useContext(FilterContext);
    let prevCat=null;
    debugger
    //const [categorys, setCategorys] = useState([...new Set(filters.map(cat => cat.field))]);
   // let categorys=[...new Set(filters.map(cat => cat.field))];
    //let categorys2 = new Set([...filters].filter(x => !categorys2.has(x)));
    let categorys=[...new Set(filters.map(cat => cat.field).filter(x=>x))];
    //let categorys= [...new Set(filters.map(cat => cat.field))];
    //const { menuList } = useContext(MenuContext);

    //const [Appfilters, setAppfilters] = useState([]);



    return (
        <>
            <div className="sub__menu">
                <div className={`catagory  ${showFilter === 'true' ? "active" : ""}`} id="catagory ">
                    {filters && filters.length > 0 ?
                        <>
                        
                            {categorys.map((category, index1) => (
                                <>
                                <div className={index1%2===0?'sub__catagory__1':'sub__catagory__2'} key={7623*index1}>
                                    <input type="checkbox" id={index1%2===0?'A':'B'}  />
                                    <label htmlFor={index1%2===0?'A':'B'}>{category}</label>
                                    <ul className="sub__catagory">
                                    {filters.filter(item=>item.field===category).map((item, index) => (


                                        <li className="cat__item" key={index*1999}>
                                            <input type="checkbox" id={index1%2===0?'sub__1':'sub__2'}/>
                                            <label htmlFor={index1%2===0?'sub__1':'sub__2'}>{item.data}({item.count})</label>
                                        </li>

                                    ))}
                                </ul>
                                </div>
                                </>
                            ))}
                        </>
                        : null}


                </div>
                <div className="catagory" id="catagory">
                    <div className="sub__catagory__1">
                        <input type="checkbox" id="A" />
                        <label htmlFor="A">Catagory 1</label>
                        <ul className="sub__catagory">
                            <li className="cat__item">
                                <input type="checkbox" id="sub__1" />
                                <label htmlFor="sub__1">Sub Catagory 1-11</label>
                            </li>
                            <li className="cat__item">
                                <input type="checkbox" id="sub__2" />
                                <label htmlFor="sub__1">Sub Catagory 1-21</label>
                            </li>
                        </ul>
                    </div>
                    <div className="sub__catagory__2">
                        <input type="checkbox" id="B" />
                        <label htmlFor="B">Catagory 2</label>
                        <ul className="sub__catagory">
                            <li className="cat__item">
                                <input type="checkbox" id="sub__2" />
                                <label htmlFor="sub__2">Sub Catagory 2-1</label>
                            </li>
                            <li className="cat__item">
                                <input type="checkbox" id="sub__2" />
                                <label htmlFor="sub__2">Sub Catagory 2-2</label>
                            </li>
                            <li className="cat__item">
                                <input type="checkbox" id="sub__2" />
                                <label htmlFor="sub__2">Sub Catagory 2-3</label>
                            </li>
                        </ul>
                    </div>
                    <div className="sub__catagory__3">
                        <input type="checkbox" id="C" />
                        <label htmlFor="C">Catagory 3</label>
                        <ul className="sub__catagory">
                            <li className="cat__item">
                                <input type="checkbox" id="sub__3" />
                                <label htmlFor="sub__1">Sub Catagory 3-1</label>
                            </li>
                            <li className="cat__item">
                                <input type="checkbox" id="sub__3" />
                                <label htmlFor="sub__1">Sub Catagory 3-2</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}
export default CardsFilter;