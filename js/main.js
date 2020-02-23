jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff'
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5}
    }
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  })

// custom code

});
// var countDownDate = new Date("Apr 3, 2020 00:00:00").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;
    
//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   // Output the result in an element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);
var countDownDate = new Date("April 3, 2020 00:00:00")
//var countDownDate = new Date("June 13, 2020 21:00:00").getTime(); // set the countdown date
console.log(countDownDate)
var days, hours, minutes, seconds; // variables for time units

var countdown = document.getElementById("tiles"); // get tag element

getCountdown();

setInterval(function() {
  getCountdown();
}, 1000);

function getCountdown() {

  // find the amount of "seconds" between now and target
  var current_date = new Date().getTime();
  var seconds_left = (countDownDate - current_date) / 1000;

  days = pad(parseInt(seconds_left / 86400));
  seconds_left = seconds_left % 86400;

  hours = pad(parseInt(seconds_left / 3600));
  seconds_left = seconds_left % 3600;

  minutes = pad(parseInt(seconds_left / 60));
  seconds = pad(parseInt(seconds_left % 60));

  // format countdown string + set tag value
  countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
}

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}


var c = document.getElementById("canv");
var $ = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;
var background = new Image();
background.src = "../img/intro-bg.jpg";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
}

var max = 100;
var num = 1;
var darr = [];
var dst;
var gsz = 50;
var msX = 0;
var msY = 0;
var grav = 150;
var _psz = 1;
dst = Dist(gsz);

for (var i = 0; i < num; i++) {
  dst.add(Node(c));
}

function nPart() {
  var p;
  if (dst.parr.length < max) {
    if (darr.length > 0) {
      p = darr.pop();
      p.res_(msX, msY);
      dst.add(p);
    } else {
      p = Node(c, msX, msY)
      dst.add(p);
    }
  }
  return p;
}

var pull = .03;

function txt(){
  var t = "".split("").join(String.fromCharCode(0x2004));
  $.font = "3.5em Philosopher";
  $.fillStyle = 'hsla(0,0%,30%,1)';
  $.fillText(t, (c.width - $.measureText(t).width) * 0.5, c.height * 0.5);
}

function draw() {
 $.fillStyle = 'hsla(0,0%,100%,.4)';
 $.fillRect(0, 0, c.width, c.height);
  txt();
  dst.ref();
  var pos = dst.pos;
  var i = dst.parr.length;
  while (i--) {
    var p = dst.parr[i];
    var n = dst.next(p);
    if (n) {
      var l = n.length;
      while (l--) {
        var pnxt = n[l];
        if (pnxt === p) {
          continue;
        }
        conn(p, pnxt);
        _px = (p.x - pnxt.x) / _dist(pnxt, p);
        _py = (p.y - pnxt.y) / _dist(pnxt, p);
        p.velX -= _px * pull;
        p.velY -= _py * pull;
      }
    }
  }
  upd();
}

function addP(px, py) {
  var p = Node(c, px, py);
  dst.add(p);
}

function conn(p1, p2) {
  $.strokeStyle = 'hsla(0, 0%, 15%, 1)';
  var dist = _dist(p1, p2);
  $.globalAlpha = 1 - dist / 100;
  $.beginPath();
  $.moveTo(p1.x, p1.y);
  $.lineTo(p2.x, p2.y);
  $.stroke();
}

function _dist(p1, p2) {
  var _px = 0;
  var _py = 0;
  _px = p2.x - p1.x;
  _px = _px * _px;
  _py = p2.y - p1.y;
  _py = _py * _py;
  return Math.sqrt(_px + _py);
}

function upd() {
  for (var i = 0; i < dst.parr.length; i++) {
    dst.parr[i].upos();
  }
}

function pRem(p) {
  var i = dst.rem(p)
  darr.push(i[0]);
}

var frict = .9;

function Node(c, px, py) {
  var _p = {};
     _p.res_ = function(px, py) {
     _p.mass = rnd(1, 10);
     _p.gx = rnd(-5, 5);
     _p.gy = rnd(-5, 5);
     _p.x = px || rnd(10, c.width - 10);
     _p.y = py || rnd(10, c.height - 10);
     _p.gx2 = rnd(-2, 2) * .5;
     _p.gy2 = rnd(-2, 2) * .5;

 var vel = 25;
     _p.velX = rnd(-vel, vel);
     _p.velY = rnd(-vel, vel);
}
  _p.upos = function() {
    if (Math.abs(_p.velX) < 1 && Math.abs(_p.velY) < 1) pRem(_p);
    if (rnd(0, 100) > 98) {
      var np = nPart();
      if (np) {
        np.res_(_p.x, _p.y);
        np.velX += rnd(-5, 5);
        np.velY += rnd(-5, 5);
      }
    }
    _p.velX *= frict;
    _p.velY *= frict;

    if (_p.x + _p.velX > c.width) _p.velX *= -1;
    else if (_p.x + _p.velX < 0)  _p.velX *= -1;
    if (_p.y + _p.velY > c.height) _p.velY *= -1;
    else if (_p.y + _p.velY < 0) _p.velY *= -1;
    
    conn(_p, {
      x: _p.x + _p.velX,
      y: _p.y + _p.velY
    })
    _p.x += _p.velX;
    _p.y += _p.velY;
  }
  _p.res_(px, py);
  return _p;
}

function Dist(gsz) {
  var ret = {};
      ret.gsz = gsz;
      ret.parr = [];
      ret.pos = [];

  ret.next = function(a) {
    var x = Math.ceil(a.x / gsz);
    var y = Math.ceil(a.y / gsz);
    var p = ret.pos;
    var r = p[x][y];

    try {
      if (p[x - 1][y - 1]) {
        r = r.concat(p[x - 1][y - 1]);
      }
    } catch (e) {}
    try {
      if (p[x][y - 1]) {
        r = r.concat(p[x][y - 1]);
      }
    } catch (e) {}
    try {
      if (p[x + 1][y - 1]) {
        r = r.concat(p[x + 1][y - 1]);
      }
    } catch (e) {}
    try {
      if (p[x - 1][y]) {
        r = r.concat(p[x - 1][y]);
      }
    } catch (e) {}
    try {
      if (p[x + 1][y]) {
        r = r.concat(p[x + 1][y]);
      }
    } catch (e) {}
    try {
      if (p[x - 1][y + 1]) {
        r = r.concat(p[x - 1][y + 1]);
      }
    } catch (e) {}
    try {
      if (p[x][y + 1]) {
        r = r.concat(p[x][y + 1]);
      }
    } catch (e) {}
    try {
      if (p[x + 1][y + 1]) {
        r = r.concat(p[x + 1][y + 1]);
      }
    } catch (e) {}
    return r;
  }

  ret.ref = function() {
    ret.pos = [];
    var i = ret.parr.length;
    while (i--) {
      var a = ret.parr[i];
      var x = Math.ceil(a.x / gsz);
      var y = Math.ceil(a.y / gsz);
      if (!ret.pos[x]) ret.pos[x] = [];
      if (!ret.pos[x][y]) ret.pos[x][y] = [a];
      continue;
      ret.pos[x][y].push(a);
    }
  }
  ret.add = function(a) {
    ret.parr.push(a);
  }

  ret.rem = function(a) {
    var i = ret.parr.length;
    while (i--) {
      if (ret.parr[i] === a) return ret.parr.splice(i, 1);
    }
  }
  return ret;
}

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener('mousemove', function(e) {
  var np = nPart();
  if (np) np.res_(e.clientX, e.clientY);
}, false);

window.addEventListener('touchmove', function(e) {
  e.preventDefault();
  var np = nPart();
  if (np)  np.res_(e.touches[0].clientX, e.touches[0].clientY);
}, false);

function run() {
  window.requestAnimationFrame(run);
  draw();
}
run();

window.addEventListener('resize',function(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}, false);

