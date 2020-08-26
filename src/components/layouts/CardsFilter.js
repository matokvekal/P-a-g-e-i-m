import React from 'react';

const CardsFilter =()=>{

   return(
      <>
          <div className="sub__menu">
                    <div className="catagory" id="catagory">    
                        <div className="sub__catagory__1">
                            <input type="checkbox" id="A"/>
                            <label htmlFor="A">Catagory 1</label>
                            <ul className="sub__catagory">
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__1"/>
                                    <label htmlFor="sub__1">Sub Catagory 1-1</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__1">Sub Catagory 1-2</label>
                                </li>
                            </ul>
                        </div>
                        <div className="sub__catagory__2">
                            <input type="checkbox" id="B"/>
                            <label htmlFor="B">Catagory 2</label>
                            <ul className="sub__catagory">
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__2">Sub Catagory 2-1</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__2">Sub Catagory 2-2</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__2">Sub Catagory 2-3</label>
                                </li>
                            </ul>
                        </div>
                        <div className="sub__catagory__3">
                            <input type="checkbox" id="C"/>
                            <label htmlFor="C">Catagory 3</label>
                            <ul className="sub__catagory">
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__3"/>
                                    <label htmlFor="sub__1">Sub Catagory 3-1</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__3"/>
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