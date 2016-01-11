<?php
$randomNum = rand(0,100);
echo "Your new random number is {$randomNum}\n";
date_default_timezone_set("America/New_York");
$array = array();
for($i = 1; $i < 13; $i++) {
	$date = new DateTime("1-$i-2012");
	$a = $date->format('M');
	$array.array_push($array, $a);
}
?>
