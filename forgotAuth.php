<?php

class forgotAuth
{
    public $salt	= '&7&4.$a#^H^&3_5';

    public function __construct()
    {
        $db_hostname = "localhost";
        $db_username = "root";
        $db_password = "password";
        $database = "test_1";
        $db_server = mysql_connect($db_hostname, $db_username, $db_password);
        if (!$db_server) die($error = 1);

        mysql_select_db($database) or die($error = 1);
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
				select count(*) as result, user_id
				from user_auth
				where username = '$email';
				";
        $result = mysql_query($query);
        if(!$result)
            die(mysql_error());
        return $result;
    }

    public function verifyToken($token){
        $query = "
                select count(*)as result from tokens
                where token = '$token'
                and FLOOR(((unix_timestamp(now()) - unix_timestamp(timestamp))/ 3600)/24) = 0;
				";
        $result = mysql_query($query);
        if($result) {
            $deleteQuery = "
                            delete from tokens
                            where token = '$token';
                            ";
            $deleteResult = mysql_query($deleteQuery);
            if(!$deleteResult)
                die(mysql_error());
            return $result;
        }else{
            die(mysql_error());
        }
    }

    public function resetPassword($uid, $password){
        $slt = $this->salt;
        $query = "
                update user_auth
                set password = SHA1(concat(MD5('$password'),'$slt'))
                where user_id = $uid;
				";
        $result = mysql_query($query);
        if($result){
            $returnQuery = "
                            select count(*) as result from user_auth
                            where password = SHA1(concat(MD5('$password'),'$slt'))
                            ";
            $returnResult = mysql_query($returnQuery);
            if(!$returnResult)
                die(mysql_error());
            return $returnResult;
        }else {
            die(mysql_error());
        }
    }
}