package lk.ijse.config;

import lk.ijse.bean.SpringBean;
import org.springframework.context.annotation.*;

@Configuration
@Import({AppConfig1.class})
//root
//@ImportResource("classpath:abc.xml")
//if not
//@ImportResource("file:absolute-path-of-abc.xml")
public class AppConfig {
    @Bean
    public SpringBean springBean() {
        return new SpringBean();
    }
}
