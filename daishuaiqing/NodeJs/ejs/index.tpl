
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>模板引擎</title>
</head>
<body>
 
  <h1><%= username %></h1>
  <ul>
    <% colums.forEach(function(item){ %>
        <li>姓名：<%= item.name %></li>
        <li>性别：<%= item.sex %></li>
        <li>年龄：<%= item.age %></li>
    <% }) %>
  </ul>
  
</body>
</html>