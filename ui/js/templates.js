angular.module('materialAdmin').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/footer.html',
    "Copyright &copy; 2015 Material Admin<ul class=\"f-menu\"><li><a href=\"\">Home</a></li><li><a href=\"\">Dashboard</a></li><li><a href=\"\">Reports</a></li><li><a href=\"\">Support</a></li><li><a href=\"\">Contact</a></li></ul>"
  );


  $templateCache.put('template/header.html',
    "<ul class=\"header-inner clearfix\"><li class=\"logo hidden-xs\"><a data-ui-sref=\"profile.profile-about\">Proof-O-Existence</a></li><li class=\"pull-right\"><ul class=\"top-menu\"><li id=\"top-search\"><a href=\"\" data-ng-click=\"hctrl.openSearch()\"><i class=\"tm-icon zmdi zmdi-search\"></i></a></li><li><a href=\"\"><i class=\"tm-icon zmdi zmdi-refresh-sync\"></i></a></li><li class=\"dropdown\" uib-dropdown><a uib-dropdown-toggle href=\"\"><i class=\"tm-icon zmdi zmdi-notifications\"></i> <i class=\"tmn-counts\">9</i></a><div class=\"dropdown-menu dropdown-menu-lg stop-propagate pull-right\"><div class=\"listview\" id=\"notifications\"><div class=\"lv-header\">Notification<ul class=\"actions\"><li><a href=\"\" data-ng-click=\"hctrl.clearNotification($event)\"><i class=\"zmdi zmdi-check-all\"></i></a></li></ul></div><div class=\"lv-body\"><a class=\"lv-item\" ng-href=\"\" ng-repeat=\"w in hctrl.messageResult.list\"><div class=\"media\"><div class=\"pull-left\"><img class=\"lv-img-sm\" ng-src=\"img/profile-pics/{{ w.img }}\" alt=\"\"></div><div class=\"media-body\"><div class=\"lv-title\">{{ w.user }}</div><small class=\"lv-small\">{{ w.text }}</small></div></div></a></div><div class=\"clearfix\"></div><a class=\"lv-footer\" href=\"\">View Previous</a></div></div></li></ul></li></ul><!-- Top Search Content --><div id=\"top-search-wrap\"><div class=\"tsw-inner\"><i id=\"top-search-close\" class=\"zmdi zmdi-arrow-left\" data-ng-click=\"hctrl.closeSearch()\"></i> <input type=\"text\"></div></div>"
  );


  $templateCache.put('template/profile-menu.html',
    "<li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"profile.profile-about\">About</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"profile.profile-timeline\">Timeline</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"profile.profile-connections\">Connections</a></li>"
  );


  $templateCache.put('template/carousel/carousel.html',
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\"><ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\"><li ng-repeat=\"slide in slides | orderBy:'index' track by $index\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li></ol><div class=\"carousel-inner\" ng-transclude></div><a class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\"><span class=\"zmdi zmdi-chevron-left\"></span></a> <a class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\"><span class=\"zmdi zmdi-chevron-right\"></span></a></div>"
  );


  $templateCache.put('template/datepicker/day.html',
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" class=\"dp-table dpt-day\"><thead><tr class=\"tr-dpnav\"><th><button type=\"button\" class=\"pull-left btn-dp\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-left\"></i></button></th><th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" class=\"w-100 btn-dp\"><div class=\"dp-title\">{{title}}</div></button></th><th><button type=\"button\" class=\"pull-right btn-dp\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-right\"></i></button></th></tr><tr class=\"tr-dpday\"><th ng-if=\"showWeeks\" class=\"text-center\"></th><th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th></tr></thead><tbody><tr ng-repeat=\"row in rows track by $index\"><td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td><td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\"><button type=\"button\" class=\"w-100 btn-dp btn-dpday btn-dpbody\" ng-class=\"{'dp-today': dt.current, 'dp-selected': dt.selected, 'dp-active': isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'dp-day-muted': dt.secondary, 'dp-day-today': dt.current}\">{{::dt.label}}</span></button></td></tr></tbody></table>"
  );


  $templateCache.put('template/datepicker/month.html',
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" class=\"dp-table\"><thead><tr class=\"tr-dpnav\"><th><button type=\"button\" class=\"pull-left btn-dp\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-left\"></i></button></th><th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" class=\"w-100 btn-dp\"><div class=\"dp-title\">{{title}}</div></button></th><th><button type=\"button\" class=\"pull-right btn-dp\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-right\"></i></button></th></tr></thead><tbody><tr ng-repeat=\"row in rows track by $index\"><td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\"><button type=\"button\" class=\"w-100 btn-dp btn-dpbody\" ng-class=\"{'dp-selected': dt.selected, 'dp-active': isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'dp-day-today': dt.current}\">{{::dt.label}}</span></button></td></tr></tbody></table>"
  );


  $templateCache.put('template/datepicker/popup.html',
    "<ul class=\"dropdown-menu\" ng-keydown=\"keydown($event)\"><li ng-transclude></li><li ng-if=\"showButtonBar\" class=\"dp-actions clearfix\"><button type=\"button\" class=\"btn btn-link\" ng-click=\"select('today')\">{{ getText('current') }}</button> <button type=\"button\" class=\"btn btn-link\" ng-click=\"close()\">{{ getText('close') }}</button></li></ul>"
  );


  $templateCache.put('template/datepicker/year.html',
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" class=\"dp-table\"><thead><tr class=\"tr-dpnav\"><th><button type=\"button\" class=\"pull-left btn-dp\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-left\"></i></button></th><th colspan=\"3\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"w-100 btn-dp\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><div class=\"dp-title\">{{title}}</div></button></th><th><button type=\"button\" class=\"pull-right btn-dp\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"zmdi zmdi-long-arrow-right\"></i></button></th></tr></thead><tbody><tr ng-repeat=\"row in rows track by $index\"><td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\"><button type=\"button\" class=\"w-100 btn-dp btn-dpbody\" ng-class=\"{'dp-selected': dt.selected, 'dp-active': isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'dp-day-today': dt.current}\">{{::dt.label}}</span></button></td></tr></tbody></table>"
  );


  $templateCache.put('template/pagination/pager.html',
    "<ul class=\"pager\"><li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\">Previous</a></li><li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\">Next</a></li></ul>"
  );


  $templateCache.put('template/pagination/pagination.html',
    "<ul class=\"pagination\"><li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1, $event)\"><i class=\"zmdi zmdi-more-horiz\"><i></i></i></a></li><li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1, $event)\"><i class=\"zmdi zmdi-chevron-left\"></i></a></li><li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number, $event)\">{{page.text}}</a></li><li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1, $event)\"><i class=\"zmdi zmdi-chevron-right\"></i></a></li><li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages, $event)\"><i class=\"zmdi zmdi-more-horiz\"><i></i></i></a></li></ul>"
  );


  $templateCache.put('template/tabs/tabset.html',
    "<div class=\"clearfix\"><ul class=\"tab-nav\" ng-class=\"{'tn-vertical': vertical, 'tn-justified': justified, 'tab-nav-right': right}\" ng-transclude></ul><div class=\"tab-content\"><div class=\"tab-pane\" ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.active}\" tab-content-transclude=\"tab\"></div></div></div>"
  );

}]);
