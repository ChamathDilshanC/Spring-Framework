package lk.ijse.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ComponentScan("lk.ijse.bean")
@PropertySource("classpath:application.properties")
public class AppConfig {

}
