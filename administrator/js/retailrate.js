$(document).ready(function(){
onLoad();
getpercentnum();
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
function getpercentnum() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('percentagenum').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getretailrate.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('epercentnum').value=result;	
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eretailrate.php", true);
	xmlhttp.send();
}


function editpercentage() {
	if(document.getElementById('epercentnum').value=="") {
		swal({
		    text: "Please enter a Number",
		    icon: "warning"
		});
	}
	else {
	document.getElementById('loader').style.display="block";
	var percentagenum = document.getElementById('epercentnum').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('loader').style.display="none";
			swal({
			    text: result,
			    icon: "success"
			});
			setTimeout(function(){ 
			    getpercentnum();
			}, 1000);
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editretailrate.php?percentagenum="+percentagenum, true);
	xmlhttp.send();
	}
}
