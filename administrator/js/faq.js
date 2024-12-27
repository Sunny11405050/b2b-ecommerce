$(document).ready(function(){
onLoad();
getfaq();
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

function getfaq() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('faqs').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getfaq.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	localStorage.setItem("editid",clickid);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('equestion').value=splitter[0];
			document.getElementById('eanswer').value=splitter[1];
			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/efaq.php?guid="+clickid, true);
	xmlhttp.send();
}


function addfaq() {
	if(document.getElementById('question').value=="" || document.getElementById('answer').value=="") {
		alert("All fields are compulsory");
	}
	else {
	document.getElementById('loader').style.display="block";
	var question = document.getElementById('question').value;
	var answer = document.getElementById('answer').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getfaq();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/addfaq.php?question="+question+"&answer="+answer, true);
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
			getfaq();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/deletefaq.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}


function editfaq() {
	if(document.getElementById('equestion').value=="" || document.getElementById('eanswer').value=="") {
		alert("All fields are compulsory");
	}
	else {
	document.getElementById('loader').style.display="block";
	var question = document.getElementById('equestion').value;
	var answer = document.getElementById('eanswer').value;
	var guid = localStorage.getItem("editid");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			alert(result);
			document.getElementById('loader').style.display="none";
			getfaq();
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/editfaq.php?question="+question+"&guid="+guid+"&answer="+answer, true);
	xmlhttp.send();
	}
}


