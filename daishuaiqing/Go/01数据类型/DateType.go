package main

//fmt包含了IO的相关函数
import "fmt"

//main是程序的入口
func main() {
	//就像js中一样，Go也会对初始化的变量进行类型的自动定义
	var age = 20
	var isHas = false
	var money = 99.9
	var userName = "张三"
	fmt.Println(age)
	fmt.Println(isHas)
	fmt.Println(money)
	fmt.Println(userName)

	//多变量的初始化，与js一样
	var n1, n2 int = 1, 2
	fmt.Println(n1, n2)

	//没有初始化的变量，默认值
	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\n", i, f, b, s)

	//省略 var, 注意 := 左侧如果没有声明新的变量，就产生编译错误
	//这种不带声明格式的只能在函数体中出现
	ff := "Runoob"
	fmt.Println(ff)

	//全局变量的声明，应该使用具体的数据类型惊醒生命，例如：var a, b, c int

}
