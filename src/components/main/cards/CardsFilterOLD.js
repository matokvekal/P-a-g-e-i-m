import React from 'react';
import { RecoilRoot } from "recoil";
import { atom, useRecoilState } from 'recoil';




export default function CardsFilter() {
   const showHideFilter1 = atom({
      key: "ShowHideFilter",
      default: "",
   });
   const [showFilter, setShowFilter] = useRecoilState(showHideFilter1);
   return (
      <div className="sub__menu">
         
         <div className={`catagory  ${showFilter==='true'?"active":""}`} id="catagory ">
            <div className="sub__catagory__1">
               <input type="checkbox" id="A" />
               <label for="A">Catagory 1 {showFilter}</label>
               <ul className="sub__catagory">
                  <li className="cat__item">
                     <input type="checkbox" id="sub__1" />
                     <label for="sub__1">Sub Catagory 1-1</label>
                  </li>
                  <li className="cat__item">
                     <input type="checkbox" id="sub__2" />
                     <label for="sub__1">Sub Catagory 1-2</label>
                  </li>
               </ul>
            </div>
            <div className="sub__catagory__2">
               <input type="checkbox" id="B" />
               <label for="B">Catagory 2</label>
               <ul className="sub__catagory">
                  <li className="cat__item">
                     <input type="checkbox" id="sub__2" />
                     <label for="sub__2">Sub Catagory 2-1</label>
                  </li>
                  <li className="cat__item">
                     <input type="checkbox" id="sub__2" />
                     <label for="sub__2">Sub Catagory 2-2</label>
                  </li>
                  <li className="cat__item">
                     <input type="checkbox" id="sub__2" />
                     <label for="sub__2">Sub Catagory 2-3</label>
                  </li>
               </ul>
            </div>
            <div className="sub__catagory__3">
               <input type="checkbox" id="C" />
               <label for="C">Catagory 3</label>
               <ul className="sub__catagory">
                  <li className="cat__item">
                     <input type="checkbox" id="sub__3" />
                     <label for="sub__1">Sub Catagory 3-1</label>
                  </li>
                  <li className="cat__item">
                     <input type="checkbox" id="sub__3" />
                     <label for="sub__1">Sub Catagory 3-2</label>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )

}