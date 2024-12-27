$(document).ready(function(){
    userinfo();
	passcheck();
	weekorders();
	getorderstoconfirm();
	getorderstopacked();
	getorderstodispatched();
	getorderstodelivered();
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
function passcheck() {
	if(localStorage.getItem("temppass")=="hmk@123") {
		location.href="pages/tables/cpassword.html";
	}
}
function logoutfn() {
	localStorage.removeItem("firstname");
	localStorage.removeItem("lastname");
	localStorage.removeItem("email");
	localStorage.removeItem("profilepicture");
	location.href="index.html";
}
function getorderstoconfirm() {
	var seller = localStorage.getItem("user_id");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('orderstoconfirm').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getorderstoconfirm.php?seller="+seller, true);
	xmlhttp.send();
}
function getorderstopacked() {
	var seller = localStorage.getItem("user_id");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('orderstopacked').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getorderstopacked.php?seller="+seller, true);
	xmlhttp.send();
}
function getorderstodispatched() {
	var seller = localStorage.getItem("user_id");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('orderstodispatched').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getorderstodispatched.php?seller="+seller, true);
	xmlhttp.send();
}
function getorderstodelivered() {
	var seller = localStorage.getItem("user_id");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('orderstodelivered').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getorderstodelivered.php?seller="+seller, true);
	xmlhttp.send();
}
function weekorders() {
	var seller = localStorage.getItem("user_id");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('orders').innerHTML=result;
			$(function () {
				$('.js-exportable').DataTable({
					dom: 'Bfrtip',
					responsive: true,
					buttons: [
						'copy', 'csv', 'excel', 'pdf', 'print'
					]
				});
			});
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/weekordersseller.php?seller="+seller, true);
	xmlhttp.send();
}