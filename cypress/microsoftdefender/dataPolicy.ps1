Set-AntiPhishPolicy -Identity "dry-run_fullcase" `
    -AdminDisplayName "" `
    -AuthenticationFailAction "MoveToJmf" `
    -DmarcQuarantineAction "Quarantine" `
    -DmarcRejectAction "Reject" `
    -EnableFirstContactSafetyTips $true `
    -EnableMailboxIntelligence $false `
    -EnableMailboxIntelligenceProtection $false `
    -EnableOrganizationDomainsProtection $false `
    -EnableSimilarDomainsSafetyTips $false `
    -EnableSimilarUsersSafetyTips $true `
    -EnableSpoofIntelligence $false `
    -EnableTargetedDomainsProtection $false `
    -EnableTargetedUserProtection $true `
    -EnableUnauthenticatedSender $false `
    -EnableUnusualCharactersSafetyTips $true `
    -EnableViaTag $false `
    -ExcludedDomains @() `
    -ExcludedSenders @() `
    -HonorDmarcPolicy $false `
    -ImpersonationProtectionState "Manual" `
    -MailboxIntelligenceProtectionAction "NoAction" `
    -MailboxIntelligenceProtectionActionRecipients @() `
    -PhishThresholdLevel 1 `
    -TargetedDomainActionRecipients @() `
    -TargetedDomainProtectionAction "NoAction" `
    -TargetedDomainsToProtect @() `
    -TargetedUserActionRecipients @(
        "122@12.onmicrosoft.com",
        "LeeG@dd.onmicrosoft.com"
    
    ) `
    -TargetedUserProtectionAction "Redirect" `
    -TargetedUserQuarantineTag "" `
    -TargetedUsersToProtect @("add_user_01;add_user_01@7ck8w5.onmicrosoft.com")
