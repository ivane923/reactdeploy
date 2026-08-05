
// Standalone Pendulum - Desktop Version
// Simplified without Swiper dependencies

var isPendulumAudioLoaded = false, 
    pendulum_timer;
var preloader = $('#preloader');

// Load audio immediately on page load
$(document).ready(function() {
    if (isPendulumAudioLoaded == false) {
        isPendulumAudioLoaded = true;
        
        var x = document.createElement("audio");

        if (x.canPlayType("audio/mpeg")) {
            x.setAttribute("src", "assets/audio/pendulum-audio-effect.mp3");
            x.setAttribute("loop", "true");
            x.setAttribute("id", "pendulumAudio");
        }

        document.getElementById('pendulum-audio').appendChild(x);

        x.addEventListener("loadedmetadata", ()=>{
            console.log("Audio loaded successfully");
        });
    }
});

// ///////////////////////////////
// // --------  drag  --------- //
// ///////////////////////////////

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
        drag.addEventListener('mousedown', start, false);
        $(document).bind('mousemove', function (event) {
            if (active === true) {
                move(event);
            }
        });
        $(document).bind('mouseup', function (event) {
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
        rot.addEventListener("mousedown", start, false);
        $(document).bind('mousemove', function (event) {
            if (active === true) {
                event.preventDefault();
                rotate(event);
            }
            
        });
        $(document).bind('mouseup', function (event) {
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

        return parent1.style.webkitTransform = "rotate(" + (finalAngle) + "deg)";
    };

    stop = function () {
        angle += rotation;
        
        if (finalAngle >= 30) {
            
            setTimeout(() => {
                $('#pendulum-parent1').css({
                    transform: 'rotate(0deg)',
                });
                
                // Play audio
                var audioElement = $('#pendulum-audio audio').get(0);
                if (audioElement) {
                    audioElement.play();
                }
                
                $('.pendulum-parent1, .pendulum-parent2').addClass('animate-1');
            }, 200);
            
            changePendulumContext();
            pendulum_timer = setInterval(changePendulumContext, 650);
            
        } else {
            rotation = 0;
            finalAngle = 0;
            angle = 0;
            rotation = 0;
            startAngle = 0;
            parent1.style.webkitTransform = "rotate(0deg)";

            $('#drag-instruction').css('display', 'block');
        }

        return active = false;
    };

    init();

}).call(this);

/*
* Pendulum Context Text Cycling
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
    pendulumContextWrapper.addClass('animate');

    for (i = 0; i < pendulumContext.length; i++) {
        pendulumContext[i].style.display = "none";
    }
    pendulumContext[pendulumCounter].style.display = "inline";
    
    pendulumCounter++;

    root = document.documentElement;

    if (pendulumCounter >= pendulumContext.length) {
        pendulumCounter = 0;
    }
}

// Stop pendulum animation when clicking outside
$(document).click(function(e) {
    if (!$(e.target).closest('#pendulum-wrapper').length) {
        stopPendulum();
    }
});

function stopPendulum() {
    $('#pendulum-parent1').css({
        transform: 'rotate(0deg)',
        transition: 'transform .10s linear'
    });
    
    var audioElement = $('#pendulum-audio audio').get(0);
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
    
    $('.pendulum-parent1, .pendulum-parent2').removeClass('animate-1');
    pendulumContextWrapper.removeClass('animate');

    rotation = 0;
    finalAngle = 0;
    angle = 0;
    startAngle = 0;

    clearInterval(pendulum_timer);
}

console.log("Pendulum Desktop initialized");
