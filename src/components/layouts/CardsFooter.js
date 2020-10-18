import React, { useState, useEffect } from 'react';
import CardsPaging from './CardsPaging';
import usePagination from './../../hooks/Pagination';
import { atom, useRecoilState, RecoilRoot } from 'recoil';
import 'antd/dist/antd.css';
import { Button } from 'antd';
const CardsFooter = () => {

    const { setItemsPerPage, nextMobile,items,itemsPerPage ,currentPage,mobilePage} = usePagination();
    const [hildeScroll, setHideScroll] = useState('scrollHide');


    const ScrollPosition = atom({
        key: "_setthecrollPosition",
        default: 'true',
    });
    const [scrollPosition, setScrollPosition] = useRecoilState(ScrollPosition);

    // const handleScroll = () => {
    //     const position = window.pageYOffset;
    //     setSrollPosition(position);
    // };

    useEffect(() => {
        window.onscroll = function () { manageScroll() };
    }, []);

    const showHideFilter2 = atom({
        key: "_ShowHideFilter",
        default: 'true',
    });
    const menuOpenClose = atom({
        key: "_menuOpenClose",
        default: 'true',
    });
    const [showFilter, setShowFilter] = useRecoilState(showHideFilter2);


    const manageScroll = () => {
        setHideScroll(document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY > 100 ? 'scrollHide' : null);
        setScrollPosition(window.scrollY);
        // setShowFilter('false' );gilad
    }

    const itemsInPage = [20, 50, 100];
    const handleItems = (event) => {
        setItemsPerPage(event.target.value);
    }
    return (
        <>
            <div className="footer">
                <CardsPaging />
                <div className="page__box">
                    <>
                        <select className="selection__form" name="itemInpage" id="itemInpage" onChange={handleItems}>
                            {
                                itemsInPage.map((each, index) => (
                                    <option className="opt" value={each} key={index} >{each} Per Page</option>
                                ))
                            }

                        </select>
                    </>
                </div>
            </div>
            <div className={hildeScroll === 'scrollHide' ? 'scrollHide' : 'footerMobile'} >
                <div className="page__box" className={hildeScroll}>
                    <div className='page__box'>
                        <Button className={itemsPerPage*currentPage>items?'footer__botton__hide':`footer__botton`}   type="primary" onClick={nextMobile} >
                             {itemsPerPage*currentPage>items?'0':<>more</>}
                       </Button>

                        <div className="total__mobile_left">

                         {itemsPerPage*currentPage>items?'':` ${items-itemsPerPage*currentPage}`}   

                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}
export default CardsFooter;