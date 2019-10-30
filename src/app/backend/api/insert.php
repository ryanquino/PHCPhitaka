<?php


require 'database.php';

// Get the posted data.
$postdata = file_get_contents('php://input');

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

   // Sanitize.

  $fullname = mysqli_real_escape_string($con, trim($request->fullname));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $contactNumber = mysqli_real_escape_string($con, trim($request->contactNumber));
  $username = mysqli_real_escape_string($con, trim($request->username));
  $password = mysqli_real_escape_string($con, trim($request->password));
  $password = md5($password);
/// Create.
  $sql = "INSERT INTO `tbl_appusers`(`id`,`fullname`,`email`,`contactnumber`,`username`,`password`) VALUES (null,'{$fullname}','{$email}','{$contactNumber}','{$username}','{$password}')";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $user = [
      'id'    => mysqli_insert_id($con),
      'fullname' => $fullname,
      'email' => $email,
      'contactnumber' => $contactNumber,
      'username' => $username,
      'password' => $password
    ];
    echo json_encode(['data' => $user]);
  }

}
?>