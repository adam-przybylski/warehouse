package com.warehouse.service;

import com.warehouse.dto.ProductDto;
import com.warehouse.entity.Product;
import com.warehouse.enums.PackageType;
import com.warehouse.exceptions.ResourceNotFoundException;
import com.warehouse.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);


    private PackageType solveTypeOfPackage(String typeOfPackage) {
        return switch (typeOfPackage) {
            case "bottle" -> PackageType.BOTTLE;
            case "carton" -> PackageType.CARTON;
            case "pack" -> PackageType.PACK;
            default -> null;
        };
    }

    public Product getProductByName(String name) {
        Optional<Product> productOptional = productRepository.findByName(name);
        return productOptional.orElseThrow(() -> new ResourceNotFoundException("Product with name " + name + " not found"));
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(ProductDto productDto) {
        Product product = new Product(productDto.getName(), solveTypeOfPackage(productDto.getUnit()),
                productDto.getNumberOfUnits());
        productRepository.save(product);
        logger.info("Product with name " + productDto.getName() + " added");
        return getProductByName(productDto.getName());
    }

    public Product updateNumberOfItems(String name, ProductDto productDto) {
        Optional<Product> productOptional = productRepository.findByName(name);
        if (productOptional.isEmpty()) {
            addProduct(productDto);
        } else {
            Product product = productOptional.get();
            product.setNumberOfUnits(productDto.getNumberOfUnits() + product.getNumberOfUnits());
            productRepository.save(product);
            logger.info("Product with name " + productDto.getName() + " updated");
        }
        return getProductByName(name);
    }

    public List<Product> updateProducts(List<ProductDto> productDtos) {
        for (ProductDto productDto : productDtos) {
            updateNumberOfItems(productDto.getName(), productDto);
        }
        return getAllProducts();
    }

    public void updateNumberOfItems(Product product) {
        productRepository.save(product);
        logger.info("Product with name " + product.getName() + " updated");
    }

    public void deleteProduct(String name) {
        Product product = getProductByName(name);
        productRepository.delete(product);
        logger.info("Product with name " + product.getName() + " deleted");
    }
}
