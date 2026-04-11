// Ocean Agri - Main JavaScript
$(function () {

  /* ── Sticky Navbar ── */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  /* ── Mobile Menu ── */
  $('.hamburger').on('click', function () {
    $(this).toggleClass('open');
    $('.mobile-menu').toggleClass('open');
    $('body').toggleClass('no-scroll');
  });
  $('.mobile-close').on('click', function () {
    $('.hamburger').removeClass('open');
    $('.mobile-menu').removeClass('open');
    $('body').removeClass('no-scroll');
  });
  $('.mobile-nav-link').on('click', function () {
    $('.hamburger').removeClass('open');
    $('.mobile-menu').removeClass('open');
    $('body').removeClass('no-scroll');
  });

  /* ── Hero Slider (simple fade) ── */
  var slides = [
    {
      img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80',
      title: 'Planting Health,<br><em>Growing Happiness</em>',
      sub: 'Premium agricultural solutions — mulching films, crop covers, netlon, weed mats, spray pumps and more for every farmer.'
    },
    {
      img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80',
      title: 'Protect Every<br><em>Crop, Every Season</em>',
      sub: 'From seedling to harvest — our crop covers and protection nets shield your investment from weather and pests.'
    },
    {
      img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&q=80',
      title: 'Smart Tools for<br><em>Modern Farming</em>',
      sub: 'High-performance spray pumps, agri wire, crop support nets — built for Indian farming conditions.'
    }
  ];
  var current = 0;
  function goSlide(idx) {
    current = idx;
    if ($('.hero').length) {
      $('.hero-img').css('background-image', 'url(' + slides[idx].img + ')');
      $('.hero h1').html(slides[idx].title);
      $('.hero .hero-sub').html(slides[idx].sub);
      $('.hero-dots span').removeClass('active').eq(idx).addClass('active');
    }
  }
  if ($('.hero').length) {
    // build dots
    var dotsHtml = '';
    slides.forEach(function (s, i) {
      dotsHtml += '<span' + (i === 0 ? ' class="active"' : '') + ' data-idx="' + i + '"></span>';
    });
    $('.hero-dots').html(dotsHtml);
    $('.hero-dots span').on('click', function () { goSlide($(this).data('idx')); });
    setInterval(function () {
      goSlide((current + 1) % slides.length);
    }, 5000);
  }

  /* ── Scroll Animations ── */
  function checkAnimations() {
    $('[data-animate]').each(function () {
      var top = $(this).offset().top;
      var scroll = $(window).scrollTop() + $(window).height();
      if (scroll > top + 40) {
        $(this).addClass('animated');
      }
    });
  }
  $(window).on('scroll', checkAnimations);
  checkAnimations();

  /* ── Counter Animation ── */
  function animateCounters() {
    $('.stat-item .num[data-count]').each(function () {
      var $el = $(this);
      if ($el.hasClass('counted')) return;
      var top = $el.offset().top;
      if ($(window).scrollTop() + $(window).height() > top) {
        $el.addClass('counted');
        var target = parseInt($el.data('count'));
        var suffix = $el.data('suffix') || '';
        $({ val: 0 }).animate({ val: target }, {
          duration: 1800,
          easing: 'swing',
          step: function () { $el.text(Math.floor(this.val) + suffix); },
          complete: function () { $el.text(target + suffix); }
        });
      }
    });
  }
  $(window).on('scroll', animateCounters);
  animateCounters();

  /* ── Product Filter (Products page) ── */
  $('.filter-tab').on('click', function () {
    var cat = $(this).data('cat');
    $('.filter-tab').removeClass('active');
    $(this).addClass('active');
    if (cat === 'all') {
      $('.product-card').show();
    } else {
      $('.product-card').each(function () {
        if ($(this).data('cat') === cat) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  });

  /* ── Variant Tag Toggle ── */
  $(document).on('click', '.variant-tag', function () {
    $(this).closest('.variant-tags').find('.variant-tag').removeClass('active');
    $(this).addClass('active');
  });

  /* ── Contact Form ── */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    // Simulate success
    $(this).hide();
    $('.form-success').fadeIn();
  });

  /* ── Chatbot ── */
  var botResponses = {
    default: "Hello! 👋 I'm here to help you find the right Ocean Agri products for your farm. Please tell me your crop name or ask about any product!",
    mulching: "🌱 <strong>Mulching Paper</strong> is ideal for moisture retention and weed control. We offer Silver-Black, White-Black, Black-Black, Red-Black and Green-Black variants. Which crop are you growing?",
    tomato: "🍅 For <strong>Tomato farming</strong>, we recommend:<br>• <strong>Tomato Care Mulching Paper</strong> — Silver Black<br>• <strong>Tomato Thread</strong> — weather resistant<br>• <strong>Crop Support Net</strong> for climbing<br>• <strong>Netlon Cover</strong> for bird protection",
    melon: "🍈 For <strong>Melon / Watermelon</strong>, we suggest:<br>• <strong>Melon Care Mulching Paper</strong><br>• <strong>Netlon Cover</strong> — UV stabilized<br>• <strong>Weed Mat</strong> for soil protection",
    chilly: "🌶 For <strong>Chilly / Capsicum</strong>, we recommend:<br>• <strong>Chilly Care Mulching Paper</strong><br>• <strong>Crop Protection Cover</strong><br>• <strong>Netlon Cover</strong>",
    banana: "🍌 For <strong>Banana farming</strong>:<br>• <strong>Banana Bunch Cover</strong> — protects the bunch<br>• <strong>Banana Plant Cover</strong> — protects the whole plant<br>• <strong>Agri Wire</strong> for support",
    nursery: "🌿 For <strong>Nursery / Greenhouse</strong>:<br>• <strong>Nursery Plant Cover</strong><br>• <strong>Weed Mat</strong> — keeps weeds out<br>• <strong>Low Tunnel Products</strong> (Fiber Stick, Clip, Thread)",
    pump: "💧 <strong>Spray Pumps</strong> — We offer:<br>• <strong>Double Battery Spray Pump</strong> — ideal for large fields<br>• <strong>Two-in-One Spray Pump</strong> — versatile & portable<br>Both are high-performance and easy to use!",
    weed: "🌾 <strong>Weed Mat</strong> available in Black, White and Green variants. Provides excellent weed control and soil temperature regulation.",
    contact: "📞 You can reach us at:<br><strong>Phone:</strong> +91 73852 91616<br><strong>WhatsApp:</strong> +91 73852 91616<br><strong>Email:</strong> info@oceanagri.com<br>Or visit our <a href='contact.html' style='color:var(--green)'>Contact page</a>.",
    dealer: "🤝 To find a dealer near you or become an authorized dealer, please visit our <a href='contact.html' style='color:var(--green)'>Contact page</a> or WhatsApp us at +91 73852 91616."
  };

  function detectIntent(msg) {
    msg = msg.toLowerCase();
    if (msg.includes('tomato')) return 'tomato';
    if (msg.includes('melon') || msg.includes('watermelon')) return 'melon';
    if (msg.includes('chilly') || msg.includes('chili') || msg.includes('capsicum') || msg.includes('pepper')) return 'chilly';
    if (msg.includes('banana')) return 'banana';
    if (msg.includes('nursery') || msg.includes('greenhouse')) return 'nursery';
    if (msg.includes('pump') || msg.includes('spray')) return 'pump';
    if (msg.includes('weed')) return 'weed';
    if (msg.includes('mulch') || msg.includes('mulching')) return 'mulching';
    if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('address')) return 'contact';
    if (msg.includes('dealer') || msg.includes('distributor')) return 'dealer';
    return 'default';
  }

  function addMessage(text, type) {
    var html = '';
    if (type === 'bot') {
      html = '<div class="msg bot"><div class="msg-avatar"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg></div><div class="msg-bubble">' + text + '</div></div>';
    } else {
      html = '<div class="msg user"><div class="msg-bubble">' + text + '</div></div>';
    }
    $('.chatbot-messages').append(html);
    $('.chatbot-messages').scrollTop($('.chatbot-messages')[0].scrollHeight);
  }

  // Open/close chatbot
  $('.chatbot-btn').on('click', function () {
    $('.chatbot-window').toggleClass('open');
    if ($('.chatbot-window').hasClass('open') && $('.chatbot-messages').children().length === 0) {
      setTimeout(function () {
        addMessage(botResponses.default, 'bot');
      }, 300);
    }
  });
  $('.chatbot-close').on('click', function () {
    $('.chatbot-window').removeClass('open');
  });

  function sendChat(msg) {
    if (!msg.trim()) return;
    addMessage(msg, 'user');
    var intent = detectIntent(msg);
    setTimeout(function () {
      addMessage(botResponses[intent], 'bot');
    }, 600);
    $('#chatInput').val('');
  }

  $('.chatbot-send').on('click', function () {
    sendChat($('#chatInput').val());
  });
  $('#chatInput').on('keydown', function (e) {
    if (e.key === 'Enter') sendChat($(this).val());
  });
  $(document).on('click', '.quick-btn', function () {
    sendChat($(this).text());
  });

  /* ── Product Card Hover ── */
  $(document).on('mouseenter', '.product-card', function () {
    $(this).find('.product-card-icon svg').css('color', 'var(--green)');
  });

  /* ── Smooth anchor scroll ── */
  $('a[href^="#"]').on('click', function (e) {
    var target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
    }
  });

  /* ── Active nav link ── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  $('.nav-link').each(function () {
    var href = $(this).attr('href');
    if (href === page) $(this).addClass('active');
  });

});