Handlebars.registerPartial("applicant_card_row", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"panel main_card_sec js_main_card_sec\" data-qa_job_id=\""
    + alias4(((helper = (helper = helpers.qa_job_id || (depth0 != null ? depth0.qa_job_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"qa_job_id","hash":{},"data":data}) : helper)))
    + "\" data-job_id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"panel-heading\">\n            <div class=\"row\">\n                <div class=\"col-md-8\">\n                    <a data-toggle=\"collapse\" class=\"panel-title collapsed js_panel_title\"\n                       data-parent=\"#accordion\"\n                       href=\"#collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                        <div class=\"title_sec\">\n                            <span class=\"highlights\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                            <span class=\"small_txt\">5+ years</span>\n                            <img src=\"/img/icons/arrow-down-small.svg\" alt=\"\" class=\"icon_arrow_down\">\n                        </div>\n                        <div class=\"sub_title_sec\">\n                            <span class=\"small_txt js_total_application_txt\">\n                                "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.job_applications : depth0)) != null ? stack1.length : stack1), depth0))
    + "\n                                applications</span>\n                            <span class=\"small_txt\">0 new</span>\n                            <span class=\"small_txt\">0 shortlisted</span>\n                        </div>\n                    </a>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"cat_wrap\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.action : depth0),"===","open",{"name":"ifCond","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "                        <div class=\"dropdown\">\n                            <button class=\"btn  dropdown-toggle c_cta_btn more_btn_link js_more_btn_link\"\n                                    type=\"button\" data-toggle=\"dropdown\">\n                                <span>MORE</span>\n                                <img src=\"/img/icons/arrow-down-orange.svg\" alt=\"\" class=\"icon_arrow_down\">\n                            </button>\n                            <ul class=\"dropdown-menu\">\n                                <li><a class=\"js_close_job_btn "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.action : depth0),"===","closed",{"name":"ifCond","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">CLOSE</a></li>\n                                <li><a class=\"js_reopen_job_btn "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.action : depth0),"===","open",{"name":"ifCond","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">REOPEN</a></li>\n\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"panel-collapse collapse\">\n            <div class=\"panel-body\">\n                <div class=\"swiper-container js_applicant_card_swiper_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                    <div class=\"swiper-wrapper\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.job_applications : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                    <div class=\"swiper-button-next js_applicant_card_swiper_next_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\"></div>\n                    <div class=\"swiper-button-prev js_applicant_card_swiper_prev_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                            <a class=\"c_cta_btn open_btn_link open js_open_close_status\">\n                                <span>OPEN</span>\n                            </a>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                            <a class=\"c_cta_btn open_btn_link js_open_close_status\">\n                                <span>CLOSED</span>\n                            </a>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "hide";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "                            <div class=\"swiper-slide\">\n                                <div class=\"card_sec js_match_height\">\n                                    <a class=\"c_user_wrap\" href=\"/applicant/"
    + alias4(((helper = (helper = helpers.applicant_id || (depth0 != null ? depth0.applicant_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"applicant_id","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                                        <div class=\"u_img_wrap\">\n                                            <img src=\"/img/user_icon.svg\" class=\"img_sec\">\n                                        </div>\n                                        <div class=\"u_name\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div>\n                                        <div class=\"designation\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.designation : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                                        </div>\n                                        <div class=\"ex_cta_wrap\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.exp_year : stack1),"!==","0",{"name":"ifCond","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "                                        </div>\n                                    </a>\n                                    <div class=\"basic_cont_sec\">\n                                        <div class=\"row\">\n                                            <div class=\"col-md-6\">\n                                                <div class=\"label_txt\">Current Salary</div>\n                                                <div class=\"label_val\">INR "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.current_salary : stack1), depth0))
    + " / yr</div>\n                                            </div>\n                                            <div class=\"col-md-6\">\n                                                <div class=\"label_txt\">Expected Salary</div>\n                                                <div class=\"label_val\">INR "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.expected_salary : stack1), depth0))
    + " / yr</div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"basic_cont_sec\">\n                                        <div class=\"label_txt\">Phone</div>\n                                        <div class=\"label_val\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.mobile : stack1), depth0))
    + "</div>\n                                        <div class=\"label_txt no_pad\">Email</div>\n                                        <div class=\"label_val\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.email : stack1), depth0))
    + "</div>\n                                    </div>\n                                    <div class=\"resume_cta_wrap\">\n                                        <a class=\"cta_link\" href=\"/api/applicant/resume/"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.resume : stack1), depth0))
    + "\"\n                                           target=\"_blank\">VIEW RESUME</a>\n                                    </div>\n                                </div>\n                            </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                                                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.designation : stack1), depth0))
    + " at "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.company : stack1), depth0))
    + "\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                                                <span class=\"cta_link\">\n                                                    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.exp_year : stack1), depth0))
    + "."
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.exp_month : stack1), depth0))
    + " years\n                                                </span>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.exp_month : stack1),"!==","0",{"name":"ifCond","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                                                    <span class=\"cta_link\">\n                                                        "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.exp_year : stack1), depth0))
    + "."
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.applicant : depth0)) != null ? stack1.exp_month : stack1), depth0))
    + " years\n                                                    </span>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "                                                    <span class=\"cta_link fresher\">Fresher</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true}));

Handlebars.registerPartial("company_form_two", Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    <div class=\"panel main_card_sec js_main_card_sec\">\n        <div class=\"panel-heading\">\n            <div class=\"row\">\n                <div class=\"col-md-10\">\n                    <a data-toggle=\"collapse\" class=\"panel-title collapsed company_sec js_panel_title\"\n                       data-parent=\"#accordion\"\n                       href=\"#collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                        <div class=\"title_sec\">\n                            <span class=\"highlights\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                            <img src=\"/img/icons/arrow-down-small.svg\" alt=\"\" class=\"icon_arrow_down\">\n                        </div>\n                        <div class=\"sub_title_sec\">\n                            <span class=\"small_txt\">"
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + "</span>\n                        </div>\n                    </a>\n                </div>\n                <div class=\"col-md-2\">\n                    <div class=\"check_box_wrap\">\n                        <label class=\"check_box\">\n                            <input type=\"checkbox\"\n                                   class=\"js_company_checkbox\"\n                                   data-id=\""
    + alias4(alias5((depth0 != null ? depth0.id : depth0), depth0))
    + "\"\n                                   data-recruiter-id=\""
    + alias4(alias5((depth0 != null ? depth0.recruiter_id : depth0), depth0))
    + "\"\n                                   "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depths[1] != null ? depths[1].default_company_id : depths[1]),"===",(depth0 != null ? depth0.id : depth0),{"name":"ifCond","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                            <span class=\"checkmark\"></span>\n                        </label>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"panel-collapse collapse\">\n            <div class=\"panel-body company_sec\">\n                <form class=\"form_sec jsCompanyForm\" id=\"jsCompanyForm_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-company-id=\""
    + alias4(alias5((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n                    <div class=\"form-group pixl_form_group\">\n                        <label class=\"control-label\">URL to your offer</label>\n                        <div class=\"box_sec\">\n                            <input type=\"text\" class=\"form-control required js_company_url\" placeholder=\"Paste here\"\n                                   value=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n                        </div>\n                    </div>\n                    <div class=\"form-group pixl_form_group\">\n                        <label class=\"control-label\">Company Name</label>\n                        <div class=\"box_sec\">\n                            <input type=\"text\" class=\"form-control required js_company_name\" placeholder=\"Type here\"\n                                   value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n                        </div>\n                    </div>\n                    <div class=\"form-group pixl_form_group\">\n                        <label class=\"control-label\">Company Logo</label>\n                        <div class=\"box_sec upload_sec "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.logo : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                            <div class=\"file_txt_wrap\">\n                                <img src=\"/img/icons/upload-doc.svg\" alt=\"\" class=\"icon_sec\">\n                                <span>Drag & drop image or </span>\n                                <a class=\"upload_txt\">Upload file</a>\n                            </div>\n                            <div class=\"file_preview_txt_wrap\">\n                                <img src=\"/api/companies/photo/"
    + alias4(((helper = (helper = helpers.logo || (depth0 != null ? depth0.logo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"logo","hash":{},"data":data}) : helper)))
    + "\" class=\"icon_sec js_company_logo_preview\">\n                                <div class=\"file_name\">"
    + ((stack1 = (helpers.truncateTextSpace || (depth0 && depth0.truncateTextSpace) || alias2).call(alias1,(depth0 != null ? depth0.name : depth0),10,{"name":"truncateTextSpace","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                                    ."
    + ((stack1 = (helpers.getFileExtension || (depth0 && depth0.getFileExtension) || alias2).call(alias1,(depth0 != null ? depth0.logo : depth0),{"name":"getFileExtension","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n                            </div>\n                            <input type=\"file\" class=\"input_file js_input_c_logo_file\" accept=\"image/*\">\n                            <input type=\"hidden\" class=\"js_existing_logo\" value=\""
    + alias4(((helper = (helper = helpers.logo || (depth0 != null ? depth0.logo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"logo","hash":{},"data":data}) : helper)))
    + "\">\n                            <span class=\"fa fa-times close_icon js_remove_file\"></span>\n                        </div>\n                    </div>\n                    <div class=\"form-group pixl_form_group\">\n                        <label class=\"control-label\">Industry <span\n                                class=\"fade_txt\">(Optional)</span></label>\n                        <div class=\"box_sec\">\n                            <select class=\"form-control required js_industry js_select2\">\n                                <option value=\"\">Select a domain</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depths[1] != null ? depths[1].industries : depths[1]),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                            </select>\n                        </div>\n                    </div>\n                    <div class=\"form-group pixl_form_group\">\n                        <label class=\"control-label\">Company Size <span\n                                class=\"fade_txt\">(No. of employees)</span></label>\n                        <div class=\"box_sec\">\n                            <select class=\"form-control required js_company_size js_select2\">\n                                <option value=\"select\">Select Range</option>\n                                <option value=\"1-10\" "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.size : depth0),"===","1-10",{"name":"ifCond","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">1-10</option>\n                                <option value=\"11-20\" "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.size : depth0),"===","11-20",{"name":"ifCond","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">11-20\n                                </option>\n                                <option value=\"30-50\" "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.size : depth0),"===","30-50",{"name":"ifCond","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">30-50\n                                </option>\n                                <option value=\"50+\" "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.size : depth0),"===","50+",{"name":"ifCond","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">50+</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"form-group pixl_form_group\">\n                        <label class=\"control-label\">About company <span\n                                class=\"fade_txt\">(Optional)</span></label>\n                        <div class=\"box_sec\">\n                            <input type=\"text\" class=\"form-control js_about_company\" placeholder=\"Type here\"\n                                   value=\""
    + alias4(alias5((depth0 != null ? depth0.about : depth0), depth0))
    + "\">\n                        </div>\n                    </div>\n                    <div class=\"form-group pixl_form_group\">\n                        <label class=\"control-label\">Benefits</label>\n                        <div class=\"box_sec\">\n                            <select multiple=\"multiple\"\n                                    class=\"form-control required js_company_benefit\">\n"
    + ((stack1 = helpers.each.call(alias1,(depths[1] != null ? depths[1].benefits : depths[1]),{"name":"each","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                            </select>\n                            <!--<div class=\"icon_wrap\">-->\n                            <!--<img src=\"/img/icons/plus-green.svg\" alt=\"\" class=\"icon_sec\">-->\n                            <!--</div>-->\n                        </div>\n                    </div>\n                    <div class=\"form-group pixl_form_group\">\n                        <label class=\"control-label\">Email for candidates</label>\n                        <div class=\"box_sec\">\n                            <input type=\"email\" class=\"form-control required js_email\" value=\""
    + alias4(alias5((depth0 != null ? depth0.email : depth0), depth0))
    + "\"\n                                   placeholder=\"careers@pixlcoders.com\">\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group pixl_form_group\">\n                                <label class=\"control-label\">Mobile</label>\n                                <div class=\"row\">\n                                    <div class=\"col-md-4\">\n                                        <div class=\"box_sec\">\n                                            <select class=\"form-control required js_select2 js_com_mobile_code\">\n                                                <option value=\"\">Select</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depths[1] != null ? depths[1].country_code : depths[1]),{"name":"each","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                                            </select>\n                                        </div>\n                                    </div>\n                                    <div class=\"col-md-8\">\n                                        <div class=\"box_sec\">\n                                            <input type=\"text\" class=\"form-control required js_com_mobile\"\n                                                   value=\""
    + alias4(((helper = (helper = helpers.mobile_number || (depth0 != null ? depth0.mobile_number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mobile_number","hash":{},"data":data}) : helper)))
    + "\"\n                                                   autocomplete=\"nope\" placeholder=\"Your 10 digit mobile No.\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <div class=\"form-group pixl_form_group\">\n                                <label class=\"control-label\">Land Line</label>\n                                <div class=\"row\">\n                                    <div class=\"col-md-4\">\n                                        <div class=\"box_sec\">\n                                            <input type=\"text\" class=\"form-control required js_com_phone_code\"\n                                                   value=\""
    + alias4(((helper = (helper = helpers.phone_code || (depth0 != null ? depth0.phone_code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phone_code","hash":{},"data":data}) : helper)))
    + "\" style=\"padding: 0 15px;\"\n                                                   autocomplete=\"nope\" placeholder=\"Code\">\n                                        </div>\n                                    </div>\n                                    <div class=\"col-md-8\">\n                                        <div class=\"box_sec\">\n                                            <input type=\"text\" class=\"form-control required js_com_phone_number\"\n                                                   value=\""
    + alias4(((helper = (helper = helpers.phone_number || (depth0 != null ? depth0.phone_number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phone_number","hash":{},"data":data}) : helper)))
    + "\"\n                                                   autocomplete=\"nope\" placeholder=\"Land Line Number\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-md-4\">\n                            <div class=\"form-group pixl_form_group\">\n                                <label class=\"control-label\">Street</label>\n                                <div class=\"box_sec\">\n                                    <input type=\"text\" class=\"form-control required js_street\"\n                                           autocomplete=\"nope\"\n                                           value=\""
    + alias4(alias5((depth0 != null ? depth0.street : depth0), depth0))
    + "\"\n                                           placeholder=\"Enter street\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <div class=\"form-group pixl_form_group\">\n                                <label class=\"control-label\">Area</label>\n                                <div class=\"box_sec\">\n                                    <input type=\"text\" class=\"form-control required js_area\"\n                                           autocomplete=\"nope\"\n                                           value=\""
    + alias4(alias5((depth0 != null ? depth0.area : depth0), depth0))
    + "\"\n                                           placeholder=\"Enter area\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <div class=\"form-group pixl_form_group\">\n                                <label class=\"control-label\">City</label>\n                                <div class=\"box_sec\">\n                                    <input type=\"text\" class=\"form-control required js_city\"\n                                           autocomplete=\"nope\"\n                                           value=\""
    + alias4(alias5((depth0 != null ? depth0.city : depth0), depth0))
    + "\"\n                                           placeholder=\"Enter city\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <div class=\"form-group pixl_form_group\">\n                                <label class=\"control-label\">State</label>\n                                <div class=\"box_sec\">\n                                    <input type=\"text\" class=\"form-control required js_state\"\n                                           autocomplete=\"nope\"\n                                           value=\""
    + alias4(alias5((depth0 != null ? depth0.state : depth0), depth0))
    + "\"\n                                           placeholder=\"Enter state\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <div class=\"form-group pixl_form_group\">\n                                <label class=\"control-label\">Country</label>\n                                <div class=\"box_sec\">\n                                    <input type=\"text\" class=\"form-control required js_country\"\n                                           autocomplete=\"nope\"\n                                           value=\""
    + alias4(alias5((depth0 != null ? depth0.country : depth0), depth0))
    + "\"\n                                           placeholder=\"Enter country\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <div class=\"form-group pixl_form_group\">\n                                <label class=\"control-label\">Pin Code</label>\n                                <div class=\"box_sec\">\n                                    <input type=\"text\" class=\"form-control required js_pin\"\n                                           autocomplete=\"nope\"\n                                           value=\""
    + alias4(alias5((depth0 != null ? depth0.pin : depth0), depth0))
    + "\"\n                                           placeholder=\"Enter pin\">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"cta_wrap\">\n                        <button class=\"btn btn_big btn_preview\">ClOSE</button>\n                        <button class=\"btn btn_big btn_blue\" type=\"submit\">\n                            SAVE\n                            <img src=\"/img/icons/tick.svg\" alt=\"\" class=\"tick_icon\">\n                        </button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "checked";
},"4":function(container,depth0,helpers,partials,data) {
    return "preview";
},"6":function(container,depth0,helpers,partials,data) {
    return "";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? depths[1].industry : depths[1])) != null ? stack1.id : stack1),"===",(depth0 != null ? depth0.id : depth0),{"name":"ifCond","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.program(11, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" selected>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "selected";
},"15":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.checkArrayOfObjectVal || (depth0 && depth0.checkArrayOfObjectVal) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.id : depth0),(depths[1] != null ? depths[1].company_benefits : depths[1]),{"name":"checkArrayOfObjectVal","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.program(18, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                                        <option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" selected>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                                        <option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"20":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                                                    <option value=\""
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "\"\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depths[1] != null ? depths[1].mobile_code : depths[1]),"===",(depth0 != null ? depth0.code : depth0),{"name":"ifCond","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                                                        "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "\n                                                    </option>\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "                                                            selected\n                                                        ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true}));

Handlebars.registerPartial("company_form", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "preview";
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? depths[1].data : depths[1])) != null ? stack1.industry_id : stack1),"===",(depth0 != null ? depth0.id : depth0),{"name":"ifCond","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.program(8, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" selected>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "selected";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <option value=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<form class=\"form_sec\" id=\"jsJobCompanyForm\">\n    <div class=\"form-group pixl_form_group\">\n        <label class=\"control-label\">URL to your offer</label>\n        <div class=\"box_sec\">\n            <input type=\"text\" class=\"form-control required js_company_url\" placeholder=\"Paste here\" value=\"\">\n        </div>\n    </div>\n    <div class=\"form-group pixl_form_group\">\n        <label class=\"control-label\">Company Name</label>\n        <div class=\"box_sec\">\n            <input type=\"text\" class=\"form-control required js_company_name\" placeholder=\"Type here\" value=\"\">\n        </div>\n    </div>\n    <div class=\"form-group pixl_form_group\">\n        <label class=\"control-label\">Company Logo</label>\n        <div class=\"box_sec upload_sec "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.logo : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <div class=\"file_txt_wrap\">\n                <img src=\"/img/icons/upload-doc.svg\" alt=\"\" class=\"icon_sec\">\n                <span>Drag & drop image or </span>\n                <a class=\"upload_txt\">Upload file</a>\n            </div>\n            <div class=\"file_preview_txt_wrap\">\n                <img src=\"/api/companies/photo/"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.logo : stack1), depth0))
    + "\" class=\"icon_sec js_company_logo_preview\">\n                <div class=\"file_name\">"
    + ((stack1 = (helpers.truncateTextSpace || (depth0 && depth0.truncateTextSpace) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.name : stack1),10,{"name":"truncateTextSpace","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "."
    + ((stack1 = (helpers.getFileExtension || (depth0 && depth0.getFileExtension) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.logo : stack1),{"name":"getFileExtension","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n            </div>\n            <input type=\"file\" class=\"input_file js_input_c_logo_file\" accept=\"image/*\">\n            <span class=\"fa fa-times close_icon js_remove_file\"></span>\n        </div>\n    </div>\n    <div class=\"form-group pixl_form_group\">\n        <label class=\"control-label\">Industry <span\n                class=\"fade_txt\">(Optional)</span></label>\n        <div class=\"box_sec\">\n            <select class=\"form-control required js_industry js_select2\">\n                <option value=\"\">Select a domain</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.industries : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\n        </div>\n    </div>\n    <div class=\"form-group pixl_form_group\">\n        <label class=\"control-label\">Company Size <span\n                class=\"fade_txt\">(No. of employees)</span></label>\n        <div class=\"box_sec\">\n            <select class=\"form-control required js_company_size js_select2\">\n                <option value=\"select\">Select Range</option>\n                <option value=\"1-10\" "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.size : stack1),"===","1-10",{"name":"ifCond","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">1-10</option>\n                <option value=\"11-20\" "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.size : stack1),"===","11-20",{"name":"ifCond","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">11-20</option>\n                <option value=\"30-50\" "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.size : stack1),"===","30-50",{"name":"ifCond","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">30-50</option>\n                <option value=\"50+\" "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.size : stack1),"===","50+",{"name":"ifCond","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">50+</option>\n            </select>\n        </div>\n    </div>\n    <div class=\"form-group pixl_form_group\">\n        <label class=\"control-label\">About company <span\n                class=\"fade_txt\">(Optional)</span></label>\n        <div class=\"box_sec\">\n            <input type=\"text\" class=\"form-control js_about_company\" placeholder=\"Type here\" value=\"\">\n        </div>\n    </div>\n    <div class=\"form-group pixl_form_group\">\n        <label class=\"control-label\">Benefits</label>\n        <div class=\"box_sec\">\n            <select multiple=\"multiple\"\n                    class=\"form-control required js_company_benefit\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.benefits : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </select>\n        </div>\n    </div>\n    <div class=\"form-group pixl_form_group\">\n        <label class=\"control-label\">Email for candidates</label>\n        <div class=\"box_sec\">\n            <input type=\"email\" class=\"form-control required js_candidate_email\"\n                   placeholder=\" careers@pixlcoders.com\">\n        </div>\n    </div>\n    <div class=\"form-group pixl_form_group\">\n        <label class=\"control-label\">Company Address</label>\n        <div class=\"box_sec\">\n            <input type=\"text\" class=\"form-control required\" id=\"glAdAddress\"\n                   autocomplete=\"nope\" placeholder=\"Enter address\">\n        </div>\n    </div>\n    <input type=\"hidden\" class=\"js_street\">\n    <input type=\"hidden\" class=\"js_area_in\">\n    <input type=\"hidden\" class=\"js_area\">\n    <input type=\"hidden\" class=\"js_locality\">\n    <input type=\"hidden\" class=\"js_city\">\n    <input type=\"hidden\" class=\"js_state\">\n    <input type=\"hidden\" class=\"js_country\">\n    <input type=\"hidden\" class=\"js_postal_code\">\n    <input type=\"hidden\" class=\"js_place_id\">\n    <input type=\"hidden\" class=\"js_full_address\">\n</form>";
},"useData":true,"useDepths":true}));

Handlebars.registerPartial("doc_upload", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "preview";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "href=\"/api/applicant/resume/"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.resume : stack1), depth0))
    + "\" target=\"_blank\"";
},"5":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"box_sec upload_sec "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.resume : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <div class=\"file_txt_wrap\">\n        <img src=\"/img/icons/upload-doc.svg\" alt=\"\" class=\"icon_sec\">\n        <span>Drag & drop file or </span>\n        <a class=\"upload_txt\">Upload file</a>\n    </div>\n    <div class=\"file_preview_txt_wrap\">\n        <a "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.resume : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n            <img src=\"/img/icons/doc_file.svg\" class=\"icon_sec\">\n        </a>\n        <div class=\"file_name\">"
    + ((stack1 = (helpers.truncateTextSpace || (depth0 && depth0.truncateTextSpace) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.name : stack1),10,{"name":"truncateTextSpace","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "."
    + ((stack1 = (helpers.getFileExtension || (depth0 && depth0.getFileExtension) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.resume : stack1),{"name":"getFileExtension","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n    </div>\n    <input type=\"file\" class=\"input_file js_input_resume_file\"\n           accept=\".doc, .docx,.pdf\">\n    <input type=\"hidden\" class=\"js_existing_resume_file\" value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.resume : stack1), depth0))
    + "\">\n    <span class=\"fa fa-times close_icon js_remove_file\"></span>\n</div>";
},"useData":true}));

Handlebars.registerPartial("job_application", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    <div class=\"panel card_sec js_card_sec\">\n        <div class=\"panel-heading\">\n            <div class=\"row\">\n                <div class=\"col-md-9\">\n                    <a data-toggle=\"collapse\" class=\"panel-title collapsed js_panel_title\"\n                       data-parent=\"#accordion\"\n                       href=\"#collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                        <span class=\"highlights\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.job : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span>\n                        <span class=\"small_txt\">– "
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.job : depth0)) != null ? stack1.company : stack1)) != null ? stack1.name : stack1), depth0))
    + "</span>\n                        <img src=\"/img/icons/arrow-right.svg\" class=\"arrow_icon\">\n                    </a>\n                </div>\n                <div class=\"col-md-3\">\n                    <a class=\"close_btn_link js_close_btn_link hide\">\n                        <img src=\"/img/icons/close.svg\" class=\"close_icon\">\n                        <span>CLOSE JOB</span>\n                    </a>\n                </div>\n            </div>\n        </div>\n        <div id=\"collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"panel-collapse collapse\">\n            <div class=\"panel-body\">\n                <div class=\"card_status_two_wrap "
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "\">\n                    <div class=\"viewed_sec card_cell\">\n                        <div class=\"c_cont_sec\">\n                            <!--                                                <span class=\"fa fa-check-circle\"></span>-->\n                            <div class=\"c_circle\">\n                                <img src=\"/img/icons/tick.svg\" alt=\"\" class=\"icon_tick\">\n                            </div>\n                            <span class=\"c_name\">Viewed</span>\n                            <span class=\"time_date_txt\">1day ago</span>\n                        </div>\n                    </div>\n                    <div class=\"downloaded_sec card_cell\">\n                        <div class=\"c_cont_sec\">\n                            <!--                                                <span class=\"fa fa-check-circle\"></span>-->\n                            <div class=\"c_circle\">\n                                <img src=\"/img/icons/tick.svg\" alt=\"\" class=\"icon_tick\">\n                            </div>\n                            <span class=\"c_name\">Downloaded</span>\n                            <span class=\"time_date_txt\">2hrs ago</span>\n                        </div>\n                    </div>\n                    <div class=\"shortlisted_sec card_cell\">\n                        <div class=\"c_cont_sec\">\n                            <!--                                                <span class=\"fa fa-check-circle\"></span>-->\n                            <div class=\"c_circle\">\n                                <img src=\"/img/icons/tick.svg\" alt=\"\" class=\"icon_tick\">\n                            </div>\n                            <span class=\"c_name\">Shortlisted</span>\n                            <span class=\"time_date_txt\">0hrs ago</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <h4 class=\"text-center text-capitalize\">NO DATA FOUND!</h4>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true}));

Handlebars.registerPartial("job_card_row", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    <div class=\"panel main_card_sec js_main_card_sec\" data-job-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-recruiter-id=\""
    + alias4(((helper = (helper = helpers.recruiter_id || (depth0 != null ? depth0.recruiter_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recruiter_id","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"panel-heading\">\n            <div class=\"row\">\n                <div class=\"col-md-8\">\n                    <a data-toggle=\"collapse\" class=\"panel-title collapsed js_panel_title\"\n                       data-parent=\"#accordion\"\n                       href=\"#collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                        <div class=\"title_sec\">\n                            <span class=\"highlights\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                            <span class=\"small_txt\">5+ years</span>\n                            <img src=\"/img/icons/arrow-down-small.svg\" alt=\"\" class=\"icon_arrow_down\">\n                        </div>\n                        <div class=\"sub_title_sec\">\n                            <span class=\"small_txt\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.name : stack1), depth0))
    + ", "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.city : stack1), depth0))
    + ",</span>\n                        </div>\n                    </a>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"cta_wrap\">\n                        <a href=\"/post-job-edit/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn_blue js_unpublish_job\"\n                           data-type=\"pending\">Edit</a>\n                        <input type=\"hidden\" class=\"js_qa_job_title\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n                        <input type=\"hidden\" class=\"js_qa_job_id\" value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div id=\"collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"panel-collapse collapse\">\n            <div class=\"panel-body\">\n                <div class=\"job_card\">\n                    <div class=\"job_sec\">\n                        <div class=\"job_tags\">\n                            <div class=\"row\">\n                                <div class=\"col-md-9 col-xs-12\">\n                                    <div class=\"tags_wrap spl_wrap\">\n                                        <div class=\"tags\">\n                                            <img src=\"/img/icons/dollar.svg\" class=\"dollar_icons\">\n                                            "
    + ((stack1 = (helpers.formatCurrency || (depth0 && depth0.formatCurrency) || alias2).call(alias1,(depth0 != null ? depth0.salary_min : depth0),{"name":"formatCurrency","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " - "
    + ((stack1 = (helpers.formatCurrency || (depth0 && depth0.formatCurrency) || alias2).call(alias1,(depth0 != null ? depth0.salary_max : depth0),{"name":"formatCurrency","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                                        </div>\n                                        <div class=\"tags\">\n                                            <img src=\"/img/icons/calendar.svg\" class=\"cal_icons\">\n                                            "
    + ((stack1 = (helpers.countDateTime || (depth0 && depth0.countDateTime) || alias2).call(alias1,(depth0 != null ? depth0.created_at : depth0),{"name":"countDateTime","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                                        </div>\n                                        <div class=\"tags \">\n                                            <img src=\"/img/icons/location.svg\" class=\"loc_icons\">\n                                            "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.city : stack1), depth0))
    + "\n                                        </div>\n                                        <div class=\"tags\">\n                                            <img src=\"/img/icons/place.svg\" class=\"place_icons\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.location_type : depth0),"===","office",{"name":"ifCond","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-3 col-xs-12\">\n                                    <div class=\"tags_wrap\">\n                                        <div class=\" tags btn_wrap\">\n                                            <a href=\"#\" class=\"post_tag\">\n                                                Frontend\n                                            </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"work_sec\">\n                        <div class=\"row row_c\">\n                            <div class=\"col-md-4 col_bordered\">\n                                <div class=\"option\">TYPE:\n                                    <span class=\"option_val\">"
    + alias4(((helper = (helper = helpers.job_type || (depth0 != null ? depth0.job_type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"job_type","hash":{},"data":data}) : helper)))
    + "</span>\n                                </div>\n                            </div>\n                            <div class=\"col-md-4 col_bordered\">\n                                <div class=\"option\">\n                                    WORKWEEK:\n                                    <span class=\"option_val\">"
    + alias4(((helper = (helper = helpers.work_week || (depth0 != null ? depth0.work_week : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"work_week","hash":{},"data":data}) : helper)))
    + " hours</span>\n                                </div>\n                            </div>\n                            <div class=\"col-md-4 col_bordered\">\n                                <div class=\"option\">\n                                    HOLIDAY:\n                                    <span class=\"option_val\">"
    + alias4(((helper = (helper = helpers.holidays || (depth0 != null ? depth0.holidays : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"holidays","hash":{},"data":data}) : helper)))
    + " days</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"job_desc\">\n                        <div class=\"desc_details\">\n                            <div class=\"about_sec\">\n                                <div class=\"desc_title\">\n                                    About the work\n                                </div>\n                                <div class=\"desc\">\n                                    "
    + ((stack1 = ((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n                                </div>\n                            </div>\n                            <div class=\"requirement_sec\">\n                                <div class=\"desc_title\">\n                                    Requirements\n                                </div>\n                                <div class=\"desc\">\n                                    <ul class=\"requirement_list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.qa_job_requirements : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"tech_details\">\n                        <div class=\"tech_sec\">\n                            <div class=\"desc_title\">\n                                Technologies\n                            </div>\n                            <div class=\"desc\">\n                                <div class=\"row\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.qa_job_technologies : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"about_company_card\">\n                    <div class=\"company_desc\">\n                        <div class=\"about_sec\">\n                            <div class=\"desc_title\">\n                                About Company\n                            </div>\n                            <div class=\"desc\">\n                                "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.about : stack1), depth0))
    + "\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"about_work_sec\">\n                        <div class=\"row row_c\">\n                            <div class=\"col-md-6 col_bordered\">\n                                <div class=\"option\">COMPANY SIZE:\n                                    <span class=\"option_val\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.size : stack1), depth0))
    + "</span>\n                                </div>\n                            </div>\n                            <div class=\"col-md-6 col_bordered\">\n                                <div class=\"option\">\n                                    INDUSTRY:\n                                    <span class=\"option_val\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.industry : stack1)) != null ? stack1.name : stack1), depth0))
    + "</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"company_desc\">\n                        <div class=\"about_sec\">\n                            <div class=\"desc_title\">\n                                Benefits\n                            </div>\n                            <div class=\"desc benefits_desc\">\n                                <div class=\"row\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.company_benefits : stack1),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"cta_wrap_big\">\n                    <a href=\"/post-job-edit/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn_blue btn_big js_unpublish_job\" data-type=\"pending\">Edit\n                        Job</a>\n                    <a class=\"btn btn_big js_reject_job\" data-type=\"rejected\">Delete Job</a>\n                </div>\n            </div>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "";
},"4":function(container,depth0,helpers,partials,data) {
    return "                                                On Site\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                                                Remote\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                                            <li class=\"requirement_line\">\n                                                "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.requirement : depth0)) != null ? stack1.desc : stack1), depth0))
    + "\n                                            </li>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "                                        <div class=\"col-md-6\">\n                                            <div class=\"row\">\n                                                <div class=\"col-md-6 col-xs-6\">\n                                                    <div class=\"tech_name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.technology : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div>\n                                                </div>\n                                                <div class=\"col-md-6 col-xs-6\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.level : depth0),"===","Basic",{"name":"ifCond","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.level : depth0),"===","Proficient",{"name":"ifCond","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.level : depth0),"===","Expert",{"name":"ifCond","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                                                </div>\n                                            </div>\n                                        </div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "                                                        <div class=\"filled_bar\"></div>\n                                                        <div class=\"empty_bar\"></div>\n                                                        <div class=\"empty_bar\"></div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "                                                        <div class=\"filled_bar\"></div>\n                                                        <div class=\"filled_bar\"></div>\n                                                        <div class=\"empty_bar\"></div>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "                                                        <div class=\"filled_bar\"></div>\n                                                        <div class=\"filled_bar\"></div>\n                                                        <div class=\"filled_bar\"></div>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                                        <div class=\"col-md-6\">\n                                            <div class=\"circle_wrap\">\n                                                <div class=\"circle_tick\">\n                                                    <img src=\"/img/icons/tick.svg\" class=\"icons tick\">\n                                                </div>\n                                                <div class=\"title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.benefit : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div>\n                                            </div>\n                                        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true}));

Handlebars.registerPartial("job_search_card", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "    <a class=\"card_sec\" href=\"/job-info/"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n        <div class=\"new_sec\">\n            <span class=\"fa fa-certificate\"></span>\n            <span class=\"new_txt\">NEW</span>\n        </div>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.logo : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "        <div class=\"row\">\n            <div class=\"col-md-6\">\n                <div>\n                    <span class=\"title\">"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                </div>\n                <div>\n                    <div class=\"info_sec "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.city : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n                        <i class=\"fa fa-building com_icon\"></i>\n                        <span class=\"sub_title com_name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span>\n                    </div>\n                    <div class=\"info_sec "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.city : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n                        <img src=\"/img/icons/location-dark.svg\" alt=\"\" class=\"icon_marker_sec\">\n                        <span class=\"txt_sec city_txt\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.city : stack1), depth0))
    + "</span>\n                    </div>\n                </div>\n                <div class=\"tags_wrap\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.job_technologies : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.job_technologies : depth0)) != null ? stack1.length : stack1),">",3,{"name":"ifCond","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n            </div>\n            <div class=\"col-md-6\">\n                <div class=\"cta_wrap\">\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.job_categories : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"job_details_wrap\">\n                    <div class=\"info_sec\">\n                        <i class=\"fa fa-inr icon_dollar_sec\" aria-hidden=\"true\"></i>\n                        <span class=\"txt_sec\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.salary_min : depth0),"===","0",{"name":"ifCond","hash":{},"fn":container.program(22, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "")
    + "                        </span>\n                    </div>\n                    <div class=\"info_sec\">\n                        <img src=\"/img/icons/clock.svg\" alt=\"\" class=\"icon_sec\">\n                        <span class=\"txt_sec\">"
    + ((stack1 = (helpers.countDateTime || (depth0 && depth0.countDateTime) || alias4).call(alias3,(depth0 != null ? depth0.created_at : depth0),{"name":"countDateTime","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\n                    </div>\n                </div>\n                <div class=\"job_details_wrap\">\n\n                </div>\n            </div>\n        </div>\n    </a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <img src=\"/api/companies/photo/"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.logo : stack1), depth0))
    + "\" class=\"c_logo\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "            <img src=\"/img/company-temp-logo.png\" class=\"c_logo\">\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "";
},"8":function(container,depth0,helpers,partials,data) {
    return "hide";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"<",3,{"name":"ifCond","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <span>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.technology : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <span class=\"more\"\n                              title=\"\" data-toggle=\"popover\" data-trigger=\"hover\"\n                              data-content=\""
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.job_technologies : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                            + more\n                        </span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),">",2,{"name":"ifCond","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.last),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.technology : depth0)) != null ? stack1.name : stack1), depth0))
    + ".";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.technology : depth0)) != null ? stack1.name : stack1), depth0))
    + ", ";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <div class=\"btn btn_blue\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.job_categories : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.category : stack1)) != null ? stack1.name : stack1), depth0))
    + "</div>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                                "
    + ((stack1 = (helpers.formatCurrency || (depth0 && depth0.formatCurrency) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.salary_max : depth0),{"name":"formatCurrency","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "                                "
    + ((stack1 = (helpers.formatCurrency || (depth0 && depth0.formatCurrency) || alias2).call(alias1,(depth0 != null ? depth0.salary_min : depth0),{"name":"formatCurrency","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " - "
    + ((stack1 = (helpers.formatCurrency || (depth0 && depth0.formatCurrency) || alias2).call(alias1,(depth0 != null ? depth0.salary_max : depth0),{"name":"formatCurrency","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"26":function(container,depth0,helpers,partials,data) {
    return "    <h4 class=\"text-center text-capitalize\">NO DATA FOUND!</h4>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(26, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true}));

Handlebars.registerPartial("language_row", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "                            selected\n                        ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<div class=\"row js_language_row\">\n    <div class=\"col-md-6\">\n        <div class=\"form-group pixl_form_group\">\n            <label class=\"control-label\">Language</label>\n            <div class=\"box_sec\">\n                <div class=\"gl_search_box\">\n                    <input type=\"text\" class=\"form-control search_input search_enabled js_search_language\"\n                           placeholder=\"Search Language\"\n                           value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.language : depth0)) != null ? stack1.name : stack1), depth0))
    + "\"\n                           data-tid=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.language : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\n                           autocomplete=\"off\">\n                    <span class=\"fa fa-search icon_sec search_enabled\"></span>\n                    <div class=\"gl_search_dropdown_list js_language_search_dropdown_list search_enabled hide\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-4\">\n        <div class=\"form-group pixl_form_group\">\n            <label class=\"control-label\">Skill Level</label>\n            <div class=\"box_sec\">\n                <select class=\"form-control js_language_level\"\n                        required>\n                    <option value=\"Basic\"\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.level : depth0),"===","Basic",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                        Basic\n                    </option>\n                    <option value=\"Proficient\"\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.level : depth0),"===","Proficient",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                        Proficient\n                    </option>\n                    <option value=\"Expert\"\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.level : depth0),"===","Expert",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                        Expert\n                    </option>\n                </select>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-2\">\n        <a class=\"btn btn_red remove_btn js_remove_language\">Remove</a>\n    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("language_search_list", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <li>\n            <a data-tid=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"js_language_search_item\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n        </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"search_enabled\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true}));

Handlebars.registerPartial("notification_card_row", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"panel main_card_sec js_main_card_sec\">\n        <div class=\"panel-heading\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <div class=\"notification_wrap\">\n                        <label class=\"check_box notifications check_notifications\">\n                            <input type=\"checkbox\" class=\"js_check_notification "
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n                            <span class=\"checkmark\"></span>\n                        </label>\n                        <a data-toggle=\"collapse\" class=\"panel-title collapsed js_panel_title "
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "\"\n                           data-notification_id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n                           data-parent=\"#accordion\"\n                           href=\"#collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n                            <div class=\"title_sec\">\n                                <span class=\"highlights\">"
    + ((stack1 = (helpers.truncateMsgTitle || (depth0 && depth0.truncateMsgTitle) || alias2).call(alias1,(depth0 != null ? depth0.subject : depth0),20,{"name":"truncateMsgTitle","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\n\n                                <img src=\"/img/icons/arrow-down-small.svg\" alt=\"\" class=\"icon_arrow_down\">\n                                <span class=\"small_txt\"> "
    + ((stack1 = (helpers.truncateText || (depth0 && depth0.truncateText) || alias2).call(alias1,(depth0 != null ? depth0.msg : depth0),20,{"name":"truncateText","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\n                            </div>\n                        </a>\n\n                    </div>\n\n\n                </div>\n            </div>\n        </div>\n        <div id=\"collapse_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"panel-collapse collapse\">\n            <div class=\"panel-body\">\n                <span class=\"small_txt desc_txt\">"
    + alias4(((helper = (helper = helpers.msg || (depth0 != null ? depth0.msg : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"msg","hash":{},"data":data}) : helper)))
    + "</span>\n\n                <div class=\"admin_txt\">\n                    <div class=\"from_txt sender_detail_txt\">From ,</div>\n                    <div class=\" sender_detail_txt\">PixlJobs - Team.</div>\n                </div>\n\n            </div>\n        </div>\n    </div>\n\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "";
},"4":function(container,depth0,helpers,partials,data) {
    return " ";
},"6":function(container,depth0,helpers,partials,data) {
    return "    <h4 class=\"text-center text-capitalize\">NO DATA FOUND!</h4>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true}));

Handlebars.registerPartial("page_loader", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "            "
    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"loader_table\">\n                <div class=\"loader_table_cell\">\n                    <img src=\"/img/loading.svg\" class=\"loader_img\">\n                </div>\n            </div>\n            <h2 class=\"hd_title\">"
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"text","hash":{},"data":data}) : helper)))
    + "</h2>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"cd-popup is-visible page_loader_popup\" role=\"alert\" id=\"windowLoaderPopup\">\n    <div class=\"cd-popup-container\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.html : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("popup", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"cd-popup is-visible "
    + container.escapeExpression(((helper = (helper = helpers.theme || (depth0 != null ? depth0.theme : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"theme","hash":{},"data":data}) : helper)))
    + "\" role=\"alert\" id=\"windowPopup\">\n    <div class=\"cd-popup-container\">\n        "
    + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        <a href=\"#0\" class=\"cd-popup-close\">\n            &times;\n        </a>\n    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("technology_row", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "                            selected\n                        ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<div class=\"row js_technology_row\">\n    <div class=\"col-md-6\">\n        <div class=\"form-group pixl_form_group\">\n            <label class=\"control-label\">Technology</label>\n            <div class=\"box_sec\">\n                <div class=\"gl_search_box\">\n                    <input type=\"text\" class=\"form-control search_input search_enabled js_search_tech\"\n                           placeholder=\"Search Technology\"\n                           value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.technology : depth0)) != null ? stack1.name : stack1), depth0))
    + "\"\n                           data-tid=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.technology : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"\n                           autocomplete=\"off\">\n                    <span class=\"fa fa-search icon_sec search_enabled\"></span>\n                    <div class=\"gl_search_dropdown_list js_tech_search_dropdown_list search_enabled hide\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-4\">\n        <div class=\"form-group pixl_form_group\">\n            <label class=\"control-label\">Skill Level</label>\n            <div class=\"box_sec\">\n                <select class=\"form-control js_tech_level\"\n                        required>\n                    <option value=\"Basic\"\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.level : depth0),"===","Basic",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                        Basic\n                    </option>\n                    <option value=\"Proficient\"\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.level : depth0),"===","Proficient",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                        Proficient\n                    </option>\n                    <option value=\"Expert\"\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.level : depth0),"===","Expert",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                        Expert\n                    </option>\n                </select>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-md-2\">\n        <a class=\"btn btn_red remove_btn js_remove_technology\">Remove</a>\n    </div>\n</div>";
},"useData":true}));

Handlebars.registerPartial("technology_search_list", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <li>\n            <a data-tid=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"js_tech_search_item\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n        </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"search_enabled\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true}));