(function ($) {
	"use strict";

	$(".msg-trigger-btn").on("click", function (event) {
		event.stopPropagation();
		event.preventDefault();
		var $this = $(this);
		var $prevTartget = $(this).parent().siblings().children(".msg-trigger-btn").attr('href');
		var target = $this.attr('href');
		$(target).slideToggle();
		$($prevTartget).slideUp();
		
    });

	//Close When Click Outside
	$('body').on('click', function(e){
		var $target = e.target;
		if (!$($target).is('.message-dropdown') && !$($target).parents().is('.message-dropdown')) {
			$(".message-dropdown").slideUp("slow");
		}
	});

	//Background Image JS start
	var bgSelector = $(".bg-img");
	bgSelector.each(function (index, elem) {
		var element = $(elem),
			bgSource = element.data('bg');
		element.css('background-image', 'url(' + bgSource + ')');
	});

    // video player active js
	var plyrVideo = new Plyr('.plyr-video'),
      	plyrAudio = new Plyr('.plyr-audio'),
      	plyrYoutube = new Plyr('.plyr-youtube'),
		plyrVimeo = new Plyr('.plyr-vimeo');
		  
    // active profile carousel js
	$('.active-profile-carousel').slick({
        speed: 800,
        slidesToShow: 10,
		prevArrow: '<button type="button" class="slick-prev"><i class="bi bi-arrow-left-rounded"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="bi bi-arrow-right-rounded"></i></button>',
		responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 8,
			}
		}]
	});

	// active profile carousel js
	$('.active-profile-mobile').slick({
        speed: 800,
		slidesToShow: 6,
		arrows: false,
		responsive: [{
			breakpoint: 480,
			settings: {
				slidesToShow: 4,
			}
		}]
	});

	// active profile carousel js
	$('.favorite-item-carousel').slick({
		autoplay: true,
        speed: 800,
		slidesToShow: 5,
		arrows: false,
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 2,
			}
		}]
	});

	// live chat box and friend search box active js
	$(".profile-active").on('click', function(){
		$(".chat-output-box").addClass('show');
	})
	$(".search-field").on('click', function(){
		$(".friend-search-list").addClass('show');
	})
	$(".close-btn").on('click', function(){
		var $this = $(this),
			$target = $this.data('close');
		$('.'+$target).removeClass('show');
	})
	
	// mobile header seach box active
	$(".search-trigger").on('click', function(){
		$('.search-trigger, .mob-search-box').toggleClass('show');
	})
	
	$(".chat-trigger, .close-btn").on('click', function(){
		$('.mobile-chat-box').toggleClass('show');
	})
	$(".request-trigger").on('click', function(){
		$('.frnd-request-list').toggleClass('show');
	})

	// mobile friend search active js
	$(".search-toggle-btn").on('click', function(){
		$('.mob-frnd-search-inner').toggleClass('show');
	})

	// profile dropdown triger js
	$('.profile-triger').on('click', function(event){
		event.stopPropagation();
        $(".profile-dropdown").slideToggle();
	})

	//Close When Click Outside
	$('body').on('click', function(e){
		var $target = e.target;
		if (!$($target).is('.profile-dropdown') && !$($target).parents().is('.profile-dropdown')) {
			$(".profile-dropdown").slideUp("slow");
		}
	});

	// perfect scroll bar js
	$('.custom-scroll').each(function(){
		var ps = new PerfectScrollbar($(this)[0]);
	});


	// light gallery active js
	$(document).ready(function() {
        $(".img-popup").lightGallery(); 

		// light gallery images
        $(".img-gallery").lightGallery({
			selector: ".gallery-selector",
			hash: false
		}); 
	});

	$('.gallery-toggle').on('click', function () {

	var productThumb = $(this).find(".product-thumb-large-view img"),
			imageSrcLength = productThumb.length,
			images = [];
		for (var i = 0; i < imageSrcLength; i++) {
			images[i] = {"src": productThumb[i].src, "thumb": productThumb[i].src};
		}

		$(this).lightGallery({
			dynamic: true,
			actualSize: false,
			hash: false,
			index: 0,
			dynamicEl: images
		});

	});

	// photo filter active js
	$('.photo-filter').imagesLoaded( function() {
		var $grid = $('.photo-filter, .friends-list').isotope({
		});
		// filter items on button click
		$('.filter-menu').on( 'click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
			$(this).siblings('.active').removeClass('active');
	         $(this).addClass('active');
		});
		
	});

	// nice select active js
	$('select').niceSelect();

	// Scroll to top active js
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 600) {
			$('.scroll-top').removeClass('not-visible');
		} else {
			$('.scroll-top').addClass('not-visible');
		}
	});
	$('.scroll-top').on('click', function (event) {
		$('html,body').animate({
			scrollTop: 0
		}, 1000);
	});


	$('#email').bind("cut copy paste",function(e) {
		e.preventDefault();
	});
    
})(jQuery);





// function postContent(isModal = false) {
// 	// Get the text and image from the textarea and file input
// 	let text = isModal ? document.getElementById("modalPostText").value : document.getElementById("postText").value;
// 	let image = isModal ? document.getElementById("modalImageUpload").files[0] : document.getElementById("imageUpload").files[0];

// 	// Update the existing post-content div with the new content
// 	let postContent = document.getElementById("postedContent");
// 	postContent.style.display = "block"; // Show the post content div

// 	postContent.querySelector(".post-desc").innerText = text;

// 	let imgElement = postContent.querySelector(".post-thumb img");
// 	if (image) {
// 		imgElement.src = URL.createObjectURL(image);
// 		imgElement.alt = "post image";
// 	} else {
// 		imgElement.src = ""; // Set to an empty string if no image is provided
// 		imgElement.alt = "";
// 	}

// 	// Close the modal if it's open
// 	if (isModal) {
// 		let modal = new bootstrap.Modal(document.getElementById("textbox"));
// 		modal.hide();
// 	}
// }




//let post_comment = document.getElementById("post_comment1");

let addComment = document.getElementById("comment");

function functoggleShare() {
    if (addComment.style.display === "block") {
        addComment.style.display = "none";
    } else {
        addComment.style.display = "block";
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

let share = document.getElementById("comment");

function functoggle() {
    if (share.style.display === "block") {
        share.style.display = "none";
    } else {
        share.style.display = "block";
    }
}

 



function submit_comment(){
	var comment = $('.commentar').val();
	el = document.createElement('li');
	el.className = "box_result row";
	el.innerHTML =
		  '<div class=\"avatar_comment col-md-1\">'+
			'<img src=\"https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg\" alt=\"avatar\"/>'+
		  '</div>'+
		  '<div class=\"result_comment col-md-11\">'+
		  '<h4>Anonimous</h4>'+
		  '<p>'+ comment +'</p>'+
		  '<div class=\"tools_comment\">'+
		  '<a class=\"like\" href=\"#\">Like</a><span aria-hidden=\"true\"> · </span>'+
		  '<i class=\"fa fa-thumbs-o-up\"></i> <span class=\"count\">0</span>'+
		  '<span aria-hidden=\"true\"> · </span>'+
		  '<a class=\"replay\" href=\"#\">Reply</a><span aria-hidden=\"true\"> · </span>'+
			  '<span>1m</span>'+
		  '</div>'+
		  '<ul class="child_replay"></ul>'+
		  '</div>';
	  document.getElementById('list_comment').prepend(el);
	  $('.commentar').val('');
  }
  
  $(document).ready(function() {
	$('.show_more').on('click', function (e) {
	  $(".show_more").hide();
	  $(".show_less").show();
	});
	  $('#list_comment').on('click', '.like', function (e) {
		  $current = $(this);
		  var x = $current.closest('div').find('.like').text().trim();
		  var y = parseInt($current.closest('div').find('.count').text().trim());
		  
		  if (x === "Like") {
			  $current.closest('div').find('.like').text('Unlike');
			  $current.closest('div').find('.count').text(y + 1);
		  } else if (x === "Unlike"){
			  $current.closest('div').find('.like').text('Like');
			  $current.closest('div').find('.count').text(y - 1);
		  } else {
			  var replay = $current.closest('div').find('.like').text('Like');
			  $current.closest('div').find('.count').text(y - 1);
		  }
	  });
	  
	  $('#list_comment').on('click', '.replay', function (e) {
		  cancel_reply();
		  $current = $(this);
		  el = document.createElement('li');
		  el.className = "box_reply row";
		  el.innerHTML =
			  '<div class=\"col-md-12 reply_comment\">'+
				  '<div class=\"row\">'+
					  '<div class=\"avatar_comment col-md-1\">'+
						'<img src=\"assets/images/profile/profile-small-9.jpg\" alt=\"avatar\"/>'+
					  '</div>'+
					  '<div class=\"box_comment col-md-10\">'+
						'<textarea class=\"comment_replay\" placeholder=\"Add a comment...\"></textarea>'+
						'<div class=\"box_post\">'+
						  '<div class=\"pull-right\">'+
							'<span>'+
							  '<img src=\"assets/images/profile/profile-small-9.jpg" alt=\"avatar\" />'+
							  '<i class=\"fa fa-caret-down\"></i>'+
							'</span>'+
							'<button class=\"cancel\" onclick=\"cancel_reply()\" type=\"button\">Cancel</button>'+
							'<button onclick=\"submit_reply()\" type=\"button\" value=\"1\">Reply</button>'+
						  '</div>'+
						'</div>'+
					  '</div>'+
				  '</div>'+
			  '</div>';
		  $current.closest('li').find('.child_replay').prepend(el);
	  });
  });
  
  function submit_reply(){
	var comment_replay = $('.comment_replay').val();
	el = document.createElement('li');
	el.className = "box_reply row";
	el.innerHTML =
		  '<div class=\"avatar_comment col-md-1\">'+
			'<img src=\"https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg\" alt=\"avatar\"/>'+
		  '</div>'+
		  '<div class=\"result_comment col-md-11\">'+
		  '<h4>Anonimous</h4>'+
		  '<p>'+ comment_replay +'</p>'+
		  '<div class=\"tools_comment\">'+
		  '<a class=\"like\" href=\"#\">Like</a><span aria-hidden=\"true\"> · </span>'+
		  '<i class=\"fa fa-thumbs-o-up\"></i> <span class=\"count\">0</span>'+
		  '<span aria-hidden=\"true\"> · </span>'+
		  '<a class=\"replay\" href=\"#\">Reply</a><span aria-hidden=\"true\"> · </span>'+
			  '<span>1m</span>'+
		  '</div>'+
		  '<ul class="child_replay"></ul>'+
		  '</div>';
	  $current.closest('li').find('.child_replay').prepend(el);
	  $('.comment_replay').val('');
	  cancel_reply();
  }
  
  function cancel_reply(){
	  $('.reply_comment').remove();
  }



  // ================================================== function to display posts =======================

// Initialize the template for postedContentSingle
const postContentSingleTemplate = document.getElementById("postedContentSingle").cloneNode(true);
postContentSingleTemplate.style.display = "none"; // Set to "none" initially to hide it

function postContent(isModal = false) {
    // Get the text and image from the textarea and file input
    let text = isModal ? document.getElementById("modalPostText").value : document.getElementById("postText").value;
    let image = isModal ? document.getElementById("modalImageUpload").files[0] : document.getElementById("imageUpload").files[0];

    // Check if both text and image are empty
    if (!text.trim() && !image) {
        alert("Please enter text or upload an image before posting.");
        return; // Stop execution if both text and image are empty
    }

    // Clone the template for postContentSingle
    let postContentSingleClone = postContentSingleTemplate.cloneNode(true);
    postContentSingleClone.style.display = "block"; // Set to "block" for the cloned post to be visible

    // Create elements for post description and image
    let postDesc = document.createElement("p");
    postDesc.className = "post-desc";
    postDesc.innerText = text;

    let imgElement = document.createElement("img");
    imgElement.className = "post-thumb";
    if (image) {
        imgElement.src = URL.createObjectURL(image);
        imgElement.alt = "post image";
    } else {
        imgElement.style.display = "none"; // Hide the image element if no image is provided
    }

    // Append the new p and img elements to the cloned template
    let postContent = postContentSingleClone.querySelector(".post-content");
    postContent.querySelector(".post-desc").replaceWith(postDesc); // Replace existing p with the new one
    postContent.querySelector(".post-thumb").replaceWith(imgElement); // Replace existing img with the new one

    // Append the cloned template to the container
    let container = document.getElementById("postedContent");
    container.insertBefore(postContentSingleClone, container.firstChild); // Insert cloned template at the beginning

    // Clear input fields
    if (isModal) {
        document.getElementById("modalPostText").value = "";
        document.getElementById("modalImageUpload").value = "";
    } else {
        document.getElementById("postText").value = "";
        document.getElementById("imageUpload").value = "";
    }

    // Close the modal if it's open
    if (isModal) {
        let modal = new bootstrap.Modal(document.getElementById("textbox"));
        modal.hide();
    }
}
// =========================================================================================