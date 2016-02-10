<h1>Possible Matches</h1>
<ul>
<<<<<<< HEAD
	<?php foreach($matches as $match): ?>
	<li>
		<?= htmlentities($match['primary_city'])?>
		<?= htmlentities($match['state'])?>
		<?= htmlentities($match['zip'])?>
		<?= htmlentities($match['country'])?>
	</li>
	<?php endforeach; ?>
=======
    <?php foreach($matches as $match): ?>
    <li>
        <?= htmlentities($match['primary_city']) ?>,
        <?= htmlentities($match['state']) ?>
        <?= htmlentities($match['zip']) ?>
        <?= htmlentities($match['country']) ?>
    </li>
    <?php endforeach; ?>
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
</ul>