package lk.ijse.z17_springboot_bean_validation.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.boot.context.properties.bind.Name;

public class CustomerDTO {
    @Name("name")
    @Size(min = 3, max = 20, message = "Name should be between 3 and 20 characters")
    @NotBlank(message = "Name is mandatory")
    @Pattern(regexp = "^[a-zA-Z]*$", message = "Invalid Name")
    private String name;
    @Email(message = "Invalid Email")
    @Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", message = "Invalid Email")
    private  String email;
    @Pattern(regexp = "^[0-9]*$", message = "Invalid Phone Number")
    private String phone;

    public CustomerDTO(String email, String name, String phone) {
        this.email = email;
        this.name = name;
        this.phone = phone;
    }

    public CustomerDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
