$(document).ready(function(){
    userinfo();
	passcheck();
	getproducts();
	getcategoryoptions();
	getecategoryoptions();
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
		document.getElementById("profilepicture").src="https://poultrade.com/associates/"+localStorage.getItem("profilepicture");
		document.getElementById("associate").value=localStorage.getItem("user_id");
	}
}
function passcheck() {
	if(localStorage.getItem("temppass")=="hmk@123") {
		location.href="cpassword.html";
	}
}
function logoutfn() {
	localStorage.removeItem("firstname");
	localStorage.removeItem("lastname");
	localStorage.removeItem("email");
	localStorage.removeItem("profilepicture");
	location.href="../../index.html";
}
$(document).ready(function (e) {
	$("#uploadForm").on('submit',(function(e) {
	document.getElementById('loader').style.display="block";
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/new/admin/addassociateproducts.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				location.reload();
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
			url: "https://poultrade.com/new/admin/editassociateproducts.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				location.reload();
			},
			error: function() 
			{
			document.getElementById('loader').style.display="none";
			} 	        
	   });
	}));
});
function readURL1(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#image1')
				.attr('src', e.target.result)
				.width(50)
				.height(auto);
		};
		reader.readAsDataURL(input.files[0]);
	}
}
function readURL2(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#image2')
				.attr('src', e.target.result)
				.width(50)
				.height(auto);
		};
		reader.readAsDataURL(input.files[0]);
	}
}
function readURL3(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#image3')
				.attr('src', e.target.result)
				.width(50)
				.height(auto);
		};
		reader.readAsDataURL(input.files[0]);
	}
}
function readURL4(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#image4')
				.attr('src', e.target.result)
				.width(50)
				.height(auto);
		};
		reader.readAsDataURL(input.files[0]);
	}
}
function creadURL1(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#cimage1')
				.attr('src', e.target.result)
				.width(100)
				.height(auto);
		};
		reader.readAsDataURL(input.files[0]);
	}
}
function creadURL2(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#cimage2')
				.attr('src', e.target.result)
				.width(100)
				.height(auto);
		};
		reader.readAsDataURL(input.files[0]);
	}
}
function creadURL3(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#cimage3')
				.attr('src', e.target.result)
				.width(100)
				.height(auto);
		};
		reader.readAsDataURL(input.files[0]);
	}
}
function creadURL4(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('#cimage4')
				.attr('src', e.target.result)
				.width(100)
				.height(auto);
		};
		reader.readAsDataURL(input.files[0]);
	}
}
function getproducts() {
	var a = localStorage.getItem("user_id");
	document.getElementById('loader').style.display="block";
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('categories').innerHTML=result;
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
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getassociateproductss.php?associate="+a, true);
	xmlhttp.send();
}
function getcategoryoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('category').innerHTML=result;			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getcategoryoptions.php", true);
	xmlhttp.send();
}

function getsubcategoryoptions() {
	var a = document.getElementById('category').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('subcategory').innerHTML=result;		
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getsubcategoryoptionsc.php?category="+a, true);
	xmlhttp.send();
}
function getproducttypeoptions() {
	var a = document.getElementById('category').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('producttype').innerHTML=result;		
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getproducttypeoptionsc.php?category="+a, true);
	xmlhttp.send();
}
function getbrandoptions() {
	var a = document.getElementById('category').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('brand').innerHTML=result;		
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getbrandoptionsc.php?category="+a, true);
	xmlhttp.send();
}
function g1(clickid) {
document.getElementById('guidimg1').value=clickid;
}
function g2(clickid) {
document.getElementById('guidimg2').value=clickid;
}
function g3(clickid) {
document.getElementById('guidimg3').value=clickid;
}
function g4(clickid) {
document.getElementById('guidimg4').value=clickid;
}
$(document).ready(function (e) {
	$("#uploadFormimg1").on('submit',(function(e) {
	document.getElementById('loader').style.display="block";
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/new/admin/changeimg1.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				location.reload();
			},
			error: function() 
			{
			document.getElementById('loader').style.display="none";
			} 	        
	   });
	}));
});
$(document).ready(function (e) {
	$("#uploadFormimg2").on('submit',(function(e) {
	document.getElementById('loader').style.display="block";
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/new/admin/changeimg2.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				location.reload();
			},
			error: function() 
			{
			document.getElementById('loader').style.display="none";
			} 	        
	   });
	}));
});
$(document).ready(function (e) {
	$("#uploadFormimg3").on('submit',(function(e) {
	document.getElementById('loader').style.display="block";
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/new/admin/changeimg3.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				location.reload();
			},
			error: function() 
			{
			document.getElementById('loader').style.display="none";
			} 	        
	   });
	}));
});
$(document).ready(function (e) {
	$("#uploadFormimg4").on('submit',(function(e) {
	document.getElementById('loader').style.display="block";
		e.preventDefault();
		$.ajax({
			url: "https://poultrade.com/new/admin/changeimg4.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			success: function(data)
			{
				alert(data);
				document.getElementById('loader').style.display="none";
				location.reload();
			},
			error: function() 
			{
			document.getElementById('loader').style.display="none";
			} 	        
	   });
	}));
});
function editclick(clickid) {
	var guid = clickid;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			var splitter = result.split("deli");
			document.getElementById('eguid').value=clickid;
			document.getElementById('eproductname').value=splitter[0];
			document.getElementById('eprice').value=splitter[5];
			document.getElementById('enewprice').value=splitter[6];
			document.getElementById('efreight').value=splitter[7];
			document.getElementById('ecodoption').value=splitter[8];
			document.getElementById('edescription').value=splitter[9];
			document.getElementById('estock').value=splitter[10];
			if(splitter[1]!="") {
				document.getElementById('ecategory').value=splitter[1];
				var a = splitter[1];
				var xmlhttp1 = new XMLHttpRequest();
				xmlhttp1.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var result1 = this.responseText;
						document.getElementById('esubcategory').innerHTML=result1;		
						document.getElementById('esubcategory').value=splitter[2];
					}
				};
				xmlhttp1.open("GET", "https://poultrade.com/new/admin/getsubcategoryoptionsc.php?category="+a, true);
				xmlhttp1.send();
				var b = splitter[1];
				var xmlhttp2 = new XMLHttpRequest();
				xmlhttp2.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var result2 = this.responseText;
						document.getElementById('eproducttype').innerHTML=result2;		
						document.getElementById('eproducttype').value=splitter[3];
					}
				};
				xmlhttp2.open("GET", "https://poultrade.com/new/admin/getproducttypeoptionsc.php?category="+b, true);
				xmlhttp2.send();
				var c = splitter[1];
				var xmlhttp3 = new XMLHttpRequest();
				xmlhttp3.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						var result3 = this.responseText;
						document.getElementById('ebrand').innerHTML=result3;
						document.getElementById('ebrand').value=splitter[4];						
					}
				};
				xmlhttp3.open("GET", "https://poultrade.com/new/admin/getbrandoptionsc.php?category="+c, true);
				xmlhttp3.send();
			}
			
			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getproductdetails.php?guid="+guid, true);
	xmlhttp.send();
}
function deleteclick(clickid) {
	if(confirm("Do you really want to delete this product?")==true) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var result = this.responseText;
				alert(result);
				location.reload();
			}
		};
		xmlhttp.open("GET", "https://poultrade.com/new/admin/deleteassociateproducts.php?guid="+clickid, true);
		xmlhttp.send();
	}
	else {
		return false;
	}
}	
function getecategoryoptions() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('ecategory').innerHTML=result;	
			
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getcategoryoptions.php", true);
	xmlhttp.send();
}

function getesubcategoryoptions() {
	var a = document.getElementById('ecategory').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('esubcategory').innerHTML=result;		
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getsubcategoryoptionsc.php?category="+a, true);
	xmlhttp.send();
}
function geteproducttypeoptions() {
	var a = document.getElementById('ecategory').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('eproducttype').innerHTML=result;		
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getproducttypeoptionsc.php?category="+a, true);
	xmlhttp.send();
}
function getebrandoptions() {
	var a = document.getElementById('ecategory').value;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var result = this.responseText;
			document.getElementById('ebrand').innerHTML=result;		
		}
	};
	xmlhttp.open("GET", "https://poultrade.com/new/admin/getbrandoptionsc.php?category="+a, true);
	xmlhttp.send();
}