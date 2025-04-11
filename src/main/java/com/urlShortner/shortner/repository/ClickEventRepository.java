package com.urlShortner.shortner.repository;


import com.urlShortner.shortner.models.ClickEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClickEventRepository extends JpaRepository<ClickEvent,Long> {
}
