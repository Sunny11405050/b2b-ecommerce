$(document).ready(function(){
onLoad();
getproducttypes();
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


function getproducttypes() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('producttypes').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproducttypes.php", true);
	xmlhttp.send();
}



function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			//var splitter = result.split("deli");
			document.getElementById('eproducttype').value=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eproducttypes.php?guid="+clickid, true);
	xmlhttp.send();
}



function addproducttypes() {
	if(document.getElementById('producttype').value=="") {
		alert("Please enter product type");
	}
	else {
	document.getElementById('loader').style.display="block";
	var producttype = document.getElementById('producttype').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getproducttypes();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addproducttypes.php?producttype="+producttype, true);
	xmlhttp.send();
	}
}




function editproducttypes() {
	if(document.getElementById('eproducttype').value=="") {
		alert("Please enter product type");
	}
	else {
	document.getElementById('loader').style.display="block";
	var producttype = document.getElementById('eproducttype').value;
	var guid = localStorage.getItem("editid");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getproducttypes();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editproducttypes.php?producttype="+producttype+"&guid="+guid, true);
	xmlhttp.send();
	}
}


function deleteclick(clickid) {
	if(confirm("Do you really want to delete?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			getproducttypes();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteproducttypes.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


