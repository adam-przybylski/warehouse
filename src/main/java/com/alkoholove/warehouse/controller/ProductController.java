package com.alkoholove.warehouse.controller;

import com.alkoholove.warehouse.dto.ProductDto;
import com.alkoholove.warehouse.entity.Product;
import com.alkoholove.warehouse.service.ProductService;
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
        return productService.updateNumberOfItems(name, productDto);
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
