package com.urlShortner.shortner.repository;

import com.urlShortner.shortner.models.UrlMapping;
import com.urlShortner.shortner.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping,Long> {

    public List<UrlMapping> findByUser(User user);
    public Optional<UrlMapping> findByShortUrl(String shortUrl);
}
