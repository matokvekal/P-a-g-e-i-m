import React, { useState } from 'react';
import './cardSearch.css'
import { RecoilRoot } from "recoil";
import { atom, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

const CardsSearch = () => {
   const search = atom({
      key: "_searchState",
      default: "",
   });
   const [searchNew, setSearchNew] = useRecoilState(search);

   const WaitSearch = atom({
      key: "_waitState",
      default: "",
   });
   const [wait, setWait] = useRecoilState(WaitSearch);

   const Query = atom({
      key: "_critQuery",
      default: "",
  });
  const [anyQuery, setAnyQuery] = useRecoilState(Query);
   const handleSearch = (e) => {
      if(e.target.value && e.target.value.length >12)
      return;
      //debugger
      if (!wait) {
         //debugger
         setWait(true);
         doSearch(e.target.value);
      }
      else {
         //debugger
         clearTimeout(doSearch);
         doSearch(e.target.value)
      }
      function doSearch(val) {
         setTimeout(function () {
            setSearchNew(val);
            setWait(false);
         }, 50);
   }
   setAnyQuery('true');//TODO fix only if e.target.value!=null
   }


   return (
      <>
         <div className="search__box">
            <form action="#">
               <input type="text" className="searchupper input" value={searchNew} placeholder={'search'} onChange={handleSearch} />
               <i className="fas fa-search"></i>
            </form>
         </div>

      </>
   )

}
export default CardsSearch;