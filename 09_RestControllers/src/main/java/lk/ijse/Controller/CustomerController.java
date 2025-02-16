package lk.ijse.Controller;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
@Component
public class CustomerController {
    @RequestMapping("/customerDetails")
    public String getCustomerDetails(){
        return "Customer Details: Name - John Doe, Age - 25, Email - johndoe@gmail.com";
    }
}
