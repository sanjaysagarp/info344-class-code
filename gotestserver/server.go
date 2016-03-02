package main

import (
	"io"
	"net/http"
	"html/template"
	"fmt"
)

func hello(w http.ResponseWriter, r *http.Request) {
	//http.ServeFile(w,r, "views/example.html")
	renderTemplate(w, "head", "index")
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

func renderTemplate(w http.ResponseWriter, temp1 string, temp2 string) {
	t, _ := template.ParseFiles("./app/views/"+ temp1 + ".html", "./app/views/" + temp2 + ".html")
	info := make(map[string]string)
	info["Title"] = "h0i!"
	info["Yoshi"] = "Yoshi!"
	t.ExecuteTemplate(w, "header", &info)
	//t.ExecuteTemplate(w, "content", info)
	
	// t.ExecuteTemplate(os.Stdout,"header", nil)
	// t.ExecuteTemplate(os.Stdout, "content", nil)
	
	// t.Execute(w, info) // compiles data entries from info map into the document
}


