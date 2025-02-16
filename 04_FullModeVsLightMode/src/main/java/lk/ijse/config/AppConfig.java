package lk.ijse.config;

import lk.ijse.bean.SpringBeanTwo;
import lk.ijse.bean.SpringBeanThree;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@ComponentScan("lk.ijse.bean")
public class AppConfig {
/*    @Bean
    public SpringBeanTwo getSpringBeanTwo(){
        SpringBeanThree springBeanThree = getSpringBeanThree();
        System.out.println(springBeanThree);
        return new SpringBeanTwo();
    }
    @Bean
    public SpringBeanThree getSpringBeanThree(){
        return new SpringBeanThree();
    }*/
}
