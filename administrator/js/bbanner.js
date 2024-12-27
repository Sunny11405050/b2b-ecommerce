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

$(document).ready(function (e) {
	$("#uploadForm").on('submit',(function(e) {
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/new/admin/addbannerlabel.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				getslider();
			},
			error: function() 
			{
			} 	        
	   });
	}));
});


$(document).ready(function (e) {
	$("#uploadForm1").on('submit',(function(e) {
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/new/admin/editbannerlabel.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				getslider();
			},
			error: function() 
			{
			} 	        
	   });
	}));
});


function getslider() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('slider').innerHTML=result;
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
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getbannerlabels_data.php", true);
	xmlhttp.send();
}


function editclick(clickid) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('ebannerlabel').value=splitter[0];
			document.getElementById('estatus').value=splitter[1];
			document.getElementById('esortorder').value=splitter[2];
			document.getElementById('eid').value=clickid;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/ebannerlabel.php?guid="+clickid, true);
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
	xmlhttp.open("GET", "https://poultrade.com/new/admin/deletebannerlabel.php?guid="+clickid, true);
	xmlhttp.send();
	}
	else {
	return false;
	}
}
	
