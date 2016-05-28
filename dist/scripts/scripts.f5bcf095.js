"use strict";function SmoothScroll(a){var b=this,c=document.documentElement;a=a||window,b.rAF=!1,b.target=0,b.scroll=0,b.animate=function(){b.scroll+=.1*(b.target-b.scroll),Math.abs(b.scroll.toFixed(5)-b.target)<=.47131&&(cancelAnimationFrame(b.rAF),b.rAF=!1),a==window?scrollTo(0,b.scroll):a.scrollTop=b.scroll,b.rAF&&(b.rAF=requestAnimationFrame(b.animate))},a.onmousewheel=function(d){d.preventDefault(),d.stopPropagation();var e=a==window?c.scrollHeight-c.clientHeight:a.scrollHeight-a.clientHeight;b.target+=d.wheelDelta>0?-70:70,b.target<0&&(b.target=0),b.target>e&&(b.target=e),b.rAF||(b.rAF=requestAnimationFrame(b.animate))},a.onscroll=function(){b.rAF||(b.target=a==window?pageYOffset||c.scrollTop:a.scrollTop,b.scroll=b.target)}}angular.module("portfolioApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","infinite-scroll"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/sns",{templateUrl:"views/sns.html",controller:"SnsCtrl",controllerAs:"sns"}).when("/blog",{templateUrl:"views/blog.html",controller:"BlogCtrl",controllerAs:"blog"}).otherwise({redirectTo:"/"})}]),new SmoothScroll,angular.module("portfolioApp").factory("commonUtil",function(){return{changeMyPfBg:function(a,b){if(a.files&&a.files[0]){var c=new FileReader;c.onload=function(a){$("."+b).css("background-image","url("+a.target.result+")")},c.readAsDataURL(a.files[0])}}}}).filter("elapsedTimeFilter",function(){return function(a){var b,c=moment.duration(moment().diff(a)),d=c.years(),e=c.months(),f=c.weeks(),g=c.days(),h=c.hours(),i=c.minutes(),j=c.seconds();return b=d>0?d+"년":e>0?e+"달":f>0?f+"주":g>0?g+"일":h>0?h+"시간":i>0?i+"분":j+"초"}}).filter("countStyleCheck",function(){return function(a){var b=a>0?"#7ACCBE":"#999";return b}}),angular.module("portfolioApp").controller("MainCtrl",function(){}),angular.module("portfolioApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("portfolioApp").controller("BlogCtrl",function(){$("ul.blog-navbar-nav li").hover(function(){$(this).children("a").css("color","#e85d5b")},function(){$(this).children("a").css("color","#999")})}),angular.module("portfolioApp").controller("SnsCtrl",["$scope","$timeout","commonUtil","randomData",function(a,b,c,d){a.searchKeyword="",a.searchBar=!1,a.searchClick=function(){a.searchBar=!a.searchBar,$(".sns-search-keyword").animate({width:"toggle"})},a.targetBg=!1,a.targetPhoto=!1,a.changeImg=function(a,b){c.changeMyPfBg(a,b),"my-info"==b?$(".bg-change-btn").click():$(".photo-change-btn").click()},$(".my-photo").hover(function(){$(".photo-change-btn").fadeIn().css("display","block")},function(){$(".photo-change-btn").css("display","none")}),a.postContent={},a.uploadImage=function(b){if(b.files&&b.files[0])if(/\.(jpe?g|png|gif)$/i.test(b.files[0].name)){a.postContent.imageName=b.files[0].name;var c=new FileReader;c.onload=function(b){a.$apply(function(a){a.postContent.image=b.target.result})},c.readAsDataURL(b.files[0])}else console.log("아니다")},a.cancelImage=function(){delete a.postContent.image,delete a.postContent.imageName},a.controlOn=!0,a.closeSimpleWrite=function(){a.controlOn=!a.controlOn,$(".simple-write-content").animate({height:"toggle"})},a.recommendUser=function(){a.recommend=[];for(var b=d.users,c=d.title,e=0;3>e;e++){var f={};f.user=b[Math.floor(Math.random()*b.length)],f.title=c[Math.floor(Math.random()*c.length)],a.recommend.push(f)}},a.recommendUser(),a.popularityList=function(){a.popularity=[],$(".popularity #popularCarousel .loading").show(),$(".popularity #popularCarousel .carousel-inner").hide(),$(".popularity #popularCarousel .carousel-indicators").hide();for(var c=[],e=d.users,f=d.title,g=d.content,h=d.images,i=0;5>i;i++){var j={item:[]};j.user=e[Math.floor(Math.random()*e.length)],j.item={title:f[Math.floor(Math.random()*f.length)],content:g[Math.floor(Math.random()*g.length)],image:h[Math.floor(Math.random()*h.length)]},c.push(j)}b(function(){a.popularity=c,$(".popularity #popularCarousel .loading").hide(),$(".popularity #popularCarousel .carousel-inner").show(),$(".popularity #popularCarousel .carousel-indicators").show()},1e3)},a.popularityList(),a.snsList=[];var e=-10,f=function(){for(var b=d.users,c=d.title,f=d.content,g=d.images,h=0;5>h;h++){var i={item:{},feed:{}};i.user=b[Math.floor(Math.random()*b.length)],i.item={title:c[Math.floor(Math.random()*c.length)],content:f[Math.floor(Math.random()*f.length)],image:g[Math.floor(Math.random()*g.length)],date:moment().second(e).format("YYYY-MM-DD HH:mm:ss")},i.feed.views=Math.floor(300*Math.random()),i.feed.likes=Math.floor(Math.random()*i.feed.views),i.feed.comments=Math.floor(Math.random()*i.feed.likes),i.feed.pin=Math.floor(Math.random()*i.feed.comments),i.feed.bookmark=Math.floor(Math.random()*i.feed.comments),e-=Math.floor(1e3*Math.random()),a.snsList.push(i)}};f(),$(window).resize(function(){var a=$(".sns-sidebar").height(),b=$(window).height()+$(window).scrollTop(),c=$("body").width();977>c?($(".sns-sidebar").removeClass("sns-sidebar-scroll"),$(".sns-center").removeClass("sns-center-scroll")):b-a>50?($(".sns-sidebar").addClass("sns-sidebar-scroll"),$(".sns-center").addClass("sns-center-scroll")):($(".sns-sidebar").removeClass("sns-sidebar-scroll"),$(".sns-center").removeClass("sns-center-scroll"))}),$(window).scroll(function(){var a=$("body").height(),b=$(window).height()+$(window).scrollTop(),c=a-b;10>c&&f();var d=$(".sns-sidebar").height(),e=$("body").width();e>976&&(b-d>50?($(".sns-sidebar").addClass("sns-sidebar-scroll"),$(".sns-center").addClass("sns-center-scroll")):($(".sns-sidebar").removeClass("sns-sidebar-scroll"),$(".sns-center").removeClass("sns-center-scroll")))})}]).value("randomData",{users:[{name:"Robert Downey Jr",photo:"images/Robert-Downey-Jr.jpg"},{name:"Chorong-Chorong",photo:"images/images.jpg"},{name:"Song JK",photo:"images/images-1.jpg"},{name:"IU",photo:"images/imgres.jpg"},{name:"MJ",photo:"images/minjung.jpg"},{name:"Su-jin",photo:"images/sujin.jpg"},{name:"Boyoung Park",photo:"images/boyoung.jpg"}],title:["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Mauris interdum est non enim feugiat, ut dignissim quam maximus.","Donec tristique neque dolor, nec volutpat justo fringilla sed.","Donec laoreet ipsum et aliquet tempor.","Integer quis purus cursus, ornare metus sit amet, venenatis enim.","Integer dapibus nec enim a tincidunt. Integer sit amet sollicitudin neque.","Praesent turpis dolor, convallis vitae purus eu, semper accumsan metus.","Curabitur cursus convallis sem, id tincidunt turpis fringilla ut.","Proin tempus ornare lobortis.","Nunc tempor dictum erat, interdum viverra metus lobortis sit amet.","Proin sit amet massa ante.","Proin cursus ligula augue, ut bibendum ante ullamcorper vitae.","Quisque vulputate magna et tellus malesuada imperdiet.","Nullam ipsum nunc, efficitur a sapien malesuada, pharetra bibendum metus.","Quisque facilisis condimentum malesuada.","Quisque in porta nisl.","Fusce mollis libero leo.","Duis risus urna, lobortis vitae tempor in, pretium nec tortor.","Nunc faucibus diam sollicitudin est posuere eleifend.","Nunc elementum nunc eget libero scelerisque malesuada.","Aliquam interdum bibendum sodales."],content:["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum est non enim feugiat, ut dignissim quam maximus. Donec tristique neque dolor, nec volutpat justo fringilla sed. Donec laoreet ipsum et aliquet tempor. Integer quis purus cursus, ornare metus sit amet, venenatis enim. Integer dapibus nec enim a tincidunt. Integer sit amet sollicitudin neque. Praesent turpis dolor, convallis vitae purus eu, semper accumsan metus. Curabitur cursus convallis sem, id tincidunt turpis fringilla ut. Proin tempus ornare lobortis. Nunc tempor dictum erat, interdum viverra metus lobortis sit amet.","Proin sit amet massa ante. Proin cursus ligula augue, ut bibendum ante ullamcorper vitae. Quisque vulputate magna et tellus malesuada imperdiet. Nullam ipsum nunc, efficitur a sapien malesuada, pharetra bibendum metus. Quisque facilisis condimentum malesuada. Quisque in porta nisl. Fusce mollis libero leo. Duis risus urna, lobortis vitae tempor in, pretium nec tortor. Nunc faucibus diam sollicitudin est posuere eleifend. Nunc elementum nunc eget libero scelerisque malesuada. Aliquam interdum bibendum sodales.","Nullam lectus mauris, congue et enim eget, pellentesque tincidunt libero. Curabitur commodo dui eu sem finibus pretium. Quisque ligula risus, laoreet id nulla vitae, laoreet mattis purus. Maecenas venenatis nulla elit, a accumsan dolor faucibus sed. Ut vel euismod libero, eu tempor leo. Integer mauris nisi, lobortis at tempus vel, lobortis vel ante. Nam efficitur, dui vel posuere tincidunt, nunc ante consectetur libero, at semper justo quam vel sapien. Vestibulum suscipit turpis nec erat hendrerit consequat. Cras ornare consequat ligula at tincidunt. Duis et lectus vehicula, tincidunt eros eget, laoreet justo. Sed vel nisl aliquet, bibendum ligula vel, fermentum mi.","Aliquam a vestibulum ex, id bibendum est. Duis sodales erat ac leo euismod dapibus. Mauris a nibh id tortor aliquam luctus. In ullamcorper nibh ac turpis aliquam, ut dictum ipsum accumsan. Pellentesque fermentum efficitur turpis, non mattis urna fringilla id. Quisque ornare suscipit massa, nec tristique ex tincidunt in. Suspendisse euismod eros sed augue laoreet varius. Cras turpis nibh, blandit eget finibus nec, dictum ut elit. Donec in metus vitae tortor malesuada egestas non in ex. Nulla semper id mauris id egestas. Maecenas pellentesque nulla quam, ac viverra erat molestie non. Sed fermentum rhoncus eros, suscipit dapibus purus hendrerit eget. Sed quis sollicitudin diam. Integer at risus interdum, commodo libero a, malesuada nulla. Aenean tincidunt nisl eu tortor pulvinar laoreet. Ut arcu lorem, pharetra ut neque eget, elementum viverra diam.","Aliquam iaculis elit fringilla vestibulum pellentesque. Sed sem ligula, scelerisque et semper ut, pretium faucibus nisi. Proin maximus, metus nec pretium tempor, libero erat pharetra metus, eget consequat diam leo id orci. Curabitur varius libero at metus eleifend bibendum. Duis vel dolor vel mauris elementum posuere. Mauris non pellentesque ante. Curabitur eleifend maximus faucibus. Donec id fermentum ipsum. Nunc sed dolor at nibh posuere tincidunt. Ut est elit, molestie at nisl vel, tristique malesuada arcu. Pellentesque sit amet magna viverra mauris lacinia tempor. Curabitur in purus nibh. Fusce consequat dolor id mi consectetur luctus id malesuada lacus.","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum est non enim feugiat, ut dignissim quam maximus.","Donec tristique neque dolor, nec volutpat justo fringilla sed. Donec laoreet ipsum et aliquet tempor.","Integer quis purus cursus, ornare metus sit amet, venenatis enim. Integer dapibus nec enim a tincidunt. Integer sit amet sollicitudin neque.","Praesent turpis dolor, convallis vitae purus eu, semper accumsan metus. Curabitur cursus convallis sem, id tincidunt turpis fringilla ut.","Proin tempus ornare lobortis. Nunc tempor dictum erat, interdum viverra metus lobortis sit amet.","Proin sit amet massa ante. Proin cursus ligula augue, ut bibendum ante ullamcorper vitae.","Quisque vulputate magna et tellus malesuada imperdiet. Nullam ipsum nunc, efficitur a sapien malesuada, pharetra bibendum metus.","Quisque facilisis condimentum malesuada. Quisque in porta nisl.","Fusce mollis libero leo. Duis risus urna, lobortis vitae tempor in, pretium nec tortor.","Nunc faucibus diam sollicitudin est posuere eleifend. Nunc elementum nunc eget libero scelerisque malesuada. Aliquam interdum bibendum sodales."],images:["images/IMG_0019.jpg","images/IMG_0105.jpg","images/IMG_2080.jpg","images/IMG_2120.jpg","images/IMG_2284.jpg","images/IMG_2885.jpg","images/IMG_2920.jpg","images/IMG_3265.jpg","images/IMG_6163.jpg","images/IMG_7882.jpg","images/IMG_8271.jpg","images/IMG_8381.jpg","images/FullSizeRender-4.jpg","images/IMG_0112.jpg","images/IMG_0242.jpg","images/IMG_0247.jpg","images/IMG_0450.jpg","images/IMG_0456.jpg","images/IMG_0604.jpg","images/IMG_0781.jpg","images/IMG_0879.jpg","images/IMG_0949.jpg","images/IMG_0953.jpg","images/IMG_0957.jpg","images/IMG_1622.jpg","images/IMG_1988.jpg","images/IMG_2051.jpg","images/IMG_2257.jpg","images/IMG_2282.jpg","images/IMG_2830.jpg","images/IMG_2887.jpg","images/IMG_3842.jpg","images/IMG_3845.jpg","images/IMG_6351.jpg"]}),angular.module("portfolioApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="container"> <p>This is the about view.</p> </div>'),a.put("views/blog.html",'<div class="blog-row"> <div class="container blog-container"> <div id="header" class="blog-header col-md-12"> <div class="title"> <a type="button" class="blog-nav-collapse" data-toggle="collapse" data-target="#blog-navbar-collapse"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </a> <div>Header</div> </div> <div class="collapse navbar-collapse blog-navbar-collapse" id="blog-navbar-collapse"> <ul class="blog-navbar-nav"> <li class="active"><a>Home</a><span class="glyphicon glyphicon-menu-right"></span></li> <li><a>About</a><span class="glyphicon glyphicon-menu-right"></span></li> <li><a>blog</a><span class="glyphicon glyphicon-menu-right"></span></li> <li><a>Contact</a><span class="glyphicon glyphicon-menu-right"></span></li> </ul> </div> </div> <div class="blog-sidebar col-md-4"> <div>sidebar</div> </div> <div class="blog-content col-md-8"> <div>content</div> </div> </div> </div>'),a.put("views/main.html",'<div class="header"> <div class="navbar navbar-default" role="navigation"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/">Portfolio</a> </div> <div class="collapse navbar-collapse" id="js-navbar-collapse"> <ul class="nav navbar-nav"> <li class="active"><a href="#/">Home</a></li> <li><a ng-href="#/about">About</a></li> <li><a ng-href="#/blog">Blog</a></li> <li><a ng-href="#/sns">Sns</a></li> <li><a ng-href="#/">Contact</a></li> </ul> </div> </div> </div> </div> <div class="full-container"> <div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="container"> <div class="col-md-6">Test</div> <div class="col-md-6">Test</div> </div> <div class="skill"> <div class="container"> <div class="col-md-4"> <h4>Html</h4> <p>Lorem ipsum dolor sit amet, latine deterruisset no sea, cum et altera oblique molestiae. Liber inimicus eam eu, ne numquam inermis constituam mea. Fabulas temporibus at ius. Aeque dissentiet per ad.</p> </div> <div class="col-md-4"> <h4>CSS</h4> <p>Lorem ipsum dolor sit amet, latine deterruisset no sea, cum et altera oblique molestiae. Liber inimicus eam eu, ne numquam inermis constituam mea. Fabulas temporibus at ius. Aeque dissentiet per ad.</p> </div> <div class="col-md-4"> <h4>Javascript</h4> <p>Lorem ipsum dolor sit amet, latine deterruisset no sea, cum et altera oblique molestiae. Liber inimicus eam eu, ne numquam inermis constituam mea. Fabulas temporibus at ius. Aeque dissentiet per ad.</p> </div> <div class="col-md-4"> <h4>AngularJS</h4> <p>Lorem ipsum dolor sit amet, latine deterruisset no sea, cum et altera oblique molestiae. Liber inimicus eam eu, ne numquam inermis constituam mea. Fabulas temporibus at ius. Aeque dissentiet per ad.</p> </div> <div class="col-md-4"> <h4>Bootstrap</h4> <p>Lorem ipsum dolor sit amet, latine deterruisset no sea, cum et altera oblique molestiae. Liber inimicus eam eu, ne numquam inermis constituam mea. Fabulas temporibus at ius. Aeque dissentiet per ad.</p> </div> <div class="col-md-4"> <h4>Ionic</h4> <p>Lorem ipsum dolor sit amet, latine deterruisset no sea, cum et altera oblique molestiae. Liber inimicus eam eu, ne numquam inermis constituam mea. Fabulas temporibus at ius. Aeque dissentiet per ad.</p> </div> <div class="col-md-4"> <h4>Git</h4> <p>Lorem ipsum dolor sit amet, latine deterruisset no sea, cum et altera oblique molestiae. Liber inimicus eam eu, ne numquam inermis constituam mea. Fabulas temporibus at ius. Aeque dissentiet per ad.</p> </div> <div class="col-md-4"> <h4>Underscore</h4> <p>Lorem ipsum dolor sit amet, latine deterruisset no sea, cum et altera oblique molestiae. Liber inimicus eam eu, ne numquam inermis constituam mea. Fabulas temporibus at ius. Aeque dissentiet per ad.</p> </div> <div class="col-md-4"> <h4>MongoDB</h4> <p>Lorem ipsum dolor sit amet, latine deterruisset no sea, cum et altera oblique molestiae. Liber inimicus eam eu, ne numquam inermis constituam mea. Fabulas temporibus at ius. Aeque dissentiet per ad.</p> </div> </div> </div> </div>'),a.put("views/sns.html",'<a class="pf-home" href="#/"> <span class="glyphicon glyphicon-home"></span> </a> <div class="sns-bg"> <div class="sns-nav-bar"> <div class="container"> <a class="sns-home" href="#/sns"><span class="glyphicon glyphicon-grain"></span></a> <div class="sns-nav-list"> <ul> <li class="sns-item"><a><span class="glyphicon glyphicon-user"></span></a></li> <li class="sns-item"><a><span class="glyphicon glyphicon-envelope"></span></a></li> <li class="sns-item"><a><span class="glyphicon glyphicon-bell"></span></a></li> <li class="sns-item"><a><span class="glyphicon glyphicon-pencil"></span></a></li> <li class="sns-item"><a><span class="glyphicon glyphicon-cog"></span></a></li> </ul> </div> <div class="sns-search"> <span class="glyphicon glyphicon-search" ng-click="searchClick()"></span> <input ng-model="searchKeyword" class="sns-search-keyword" type="search" placeholder="search"> <a class="sns-keyword-remove" ng-show="searchKeyword && searchBar" ng-click="searchKeyword=\'\'">✕</a> </div> </div> </div> <div class="container sns-container"> <!-- Left Sidebar --> <div class="sns-sidebar col-md-3"> <div class="my-profile"> <div class="my-info"> <a class="bg-change-btn" ng-click="targetBg = !targetBg"><span class="glyphicon glyphicon-camera"></span></a> <div class="bg-img-input" ng-if="targetBg"> <span class="glyphicon glyphicon-triangle-top"></span> <div class="fileUpload btn"> <span>Upload</span> <input type="file" class="upload" onchange="angular.element(this).scope().changeImg(this , \'my-info\')"> </div> </div> <div class="my-photo"> <a class="photo-change-btn" ng-click="targetPhoto = !targetPhoto"><span class="glyphicon glyphicon-camera"></span></a> <div class="photo-img-input" ng-if="targetPhoto"> <span class="glyphicon glyphicon-triangle-top"></span> <div class="fileUpload btn"> <span>Upload</span> <input type="file" class="upload" onchange="angular.element(this).scope().changeImg(this , \'my-photo\')"> </div> </div> </div> <div class="profile"> <div id="name">Semjok</div> <div id="email">m.semjok@gmail.com</div> </div> </div> <div class="my-record"> <ul> <li> <div>Posts</div> <div>9</div> </li> <li> <div>Follow</div> <div>33</div> </li> <li> <div>Following</div> <div>21</div> </li> </ul> </div> </div> <div class="simple-write"> <div class="title"> <span class="glyphicon glyphicon-leaf"></span> 소식을 전하시겠습니까? <a class="simple-write-control" ng-if="controlOn" ng-click="closeSimpleWrite()">▾</a> <a class="simple-write-control" ng-if="!controlOn" ng-click="closeSimpleWrite()">‣</a> </div> <div class="simple-write-content"> <input ng-model="postContent.title" type="text" class="form-control"> <textarea ng-model="postContent.content" class="form-control"></textarea> <div> <ul class="write-item"> <li ng-style="{color: postContent.image ? \'#FF5879\' : \'#666\'}"> <span class="glyphicon glyphicon-picture"></span> <input type="file" onchange="angular.element(this).scope().uploadImage(this)" multiple> </li> <li> <a data-toggle="modal" data-target=".uploadVideoModal"><span class="glyphicon glyphicon-facetime-video"></span></a> </li> <li> <span class="glyphicon glyphicon-user"></span> </li> <!--<li class="glyphicon glyphicon-map-marker"></li>--> <li class="sendBtn"> <a ng-style="{\'background\' : (postContent.content.length > 0 && postContent.title.length > 0)? \'#7ACCBE\' : \'#DDD\' }"><span class="glyphicon glyphicon-ok"></span></a></li> </ul> </div> <div class="image" ng-if="postContent.image" style="background-image:url(\'{{postContent.image}}\')"> <p>Upload image : {{postContent.imageName}}</p> <a class="cancel" ng-click="cancelImage()">✕</a> </div> <div class="video" ng-if="postContent.video">sdjlaskd</div> <div class="user">sdjlaskd</div> <div class="marker">sdjlaskd</div> </div> </div> <!-- Upload Video Modal--> <div class="modal fade uploadVideoModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"> <div class="modal-dialog modal-sm"> <div class="modal-content"> ... </div> </div> </div> <div class="sideNav"> <ul> <li> <a><span class="glyphicon glyphicon-bookmark"></span> Bookmark</a> <span>2</span> </li> <li> <a><span class="glyphicon glyphicon-thumbs-up"></span> Likes</a> <span>12</span> </li> <li> <a><span class="glyphicon glyphicon-pushpin"></span> Pin</a> <span>4</span> </li> <li> <a><span class="glyphicon glyphicon-calendar"></span> Event</a> <span>1</span> </li> <li> <a><span class="glyphicon glyphicon-user glyphicon-user"></span> Friend</a> <span>3</span> </li> </ul> </div> <div class="recommend"> Recommend <a class="repeat-list" ng-click="recommendUser()"><span class="glyphicon glyphicon-repeat"></span></a> <ul> <li ng-repeat="list in recommend"> <div class="photo" style="background-image: url(\'{{list.user.photo}}\')"> <p>{{list.user.name}} profile image</p> </div> <div class="content"> <div class="text">{{list.title}}</div> </div> <button class="moreBtn btn">더보기<span class="glyphicon glyphicon-triangle-right"></span></button> </li> </ul> </div> <div class="popularity"> Popularity <a class="repeat-list" ng-click="popularityList();"><span class="glyphicon glyphicon-repeat"></span></a> <div id="popularCarousel" class="carousel slide" data-ride="carousel"> <div class="loading"> Loading ... </div> <!-- Indicators --> <ol class="carousel-indicators"> <li data-target="#popularCarousel" data-slide-to="0" class="active"></li> <li data-target="#popularCarousel" data-slide-to="1"></li> <li data-target="#popularCarousel" data-slide-to="2"></li> <li data-target="#popularCarousel" data-slide-to="3"></li> <li data-target="#popularCarousel" data-slide-to="4"></li> </ol> <!-- Wrapper for slides --> <div class="carousel-inner" role="listbox"> <div class="item" ng-class="{active:!$index}" ng-repeat="list in popularity"> <img src="{{list.item.image}}" alt="{{list.item.image}}"> <div class="title"> <div>{{list.item.title}}</div> </div> </div> </div> </div> </div> </div> <!-- //. Left Sidebar --> <!-- Content --> <div class="sns-center col-md-6"> <div class="posts" infinite-scroll> <ul class="items"> <li class="item" ng-repeat="list in snsList track by $index"> <div class="image" style="background-image: url(\'{{list.item.image}}\')"> <p>title \'{{list.item.title}}\' for background image</p> </div> <div class="content"> <div class="user-photo" style="background-image: url(\'{{list.user.photo}}\')"> <p>{{list.user.name}} profile image</p> </div> <div class="user-name"><h4>{{list.user.name}}</h4></div> <h5>{{list.item.title}}<span>- {{ list.item.date | elapsedTimeFilter}} 전</span></h5> <div class="text">{{list.item.content}}</div> </div> <div class="feed"> <ul> <li><a class="view" ng-style="{ color : ( list.feed.views | countStyleCheck )}"> <span class="glyphicon glyphicon-eye-open"></span> <span class="count">{{list.feed.views}}</span></a></li> <li><a class="like" ng-style="{ color : (list.feed.likes | countStyleCheck )}"> <span class="glyphicon glyphicon-thumbs-up"></span> <span class="count">{{list.feed.likes}}</span></a></li> <li><a class="comment" ng-style="{ color : (list.feed.comments | countStyleCheck )}"> <span class="glyphicon glyphicon-comment"></span> <span class="count">{{list.feed.comments}}</span></a></li> <li><a class="pin" ng-style="{ color : (list.feed.pin | countStyleCheck )}"> <span class="glyphicon glyphicon-pushpin"></span> <span class="count">{{list.feed.pin}}</span></a> </li> <li><a class="bookmark" ng-style="{ color : (list.feed.bookmark | countStyleCheck )}"> <span class="glyphicon glyphicon-bookmark"></span> <span class="count">{{list.feed.bookmark}}</span></a></li> </ul> <a class="moreBtn">more<span class="glyphicon glyphicon-triangle-right"></span></a> </div> </li> </ul> </div> <div class="loading">Loading ... </div> </div> <!-- //. Content --> <!-- Right Sidebar--> <div class="sns-right-sidebar col-md-3"> <div class="fixedSponsored"> <div class="sponsored"> <div>Sponsored</div> </div> <div class="sponsor-list"> <ul> <li class="default"> <img alt="sponsor image"> <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5> <p>Proin sit amet massa ante. Proin cursus ligula augue, ut bibendum ante ullamcorper vitae.</p> </li> <li class="choose1"> <img alt="sponsor image"> <h5 class="title">Mauris interdum est non enim feugiat, ut dignissim quam maximus.</h5> </li> </ul> </div> <div class="copyright"> copyright ⓒ 2016 <a href="http://semjok.com" target="_blank">SEMJOK</a><br>All Rights Reserved </div> </div> </div> <!-- //. Right Sidebar--> </div> </div>')}]);