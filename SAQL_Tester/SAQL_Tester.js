javascript:(function(){
/* Salesforce Analytics Cloud SAQL Tester v0.2 */
/* https://github.com/Cervello/Shared/blob/master/SAQL_Tester */

if (window.location.toString().indexOf("salesforce.com"+(window.location.port ? ":"+window.location.port : "")+"/analytics")==-1){alert("You must be inside Salesforce Analytics Cloud to use this bookmarklet.");return;}

var STMyJS = document.getElementById("STMyJS");
var STMyDiv = document.getElementById("STMyDiv");

if (STMyDiv != null) {
if (STMyDiv.style.display=="none"){STMyDiv.style.display="";} else {STMyDiv.style.display="none";}
} else {

STMyJS = document.createElement("script");
STMyJS.id="STMyJS";
STMyJS.type = "text/javascript";
STMyJS.innerHTML=' \
function STCleanUp() { \
document.getElementById("STMyDiv").style.display="none"; \
} \
function STBuildQuery() { \
  return JSON.stringify({"action":"query","query":document.getElementById("STMyInput").value.replace(/\\\\\\"/g,"\\"")}); \
} \
function STSendQuery() { \
  var STDataString = STBuildQuery(); \
  $.ajax({ \
    url: \'/insights/internal_api/v1.0/remote\', \
    type: \'POST\', \
    data: STDataString, \
    dataType: \'json\', \
    success: function(resp) { \
      var STMyRecords = JSON.parse(resp.result[0]).results.records; \
      var STMyCols = Object.keys(STMyRecords[0]); \
      var STMyNumCols = STMyCols.length; \
      var STMyNumRows = STMyRecords.length; \
      var STMyHTML = ""; \
      STMyHTML+=\'<table style="margin:5px;border-collapse:separate">\'; \
      /* Header row */ \
      STMyHTML+=\'<tr>\'; \
      for (i=0;i<STMyNumCols;i++) {STMyHTML+=\'<th style="border:1px solid;">\'+Object.keys(STMyRecords[0])[i]+\'</th>\';} \
      STMyHTML+=\'</tr>\'; \
      /* Data rows */ \
      for (j=0;j<STMyNumRows;j++) { \
      STMyHTML+=\'<tr>\'; \
      for (i=0;i<STMyNumCols;i++) {STMyHTML+=\'<td style="border:1px solid;">\'+STMyRecords[j][STMyCols[i]]+\'</td>\';} \
      STMyHTML+=\'</tr>\'; \
      } \
      STMyHTML+=\'</table>\'; \
      document.getElementById("STMyOutput").innerHTML=STMyHTML;  }, \
    error: function(resp) { document.getElementById("STMyOutput").innerHTML=\'<div style="margin:5px;"><span style="color:red;">ERROR:</span> \'+JSON.parse(resp.responseText).errorMsg+\'</div>\'; }, \
    beforeSend: STSetHeader \
  }); \
} \
function STSetHeader(xhr) { \
  xhr.setRequestHeader(\'Host\',window.location.hostname+(window.location.port ? \':\'+window.location.port: \'\')); \
  xhr.setRequestHeader(\'Accept\',\'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\'); \
  xhr.setRequestHeader(\'Accept-Language\',\'en-US,en;q=0.5\'); \
  xhr.setRequestHeader(\'Authorization\',\'OAuth \'+STGetCookie("sid")); \
  xhr.setRequestHeader(\'Referer\',window.location.protocol+\'//\'+window.location.hostname+(window.location.port ? \':\'+window.location.port: \'\')+\'/analytics/wave/wave.apexp\'); \
  xhr.setRequestHeader(\'Content-Length\',STBuildQuery().length); \
  xhr.setRequestHeader(\'Content-Type\',\'text/plain; charset=UTF-8\'); \
  xhr.setRequestHeader(\'Connection\',\'keep-alive\'); \
  xhr.setRequestHeader(\'Pragma\',\'no-cache\'); \
  xhr.setRequestHeader(\'Cache-Control\',\'no-cache\'); \
} \
function STGetCookie(cname) { \
  var name = cname + "="; \
  var ca = document.cookie.split(\';\'); \
  for(var i=0; i<ca.length; i++) { \
    var c = ca[i]; \
    while (c.charAt(0)==\' \') c = c.substring(1); \
    if (c.indexOf(name) != -1) return c.substring(name.length,c.length); \
  } \
  return ""; \
} \
';

STMyDiv = document.createElement("div");
STMyDiv.id = "STMyDiv";
STMyDiv.style.margin = "5px 5px 0 5px";

STMyDiv.innerHTML = '\
<span style="font-size:22px;">Salesforce Analytics Cloud SAQL Tester</span>\
<span style="margin-left:5px;font-style:italic;font-size:12px;">v0.2</span>\
<span style="margin-left:5px;">-</span>\
<span style="margin-left:5px;font-size:14px;">contributed by <a href="http://mycervello.com" target="_blank">Cervello</a></span>\
<span style="margin-left:5px;">-</span>\
<span style="margin-left:5px;font-size:14px;">latest build on <a href="https://github.com/Cervello/Shared/tree/master/SAQL_Tester" target="_blank">Github</a></span>\
<a id="STMyHide" href="javascript:void(0);" style="float:right;">hide</a></br>\
<table style="border-collapse:collapse;width:100%;">\
<tr>\
<td style="width:200px;">\
Input:<a href="https://github.com/Cervello/Shared/blob/master/SAQL_Tester/README.md#input-help" target="_blank" style="float:right;">?</a></br>\
<textarea id="STMyInput" cols="80" rows="10" style="border:1px solid green;resize:none;height:200px;max-height:200px;"></textarea>\
</td>\
<td style="width:10px;bottom:0px;">\
<button id="STMyButton">Send</button>\
</td>\
<td style="padding:5px;">\
Output:</br><div id="STMyOutput" style="border:1px solid blue;height:200px;max-height:200px;overflow:auto;"></div>\
</td>\
</tr>\
</table>\
</div>';

$("body").append(STMyJS);
$("body").prepend(STMyDiv);

document.getElementById("STMyHide").onclick = function(){STCleanUp();};
document.getElementById("STMyButton").onclick = function(){STSendQuery();};

}

})();
