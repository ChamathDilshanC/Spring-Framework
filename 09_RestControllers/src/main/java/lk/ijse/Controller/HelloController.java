package lk.ijse.Controller;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/hello")
@Component

public class HelloController {
    @GetMapping
    public String sayHello() {
        return "index";
    }
    @PostMapping
    public String sayHelloPost() {
        return "Post Mapping from HelloController";
    }
    @PutMapping
    public String sayHelloPut() {
        return "put Mapping from HelloController";
    }
    @DeleteMapping
    public String sayHelloDelete() {
        return "delete Mapping from HelloController";
    }
    @PatchMapping
    public String sayHelloPatch() {
        return "Patch Mapping from HelloController";
    }

}
