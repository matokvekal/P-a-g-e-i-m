import React, { useState } from "react";
import { atom, useRecoilState} from 'recoil';


const CurentPage = atom({
   key: "_CurentPage",
   default: "1",
});
const ItemInPage = atom({
   key: "_itemInPage",
   default: "22",
});
const totalItems = atom({
   key: "_totalItems",
   default: "",
});
  function usePagination() {
   const[items,setItems]=useRecoilState(totalItems);
   const[itemsPerPage,setItemsPerPage]=useRecoilState(ItemInPage);
    const [currentPage, setCurrentPage] = useRecoilState(CurentPage);
    const maxPage = Math.ceil(items / itemsPerPage>0?items / itemsPerPage:1);
  function setPage(currentPage){
     setCurrentPage(currentPage)
  }
  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }
  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentPage,setCurrentPage, maxPage ,itemsPerPage,setItemsPerPage,items,setItems};
 }

 export default usePagination;