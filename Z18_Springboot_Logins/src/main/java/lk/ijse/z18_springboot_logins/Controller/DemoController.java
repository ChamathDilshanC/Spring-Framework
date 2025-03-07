package lk.ijse.z18_springboot_logins.Controller;

import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo")
public class DemoController {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(DemoController.class);

    @GetMapping
    private void loadDemo(){
        log.trace("This is Trace Log");
        log.debug("This is Debug Log");
        log.info("This is Info Log");
        log.warn("This is Warn Log");
        log.error("This is Error Log");
    }

}
