package lk.ijse.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringBean implements BeanNameAware, BeanFactoryAware, ApplicationContextAware, InitializingBean, DisposableBean {
    public SpringBean() {
        System.out.println("Spring Bean Instantiated...");
    }


    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("Spring Bean BeanFactoryAware setBeanFactory() called...");
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("Spring Bean BeanNameAware setBeanName() called...");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("Spring Bean InitializingBean afterPropertiesSet() called...");
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        System.out.println("Spring Bean ApplicationContextAware setApplicationContext() called...");
    }
    @Override
    public void destroy() throws Exception {
        System.out.println("Spring Bean DisposableBean destroy() called...");
    }
}
