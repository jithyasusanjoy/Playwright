Feature: Ecommerce validation
@Regression
Scenario: Placing order for a product in an ecommerce website
Given The username "standard_user" and password "secret_sauce" click on the login button
When The dashboard is displayed and the product "Sauce Labs Backpack" is added to cart and click on the icon to move to mycart
Then The product details are verified and click on the Checkout button
When The shipping details are entered and the continue button is clicked
Then The product summary is displayed
When The finish button is clicked
Then The order is processed and confirmation message- Thank you for your order! is displayed
@Validation
Scenario Outline: Error validation while logging into a shopping cart application
Given The wrong username "<username>" and password "<password>" and click on the login button
Then Verify error message is displayed

Examples:
    | username       | password      | 
    | standarduser   | secret_sauce  |