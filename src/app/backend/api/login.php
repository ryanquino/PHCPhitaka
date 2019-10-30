<?php


require 'database.php';

// Get the posted data.
$postdata = file_get_contents('php://input');

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

   // Sanitize.
  $username = mysqli_real_escape_string($con, trim($request->username));
  $password = mysqli_real_escape_string($con, trim($request->password));
  $password = md5($password);
/// Create.
  $sql = "SELECT id, fullname from `tbl_appusers` where username = '{$username}' and password = '{$password}'";

  $result = mysqli_query($con,$sql);
  $row = mysqli_fetch_assoc($result);
  if($result)
  {
    $count = mysqli_num_rows($result);
    if($count == 1){
      http_response_code(201);
      $login = [
        'status' => true,
        'id' => $row['id'],
        'fullname' => $row['fullname'],
      ];
    echo json_encode(['data' => $login]);
    }
    else
    {
      $login = [
        'status' => false,
      ];
    echo json_encode(['data' => $login]);
    }
    
  }

}
?>