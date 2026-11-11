package com.elogosoft.tlc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/delayDamage")
public class DelayDamageController {

    @PostMapping("/editSaveDelayDamage")
    public ResponseEntity<?> editSaveDelayDamage(
            @RequestBody DelayDamageSaveVO delayDamageSaveVO,
            @RequestAttribute Integer userPK) {
        // ... existing implementation ...
    }

    /**
     * Get the details for a specific tab in the Delay Damages edit view
     * @param delayedUnitDamagePK The primary key of the delayed unit damage
     * @param tab The tab name to get details for
     * @param userPK The user's primary key
     * @return ResponseEntity containing the tab details
     */
    @GetMapping("/editView/{delayedUnitDamagePK}/{tab}")
    public ResponseEntity<?> getDelayDamagesEditView(
            @PathVariable Integer delayedUnitDamagePK,
            @PathVariable String tab,
            @RequestAttribute Integer userPK) {
        log.info("Get Delay Damages Edit View request received for tab: {}", tab);
        try {
            CommonSPResponse response = delayDamageService.getDelayDamagesEditView(delayedUnitDamagePK, tab, userPK);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching Delay Damages Edit View for tab: {}", tab, e);
            return ResponseEntity.status(500).body("Error fetching Delay Damages Edit View data");
        }
    }
} 