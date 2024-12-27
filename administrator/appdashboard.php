<html>
<head>
    <meta charset="UTF-8">
    <meta name="author" content="DSquad Technologies Pvt Ltd, Begumpet, Hyderabad">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>HMK Chicken Stores</title>
    <link rel="icon" href="favicon.png" type="image/png">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
    <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="plugins/node-waves/waves.css" rel="stylesheet" />
    <link href="plugins/animate-css/animate.css" rel="stylesheet" />
    <link href="plugins/morrisjs/morris.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet">
    <link href="css/customstyle.css" rel="stylesheet">
    <link href="css/themes/all-themes.css" rel="stylesheet" />
	<link href="plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">
	<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
	<script src="js/common.js"></script>
	<script src="jscolor.js"></script>
	<script src="plugins/jquery/jquery.min.js"></script>
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<script>
		function viewnetwork() {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					document.getElementById('nett').innerHTML=result;
					document.getElementById('loader').style.display="none";
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/viewnetwork.php", true);
			xmlhttp.send();
		}
	</script>
	<script>
		function viewnetworksearch() {
			document.getElementById('loader').style.display="block";
			var phn = document.getElementById('nmobile').value;
			if(phn=="") {
			    alert("Please Enter Mobile Number or Name");
			}
			else {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					document.getElementById('nett').innerHTML=result;
					document.getElementById('loader').style.display="none";
					
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/viewnetworksearch.php?phoneno="+phn, true);
			xmlhttp.send();
			}
		}
	</script>
	<script>
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
	</script>
	<script>
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
	</script>
	<script>
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
	</script>
	<script type="text/javascript">
		$(document).ready(function (e) {
			$("#uploadForm").on('submit',(function(e) {
			document.getElementById('loader').style.display="block";
				e.preventDefault();
				$.ajax({
					url: "https://poultrade.com/admin/admin/addorganization.php",
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
	</script>
	<script type="text/javascript">
		$(document).ready(function (e) {
			$("#uploadForm1").on('submit',(function(e) {
			document.getElementById('loader').style.display="block";
				e.preventDefault();
				$.ajax({
					url: "https://poultrade.com/admin/admin/editorganization.php",
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
	</script>
	<script>
		function editclick(clickid) {
			localStorage.setItem("editid",clickid);
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					var splitter = result.split("deli");
					document.getElementById('eorgname').value=splitter[0];
					document.getElementById('eorgdescription').value=splitter[1];
					document.getElementById('guid').value=clickid;
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/eorganizations.php?guid="+clickid, true);
			xmlhttp.send();
		}
	</script>
	<script>
		function deleteclickorg(clickid) {
			if(confirm("Do you really want to delete?")==true) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					alert(result);
					getorganizations();
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/deleteorganizations.php?guid="+clickid, true);
			xmlhttp.send();
			}
			else {
			return false;
			}
		}
	</script>
	<script>
		function getorganizations() {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					document.getElementById('organizations').innerHTML=result;
					document.getElementById('loader').style.display="none";
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/getorganizations.php", true);
			xmlhttp.send();
		}
	</script>
	<script>
	    function swapfn(clickid) {
	        if(document.getElementById('primarynum').innerHTML=="") {
	            var splitter = clickid.split("deli");
	            document.getElementById('primarynum').innerHTML=splitter[1];
	            document.getElementById('primarydev').innerHTML=splitter[2];
	            document.getElementById('transfertype').innerHTML=splitter[0];
	            document.getElementById('netmsg').style.display="block";
	        }
	        else {
	            var splitter = clickid.split("deli");
	            document.getElementById('secondarynum').innerHTML=splitter[1];
	            document.getElementById('secondarydev').innerHTML=splitter[2];
	            document.getElementById('btns').style.display="block";
	        }
	    }
	</script>
	<script>
		function swapnow() {
		    if(confirm("Are you sure, you want to swap?")==true) {
		        document.getElementById('loader').style.display="block";
		        var transfertype = document.getElementById('transfertype').innerHTML;
		        var primarydev = document.getElementById('primarydev').innerHTML;
		        var secondarydev = document.getElementById('secondarydev').innerHTML;
    			var xmlhttp = new XMLHttpRequest();
    			xmlhttp.onreadystatechange = function() {
    				if (this.readyState == 4 && this.status == 200) {
    					var result = this.responseText;
    					alert(result);
    					viewnetwork();
    				}
    			};
    			xmlhttp.open("GET", "https://poultrade.com/admin/admin/swapnow.php?transfertype="+transfertype+"&primarydev="+primarydev+"&secondarydev="+secondarydev, true);
    			xmlhttp.send();    
		    }
			else {
			    return false;
			}
		}
	</script>
	<style>
	    #headertable th div {
	        min-height: 80px;
	    }
	</style>
	<script>
		function getpricedisplay() {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					document.getElementById('mbutton').innerHTML=result;
					document.getElementById('loader').style.display="none";
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay.php", true);
			xmlhttp.send();
		}
	</script>
	<script>
		function getpricedisplay1() {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					document.getElementById('hbutton').innerHTML=result;
					document.getElementById('loader').style.display="none";
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay1.php", true);
			xmlhttp.send();
		}
	</script>
	<script>
		function getpricedisplay2() {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					document.getElementById('cbutton').innerHTML=result;
					document.getElementById('loader').style.display="none";
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay2.php", true);
			xmlhttp.send();
		}
	</script>
	<script>
		function getpricedisplay3() {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					document.getElementById('bbutton').innerHTML=result;
					document.getElementById('loader').style.display="none";
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay3.php", true);
			xmlhttp.send();
		}
	</script>
	<script>
		function getpricedisplay4() {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					document.getElementById('cpbutton').innerHTML=result;
					document.getElementById('loader').style.display="none";
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay4.php", true);
			xmlhttp.send();
		}
	</script>
	<script>
		function getpricedisplay5() {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					document.getElementById('dipbutton').innerHTML=result;
					document.getElementById('loader').style.display="none";
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/getpricedisplay5.php", true);
			xmlhttp.send();
		}
	</script>
	<script>
		function disablepricefn(clickid) {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					location.reload();
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/disableprice.php?id="+clickid, true);
			xmlhttp.send();
		}
	</script>
	<script>
		function enablepricefn(clickid) {
			document.getElementById('loader').style.display="block";
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var result = this.responseText;
					location.reload();
				}
			};
			xmlhttp.open("GET", "https://poultrade.com/admin/admin/enablepricedisplay.php?id="+clickid, true);
			xmlhttp.send();
		}
	</script>
</head>
<body class="theme-red" style="background: #FFFFFF" onload="getpricedisplay(); getpricedisplay1(); getpricedisplay2(); getpricedisplay3(); getpricedisplay4(); getpricedisplay5(); getstores();">
    <div class="overlay"></div>
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="dashboardapp.html"><b>poulTRADE</b></a>
            </div>
            <div class="navbar-collapse customSettings" id="navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li class="pull-right"><a href="javascript:void(0);" class="js-right-sidebar" data-close="true"><i class="fa fa-bar-chart fa-2x"></i></a></li>
                </ul>
            </div>
        </div>
    </nav>
    <section>
    <aside id="rightsidebar" class="right-sidebar">
        <ul class="nav nav-tabs tab-nav-right" role="tablist">
            <li role="presentation" class="active"><a href="#skins" data-toggle="tab">Sales & Stock</a></li>
            <li role="presentation"><a href="#skins1" data-toggle="tab">Closing</a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active in active" id="skins">
                <div class="col-md-12 col-xs-12" style="padding-top: 10px">
                    Date:<br>
                    <input type='date' class='form-control' id="saledate" onchange="getsales1();">
                    <br>
                    Branch:<br>
                    <select class="form-control" id="storeid" onchange="getsales1();">
                    </select>
                </div>
                <div class="col-md-12 col-xs-12" style="padding-top: 10px" id="salesdata">
                </div>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="skins1">
                <div class="col-md-12 col-xs-12" style="padding-top: 10px">
                    Date:<br>
                    <input type='date' class='form-control' id="saledate1" onchange="getclosing1();">
                    <br>
                    Branch:<br>
                    <select class="form-control" id="storeid1" onchange="getclosing1();">
                    </select>
                </div>
                <div class="col-md-12 col-xs-12" style="padding-top: 10px" id="closingdata">
                </div>
            </div>
        </div>
    </aside>
    </section>
    <section class="content">
        
        <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 5px; margin: 0px">
            <!--div class="col-md-1 col-xs-2" style="padding: 0px; text-align: center">
                <img src="" style='width: 90%; height: auto' alt="" id="profilepicture"/>    
            </div-->
            <!--div class="col-md-11 col-xs-10" style="padding: 0px;"-->
                <div class="col-md-6 col-sm-6 col-xs-6" style='padding: 0px'>
                    <span id="firstname"></span> <span id="lastname"></span><br>
                    <span id="email"></span><br>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6" style='padding: 0px; text-align: right'>
                    <button class="btn btn-danger" type="button" onclick="logoutfn();">Logout</button>    
                </div>
            <!--/div-->
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12" style="padding: 5px; margin: 0px">
            <div class="col-md-12 col-sm-12 col-xs-12 headerbox">
                <i class="fa fa-cog"></i> Display Conigurations
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px">
                <div class="col-md-6 col-xs-6" style="padding: 5px; margin: 0px; padding-top: 15px">
                    <b>Market Price</b>    
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px">
                    <div id="mbutton" style="width: 100px; float: right"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px">
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px; padding-top: 15px">
                    <b>HMK Price</b>    
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px">
                    <div id="hbutton" style="width: 100px; float: right"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px">
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px; padding-top: 15px">
                    <b>Cash Back</b>    
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px">
                    <div id="cbutton" style="width: 100px; float: right"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px">
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px; padding-top: 15px">
                    <b>Nearest Branch</b>    
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px">
                    <div id="bbutton" style="width: 100px; float: right"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px">
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px; padding-top: 15px">
                    <b>Coupons</b>    
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px">
                    <div id="cpbutton" style="width: 100px; float: right"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px">
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px; padding-top: 15px">
                    <b>Dip</b>    
                </div>
                <div class="col-md-6 col-sm-6 col-xs-6" style="padding: 5px; margin: 0px">
                    <div id="dipbutton" style="width: 100px; float: right"></div>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12" style="padding: 5px; margin: 0px;">
            <div class="col-md-12 col-sm-12 col-xs-12 headerbox">
                <i class="fa fa-bar-chart"></i> Dashboards & Reports
            </div>
		    <div class="col-md-6 col-sm-6 col-xs-6 tileholder">
			    <a href="appdashboard.html">
			    <div class='maintile'>
			        <i class="fa fa-dashboard fa-3x cornericon"></i><br>
			        <div class="menuname">Dashboard</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-6 col-sm-6 col-xs-6 tileholder">
			    <a href="#">
			    <div class='maintile'>
			        <i class="fa fa-line-chart fa-3x cornericon"></i><br>
			        <div class="menuname">Reports</div>
			    </div>
			    </a>
			</div>
        </div>
        
        <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px; margin-top: 20px">
            <div class="col-md-12 col-sm-12 col-xs-12 headerbox">
                <i class="fa fa-cubes"></i> Catalog
            </div>
		    <div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="products.html">
			    <div class='maintile'>
			        <i class="fa fa-cube fa-3x cornericon"></i><br>
			        <div class="menuname">Products</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="productcategories.html">
			    <div class='maintile'>
			        <i class="fa fa-th fa-3x cornericon"></i><br>
			        <div class="menuname">Product Categories</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="productprices.html">
			    <div class='maintile'>
			        <i class="fa fa-inr fa-3x cornericon"></i><br>
			        <div class="menuname">Product Prices</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="stockalert.html">
			    <div class='maintile'>
			        <i class="fa fa-bell fa-3x cornericon"></i><br>
			        <div class="menuname">Stock Alert</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="retailrate.html">
			    <div class='maintile'>
			        <i class="fa fa-inr fa-3x cornericon"></i><br>
			        <div class="menuname">Retail Rate</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="pricedifference.html">
			    <div class='maintile'>
			        <i class="fa fa-arrows-v fa-3x cornericon"></i><br>
			        <div class="menuname">Price Difference</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="uom.html">
			    <div class='maintile'>
			        <i class="fa fa-balance-scale fa-3x cornericon"></i><br>
			        <div class="menuname">Unit of Measurements</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="saletypes.html">
			    <div class='maintile'>
			        <i class="fa fa-cubes fa-3x cornericon"></i><br>
			        <div class="menuname">Sale Types</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="dwp.html">
			    <div class='maintile'>
			        <i class="fa fa-percent fa-3x cornericon"></i><br>
			        <div class="menuname">Dressed Weight Percentage</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="coupons.html">
			    <div class='maintile'>
			        <i class="fa fa-mail-reply fa-3x cornericon"></i><br>
			        <div class="menuname">Cashback</div>
			    </div>
			    </a>
			</div>
        </div>
        
        <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px; margin-top: 20px">
            <div class="col-md-12 col-sm-12 col-xs-12 headerbox">
                <i class="fa fa-building"></i> Organization
            </div>
		    <div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="locations.html">
			    <div class='maintile'>
			        <i class="fa fa-map-marker fa-3x cornericon"></i><br>
			        <div class="menuname">Locations</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="stores.html">
			    <div class='maintile'>
			        <i class="fa fa-building fa-3x cornericon"></i><br>
			        <div class="menuname">Stores</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="designations.html">
			    <div class='maintile'>
			        <i class="fa fa-graduation-cap fa-3x cornericon"></i><br>
			        <div class="menuname">Designations</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="employees.html">
			    <div class='maintile'>
			        <i class="fa fa-users fa-3x cornericon"></i><br>
			        <div class="menuname">Employees</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="accounts.html">
			    <div class='maintile'>
			        <i class="fa fa-folder fa-3x cornericon"></i><br>
			        <div class="menuname">Accounts</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="expensetypes.html">
			    <div class='maintile'>
			        <i class="fa fa-inr fa-3x cornericon"></i><br>
			        <div class="menuname">Expense Types</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="screeninglist.html">
			    <div class='maintile'>
			        <i class="fa fa-list-alt fa-3x cornericon"></i><br>
			        <div class="menuname">Screening List</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="network.html">
			    <div class='maintile'>
			        <i class="fa fa-share-alt fa-3x cornericon"></i><br>
			        <div class="menuname">Network</div>
			    </div>
			    </a>
			</div>
        </div>
        
        <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px; margin-top: 20px">
            <div class="col-md-12 col-sm-12 col-xs-12 headerbox">
                <i class="fa fa-bullhorn"></i> Promotion
            </div>
		    <div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="offers.html">
			    <div class='maintile'>
			        <i class="fa fa-heart fa-3x cornericon"></i><br>
			        <div class="menuname">Coupons</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="pages/tables/announcements.html">
			    <div class='maintile'>
			        <i class="fa fa-bullhorn fa-3x cornericon"></i><br>
			        <div class="menuname">Announcements</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="pages/tables/newsticker.html">
			    <div class='maintile'>
			        <i class="fa fa-newspaper-o fa-3x cornericon"></i><br>
			        <div class="menuname">News Ticker</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="pages/tables/bbanner.html">
			    <div class='maintile'>
			        <i class="fa fa-picture-o fa-3x cornericon"></i><br>
			        <div class="menuname">Banner Labels</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="pages/tables/banner.html">
			    <div class='maintile'>
			        <i class="fa fa-picture-o fa-3x cornericon"></i><br>
			        <div class="menuname">Banners</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="winners.html">
			    <div class='maintile'>
			        <i class="fa fa-hand-pointer-o fa-3x cornericon"></i><br>
			        <div class="menuname">Lucky Winners</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="pages/tables/luckyoffer.html">
			    <div class='maintile'>
			        <i class="fa fa-list-alt fa-3x cornericon"></i><br>
			        <div class="menuname">Lucky Offer</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="videos.html">
			    <div class='maintile'>
			        <i class="fa fa-video-camera fa-3x cornericon"></i><br>
			        <div class="menuname">Videos</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="faq.html">
			    <div class='maintile'>
			        <i class="fa fa-question-circle fa-3x cornericon"></i><br>
			        <div class="menuname">FAQ</div>
			    </div>
			    </a>
			</div>
        </div>
        
        <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px; margin-top: 20px">
            <div class="col-md-12 col-sm-12 col-xs-12 headerbox">
                <i class="fa fa-credit-card-alt"></i> eCommerce Configurations
            </div>
		    <div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="hdo.html">
			    <div class='maintile'>
			        <i class="fa fa-street-view fa-3x cornericon"></i><br>
			        <div class="menuname">Home Delivery Options</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="ihc.html">
			    <div class='maintile'>
			        <i class="fa fa-inr fa-3x cornericon"></i><br>
			        <div class="menuname">Internet Handling Charges</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="serviceareas.html">
			    <div class='maintile'>
			        <i class="fa fa-map-marker fa-3x cornericon"></i><br>
			        <div class="menuname">Service Areas</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="deliverytimezones.html">
			    <div class='maintile'>
			        <i class="fa fa-clock-o fa-3x cornericon"></i><br>
			        <div class="menuname">Time Zones</div>
			    </div>
			    </a>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="orders.html">
			    <div class='maintile'>
			        <i class="fa fa-line-chart fa-3x cornericon"></i><br>
			        <div class="menuname">Orders</div>
			    </div>
			    </a>
			</div>
        </div>
        
        <div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px; margin-top: 20px; padding-bottom: 50px">
            <div class="col-md-12 col-sm-12 col-xs-12 headerbox">
                <i class="fa fa-heart"></i> Corporate Social Responsibility
            </div>
		    <div class="col-md-3 col-sm-4 col-xs-6 tileholder">
			    <a href="csr.html">
			    <div class='maintile'>
			        <i class="fa fa-building fa-3x cornericon"></i><br>
			        <div class="menuname">CSR Organizations</div>
			    </div>
			    </a>
			</div>
		</div>
        
        <!--div class="col-md-12 col-sm-12 col-xs-12" style="padding: 0px; margin: 0px; margin-top: 20px">
			<div class="col-md-2 col-xs-6" style="border: 0px; padding: 3px; text-align: center">
			    <a data-toggle="tab" href="#home" style="color: #FFF">
			    <div style='padding: 10px; background: #431ecc'>
			        <i class="fa fa-line-chart"></i><br>
			        <small>Analytics</small>
			    </div>
			    </a>
			</div>
			<div class="col-md-2 col-xs-6" style="border: 0px; padding: 3px; text-align: center">
			    <a data-toggle="tab" href="#menu1" style="color: #FFF">
			    <div style='padding: 10px; background: #1ecc89'>
			        <i class="fa fa-money"></i><br>
			        <small>Cash Back</small>
			    </div>
			    </a>
			</div>
			<div class="col-md-2 col-xs-6" style="border: 0px; padding: 3px; text-align: center">
			    <a data-toggle="tab" href="#menu4" style="color: #FFF">
			    <div style='padding: 10px; background: #741ecc'>
			        <i class="fa fa-money"></i><br>
			        <small>Redeem</small>
			    </div>
			    </a>
			</div>
			<div class="col-md-2 col-xs-6" style="border: 0px; padding: 3px; text-align: center">
			    <a data-toggle="tab" href="#menu2" style="color: #FFF">
			    <div style='padding: 10px; background: #cca51e'>
			        <i class="fa fa-share-alt"></i><br>
			        <small>Network</small>
			    </div>
			    </a>
			</div>
			<div class="col-md-2 col-xs-6" style="border: 0px; padding: 3px; text-align: center">
			    <a data-toggle="tab" href="#menu3" style="color: #FFF">
			    <div style='padding: 10px; background: #cc1e60'>
			        <i class="fa fa-list-alt"></i><br>
			        <small>Screening List</small>
			    </div>
			    </a>
			</div>
			<div class="col-md-2 col-xs-6" style="border: 0px; padding: 3px; text-align: center">
			    <a data-toggle="tab" href="#menu5" style="color: #FFF">
			    <div style='padding: 10px; background: #1eccad'>
			        <i class="fa fa-building"></i><br>
			        <small>CSR Organizations</small>
			    </div>
			    </a>
			</div>
		</div>	
		<div class="col-md-12 col-xs-12" style="padding: 0px;">
			<div class="col-md-12 col-xs-12" style="padding: 0px;">
				<div class="col-md-12 col-xs-12 tab-content" style="margin-top: 10px; padding: 0px">
				    <div id="home" class="col-md-12 col-xs-12 tab-pane fade in active" style="padding: 0px">
					    
					</div>
					<div id="menu1" class="col-md-12 col-xs-12 tab-pane fade" style="padding: 0px">
						    
				    </div>
				    <div id="menu2" class="col-md-12 col-xs-12 tab-pane fade" style="padding: 0px">
				        <div class="col-md-4 col-xs-12" style='padding: 3px'>
				            <input type='text' class='form-control' id='nmobile' placeholder='Enter Mobile Number or Name'>
				        </div>
				        <div class="col-md-4 col-xs-12" style='padding: 3px'>
				            <button type='button' class='btn btn-success' onclick='viewnetworksearch()'><small>GET NETWORK</small></button>
				        </div>
				        <div class="col-md-12 col-xs-12" style='padding: 3px; display: none' id="netmsg">
				            Assign <span id="primarynum" style="font-weight: bold"></span><span id="primarydev" style="display: none; font-weight: bold"></span> under <span id="secondarynum" style="font-weight: bold"></span><span id="secondarydev" style="display: none; font-weight: bold"></span><span id="transfertype" style="display: none; font-weight: bold"></span>
				        </div>
				        <div class="col-md-12 col-xs-12" style='padding: 3px; display: none' id="btns">
				            <button class="btn btn-success" type="button" onclick="swapnow()"><small>SWAP</small></button><button class="btn btn-danger" type="button" style="margin-left: 5px" onclick="location.reload();"><small>RESET</small></button>
				        </div>
				        <div class="col-md-12 col-xs-12" id="nett" style="padding: 0px">
				          
				        </div>
					</div>
				    <div id="menu3" class="col-md-12 col-xs-12 tab-pane fade" style="padding: 0px">
				        <div class="col-md-4 col-xs-12">
				            <button class="btn btn-success" type="button" data-toggle="modal" data-target="#myModal">Add New Number</button>
				        </div>
				        <div class="col-md-12 col-xs-12" style="margin-top: 20px">
							<table class="table table-striped">
								<thead>
									<tr style="background: #333333; color: #FFFFFF">
										<th>#</th>
										<th>Phone Number</th>
										<th></th>
									</tr>
								</thead>
								<tbody id="screeninglist">
								</tbody>
							</table>
				        </div>
				    </div>
				    <div id="menu4" class="col-md-12 col-xs-12 tab-pane fade" style="padding: 0px">
					
				    </div>
				    <div id="menu5" class="col-md-12 col-xs-12 tab-pane fade" style="padding: 0px">
					    <div class="col-md-12 col-xs-12" style="padding: 0px; box-shadow: 3px 0px 5px #888888">
						    <div class="col-md-12 col-xs-12" style="padding: 10px;">
							    <div style="border-radius: 0.5em;">
								    <div class="table-responsive">  
    								    <div class="col-md-12 col-xs-12"></div>
                    					<button class="btn btn-danger" type="button" data-toggle="modal" data-target="#myModaladd">Add New</button>
                    				</div>
									<table class="table table-striped" style='margin-top: 20px'>
										<thead>
											<tr style="background: #333333; color: #FFFFFF">
												<th>Organisation Name</th>
												<th>Description</th>
												<th></th>
											</tr>
										</thead>
										<tbody id="organizations">
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
		</div-->
    </section>
    <footer id="footer" style="position: fixed; bottom: 0; z-index: 123456; background: #f7f5f5; padding: 5px 10px; right: 0; border-top-left-radius: 10px">
        <div class="pull-right" style="color: #c6c6c6">
          <b>All rights reserved</b> <span>v1.1.0, &copy; Copyrights: <a href="#" target="_blank" style="color: #c6c6c6">HMK Group</a></span>
        </div>
    </footer>
	<div style="width: 100%; text-align: center; position: fixed; z-index: 9998889; top: 250px; display:none" id="loader"><img src="loading.gif" style="margin-left: auto; margin-right: auto; width: 64px; height: auto"></div>
	<div id="myModal" class="modal fade" role="dialog">
	  <div class="modal-dialog">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title">Add Phone Number</h4>
		  </div>
		  <div class="modal-body">
			<input type="number" class="form-control" id="phnnumber">
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-success" onclick="screenadd();" data-dismiss="modal">Add</button>
		  </div>
		</div>
	  </div>
	</div>
	<div id="myModaladd" class="modal fade" role="dialog">
	  <div class="modal-dialog">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title">Add New Organization</h4>
		  </div>
		  <form id="uploadForm" action="https://poultrade.com/admin/admin/addorganization.php" method="POST">
		  <div class="modal-body">
			<label>Organization Name</label>
			<input type="text" class="form-control" id="orgname" name="orgname" placeholder="Organization Name" required><br>
			<label>Upload Baneer</label>
			<input type="file" class="form-control" name="userImage" required><br>
			<label>Description</label>
			<textarea class="form-control" id="orgdescription" name="orgdescription" style="height: 150px" placeholder="Organization Description"></textarea><br>
		  </div>
		  <div class="modal-footer">
			<button type="submit" class="btn btn-danger">Add</button>
		  </div>
		  </form>
		</div>
	  </div>
	</div>
	<div id="myModaledit" class="modal fade" role="dialog">
	  <div class="modal-dialog">
		<div class="modal-content">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title">Edit Organization</h4>
		  </div>
		  <form id="uploadForm1" action="https://poultrade.com/admin/admin/editorganization.php" method="POST">
		  <div class="modal-body">
			<label>Organization Name</label>
			<input type="text" class="form-control" id="eorgname" name="orgname" placeholder="Organization Name" required><br>
			<label>Upload Banner</label>
			<input type="file" class="form-control" name="userImage"><br>
			<label>Organization Description</label>
			<textarea class="form-control" id="eorgdescription" name="orgdescription" style="height: 150px" placeholder="Organization Description"></textarea><br>
			<input type="hidden" name="guid" id="guid">
		  </div>
		  <div class="modal-footer">
			<button type="submit" class="btn btn-danger">Update</button>
		  </div>
		  </form>
		</div>
	  </div>
	</div>
    <script src="sweetalert.min.js"></script>
    <script src="plugins/bootstrap/js/bootstrap.js"></script>
    <script src="plugins/jquery-slimscroll/jquery.slimscroll.js"></script>
    <script src="plugins/node-waves/waves.js"></script>
    <script src="plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
    <script src="plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>
    <script src="js/admin.js"></script>
    <script src="js/demo.js"></script>
</body>
</html>