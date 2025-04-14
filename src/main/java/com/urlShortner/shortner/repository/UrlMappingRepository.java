package com.urlShortner.shortner.repository;

import com.urlShortner.shortner.models.UrlMapping;
import com.urlShortner.shortner.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping,Long> {

    public List<UrlMapping> findByUser(User user);
}
