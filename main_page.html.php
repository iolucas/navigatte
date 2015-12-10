
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
        <title>Navigatte</title>  
        <style>
            @import url(https://fonts.googleapis.com/css?family=Ubuntu);

            html, body {
                margin: 0;
                font-family: "Ubuntu";
                height: 100%;
            }   

            body {
                background: linear-gradient(180deg, rgba(15,70,0,.8), rgba(240,240,240,.8), rgba(15,70,130,.8));
                background-size: cover;
                background-repeat: no-repeat;
                text-align: center;
            }

            input[type="text"], input[type="password"] {
                padding-left: 10px;
                margin-bottom: 5px;
                font-size: 20px;
                height: 30px;
                line-height: 30px;
            }

            input[type="submit"] {
                font-size: 20px;
                height: 40px;
                line-height: 40px;
            }

            div {
                color: #fff;
                text-align: center;
                font-size: 80px;
                margin-bottom: 50px;
            }

        </style>
	</head>

	<body>
        <div>Navigatte</div><br>
        <form method="post">
            <input type="hidden" name="action" value="signin">
            <input type="text" name="username" placeholder="Username"><br>
            <input type="password" name="password" placeholder="Password"><br><br>
            <?php if (isset($loginError)): ?>
            <p><?php htmlout($loginError); ?></p>
            <?php endif; ?>
            <input type="submit" value="Sign In"><br>
        </form>
	</body>
</html>