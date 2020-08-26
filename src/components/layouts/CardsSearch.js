import React, { useState } from 'react';
import { RecoilRoot } from "recoil";
import { atom, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

const CardsSearch = () => {
const [search, setSearch] = useState('');
const newSearch = atom({
   key: "searchState",
   default: "",
});
const [searchNew, setSearchNew] = useRecoilState(newSearch);

function handleSearch(e){
setSearch(e.target.value);
setSearchNew(e.target.value);
// console.dir(search);
}

   return (
      <>
         <div className="search__box">
            <form action="#">
               <input type="text" className="input" value={search} placeholder={'search'} onChange={handleSearch} />
               <i className="fas fa-search"></i>{searchNew}
            </form>
         </div>
         <div className="search__box__res">
            <form action="#">
               <input type="text" className="input" value />
            </form>
         </div>
      </>
   )

}
export default CardsSearch;