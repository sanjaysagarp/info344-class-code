Hey this is some content above the code
<?php
<<<<<<< HEAD
$name = 'Sanjay';
$fullName = $name . 'Sagar';

class Person {
	protected $name;

	public function __construct($n) {
		$this->name = $n;
	}

	public function getName() {
		return $this->name;
	}

}

function foo($bar) {
	echo "Hey this is the foo fighting function\n";
=======
$name = 'Dave';
$fullName = $name . 'Stearns';

class Person {
    protected $name;
    
    public function __construct($n) {
        $this->name = $n;
    }
    
    public function getName() {
        return $this->name;
    }
}

function foo($bar) {
    echo "Hey this is the foo fighting function\n";
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
}

echo "Hello {$name}s\n";
foo(NULL);
?>
<<<<<<< HEAD
And this is some content below
=======
And this is some content below
>>>>>>> dd127347d12c8bb16a0f6d7fa4d2cd6133701c08
