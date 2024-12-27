$(document).ready(function(){
    userinfo();
	getcategories();
});
function userinfo() {
	if(localStorage.getItem("firstname")=="" || localStorage.getItem("firstname")==null) {
		alert("Security Token Expired, Please login again");
		logoutfn();
	}
	else {
		document.getElementById("firstname").innerHTML=localStorage.getItem("firstname");
		document.getElementById("lastname").innerHTML=localStorage.getItem("lastname");
		document.getElementById("email").innerHTML=localStorage.getItem("email");
		document.getElementById("profilepicture").src="https://poultrade.com/new/admin/images/"+localStorage.getItem("profilepicture");
	}
}
function logoutfn() {
	localStorage.removeItem("firstname");
	localStorage.removeItem("lastname");
	localStorage.removeItem("email");
	localStorage.removeItem("profilepicture");
	location.href="../../index.html";
}
function getcategories() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('categories').innerHTML=result;
			$(function () {
				//Exportable table
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
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getsellers.php", true);
	xmlhttp.send();
}
function activateclick(clickid) {
	if(confirm("Do you really want to Activate?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			location.reload();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/activateseller.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}
function deactivateclick(clickid) {
	if(confirm("Do you really want to Deactivate?")==true) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			location.reload();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/deactivateseller.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}
function badgefn(clickid) {
	var splitter = clickid.split("s");
	var badge = document.getElementById(clickid).value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			location.reload();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/badgeseller.php?guid="+splitter[1]+"&badge="+badge, true);
	xmlhttp.send();
}