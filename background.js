(function($) {
	
    var self = {
        avatarImages : [
		'http://i.imgur.com/yfOlFOA.jpg',
        'http://i.imgur.com/xPerVpB.jpg',
        'http://i.imgur.com/Y2c9kTp.jpg',
        'http://i.imgur.com/BDZPVXX.jpg',
        'http://i.imgur.com/YdrAuKy.jpg',
        'http://i.imgur.com/sogmZGY.jpg',
        'http://i.imgur.com/1HBBpTT.jpg',
        'http://i.imgur.com/VOyZxvz.jpg',
        'http://i.imgur.com/pIP6lUP.jpg',
        'http://i.imgur.com/GYCvu9t.jpg',
        'http://i.imgur.com/Dp2l51R.jpg',
        'http://i.imgur.com/9M0ajJM.jpg',
        'http://i.imgur.com/nRqKqTK.png',
        'http://i.imgur.com/suhvI4p.png',
        'http://i.imgur.com/QAmYcZX.png',
        'http://i.imgur.com/1IiZ3BP.png',
        'http://i.imgur.com/cOdulK4.png',
        'http://i.imgur.com/W8HF3PI.png',
        'http://i.imgur.com/h5uZ7ou.png'
        ],
        handleImages : function (lstImgs, time)
        {
            $.each($('img'), function(i,item) { 
                //Skip if image is already replaced
                if($.inArray($(item).attr('src'), lstImgs) == -1)
                {
					var h = $(item).height();
					var w = $(item).width();
					
					//If image loaded
					if (h > 0 && w > 0) {

					    self.handleImg(item, lstImgs);
					}
					else
					{
						//Replace when loaded
						$(item).load(function(){
							//Prevent 'infinite' loop
							if($.inArray($(item).attr('src'), lstImgs) == -1)
							{
							    self.handleImg(item, lstImgs);
							}
						});
					}
				}
            });
			
            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs)
        {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
		setRandomImg: function(item, lstImgs){
            var choppedSrc = $(item).attr('src')
            choppedSrc = choppedSrc.substring(0, (choppedSrc.indexOf("#") == -1) ? choppedSrc.length : choppedSrc.indexOf("#"))
            choppedSrc = choppedSrc.substring(0, (choppedSrc.indexOf("?") == -1) ? choppedSrc.length : choppedSrc.indexOf("?"))
            choppedSrc = choppedSrc.substring(choppedSrc.lastIndexOf("/") + 1, choppedSrc.length)
            choppedExt = choppedSrc.substring(choppedSrc.lastIndexOf(".") + 1, choppedSrc.length)
			var h = $(item).height();
			var w = $(item).width();
            var pass = true;
            if(h != w)              { pass = false }
            if(h > 128 || w > 128)  { pass = false }

            if(!choppedExt.match(/gif|jpg|jpeg|png/gi)){
                console.log("ignored filetype " + choppedExt)
                pass = false
            }
            if(pass) {

                var hash = 0;
                for (i = 0; i < choppedSrc.length; i++) {
                    char = choppedSrc.charCodeAt(i);
                    hash = char + (hash << 6) + (hash << 16) - hash;
                }
                if(hash < 0){hash = hash * -1}

                console.log("Replacing picture " + choppedSrc + " with index " + (hash % lstImgs.length))
    			$(item).css('width', w + 'px').css('height', h + 'px');
                $(item).attr('src', lstImgs[(hash % lstImgs.length)]); 
            }
		},
		handleBrokenImg: function(item, lstImgs){
		    
		    var brokenImg = $(item).attr('src');
		    var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
		},
    };
	
	//Run on jQuery ready
    $(function(){
        self.handleImages(self.avatarImages, 3000);
    });
	
	//Set global variable
	$.slothville = self;
	
})(jQuery);

 