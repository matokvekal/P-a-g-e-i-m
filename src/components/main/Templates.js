import React from 'react'

import takanon from './../../assets/documents/takanon.pdf';

export const Templates = () => {


   const slider = () => {
      let slides = document.querySelectorAll('.slider .slide');
      let slidesButtonParent = document.querySelector('.slider .slider-button');
      let i = 0, slideChange;
      slides[i].classList.add('active');

      // add control buttons to change slides
      slides.forEach((elem, i) => {
         slidesButtonParent.insertAdjacentHTML('beforeend', `<div id="s-${i}" class="${i == 0 ? 'active' : ''}"></div>`);
      });

      // code to run slider
      function sliderStart() {
         return (
            setInterval(() => {
               changeSlide((i + 1) % slides.length, true);
            }, 5000)
         );
      }

      function changeSlide(j, bool) {
         slides[i].classList.remove('active');
         slidesButtonParent.querySelector(`#s-${i}`).classList.remove('active');
         slides[j].classList.add('active');
         if (bool) {
            slides[j].style.animation = "sliderNext 0.35s ease-out forwards";
         } else {
            slides[j].style.animation = "sliderPrev 0.35s ease-out forwards";
         }
         slidesButtonParent.querySelector(`#s-${j}`).classList.add('active');
         i = j;
      }

      // on change button click
      document.querySelector('.slider-button').addEventListener('click', e => {

         // fetch slide no from button
         if (e.target.id.includes('s-')) {
            let newSlideNum = parseInt(e.target.id.split('-')[1]);
            if (newSlideNum === i) { return; }
            let nextOrPrev = newSlideNum > i ? true : false;
            // first clear old run
            clearInterval(slideChange);
            changeSlide(newSlideNum, nextOrPrev);
         }

         // reinitialize slider run
         slideChange = sliderStart();

      });

      slideChange = sliderStart();
   }
   return (
      <>
         <div className='body'>

            <header className="banner">

               <div className="nav-wrap">
                  <div className="logo">
                     <img src={require('./templatesResource/images/logo.svg')} alt="logo" />
                  </div>
                  <label for="navigation" className="open"></label>
                  <input type="checkbox" id="navigation" />
                  <nav>
                     <ul>
                        <label for="navigation" className="close"></label>
                        <li>
                           <a href="home.html">Home</a>
                        </li>
                        <li>
                           <a href="database.html">Databases</a>
                        </li>
                     </ul>
                  </nav>
               </div>

               <div className="banner-content">
                  <h1>
                     XOA
                    <span>Made by athletes. For athletes.</span>
                  </h1>
               </div>
            </header>

            <section className="results">
               <div className="results-left">
                  <img src={require('./templatesResource/images/num-block.png')} alt="num" />
               </div>
               <div className="results-right">
                  <div className="slider ">
                     <div className="slider-button">
                        {/* <!-- buttons placed here dynamically --> */}
                     </div>
                     <div class="slider-button">
                        <div id="s-0" class="active"></div>
                        <div id="s-1" class=""></div>
                        <div id="s-2" class=""></div>
                        </div>

                     <div className="slide active">
                        <div className="result-heading">LATEST RESULTS! 1</div>
                        <div className="result-desc">דירוג שנתי 2021</div>
                        <button className="result-button btn bg-slate">Go Now</button>
                     </div>

                     <div className="slide active">
                        <div className="result-heading">LATEST RESULTS! 2</div>
                        <div className="result-desc">דירוג שנתי 2021</div>
                        <button className="result-button btn bg-slate">Go Now</button>
                     </div>

                     <div className="slide active">
                        <div className="result-heading">LATEST RESULTS! 3</div>
                        <div className="result-desc">דירוג שנתי 2021</div>
                        <button className="result-button btn bg-slate">Go Now</button>
                     </div>
                  </div>
               </div>
            </section>

            <section className="card-container database">
               <div className="card-content">
                  <h2>Our database</h2>
                  <p className="card-content-text">
                     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
		           	</p>
                  <button className="btn bg-dark card-content-btn">Go Now</button>
               </div>
               <div className="card-img">
                  <img src={require('./templatesResource/images/database.png')} alt="database" />
               </div>
            </section>

            <section className="card-container about">
               <div className="card-img">
                  <img src={require('./templatesResource/images/about.png')} alt="about" />
               </div>
               <div className="card-content">
                  <h2>About Us</h2>
                  <p className="card-content-text">
                     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
			</p>
               </div>
            </section>

            <section className="card-container technology">
               <div className="card-content">
                  <h2>Our Technology</h2>
                  <p className="card-content-text">
                     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam no ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
			</p>
               </div>
               <div className="card-img">
                  <img src={require('./templatesResource/images/technology.png')} alt="technology" />
               </div>
            </section>

            <section className="contact">
               <div className="contact-wrap">
                  <h2 className="contact-heading">Contact Us</h2>
                  <p className="contact-tagline">Get in touch with the team behind XOA.</p>
                  <button className="btn btn-large bg-dark">Send an Email</button>
               </div>
            </section>

            <footer className="bg-dark">
               <p className="footer-text "> XOA smart business solutions <span> <span className="copyright">&copy;</span>|</span> Designed by G.L.D</p>
               <nav className="social-nav">
                  <a href="http://facebook.com"><span>Facebook</span></a>
               </nav>
               <div className="footer-links">
                  <a href={takanon} target='blank'>Policy</a>
               </div>
            </footer>
         </div>
      </>
   )
}

export default Templates;