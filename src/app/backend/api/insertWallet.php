<?php


require 'database.php';

// Get the posted data.
$postdata = file_get_contents('php://input');

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

   // Sanitize.
  $walletAddress = mysqli_real_escape_string($con, trim($request->walletAddress));
  $privateKey = mysqli_real_escape_string($con, trim($request->privateKey));
  $privateKey = md5($privateKey);
/// Create.
  $sql = "INSERT INTO `tbl_blockchain`(`id`,`userId`,`walletAddress`,`privateKey`) VALUES (null, LAST_INSERT_ID(),'{$walletAddress}','{$privateKey}')";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $blockchain = [
      'id'    => mysqli_insert_id($con),
      'walletAddress' => $walletAddress,
      'privateKey' => $privateKey,

    ];
    echo json_encode(['data' => $blockchain]);
  }

}
?>