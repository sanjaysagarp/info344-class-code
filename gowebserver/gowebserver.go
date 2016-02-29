package main

import (
	"net/http"
	"fmt"
	"time"
	"encoding/json"
	"log"
	"runtime"
)

//HelloResponse respresents a response from the hello route
type HelloResponse struct {
	Name string `json:"name"`
	Message string `json:"message"`
	GeneratedAt time.Time `json:"generatedAt"`
	foo int
}

var memstats = new(runtime.MemStats)

func getMemStats(w http.ResponseWriter, r *http.Request) {
	runtime.ReadMemStats(memstats)
	allocstats := make(map[string]uint64)
	allocstats["alloc"] = memstats.Alloc
	allocstats["totalAlloc"] = memstats.TotalAlloc
	j, err := json.Marshal(allocstats)
	if nil != err {
		log.Println(err)
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	} else {
		w.Header().Add("Content-Type", "application/json")
		w.Write(j)
	}
}

func sayHello(w http.ResponseWriter, r *http.Request) {
	//get whatever follows /api/v1/hello/
	//on requested URL
	name := r.URL.Path[len("/api/v1/hello/"):] //retrieves trailing slash

	//create an initialize the respone struct
	resp := HelloResponse{Name: name, Message: "Hello " + name, GeneratedAt: time.Now()}
	
	//convert struct to JSON
	j, err := json.Marshal(resp)
	if nil != err {
		log.Println(err)
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	} else {
		//tell the client we are sending back JSON
		w.Header().Add("Content-Type", "application/json")
		w.Write(j)
	}
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./static")))
	http.HandleFunc("/api/v1/hello/", sayHello)
	http.HandleFunc("/api/v1/memstats", getMemStats)
	
	fmt.Println("Server listening on port 9000...")
	http.ListenAndServe(":9000", nil)
}
