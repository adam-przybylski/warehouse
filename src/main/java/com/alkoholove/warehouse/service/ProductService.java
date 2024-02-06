package com.alkoholove.warehouse.service;

import com.alkoholove.warehouse.controller.UpdateProductDto;
import com.alkoholove.warehouse.dto.ProductDto;
import com.alkoholove.warehouse.entity.Product;
import com.alkoholove.warehouse.entity.TypeOfPackage;
import com.alkoholove.warehouse.exceptions.ResourceNotFoundException;
import com.alkoholove.warehouse.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    public ProductDto getProductByName(String name) {
        Optional<Product> productOptional = productRepository.findByName(name);
        return productOptional.map(product -> new ProductDto(product.getId(), product.getName(), product.getTypeOfPackage().label,
                product.getNumberOfItems())).orElseThrow(() -> new ResourceNotFoundException("Product with name " + name + " not found"));
    }

    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            productDtos.add(new ProductDto(product.getId(), product.getName(), product.getTypeOfPackage().label, product.getNumberOfItems()));
        }
        return productDtos;
    }

    public ProductDto addProduct(ProductDto productDto) {
        Product product = new Product(productDto.getName(), solveTypeOfPackage(productDto.getTypeOfPackage()),
                productDto.getNumberOfItems());
        productRepository.save(product);
        Product addedProduct = productRepository.findByName(productDto.getName()).orElseThrow(() -> new ResourceNotFoundException("Product with name " + productDto.getName() + " not found"));
        return new ProductDto(addedProduct.getId(), addedProduct.getName(), addedProduct.getTypeOfPackage().label, addedProduct.getNumberOfItems());
    }

    public ProductDto updateNumberOfItems(String name, UpdateProductDto updateProductDto) {
        Optional<Product> productOptional = productRepository.findByName(name);
        Product product = productOptional.orElseThrow(() -> new ResourceNotFoundException("Product with name " + name + " not found"));
        product.setNumberOfItems(updateProductDto.getQuantity());
        productRepository.save(product);
        Product updatedProduct = productRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Product with name " + name + " not found"));
        return new ProductDto(updatedProduct.getId(), updatedProduct.getName(), updatedProduct.getTypeOfPackage().label, updatedProduct.getNumberOfItems());
    }

    public void deleteProduct(String name) {
        Optional<Product> productOptional = productRepository.findByName(name);
        Product product = productOptional.orElseThrow(() -> new ResourceNotFoundException("Product with name " + name + " not found"));
        productRepository.delete(product);
    }
}
