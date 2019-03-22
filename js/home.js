"use strict";

var homeInterface;

var HomeInterface = function () {

    var self = this;

    self.docW = document.documentElement.clientWidth;
    self.docH = document.documentElement.clientHeight;

    self.init = function() {
        window.onload = self.initHomeScreen();
    };

    self.initHomeScreen = function() {

        //self.gameBoardFrame = document.getElementById("gameBoard");

        var parentUrl = '' + window.location;
        //window.setTimeout(function() {
        //    self.gameBoardFrame.contentWindow.postMessage(parentUrl, '*');
        //}, 300);

        // Get the modal
        self.modal = document.getElementById('lightBoxModal');

        self.appStorePopup = document.getElementById('appStorePopup');

        self.appStoreButton = document.getElementById('appStoreButton');

        //self.appStoreButton.addEventListener('click', self.openAppStorePopup);

        self.appStoreButtonMobile = document.getElementById('appStoreButtonMobile');

        //self.appStoreButtonMobile.addEventListener('click', self.openAppStorePopup);

        self.appStoreCloseButton = document.getElementById('close');

        self.appStoreCloseButton.addEventListener('click', self.closeAppStorePopup);

        var isMobile = self.isMobile();


        if(isMobile == false) {
            self.docW = 360;
            self.docH = 640;
        }

        //self.gameBoardFrame.width = self.docW + "px";
        //self.gameBoardFrame.height = self.docH + "px";

        self.updateScreenshots();

        self.getModal();

    };

    self.isMobile = function() {

        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && self.docW > 500) {
            return false;
        }
        return true;

    };

    self.getModal = function() {

        // Get the image and insert it inside the modal - use its "alt" text as a caption
        
        for(var i=1;i<=6;i++){
            var screenshot = document.getElementById('screenshot'+i);
            screenshot.addEventListener('click', self.openModal);
        }
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close2")[0];

        var prev = document.getElementsByClassName("prev")[0];
        var next = document.getElementsByClassName("next")[0];

        prev.onclick = function() {
            console.log('clicked prev');
            self.plusSlides(-1);
        };
        next.onclick = function() {
            self.plusSlides(1);
        };

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            self.modal.style.display = "none";
        }

    };

    self.screenshotImageClick = function(e) {

        var index = this.id.replace(/[a-z]/g,'');

        var modalImg = document.getElementById("fullsize");
        var captionText = document.getElementById("caption");

        self.modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.style.display = "block";
        // modalImg.style.width = "25%";
        // modalImg.style.height = "auto";
        captionText.innerHTML = this.alt;

    };

    self.updateScreenshots = function() {
        var url = window.location.href;
        var pathArray = url.split('/');

        var language = "en";

        if(pathArray) {

            if(pathArray[pathArray.length - 1].indexOf("fr") != -1) {
                language = "fr";
            }
            else {
                language = "en";
            }
        }

        var modalImageList = document.getElementById('lightBoxModal').querySelectorAll('img');

           for(var i=1;i<=6;i++){
                var screenshot = document.getElementById('screenshot'+i);
                screenshot.src = "./img/im"+i+".jpg";
                modalImageList[i-1].src = "./img/im"+i+".jpg";
            }
        
    };

    self.openAppStorePopup = function() {
        console.log('open app store popup');
        self.appStorePopup.style.display = "block";
    };

    self.closeAppStorePopup = function() {
        console.log('close app store popup');
        self.appStorePopup.style.display = "none";
    };

    self.plusSlides = function(n) {
        self.showSlides(self.slideIndex += n);
    };

    self.currentSlide = function(n) {
        self.showSlides(self.slideIndex = n);
    };

    self.showSlides = function(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var captionText = document.getElementById("caption");

        if (n > slides.length) {
            self.slideIndex = 1
        }

        if (n < 1) {
            self.slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }

        slides[self.slideIndex-1].style.display = "block";

        captionText.innerHTML = slides[self.slideIndex-1].getElementsByTagName('img')[0].alt;

    };

    self.openModal = function(e) {
        var index = parseInt(this.id.replace(/[a-z]/g,''));
        self.currentSlide(index);
        document.getElementById('lightBoxModal').style.display = "block";
    };

    self.init();

    return self;
};
