package lk.ijse.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ComponentScan("lk.ijse.di") //lk.ijse.bean changed to lk.ijse.di  For example dependency injection
public class AppConfig {
}
