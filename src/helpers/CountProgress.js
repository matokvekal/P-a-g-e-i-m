import './countProgress.css';

let count = 60,
		deg = 0;
// Function to update time display each second
function display(val) {
	if(val < 10) { val = '0' + val; }
	$('.display').text(val);
}

timer(count);
// Timer function to countdown seconds and update angles of masks
// blocker added after 30 seconds
 function timer(count) {
	interval = setInterval(function(){
		count--;
		deg += 6;
		display(count);
		if(count >= 30) {
			$('.mask-right').css('transform', 'rotate(' + deg + 'deg)');
		} else {
			$('.mask-left').css('transform', 'rotate(' + deg + 'deg)');
		}
		
		if(count === 30) {
			deg = 0;
			$('.block').removeclassName('handle');
			$('.mask-left').removeclassName('handle');
		} else if(count === 0) {
			clearInterval(interval);
			$('.display').css('color', '#008c9e')
		}
	
   }, 1000);
   return (
      <>
      <body>
      <div className="circle"><span className="display" style="color: rgb(0, 140, 158);">00</span>
    <div className="semi-c left left-circle"></div>
    <div className="semi-c right mask-left" style="transform: rotate(180deg);"></div>
    <div className="semi-c right right-circle"></div>
    <div className="semi-c left mask-right" style="transform: rotate(180deg);"></div>
    <div className="semi-c right handle"></div>
  </div>
  </body>
      </>
   )
}

