<!DOCTYPE html>

<html>
<head>
	<title></title>
	<style>
	html,body {
		height: 100%;
		margin: 0;
	}

	table,td,tr {
		border: 0px solid #000;
	}

	table {

		height: 500px;
	}

	</style>
</head>
<body>
	<table>
		<tr>
			<td style="width:300px;">
				<div style="background-color:blue;height:40px;width:300px;"></div>
			</td>
			<td id="center" style="text-align:center;width:100%;">
				<div style="background-color:blue;height:40px;width:500px;display:inline-block;"></div>
			</td>
			<td id="right" style="width:300px;">
				<div style="background-color:blue;height:40px;width:300px;"></div>
			</td>

		</tr>

	</table>
	<button onclick="toggle();">Toggle</button>

<script>
	var toggled = false;

	function toggle() {
		document.getElementById("center").style.display = toggled ? "none" : "";
		document.getElementById("right").style.display = toggled ? "none" : "";

		toggled = !toggled;
	}

</script>

</body>
</html>


