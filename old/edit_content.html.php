<!-- View for Node Content Data -->

<div>
	
	<button ng-if="!editing" ng-click="edit()">Edit</button>
	<br>

	<h1>{{ content.title }}</h1>
	<p>{{ content.description }}</p>
	<br>

	<div ng-if="content.courses.length > 0 || editing">
		<h2>Courses</h2>
			<form ng-if="editing" ng-submit="addItem(content.courses, newCourse)">
				<input type="text" ng-model="newCourse" size="30" placeholder="Course name...">
				<input type="submit" value="Insert">
			</form>
		<ul>
			<li ng-repeat="course in content.courses">
				{{ course }}
				<button ng-if="editing" ng-click="removeItem(content.courses, $index)">Delete</button>
			</li>
		</ul>
		<br>
	</div>

	<div ng-if="content.books.length > 0 || editing">
		<h2>Books</h2>
			<form ng-if="editing" ng-submit="addItem(content.books, newBook)">
				<input type="text" ng-model="newBook" size="30" placeholder="Book title...">
				<input type="submit" value="Insert">
			</form>
		<ul>
			<li ng-repeat="book in content.books">
				{{ book }}
				<button ng-if="editing" ng-click="removeItem(content.books, $index)">Delete</button>
			</li>
		</ul>
		<wr>
	</div>

	<div ng-if="content.sites.length > 0 || editing">
		<h2>Sites</h2>
			<form ng-if="editing" ng-submit="addItem(content.sites, newSite)">
				<input type="text" ng-model="newSite" size="30" placeholder="Site address...">
				<input type="submit" value="Insert">
			</form>
		<ul>
			<li ng-repeat="site in content.sites">
				{{ site }}
				<button ng-if="editing" ng-click="removeItem(content.sites, $index)">Delete</button>
			</li>
		</ul>
		<br>   
	</div>

	<div ng-if="content.notes != '' || editing">
		<h2>Notes</h2>
		<p ng-if="!editing">{{ content.notes }}</p>
		<input ng-if="editing" type="text" ng-model="content.notes">
	</div>

	<div ng-if="editing">
		<button ng-click="save()">Save</button>

	</div>

<div>






<!--<!DOCTYPE html>
<html ng-app="todoApp">
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script>
	angular.module('todoApp', [])
		.controller('TodoListController', function($scope) {
			
			/*var todoList = this;

			todoList.todos = [
				{text:'learn angular', done:true},
				{text:'build an angular app', done:false}
			];

			todoListy.addTodo = function() {
				todoList.todos.push({text:todoList.todoText, done:false});
				todoList.todoText = '';
			};

			todoList.remaining = function() {
				var count = 0;
				angular.forEach(todoList.todos, function(todo) {
					count += todo.done ? 0 : 1;
				});
				return count;
			};

			todoList.archive = function() {
				var oldTodos = todoList.todos;
				todoList.todos = [];
				angular.forEach(oldTodos, function(todo) {
					if (!todo.done) 
						todoList.todos.push(todo);
				});
			};*/
		});


    </script>
  </head>
  <body>
  	<h1>Title</h1>

    <h2>Todo</h2>
    <div ng-controller="TodoListController as todoList">
      <span>{{todoList.remaining()}} of {{todoList.todos.length}} remaining</span>
      [ <a href="" ng-click="todoList.archive()">archive</a> ]
      <ul class="unstyled">
        <li ng-repeat="todo in todoList.todos">
          <input type="checkbox" ng-model="todo.done">
          <span class="done-{{todo.done}}">{{todo.text}}</span>
        </li>
      </ul>
      <form ng-submit="todoList.addTodo()">
        <input type="text" ng-model="todoList.todoText"  size="30"
               placeholder="add new todo here">
        <input class="btn-primary" type="submit" value="add">
      </form>
    </div>
  </body>
</html>-->









<!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js">
<script>

	/*CHECK WHETHER USE ANGULAR JS FOR THIS PART OR JUST USE REGULAR D3
	WE WILL STORE CONTENT NODE AT JSON STRINGS ON EACH NODE FOR DEMONSTRATION PURPOSES

	WE WILL HANDLE THE DATA EXIBITION BY JAVASCRIPT SINCE IT WILL BE STORE AS JSON FILES*/

</script>

<h1><?php htmlout($nodeContent->title); ?></h1>
<p><?php htmlout($nodeContent->description); ?></p>
<br>

	<h2>Courses</h2>
	<input type="text" placeholder="Course name..." /><button>Insert</button>
	<ul>
		<?php foreach($nodeContent->courses as $value): ?>
	    	<li><?php htmlout($value); ?></li>
	    <?php endforeach; ?>
	</ul>
	<br>

	<h2>Books</h2>
	<input type="text" placeholder="Book name..." /><button>Insert</button>
	<ul>
		<?php foreach($nodeContent->books as $value): ?>
	    	<li><?php htmlout($value); ?></li>
	    <?php endforeach; ?>
	</ul>
	<br>

	<h2>Sites</h2>
	<input type="text" placeholder="Site address..." /><button>Insert</button>
	<ul>
		<?php foreach($nodeContent->sites as $value): ?>
	    	<li><a href="<?php htmlout($value); ?>"><?php htmlout($value); ?></a></li>
	    <?php endforeach; ?>
	</ul>
	<br>

<?php if($nodeContent->notes != ""): ?>
	<h2>Notes</h2>
	<p><?php htmlout($nodeContent->notes); ?></p>
<?php endif; ?>-->