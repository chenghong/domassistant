<?php

	$frameworks = parse_ini_file('config.ini', true);
	$selectors = file_get_contents('selectors.list');

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>SlickSpeed Selectors Test</title>
	<link rel="stylesheet" href="style.css" type="text/css" media="screen">
	
	<script type="text/javascript">
		<?php
		$selectors = explode("\n", $selectors);
		foreach ($selectors as $i => $selector) $list[$i] = "'".$selector."'";
		$list = implode(',', $list);
		echo "window.selectors = [$list]";
		?>
	</script>
	
	<script src="system/slickspeed.js" type="text/javascript"></script>
</head>

<body>
	
<div id="container">
	
	<div id="controls">
		<a class="stop" href="#">stop tests</a>
		<a class="start" href="#">start tests</a>
	</div>
	
<?php include('header.html'); ?>

<?php
	foreach ($frameworks as $framework => $properties){
		$include = $properties['file'];
		$function = $properties['function'];
		$time = time();
		echo "<iframe name='$framework' src='system/template.php?include=$include&function=$function&nocache=$time'></iframe>\n\n";
	}
?>

<table>

	<thead id="thead">
		<tr>
			<th class="selectors-title">selectors</th>
			<?php
				foreach ($frameworks as $framework => $properties){
					echo "<th class='framework'>$framework</th>";
				}
			?>
		</tr>
	</thead>

	<tbody id="tbody">
		<?php
			foreach ($selectors as $selector){
				echo "<tr>";
				$selector = str_replace('%', '', $selector);
				echo "<th class='selector'>$selector</th>";
				foreach ($frameworks as $framework){
					echo "<td class='empty'></td>";
				}
				echo "</tr>";
			}
		?>
	</tbody>
	
	<tfoot id="tfoot">
		<tr>
		<th class="score-title"><strong>final time (less is better)</strong></th>
		<?php
			foreach ($frameworks as $framework){
				echo "<td class='score'>0</td>";
			}
		?>
		</tr>
	</tfoot>

</table>

<h2>Legend</h2>

<table id="legend">

	<tr>
		<th>the faster</th>
		<th>the slower</th>
		<th>exception thrown or zero elements found</th>
		<th>different returned elements</th>
	</tr>

	<tr>
		<td class="good"></td>
		<td class="bad"></td>
		<td class="exception"></td>
		<td class="mismatch"></td>
	</tr>

</table>

<?php include('footer.html'); ?>
</div>

<!-- Start of StatCounter Code -->
<script type="text/javascript">
var sc_project=3425794; 
var sc_invisible=1; 
var sc_partition=38; 
var sc_security="444c2d95"; 
</script>

<script type="text/javascript" src="http://www.statcounter.com/counter/counter_xhtml.js"></script><noscript><div class="statcounter"><a href="http://www.statcounter.com/"><img class="statcounter" src="http://c39.statcounter.com/3425794/0/444c2d95/1/" alt="website tracker" ></a></div></noscript>
<!-- End of StatCounter Code -->

<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
var pageTracker = _gat._getTracker("UA-56164-5");
pageTracker._initData();
pageTracker._trackPageview();

</script>

</body>
</html>