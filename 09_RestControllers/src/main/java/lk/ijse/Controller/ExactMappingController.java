package lk.ijse.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("exact")
public class ExactMappingController {

    @GetMapping(path = "test1")
    public  String test1(){
        return "Exact Mapping Test 1";
    }

    @GetMapping(path = "test2/Chamath")
    public  String test2(){
        return "Exact Mapping Test 2";
    }
}
