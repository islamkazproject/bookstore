$(document).ready(function () {
    // Get all the tab elements
    var tabs = $('.tab');
    // Get all the tab content elements
    var tabContents = $('.tab-content');

    // Add click event listener to each tab
    tabs.click(function () {
        // Remove the 'active' class from all tabs
        tabs.removeClass('active');
        // Add the 'active' class to the clicked tab
        $(this).addClass('active');

        // Hide all tab contents
        tabContents.hide();

        // Show the corresponding tab content based on the data-tab attribute
        var tabId = $(this).attr('data-tab');
        $('#' + tabId).show();


        var slider = $('.slider');
        var slides = $('.slides');
        var slideCount = slides.length;
        var currentIndex = 0;
        var interval = 5000;
        var timer;

        function showSlide(index) {
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }

            slider.css('transform', 'translateX(' + (index * -100) + '%)');
            currentIndex = index;
        }

        function startTimer() {
            timer = setInterval(function () {
                showSlide(currentIndex + 1);
            }, interval);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        function loadSlides() {
            $.getJSON('data.json', function (data) {
                var slidesData = data.slides;
                for (var i = 0; i < slidesData.length; i++) {
                    var slide = slides.eq(i);
                    var slideData = slidesData[i];
                    slide.find('img').attr('src', slideData.image);
                    slide.find('img').attr('alt', slideData.alt);
                }
                slideCount = slides.length;
                startTimer();
            });
        }

        $('.prev-button').click(function (e) {
            e.preventDefault();
            showSlide(currentIndex - 1);
            stopTimer();
            startTimer();
        });

        $('.next-button').click(function (e) {
            e.preventDefault();
            showSlide(currentIndex + 1);
            stopTimer();
            startTimer();
        });

        loadSlides();
    });
});