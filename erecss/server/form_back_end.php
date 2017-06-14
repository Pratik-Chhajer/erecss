<?php

	$data = new stdClass();
	$data->error = "true";

	if(isset($_POST['submit'])){
		require_once('dbConnect.php');

		$email = $_POST['email'];
		$C = json_decode($_POST['C']);

		$sql = "SELECT * FROM users_info WHERE email_id = '$email'";
		$res = mysqli_query($con,$sql);

		if(!($row = $res->fetch_assoc())){
			$data->new_user = "true";
			$sql = "INSERT INTO users_info(email_id) VALUES ('$email')";
			$res = mysqli_query($con,$sql);
		}
		else{
			$data->new_user = "false";
		}

		$sql = "SELECT * FROM users_info WHERE email_id = '$email'";
		$res = mysqli_query($con,$sql);

		$row = $res->fetch_assoc();
		$user_id = $row["id"];

		$data->a = "out";
		for($i=0;$i<sizeof($C);$i++){
			$sql = "SELECT * FROM sub_category WHERE name = '$C[$i]'";
			$res = mysqli_query($con,$sql);
			if($res){
				$data->a = "in";
				$row = $res->fetch_assoc();
				$c1_c_id = $row["category_id"];
				$c1_s_id = $row["id"];
				$data->x = $c1_c_id;
				$data->y = $c1_s_id;

				$sql = "SELECT * FROM users_choice WHERE sub_category_id = $c1_s_id AND user_id = $user_id";
				$res = mysqli_query($con,$sql);
				if($res){
					if(!($res->fetch_assoc())){
						$data->b = "here";
						$sql = "INSERT INTO users_choice(category_id,sub_category_id,user_id) VALUES ($c1_c_id,$c1_s_id,$user_id)";
						$res = mysqli_query($con,$sql);
					}
				}
			}
		}

	}
	else{
	    $data->error = "Error in input";
	}

	echo json_encode($data);

?>

