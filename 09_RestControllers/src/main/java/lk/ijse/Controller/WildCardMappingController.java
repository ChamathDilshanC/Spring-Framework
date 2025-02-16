package lk.ijse.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("wildcard")
public class WildCardMappingController {
    @GetMapping(path = "test1/*")
    public  String test1(){
        return "Wildcard Mapping Test 1";
    }
    @GetMapping(path = "test1/*/wildcard")
    public  String test1Get(){
        return "Wildcard Mapping Test 1 / Wildcard Mapping Test Get";
    }

}
