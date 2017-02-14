// Tabs

$.fn.set_tabs = function (){

$('.tab-panels .active').css({'opacity':1});

    $(".tab-nav li").click(function(e){
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum+1;
            $(".tab-nav li.active").removeClass("active");
            $(this).addClass("active");

            $(".tab-panels .tab-panel.active").stop().animate({ opacity: "0"}, 400,'swing',
                function(){
                $(this).removeClass("active");
                $(".tab-panels .tab-panel:nth-child("+nthChild+")").addClass("active");
                $(".tab-panels .tab-panel:nth-child("+nthChild+")").stop().animate({ opacity: "1"}, 700,'swing');
            });
        }
    return false;
    });

};

