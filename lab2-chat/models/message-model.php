<?php
class Messages {
	protected $conn;

	public function __construct($conn) {
		$this->conn = $conn;
	}

	public function retrieve() {
		$sql = 'select * from message des limit 10';
		$stmt = $this->conn->prepare($sql);
		$stmt->execute();
		if (!$success) {
			//var_dump($stmt->errorInfo());
			trigger_error($stmt->errorInfo());
			//return false;
		}// else {
		return $stmt->fetchAll();
		//}
		
	}

}
?>