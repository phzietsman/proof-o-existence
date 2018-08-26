angular.module('POEApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/claimModal.html',
    "<div class=\"modal-header\"><h4 class=\"modal-title\">Add new Claim</h4></div><div class=\"modal-body\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Claim Image</label><div class=\"col-sm-10 fileinput fileinput-new\" data-provides=\"fileinput\"><div class=\"fileinput-preview thumbnail\" data-trigger=\"fileinput\"></div><div><span class=\"btn btn-info btn-file\"><span class=\"fileinput-new\">Select image</span> <span class=\"fileinput-exists\">Change</span> <input type=\"file\" name=\"...\" select-ng-files ng-model=\"modalInstanceCtrl.image\" accept=\"image/*\"> </span><a href=\"#\" class=\"btn btn-danger fileinput-exists\" data-dismiss=\"fileinput\">Remove</a></div></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Name</label><div class=\"col-sm-10\"><div class=\"fg-line\"><input type=\"text\" class=\"form-control input-sm\" placeholder=\"Name\" data-ng-model=\"modalInstanceCtrl.name\"></div></div><br></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Description</label><div class=\"col-sm-10\"><div class=\"fg-line\"><textarea data-ng-model=\"modalInstanceCtrl.description\" class=\"form-control\" rows=\"5\" placeholder=\"Summary...\"></textarea></div></div><br></div></div><div class=\"modal-footer\"><button class=\"btn btn-link\" ng-click=\"modalInstanceCtrl.ok()\">OK</button> <button class=\"btn btn-link\" ng-click=\"modalInstanceCtrl.cancel()\">Cancel</button></div>"
  );


  $templateCache.put('template/footer.html',
    "Rinkeby Contract: {{mactrl.contractAddress}}<ul class=\"f-menu\"><li><a href=\"\">Rinkeby</a></li></ul>"
  );


  $templateCache.put('template/header.html',
    "<ul class=\"header-inner clearfix\"><li class=\"logo\"><a>PoE</a></li><li class=\"pull-right\"><ul class=\"top-menu\"><li data-ng-if=\"mactrl.loading\"><div class=\"preloader\"><svg class=\"pl-circular\" viewBox=\"25 25 50 50\"><circle class=\"plc-path\" cx=\"50\" cy=\"50\" r=\"20\"/></svg></div></li><li id=\"top-search\"><a href=\"\" data-ng-click=\"profileCtrl.openSearch()\"><i class=\"tm-icon zmdi zmdi-search\"></i></a></li><li><a href=\"\"><i class=\"tm-icon zmdi zmdi-refresh-sync\" data-ng-click=\"profileCtrl.refresh()\"></i></a></li></ul></li></ul><!-- Top Search Content --><div id=\"top-search-wrap\"><div class=\"tsw-inner\"><i id=\"top-search-close\" class=\"zmdi zmdi-close\" data-ng-click=\"profileCtrl.closeSearch()\"></i> <input type=\"text\" ng-model=\"profileCtrl.searchValue\" ng-change=\"profileCtrl.search(profileCtrl.searchValue)\"></div></div>"
  );


  $templateCache.put('template/header_trimmed.html',
    "<ul class=\"header-inner clearfix\"><li class=\"logo\"><a>PoE</a></li><li class=\"pull-right\"><ul class=\"top-menu\"><li data-ng-if=\"mactrl.loading\"><div class=\"preloader\"><svg class=\"pl-circular\" viewBox=\"25 25 50 50\"><circle class=\"plc-path\" cx=\"50\" cy=\"50\" r=\"20\"/></svg></div></li><li><a data-ng-click=\"accessCtrl.login()\"><i class=\"tm-icon zmdi zmdi-account-o\"></i></a></li></ul></li></ul>"
  );


  $templateCache.put('template/profile-menu.html',
    "<li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"profile.profile-about\">About</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"profile.profile-claims\">Claims</a></li><li class=\"btn-wave\" data-ui-sref-active=\"active\"><a data-ui-sref=\"profile.profile-all-claims\">All Claims</a></li>"
  );


  $templateCache.put('views/__profile-about.html',
    "<div class=\"pmb-block\"><div class=\"pmbb-header\"><h2><i class=\"zmdi zmdi-person m-r-5\"></i> Basic Information</h2><ul class=\"actions\" data-ng-if=\"profileCtrl.editInfo === 0\"><li class=\"dropdown\" uib-dropdown><a href=\"\" uib-dropdown-toggle><i class=\"zmdi zmdi-more-vert\"></i></a><ul class=\"dropdown-menu dropdown-menu-right\"><li><!-- <a data-ng-click=\"profileCtrl.editInfo = 1\" href=\"\">Edit</a> --></li></ul></li></ul></div><div class=\"pmbb-body p-l-30\"><div class=\"pmbb-view\" data-ng-if=\"profileCtrl.editInfo === 0\"><dl class=\"dl-horizontal\"><dt>Name</dt><dd>{{profileCtrl.me.name}}</dd></dl><dl class=\"dl-horizontal\"><dt>Twitter</dt><dd>{{profileCtrl.me.twitter}}</dd></dl><dl class=\"dl-horizontal\"><dt>Mastodon</dt><dd>{{profileCtrl.me.mastodon}}</dd></dl><dl class=\"dl-horizontal\"><dt>Ipfs Link</dt><dd><a href=\"https://ipfs.infura.io/ipfs/{{profileCtrl.me.bioIpfs}}\">{{mactrl.shortenIpfs(profileCtrl.me.bioIpfs)}}</a></dd></dl><div class=\"dl-horizontal\"><dt>Summary</dt><dd>{{ profileCtrl.profileSummary }}<br></dd></div></div><form data-ng-submit=\"profileCtrl.submit('profileInfo', 'Profile Information')\" class=\"pmbb-edit\" data-ng-if=\"profileCtrl.editInfo === 1\"><dl class=\"dl-horizontal\"><dt class=\"p-t-10\">Name</dt><dd><div class=\"fg-line\"><input data-ng-model=\"profileCtrl.fullName\" type=\"text\" class=\"form-control\" value=\"{{ profileCtrl.fullName }}\" placeholder=\"eg. Mallinda Hollaway\"></div></dd></dl><dl class=\"dl-horizontal\"><dt class=\"p-t-10\">Twitter</dt><dd><div class=\"fg-line\"><input data-ng-model=\"profileCtrl.fullName\" type=\"text\" class=\"form-control\" value=\"{{ profileCtrl.fullName }}\" placeholder=\"eg. Mallinda Hollaway\"></div></dd></dl><dl class=\"dl-horizontal\"><dt class=\"p-t-10\">Mastodon</dt><dd><div class=\"fg-line\"><input data-ng-model=\"profileCtrl.fullName\" type=\"text\" class=\"form-control\" value=\"{{ profileCtrl.fullName }}\" placeholder=\"eg. Mallinda Hollaway\"></div></dd></dl><dl class=\"dl-horizontal\"><dt class=\"p-t-10\">Image</dt><dd><div class=\"form-group\"><div class=\"col-sm-10 fileinput fileinput-new\" data-provides=\"fileinput\"><div class=\"fileinput-preview thumbnail\" data-trigger=\"fileinput\"></div><div><span class=\"btn btn-info btn-file\"><span class=\"fileinput-new\">Select image</span> <span class=\"fileinput-exists\">Change</span> <input type=\"file\" name=\"...\" select-ng-files ng-model=\"accessCtrl.image\" accept=\"image/*\"> </span><a href=\"#\" class=\"btn btn-danger fileinput-exists\" data-dismiss=\"fileinput\">Remove</a></div></div></div></dd></dl><dl class=\"dl-horizontal\"><dt class=\"p-t-10\">Mastodon</dt><dd><div class=\"fg-line\"><textarea data-ng-model=\"pctrl.profileSummary\" class=\"form-control\" rows=\"5\" placeholder=\"Summary...\">Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.</textarea></div></dd></dl><div class=\"m-t-30\"><button class=\"btn btn-primary btn-sm\" type=\"submit\">Save</button> <button class=\"btn btn-link btn-sm\" data-ng-click=\"pctrl.editInfo = 0\">Cancel</button></div></form></div></div>"
  );


  $templateCache.put('views/__profile-all-claims.html',
    "<div class=\"timeline\"><div class=\"t-view\" data-tv-type=\"image\" data-ng-repeat=\"claim in profileCtrl.allClaims  | filter: profileCtrl.allClaimFilter\"><div class=\"tv-header media\"><div class=\"media-body p-t-5\"><strong class=\"d-block\">{{claim.name}}</strong> <small class=\"c-gray\">included in block {{claim.block}}</small></div></div><div class=\"tv-body\"><div class=\"lightbox m-b-20\"><div data-src=\"img/claims/error.png\"><div class=\"lightbox-item pull-left\"><img ng-src=\"{{claim.pic}}\" alt=\"\"></div></div></div><div class=\"pmbb-view\"><dl class=\"dl-horizontal\"><dt>Owner Name</dt><dd>{{claim.ownerName}}</dd></dl><dl class=\"dl-horizontal\"><dt>Owner Address</dt><dd>{{claim.owner}}</dd></dl><dl class=\"dl-horizontal\"><dt>Owner Ipfs</dt><dd><a href=\"https://ipfs.infura.io/ipfs/{{claim.ownerIpfs}}\">{{mactrl.shortenIpfs(claim.ownerIpfs)}}</a></dd></dl><dl class=\"dl-horizontal\"><dt>Claim Ipfs</dt><dd><a href=\"https://ipfs.infura.io/ipfs/{{claim.ipfs}}\">{{mactrl.shortenIpfs(claim.ipfs)}}</a></dd></dl><div class=\"dl-horizontal\"><dt>Description</dt><dd>{{claim.description}}<br></dd></div></div><div class=\"clearfix\"></div><ul class=\"tvb-stats\"><li class=\"tvbs-likes\"><i class=\"zmdi zmdi-thumb-up\"></i> {{claim.up}} <span class=\"hidden-xs\">Endorsed</span></li></ul><ul class=\"tvb-stats\"><li class=\"tvbs-views\"><i class=\"zmdi zmdi-thumb-down\"></i> {{claim.down}} <span class=\"hidden-xs\">Endorsed</span></li></ul></div></div></div>"
  );


  $templateCache.put('views/__profile-claims.html',
    "<div class=\"timeline\"><button class=\"btn btn-float btn-danger m-btn\" data-ng-click=\"profileCtrl.addClaim()\"><i class=\"zmdi zmdi-plus\"></i></button><div class=\"t-view\" data-tv-type=\"image\" data-ng-repeat=\"claim in profileCtrl.myClaims | filter: profileCtrl.myClaimFilter\"><div class=\"tv-header media\"><div class=\"media-body p-t-5\"><strong class=\"d-block\">{{claim.name}}</strong> <small class=\"c-gray\">included in block {{claim.block}}</small></div></div><div class=\"tv-body\"><div class=\"lightbox m-b-20\"><div data-src=\"img/claims/error.png\"><div class=\"lightbox-item pull-left\"><img ng-src=\"{{claim.pic}}\" alt=\"\"></div></div></div><div class=\"pmbb-view\"><dl class=\"dl-horizontal\"><dt>IPFS</dt><dd><a href=\"https://ipfs.infura.io/ipfs/{{claim.ipfs}}\">{{mactrl.shortenIpfs(claim.ipfs)}}</a></dd></dl><div class=\"dl-horizontal\"><dt>Description</dt><dd>{{claim.description}}<br></dd></div></div><div class=\"clearfix\"></div><ul class=\"tvb-stats\"><li class=\"tvbs-likes\"><i class=\"zmdi zmdi-thumb-up\"></i> {{claim.up}} <span class=\"hidden-xs\">Endorsed</span></li></ul><ul class=\"tvb-stats\"><li class=\"tvbs-views\"><i class=\"zmdi zmdi-thumb-down\"></i> {{claim.down}} <span class=\"hidden-xs\">Endorsed</span></li></ul></div></div></div>"
  );


  $templateCache.put('views/__profile.html',
    "<header id=\"header\" data-current-skin=\"{{mactrl.currentSkin}}\" data-ng-include src=\"'template/header.html'\"></header><section id=\"main\"><section id=\"content\" class=\"page-view\"><div class=\"container\"><div class=\"card\" id=\"profile-main\"><div class=\"pm-overview\"><div class=\"pmo-pic\"><div class=\"p-relative\"><a href=\"\"><img class=\"img-responsive\" data-ng-src=\"{{profileCtrl.me.pic}}\" alt=\"\"></a></div><div class=\"pmo-stat\"><h2 class=\"m-0 c-white\">{{profileCtrl.myClaims.length}}</h2>Total Claims</div></div></div><div class=\"pm-body clearfix\"><ul class=\"tab-nav tn-justified\" data-ng-include=\"'template/profile-menu.html'\"></ul><data ui-view></data></div></div></div></section></section><footer id=\"footer\" data-ng-include src=\"'template/footer.html'\"></footer>"
  );


  $templateCache.put('views/__signup.html',
    "<header id=\"header\" data-current-skin=\"{{mactrl.currentSkin}}\" data-ng-include src=\"'template/header_trimmed.html'\"></header><section id=\"main\"><section id=\"content\" class=\"page-view\"><div class=\"container\"><div class=\"card\"><form class=\"form-horizontal\" role=\"form\"><div class=\"card-header\"><h2>Signup <small>To use Proof-O-Existence first signup. Create an IPFS profile, then click signup!<br><strong>ipfs profile:</strong> https://ipfs.infura.io/ipfs/{{accessCtrl.ipfs}}<br><strong>transaction hash:</strong> https://rinkeby.etherscan.io/{{accessCtrl.hash}}</small></h2></div><div class=\"card-body card-padding\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Address</label><div class=\"col-sm-10\"><div class=\"fg-line\"><input type=\"text\" disabled data-ng-model=\"accessCtrl.coinbase\" class=\"form-control input-sm\" placeholder=\"coinbase\"></div></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Name</label><div class=\"col-sm-10\"><div class=\"fg-line\"><input type=\"text\" class=\"form-control input-sm\" placeholder=\"Name\" data-ng-model=\"accessCtrl.name\"></div></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Twitter Handle</label><div class=\"col-sm-10\"><div class=\"fg-line\"><input type=\"text\" class=\"form-control input-sm\" placeholder=\"@me\" data-ng-model=\"accessCtrl.twitter\"></div></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Mastodon Handle</label><div class=\"col-sm-10\"><div class=\"fg-line\"><input type=\"text\" class=\"form-control input-sm\" placeholder=\"@me\" data-ng-model=\"accessCtrl.mastodon\"></div></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\">Profile Pic</label><div class=\"col-sm-10 fileinput fileinput-new\" data-provides=\"fileinput\"><div class=\"fileinput-preview thumbnail\" data-trigger=\"fileinput\"></div><div><span class=\"btn btn-info btn-file\"><span class=\"fileinput-new\">Select image</span> <span class=\"fileinput-exists\">Change</span> <input type=\"file\" name=\"...\" select-ng-files ng-model=\"accessCtrl.image\" accept=\"image/*\"> </span><a href=\"#\" class=\"btn btn-danger fileinput-exists\" data-dismiss=\"fileinput\">Remove</a></div></div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><button type=\"submit\" ng-hide=\"accessCtrl.busy\" class=\"btn btn-primary btn-m\" data-ng-click=\"accessCtrl.signup()\">Signup</button> <button type=\"submit\" ng-show=\"accessCtrl.busy\" class=\"btn btn-primary btn-m\">Busy</button></div></div></div></form></div></div></section></section><footer id=\"footer\" data-ng-include src=\"'template/footer.html'\"></footer>"
  );


  $templateCache.put('views/__web3js.html',
    "<section id=\"main\"><section id=\"content\" class=\"page-view\"><div class=\"container\"><div class=\"card\"><form class=\"form-horizontal\" role=\"form\"><div class=\"card-header\"><h2>Web3 Missing <small>Seems you don't have Web3 available on your browser! Either use the coinbase mobile wallet and DApp browser or install Metamask on your browser.</small></h2></div><div class=\"card-body card-padding\"><p>Seems you don't have Web3 available on your browser! Either use the coinbase mobile wallet and DApp browser or install Metamask on your browser.</p><img src=\"img/metamask-logo.png\"></div></form></div></div></section></section>"
  );

}]);
