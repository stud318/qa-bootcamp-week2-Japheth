Feature: Add items to the shopping cart
  As a guest shopper
  I want to add products to my cart
  So that I can purchase them later

  Background:
    Given the shopper is on the Toolshop home page

  Scenario: Successfully add an item to the cart
    When the shopper clicks on the "Combination Pliers" product
    And the shopper clicks the "Add to cart" button
    Then the cart badge should update to show 1 item
    And the shopper should see a success message

  Scenario: Add multiple items to the cart
    When the shopper clicks on the "Combination Pliers" product
    And the shopper clicks the "Add to cart" button
    And the shopper goes back to the home page
    And the shopper clicks on the "Bolt Cutters" product
    And the shopper clicks the "Add to cart" button
    Then the cart badge should update to show 2 items