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
                    <a href = "mailto: pageimgreendevice@gmail.com">Send Email</a>
                </nav>
            </div>
        </div>
        <div className="header-text">
            <div className="container">
                <h1 className='h1'>Community Empowerment Through Sport</h1>
            </div>
        </div>
    </div>

    <div className="container">
            <main className="main-content">
                <h2 className='h2'>Latest Entries</h2>
                <div className="entry">
                    <img className='image' src={require('./templatesResource/images/bike1.jpg')} />
                    <div className="content">
                        <h3 className='h3'>Israel bike races standing</h3>
                        <p>Cards of: <span>Riders personal results</span></p>
                        <p>By: <span>Purple Green device</span></p>
                        <a href="/races" className="button">Get It</a>
                    </div>
                </div>
                <div className="entry">
                    <img className='image' src={require('./templatesResource/images/swim1.jpg')} />
                    <div className="content">
                        <h3 className='h3'>Israel swimming Competitions </h3>
                        <p>Cards of: <span>Swimmers  personal results</span></p>
                        <p>By: <span>Purple Green device</span></p>
                        <a href="/swim" className="button">Get It</a>
                    </div>
                </div>
                <div className="entry">
            
                </div>
                <div className="entry">
             
                </div>
                <div className="entry">
           
                </div>
                <div className="entry">
           
                </div>
            </main>
            <div className="categories">
                <ul>
                    <li>
                        <a href="#">
                        <i className="fas fa-cloud"></i>
                            green device cloud
                        </a>
                    </li>
                    <li>
                        <a href="#">
                         <i className="fas fa-users"></i>
                            For community
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <i className="fas fa-basketball-ball"></i>
                            Sport
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
                    {/* <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li>
                    <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li>
                    <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li>
                    <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li>
                    <li><a href="#">Ut loborties turpis lacinia enim Ut loborties turpis lacinia enim</a></li> */}
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
        <h3 className="copyright">&copy;  <h3 style={{color:'purple'}}>The green device</h3> </h3>
       
    </footer>
    
            </div>
            </div>
      </>
      )
    }

export default Templates;