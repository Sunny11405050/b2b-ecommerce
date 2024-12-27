$(document).ready(function(){
onLoad();
getbannerlabels();
getlocationboxes();
getstores();
});
function onLoad() { 
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
    location.href="../../dashboardapp.html";
}

$(document).ready(function (e) {
	$("#uploadForm").on('submit',(function(e) {
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/new/admin/addbanner.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				location.href="banner.html";
			},
			error: function() 
			{
			} 	        
	   });
	}));
});


function getbannerlabels() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('bannerlabel').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getbannerlabels.php", true);
	xmlhttp.send();
}


function getlocationboxes() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('locationboxes').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getlocationboxes.php", true);
	xmlhttp.send();
}


function boxclick(clickid) {
if(document.getElementById(clickid).checked==true) {
    document.getElementById('storelocation').value=document.getElementById('storelocation').value+clickid+",";
}
else if(document.getElementById(clickid).checked==false) {
    var a = document.getElementById('storelocation').value;
    var c = clickid+",";
    var b = a.replace(c,"");
    document.getElementById('storelocation').value = b;
}
}


function divfn() {
    var a = document.getElementById("clicktype").value;
    if(a=="general" || a=="") {
        document.getElementById('urlbox').style.display="none";
        document.getElementById('pagebox').style.display="none";
    }
    else if(a=="advertisement") {
        document.getElementById('urlbox').style.display="block";
        document.getElementById('pagebox').style.display="none";
    }
    else if(a=="page") {
        document.getElementById('urlbox').style.display="none";
        document.getElementById('pagebox').style.display="block";
    }
}

