package lk.ijse.Controller;

import lk.ijse.DTO.CustomerDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("json")
@CrossOrigin
public class JsonController {

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public CustomerDTO test1(@RequestBody CustomerDTO customerDTO) {
        return customerDTO;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public CustomerDTO test2() {
        return new CustomerDTO("Chamath", "Dilshan", "25");
    }

    @GetMapping(path = "getall", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomerDTO> test3() {
        List<CustomerDTO> customerList = new ArrayList<>();
        customerList.add(new CustomerDTO("Chamath", "Dilshan", "25"));
        customerList.add(new CustomerDTO("Jayan", "Roshan", "37"));
        customerList.add(new CustomerDTO("Kasun", "kalhara", "30"));
        customerList.add(new CustomerDTO("Jayantha", "uduwala", "35"));
        return customerList;
    }
}