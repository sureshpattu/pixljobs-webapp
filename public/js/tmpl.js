Handlebars.registerPartial("page_loader",Handlebars.template({1:function(container,depth0,helpers,partials,data){var stack1,helper;return"            "+(null!=(helper=null!=(helper=helpers.html||(null!=depth0?depth0.html:depth0))?helper:helpers.helperMissing,stack1="function"==typeof helper?helper.call(null!=depth0?depth0:container.nullContext||{},{name:"html",hash:{},data:data}):helper)?stack1:"")+"\n"},3:function(container,depth0,helpers,partials,data){var helper;return'            <div class="loader_table">\n                <div class="loader_table_cell">\n                    <img src="/img/loading.svg" class="loader_img">\n                </div>\n            </div>\n            <h2 class="hd_title">'+container.escapeExpression((helper=null!=(helper=helpers.text||(null!=depth0?depth0.text:depth0))?helper:helpers.helperMissing,"function"==typeof helper?helper.call(null!=depth0?depth0:container.nullContext||{},{name:"text",hash:{},data:data}):helper))+"</h2>\n"},compiler:[7,">= 4.0.0"],main:function(container,depth0,helpers,partials,data){var stack1;return'<div class="cd-popup is-visible page_loader_popup" role="alert" id="windowLoaderPopup">\n    <div class="cd-popup-container">\n'+(null!=(stack1=helpers.if.call(null!=depth0?depth0:container.nullContext||{},null!=depth0?depth0.html:depth0,{name:"if",hash:{},fn:container.program(1,data,0),inverse:container.program(3,data,0),data:data}))?stack1:"")+"    </div>\n</div>"},useData:!0})),Handlebars.registerPartial("popup",Handlebars.template({compiler:[7,">= 4.0.0"],main:function(container,depth0,helpers,partials,data){var stack1,helper,alias1=null!=depth0?depth0:container.nullContext||{},alias2=helpers.helperMissing;return'<div class="cd-popup is-visible '+container.escapeExpression((helper=null!=(helper=helpers.theme||(null!=depth0?depth0.theme:depth0))?helper:alias2,"function"==typeof helper?helper.call(alias1,{name:"theme",hash:{},data:data}):helper))+'" role="alert" id="windowPopup">\n    <div class="cd-popup-container">\n        '+(null!=(helper=null!=(helper=helpers.html||(null!=depth0?depth0.html:depth0))?helper:alias2,stack1="function"==typeof helper?helper.call(alias1,{name:"html",hash:{},data:data}):helper)?stack1:"")+'\n        <a href="#0" class="cd-popup-close">\n            &times;\n        </a>\n    </div>\n</div>'},useData:!0}));