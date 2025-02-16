package lk.ijse.Controller;

import lk.ijse.DTO.CustomerDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("form")
public class FormDataController {
    @PostMapping(path = "test1")
    public String test1 (CustomerDTO customerDTO){
        return customerDTO.toString();
    }
}
