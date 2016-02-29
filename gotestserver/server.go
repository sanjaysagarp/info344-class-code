package main

import (
	"io"
	"net/http"
	"html/template"
	"fmt"
)

func hello(w http.ResponseWriter, r *http.Request) {
	//http.ServeFile(w,r, "views/example.html")
	renderTemplate(w, "example")
}

var mux map[string]func(http.ResponseWriter, *http.Request)

func main() {
	server := http.Server{
		Addr:    ":8080",
		Handler: &myHandler{},
	}
	
	//serveSingle("/favicon.ico", "./favicon.ico")
	mux = make(map[string]func(http.ResponseWriter, *http.Request))
	mux["/"] = hello
	
	fmt.Println("Server is listening...")
	server.ListenAndServe()
}

type myHandler struct{}

func (*myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if h, ok := mux[r.URL.String()]; ok {
		h(w, r)
		return
	}
	io.WriteString(w, "My server: "+r.URL.String())
}

func renderTemplate(w http.ResponseWriter, tmpl string) {
	t, _ := template.ParseFiles("views/"+ tmpl + ".html")
	info := make(map[string]string)
	info["Title"] = "nsadijfnafjabhsfh"
	t.Execute(w, info) // compiles data entries from info map into the document
}


