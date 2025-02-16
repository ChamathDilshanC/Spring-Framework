package lk.ijse.bean;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class SpringBeanOne {
    @Bean
    public SpringBeanTwo getSpringBeanTwo(){
        SpringBeanThree ref1 = getSpringBeanThree();
        SpringBeanThree ref2 = getSpringBeanThree();
        System.out.println("Error Bean : " + ref1);
        System.out.println("Error Bean : " + ref2);
        return new SpringBeanTwo();
    }
    @Bean
    public SpringBeanThree getSpringBeanThree(){
        return new SpringBeanThree();
    }
}
