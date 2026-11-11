public List<Map<String, Object>> editSaveDelayDamages(DelayDamageSaveVO delayDamageSaveVO, Integer userPK);

/**
 * Get the details for a specific tab in the Delay Damages edit view
 * @param delayedUnitDamagePK The primary key of the delayed unit damage
 * @param tab The tab name to get details for
 * @param userPK The user's primary key
 * @return CommonSPResponse containing the tab details
 */
public CommonSPResponse getDelayDamagesEditView(Integer delayedUnitDamagePK, String tab, Integer userPK); 