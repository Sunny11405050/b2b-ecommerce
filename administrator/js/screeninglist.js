$(document).ready(function(){
onLoad();
screeninglist();
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


function screeninglist() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('screeninglist').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/screeninglist.php", true);
	xmlhttp.send();
}


function screenadd() {
	var phnnumber = document.getElementById('phnnumber').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			screeninglist();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/screenadd.php?phnnumber="+phnnumber, true);
	xmlhttp.send();
}


function deleteclick(clickid) {
    if(confirm("Are you sure, you want to delete?")==true) {
        var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var result = this.responseText;
				alert(result);
				screeninglist();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletescreeninglist.php?guid="+clickid, true);
		xmlhttp.send();
    }
    else {
        return false;
    }
}

