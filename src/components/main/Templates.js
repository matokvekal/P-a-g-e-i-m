import React from 'react'
import templates from './templatesResource/templates.css';

export const Templates = () => {
    

  
      return (
        <>
<div className='body'>
<div className="header1 hero">
        <div className="navbar">
            <div className="container header-container">
                <div className="logo">
                    <img className='image' src="img/logo.png" className="logo-img"/>
                </div>
                <nav className="main-navigation">
                    <a href="#">About Us</a>
                    <a href="#">Contact Us</a>
                </nav>
            </div>
        </div>
        <div className="header-text">
            <div className="container">
                <h1 className='h1'>Information for Community Empowerment</h1>
            </div>
        </div>
    </div>

    <div className="container">
            <main className="main-content">
                <h2 className='h2'>Latest Entries</h2>
                <div className="entry">
                    <img className='image' src={require('./templatesResource/images/01.jpg')} />
                    <div className="content">
                        <h3 className='h3'>Israel bire races standing</h3>
                        <p>Cards of: <span>Riders personal results</span></p>
                        <p>By: <span>Purple Green device</span></p>
                        <a href="/races" className="button">Get It</a>
                    </div>
                </div>
                <div className="entry">
                <img className='image' src={require('./templatesResource/images/02.jpg')} />
                    <div className="content">
                        <h3 className='h3'>The Complete Guide for Traveling</h3>
                        <p>Published on: <span>July 19th,  2019</span></p>
                        <p>By: <span>The Travel Blog</span></p>
                        <a href="#" className="button">Get It</a>
                    </div>
                </div>
                <div className="entry">
                <img className='image' src={require('./templatesResource/images/03.jpg')} />
                    <div className="content">
                        <h3 className='h3'>Ultimate Guide to Take the best Pictures</h3>
                        <p>Published on: <span>July 19th,  2019</span></p>
                        <p>By: <span>The Travel Blog</span></p>
                        <a href="#" className="button">Get It</a>
                    </div>
                </div>
                <div className="entry">
                <img className='image' src={require('./templatesResource/images/04.jpg')} />
                    <div className="content">
                        <h3 className='h3'>Checklist for your next Travel</h3>
                        <p>Published on: <span>July 19th,  2019</span></p>
                        <p>By: <span>The Travel Blog</span></p>
                        <a href="#" className="button">Get It</a>
                    </div>
                </div>
                <div className="entry">
                <img className='image' src={require('./templatesResource/images/05.jpg')} />
                    <div className="content">
                        <h3 className='h3'>Best Places to visit next Autumn</h3>
                        <p>Published on: <span>July 19th,  2019</span></p>
                        <p>By: <span>The Travel Blog</span></p>
                        <a href="#" className="button">Get It</a>
                    </div>
                </div>
                <div className="entry">
                <img className='image' src={require('./templatesResource/images/06.jpg')} />
                    <div className="content">
                        <h3 className='h3'>Best Places to Visit with Mountains</h3>
                        <p>Published on: <span>July 19th,  2019</span></p>
                        <p>By: <span>The Travel Blog</span></p>
                        <a href="#" className="button">Get It</a>
                    </div>
                </div>
            </main>
            <div className="categories">
                <ul>
                    <li>
                        <a href="#">
                            <i className="fas fa-map-pin"></i>
                            Activities
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-music"></i>
                            Festivals
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-utensils"></i>
                            Restaurants
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fas fa-check"></i>
                            Tips
                        </a>
                    </li>
                </ul>
            </div>
            <footer className="footerTemplate">
        <div className="container">
            <div className="box">
                <h2 className='h2'>About Us</h2>
                <p>Maecenas rhoncus dolor nisi, nec lobortis sapien pulvinar ut. Duis dolor lacus, laoreet vel massa a, ultrices varius tellus. Aliquam sed ornare augue. Donec vel molestie quam, eget imperdiet nibh.</p>

                <p>Sed eu pulvinar ante, sit amet facilisis libero. Fusce placerat, risus at dapibus viverra, diam mauris suscipit augue, a sagittis felis libero in lacus. Sed sit amet erat at augue congue malesuada et eget lacus.</p>
            </div>
            <div className="box">
                <h2 className='h2'>Latest Entries</h2>
                <ul>
                    <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li>
                    <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li>
                    <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li>
                    <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li>
                    <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li>
                </ul>
            </div>
            <div className="box">
                <h2 className='h2'>Follow Us</h2>
                <nav className="social-nav">
                    <a href="http://facebook.com"><span>Facebook</span></a>
                    <a href="http://twitter.com"><span>Twitter</span></a>
                    <a href="http://youtube.com"><span>YouTube</span></a>
                    <a href="http://instagram.com"><span>Instagram</span></a>
                    <a href="http://pinterest.com"><span>Pinterest</span></a>
                </nav>
            </div>
        </div>
        <p className="copyright">purple green device &copy; </p>
    </footer>
    
            </div>
            </div>
      </>
      )
    }

export default Templates;