param (
    [string]$username,
    [string]$password,
    [string]$command 
)

# Convert the password to a secure string
$securePassword = ConvertTo-SecureString $password -AsPlainText -Force
$UserCredential = New-Object System.Management.Automation.PSCredential ($username, $securePassword)

try {
    # Connect to Exchange Online
    Connect-ExchangeOnline -Credential $UserCredential -ShowBanner:$false

    # Ensure the command is properly quoted if it's a path or script file
    $command = "$command"

    # Execute the command (script) using the call operator (&)
    $cmdName = & $command

    # Convert the output to JSON format
    $cmdName | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Failed to connect to Exchange Online. Error: $($_.Exception.Message)"
}
