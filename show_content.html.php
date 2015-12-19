<!-- View for Node Content Data -->

<h1>
	<?php htmlout($nodeContent->title); ?>
	<?php if($contentOwner && !$editing): ?><button>Edit</button><?php endif; ?>
</h1>

<p><?php htmlout($nodeContent->description); ?></p>

<br>

<?php if(count($nodeContent->courses) > 0 || $editing): ?>
	<h2>Courses</h2>
	<ul>
		<?php foreach($nodeContent->courses as $value): ?>
	    	<li><?php htmlout($value); ?></li>
	    <?php endforeach; ?>
	</ul>
	<br>
<?php endif; ?>

<?php if(count($nodeContent->books) > 0 || $editing): ?>
	<h2>Books</h2>
	<ul>
		<?php foreach($nodeContent->books as $value): ?>
	    	<li><?php htmlout($value); ?></li>
	    <?php endforeach; ?>
	</ul>
	<br>
<?php endif; ?>

<?php if(count($nodeContent->sites) > 0 || $editing): ?>
	<h2>Sites</h2>
	<ul>
		<?php foreach($nodeContent->sites as $value): ?>
	    	<li><a href="<?php htmlout($value); ?>"><?php htmlout($value); ?></a></li>
	    <?php endforeach; ?>
	</ul>
	<br>
<?php endif; ?>

<?php if($nodeContent->notes != "" || $editing): ?>
	<h2>Notes</h2>
	<p><?php htmlout($nodeContent->notes); ?></p>
<?php endif; ?>