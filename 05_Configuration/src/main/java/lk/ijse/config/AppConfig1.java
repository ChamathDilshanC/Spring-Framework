package lk.ijse.config;

import lk.ijse.bean.SpringBean1;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig1 {
    @Bean
    public SpringBean1 springBean1() {
        return new SpringBean1();
    }
}
