import React, { useState } from "react";
import { atom, useRecoilState } from 'recoil';


const CurentPage = atom({
  key: "_CurentPage",
  default: "1",
});
const ItemInPage = atom({
  key: "_itemInPage",
  default: "20",
});
const totalItems = atom({
  key: "_totalItems",
  default: "",
});
const MobilePage = atom({
  key: "_mobilePage",
  default: "",
});
function usePagination() {
  const [items, setItems] = useRecoilState(totalItems);
  const [itemsPerPage, setItemsPerPage] = useRecoilState(ItemInPage);
  const [currentPage, setCurrentPage] = useRecoilState(CurentPage);
  const [mobilePage, setMobilePage] = useRecoilState(MobilePage);
  const maxPage = Math.ceil(items / itemsPerPage > 0 ? items / itemsPerPage : 1);
  function setPage(currentPage) {
    setCurrentPage(currentPage);
    setMobilePage(false);
  }
  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    setMobilePage(false);
  }
  function nextMobile() {
    //debugger
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    setMobilePage(true);
  }
  
  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    setMobilePage(false);
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    setMobilePage(false);
  }

  return { next, prev, jump, currentPage, setCurrentPage, maxPage, itemsPerPage, setItemsPerPage, items, setItems ,mobilePage, setMobilePage,nextMobile};
}

export default usePagination;