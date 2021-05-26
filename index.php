<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
		<link rel="stylesheet" href="main.css">
		<?php 
			// load all widget css
			$path = 'widgets/css/';
			if ($handle = opendir($path)) {
				while (false !== ($entry = readdir($handle))) {
					if ($entry != "." && $entry != "..") {
						include $path. $entry;
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