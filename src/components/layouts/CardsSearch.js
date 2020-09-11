import React, { useState } from 'react';
import { RecoilRoot } from "recoil";
import { atom, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

const CardsSearch = () => {
const search = atom({
   key: "searchState",
   default: "",
});
const [searchNew, setSearchNew] = useRecoilState(search);

function handleSearch(e){
setSearchNew(e.target.value);
}

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