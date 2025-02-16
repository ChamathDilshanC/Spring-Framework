package lk.ijse.bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.*;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Scope;


@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class MyConnection implements BeanNameAware, BeanFactoryAware, ApplicationContextAware, InitializingBean, DisposableBean {



    @Override
    public void setBeanName(String name) {
        System.out.println("My Connection BeanNameAware setBeanName() called...");
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("My Connection BeanFactoryAware setBeanFactory() called...");
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        System.out.println("My Connection ApplicationContextAware setApplicationContext() called...");
    }
    @Override
    public void destroy() throws Exception {
        System.out.println("My Connection DisposableBean destroy() called...");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("My Connection InitializingBean afterPropertiesSet() called...");
    }


    public MyConnection() {
        System.out.println("MyConnection Constructor...");
    }
    /*MyConnection Constructor...
    My Connection BeanNameAware setBeanName() called...
    My Connection BeanFactoryAware setBeanFactory() called...
    My Connection ApplicationContextAware setApplicationContext() called...
    My Connection InitializingBean afterPropertiesSet() called...*/
}
