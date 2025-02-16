package lk.ijse.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("variable")
public class PathVariableController {

/*    @GetMapping(path = "{id}/{name}")
    public String sayHelloGet(@PathVariable("id") String id){
        return   "id " + id ;
    }*/
    @GetMapping(path = "{id}/{name}")
    public String sayHelloGet2(@PathVariable("id") String id, @PathVariable("name") String name){
        return   "id " + id + " "+"name " + name;
    }
    @GetMapping(path = "{id:[A][0-9]{3}}")
    public String sayHelloGet3(@PathVariable("id") String id){
        return   "id With Regex " + id ;
    }

}
