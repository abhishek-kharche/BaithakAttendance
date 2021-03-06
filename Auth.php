<?php
if(!isset($_COOKIE['loggedin'])){
	header("location:index.php");
}
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
		$query = "	SELECT first_name, last_name, city, state, country, preferred_time
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
		if($result){
			return "1";
		}else {
			die(mysql_error());
		}

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
		if($result){
			return "1";
		}else {
			die(mysql_error());
		}
	}

    public function debug_to_console( $data ) {

        if ( is_array( $data ) )
            $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
        else
            $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

        echo $output;
    }

    public function getMultiAttendance($start_day, $end_day){
        $query = "	select first_name as 'First Name', last_name as 'Last Name', city as 'City', state as 'State', country as 'Country' , a.date as 'Date', time(a.start_datetime) as 'From', time(a.end_datetime) as 'To', relation as 'Relation'
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
                    select first_name as 'First Name', last_name as 'Last Name', city as 'City', state as 'State', country as 'Country' , a.date as 'Date', time(a.start_datetime) as 'From', time(a.end_datetime) as 'To', relation as 'Relation'
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

	public function getAll(){
		$query = "
					select ud.first_name as 'First Name', ud.middle_name as 'Middle Name', ud.last_name as 'Last Name', ud.city as 'City', ud.state as 'State', ud.country as 'Country', ua.username as 'Email Id', '' as 'Relation'
					from user_details ud
					join user_auth ua
					on(ud.user_id = ua.user_id)
					UNION
					select r.first_name as 'First Name', r.middle_name as 'Middle Name', r.last_name as 'Last Name', ud.city as 'City', ud.state as 'State', ud.country as 'Country', '' as 'Emaild Id', concat(r.relation, ' of ', ud.first_name, ' ', ud.last_name) as 'Relation'
					from relations r
					join user_details ud
					on (ud.user_id = r.user_id)
					order by 3,7 DESC,4,5;
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function addUser($first, $middle, $last, $city, $state, $country, $emailId, $pwd, $type){
		$query = "
				insert into users
				(date_of_join)
				values(now());
				";
		$addQuery = "
				insert into user_details
				values((select max(user_id) from users), '$first', '$middle', '$last', '$city', '$state', '$country', null);
				";
		if(!isset($type)){
			$type = 0;
		}
		$slt = $this->salt;
		$addUserAuthQuery = "
				insert into user_auth
				values ((select max(user_id) from users), '$emailId', SHA1(concat(MD5('$pwd'),'$slt')), $type);
				";
		$result = mysql_query($query);
		if($result){
			$addResult = mysql_query($addQuery);
			if($addResult){
				if(strlen($emailId) > 0 && strlen($pwd) > 0) {
					$addUserAuth = mysql_query($addUserAuthQuery);
					if ($addUserAuth) {
						$returnQuery = "
										select first_name, middle_name, last_name, city, state, country, username, '****' as password, user_type
										from user_details ud
										join user_auth ua
										on(ud.user_id = ua.user_id)
										where ud.user_id =
										(select max(user_id)
										from users);
										";
						$returnresult = mysql_query($returnQuery);
						if(!$returnresult)
							die(mysql_error());
						return $returnresult;
						//return $addUserAuth;
					} else {
						//return $addUserAuth;
						die(mysql_error());
					}
				}else{
					return $addResult;
				}
			}else{
				//return $addResult;
				die(mysql_error());
			}
		}else{
			//return $result;
			die(mysql_error());
		}
	}

	public function addRelation($first, $middle, $last, $rel, $uid){
		$query="
				insert into users
				(date_of_join)
				values(now());
				";
		$addQuery = "
					insert into relations
					values ((select max(user_id) from users), $uid, '$first', '$middle', '$last', '$rel' )
					";
		$result = mysql_query($query);
		if($result){
			$addResult = mysql_query($addQuery);
			if($addResult){
				//return $addResult;
				$returnQuery = "
								select r.first_name, r.middle_name, r.last_name, concat(r.relation, ' of ', ud.first_name, ' ' , ud.last_name) as relation
								from relations r
								join user_details ud
								on (r.user_id = ud.user_id)
								where r.sub_user_id =
								(select max(user_id)
								from users);
								";
				$returnresult = mysql_query($returnQuery);
				if(!$returnresult)
					die(mysql_error());
				return $returnresult;
			}else{
				//return $addResult;
				die(mysql_error());
			}
		}else{
			//return $result;
			die(mysql_error());
		}
	}

	public function updateUser($first, $middle, $last, $city, $state, $country, $emailId, $pwd, $type, $uid){
		$query = "
				update user_details					-- do not update if any of the infomraiton is not provided
				set first_name = '$first',
				middle_name = '$middle',
				last_name = '$last',
				city = '$city',
				state = '$state',
				country = '$country'
				where user_id = $uid;
				";
		$result = mysql_query($query);
		$slt = $this->salt;
		$updateAuthQuery = "
							update user_auth
							set username = '$emailId',
							user_type = $type
							where user_id = $uid;
							";
		$updatePasswordQuery = "
								update user_auth
								set password = SHA1(concat(MD5('$pwd'),'$slt'))
								where user_id = $uid;
								";
		if($result){
			if(strlen($emailId) > 0 && strlen($pwd) > 0) {
				$updateUserAuth = mysql_query($updateAuthQuery);
				if($updateUserAuth){
					//return $updateUserAuth;
					if(strlen($pwd) != 0) {
						$pwdResult = mysql_query($updatePasswordQuery);
						if (!$pwdResult)
							die(mysql_error());
					}
					$returnQuery = "
									select first_name, middle_name, last_name, city, state, country, username, '****' as password, user_type
									from user_details ud
									join user_auth ua
									on(ud.user_id = ua.user_id)
									where ud.user_id = $uid;
									";
					$returnresult = mysql_query($returnQuery);
					if(!$returnresult)
						die(mysql_error());
					return $returnresult;
				}else{
					//return $updateUserAuth;
					die(mysql_error());
				}
			}else{
				return $result;
			}
		}else{
			//return $result;
			die(mysql_error());
		}

	}

	public function updateRelation($first, $middle, $last, $rel, $uid){
		$query = "
				update relations
				set first_name = '$first',
				middle_name = '$middle',
				last_name = '$last',
				relation = '$rel'
				where sub_user_id = $uid;
				";
		$result = mysql_query($query);
		if($result){
			$returnQuery = "
							select r.first_name, r.middle_name, r.last_name, concat(r.relation, ' of ', ud.first_name, ' ' , ud.last_name) as relation
							from relations r
							join user_details ud
							on(r.user_id = ud.user_id)
							where r.sub_user_id = $uid;
							";
			$returnresult = mysql_query($returnQuery);
			if(!$returnresult)
				die(mysql_error());
			return $returnresult;
		}else {
			die(mysql_error());
		}
	}

	public function findUser($first, $last){
		$query = "
				select ud.first_name, ud.middle_name, ud.last_name, ud.city, ud.state, ud.country, ua.username, ua.user_type, ud.user_id
				from user_details ud
				join user_auth ua
				on(ud.user_id=ua.user_id)
				where ud.first_name = '$first'
				and ud.last_name = '$last';
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function findRelation($first, $last){
		$query = "
				select r.first_name, r.middle_name, r.last_name, ud.city, ud.state, ud.country, concat(r.relation, ' of ', ud.first_name, ' ' , ud.last_name) as relation, r.sub_user_id as user_id
				from relations r
				join user_details ud
				on (r.user_id = ud.user_id)
				where r.first_name = '$first'
				and r.last_name = '$last';
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function deleteUser($uid){
		$query = "
				insert into deleted_users
				(user_id, first_name, middle_name, last_name, city, state, country, username, user_type, date_of_delete)
				select ud.user_id, first_name, middle_name, last_name, city, state, country, username, user_type, now()
				from user_details ud
				join user_auth ua
				on(ud.user_id = ua.user_id)
				where ud.user_id = $uid;
				";
		$result = mysql_query($query);
		if($result){
					$deleteUDQuery = "
									delete from user_details
									where user_id = $uid;
									";
					$deleteUAQuery = "
									delete from user_auth
									where user_id = $uid;
									";
					#$deleteRQuery = "
					#				delete from relations
					#				where user_id = $uid;
					#				";
					$resultUD = mysql_query($deleteUDQuery);
					if(!$resultUD)
						die(mysql_error());
					$resultUA = mysql_query($deleteUAQuery);
					if(!$resultUA)
						die(mysql_error());
					#$resultR = mysql_query($deleteRQuery);
					#if(!$resultR)
					#	die(mysql_error());
					$deletedUsersQuery = "
										select * from deleted_users
										where user_id = $uid;
										";
					$resultMoved = mysql_query($deletedUsersQuery);
					if(!$resultMoved)
						die(mysql_error());
					return $resultMoved;
		}else{
			die(mysql_error());
		}
	}

	public function deleteRelationOfUser($uid){
		$query = "
				insert into deleted_users
				select r.sub_user_id, r.first_name, r.middle_name, r.last_name, ud.city, ud.state, ud.country, '', 0, now()
				from relations r
				join user_details ud
				on (r.user_id = ud.user_id)
				where r.user_id = $uid;
				";
		$result = mysql_query($query);
		if($result){
			$deleteQuery = "
							delete from relations
							where user_id = $uid;
							";
			$resultD = mysql_query($deleteQuery);
			if(!$resultD)
				die(mysql_error());
			return $resultD;
		}else{
			die(mysql_error());
		}
	}

	public function findUserRelation($uid){
		$query = "
				select first_name, last_name
				from relations
				where user_id = $uid;
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function deleteRelation($suid){
		$query = "
				insert into deleted_users
				select r.sub_user_id, r.first_name, r.middle_name, r.last_name, ud.city, ud.state, ud.country, '', 0, now()
				from relations r
				join user_details ud
				on (r.user_id = ud.user_id)
				where r.sub_user_id = $suid;
				";
		$result = mysql_query($query);
		if($result){
			$deletedQuery = "
							delete from relations
							where sub_user_id = $suid;
							";
			$deleteResult = mysql_query($deletedQuery);
			if($deleteResult){
				$deletedUserQuery = "
									select first_name, middle_name, last_name
									from deleted_users
									where user_id = $suid;
									";
				$deletedUserResult = mysql_query($deletedUserQuery);
				if(!$deletedUserResult)
					die(mysql_error());
				return $deletedUserResult;
			}else{
				die(mysql_error());
			}
		}else{
			die(mysql_error());
		}
	}

	public function registerUser($uid, $first, $middle, $last, $city, $state, $country){
		$query = "
				insert into user_details
				values($uid, '$first', '$middle', '$last', '$city', '$state', '$country', null);
				";
		$result = mysql_query($query);
		if($result){
					$newAddedUserQuery = "
										select * from user_details
										where user_id = $uid;
										";
					$newAddedUserResult = mysql_query($newAddedUserQuery);
					if(!$newAddedUserResult)
						die(mysql_error());
					return $newAddedUserResult;
		}else{
			die(mysql_error());
		}
	}

	public function findUserByUser($uid){
		$query = "
				select * from user_details
				where user_id = $uid;
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function findRelationByUser($suid){
		$query = "
				select * from relations
				where sub_user_id = $suid;
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function updateUserByUser($uid, $first, $middle, $last, $city, $state, $country){
		$query = "
				update user_details
				set first_name = '$first',
				middle_name = '$middle',
				last_name = '$last',
				city = '$city',
				state = '$state',
				country = '$country'
				where user_id = $uid;
				";
		$result = mysql_query($query);
		if($result){
			$returnQuery = "
							select * from user_details
							where user_id = $uid;
							";
			$returnresult = mysql_query($returnQuery);
			if(!$returnresult)
				die(mysql_error());
			return $returnresult;
		}else{
			die(mysql_error());
		}
	}

	public function updateRelationByUser($suid, $first, $middle, $last, $relation){
		$query = "
				update relations
				set first_name = '$first',
				middle_name = '$middle',
				last_name = '$last',
				relation = '$relation'
				where sub_user_id = $suid;
				";
		$result = mysql_query($query);
		if($result){
			$returnQuery = "
							select * from relations
							where sub_user_id = $suid;
							";
			$returnresult = mysql_query($returnQuery);
			if(!$returnresult)
				die(mysql_error());
			return $returnresult;
		}else{
			die(mysql_error());
		}
	}

	public function generateToken($email){
		$slt = $this->salt;
		$query = "
				insert into tokens
				(username, token, timestamp)
				values('$email', SHA1(concat(MD5(concat('$email', '$slt')), now())), now());
				";
		$result = mysql_query($query);
		if($result){
				$returnQuery = "
						select * from tokens
						where tid =
						(select max(tid)
						from tokens);
						";
				$returnResult = mysql_query($returnQuery);
				if(!$returnResult)
					die(mysql_error());
				return $returnResult;
		}else{
			die(mysql_error());
		}
	}

	public function checkEmail($email){
		$query = "
				select count(*) as result
				from user_auth
				where username = '$email';
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function getInvalidSundays($year, $month){
		$query = "
				select date
				from dates
				where extract(YEAR from date) = '$year'
				and extract(month from date) = '$month'
				and status = 0
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function getAdditionalDays($year, $month){
		$query = "
				select date
				from dates
				where extract(YEAR from date) = '$year'
				and extract(month from date) = '$month'
				and status = 1
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function insertDateEntry($newDate, $val){
		$query = "
				insert into dates
				values('$newDate', $val);
				";
		$result = mysql_query($query);
		if($result){
			$returnQuery = "
						select count(*) as result
						from dates
						where date = '$newDate';
						";
			$returnResult = mysql_query($returnQuery);
			if(!$returnResult)
				die(mysql_error());
			return $returnResult;
		}else{
			die(mysql_error());
		}
	}

	public function checkDateInDates($date){
		$returnQuery = "
						select count(*) as result
						from dates
						where date = '$date';
						";
		$returnResult = mysql_query($returnQuery);
		if(!$returnResult)
			die(mysql_error());
		return $returnResult;
		//return $returnQuery;
	}

	public function deleteDateEntry($deleteDate){
		$query = "
				delete from dates
				where date = '$deleteDate'
				";
		$result = mysql_query($query);
		if($result){
			$returnQuery = "
						select count(*) as result
						from dates
						where date = '$deleteDate';
						";
			$returnResult = mysql_query($returnQuery);
			if(!$returnResult)
				die(mysql_error());
			return $returnResult;
		}else{
			die(mysql_error());
		}
	}

	public function checkNewValidDate($date){
		$query = "
				select date
				from dates
				where date > '$date'
				and status = 1
				and extract(year from date) = extract(year from '$date')
				and extract(month from date) = extract(month from '$date');
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function getChildAttendance($uid, $date){
		$query = "
				select date, time(start_datetime) as starttime, time(end_datetime) as endtime, first_name, last_name
				from attendance a
				join relations r
				on(a.user_id = r.sub_user_id)
				where a.user_id = $uid
				and date LIKE '$date%';
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function getUserAttendance($uid, $date){
		$query = "
				select date, time(start_datetime) as starttime, time(end_datetime) as endtime, first_name, last_name
				from attendance a
				join user_details ud
				on(a.user_id = ud.user_id)
				where a.user_id = $uid
				and date LIKE '$date%';
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}

	public function updatePreferredTime($uid, $time){
		$query = "
				update user_details
				set preferred_time = '$time'
				where user_id = $uid;
				";
		$result = mysql_query($query);
		if($result){
			$returnQuery = "
						select count(*) as result
						from user_details
						where user_id = $uid
						and preferred_time = '$time';
						";
			$returnResult = mysql_query($returnQuery);
			if(!$returnResult)
				die(mysql_error());
			return $returnResult;
		}else{
			die(mysql_error());
		}
	}

	public function checkUserPass($uid, $password){
		$slt = $this->salt;
		$returnQuery = "
						select count(*) as result
						from user_auth
						where user_id = $uid
						and password = SHA1(concat(MD5('$password'), '$slt'));
						";
		$returnResult = mysql_query($returnQuery);
		if(!$returnResult)
			die(mysql_error());
		return $returnResult;
	}

	public function updateUserPass($uid, $password){
		$slt = $this->salt;
		$query = "
				update user_auth
				set password = SHA1(concat(MD5('$password'), '$slt'))
				where user_id = $uid;
				";
		$result = mysql_query($query);
		if($result){
			$response = "1";
			return $response;
		}else{
			die(mysql_error());
		}
	}

	public function addNewUser($email){
		$slt = $this->salt;

		$checkIfPresentQuery = "
								select count(*) as result
								from user_auth
								where username = '$email';
								";
		$checkIfPresentQuery = mysql_query($checkIfPresentQuery);
		if($checkIfPresentQuery){
			$row = mysql_fetch_assoc($checkIfPresentQuery);
			if($row['result'] > 0){
				$response = "present";
				return $response;
			}
		}else{
			die(mysql_error());
		}

		$addInUsersQuery = "
							insert into users
							(date_of_join)
							values(now());
							";
		$usersResult = mysql_query($addInUsersQuery);
		if($usersResult){
			$insertQuery = "
							insert into user_auth
							values((select max(user_id) from users), '$email', SHA1(concat(MD5('JS1&pass0'), '$slt')), 0);
							";
			$insertResult = mysql_query($insertQuery);
			if($insertResult){
				$getUserQuery = "
								select count(*) as result
								from user_auth
								where user_id = (select max(user_id) from users)
								and username = '$email';
								";
				$getResult = mysql_query($getUserQuery);
				if(!$getResult)
					die(mysql_error());
				return $getResult;
			}else{
				die(mysql_error());
			}
		}else{
			die(mysql_error());
		}
	}

	public function checkForDefaultPass($uid){
		$slt = $this->salt;
		$query = "
				select count(*) as result
				from user_auth
				where user_id = $uid
				and password = SHA1(concat(MD5('JS1&pass0'), '$slt'));
				";
		$result = mysql_query($query);
		if(!$result)
			die(mysql_error());
		return $result;
	}
}