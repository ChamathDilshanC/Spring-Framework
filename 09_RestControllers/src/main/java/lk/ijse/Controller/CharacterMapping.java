package lk.ijse.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("character")
public class CharacterMapping {

    @GetMapping(path = "test1/1???")
    public  String test1(){
        return "character Mapping Test 1";
    }

    @GetMapping(path = "1???/test2")
    public  String test1Get(){
        return "character Mapping Test 2";
    }
}
