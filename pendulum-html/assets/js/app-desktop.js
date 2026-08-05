

// ///////////////////////////////
// // Reference: https://codepen.io/hienlm/pen/BaojoBj
// // --------  drag  --------- //
// ///////////////////////////////

var isPendulumAudioLoaded = false, 
    WhatWeDoVideoIsReady = 0,
    pendulum_timer;
var preloader = $('#preloader');
/*
* Text fit container
* Reference: https://github.com/tkahn/jquery-responsive-headlines
*/

// $("#pendulumContextContainer .context-title").fitText();
// textFit(document.querySelectorAll(".context-title"));

(function () {
    var init,
        start, stop, move,
        _x, _y,
        active = false,
    drag = document.getElementById('pendulum-parent1'),
    d = document.getElementById('pendulum-wrapper'),
    con = document.getElementById('pendulum');
        
    init = function () {
        // Mouse Events
        drag.addEventListener('mousedown', start, false); // touchstart/mousedown
        $(document).bind('mousemove', function (event) { // touchmove/mousemove
            if (active === true) {
                move(event);
            }
        });
        $(document).bind('mouseup', function (event) { // touchend/mouseup
            stop(event.originalEvent);
        });
    };

    start = function (e) {
        e.preventDefault();
        // mouse pos
        var Mx = e.clientX,
            My = e.clientY,
            l = d.getBoundingClientRect().left,
            t = d.getBoundingClientRect().top;
        // offset 
        _x = Mx - l;
        _y = My - t;

        return active = true;
    };

    move = function (e) {
        e.preventDefault();
        var Mx = e.clientX,
            My = e.clientY,
            l = d.getBoundingClientRect().left,
            t = d.getBoundingClientRect().top,
            w = d.getBoundingClientRect().width,
            h = d.getBoundingClientRect().height,
            _l = con.getBoundingClientRect().left,
            _t = con.getBoundingClientRect().top,
            _w = con.getBoundingClientRect().width,
            _h = con.getBoundingClientRect().height,
            x, y;

            console.log(e.clientX);

        //check to see if mouse is inside container
        if (Mx - _x > _l && Mx + w - _l < _w + _x) {
            // x = mouseX - offsetX - containerX
            x = Mx - _x - _l;
        }
        if (My - _y > _t && My + h - _t < _h + _y) {
            // y = mouseY - offsetY - containerY
            y = My - _y - _t;
        }

        return d.style.left = x + 'px', d.style.top = y + 'px';
    };

    stop = function () {
        return active = false, d.style.left = '0px', d.style.top = '0px';
    };

    init();

}).call(this);

///////////////////////////////
// -------  rotate  -------- //
///////////////////////////////

var init, rotate, start, stop, finalAngle,
    active = false,
    angle = 0,
    rotation = 0,
    startAngle = 0,
    center = {
        x: 0,
        y: 0
    },
    R2D = 100 / Math.PI,
    rot = document.getElementById('pendulum-child1'),
    parent1 = document.getElementById('pendulum-parent1');

(function () {

    init = function () {
        rot.addEventListener("mousedown", start, false); // touchstart/mousedown
        $(document).bind('mousemove', function (event) { // touchmove/mousemove
            if (active === true) {
                event.preventDefault();
                rotate(event);
            }
            
        });
        $(document).bind('mouseup', function (event) { // touchend/mouseup
            event.preventDefault();
            stop(event);

            
        });
    };

    start = function (e) {
        e.preventDefault();
        var bb = this.getBoundingClientRect(),
            t = bb.top,
            l = bb.left,
            h = bb.height,
            w = bb.width,
            x, y;
        center = {
            x: l + (w / 2),
            y: t + (h / 2)
        };
        x = e.clientX - center.x;
        y = e.clientY - center.y;
        startAngle = R2D * Math.atan2(y, x);

        return active = true;
    };

    rotate = function (e) {
        e.preventDefault();
        var x = e.clientX - center.x,
            y = e.clientY - center.y,
            d = R2D * Math.atan2(y, x);
        rotation = d - startAngle;

        var totalAngle = angle + rotation;
        finalAngle = totalAngle;

        if (totalAngle < 0) finalAngle = 0;

        $('#drag-instruction').css('display', 'none');
        if ( finalAngle > 0 ) {
        } else {
        }

        console.log(angle + rotation);

        return parent1.style.webkitTransform = "rotate(" + (finalAngle) + "deg)";
    };

    stop = function () {
        angle += rotation;
        // angle = 0;

        // console.log(finalAngle);
        
        if (finalAngle >= 30) {
            
            setTimeout(() => {
                $('#pendulum-parent1').css({
                    transform: 'rotate(0deg)',
                });
                // $('#pendulum-parent1').addClass('rotate-0');
                $('#pendulum-audio audio').get(0).play();
                
                $('.pendulum-parent1, .pendulum-parent2').addClass('animate-1');
            }, 200);
            
            changePendulumContext();
            pendulum_timer = setInterval(changePendulumContext, 650);
            
            // alert('Pendulum is playing');
        } else {
            rotation = 0;
            finalAngle = 0;
            angle = 0;
            rotation = 0;
            startAngle = 0;
            parent1.style.webkitTransform = "rotate(0deg)";

            $('#drag-instruction').css('display', 'block');

        }

        // $('#landingSwiper').removeClass('no-swiping');

        return active = false;
    };

    init();

}).call(this);

/*
* Pendulum
*
*/

var text = [
    "WE ARE YOUR CALL TO ACTION!",
    "THE VOICE THAT HELPS YOU RISE ABOVE THE CLUTTER",
    "STRATEGIC. INSIGHTFUL. EFFECTIVE",
    "COMPLEMENTED WITH INNOVATIVE SOLUTIONS",
    "SO YOUR MESSAGE CAN BE HEARD",
    "FROM YOUR JOURNEY ON GROUND",
    "TO YOUR MOMENTS ON-AIR",
    "WE ARE YOUR BRANDS SHOUTOUT",
    "FROM PURPOSE TO YOUR POINT OF SALE",
];

var pendulumCounter = 0;
var pendulumContext = $('#pendulum .context-title');
var root;
let pendulumContextWrapper = $('#pendulum .context .context-wrapper');

function changePendulumContext() {
    // pendulumContext.text(text[pendulumCounter]);
    // pendulumContext.addClass

    pendulumContextWrapper.addClass('animate');


    for (i = 0; i < pendulumContext.length; i++) {
        // pendulumContext[i].className = pendulumContext[i].className.replace(" active", "");
        pendulumContext[i].style.display = "none";
    }
    // pendulumContext[pendulumCounter].className += " active";
    pendulumContext[pendulumCounter].style.display = "inline";
    
    pendulumCounter++;

    root = document.documentElement;

    if (pendulumCounter >= pendulumContext.length) {
        pendulumCounter = 0;
    }

    let pendulum = $('#pendulum .context .context-wrapper');

    // pendulumContextWrapper.css('transform', 'translateX(10px)');
    
    // setTimeout(() => {
    //     pendulumContextWrapper.css('transform', 'translateX(-10px)');
    // }, 620);
    
}


/*
* WHO WE ARE ANIMATION
*
*/

var title_transition_status = false, info_transition_status = false, menu_transition_status = false;
var _title, _info, _menu, _parent_id;
var branding_is_done_in_landing = false,
    isAnimationScriptCreated = false;

function composeNewTitleFormat(speed, count) {
    var s = _title;

    // alert(_parent_id+'-');

    var out = '';
    for (var z = 0; z < s.length; ++z) {
        var ch = s.charAt(z);
        if (ch == ' ') {
            out += '<span class="whitespace small">&nbsp;</span>';
        }

        if (ch == '<') {
            while (ch != '>') {
                out += ch;
                ch = s.charAt(++z);
            }
            out += ch;
            continue;
        }
        out += '<span>' + ch + '</span>';

    }

    $( _parent_id + ' .title' ).html(out);
    addTitleLettersTransition(speed, count);
}

function addTitleLettersTransition(speed, count) {
    const letters = document.querySelectorAll(_parent_id+' .title span');

    setTimeout(() => {
        Array.from(letters).forEach((letter, index) => {
            setTimeout(() => {
                
                letter.classList.toggle('show');
                
                if ( $( _parent_id+' .title span:last-child' ).hasClass('show') && title_transition_status == false) { 

                    title_transition_status = true;

                    composeNewInfoFormat(30, 2);
                    // composeNewInfoFormat(50, 2);
                }

            }, index * speed);
        })
    }, 100)
}

function composeNewInfoFormat(speed, count) {
    var s = _info;
    var out = '';
    for (var z = 0; z < s.length; ++z) {
        var ch = s.charAt(z);
        if (ch == ' ') {
            out += '<span class="whitespace small">&nbsp;</span>';
        }

        if (ch == '<') {
            while (ch != '>') {
                out += ch;
                ch = s.charAt(++z);
            }
            out += ch;
            continue;
        }
        out += '<span>' + ch + '</span>';

    }

    $( _parent_id + ' .info' ).html(out);
    
    addInfoLettersTransition(speed, count);

}

function addInfoLettersTransition(speed, count) {

    const letters = document.querySelectorAll( _parent_id+' .info span' );

    Array.from(letters).forEach((letter, index) => {
        setTimeout(() => {
            
            letter.classList.toggle('show');

            if ( $(_parent_id+' .info span'+':last-child').hasClass('show') && info_transition_status == false) { 
                info_transition_status = true;

                if (menu_transition_status == false) {
                    menu_transition_status = true;
                
                    const menus = document.querySelectorAll(_parent_id+' .featured-menu li'); 
                    
                    Array.from(menus).forEach((menu, index) => {
                        setTimeout(() => {

                            menu.classList.add('show');
                            if ( $(_parent_id+' .featured-menu li').hasClass('show') ) {
                                setTimeout(() => {
                                    $( _parent_id+' .goTo' ).addClass('show');
                                }, 700);
                                
                            }
                            
                        }, index * 150)
                    })
                }

            }
                

        }, index * speed);
    })
}

/*
* Swiper Slides
*
*/

var primary, secondary;

primary = new Swiper('#landingSwiper', {
    direction: 'horizontal',
    loop: false,
    preventClicks: false,
    preventClicksPropagation: true ,
    clickable: true,
    allowTouchMove: true,
    shortSwipes: false,
    // touchRatio: 0,
    noSwipingClass: 'no-swiping', 

    onClick: function(sw, e) {
        e.preventDefault();
    },
     onTap: function(sw, e) {
       e.preventDefault();
       sw.allowClick = false;
    },
    on: {
        slideChange: function () {

            setTimeout(() => {
            
                let thisSlide = $('#landingSwiper .swiper-slide-active');
                let active = thisSlide.data('id');
                let slideParent = thisSlide.data('parent');

                if (active == 1) {

                    if (isPendulumAudioLoaded == false) {
                        isPendulumAudioLoaded = true;
                        
                        preloader.addClass('show');

                        var x = document.createElement("audio");
                
                        if (x.canPlayType("audio/mpeg")) {
                            x.setAttribute("src", "assets/audio/pendulum-audio-effect.mp3");
                            x.setAttribute("loop", "true");
                            x.setAttribute("id", "pendulumAudio");
                        }
                        
                        // x.setAttribute("controls", "controls");
                        // x.setAttribute("controls", "controls");

                        document.getElementById('pendulum-audio').appendChild(x);

                        x.addEventListener("loadedmetadata", ()=>{
                            preloader.removeClass('show');
                        });
                    }
                }
                
                // Play Branding first slide video
                if (active == 2) {
                    if (isAnimationScriptCreated === false) {

                        preloader.addClass('show');
                        
                        // $.getScript( "js/zepto.min.js" ),
                        $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js" ),
                        $.getScript( "js/animation-script.js" )
                        .done(function( script, textStatus ) {
                            console.log( textStatus );

                            loadSecondarySlider();

                            isAnimationScriptCreated = true;
                            preloader.removeClass('show');

                            
                            $(slideParent + ' .swiper-slide[data-id="0"] .swiper-slide[data-id="0"] video').trigger('play');
                            WhatWeDoVideoIsReady = 1; // This will serve as on ready state for videos in whatwedo > branding (since branding is first slide under what we do)
                            
                            if (branding_is_done_in_landing == false) {
                                branding_is_done_in_landing = true;

                                _parent_id = '#branding';

                                setTimeout(() => {
                                    $(_parent_id+ ' .title').addClass('show');
                                    $(_parent_id+ ' .info').addClass('show');
                                    $(_parent_id+ ' .featured-menu').addClass('show');
                                    $(_parent_id+' .contents-wrapper' ).addClass('fade-zoom');
                                }, 100);
                            }

                        })
                        .fail(function( jqxhr, settings, exception ) {
                            console.log( jqxhr, settings, exception );
                        });
                        
                    }

                }

                // check if not a pendulum slide
                if (active == 0 || active == 2) {
                    resetPendulum();
                }
                
            }, 100);
        },
    },

});

var resetPendulum = function() {
    $('#pendulum-parent1').css({
        transform: 'rotate(0deg)',
        // transition: 'transform .5s ease-out'
        transition: 'transform .10s linear'
    });
    $('#pendulum-audio audio').get(0).pause();
    $('#pendulum-audio audio').get(0).currentTime = 0;
    $('.pendulum-parent1, .pendulum-parent2').removeClass('animate-1');
    pendulumContextWrapper.removeClass('animate');

    rotation = 0;
    finalAngle = 0;
    angle = 0;
    rotation = 0;
    startAngle = 0;
    active = false;
    center = {
        x: 0,
        y: 0
    };
    parent1.style.webkitTransform = "rotate(0deg)";
    
    pendulumContextWrapper.css('transform', 'translateX(0px)');
    pendulumContextWrapper.removeClass('animate');

    $('#pendulum-wrapper').css({left:'initial', top:'initial'});

    $('#drag-instruction').css('display', 'block');

    clearInterval(pendulum_timer);
}

var loadSecondarySlider = function() {
    secondary = new Swiper('#whatWeDo', {
        // Optional parameters
        direction: "vertical",
        loop: false,
        preventClicks: true,
        preventClicksPropagation: false ,
        allowTouchMove: true,
        speed: 500,
        touchRatio: 0,
        slideShadows: true,
        pageUpDown: true,
        slidesPerView:1,
        calculateHeight: true,
        spaceBetween: 50,
        watchActiveIndex: true,
        keyboard: {
            enabled: false,
        },
        onClick: function(sw, e) {
            e.preventDefault();
        },
        onTap: function(sw, e) {
            e.preventDefault();
            sw.allowClick = false;
        },
        on: {
            slideChange: function (e) {
                
                // pauseVideos('#whatWeDo'); 

                $(_parent_id+' .title' ).removeClass('show');
                $(_parent_id+' .info' ).removeClass('show');
                $(_parent_id+' .featured-menu' ).removeClass('show');
                $(_parent_id+' .contents-wrapper' ).removeClass('fade-zoom');
                
                $(_parent_id+' .title' ).html('&nbsp;');
                $(_parent_id+' .info' ).html('&nbsp;');
                $(_parent_id+' .featured-menu li' ).html('&nbsp;');
                
                setTimeout(() => {
                    setTimeout(messenger.cycleText, 100);
                    do_cycles = false;
    
                    setTimeout(() => {
                        $(_parent_id+' .title').addClass('show');
                        $(_parent_id+' .info').addClass('show');
                        $(_parent_id+' .featured-menu').addClass('show');
                        $(_parent_id+' .contents-wrapper' ).addClass('fade-zoom');

                    }, 100);
                    // setTimeout(() => {
                    // }, 50);
                    
                    let thisSlide = $('#whatWeDo .swiper-slide-active[data-parent="#whatWeDo"]');
    
                    let active = thisSlide.data('id');
                    let slideParent = thisSlide.data('parent'); 
    
                    if (WhatWeDoVideoIsReady == 1) {
                        $(slideParent + ' video').trigger('play');       
                    }             
    
                    if (active == 0 && branding_is_done_in_landing == false) {
                        setTimeout(() => {
    
                            _parent_id = '#branding';
                        }, 500)
                    } else if (active == 1) {                   
                        _parent_id = '#design';
                        
                    } else if (active == 2) {
                        _parent_id = '#communication';
                        
                    } else if (active == 3) {
                        _parent_id = '#experience';
                    }
    
                }, 100);
            },
        },
    
    });
}

var secondary_branding = new Swiper('#branding', {
    direction: "horizontal",
    
    preventClicks: false,
    preventClicksPropagation: true ,
    allowTouchMove: false,
    speed: 500,
    slidesPerView:1,
    spaceBetween: 0,
    debugger: true,
    loop: true,
    // loopedSlides: 10,
    
    navigation: {
        nextEl: "#branding-next",
        prevEl: "#branding-prev",
    },
    pagination: {
        el: '#branding-pagination',
            clickable: true,
            renderBullet: function (index, className) {
            return '<span class="border--0 ' + className + '">' + '' + '</span>';
        },
    },
    on: {
        slideChange: function (e) {
            let nav = $('#branding .nav');
            
            pauseVideos('#branding');

            // Add delay to trigger the current/active slides attr's
            setTimeout(() => {

                let thisSlide = $('#branding .swiper-slide-active');

                let active = thisSlide.data('id');
                let slideParent = thisSlide.data('parent'); 

                if (WhatWeDoVideoIsReady == 1) {
                    $(slideParent + ' video').trigger('play');
                }
                
                console.log(slideParent + ":" + active + ",");
            
                if (active !== 0) {
                    nav.removeClass('d--none');
                   
                } else {
                    nav.addClass('d--none');  
                }


                // Remove next and prev from being disabled
                $('#branding-prev, #branding-next').removeClass('swiper-button-disabled');

                if (active == 3) {
                    $('#branding-next').attr('data-proceed', true);
                }
                
                if (this.activeIndex == 5) {
                    secondary.slideToLoop(1, 1000, true);
                    pauseVideos('#branding');

                }
            }, 100);

        },
    },
}); 



var secondary_design = new Swiper('#design', {
    direction: "horizontal",
    
    preventClicks: false,
    preventClicksPropagation: false ,
    allowTouchMove: false,
    speed: 500,
    slidesPerView:1,
    loop: true,
    
    navigation: {
        nextEl: "#design-next",
        prevEl: "#design-prev",
    },
    pagination: {
        el: '#design-pagination',
            clickable: true,
            renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '' + '</span>';
        },
    },
    on: {
        slideChange: function (e) {
            let nav = $('#design .nav');

            pauseVideos('#design');
            
            // Add delay to trigger the current/active slides attr's
            setTimeout(() => {

                let thisSlide = $('#design .swiper-slide-active');
                let active = thisSlide.data('id');
                let slideParent = thisSlide.data('parent');
                
                if (WhatWeDoVideoIsReady == 1) {
                    $(slideParent + ' video').trigger('play');
                }
                
                console.log(slideParent + ":" + active + ",");

                if (active !== 0) {
                    nav.removeClass('d--none');
                } else {
                    nav.addClass('d--none');   
                }

                let last = $('#design .swiper-slide').first().data('id');

                // Remove next and prev from being disabled
                $('#design-prev, #design-next').removeClass('swiper-button-disabled');
                
                if (this.activeIndex == 4) {
                    secondary.slideToLoop(2, 1000, true);
                    pauseVideos('#design');
                }

            }, 100);

        },
    },
});

var secondary_communication = new Swiper('#communication', {
    direction: "horizontal",
    
    preventClicks: false,
    preventClicksPropagation: false ,
    allowTouchMove: false,
    speed: 500,
    slidesPerView:1,
    // spaceBetween: 50,
    debugger: true,
    loop: true,
    
    navigation: {
        nextEl: "#communication-next",
        prevEl: "#communication-prev",
    },
    pagination: {
        el: '#communication-pagination',
            clickable: true,
            renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '' + '</span>';
        },
    },
    on: {
        slideChange: function (e) {
            let nav = $('#communication .nav');

            pauseVideos('#communication');
            
            // Add delay to trigger the current/active slides attr's
            setTimeout(() => {
                let thisSlide = $('#communication .swiper-slide-active');

                let active = thisSlide.data('id');
                let slideParent = thisSlide.data('parent'); 

                if (WhatWeDoVideoIsReady == 1) {
                    $(slideParent + ' video').trigger('play');
                }
                
                console.log(slideParent + ":" + active + ",");
                
                if (active !== 0) {
                    nav.removeClass('d--none');
                } else {
                    nav.addClass('d--none');   
                }

                let last = $('#communication .swiper-slide').first().data('id');

                // Remove next and prev from being disabled
                $('#communication-prev, #communication-next').removeClass('swiper-button-disabled');
                
                // Check if slide is last or first
                // if (active == 1) $('#communication-prev').addClass('swiper-button-disabled');
                // if (active == 2) $('#communication-next').addClass('swiper-button-disabled');
                
                if (this.activeIndex == 7) {
                    secondary.slideToLoop(4, 1000, true);
                    pauseVideos('#communication');
                }
                
            }, 100);

        },
    },
});

var secondary_experience = new Swiper('#experience', {
    direction: "horizontal",
    
    preventClicks: false,
    preventClicksPropagation: false ,
    allowTouchMove: false,
    speed: 500,
    slidesPerView:1,
    // spaceBetween: 50,
    // Enable debugger
    debugger: true,
    loop: true,
    
    navigation: {
        nextEl: "#experience-next",
        prevEl: "#experience-prev",
    },
    pagination: {
        el: '#experience-pagination',
            clickable: true,
            renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '' + '</span>';
        },
    },
    on: {
        slideChange: function (e) {
            let nav = $('#experience .nav');

            pauseVideos('#experience');

            let countSlides = $('#experience .swiper-slide').length;
            
            // Add delay to trigger the current/active slides attr's
            setTimeout(() => {
                let thisSlide = $('#experience .swiper-slide-active');

                let active = thisSlide.data('id');
                let slideParent = thisSlide.data('parent'); 

                if (WhatWeDoVideoIsReady == 1) {
                    $(slideParent + ' video').trigger('play');
                }
                
                console.log(slideParent + ":" + active + ",");
                
                if (active !== 0) {
                    nav.removeClass('d--none');
                } else {
                    nav.addClass('d--none');
                       
                }

                // Remove next and prev from being disabled
                $('#experience-prev, #experience-next').removeClass('swiper-button-disabled');

                // Check if slide is last or first
                // if (active == 2) $('#experience-prev').addClass('swiper-button-disabled');
                // if (active == 3) $('#experience-next').addClass('swiper-button-disabled');
                
                if (this.activeIndex == 5) {
                    secondary.slideToLoop(1, 1000, true);
                    pauseVideos('#experience');
                }

            }, 100);

        },
    },
}); 

function pauseVideos(el) {
    const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    $(el+" video").each(function() {
        if ( !$(this).get(0).paused ) {
            $(this).get(0).pause();
            $(this).get(0).currentTime = 0;
        }
    });
}


$(document).ready(function() {
    $('#pendulum-child1').hover(function () {
        $('#landingSwiper').toggleClass('no-swiping');
    });
    
    var isPlaying = false;
    $('.play-button').click(function() {
        // $('#hey-audio').get(0).currentTime = 0.01;

        var heyAudio = document.getElementById('hey-audio');
        
        heyAudio.setCurrentTime = 0.01;
        heyAudio.play();

        if (isPlaying === false && heyAudio.duration > 0 && !heyAudio.paused) {
            $(this).prop('disabled', true);
            isplaying = true;
    
            setTimeout(() => {
                $('.play-button').addClass('playing');
    
                $('#pt1').addClass('d--none');
                $('#pt2').removeClass('d--none');
    
                setTimeout(() => {
                    $('#pt1').removeClass('d--none');
                    $('#pt2').addClass('d--none');
                    
                    setTimeout(() => {
                        // $('#hey-audio').get(0).currentTime = 0;
                        // $('#hey-audio').trigger('pause');
    
                        $('.play-button').removeClass('playing');
                        $(this).prop('disabled', false);
                        isPlaying = false;
                        
                    }, 350);
                }, 450);
            }, 200);
        }

        
    });

    // No-swiping in particular area
    $('a, button, li, .goTo, .hey-controls').mouseover(function() {
        $('#landingSwiper').toggleClass('no-swiping');
    })
    .mouseout(function() {
        $('#landingSwiper').toggleClass('no-swiping');
    });

    $('.goToNext').click(secondary, function(e) {
        secondary.slideNext();

        e.preventDefault();

        // Locks the swipe to next again after moving to the next slide
        // swiper2.lockSwipeToNext();
    });
    $('.goToTop').click(secondary, function(e) {
        secondary.slideTo(0);

        transition_status = true;

        e.preventDefault();
        
        _parent_id = '#branding';

        // branding_is_done_in_landing = false; // to have another animation

        // Locks the swipe to next again after moving to the next slide
        // swiper2.lockSwipeToNext();
    });

    /*
    * FEATURED: BRANDING
    */
    $( 'li[data-parent="branding"]' ).click(secondary_branding, function(e) {
        // let id = $(this).data('count');
        // secondary_branding.slideToLoop(id);

        // pauseVideos('#branding');

        // e.preventDefault();

    });
    var initialClick = 0;
    $('#branding #branding-next').click(function() {
        // let thisSlide = $('#branding .swiper-slide-active');
        // if (thisSlide.data('id') == 3 && $(this).attr('data-proceed') == 'true') {
        //     secondary.slideToLoop(1, 1000, true);
        // }
        // pauseVideos('#branding');
    });
    /*
    * FEATURED: DESIGN
    */
    $( 'li[data-parent="design"]' ).click(secondary_design, function(e) {
        // let id = $(this).data('count');
        // console.log('Design:'+id);
        // secondary_design.slideToLoop(id);

        // pauseVideos('#design');
        
        // e.preventDefault();
    });
    /*
    * FEATURED: COMMUNICATIONS
    */
    $( 'li[data-parent="communication"]' ).click(secondary_communication, function(e) {
        // let id = $(this).data('count');
        // console.log('Communication:'+id);
        // secondary_communication.slideToLoop(id);

        // pauseVideos('#communication');

        // e.preventDefault();
    });
    /*
    * FEATURED: EXPERIENCES
    */
    $( 'li[data-parent="experience"]' ).click(secondary_experience, function(e) {
        // let id = $(this).data('count');
        // console.log('Experience:'+id);
        // secondary_experience.slideToLoop(id);

        // pauseVideos('#experience');

        // e.preventDefault();
    });

    $('[data-toggle="popup"]').click(function(e) {
        const target = $(this).data('target');
        $(target).css('display', 'block');
    });

    $('[data-dismiss="popup"]').click(function() {
        $(this).closest('.popup').css('display', 'none');
        
    });

    $('[data-dismiss="alert"]').click(function() {
        $(this).parent('.alert').css('display', 'none');
    });
 

});
