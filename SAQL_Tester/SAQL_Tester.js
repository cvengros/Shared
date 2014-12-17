javascript:(function(){
/* Salesforce Analytics Cloud SAQL Tester v0.2 */
/* This bookmarklet contributed by Marc Hassan <mhassan@mycervello.com> of Cervello, Inc (mycervello.com), December 2014. Feel free to share and/or alter! */

if (window.location.toString().indexOf("salesforce.com/analytics")==-1){alert("You must be inside Salesforce Analytics Cloud to use this bookmarklet.");return;}

var SAQLTesterMyJS = document.getElementById("SAQLTesterMyJS");
var SAQLTesterMyDiv = document.getElementById("SAQLTesterMyDiv");

if (SAQLTesterMyDiv != null) {
if (SAQLTesterMyDiv.style.display=="none"){SAQLTesterMyDiv.style.display="";} else {SAQLTesterMyDiv.style.display="none";}
} else {

SAQLTesterMyJS = document.createElement("script");
SAQLTesterMyJS.id="SAQLTesterMyJS";
SAQLTesterMyJS.type = "text/javascript";
SAQLTesterMyJS.innerHTML=' \
	  function SAQLTesterCleanUp() { \
		  document.getElementById("SAQLTesterMyDiv").style.display="none"; \
		  } \
      function SAQLTesterBuildQuery() { \
	      return JSON.stringify({"action":"query","query":document.getElementById("SAQLTesterMyInput").value.replace(/\\\\\\"/g,"\\"")}); \
		  } \
      function SAQLTesterSendQuery() { \
	  var SAQLTesterDataString = SAQLTesterBuildQuery(); \
        $.ajax({ \
          url: window.location.protocol+\'//\'+window.location.hostname+\'/insights/internal_api/v1.0/remote\', \
          type: \'POST\', \
		  data: SAQLTesterDataString, \
          dataType: \'json\', \
          success: function(resp) { \
			var SAQLTesterMyRecords = JSON.parse(resp.result[0]).results.records; \
			var SAQLTesterMyCols = Object.keys(SAQLTesterMyRecords[0]); \
			var SAQLTesterMyNumCols = SAQLTesterMyCols.length; \
			var SAQLTesterMyNumRows = SAQLTesterMyRecords.length; \
			var SAQLTesterMyHTML = ""; \
			SAQLTesterMyHTML+=\'<table style="margin:5px;border-collapse:separate">\'; \
			/* Header row */ \
			SAQLTesterMyHTML+=\'<tr>\'; \
			for (i=0;i<SAQLTesterMyNumCols;i++) {SAQLTesterMyHTML+=\'<th style="border:1px solid;">\'+Object.keys(SAQLTesterMyRecords[0])[i]+\'</th>\';} \
			SAQLTesterMyHTML+=\'</tr>\'; \
			/* Data rows */ \
			for (j=0;j<SAQLTesterMyNumRows;j++) { \
			SAQLTesterMyHTML+=\'<tr>\'; \
			for (i=0;i<SAQLTesterMyNumCols;i++) {SAQLTesterMyHTML+=\'<td style="border:1px solid;">\'+SAQLTesterMyRecords[j][SAQLTesterMyCols[i]]+\'</td>\';} \
			SAQLTesterMyHTML+=\'</tr>\'; \
			} \
			SAQLTesterMyHTML+=\'</table>\'; \
			document.getElementById("SAQLTesterMyOutput").innerHTML=SAQLTesterMyHTML;  }, \
          error: function(resp) { document.getElementById("SAQLTesterMyOutput").innerHTML=\'<div style="margin:5px;"><span style="color:red;">ERROR:</span> \'+JSON.parse(resp.responseText).errorMsg+\'</div>\'; }, \
          beforeSend: SAQLTesterSetHeader \
        }); \
      } \
      function SAQLTesterSetHeader(xhr) { \
		xhr.setRequestHeader(\'Host\',window.location.hostname); \
		xhr.setRequestHeader(\'Accept\',\'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\'); \
		xhr.setRequestHeader(\'Accept-Language\',\'en-US,en;q=0.5\'); \
		xhr.setRequestHeader(\'Authorization\',\'OAuth \'+SAQLTesterGetCookie("sid")); \
		xhr.setRequestHeader(\'Referer\',window.location.protocol+\'//\'+window.location.hostname+\'/analytics/wave/wave.apexp\'); \
		xhr.setRequestHeader(\'Content-Length\',SAQLTesterBuildQuery().length); \
		xhr.setRequestHeader(\'Content-Type\',\'text/plain; charset=UTF-8\'); \
		xhr.setRequestHeader(\'Connection\',\'keep-alive\'); \
		xhr.setRequestHeader(\'Pragma\',\'no-cache\'); \
		xhr.setRequestHeader(\'Cache-Control\',\'no-cache\'); \
      } \
	  function SAQLTesterGetCookie(cname) { \
    var name = cname + "="; \
    var ca = document.cookie.split(\';\'); \
    for(var i=0; i<ca.length; i++) { \
        var c = ca[i]; \
        while (c.charAt(0)==\' \') c = c.substring(1); \
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length); \
    } \
    return ""; \
}';

SAQLTesterMyDiv = document.createElement("div");
SAQLTesterMyDiv.id = "SAQLTesterMyDiv";
SAQLTesterMyDiv.style.margin = "5px 5px 0 5px";

SAQLTesterMyDiv.innerHTML = '\
<span style="font-size:22px;">Salesforce Analytics Cloud SAQL Tester</span>\
<span style="margin-left:5px;font-style:italic;font-size:12px;">v0.2</span>\
<span style="margin-left:5px;">-</span>\
<span style="margin-left:5px;font-size:14px;">contributed by <a href="http://mycervello.com" target="_blank">Cervello</a></span>\
<span style="margin-left:5px;">-</span>\
<span style="margin-left:5px;font-size:14px;">latest build on <a href="https://github.com/Cervello/Shared/tree/master/SAQL_Tester" target="_blank">Github</a></span>\
<a href="javascript:void(0);" style="float:right;" onclick="SAQLTesterCleanUp()">hide</a></br>\
<table style="border-collapse:collapse;width:100%;">\
<tr>\
<td style="width:200px;">\
Input:<a href="javascript:void(0);" style="cursor:pointer;float:right;" onclick="SAQLTesterToggleHelp()">?</a></br><textarea id="SAQLTesterMyInput" cols="80" rows="10" style="border:1px solid green;resize:none;height:200px;max-height:200px;"></textarea>\
</td>\
<td style="width:10px;bottom:0px;">\
<button id="SAQLTesterMyButton" onclick="SAQLTesterSendQuery()">Send</button>\
</td>\
<td style="padding:5px;">\
Output:</br><div id="SAQLTesterMyOutput" style="border:1px solid blue;height:200px;max-height:200px;overflow:auto;"></div>\
</td>\
</tr>\
</table>\
</div>';

$("body").append(SAQLTesterMyJS);
$("body").prepend(SAQLTesterMyDiv);

}

})();
