Feature: Microsoft Playwright FOSDEM 2022 Demo

  Background:
    Given the following users have been created
      | Florian |
      | Ludovic |
    And the default folder for received shares has been set to "Shares"
    And auto-accept shares has been disabled

  Scenario: I can share my presentation with the FOSDEM team
    When "Florian" logs in
    And "Florian" opens the "files" app
    And "Florian" navigates to the files page
    And "Florian" creates the following folders
      | papers/fosdem |
    And "Florian" uploads the following resources
      | resource                                       | to            |
      | 2022-e2e-testing-with-microsoft-playwright.pdf | papers/fosdem |
    And "Florian" shares the following resources via the sidebar panel
      | resource      | user    | role   |
      | papers/fosdem | Ludovic | viewer |
    When "Ludovic" logs in
    And "Ludovic" opens the "files" app
    And "Ludovic" accepts the following resources
      | fosdem |
    And "Ludovic" downloads the following files
      | resource                                       | from          |
      | 2022-e2e-testing-with-microsoft-playwright.pdf | Shares/fosdem |
    And "Ludovic" logs out
    And "Florian" logs out
