package com.alkoholove.warehouse.service;

import com.alkoholove.warehouse.dto.ProductDto;
import com.alkoholove.warehouse.entity.Product;
import com.alkoholove.warehouse.entity.TypeOfPackage;
import com.alkoholove.warehouse.exceptions.ResourceNotFoundException;
import com.alkoholove.warehouse.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    private TypeOfPackage solveTypeOfPackage(String typeOfPackage) {
        return switch (typeOfPackage) {
            case "bottle" -> TypeOfPackage.BOTTLE;
            case "carton" -> TypeOfPackage.CARTON;
            case "pack" -> TypeOfPackage.PACK;
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
        Product product = new Product(productDto.getName(), solveTypeOfPackage(productDto.getTypeOfPackage()),
                productDto.getNumberOfItems());
        productRepository.save(product);
        return getProductByName(productDto.getName());
    }

    public Product updateNumberOfItems(String name, ProductDto productDto) {
        Optional<Product> productOptional = productRepository.findByName(name);
        if (productOptional.isEmpty()) {
            addProduct(productDto);
        } else {
            Product product = productOptional.get();
            product.setNumberOfItems(productDto.getNumberOfItems());
            productRepository.save(product);
        }
        return getProductByName(name);
    }

    public void deleteProduct(String name) {
        Product product = getProductByName(name);
        productRepository.delete(product);
    }
}
