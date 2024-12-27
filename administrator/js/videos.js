$(document).ready(function(){
onLoad();
getvideos();
getstores();

});
function onLoad() { 
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
    location.href="dashboardapp.html";
}

$(document).ready(function (e) {
	$("#uploadForm").on('submit',(function(e) {
	document.getElementById('loader').style.display="block";
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/admin/admin/addvideos.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				getvideos();
			},
			error: function() 
			{
			document.getElementById('loader').style.display="none";
			} 	        
	   });
	}));
});


$(document).ready(function (e) {
	$("#uploadForm1").on('submit',(function(e) {
	document.getElementById('loader').style.display="block";
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/admin/admin/editvideos.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				getvideos();
			},
			error: function() 
			{
			document.getElementById('loader').style.display="none";
			} 	        
	   });
	}));
});


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('evideoname').value=splitter[0];
			document.getElementById('evideodescription').value=splitter[1];
			document.getElementById('guid').value=clickid;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/evideos.php?guid="+clickid, true);
	xmlhttp.send();
}


function deleteclick(clickid) {
	if(confirm("Do you really want to delete?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			getvideos();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletevideos.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function getvideos() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('videos').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getvideos.php", true);
	xmlhttp.send();
}


