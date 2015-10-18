<?php

class Auth
{
	public $salt	= '&7&4.$a#^H^&3_5';

	public function __construct()
	{
		require_once 'mysqlinfo.php';
		$db_server = mysql_connect($db_hostname, $db_username, $db_password);
		if (!$db_server) die($error = 1);
		
		mysql_select_db($database) or die($error = 1);
	}

	public function sanitizeString($var)
	{
		$var = addslashes($var);
		$var = htmlentities($var);
		$var = strip_tags($var);
		
		return $var;
	}

	public function checkPassword($email, $password){
		$query = " SELECT COUNT(*) as result, user_type, user_id as id
					FROM user_auth
					WHERE username = '$email'
					AND password = '$password'
					";
		$result = mysql_query($query);

		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function getUserDetails($id){
		$query = "	SELECT first_name, last_name, city, state, country
					FROM user_details
					WHERE user_id = $id
					";
		$result = mysql_query($query);

		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function getFamily($id){
		$query = "	SELECT sub_user_id as child_id, first_name, last_name
					FROM relations
					WHERE user_id = $id
					";
		$result = mysql_query($query);

		if(!$result)
			die(mysql_error());
		return $result;
	}
	public function checkIfDatePresent($id, $date){
		$query = "	SELECT count(*) as result
					FROM attendance
					WHERE user_id = $id and date = '$date'
					";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}
	public function insertAttendance($id, $date, $start_time, $end_time, $media){
		$query = "	INSERT INTO attendance
					VALUES
					($id, '$date', '$start_time', '$end_time', '$media')
					";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}
	public function updateAttendance($id, $date, $start_time, $end_time, $media){

		$query = "	UPDATE attendance
					SET user_id = $id,
					date = '$date',
					start_datetime = '$start_time',
					end_datetime = '$end_time',
					media = '$media'
					WHERE user_id = $id AND
					date = '$date'
					";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

    public function debug_to_console( $data ) {

        if ( is_array( $data ) )
            $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
        else
            $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

        echo $output;
    }

    public function getMultiAttendance($start_day, $end_day){
        $query = "	select first_name, last_name, city, state, country, relation, a.date, time(a.start_datetime), time(a.end_datetime)
                    from
                    (
                      select sub_user_id as user_id, r.first_name, r.last_name, d.city, d.state, d.country, concat(r.relation, ' of ', d.first_name, ' ', d.last_name) as relation
                      from relations r
                      join user_details d
                      on(r.user_id = d.user_id)
                      UNION
                      select user_id, first_name, last_name, city, state, country, '' as relation
                      from user_details
                    ) users
                    join
                    attendance a
                    on(users.user_id = a.user_id)
                    where a.date between '$start_day' and '$end_day'
                    order by a.date, last_name
				";
        $result = mysql_query($query);
        if(!$result)
            die(mysql_error());
        return $result;
    }

    public function getSingleAttendance($day){
        $query = "
                    select first_name, last_name, city, state, country, relation, a.date, time(a.start_datetime), time(a.end_datetime)
                    from
                    (
                      select sub_user_id as user_id, r.first_name, r.last_name, d.city, d.state, d.country, concat(r.relation, ' of ', d.first_name, ' ', d.last_name) as relation
                      from relations r
                      join user_details d
                      on(r.user_id = d.user_id)
                      UNION
                      select user_id, first_name, last_name, city, state, country, '' as relation
                      from user_details
                     ) users
                     join
                     attendance a
                     on(users.user_id = a.user_id)
                     where a.date = '$day'
                     order by last_name
                ";
        $result = mysql_query($query);
        if(!$result)
            die(mysql_error());
        return $result;
    }
}