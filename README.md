## POSTS APP

## Implementation

In master branch data fetching and error handling logic is implemented in container component while in shared_state_rxjs branch data is stored in a service and data manipulation logic related to the posts is moved to a sepetare service so that the components consumes the data through posts service. In shared_state_rxjs units tests are added for services.

## Libraries / Tools Used

- Angular 13

## Setup

To install dependencies run:

`npm install`

To run the app run:

`ng serve`

To execute the unit tests via [Karma](https://karma-runner.github.io) run:

`ng test`

## Future Work

1. Complete test coverage to achieve 90% in shared_state_rxjs.
2. Improve UX by displaying loader when data is loading

