package lk.ijse.z17_springboot_bean_validation.Controller;

import jakarta.validation.Valid;
import lk.ijse.z17_springboot_bean_validation.DTO.CustomerDTO;
import lk.ijse.z17_springboot_bean_validation.DTO.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/customer/")
public class CustomerController {

    @PostMapping("save")
    public ResponseEntity<ResponseDTO> saveCustomer(@Valid @RequestBody CustomerDTO customerDTO) {
        ResponseDTO responseDTO = new ResponseDTO(200, "Customer Saved Successfully", customerDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);

    }
}
