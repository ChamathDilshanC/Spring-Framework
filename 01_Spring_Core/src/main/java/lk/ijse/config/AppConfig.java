package lk.ijse.config;

import lk.ijse.MyConnection;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackageClasses = lk.ijse.bean.TestBean1.class)
@ComponentScan(basePackages = "lk.ijse.bean")
//@ComponentScan(basePackages = {"lk.ijse.bean", "lk.ijse.config"}) //Multiple packages
public class AppConfig {
    public AppConfig() {
        //System.out.println("Hello Spring AppConfig Constructor !!!");
    }
    @Bean
    public MyConnection myConnection(){
        return new MyConnection();
    }
}


