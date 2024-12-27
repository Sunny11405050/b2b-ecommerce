$(document).ready(function(){
onLoad();
getorganizations();
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
			url: "https://poultrade.com/admin/admin/addorganization.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				getorganizations();
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
			url: "https://poultrade.com/admin/admin/editorganization.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				getorganizations();
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
			document.getElementById('eorgname').value=splitter[0];
			document.getElementById('eorgdescription').value=splitter[1];
			document.getElementById('guid').value=clickid;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eorganizations.php?guid="+clickid, true);
	xmlhttp.send();
}


function deleteclickorg(clickid) {
	if(confirm("Do you really want to delete?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			getorganizations();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteorganizations.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function getorganizations() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('organizations').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getorganizations.php", true);
	xmlhttp.send();
}


