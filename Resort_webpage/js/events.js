// Script Js
var base_url = $("base").attr("url");

$("#owl-example").owlCarousel({ items: 2, loop: true });
$("#owl-banner").owlCarousel({
  items: 1,
  navigation: true,
  animateOut: "fadeOut",
  loop: true,
  autoplay: true,
  autoplayTimeout: 9000,
  autoplayHoverPause: true,
});
$("#owl-slider").owlCarousel({
  items: 1,
  navigation: true,
  animateOut: "fadeOut",
  pagination: false,
  loop: true,
  autoplay: true,
  autoplayTimeout: 9000,
  autoplayHoverPause: true,
});

// Home tab
$(".nav-tabs a").click(function () {
  $(this).tab("show");
});

// Subscribe form
$(document).ready(function () {
  if ($("#subscribe-form")[0]) {
    $("#subscribe-form").validate({
      rules: {
        subscribe_email: { required: true, email: true },
      },
      messages: {
        subscribe_email: {
          required: "Enter your Email Address !",
          eamil: "Add valid Email Address !",
        },
      },
      submitHandler: function (form) {
        var Frmval = jQuery("#subscribe-form").serialize();
        $(".button_subscrive").attr("disabled", "true").html("Loading..");
        $.ajax({
          type: "POST",
          dataType: "JSON",
          url: base_url + "includes/controllers/ajax.subscribers.php",
          data: "action=getMailaddress&" + Frmval,
          success: function (data) {
            var msg = eval(data);
            $(".button_subscrive").removeAttr("disabled").html("join us +");
            alert(msg.message);
            $("#subscribe-form")[0].reset();
          },
        });
        return false;
      },
    });
  }
});

function updateCaptcha(e) {
  var r = new Date();
  e.src = base_url + "captcha/imagebuilder.php?rand=" + r.getTime();
}

$(document).ready(function () {
  $("#frm-contact").validate({
    rules: {
      fullname: {
        required: true,
      },
      phoneno: {
        required: true,
      },
      mailaddress: {
        required: true,
        email: true,
      },
      comment: {
        required: true,
      },
      userstring: {
        required: true,
        minlength: 5,
        remote: {
          url: base_url + "captcha/checkcaptcha.php",
          type: "post",
        },
      },
    },
    messages: {
      fullname: {
        required: "Enter your Fullname",
      },
      phoneno: {
        required: "Enter your Contact",
      },
      mailaddress: {
        required: "Enter your email address",
        email: "Enter a VALID email address",
      },
      comment: {
        required: "Enter your email Message",
      },
      userstring: {
        required: "Enter Security Code",
        minlength: "Security Code must be at least 5 characters",
        remote: "Security Code Not match",
      },
    },
    submitHandler: function (form) {
      var Frmval = $("#frm-contact").serialize();
      $("#btn-submit").attr("disabled", "true").val("Processing..."),
        $.ajax({
          type: "POST",
          dataType: "JSON",
          url: base_url + "enquery_mail.php",
          data: "action=forcoment&" + Frmval,
          success: function (data) {
            var msg = eval(data);
            $("#btn-submit").removeAttr("disabled").val("Send");
            alert(msg.message), jQuery("#frm-contact")[0].reset();
          },
        });
      return false;
    },
  });
});

jQuery(document).ready(function ($) {
  var myTheme = window.myTheme || {},
    $win = $(window);

  myTheme.Isotope = function () {
    // 4 column layout
    var isotopeContainer = $(".isotopeContainer");
    if (!isotopeContainer.length || !jQuery().isotope) return;
    $win.load(function () {
      isotopeContainer.isotope({
        itemSelector: ".isotopeSelector",
      });
      $(".isotopeFilters").on("click", "a", function (e) {
        $(".isotopeFilters").find(".active").removeClass("active");
        $(this).parent().addClass("active");
        var filterValue = $(this).attr("data-filter");
        isotopeContainer.isotope({ filter: filterValue });
        e.preventDefault();
      });
    });
  };

  myTheme.Fancybox = function () {
    if ($(".fancybox-pop")[0]) {
      $(".fancybox-pop").fancybox({
        maxWidth: 900,
        maxHeight: 700,
        fitToView: true,
        width: "80%",
        height: "80%",
        autoSize: false,
        closeClick: false,
        openEffect: "elastic",
        closeEffect: "none",
      });
    }
  };

  myTheme.Isotope();
  myTheme.Fancybox();

  if ($(".menu-popup")[0]) {
    $(".menu-popup").fancybox({
      autoSize: false,
      closeClick: false,
      openEffect: "elastic",
      closeEffect: "none",
    });
  }
  if (jQuery("#roombooking")[0]) {
    $("#checkin").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      minDate: "0",
      maxDate: "+2Y",
      onSelect: function (dateStr) {
        var d1 = $(this).datepicker("getDate");
        d1.setDate(d1.getDate() + 1); // change to + 1 if necessary
        var d2 = $(this).datepicker("getDate");
        d2.setDate(d2.getDate() + 180); // change to + 180 if necessary
        $("#checkout").datepicker("option", "minDate", d1);
        $("#checkout").datepicker("option", "maxDate", d2);
      },
    });
    $("#checkout").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      minDate: $("#checkin").datepicker("getDate"),
      maxDate: "+2Y",
    });
    jQuery("#roombooking")[0].reset();
    jQuery("#roombooking").validate({
      errorElement: "span",
      errorClass: "validate-has-error",
      rules: {
        fullname: { required: true },
        mailaddress: { required: true, email: true },
        phone: { required: true },
        address: { required: true },
        country: { required: true },
        checkin: { required: true, date: true },
        checkout: { required: true, date: true },
        userstring: {
          required: true,
          minlength: 5,
          remote: {
            url: base_url + "captcha/checkcaptcha.php",
            type: "post",
          },
        },
      },
      messages: {
        fullname: { required: "Enter your Fullname" },
        mailaddress: {
          required: "Enter your email address",
          email: "Enter a VALID email address",
        },
        phone: { required: "Enter your Phone No." },
        address: { required: "Enter your Address" },
        country: { required: "Choose your Country" },
        checkin: {
          required: "Choose your Check-In Date",
          date: "Date Format Not Match (yy-mm-dd)",
        },
        checkout: {
          required: "Choose your Check-Out Date",
          date: "Date Format Not Match (yy-mm-dd)",
        },
        userstring: {
          required: "Enter Security Code",
          minlength: "Security Code must be at least 5 characters",
          remote: "Security Code Not match",
        },
      },
      submitHandler: function (form) {
        var Frmval = jQuery("#roombooking").serialize();
        jQuery("#btn-booking").attr("disabled", "true").val("Processing...");
        jQuery.ajax({
          type: "POST",
          dataType: "JSON",
          url: base_url + "booking_action.php",
          data: "action=forbooking&" + Frmval,
          success: function (data) {
            var msg = eval(data);
            jQuery("#btn-booking").removeAttr("disabled").val("Send");
            alert(msg.message);
            jQuery("#roombooking")[0].reset();
          },
        });
        return false;
      },
    });
  }
});
function updateCaptcha(c) {
  var d = new Date();
  c.src = base_url + "captcha/imagebuilder.php?rand=" + d.getTime();
}

//  Hotel Reservation
if (jQuery("#hotel-form")[0]) {
  jQuery("#checkin").datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "yy-mm-dd",
    minDate: "0",
    maxDate: "+2Y",
    onSelect: function (dateStr) {
      var d1 = jQuery(this).datepicker("getDate");
      d1.setDate(d1.getDate() + 1); // change to + 1 if necessary
      var d2 = jQuery(this).datepicker("getDate");
      d2.setDate(d2.getDate() + 180); // change to + 180 if necessary
      jQuery("#checkout").datepicker("option", "minDate", d1);
      jQuery("#checkout").datepicker("option", "maxDate", d2);
      var start = jQuery("#checkin").datepicker("getDate");
      var end = jQuery("#checkout").datepicker("getDate");
      var days = (end - start) / 1000 / 60 / 60 / 24;
      if (end != null) var dd = jQuery(this).datepicker("getDate");
      jQuery("#checkout").datepicker("setDate", d1);
    },
  });

  jQuery("#checkout").datepicker({
    changeMonth: true,
    changeYear: true,
    dateFormat: "yy-mm-dd",
    minDate: jQuery("#checkin").datepicker("getDate"),
    maxDate: "+2Y",
  });

  jQuery("#hotel-form").validate({
    errorElement: "span",
    errorClass: "validate-has-error",
    rules: {
      hotel_check_in: { required: true },
      hotel_check_out: { required: true },
      hotel_code: { required: true },
    },
    messages: {
      hotel_check_in: { required: "" },
      hotel_check_out: { required: "" },
      hotel_code: { required: "" },
    },
    submitHandler: function (form) {
      form.submit();
      // window.open('about:blank', 'booking_popup', 'width=1000,height=800');
      return false;
    },
  });
}

// FAQ Script function
function faq(ele) {
  var x = ele.parentElement.nextElementSibling.style.cssText;
  if (x == "max-height: 500px;") {
    ele.style.cssText = "transform: rotate(0deg);";
    ele.parentElement.nextElementSibling.style.cssText =
      "transition:0.3s;max-height:0px;";
  } else {
    ele.style.cssText = "transform: rotate(45deg);";
    ele.parentElement.nextElementSibling.style.cssText = "max-height:500px;";
  }
}
