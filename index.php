<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
		<link rel="stylesheet" href="main.css">
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
		<div class="gridlayout">
			<?php 
				// load all widgets html
				$path = 'widgets/design/';
				if ($handle = opendir($path)) {
					while (false !== ($entry = readdir($handle))) {
						if ($entry != "." && $entry != "..") {
							$entryClassName = basename($entry, '.html');
							echo "<div class='".$entryClassName."'>";
								include $path. $entry;
							echo "</div>";
						}
					}
					closedir($handle);
				}
			?>
		</div>
	</body>
</html>