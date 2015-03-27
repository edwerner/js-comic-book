/*
  FUNCTIONS.JS
  
  This script will create our data structure
  for our animation sequences.
*/


MediaObject = {};

/*
  This is our JSON object that stores
  all our media and style data for each
  world. getData is how we will retrieve
  our data wihin different scopes to render
  our different views.
*/

MediaObject.getData = function () {
    return {
        world: {
            'Kashyyk': [{
                tag: "Kashyyk",
                id: 1,
                class: 'preload-image',
                path: "images/kashyyk.jpg",
                duration: 60,
                buttonColor: '#FFF',
                title: 'Kashyyk',
                fontColor: '#FFF'
            }],
            'Tatooine': [{
                tag: "Tatooine",
                id: 2,
                class: 'preload-image',
                path: "images/tatooine.jpg",
                duration: 60,
                buttonColor: '#FFF',
                title: 'Tatooine',
                fontColor: '#000'
            }],
            'Deathstar': [{
                tag: "Deathstar",
                id: 3,
                class: 'preload-image',
                path: "images/deathstar.jpg",
                duration: 60,
                buttonColor: '#FFF',
                title: 'Death Star',
                fontColor: '#FFF'
            }],
            'Jabba': [{
                tag: "Jabba",
                id: 4,
                class: 'preload-image',
                path: "images/jabba.jpg",
                duration: 60,
                buttonColor: '#FFF',
                title: 'Jabba the Hutt',
                fontColor: '#FFF'
            }]
        }
    };
};

$(document).ready(function () {

    /* First we need to get our media 
      data out of our JSON object. To
      do this, we must set some vars
      to hold our position in the iter-
      ation, as well as the bounds of
      our JSON object.
    */

    var animationData = MediaObject.getData().world;
    var items = [];
    var count = 0;

    /*
      This function will allow us to cache
      all of our images by preloading from 
      our JSON object into the DOM and removing
      themselves onced loaded.
    */


    //var length = animationData.keys.length;

    $.each(animationData, function (i, obj) {
        var buttonText = obj[0].id + ". " + obj[0].tag;
        $('<div />', { 'id': obj[0].tag, 'class': 'button' }).text(buttonText).appendTo('#nav_buttons');

        $('<img />', { 'src': obj[0].path, 'class': obj[0].class }).load(function () {

            this.count += 1;
            console.log('Load success: ' + $(this).attr('src'));
            if (count == length) {
                this.imagesLoad = true;
                anim.loadComplete();
            }
            $(this).appendTo('body').remove();
        }).error(function () {
            this.count += 1;
            console.log('Load fail: ' + $(this).attr('src'));
            if (count == length) {
                this.imagesLoad = true;
                anim.loadComplete();
            }
        });
    });

    /*
       When the DOM is ready, our first
       default world is set and loads.
     */

    anim.worldSwap("Kashyyk");

    $('.button').bind('click', function () {
        $('.button').removeClass('active-nav');
        $(this).addClass('active-nav');
        /*
          This event gets the id of the
          element clicked and passes it
          through to render the corresponding
          view.
        */

        var $id = $(this).attr('id');
        anim.worldSwap($id);
    });
});

var Animation = (function () {

    var animationData = MediaObject.getData().world;
    var count = MediaObject.getData().world.length;
    var mediaData;

    function animationInfo() { }

    animationInfo.prototype = {

        /*
          This function is responsible for changing
          out our world content when a new world 
          button is clicked. The current dataset
          will animate out before the dataset for
          our new view is read in.
        */

        worldSwap: function (name) {
            var that = this;
            if (animationData[name]) {
                this.mediaData = animationData[name];
                $('#content').animate({ opacity: 0, width: 0 }, function () { that.build(); });
            }
        },

        /*
          This function will reload our view with
          an updated dataset. New values are read
          in from our JSON object and set in our 
          jQuery calls to update our view. The
          parent container #content is simply 
          overwritten each time.
        */

        build: function () {
            $('#content').animate({
                opacity: 1,
                width: '100%'
            }, function () {
                console.log("New world built...");
            });

            /*
              Right here we simply replace the image
              source and class with our JSON data.
            */

            var imgStr = '<img src="{source}" class="{class}"/>';
            imgStr = imgStr.replace('{source}', this.mediaData[0].path);
            imgStr = imgStr.replace('{class}', this.mediaData[0].class);
            $('#title').css('color', this.mediaData[0].fontColor).html(this.mediaData[0].title);
            $('#content').html(imgStr);
        },

        /*
          This function will be triggered once
          all our 
        */
        loadComplete: function () {
            console.log("Load complete...");
        }
    };
    return animationInfo;
})();

var anim = new Animation();
