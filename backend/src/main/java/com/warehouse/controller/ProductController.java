package com.warehouse.controller;

import com.warehouse.dto.ProductDto;
import com.warehouse.entity.Product;
import com.warehouse.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping(value = "{name}", produces = "application/json")
    public Product getProductByName(@PathVariable String name) {
        return productService.getProductByName(name);
    }

    @GetMapping(produces = "application/json")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PutMapping(value = "{name}", produces = "application/json", consumes = "application/json")
    public Product updateNumberOfItems(@PathVariable String name, @RequestBody @Valid ProductDto productDto) {
        return productService.addNumberOfItems(name, productDto);
    }

    @PutMapping(produces = "application/json", consumes = "application/json")
    public List<Product> updateProducts(@RequestBody @Valid List<ProductDto> productDtos) {
        return productService.updateProducts(productDtos);
    }

    @PostMapping(produces = "application/json", consumes = "application/json")
    public Product addProduct(@RequestBody @Valid ProductDto productDto) {
        return productService.addProduct(productDto);
    }

    @DeleteMapping(value = "{name}")
    public void deleteProduct(@PathVariable String name) {
        productService.deleteProduct(name);
    }
}
