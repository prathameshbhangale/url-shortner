package com.urlShortner.shortner.repository;

import com.urlShortner.shortner.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping,Long> {
}
