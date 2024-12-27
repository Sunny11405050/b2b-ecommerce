$(document).ready(function(){
    userinfo();
});
function userinfo() {
	if(localStorage.getItem("firstname")=="" || localStorage.getItem("firstname")==null) {
		alert("Security Token Expired, Please login again");
		logoutfn();
	}
	else {
		document.getElementById("firstname").innerHTML=localStorage.getItem("firstname");
		document.getElementById("lastname").innerHTML=localStorage.getItem("lastname");
		document.getElementById("email").innerHTML=localStorage.getItem("role");
		//document.getElementById("profilepicture").src="https://poultrade.com/new/admin/images/"+localStorage.getItem("profilepicture");
	}
}
function logoutfn() {
	localStorage.removeItem("firstname");
	localStorage.removeItem("lastname");
	localStorage.removeItem("email");
	localStorage.removeItem("profilepicture");
	location.href="index.html";
}
function logoutfn_inner() {
	localStorage.removeItem("firstname");
	localStorage.removeItem("lastname");
	localStorage.removeItem("email");
	localStorage.removeItem("profilepicture");
	location.href="../../index.html";
}
function getstores() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('storeid').innerHTML=result;
			document.getElementById('storeid1').innerHTML=result;

			var d = new Date();
            var year = d.getFullYear();
            var month = Number(d.getMonth())+Number(1);
            if(month<10) {
            	var m = "0"+month;
            }
            else {
            	var m = month;
            }
            var day = d.getDate();
            if(day<10) {
            	var dt = "0"+day;
            }
            else {
            	var dt = day;
            }
            document.getElementById('saledate').value=year+"-"+m+"-"+dt;
            document.getElementById('saledate1').value=year+"-"+m+"-"+dt;

			document.getElementById('loader').style.display="none";
			getsales1();
			getclosing1();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getstoresoptions.php", true);
	xmlhttp.send();
}
function getsales1() {
	document.getElementById('loader').style.display="block";
	var saledate = document.getElementById('saledate').value;
	var storeid = document.getElementById('storeid').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('salesdata').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getclosings.php?saledate="+saledate+"&storeid="+storeid, true);
	xmlhttp.send();
}
function getclosing1() {
	var saledate = document.getElementById('saledate1').value;
	document.getElementById('loader').style.display="block";
	var storeid = document.getElementById('storeid1').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('closingdata').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getclosings1.php?saledate="+saledate+"&storeid="+storeid, true);
	xmlhttp.send();
	
}
