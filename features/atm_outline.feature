Feature: ATM withdraw
 As an Account Holder
 I want to withdraw cash from an ATM

  Scenario Outline: Withdraw cash with result: <message>
    Given my account balance is "<myBalance>"
    And the ATM contains "<atmContains>"
    When I withdraw "<iWithdraw>"
    Then I get "<message>" message
    Examples:
      | myBalance | atmContains | iWithdraw | message                               |
      | 500       | 600         | 50        | Take your money!                      |
      | 500       | 600         | 550       | You don't have enough money!          |
      | 500       | 150         | 300       | The machine is not have enough money! |
