$(document).ready(function(){
onLoad();
getslider();
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

function getslider() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('slider').innerHTML=result;
			$(function () {
				$('.js-exportable').DataTable({
					dom: 'Bfrtip',
					responsive: true,
					buttons: [
						'copy', 'csv', 'excel', 'pdf', 'print'
					]
				});
			});
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getslider.php", true);
	xmlhttp.send();
}


function deleteclick(clickid) {
	if(confirm("Do you really want to delete?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			getslider();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/deletebanner.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editclick(id) {
    localStorage.setItem("editbannerid",id);
    location.href="editbanner.html";
}
