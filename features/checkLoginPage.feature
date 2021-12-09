Feature: Login page

  Scenario: Login with credentials
    When I go to "https://viktor-silakov.github.io/course-sut/index.html?quick"
    When I input login and password
      | login             | password      | message               |
      | walker@jw.com     | password1     | Fail to login         |
      | walker@jw.com     |               | Password is empty     |
      |                   | password      | Login is empty        |
      | old_walker@jw.com | password1     | The user is suspended |
      | password          | walker@jw.com | Fail to login         |
      | admin             | admin         | Fail to login         |
      | user              | 123           | Fail to login         |
      | dlink             | dlink         | Fail to login         |
      | user              |               | Password is empty     |
      | admin             |               | Password is empty     |
      |                   |               | Login is empty        |
    When I click the login button
    When I wait for "2" second


