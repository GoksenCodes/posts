# Answers

## 1
JWT had three parts, the header, the payload, and the signature. The client uses this JWT on every request for a protected resource. This structure of JWT makes it a secure way for information transmission between parties because you can verify the validity of the token. 

In an authentication example, the server creates a JWT by using some function that uses the header, the payload and a secret key when a client logs in. This makes JWT signed and the signature can not be altered by any other party unless the secret key is exposed.

In terms of the safety of JWT, you may prevent or not certain attacks depending on how it’s used and what’s inside the token. JWT should be used over HTTPS to prevent “man in the middle” attacks. It is also important to note that JWTs are not encrypted by default. So in order to add one more layer of security, you need to use some sort of encryption.

All in all, JWTs are safe when used correctly - the tokes are signed with specific algorithms, the token signature is verified and they have a reasonable expiration date.

## 2
- Cross-site scripting: HTML sanitization can protect against cross-site scripting (XSS) attacks by sanitizing any HTML code submitted by a user.
- Cross-site request forgery: Following REST principles strictly in API design and using GET requests only for displaying data not for not transforming data can be an effective protection strategy. This would limit the number of requests that are vulnerable to CSRF attacks. Enabling CORS protection is also an effective strategy since it would give controlled access to requests originating outside of a given domain.

## 3

### a. 
By default, objects are mutable, once they're created, you can add a new property to them, modify the value of an existing property, or delete a property. We can make an object immutable with the Object.freeze() method. 
A configuration object that shouldn’t be changed is one of the use cases for making an object immutable. It is important to note that Object.freeze mutates the object and works only on one level. If an object has another object in it that object would be still mutable.

### b. 
- Advantages: 
    - State management: Mutating the state hides changes and creates side effects that can cause bugs. 
    Since the state of your immutable object doesn’t change, it’s much easier to debug and test.
    - Functional programming: immutability is preferred together with functional programming. 
    It allows you to split complex logic in functions that are easy to test and maintain. For example, using a .map function instead of a for loop that replaces the array in place. 
    Function style code is very predictable, very extendable and easier to understand because the scope of each function is small and usually independent of the other part of the code.
    - Performance: Immutability can also help achieve better performance, we can compare the version of the state before and after changes and 
    components would re-render themselves only when needed. This is an advantage that modern JS libraries take. 
- Disadvantages:
    - Memory: It can be costly since you rely on multiple objects instead of just several objects that just keep mutating.
    - Performance: Based on how it is implemented immutable data structures can result in extremely poor performance (ex: recursive methods). 
    You may end up with operations with high time complexity.

### c.
By using methods that do not mutate the object. For instance, .map & .filter methods do not mutate the array but create a new one. 
Instead of using push which mutates the array, we can use the spread operator which creates a new array or object. With objects, in particular, this allows for easy updating of a top-level key. 
And for removing a specific element from an array, the filter or slice method creates a new array instead of mutating the current one.

## 4

While optimizing the performance it’s important to work against metrics so we can measure the impact of the measurements we took. 
There are three core metrics we can use to measure the speed of the application. Namely:
- Largest contentful paint
- First input delay
- Cumulative layout shift

We can check the performance of the app based on these metrics by using a tool like Lighthouse or real user monitoring with Sentry so we can compare the results after certain improvements.

In order to understand where the biggest opportunity for performance improvement is, we should take a look at the critical rendering path. 
For improving the loading speed below mentioned measurements can be taken:

- Using a modern compiler like Webpack that imports only necessary code and ignores all the rest.
- Bundle cleanup; understanding if any of the libraries can be removed to make the bundle smaller.
- Compressing js files to save on bundle size.
- Caching and reusing files that are stored in the browser in the next requests.
- Using lazy loading for heavy data (such as images)
- Splitting the big bundles into smaller ones that can be loaded after the initial render.
- Using a shared state to avoid unnecessary network requests
- For an angular app: using the right RxJs operator that is suitable for certain needs when interacting with the server
- Considering introducing Server Side Rendering - especially if we have special SEO requirements

## 5
I prefer choosing my own hardware, but work with a company supplied operating system
Image is more important because using the same OS with the rest of the company would help avoid dependency management and build configs related issues. 
It would also allow me to pair program and collaborate easily if I use the same OS, and the same set of tooling (version control, IDE etc.) with the rest of the team.








