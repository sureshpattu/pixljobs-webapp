!function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){return o(e[i][1][r]||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){window.PopupPage=require("./utils/popupHandler"),window.LoginHandler=require("./views/login_handler"),window.RecruiterHandler=require("./views/recruiter_handler"),window.ApplicantSignUpHandler=require("./views/applicant_handler"),window.RecruiterProfileHandler=require("./views/recruiter_profile_handler")},{"./utils/popupHandler":5,"./views/applicant_handler":6,"./views/login_handler":7,"./views/recruiter_handler":8,"./views/recruiter_profile_handler":9}],2:[function(require,module,exports){var qs=require("querystring");module.exports={makeAjaxRequest:function(url,query,method,dataType,data,callback){if(!url)return!1;url=qs.stringify(query)?url+"?"+qs.stringify(query):url;var reqObj={url:url,method:method,dataType:dataType,data:data,success:function(res){callback(res.responseText?JSON.parse(res.responseText):res)},error:function(err){callback(err.responseText?JSON.parse(err.responseText):err)}};$.ajax(reqObj)},makeFileUploadRequest:function(url,query,method,dataType,data,callback){if(!url)return!1;url=qs.stringify(query)?url+"?"+qs.stringify(query):url,$.ajax({url:url,method:"POST",data:data,contentType:!1,processData:!1,success:function(res){callback(res.responseText?JSON.parse(res.responseText):res)},error:function(err){callback(err.responseText?JSON.parse(err.responseText):err)}})}}},{querystring:12}],3:[function(require,module,exports){exports.clearForm=function(formId){$(formId).find("input").val(" "),$(formId).find("select").val(" "),$(formId).find("textarea").val(" "),$(formId).find('input[type="checkbox"]').removeAttr("checked"),$(formId).find('input[type="radio"]').removeAttr("checked")},exports.getParameterByName=function(name,url){url||(url=window.location.href),name=name.replace(/[\[\]]/g,"\\$&");var regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),results=regex.exec(url);return results?results[2]?decodeURIComponent(results[2].replace(/\+/g," ")):"":null},exports.showVideo=function(video_id,page_name,class_name){var _popup_html=Handlebars.partials[page_name]();PopupPage.init(_popup_html,"",!1,""),$(".cd-popup-container").addClass(class_name)},exports.showLoader=function(text,options,_html){var Html=Handlebars.partials.page_loader({html:_html,text:text});$("body").append(Html).addClass("popup-visible")},exports.hideLoader=function(){$("#windowLoaderPopup").remove(),$("body").removeClass("popup-visible")},exports.initProfileImageCropper=function(formId,_previewEle,imageId,_cb){function readURL(input,preview_ele){if(input.files&&input.files[0]){var reader=new FileReader;reader.onload=function(e){$(preview_ele).attr("src",e.target.result),cropper&&cropper.destroy(),cropper=new Cropper(image,{autoCropArea:.5,aspectRatio:1,ready:function(){cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData)}})},reader.readAsDataURL(input.files[0])}}var cropBoxData,canvasData,cropper,image=document.getElementById(imageId),inputElement=$(formId).find(".js_file_input"),submitElement=$(formId).find(".js_submit_img"),closeBtnElement=$(formId).find(".js_img_popup_close"),previewEle=$(_previewEle).find(".js_upload_icon_cont"),previewBackEle=$(_previewEle).find(".js_img_pre_holder");$(_previewEle).find(".js_input_profile_photo");inputElement.change(function(){this.files[0].size<5580960?readURL(this,$(this).data("preview")):alert("file must be select less than 5 MB")}),submitElement.off("click").on("click",function(){previewEle.addClass("hide"),closeBtnElement.trigger("click"),previewBackEle.attr("src",cropper.getCroppedCanvas().toDataURL("image/png")),previewBackEle.removeClass("hide"),_cb&&_cb()})}},{}],4:[function(require,module,exports){module.exports={validateForm:function(formId){function markError(element,errorMsgId){var className="."+errorMsgId;return $(formId).find(className).show(),element.addClass("error-field"),status=!1,!1}function unMarkError(element,errorMsgId){var className="."+errorMsgId;$(formId).find(className).hide(),element.removeClass("error-field")}function validateFieldType(fieldType,element,elementVal,errorMsgId){return"function"==typeof _this[fieldType]&&(_this[fieldType](elementVal,element)?unMarkError(element,errorMsgId):markError(element,errorMsgId))}var _this=this,status=!0;return $(formId+" .required").each(function(){var element=$(this),elementVal=$(this).val(),errorMsgId=element.attr("data-errormsg"),validateList=element.attr("data-groupname"),isElementsNeedValidation=!1;if(""===elementVal&&!validateList)return void markError(element,errorMsgId);$.each(_this.getAllFieldsToValidate(),function(index,value){element.hasClass(value)&&(isElementsNeedValidation=!0,validateFieldType(value,element,elementVal,errorMsgId))}),isElementsNeedValidation||unMarkError(element,errorMsgId)}),status},getAllFieldsToValidate:function(){return["isValidEmail","isValidMobileNumber","isNumber","isLengthOk","numberInRange","isValidResetPassword","isEqualTo","isCardNo","validateList"]},isNumber:function(input){return!isNaN(input)},numberInRange:function(input,element){var inputInt=Number(input),min=$(element).data("min"),max=$(element).data("max");return!!this.isNumber(input)&&(inputInt>=min&&inputInt<=max)},isLengthOk:function(input,element){var minLength=element.data("minlength"),maxLength=element.prop("maxlength");return input.length>=minLength&&input.length<=maxLength},isValidEmail:function(email){return/^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/.test(email)},isValidUserName:function(userName){return userName=userName.trim(),userName.length>=4},isValidAmount:function(amount){return/^[1-9]\d+$/.test(amount)},isValidMobileNumber:function(mobileNumber){var mobileNumberTrimmed=mobileNumber.trim(),specialCharRegex=/^[\w{.\/\\(),'}:?®©-]+$/,isValidNumber=mobileNumberTrimmed>0,hasSpecialChars=specialCharRegex.test(mobileNumberTrimmed),isSatisfyLenth=mobileNumberTrimmed.length>=10;return isValidNumber&&hasSpecialChars&&isSatisfyLenth},isEqualTo:function(password,element){var equalField=element.data("equalto");return $(equalField).val()===password},isCardNo:function(input,element){var inputEdited=input.replace(/ /g,""),minLength=element.data("minlength"),maxLength=element.prop("maxlength");return inputEdited.length>=minLength&&inputEdited.length<=maxLength},validateList:function(input,element){var groupName=element.data("groupname"),status=!1;return $('[name="'+groupName+'"]').each(function(){if($(this).is(":checked"))return void(status=!0)}),status}}},{}],5:[function(require,module,exports){module.exports=function(){function bindClickEvents(_allow_close){$(".cd-popup-trigger").off("click").on("click",function(event){event.preventDefault(),$("body").addClass("popup-visible"),$(".cd-popup").addClass("is-visible")}),_allow_close||($(".cd-popup").off("click").on("click",function(event){($(event.target).is(".cd-popup-close")||$(event.target).is(".cd-popup-close-icon")||$(event.target).is(".cd-popup")&&!$(".email_sign_up_pop_up").is(":visible"))&&(event.preventDefault(),$("body").removeClass("popup-visible").css("overflow-y","inherit"),$(this).removeClass("is-visible"),$("#windowPopup").remove())}),$(document).keyup(function(event){"27"!==event.which||$(".email_sign_up_pop_up").is(":visible")||($("body").removeClass("popup-visible").css("overflow-y","inherit"),$(".cd-popup").removeClass("is-visible"),$("#windowPopup").remove())}))}return{init:function(html,cb,_allow_close,theme){$("#windowPopup").remove();var tmpl=Handlebars.partials.popup;$("body").append(tmpl({html:html,dont_allow_close:_allow_close,theme:theme})).css("overflow-y","hidden"),bindClickEvents(_allow_close),cb&&cb()},close:function(){$("body").removeClass("popup-visible").css("overflow-y","inherit"),$(".cd-popup").removeClass("is-visible"),$("#windowPopup").remove()}}}()},{}],6:[function(require,module,exports){var ApiUtil=require("../utils/apiUtil"),FormValidator=require("../utils/formValidator");require("../utils/common");module.exports=function(){function readURL(input){if(input.files&&input.files[0]){var reader=new FileReader;reader.onload=function(e){$(".js_img_pre_holder").attr("src",e.target.result),$(".js_img_pre_holder").removeClass("hide")},reader.readAsDataURL(input.files[0])}}function uploadImage(_ele,_cb){var formData=new FormData;formData.append("photo",_ele[0].files[0]),ApiUtil.makeFileUploadRequest("/api/applicant/photo/upload","","POST","",formData,function(_res_path){_cb(_res_path)})}function bindApplicantSignUpEvent(){var _form_name="#jsSignUpApplicantForm",_form=$(_form_name);_form.unbind().submit(function(e){if(e.preventDefault(),console.log(_form_name),FormValidator.validateForm(_form_name)){var obj={name:_form.find(".js_name").val(),qualification:_form.find(".js_qualification").val(),institution:_form.find(".js_institution").val(),designation:_form.find(".js_designation").val(),company:_form.find(".js_company").val(),current_salary:_form.find(".js_cur_salary").val(),expected_salary:_form.find(".js_anual_salary").val(),mobile:_form.find(".js_mobile").val()||"0",email:_form.find(".js_email").val(),password:_form.find(".js_password").val(),gender:_form.find(".js_gender").val(),exp_month:_form.find(".js_exp_month").val(),exp_year:_form.find(".js_exp_year").val(),resume:_form.find(".js_input_file").val()};uploadImage(_form.find(".js_input_profile_file"),function(_res_path){!_res_path.error&&_res_path.data&&(obj.photo=_res_path.data.file,obj.photo_type=_res_path.data.file_type),ApiUtil.makeAjaxRequest("/api/applicant-auth/register","","POST","",obj,function(_res){_res.error?alert(_res.message||"Something went wrong!"):window.location.href="/applicant-account"})})}})}function bindApplicantEditEvent(){var _form_name="#jsSignUpApplicantForm",_form=$(_form_name);console.log(_form),_form.unbind().submit(function(e){if(e.preventDefault(),console.log(_form_name),FormValidator.validateForm(_form_name)){var obj={name:_form.find(".js_name").val(),qualification:_form.find(".js_qualification").val(),institution:_form.find(".js_institution").val(),designation:_form.find(".js_designation").val(),company:_form.find(".js_company").val(),current_salary:_form.find(".js_cur_salary").val(),expected_salary:_form.find(".js_anual_salary").val(),mobile:_form.find(".js_mobile").val()||"0",email:_form.find(".js_email").val(),password:_form.find(".js_password").val(),gender:_form.find(".js_gender").val(),exp_month:_form.find(".js_exp_month").val(),exp_year:_form.find(".js_exp_year").val()},callback=function(_res){_res.error?alert(_res.message||"Something went wrong!"):window.location.href="/applicant-account"};ApiUtil.makeAjaxRequest("/api/applicant","","PUT","",obj,callback)}})}function bindCommonClickEvents(){$(".js_select2").select2({}),$("#selectExpMonth").change(function(){$(this).val()>0?($("#freshDetails").addClass("hide"),$("#expDetails").removeClass("hide")):($("#freshDetails").removeClass("hide"),$("#expDetails").addClass("hide"))}),$("#selectExpYear").change(function(){$(this).val().valueOf()>0?($("#freshDetails").addClass("hide"),$("#expDetails").removeClass("hide")):($("#freshDetails").removeClass("hide"),$("#expDetails").addClass("hide"))}),$(".js_input_profile_file").change(function(){readURL(this)})}return{init:function(){bindCommonClickEvents(),bindApplicantSignUpEvent()},initEdit:function(){bindApplicantEditEvent()}}}()},{"../utils/apiUtil":2,"../utils/common":3,"../utils/formValidator":4}],7:[function(require,module,exports){var ApiUtil=require("../utils/apiUtil"),FormValidator=require("../utils/formValidator");module.exports=function(){function bindApplicantLoginEvent(){var _form=$("#jsApplicantLoginForm");_form.submit(function(e){if(e.preventDefault(),FormValidator.validateForm("#jsApplicantLoginForm")){var _obj={email:_form.find(".js_email").val(),password:_form.find(".js_password").val()};ApiUtil.makeAjaxRequest("/api/applicant-auth/login","","POST","",_obj,function(_res){_res.error?alert(_res.message||"Something went wrong!"):window.location.href="/"})}return!1})}function bindRecruiterLoginEvent(){var _form=$("#jsRecruiterLoginForm");_form.submit(function(e){if(e.preventDefault(),FormValidator.validateForm("#jsRecruiterLoginForm")){var _obj={email:_form.find(".js_email").val(),password:_form.find(".js_password").val()};ApiUtil.makeAjaxRequest("/api/recruiter-auth/login","","POST","",_obj,function(_res){_res.error?alert(_res.message||"Something went wrong!"):window.location.href="/"})}return!1})}function bindForgotPasswordFormEvent(){var isApplicant=!0,_form=$("#forgotPasswordForm");_form.submit(function(e){if(e.preventDefault(),FormValidator.validateForm("#forgotPasswordForm")){var _obj={email:_form.find(".js_email").val()},_api_url="/api/applicant-auth/forgot/password";isApplicant||(_api_url="/api/recruiter-auth/forgot/password"),ApiUtil.makeAjaxRequest(_api_url,"","POST","",_obj,function(_res){_res.error?alert(_res.message||"Something went wrong!"):alert(_res.message)})}return!1});var _applicant_tab=$(".js_applicant_tab"),_recruiter_tab=$(".js_recruiter_tab");_applicant_tab.on("click",function(){_applicant_tab.addClass("active"),_recruiter_tab.removeClass("active"),isApplicant=!0}),_recruiter_tab.on("click",function(){_applicant_tab.removeClass("active"),_recruiter_tab.addClass("active"),isApplicant=!1})}function bindCommonClickEvents(){var _recruiterLoginForm=$("#jsRecruiterLoginForm"),_applicantLoginForm=$("#jsApplicantLoginForm"),_applicant_tab=$(".js_applicant_tab"),_recruiter_tab=$(".js_recruiter_tab");_applicant_tab.on("click",function(){_applicantLoginForm.removeClass("hide"),_recruiterLoginForm.addClass("hide"),_applicant_tab.addClass("active"),_recruiter_tab.removeClass("active")}),_recruiter_tab.on("click",function(){_applicantLoginForm.addClass("hide"),_recruiterLoginForm.removeClass("hide"),_applicant_tab.removeClass("active"),_recruiter_tab.addClass("active")})}return{init:function(){bindCommonClickEvents(),bindApplicantLoginEvent(),bindRecruiterLoginEvent()},initForgotPassword:function(){bindForgotPasswordFormEvent()}}}()},{"../utils/apiUtil":2,"../utils/formValidator":4}],8:[function(require,module,exports){var ApiUtil=require("../utils/apiUtil"),FormValidator=require("../utils/formValidator"),utils=require("../utils/common");module.exports=function(){function bindRecruiterEvent(){$(".js_select2").select2({});var _form=$("#jsSignUpRecruitForm");_form.unbind().submit(function(e){if(e.preventDefault(),FormValidator.validateForm("#jsSignUpRecruitForm")){var obj={name:_form.find(".js_name").val(),email:_form.find(".js_email").val(),password:_form.find(".js_password").val(),gender:_form.find(".js_gender").val(),designation:_form.find(".js_designation").val(),company:_form.find(".js_company_name").val()||"0",industry:_form.find(".js_industry").val(),company_size:_form.find(".js_company_size").val(),company_url:_form.find(".js_company_url").val(),about_company:_form.find(".js_about_company").val(),company_benefit:_form.find(".js_company_benefit").val()};console.log(obj);var callback=function(_res){_res.error?alert(_res.message||"Something went wrong!"):window.location.href="/recruiter"};ApiUtil.makeAjaxRequest("/api/recruiter-auth/register","","POST","",obj,callback)}})}return{init:function(){bindRecruiterEvent()},initView:function(_land_ids){_lang_ids_arr=_land_ids,utils.initProfileImageCropper("#profileImageCropperModal",".js_profile_img_wrap","userPicPreviewImage",function(){$(".js_prof_pic_load_img").removeClass("hide"),ApiUtil.makeAjaxRequest("/api/avatar/upload","","POST","",{src:$(".js_img_pre_holder").attr("src")},function(_res){$(".js_prof_pic_load_img").addClass("hide")})})}}}()},{"../utils/apiUtil":2,"../utils/common":3,"../utils/formValidator":4}],9:[function(require,module,exports){var ApiUtil=require("../utils/apiUtil"),FormValidator=require("../utils/formValidator"),utils=require("../utils/common");module.exports=function(){function bindRecruiterProfileEvent(){$(".js_select2").select2({});var _form=$("#jsSignUpRecruitForm");_form.unbind().submit(function(e){e.preventDefault();var _id=_form.find(".js_data_id").val();if(FormValidator.validateForm("#jsSignUpRecruitForm")){var obj={name:_form.find(".js_name").val(),email:_form.find(".js_email").val(),password:_form.find(".js_password").val(),gender:_form.find(".js_gender").val(),designation:_form.find(".js_designation").val(),company:_form.find(".js_company_name").val()||"0",industry:_form.find(".js_industry").val(),company_size:_form.find(".js_company_size").val(),company_url:_form.find(".js_company_url").val(),about_company:_form.find(".js_about_company").val(),company_benefit:_form.find(".js_company_benefit").val()};console.log(obj);var callback=function(_res){_res.error?alert(_res.message||"Something went wrong!"):window.location.href="/recruiter"};ApiUtil.makeAjaxRequest("/api/recruiter/"+_id,"","PUT","",obj,callback)}})}return{init:function(){bindRecruiterProfileEvent()},initView:function(_land_ids){_lang_ids_arr=_land_ids,utils.initProfileImageCropper("#profileImageCropperModal",".js_profile_img_wrap","userPicPreviewImage",function(){$(".js_prof_pic_load_img").removeClass("hide"),ApiUtil.makeAjaxRequest("/api/avatar/upload","","POST","",{src:$(".js_img_pre_holder").attr("src")},function(_res){$(".js_prof_pic_load_img").addClass("hide")})})}}}()},{"../utils/apiUtil":2,"../utils/common":3,"../utils/formValidator":4}],10:[function(require,module,exports){"use strict";function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;i<len;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)}},{}],11:[function(require,module,exports){"use strict";function map(xs,f){if(xs.map)return xs.map(f);for(var res=[],i=0;i<xs.length;i++)res.push(f(xs[i],i));return res}var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj?map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return isArray(obj[k])?map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)},objectKeys=Object.keys||function(obj){var res=[];for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&res.push(key);return res}},{}],12:[function(require,module,exports){"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode")},{"./decode":10,"./encode":11}]},{},[1]);