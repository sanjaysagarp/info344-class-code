package main

import (
	"fmt"
	"net/http"
	"time"
	"sync"
)

//MyStruct builds a struct with int and sync
type MyStruct struct {
	value int
	mx sync.RWMutex
}

//SetValue by locking struct first, then set, and finally unlock
func (m *MyStruct) SetValue(val int) {
	m.mx.Lock()
	m.value = val
	m.mx.Unlock()
}

//GetValue locks the struct for reading and unlocks it upon finishing
func (m *MyStruct) GetValue() int {
	m.mx.RLock() // locks it for reading!
	defer m.mx.RUnlock() //unlocks it before leaving function
	return m.value
}

var _mystruct MyStruct

func loadMyStruct() {
	//simulate a long loading function
	time.Sleep(5 * time.Second)
	_mystruct.SetValue(5)
}

func getValue(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(fmt.Sprintf("value is %d", _mystruct.GetValue())))
}

func main() {
	go loadMyStruct()
	
	http.HandleFunc("/", getValue)
	http.ListenAndServe(":9000", nil)
}