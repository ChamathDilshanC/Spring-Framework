package lk.ijse.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("params")
public class ParamsController {

    //http://localhost:8080/09_RestControllers_Web_exploded/params?id=12
    @GetMapping(params = {"id"})
    public String sayHelloGet2(@RequestParam("id") String id) {
        return   "id " + id ;
    }
    //http://localhost:8080/09_RestControllers_Web_exploded/params?id=12&name=chamath
    @GetMapping(params = {"id", "name"})
    public String sayHelloGet3(@RequestParam("id") String id, @RequestParam("name") String name) {
        return   "id " + id + " name " + name ;
    }
    //http://localhost:8080/09_RestControllers_Web_exploded/params/new?id=12&name=chamath
    @GetMapping("/new")
    public String sayHelloGet4(@RequestParam("id") String id, @RequestParam("name") String name) {
        return   "id " + id + " name " + name ;
    }
}
