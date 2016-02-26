package main

import (
	"github.com/sanjaysagarp/info344-class-code/gotypes/structs/person"
)

func main() {
	prs := person.NewPerson("Sanjay", "Sagar")
	prs.FirstName = "Hulk"
	
	prs.SayHello()
}