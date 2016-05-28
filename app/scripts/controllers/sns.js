/**
 * Created by moonsemina on 2016. 5. 16..
 */
'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:SnsCtrl
 * @description
 * # SnsCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
    .controller('SnsCtrl', function ($scope, $timeout, commonUtil, randomData) {

        $scope.searchKeyword = '';
        $scope.searchBar = false;
        $scope.searchClick = function () {
            $scope.searchBar = !$scope.searchBar;
            $('.sns-search-keyword').animate({width: 'toggle'});
        };


        // 유저 배경 또는 사진 변경
        $scope.targetBg = false;
        $scope.targetPhoto = false;
        $scope.changeImg = function (input, target) {
            commonUtil.changeMyPfBg(input, target);
            if (target == 'my-info') {
                $('.bg-change-btn').click();
            } else {
                $('.photo-change-btn').click();
            }
        };
        // 유저사진 변경을 위한 hover event
        $('.my-photo').hover(
            function () {
                $('.photo-change-btn').fadeIn().css('display', 'block');
            },
            function () {
                $('.photo-change-btn').css('display', 'none');
            }
        );


        // 새로운 글을 작성합니다.
        $scope.postContent = {};
        // 이미지를 업로드합니다.
        $scope.uploadImage = function(input){
            if (input.files && input.files[0]) { // 파일 유효성 검사
                if( /\.(jpe?g|png|gif)$/i.test(input.files[0].name)){ // 확장자 검사
                    $scope.postContent.imageName = input.files[0].name;
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function($scope){
                            $scope.postContent.image =  e.target.result;
                        });
                    };
                    reader.readAsDataURL(input.files[0]);
                }else{
                    console.log('아니다');
                }
            }
        };
        // 업로드한 이미지를 삭제합니다
        $scope.cancelImage = function(){
            delete $scope.postContent.image;
            delete $scope.postContent.imageName;
        };
        
        
        
        $scope.controlOn = true;
        $scope.closeSimpleWrite = function () {
            $scope.controlOn = !$scope.controlOn;
            $('.simple-write-content').animate({height: 'toggle'});
        };

        // 추천유저 랜덤 생성
        $scope.recommendUser = function(){
            $scope.recommend = [];
            var users = randomData.users;
            var titles = randomData.title;
            for(var i = 0; i < 3; i++){
                var obj = {};
                obj.user = users[Math.floor(Math.random() * users.length)];
                obj.title = titles[Math.floor(Math.random() * titles.length)];
                $scope.recommend.push(obj);
            }
        };
        $scope.recommendUser();

        // 인기게시글 랜덤 생성
        $scope.popularityList = function(){
            $scope.popularity = [];
            $('.popularity #popularCarousel .loading').show();
            $('.popularity #popularCarousel .carousel-inner').hide();
            $('.popularity #popularCarousel .carousel-indicators').hide();
            var array = [];
            var users = randomData.users;
            var titles = randomData.title;
            var contents = randomData.content;
            var images = randomData.images;
            for(var i = 0; i < 5; i++){
                var obj = {
                    item : []
                };
                obj.user = users[Math.floor(Math.random() * users.length)];
                obj.item = {
                    title: titles[Math.floor(Math.random() * titles.length)],
                    content: contents[Math.floor(Math.random() * contents.length)],
                    image: images[Math.floor(Math.random() * images.length)]
                };
                array.push(obj);
            }
            $timeout(function(){
                $scope.popularity = array;
                $('.popularity #popularCarousel .loading').hide();
                $('.popularity #popularCarousel .carousel-inner').show();
                $('.popularity #popularCarousel .carousel-indicators').show();
            }, 1000);
        };
        $scope.popularityList();

        // 게시글 랜덤생성
        $scope.snsList = [];
        var secondMinusCount = -10;
        var loadingContent = function () {
            var users = randomData.users;
            var titles = randomData.title;
            var contents = randomData.content;
            var images = randomData.images;
            for (var i = 0; i < 5; i++) {
                var obj = {
                    item: {},
                    feed: {}
                };
                obj.user = users[Math.floor(Math.random() * users.length)];
                obj.item = {
                    title: titles[Math.floor(Math.random() * titles.length)],
                    content: contents[Math.floor(Math.random() * contents.length)],
                    image: images[Math.floor(Math.random() * images.length)],
                    date: moment().second(secondMinusCount).format('YYYY-MM-DD HH:mm:ss')
                };
                obj.feed.views = (Math.floor(Math.random() * 300));
                obj.feed.likes = (Math.floor(Math.random() * obj.feed.views));
                obj.feed.comments = (Math.floor(Math.random() * obj.feed.likes));
                obj.feed.pin = (Math.floor(Math.random() * obj.feed.comments));
                obj.feed.bookmark = (Math.floor(Math.random() * obj.feed.comments));
                secondMinusCount -= (Math.floor(Math.random() * 1000));
                $scope.snsList.push(obj);
            }
        };
        loadingContent();

        // 윈도우 사이즈 변경시 CSS 변경
        $(window).resize(function(){
            var sidebarHeight = $('.sns-sidebar').height();
            var scrollPosition = $(window).height() + $(window).scrollTop();
            var bodyWidth = $('body').width();
            if(bodyWidth < 977){
                $('.sns-sidebar').removeClass('sns-sidebar-scroll');
                $('.sns-center').removeClass('sns-center-scroll');
            }else{
                if(scrollPosition - sidebarHeight > 50 ){
                    $('.sns-sidebar').addClass('sns-sidebar-scroll');
                    $('.sns-center').addClass('sns-center-scroll');
                }else{
                    $('.sns-sidebar').removeClass('sns-sidebar-scroll');
                    $('.sns-center').removeClass('sns-center-scroll');
                }
            }
        });

        // Scroll Up or Down 시 왼쪽 sidebar 고정 CSS 변경
        $(window).scroll(function() {
            var scrollHeight = $('body').height();
            var scrollPosition = $(window).height() + $(window).scrollTop();

            var result = scrollHeight - scrollPosition;
            if (result < 10) {
                // Loading Content
                loadingContent();
            }
            var sidebarHeight = $('.sns-sidebar').height();
            var bodyWidth = $('body').width();
            if(bodyWidth > 976){
                if(scrollPosition - sidebarHeight > 50 ){
                    $('.sns-sidebar').addClass('sns-sidebar-scroll');
                    $('.sns-center').addClass('sns-center-scroll');
                }else{
                    $('.sns-sidebar').removeClass('sns-sidebar-scroll');
                    $('.sns-center').removeClass('sns-center-scroll');
                }
            }

        });

    })
    .value('randomData',
        {
            users: [
                {
                    name: 'Robert Downey Jr',
                    photo: 'images/Robert-Downey-Jr.jpg'
                },
                {
                    name: 'Chorong-Chorong',
                    photo: 'images/images.jpg'
                },
                {
                    name: 'Song JK',
                    photo: 'images/images-1.jpg'
                },
                {
                    name: 'IU',
                    photo: 'images/imgres.jpg'
                },
                {
                    name: 'MJ',
                    photo: 'images/minjung.jpg'
                },
                {
                    name: 'Su-jin',
                    photo: 'images/sujin.jpg'
                },
                {
                    name: 'Boyoung Park',
                    photo: 'images/boyoung.jpg'
                }
            ],
            title: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Mauris interdum est non enim feugiat, ut dignissim quam maximus.',
                'Donec tristique neque dolor, nec volutpat justo fringilla sed.',
                'Donec laoreet ipsum et aliquet tempor.',
                'Integer quis purus cursus, ornare metus sit amet, venenatis enim.',
                'Integer dapibus nec enim a tincidunt. Integer sit amet sollicitudin neque.',
                'Praesent turpis dolor, convallis vitae purus eu, semper accumsan metus.',
                'Curabitur cursus convallis sem, id tincidunt turpis fringilla ut.',
                'Proin tempus ornare lobortis.',
                'Nunc tempor dictum erat, interdum viverra metus lobortis sit amet.',
                'Proin sit amet massa ante.',
                'Proin cursus ligula augue, ut bibendum ante ullamcorper vitae.',
                'Quisque vulputate magna et tellus malesuada imperdiet.',
                'Nullam ipsum nunc, efficitur a sapien malesuada, pharetra bibendum metus.',
                'Quisque facilisis condimentum malesuada.',
                'Quisque in porta nisl.',
                'Fusce mollis libero leo.',
                'Duis risus urna, lobortis vitae tempor in, pretium nec tortor.',
                'Nunc faucibus diam sollicitudin est posuere eleifend.',
                'Nunc elementum nunc eget libero scelerisque malesuada.',
                'Aliquam interdum bibendum sodales.'
            ],
            content: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum est non enim feugiat, ut dignissim quam maximus. Donec tristique neque dolor, nec volutpat justo fringilla sed. Donec laoreet ipsum et aliquet tempor. Integer quis purus cursus, ornare metus sit amet, venenatis enim. Integer dapibus nec enim a tincidunt. Integer sit amet sollicitudin neque. Praesent turpis dolor, convallis vitae purus eu, semper accumsan metus. Curabitur cursus convallis sem, id tincidunt turpis fringilla ut. Proin tempus ornare lobortis. Nunc tempor dictum erat, interdum viverra metus lobortis sit amet.',
                'Proin sit amet massa ante. Proin cursus ligula augue, ut bibendum ante ullamcorper vitae. Quisque vulputate magna et tellus malesuada imperdiet. Nullam ipsum nunc, efficitur a sapien malesuada, pharetra bibendum metus. Quisque facilisis condimentum malesuada. Quisque in porta nisl. Fusce mollis libero leo. Duis risus urna, lobortis vitae tempor in, pretium nec tortor. Nunc faucibus diam sollicitudin est posuere eleifend. Nunc elementum nunc eget libero scelerisque malesuada. Aliquam interdum bibendum sodales.',
                'Nullam lectus mauris, congue et enim eget, pellentesque tincidunt libero. Curabitur commodo dui eu sem finibus pretium. Quisque ligula risus, laoreet id nulla vitae, laoreet mattis purus. Maecenas venenatis nulla elit, a accumsan dolor faucibus sed. Ut vel euismod libero, eu tempor leo. Integer mauris nisi, lobortis at tempus vel, lobortis vel ante. Nam efficitur, dui vel posuere tincidunt, nunc ante consectetur libero, at semper justo quam vel sapien. Vestibulum suscipit turpis nec erat hendrerit consequat. Cras ornare consequat ligula at tincidunt. Duis et lectus vehicula, tincidunt eros eget, laoreet justo. Sed vel nisl aliquet, bibendum ligula vel, fermentum mi.',
                'Aliquam a vestibulum ex, id bibendum est. Duis sodales erat ac leo euismod dapibus. Mauris a nibh id tortor aliquam luctus. In ullamcorper nibh ac turpis aliquam, ut dictum ipsum accumsan. Pellentesque fermentum efficitur turpis, non mattis urna fringilla id. Quisque ornare suscipit massa, nec tristique ex tincidunt in. Suspendisse euismod eros sed augue laoreet varius. Cras turpis nibh, blandit eget finibus nec, dictum ut elit. Donec in metus vitae tortor malesuada egestas non in ex. Nulla semper id mauris id egestas. Maecenas pellentesque nulla quam, ac viverra erat molestie non. Sed fermentum rhoncus eros, suscipit dapibus purus hendrerit eget. Sed quis sollicitudin diam. Integer at risus interdum, commodo libero a, malesuada nulla. Aenean tincidunt nisl eu tortor pulvinar laoreet. Ut arcu lorem, pharetra ut neque eget, elementum viverra diam.',
                'Aliquam iaculis elit fringilla vestibulum pellentesque. Sed sem ligula, scelerisque et semper ut, pretium faucibus nisi. Proin maximus, metus nec pretium tempor, libero erat pharetra metus, eget consequat diam leo id orci. Curabitur varius libero at metus eleifend bibendum. Duis vel dolor vel mauris elementum posuere. Mauris non pellentesque ante. Curabitur eleifend maximus faucibus. Donec id fermentum ipsum. Nunc sed dolor at nibh posuere tincidunt. Ut est elit, molestie at nisl vel, tristique malesuada arcu. Pellentesque sit amet magna viverra mauris lacinia tempor. Curabitur in purus nibh. Fusce consequat dolor id mi consectetur luctus id malesuada lacus.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum est non enim feugiat, ut dignissim quam maximus.',
                'Donec tristique neque dolor, nec volutpat justo fringilla sed. Donec laoreet ipsum et aliquet tempor.',
                'Integer quis purus cursus, ornare metus sit amet, venenatis enim. Integer dapibus nec enim a tincidunt. Integer sit amet sollicitudin neque.',
                'Praesent turpis dolor, convallis vitae purus eu, semper accumsan metus. Curabitur cursus convallis sem, id tincidunt turpis fringilla ut.',
                'Proin tempus ornare lobortis. Nunc tempor dictum erat, interdum viverra metus lobortis sit amet.',
                'Proin sit amet massa ante. Proin cursus ligula augue, ut bibendum ante ullamcorper vitae.',
                'Quisque vulputate magna et tellus malesuada imperdiet. Nullam ipsum nunc, efficitur a sapien malesuada, pharetra bibendum metus.',
                'Quisque facilisis condimentum malesuada. Quisque in porta nisl.',
                'Fusce mollis libero leo. Duis risus urna, lobortis vitae tempor in, pretium nec tortor.',
                'Nunc faucibus diam sollicitudin est posuere eleifend. Nunc elementum nunc eget libero scelerisque malesuada. Aliquam interdum bibendum sodales.'
            ],
            images: [
                'images/IMG_0019.jpg',
                'images/IMG_0105.jpg',
                'images/IMG_2080.jpg',
                'images/IMG_2120.jpg',
                'images/IMG_2284.jpg',
                'images/IMG_2885.jpg',
                'images/IMG_2920.jpg',
                'images/IMG_3265.jpg',
                'images/IMG_6163.jpg',
                'images/IMG_7882.jpg',
                'images/IMG_8271.jpg',
                'images/IMG_8381.jpg',
                'images/FullSizeRender-4.jpg',
                'images/IMG_0112.jpg',
                'images/IMG_0242.jpg',
                'images/IMG_0247.jpg',
                'images/IMG_0450.jpg',
                'images/IMG_0456.jpg',
                'images/IMG_0604.jpg',
                'images/IMG_0781.jpg',
                'images/IMG_0879.jpg',
                'images/IMG_0949.jpg',
                'images/IMG_0953.jpg',
                'images/IMG_0957.jpg',
                'images/IMG_1622.jpg',
                'images/IMG_1988.jpg',
                'images/IMG_2051.jpg',
                'images/IMG_2257.jpg',
                'images/IMG_2282.jpg',
                'images/IMG_2830.jpg',
                'images/IMG_2887.jpg',
                'images/IMG_3842.jpg',
                'images/IMG_3845.jpg',
                'images/IMG_6351.jpg'
            ]
        }
    );

