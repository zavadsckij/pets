

	const obj = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  rows:1,
  slidesPerRow:1,
  dots: false,
  arrows: true,
  autoplay:true,
  autoplaySpeed: 1000,
  responsive:[
			  	{
			  		breakpoint:1200,
			  		settings:{
			  			slidesToShow: 2,
			  		}
			  	},
			  	{
			  		breakpoint:768,
			  		settings:{
			  			slidesToShow: 1,
			  		}
			  	}
			  ]
	};

	const obj2 = {
     infinite: false,
    rows:2,
    slidesPerRow:1,
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    arrows: false,
    autoplay:false,
    adaptiveHeight:false,
    responsive:[
          {
            breakpoint:1200,
            settings:{
              rows: 1,
              slidesPerRow:1,
              slidesToShow: 2,
              slidesToScroll: 2,

            }
          },
          {
            breakpoint:768,
            settings:{
              rows: 1,
              slidesToShow: 1,
              slidesToScroll: 1,
              slidesPerRow:1,
            }
          }
        ]
  };


	$('.slider').slick(obj);//init slider

	$('.slider-btn').click(()=>{//change slider to big version

    if (!$('.slider-btn').hasClass('visited')) {
      $('.slider').slick('unslick');  
    $('.slider').slick(obj2);

    $('.slider-btn').addClass('visited');
    }

    else{
      return;
    }	
	});

$('.slider-item').hover(//slider-item hover
  (e)=>{
    $(e.currentTarget).find('button').toggleClass('btn-hover');
  })

$('.burger').click((e)=>{//Open Burger menu
	$('.header__menu').slideToggle(300);
	$('.burger').toggleClass('active');
});

$(document).ready(function() {//add arrows to slider-buttons
	$('.slick-next').html('&#8594;');
	$('.slick-prev').html('&#8592;');
});

  $('.slider-item').click(//show modal window on slider
    (e)=>{
      const modal =  $('.modal-wrapper')
      const name =  modal.find('h2')
      const img = modal.find('img')
      const age = modal.find('li').first()
      modal.fadeIn(1000)

      img.attr({'src':$(e.currentTarget).find('img').attr('src')})
      name.text($(e.currentTarget).find('span').text())
      age.text(`Age: ${Math.floor(Math.random() * (36 - 2 + 1)) + 2} monthes`)
  })

  $('.modal-close').click(//close modal window
    ()=>{
      $('.modal-wrapper').fadeOut(1000)
    }
  )

  $(document).ready(function() {//scroll top btn
  	const top_show = 150;
  	const delay = 300; 
    $(window).scroll(function () {
      if ($(window).scrollTop() > top_show) $('.scroll-btn').fadeIn();
      else $('.scroll-btn').fadeOut();
    });
    $('.scroll-btn').click(function () { 
      $('body, html').animate({
        scrollTop: 0
      }, delay);
    });
  });