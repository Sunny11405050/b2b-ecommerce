$(document).ready(function(){
onLoad();
getproducttypesoptions();
getuomoptions();
getproducts();
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
			url: "https://poultrade.com/admin/admin/addproducts.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				document.getElementById('loader').style.display="none";
				$('#myModal').modal('hide');
				swal({
				    text: data,
				    icon: "success"
				});
				setTimeout(function(){ 
				    getproducts();
				}, 1000);
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
			url: "https://poultrade.com/admin/admin/editproducts.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				document.getElementById('loader').style.display="none";
				$('#myModal1').modal('hide');
				swal({
				    text: data,
				    icon: "success"
				});
				setTimeout(function(){ 
				    getproducts();
				}, 1000);
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
			console.log("result: "+result);
			var splitter = result.split("deli");
			document.getElementById('eproductname').value=splitter[0];
			document.getElementById('eproductnamel').value=splitter[3];
			document.getElementById('esortorder').value=splitter[4];
			document.getElementById('eproducttypes').value=splitter[1];
			document.getElementById('euom').value=splitter[2];
			document.getElementById('emetrics').value=splitter[5];
			document.getElementById('guid').value=clickid;
            document.getElementById('emetrics').value = splitter[5];
            document.getElementById('edescription').value = splitter[6];
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/eproducts.php?guid="+clickid, true);
	xmlhttp.send();
}
function deleteclick(clickid) {
    swal({
        text: "Do you really want to delete?",
        icon: "warning",
        buttons: true,
        dangerMode: false,
      })
      .then((willDelete) => {
        if (willDelete) {
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
					    getproducts();
					}, 1000);
			    }
		    };
		    xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteproducts.php?guid="+clickid, true);
		    xmlhttp.send();
        } 
        else {
            return false;
        }
    });
}


function getproducts() {
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('products').innerHTML=result;
			document.getElementById('loader').style.display="none";
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproducts.php", true);
	xmlhttp.send();
}


function getproducttypesoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('producttypes').innerHTML=result;
			document.getElementById('eproducttypes').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getproducttypesoptions.php", true);
	xmlhttp.send();
}


function getuomoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('uom').innerHTML=result;
			document.getElementById('euom').innerHTML=result;
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/admin/admin/getuomoptions.php", true);
	xmlhttp.send();
}
