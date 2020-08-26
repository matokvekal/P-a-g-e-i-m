import React from 'react';

const CardsSort =()=>{

   return(
      <>
          <div className="sub__menu1">
                    <div className="sort" id="sort">    
                        <div className="sub__sort__1">
                            <input type="checkbox" id="A"/>
                            <label htmlFor="A">sort 1</label>
                            <ul className="sub__sort">
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__1"/>
                                    <label htmlFor="sub__1">Sub sort 1-1</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__1">Sub sort 1-2</label>
                                </li>
                            </ul>
                        </div>
                        <div className="sub__sort__2">
                            <input type="checkbox" id="B"/>
                            <label htmlFor="B">sort 2</label>
                            <ul className="sub__sort">
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__2">Sub sort 2-1</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__2">Sub sort 2-2</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__2">Sub sort 2-3</label>
                                </li>
                            </ul>
                        </div>
                        <div className="sub__sort__3">
                            <input type="checkbox" id="C"/>
                            <label htmlFor="C">sort 3</label>
                            <ul className="sub__sort">
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__3"/>
                                    <label htmlFor="sub__1">Sub sort 3-1</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__3"/>
                                    <label htmlFor="sub__1">Sub sort 3-2</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
      </>
   )

}
export default CardsSort;