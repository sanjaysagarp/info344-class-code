package main

import (
	"os"
	"fmt"
	"io"
	"log"
	"encoding/csv"
	"encoding/json"
)

//Zip struct
type Zip struct {
	TotalNum int 
	Type int
	HighestPopulation int
}

func main() {
	file, err1 := os.Open("zip_code_database.csv")
	if nil != err1 {
		log.Fatal(err1)
	} else {
		r := csv.NewReader(file)
		for {
			record, err2 := r.Read()
			if err2 == io.EOF {
				break
			}
			if err2 != nil {
				log.Fatal(err2)
			}
			
			
			j, err := json.Marshal(record)
			
			if err != nil {
				log.Fatal(err)
			} else {
				fmt.Println(j)
			}
			
		}
	}
}