<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Eclipse Mirror
		</title>
		<link rel="stylesheet" href="main.css">
		<link rel="stylesheet" href="widgets/weather-icons.min.css">
		<!-- fontawsom -->
		<link href="fontawesome-free-5.15.3-web/css/all.css" rel="stylesheet"> 
		<script defer src="fontawesome-free-5.15.3-web/js/all.js"></script> 
		<!-- load all widget css -->
		<?php 
			$path = 'widgets/css/';
			if ($handle = opendir($path)) {
				while (false !== ($entry = readdir($handle))) {
					if ($entry != "." && $entry != "..") {
						echo '<link rel="stylesheet" href="'.$path. $entry. '">';
					}
				}
				closedir($handle);
			}
		?>
	</head>
	<body>
		<div id="gridlayout" style="opacity:0">
		</div>
	</body>
	<script src="main.js"></script>
	<?php 
			$path = 'widgets/js/';
			if ($handle = opendir($path)) {
				while (false !== ($entry = readdir($handle))) {
					if ($entry != "." && $entry != "..") {
						echo '<script src="'.$path. $entry. '"></script>';
					}
				}
				closedir($handle);
			}
		?>
</html>