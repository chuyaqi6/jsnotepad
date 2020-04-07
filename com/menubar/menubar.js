var $menubar = (function(){
    var $bar = $('<div class="notepad-menubar"></div>');
    
    var menuData,
        menus = [];

    // 是否有二级菜单打开 默认未打开
    var menuOpen = -1;

    //创建菜单栏
    function createMenuTitle() {
        var $titles = $('<ul class="menu-title"></ul>');
        for(var i=0; i<menuData.length; i++) {
            var $title = $('<li class="title"></li>');

            $title.html(menuData[i].title);
            $title.attr('dataid', i);
            $titles.append($title);
            $title.click(function() {
                var num = this.getAttribute("dataid");
                if(menuOpen == -1){
                    // console.log(menus[num][0].style.display);
                    menus[num][0].style.display= 'inline-block' ;
                    menuOpen = num;
                }else if(menuOpen == num){
                    menus[num][0].style.display= 'none';
                    menuOpen = -1;
                }else{
                    menus[menuOpen][0].style.display = 'none';
                    menus[num][0].style.display= 'inline-block';
                    menuOpen = num;
                }
            })
        }
        $bar.append($titles);
    }
    //创建所有下拉菜单
    function createMenus(){
        for(var i=0; i<menuData.length; i++) {
            var $menus = $('<ul class="menus"></ul>'),
                items = menuData[i].menuItems;
            // console.log(menuData[i].width);
            // console.log($menus[0].style.width);

            for(var j=0; j<items.length; j++) {
                if(items[j].title === 'hr') {
                    var $hr = $('<li class="menu-hr"></li>');
                    $menus.append($hr);
                    continue;
                }
                var $menu = $('<li class="menu-item"></li>');
                $menu.html(items[j].title);
                $menu.attr('x', i);
                $menu.attr('y', j);
                if(items[j].shortcut !== '') {
                    var $shorcut = $('<span class="shortcut"></span>');
                    
                    $shorcut.html(items[j].shortcut);
                    $menu.append($shorcut);
                }
                if(!items[j].enabled){
                    $menu.addClass('disabled');
                }
                $menus.append($menu);
                $menu.click(function() {
                    if($(this).hasClass('disabled')) return;
          
                    var i = this.getAttribute("x"),
                        j = this.getAttribute("y");
          
                    menus[i].css({display: 'none'});
                    active = -1;
          
                    menuData[i].menuItems[j].handler();
                });
            }
            $menus[0].style.width = menuData[i].width;
            $menus[0].style.left = menuData[i].left;
            $menus[0].style.display ='none';
        
            $bar.append($menus);
            menus.push($menus);
        }
    }
    function show(data){
        menuData = data;
        createMenuTitle();
        createMenus();
        $('body').append($bar);
    }
    return {
        show:show
    };
}());