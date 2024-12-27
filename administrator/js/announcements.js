$(document).ready(function(){
onLoad();
getuseroptions();
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
			url: "https://poultrade.com/new/admin/genpush.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				location.reload();
			},
			error: function() 
			{
			} 	        
	   });
	}));
});


function getuseroptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('receiver').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getuseroptions.php", true);
	xmlhttp.send();
}
