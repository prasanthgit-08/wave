package com.elogosoft.tlc.service.Impl;

import com.elogosoft.tlc.service.DelayDamageService;
import com.elogosoft.tlc.vo.DelayDamageSaveVO;
import com.elogosoft.tlc.vo.CommonSPRequest;
import com.elogosoft.tlc.vo.CommonSPResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DelayDamageServiceImpl implements DelayDamageService {

    private static final Logger log = LoggerFactory.getLogger(DelayDamageServiceImpl.class);

    @Override
    public List<Map<String, Object>> editSaveDelayDamages(DelayDamageSaveVO delayDamageSaveVO, Integer userPK) {
        // ... existing implementation ...
        return null; // Placeholder return, actual implementation needed
    }

    @Override
    public CommonSPResponse getDelayDamagesEditView(Integer delayedUnitDamagePK, String tab, Integer userPK) {
        try {
            log.info("----------- Delay Damages Edit View Request for tab {}: --------------", tab);

            // Prepare stored procedure request
            CommonSPRequest spRequest = new CommonSPRequest();
            spRequest.setSpName("SP_DelayDamages_EditView");
            spRequest.setUserName(String.valueOf(userPK));

            // Set request parameters
            Map<String, Object> requestParams = Map.of(
                "DelayedUnitDamagePK", delayedUnitDamagePK,
                "Tab", tab
            );
            spRequest.setRequestParameter(requestParams);

            // Set response keys based on the tab
            String[] responseKeys;
            switch (tab) {
                case "Claims":
                    responseKeys = new String[]{"claimsDetails"};
                    break;
                case "General":
                    responseKeys = new String[]{"generalDetails"};
                    break;
                case "Email":
                    responseKeys = new String[]{"emailDetails"};
                    break;
                case "Comments":
                    responseKeys = new String[]{"commentsDetails"};
                    break;
                case "Instructions":
                    responseKeys = new String[]{"instructionsDetails"};
                    break;
                default:
                    responseKeys = new String[]{"details"};
            }
            spRequest.setResponseKeys(responseKeys);

            // Execute stored procedure
            CommonSPResponse spResponse = storedProcedureExecuter.execute(spRequest);
            log.info("Stored procedure executed successfully for tab {}. Response: {}", tab, spResponse);

            return spResponse;

        } catch (Exception e) {
            log.error("Error executing Delay Damages Edit View for tab: {}", tab, e);
            throw new RuntimeException("An error occurred while fetching Delay Damages Edit View data", e);
        }
    }
} 