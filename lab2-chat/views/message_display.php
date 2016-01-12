<h1>Possible Matches</h1>
<ul>
	<?php foreach($messages as $message): ?>
	<li>
		<?= htmlentities($message['nickname'])?>
		<?= htmlentities($message['content'])?>
	</li>
	<?php endforeach; ?>
</ul>
