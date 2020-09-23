import React, { useState } from 'react';
import { RecoilRoot } from "recoil";
import { atom, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

const CardsSearch = () => {
   const search = atom({
      key: "searchState",
      default: "",
   });
   const [searchNew, setSearchNew] = useRecoilState(search);

   const WaitSearch = atom({
      key: "waitState",
      default: "",
   });
   const [wait, setWait] = useRecoilState(WaitSearch);


   const handleSearch = (e) => {
      debugger
      if (!wait) {
         debugger
         setWait(true);
         doSearch(e.target.value);
      }
      else {
         debugger
         clearTimeout(doSearch);
         doSearch(e.target.value)
      }
      function doSearch(val) {
         setTimeout(function () {
            setSearchNew(val);
            setWait(false);
         }, 100);
   }

   }

   // function handleSearch(e){
   // setSearchNew(e.target.value);
   // }

   return (
      <>
         <div className="search__box">
            <form action="#">
               <input type="text" className="input" value={searchNew} placeholder={'search'} onChange={handleSearch} />
               <i className="fas fa-search"></i>
            </form>
         </div>
         {/* <div className="search__box__res">
            <form action="#">
               <input type="text" className="input" value />
            </form>
         </div> */}
      </>
   )

}
export default CardsSearch;